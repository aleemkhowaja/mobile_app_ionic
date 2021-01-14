import { IOptionsPsBaseAction, IOptionsPsBaseActionExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsActionGalleryExposed extends IOptionsPsBaseActionExposed {
    className?: string;
    layout?: 'slider' | 'grid';
    selectedItem?: any;
    itemWidth?: number;
    itemHieght?: number;
    numberOfItemsPerPage?: number;
}

export interface IOptionsPsActionGallery extends IOptionsPsBaseAction {
    className?: string;
    layout?: 'slider' | 'grid';
    selectedItem?: any;
    itemWidth?: number;
    itemHieght?: number;
    numberOfItemsPerPage?: number;
}

export class MediaSource {
    uri?: string;
    type?: 'image' | 'video';
    id?: number;
    name?: string;
    thumbnail?: string;
    imageData?: any;
    fileName?: string;
}

