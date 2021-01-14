/* nabil feghali - OMNI common security  */

import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { pki } from 'node-forge';
import { LoggerService } from '../logger/logger.service';


import {
  IGenKeyPair,
  IPublicPrivateKey,
  IKeyGeneratorResult
} from '../models/hybridkey-interface';

@Injectable({
  providedIn: 'root'
})
export class HybridKeyService {

  constructor(private logger: LoggerService) {
  }

  private _key = 'TTlQVWE2Xy1VdkRzd21KJA==';
  private _iv = 'OS9tckZ4LCZOc1ovWDl6TA==';

  /** Generate Keys ********************************************************************************************************/

  public genkeypair(): Promise<IGenKeyPair> {
    const rsa = forge.pki.rsa;
    const d: Date = new Date();
    return new Promise<IGenKeyPair>((resolve, reject) => {
      rsa.generateKeyPair({ bits: 1024, e: 0x10001, workers: -1 }, (err, keypair) => {
        // keypair.privateKey, keypair.publicKey
        if (!!err) {
          this.logger.error(err);
        }
        resolve({ k: keypair, d1: d, d2: new Date() });
      });
    });
  }

  public returnReadableKeys(publicKey, privateKey): IPublicPrivateKey {
    const publicK = forge.pki.publicKeyToPem(publicKey);
    const privateK = forge.pki.privateKeyToPem(privateKey);
    const returnedPair: IPublicPrivateKey =
    {
      publicKey: publicK,
      privateKey: privateK
    }
    return returnedPair;
  }

  /** Encryption methods ********************************************************************************************************/

  public encryptMessage(message, pKey): IKeyGeneratorResult {

    const key = this.randomString(16);/* forge.random.getBytesSync(16) */;
    const iv = this.randomString(16);
    const result: IKeyGeneratorResult = {};
    const encryptedKey = this.encryptKey(key, pKey);
    const encryptedIv = this.encryptKey(iv, pKey);

    const cipher = forge.cipher.createCipher('AES-CBC', new forge.util.ByteStringBuffer(key));
    cipher.start({
      iv: iv
    });
    cipher.update(forge.util.createBuffer(JSON.stringify(message), 'utf8'));
    cipher.finish();

    const encrypted = forge.util.encode64(cipher.output.getBytes());
    result.key = encryptedKey;
    result.message = encrypted;
    result.iv = encryptedIv;

    return result;
  }


  public encryptKey(key, pKey): string {

    if (pKey == null || typeof pKey === 'undefined') {
      this.logger.error('public key was empty in sesion')
    }
    const pubKey = forge.pki.publicKeyFromPem(pKey) as pki.rsa.PublicKey;
    const buffer = forge.util.createBuffer(key, 'raw');
    const bytes = buffer.getBytes();
    const encrypted = pubKey.encrypt(bytes, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create()
      }
    });
    const b64Encoded = forge.util.encode64(encrypted);
    return b64Encoded;
  }


  public encryptTransportMessage(messageObj) {
    const key = forge.util.decode64(this._key);
    const iv = forge.util.decode64(this._iv);
    const messageString = btoa(JSON.stringify(messageObj));
    const cipher = forge.cipher.createCipher('AES-CBC', new forge.util.ByteStringBuffer(key));
    cipher.start({
      iv: iv
    });
    cipher.update(forge.util.createBuffer(JSON.stringify(messageString), 'utf8'));
    cipher.finish();

    const encrypted = forge.util.encode64(cipher.output.getBytes());

    return { pathParam: encrypted };

  }

  /** Decryption methods ********************************************************************************************************/

  public decryptKey(keyToBeDecrypted, pKey) {
    let decrypted;
    const privateKey = forge.pki.privateKeyFromPem(pKey) as pki.rsa.PrivateKey;
    decrypted = privateKey.decrypt(forge.util.decode64(keyToBeDecrypted), 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create()
      }
    });
    return decrypted;
  }

  public decryptMessage(key: string | forge.util.ByteStringBuffer, iv: string, encryptedMessage: string): string {

    let output: string;
    try {
      const decipher = forge.cipher.createDecipher('AES-CBC', key);
      decipher.start({ iv: iv });
      decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedMessage), 'raw'));
      const success = decipher.finish();
      if (success) {
        output = decipher.output.getBytes();
      } else {
        output = '';
        throw new Error('message decryptions failed ! ');
      }
    } catch (error) {
      this.logger.error(error);
    }
    const decryptedMessage = forge.util.decodeUtf8(output);
    //this.logger.log(' HybridKey decryptedMessage ' + decryptedMessage);
    return decryptedMessage;
  }


  decryptResponse(retData, pKey): string {
    let decryptedMessage: string = '';
    const key = retData.key;
    const iv = retData.iv;
    const message = retData.pathParam;
    const decryptedKey = this.decryptKey(key, pKey);
    const decryptedIv = this.decryptKey(iv, pKey);
    decryptedMessage = this.decryptMessage(decryptedKey, decryptedIv, message);
    decryptedMessage = JSON.parse(decryptedMessage);
    return decryptedMessage;
  }

  public decryptTransportMessage(encryptedMessage) {
    const key = forge.util.decode64(this._key);
    const iv = forge.util.decode64(this._iv);
    return this.decryptMessage(key, iv, encryptedMessage);
  }

  /** Utility methods ********************************************************************************************************/

  public randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result;
  }

  public hashcode(s) {
    var h = 0, l = s.length, i = 0;
    if (l > 0)
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  }

}
