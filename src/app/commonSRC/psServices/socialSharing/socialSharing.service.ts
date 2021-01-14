import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
    providedIn: 'root'
})
export class SocialSharingService {

    constructor(private socialSharing: SocialSharing) {
    }

    share(message: string, subject: string, files: string[], url: string) {
        this.socialSharing.share(message, subject, files, url);
    }

}
