import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

/*
TODO: handle api calling
Author: H.Hassan
Date: 21Oct2019
WI: #915289
ps-template-terms-and-conditions
*/


@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor() { }


  getServiceFileUrl(blob: Blob): string {
    if (blob == null) {
      return '';
    }
    const obj_url = window.URL.createObjectURL(blob);
    return obj_url;
  }

  public base64toBlob(b64Data, contentType?): Blob {
    let type = contentType;
    type = type || 'application/octet-stream';
    const sliceSize = 512;
    b64Data = b64Data || '';
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(b64Data && b64Data != null && b64Data != undefined && b64Data != '' ? byteArrays : [], { type: contentType });
    return blob;
  }

  public downloadFile(b64Data, fileName, contentType?) {
    const blob = this.base64toBlob(b64Data, contentType);
    saveAs(blob, fileName);
  }
}
