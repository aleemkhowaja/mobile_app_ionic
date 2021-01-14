import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { ConstantCommon } from '../../../../commonSRC/psServices/models/common-constant';
import { IPageCommon } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../../../commonSRC/psServices/models/ps-common.settings';
import { IbusinessProfilesCO, ILoginResponse, IOperDef } from '../../../../pages/omni-login/omni-login.interfaces';
import { IOptionsPsMenuExposed, IPageBussiness } from './ps-complex-menu.component.interfaces';


/*
 * @author Heba.Hassan
 * @since 17/11/2019
 *
 * ps-complex-menu - .
 */
@Component({
    selector: 'ps-complex-menu',
    templateUrl: './ps-complex-menu.component.html',
    styleUrls: ['./ps-complex-menu.component.scss'],
})


export class PsComplexMenuComponent extends PsBaseFieldComponent implements OnInit {
    pages: IPageCommon[];
    pagesChild: IPageCommon[];
    userInformation: ILoginResponse;
    openedPage: IPageBussiness;
    businessProfileMap: IOperDef[] = [];
    @Input() public options: IOptionsPsMenuExposed = {};

    loinResponse: IbusinessProfilesCO[];
    allMenu: Array<IPageCommon> = [];
    isTreeView = PsCommonSettings.menuIsTreeView;
    @HostBinding('class') class = this.isTreeView ? 'is-tree-view' : 'is-widget-view';
    @ViewChild('widgetMenu', { read: ElementRef, static: false }) widgetMenu: ElementRef;


    constructor(public commonProv: PsCommonService, private navService: PsNavigatorService, private router: Router) {
        super(commonProv, commonProv.logger);
    }

    prepareMenu(list: IbusinessProfilesCO[], pages: IPageCommon[], hasParents: boolean = false, onlyAppend?: boolean) {
        if (this.userInformation && this.userInformation.businessProfiles.length > 0) {
            for (let i = 0; i < list.length; i++) {
                const row = list[i];
                const busProfile = row.operVO;
                this.commonProv.copyObject(busProfile, row.businessProfileOperVO, false, false);
                this.commonProv.copyObject(busProfile, row.operAppChnlVO, false, false);
                this.businessProfileMap.push(busProfile);
                if (!onlyAppend && row.operVO.BUSINESS_PROFILE_YN !== 'N') {
                    let page: IPageCommon;
                    page = {
                        title: row.operVO.OPER_NAME ? row.operVO.OPER_NAME : row.operVO.DESCRIPTION,
                        icon: row.operAppChnlVO.ICON_NAME,
                        component: row.operAppChnlVO.PAGE_HREF != null ? row.operAppChnlVO.PAGE_HREF : ConstantCommon.HASH_INPUT,
                        children: [],
                        hasParent: hasParents,
                        operID: row.operVO.OPER_ID,
                        collapse: true,
                        hide: true,
                        param: row.operAppChnlVO.PARAM !== undefined ? JSON.parse(row.operAppChnlVO.PARAM) : row.operAppChnlVO.PARAM,
                        isMaker: row.businessProfileOperVO ? (row.businessProfileOperVO.MAKER_YN == 'Y' ? true : false) : false,
                        isChecker: row.businessProfileOperVO ? (row.businessProfileOperVO.CHECKER_YN == 'Y' ? true : false) : false,
                    };
                    row.children ? page.isParent = true : page.isChildLeaf = true;
                    pages.push(page);
                    this.allMenu.push(page);
                    // check if menu has childs build recursively the sub-menus
                    if (row.children != null) {
                        let index = (pages.length);
                        index = index - 1;
                        this.pagesChild = pages[index].children;
                        this.prepareMenu(row.children, this.pagesChild, true);
                    }
                    // push the final children menu built recursively to the main menu list
                    let index = this.pages.length;
                    index = index - 1;
                    this.pages.concat(pages);
                } else {
                    if (row.children != null) {
                        this.prepareMenu(row.children, this.pagesChild, true, true);
                    }
                }
            }
        }
    }

    ngOnInit() {
        this.businessProfileMap = [];
        this.userInformation = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
        if (this.userInformation && this.userInformation.businessProfiles.length > 0) {
            this.pages = [];
            this.prepareMenu(this.userInformation.businessProfiles, this.pages);

            this.pages.forEach((ipage) => {
                ipage.isRoot = true;
                ipage.isParent = false;
                ipage.hide = false;
            });
            this.commonProv.session.append(ConstantCommon.BUSINESS_PROFILE_MAP, this.businessProfileMap);
        }
    }

