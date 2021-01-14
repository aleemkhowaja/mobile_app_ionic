/* nabil feghali - OMNI common security */ 
import * as forge from 'node-forge';

export interface IPublicPrivateKey {
  publicKey?: string,
  privateKey?: string,
}

export interface IKeyGeneratorResult {
	  key?: string,
	  message?: string,
	  iv?: string,
	  ocUserId?: number,
	  compCode?: number
}

export interface IGenKeyPair {
	  k: forge.pki.rsa.KeyPair;
	  d1: Date;
	  d2: Date;
}

