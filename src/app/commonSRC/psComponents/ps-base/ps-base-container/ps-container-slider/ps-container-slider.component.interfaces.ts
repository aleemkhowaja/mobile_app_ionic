import { IOptionsPsBaseContainer } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { MediaSourceExposed, IOptionsPsBaseContainerExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsContainerSlider extends IOptionsPsBaseContainer {
    slidesPerView?: number,
    slidesPerColumn?: number,
    slidesPerGroup?: number,
    watchSlidesProgress?: boolean,
    spaceBetween?: number,
    virtualTranslate?: boolean,
    mediaList?:MediaSourceExposed[]
}