    prepareSelected(page: IPageBussiness, ipage: IPageCommon) {
        if ((page.isRoot || page.isParent) && (page.operID === ipage.operID)) {
            page.isSelected = !page.isSelected;
        } else if (page.isChildLeaf && (page.operID === ipage.operID || ((ipage.isParent || ipage.isRoot) && page.parent && page.parent.operID === ipage.operID))) {
            ipage.isSelected = true;
        } else {
            ipage.isSelected = false;
        }
        if (ipage.isParent || ipage.isRoot) {
            ipage.children.forEach((child) => {
                this.prepareSelected(page, child);
            });
        }

    }

    expandOrCollapseTree(event: Event, page: IPageBussiness) {
        this.pages.forEach((iPage) => {
            this.prepareSelected(page, iPage);
        });

        if (page.children && page.children.length > 0) {
            this.allMenu.forEach((iPage) => {
                if (iPage.operID !== page.operID) {
                    if (page.isRoot) {
                        iPage.collapse = true;
                    }
                    if (page.isParent && iPage.isParent) {
                        iPage.collapse = true;
                    }
                    if (page.children.includes(iPage)) {
                        iPage.parent = page;
                    }
                }

            });
            page.collapse = !page.collapse;
            this.openedPage = page;
        } else {
            page.isSelected = true;
            this.openPage(page);
        }
        return false;
    }

    expandOrCollapseWidget(event: Event, page: IPageBussiness) {
        if (this.widgetMenu) {
            this.widgetMenu.nativeElement.scrollTop = 0;
        }
        if (page.children && page.children.length > 0) {
            this.allMenu.forEach((iPage) => {
                if (page.children.includes(iPage)) {
                    iPage.collapse = false;
                    iPage.hide = false;
                    iPage.parent = page;
                } else {
                    iPage.collapse = true;
                    iPage.hide = true;
                }
            });
            this.openedPage = page;
        } else {
            this.openPage(page);
        }
        return false;
    }
    openPage(page: IPageBussiness) {
        this.navService.openPage(page);
    }

    changeView() {
        this.isTreeView = !this.isTreeView;
        if (this.isTreeView) {
            document.getElementsByTagName('ps-complex-menu')[0].classList.remove('is-widget-view');
            document.getElementsByTagName('ps-complex-menu')[0].classList.add('is-tree-view');
        } else {
            document.getElementsByTagName('ps-complex-menu')[0].classList.remove('is-tree-view');
            document.getElementsByTagName('ps-complex-menu')[0].classList.add('is-widget-view');
        }
    }
    returnOptions(item: IPageCommon, siblings) {
        if (item) {
            if (!item.children) {
                item.children = [];
            }
            item.siblings = [...siblings];
            item.actionMenuOptionsItem = {
                labelKey: item.title,
                menuIconOptions: { iconName: item.icon },
                expandCollapseIconOptions: {
                    iconName: item.children.length > 0 ? !item.collapse ? 'remove' : 'arrow' : item.children.length === 0 && item.hasParent ? '' : ''
                }
            };
            return item.actionMenuOptionsItem;
        } else {
            return {};
        }
    }

    goBack() {
        if (this.widgetMenu) {
            this.widgetMenu.nativeElement.scrollTop = 0;
        }
        if (this.openedPage) {
            // this.findNestedItemInArray(this.pages, this.openedPage.parent.operID, 'operID', 'children');
            this.allMenu.forEach((iPage) => {
                iPage.collapse = true;
                iPage.hide = true;
            });
            if (this.openedPage.siblings) {
                this.openedPage.siblings.forEach((iPage) => {
                    iPage.collapse = false;
                    iPage.hide = false;
                });
            }
            this.openedPage = this.openedPage.parent;
        }
    }

    // findNestedItemInArray(array: Array<any>, idAttributeName, idToSearch, nestingKey) {
    //     array.reduce((page, item, index) => {
    //         if (page) {
    //             return { page };
    //         }
    //         if (item[idAttributeName] === idToSearch) {
    //             return item;
    //         }
    //         if (item[nestingKey]) {
    //             return this.findNestedItemInArray(item[nestingKey], idAttributeName, idToSearch, nestingKey);
    //         }
    //     }, null);
    // }
}
