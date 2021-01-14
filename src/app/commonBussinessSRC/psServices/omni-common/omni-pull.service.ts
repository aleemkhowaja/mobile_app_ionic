import { Injectable } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { Events } from 'src/app/commonSRC/psServices/Event/event.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IAccountResponse, IOmniAccountRequest, IOmniCommonServiceResponse, IOmniFindCIF, IOmniRequestBaseObject, IOmniReturnPurpose, IProfitRateRequest } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { GeolocationService } from '../../../commonSRC/psServices/geolocation/geolocation.service';
import { IOmniCardsResponse } from '../../psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.interface';
import { IChequebooksListRequest } from '../../psComponents/ps-container-lookup-option/ps-option-chequebook/ps-option-chequebook.component.interface';
import { ISecurityListRequest, ISecurityListResponse } from '../../psComponents/ps-container-lookup-option/ps-option-expired-security/ps-option-expired-security.component.interface';
import { IAccountNumberCurrRequest, IAccountNumberCurrResponse, IAccountTypesRequest, IAccountTypesResponse, IActivitiesResponse, IAmountFromToCurrencyRequest, IAmountFromToCurrencyResponse, IAmountValidationRequest, IAmountValidationResponse, IBanksCO, ICardTypeRequest, IChequeTypesRequest, IChequeTypesResponse, ICifTypeRequest, ICoreReasonsRequest, ICurrenciesRequest, ICurrenciesResponse, IDealResponse, IdTypesRequestObject, IExchangeRateCO, IExchangeRateRequest, IFormOfDocumentaryRequest, IFormOfDocumentaryResponse, ILegalStatusRequest, ILegalStatusResponse, ILostDocumentListRequest, INotificationResponse, IOcBranchesRequest, IOcCitiesRequest, IOcCitiesResponse, IOcCountriesRegionsRequest, IOcCountriesRegionsResponse, IOcPostalCodeRequest, IOC_ETL_CITIESVO, IOmniBankRequest, IOmniBeneficiaryRequest, IOmniCardNamePersonalizationRequest, IOmniCardsRequest, IOmniCommonRequest, IOmniCommonResponse, IOmniDealsListRequest, IOmniINotificationRequest, IOmniLovTypeRequest, IOmniMapAtmBranchesRequest, IOmniPrayerTimeRequest, IOmniTermsAndConditionsRequest, IOmniTermsAndConditionsResponse, IPrayerTimeResponse, IProductClass, IRankingRequest, IRankingResponse, ISmartFieldCO, ISmartFieldRequest, ISmartFieldResponse, ISukukSecuritiesCO, ISukukSecuritiesRequest, ITFSDocumentTypeRequest, ITFSDocumentTypeResponse, IUpdateUserProfileRequest } from '../models/ps-common-bussiness-interfaces';
import { IFacilityDetailsRequest, IFacilityDetailsResponse, IGood, IGoodCategory, IInsuranceCompaniesRequest, IInsuranceCompaniesResponse, IMaturityAccountInforRequest, IMaturityAccountInforResponse, IOcPortfolioRequest, IShipmentTermsRequest, IShipmentTermsResponse } from './../models/ps-common-bussiness-interfaces';
import { OmniCommonService } from './omni-common.service';



@Injectable({
  providedIn: 'root'
})
export class OmniPullService {


  constructor(public omniCommon: OmniCommonService,
    public geolocation: GeolocationService, public events: Events
  ) {
  }

  public commonRequestAjax(url: string, theParams?: any): Promise<any> {
    this.events.publish('network:request:started', Date.now());
    return new Promise<any>(async (resolve, reject) => {
      this.omniCommon.common.http.commonRequestAjax(url, theParams).then((response) => {
        // initializing the grid module to empty array jusst not to have undefined.length
        if (response && response.data) {
          if (!response.data.gridModel) {
            response.data.gridModel = [];
          }
        }
        this.events.publish('network:request:completed', Date.now());
        resolve(response);
      }).catch((err) => {
        this.events.publish('network:request:completed', Date.now());
        reject(err);
      });
    });
  }
  /*
            Params:
             IOcCountriesRegionsRequest
            Returns:
              IOmniCommonResponse
            Description:
              used to get Countries
          */

  returnCountries(parameter: IOcCountriesRegionsRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.countriesList, parameter
      ).then
        ((result) => {
          const list: Array<IOcCountriesRegionsResponse> = result.data.gridModel as Array<IOcCountriesRegionsResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /** @author: SyedAmmar
  * Date: 12Oct2020
  * return return CIF List
  */
  returnCIFList(parameter: any): Promise<any> {
    parameter.apiCode = -1;
    return new Promise<any>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnCIFList)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /** @author: malak
   * Date: 9Dec2020
   * return CIF Details
   */
  returnCIFDetails(parameter: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnCIFDetails, parameter).then
        ((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * @auther Ghada 16Jan2020
   */
  returnCities(parameter: IOcCitiesRequest): Promise<IOcCitiesResponse> {
    parameter.apiCode = -1;
    return new Promise<IOcCitiesResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.citiesList, parameter
      ).then
        ((result) => {
          const list: Array<IOC_ETL_CITIESVO> = result.data.gridModel as Array<IOC_ETL_CITIESVO>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }
  /*
            Params:
             IOcCountriesRegionsRequest
            Returns:
              IOmniCommonResponse
            Description:
              used to get Regions
          */

  /**
* @auther Ghada 16Jan2020
*/
  returnRegions(parameter: IOcCountriesRegionsRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.countriesRegions, parameter
      ).then
        ((result) => {
          const list: Array<IOcCountriesRegionsResponse> = result.data.gridModel as Array<IOcCountriesRegionsResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /** @author Ahmed.Ragab
   * @since 29/01/2020
   * @description get list of all banks
  */
  returnBanks(parameter: IOmniBankRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.banks, parameter).then((result) => {
        const list: Array<IBanksCO> = result.data.gridModel as Array<IBanksCO>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.IBanksCO
          });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnCorrespondingBanks(parameter: IOmniBankRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.correspondingBanks, parameter).then((result) => {
        const list: Array<IBanksCO> = result.data.gridModel as Array<IBanksCO>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.IBanksCO
          });
      }).catch((error) => {
        reject(error);
      });
    });
  }



  returnListOfImages(parameter: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.verificationImageList, parameter).then
        ((result) => {
          resolve(result);
        }).catch((error) => {
          // this.logger.error(error);
          reject(error);
        });
    });
  }

  /**
   * @author Aftab.Ali
   * @since 22/10/2019
   *
   * Responsible for fetching lOV Types from ConstantCommon.LOV_TYPES_END_POINT
   */
  returnLovTypesValues(parameter: IOmniLovTypeRequest): Promise<Array<IOmniCommonResponse>> {
    parameter.apiCode = -1;
    return new Promise<Array<IOmniCommonResponse>>((resolve, reject) => {
      const id = parameter.lovTypeId;
      const language = PsCommonSettings.activeLanguge.toUpperCase();
      let currentLovType = this.omniCommon.common.session.getValueOf(CommonBussinessConstant.LOV_TYPE_MAP);
      if (currentLovType == null) {
        currentLovType = {
        };
      }
      if (currentLovType[id] && currentLovType[id][language]) {
        resolve(currentLovType[id][language]);
        return;
      }
      this.commonRequestAjax(CommonBussinessConstant.LOV_TYPES_END_POINT, parameter).then((result) => {
        if (currentLovType[id]) {
          currentLovType[id][language] = result.data.gridModel;
        } else {
          currentLovType[id] = {};
          currentLovType[id][language] = result.data.gridModel;
        }
        this.omniCommon.common.session.append(CommonBussinessConstant.LOV_TYPE_MAP, currentLovType);
        resolve(result.data.gridModel);
      }).catch((error) => {
        this.omniCommon.common.logger.error('Error: While fetching LOV Types in OmniPullService', error); reject(error);
      });
    });
  }


  returnSubProfiles(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnSubProfiles)
        .then(result => {
          resolve(result.data.gridModel);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  fetchUserAccountsList(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnUserAccounts)
        .then(result => {
          resolve(result.data.gridModel);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /*   returnListOfImages(parameter: any): Promise<any> {
      return new Promise<IOptionsPsGalleryVerification>((resolve, reject) => {
        this.omniCommon.common.http.commonRequestAjax('rest/omniCommonPull/returnListOfImages', parameter).then
          ((result) => {
            resolve(result);
          }).catch((error) => {
            reject(error);
          });
      });
    } */

  /** @author HHassan
     * Date: 27102019
     * return terms and conditions content
     */
  returnTermsAndCondition(parameter: IOmniTermsAndConditionsRequest, serviceUrl: string): Promise<IOmniTermsAndConditionsResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniTermsAndConditionsResponse>((resolve, reject) => {
      this.commonRequestAjax(serviceUrl, parameter)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }


  returnSecurityQuestion(parameter: any): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.securityQuestions, parameter).then((result) => {
        const list = result.data;
        resolve(list);
      }).catch((error) => {
        reject(error);
      });
    });
  }


  /**
    * @return promise of map of key bvalue or -1 if no result found
    * @param param list of sting parameter keys
    */
  public getParamValOf(...param: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const map = new Map<any, any>();
      // clone the inital param array into paramInitialArr because we cannot loop over the param array and remove element from it at the same time
      const paramInitialArr = param.slice(0);
      paramInitialArr.forEach((element, index) => {
        if (PsCommonBusinessSettings.paramExclusionList[element]) {
          map.set(element, PsCommonBusinessSettings.paramExclusionList[element]);
          const indexToRemove = param.indexOf(element);
          if (indexToRemove >= 0) {
            param.splice(indexToRemove, 1);
          }
        }
      });

      if (param.length === 0) {
        resolve(this.omniCommon.mapToJson(map));
        return;
      }
      const paramString: string = param.map(x => '\'' + x + '\'').join(',');
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.parameterValue,
        {
          paramNameList: paramString
        }
      ).then((result) => {
        let finalResult;
        if (result && result.data && result.data.responseList) {
          finalResult = result.data.responseList;
          // eslint-disable-next-line guard-for-in
          for (const par in finalResult) {
            let paramVal;
            try {
              paramVal = JSON.parse(finalResult[par]);
            } catch (error) {
              paramVal = finalResult[par];
            }
            if (Object.keys(PsCommonBusinessSettings.paramExclusionList).indexOf(par) >= 0) {
              PsCommonBusinessSettings.paramExclusionList[par] = paramVal;
            }
            map.set(par, paramVal);
          }
          // this.omniCommon.session.append(ConstantCommon.PARAMS, JSON.stringify(Array.from(map.entries())));
          resolve(this.omniCommon.mapToJson(map));
        } else {
          resolve(- 1);
        }
      }).catch((error) => {
        // this.logger.error(error); reject(error);
      });
    });
  }

  /**
   * @author Aftab.Ali
   * @since 07/11/2019
   *
   * Responsible for fetching product types from ConstantCommon.PRODUCT_TYPES_END_POINT
   */
  returnProductClasses(parameter: IOmniRequestBaseObject): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(CommonBussinessConstant.PRODUCT_TYPES_END_POINT, parameter).then((result) => {
        const productList: Array<IProductClass> = result.data.gridModel as Array<IProductClass>;
        resolve(
          {
            gridModel: productList,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**
   * @author Ahmed.Ragab
   * @since 14/06/2019
   *
   * Responsible for fetching Good Categories from ConstantCommon.GOODS_CATEGORIES_END_POINT
   */
  returnGoodCategories(parameter: IOmniRequestBaseObject): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(CommonBussinessConstant.GOODS_CATEGORIES_END_POINT, parameter).then((result) => {
        const GoodCategories: Array<IGoodCategory> = result.data.gridModel as Array<IGoodCategory>;
        resolve(
          {
            gridModel: GoodCategories,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**
   * @author Ahmed.Ragab
   * @since 14/6/2020
   *
   * Responsible for fetching Goods from ConstantCommon.GOODS_END_POINT
   */
  returnGoods(parameter: IOmniRequestBaseObject): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(CommonBussinessConstant.GOODS_END_POINT, parameter).then((result) => {
        const Good: Array<IGood> = result.data.gridModel as Array<IGood>;
        resolve(
          {
            gridModel: Good,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * @author Heba.Hassan
   * @since 06/04/2020
   *
   * Responsible for fetching Facility types from ConstantCommon.FACILITY_TYPES_END_POINT
   */
  returnFacilityTypes(parameter: IOmniRequestBaseObject): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(CommonBussinessConstant.FACILITY_TYPES_END_POINT, parameter).then((result) => {
        const facilityList: Array<any> = result.data.gridModel as Array<any>;
        resolve(
          {
            gridModel: facilityList,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnMapAtmBranches(parameter: IOmniMapAtmBranchesRequest): Promise<IOmniCommonResponse> {
    parameter.compCode = PsCommonSettings.COMP_CODE;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.mapAtmBranches, parameter).then((result) => {
        const list = result.data;
        resolve(list);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**
+  * @author Heba.Hassan
+  * @since 15/07/2020
+  *
+  * Responsible for fetching Sukuk List
+  */
  returnSukukCurrency(parameter: IOmniRequestBaseObject): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(CommonBussinessConstant.SUKUK_LIST_END_POINT, parameter).then((result) => {
        const sukukList: Array<any> = result.data.gridModel as Array<IProductClass>;
        resolve(
          {
            gridModel: sukukList,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**

  /**
   * @author Aftab.Ali
   * @since 07/11/2019
   *
   * Responsible for fetching list of currencies from CommonBussinessConstant.CURRENCIES_LIST_END_POINT
   */
  returnCurrencyList(parameter: ICurrenciesRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(CommonBussinessConstant.CURRENCIES_LIST_END_POINT, parameter
      ).then
        ((result) => {
          const currenciesList: Array<ICurrenciesResponse> = result.data.gridModel as Array<ICurrenciesResponse>;
          resolve(
            {
              gridModel: currenciesList,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error('Error: While fetching list of currencies in OmniPullService', error); reject(error);
          reject(error);
        });
    });
  }

  /**
   * @author Aftab.Ali
   * @since 22/11/2019
   *
   * Responsible for fetching list of list of id types from CommonBussinessConstant.ID_TYPES_END_POINT
   */
  returnIdTypesList(parameter: IdTypesRequestObject): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(CommonBussinessConstant.ID_TYPES_END_POINT, parameter
      ).then
        ((result) => {
          resolve(
            {
              gridModel: result.data.gridModel,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error('Error: While fetching list of ID TYPES in OmniPullService', error); reject(error);
          reject(error);
        });
    });
  }


  /*
         Params:
          IAccountTypesRequest
         Returns:
           IOmniCommonResponse
         Description:
           used to return Account types
       */

  returnAccountTypes(parameter: IAccountTypesRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.accountTypes, parameter
      ).then
        ((result) => {
          const list: Array<IAccountTypesResponse> = result.data.gridModel as Array<IAccountTypesResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @author Aftab.Ali
   * @since 22/11/2019
   *
   * Responsible for fetching list of list of id types from PsCommonSettings.serviceUrl.accountsList
   * @param parameter IOmniAccountRequest
   */
  returnAccounts(parameter: IOmniAccountRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.accountsList, parameter
      ).then
        ((result) => {
          const list: Array<IAccountResponse> = result.data.gridModel as Array<IAccountResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error(error + ' : error while fetching accounts in OmniPullService'); reject(error);
        });
    });
  }
  /**
   * @author Ahmed.Ragab
   * @since 16/01/2020
   *
   * Responsible for fetching list of list of deals list from PsCommonSettings.serviceUrl.dealsList
   * @param parameter IOmniAccountRequest
   */
  returnDealList(parameter?: IOmniDealsListRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      if (parameter === null || parameter === undefined) {
        const newParameter: IOmniDealsListRequest = {
          apiCode: -1
        };
        parameter = newParameter;
      } else {
        parameter.apiCode = -1;
      }

      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.dealsList, parameter
      ).then
        ((result) => {
          const list: Array<IDealResponse> = result.data.gridModel as Array<IDealResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error(error + ' : error while fetching Deals in OmniPullService'); reject(error);
        });
    });
  }
  /**
    // * @author malak.daher
    // * @since 03/07/2020
    // *
    // * Responsible for fetching list of transactions from PsCommonSettings.serviceUrl.accountsList
    // * @param parameter IOmniAccountRequest
    // */
  returnTransactionsList(parameter: any): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.transactionsList, parameter
      ).then
        ((result) => {
          const list: Array<IAccountResponse> = result.data.gridModel as Array<IAccountResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error(error + ' : error while fetching transactions list in OmniPullService'); reject(error);
        });
    });
  }

  returnTransactionDetails(parameter: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.transactionDetails, parameter).then
        ((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }
  // duplicated from version 3, to get the hijridate for specific Gregorian date ,GRadwan US925625
  public async returnHijriDate(date: Date) {
    const wdNames = await this.returnLovTypesValues({ lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_WEEK_DAYS });
    const iMonthNames = await this.returnLovTypesValues({ lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_HIJIRI_MONTHS });
    const iDate = this.omniCommon.common.pathSolutionCalendar(date);
    const outputIslamicDate = ((wdNames[iDate[4]]) ? wdNames[iDate[4]].description : '') + ', '
      + iDate[5] + ' ' + ((iMonthNames[iDate[6]]) ? iMonthNames[iDate[6]].description : '') + ' ' + iDate[7] + ' AH';

    // console.log("wdNames", wdNames);
    // console.log("iMonthNames", iMonthNames);
    // console.log("iDate", iDate);
    // console.log("outputIslamicDate", outputIslamicDate);
    return outputIslamicDate;
  }



  /*
      Params:
       compCode
      Returns:
        IOmniCommonResponse
      Description:
        used to return portfolioList
    */

  returnPortfolioList(parameter: IOcPortfolioRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnPortfoliosEndPoint, parameter
      ).then
        ((result) => {
          console.log('PORTFOLIOS ----> result', result);
          resolve(
            {
              gridModel: result.data.gridModel,
              totalNbRec: result.data.totalNbRec
            });
        }).catch((error) => {
          console.log('PORTFOLIOS ----> error', error);
          reject(error);
        });
    });
  }


  /*
      Params:
       IOcBranchesRequest
      Returns:
        IOmniCommonResponse
      Description:
        used to return Branchlist
    */

  returnBranchesList(parameter: IOcBranchesRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnBranches, parameter
      ).then
        ((result) => {
          resolve(
            {
              gridModel: result.data.gridModel,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  returnChequebooksList(parameter: IChequebooksListRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnChequebooksList, parameter)
        .then((result) => {
          resolve(
            {
              gridModel: result.data.gridModel
            }
          );
        }).catch(error => {
          this.omniCommon.common.logger.log(error);
          reject(error);
        });
    });
  }
  reutrnDeactivationReasons(): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.deactivationReasons).then((result) => {
        resolve(result.data);
      }).catch((error) => {

        reject(error);
      });
    });
  }


  returnFacilityList(parameter: IFacilityDetailsRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.facilityDetails, parameter
      ).then
        ((result) => {
          const list: Array<IFacilityDetailsResponse> = result.data.gridModel as Array<IFacilityDetailsResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /*
   Params:
    IOmniCardsRequest
   Returns:
     IOmniCardsResponse
   Description:
     used to get cardList
 */
  returnCardList(parameter: IOmniCardsRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax('rest/omniCorePull/cardList', parameter
      ).then
        ((result) => {
          const list: Array<IOmniCardsResponse> = result.data.gridModel as Array<IOmniCardsResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }


  returnCards(parameter: IOmniCardNamePersonalizationRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax('rest/omniCommonPull/returnCardList', parameter
      ).then
        ((result) => {
          resolve(
            {
              gridModel: result.data.gridModel,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @author Aftab.Ali
   * @since 30/12/2019
   * @param parameter
   */
  returnExchangeRate(parameter: IExchangeRateRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.exchangeRateEndPoint, parameter
      ).then
        ((result) => {
          const list: Array<IExchangeRateCO> = result.data.gridModel as Array<IExchangeRateCO>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * @author Aftab.Ali
   * @since 30/12/2019
   * will get the calculated to amount based on from and to currency and from amount
   * @param parameter
   */
  returnAmountFromToCurrency(parameter: IAmountFromToCurrencyRequest): Promise<IAmountFromToCurrencyResponse> {
    return new Promise<IAmountFromToCurrencyResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.amountFromToCurrencyEndPoint, parameter).then
        ((result) => {
          resolve(result.data);
        }).catch((error) => {
          reject(error);
        });

    });
  }

  /**
   * will validate the amount based on currency and input amount
   * @param parameter
   */
  amountValidation(parameter: IAmountValidationRequest): Promise<IAmountValidationResponse> {
    return new Promise<IAmountValidationResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.amountValidationEndPoint, parameter
      ).then
        ((result) => {
          resolve(result.data);
        }).catch((error) => {
          reject(error);
        });
    });
  }



  returnCardTypes(parameter: ICardTypeRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnCardTypes, parameter
      ).then
        ((result) => {
          const list: Array<IOmniCommonResponse> = result.data.gridModel as Array<IOmniCommonResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  returnRankings(parameter: IRankingRequest): Promise<IOmniCommonResponse> {
    return new Promise<IRankingResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnRanking, parameter).then((result) => {
        const list: Array<IRankingResponse> = result.data.gridModel as Array<IRankingResponse>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        // console.error(error);
        reject(error);
      });
    });
  }


  returnLegalStatuses(parameter: ILegalStatusRequest): Promise<ILegalStatusResponse> {
    return new Promise<ILegalStatusResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.legalStatus, parameter).then((result) => {
        const list: Array<ILegalStatusResponse> = result.data.gridModel as Array<ILegalStatusResponse>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        // console.error(error);
        reject(error);
      });
    });
  }

  /**
   * @author Zunair.Zakir
   * @since 28/01/2020
   *
   * @param parameter IOmniBeneficiaryRequest
   */
  returnBeneficiaries(parameter: IOmniBeneficiaryRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.beneficiaries, parameter
      ).then
        ((result) => {
          const list: Array<any> = result.data.gridModel as Array<any>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error(error + ' : error while fetching accounts in OmniPullService'); reject(error);
        });
    });
  }
  /**
   * @author Zunair.Zakir
   * @since 03/02/2020
   *
   * @param parameter IOmniFindCIF
   */
  returnCIF(parameter: IOmniFindCIF): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.findCIF, parameter
      ).then
        ((result) => {
          const list: Array<any> = result.data.gridModel as Array<any>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error(error + ' : error while fetching accounts in OmniPullService'); reject(error);
        });
    });
  }
  /**
   * @author Zunair.Zakir
   * @since 04/02/2020
   *
   * @param parameter IOmniReturnPurpose
   */
  returnCategorySubCategory(parameter: IOmniReturnPurpose): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnCategorySubcategory, parameter
      ).then
        ((result) => {
          const list: Array<any> = result.data.gridModel as Array<any>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error(error + ' : error while fetching accounts in OmniPullService'); reject(error);
        });
    });
  }
  returnLostDocument(parameter: ILostDocumentListRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.lostDocument, parameter).then((result) => {
        const list: Array<any> = result.data.gridModel as Array<any>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnTFSDocumentType(parameter: ITFSDocumentTypeRequest): Promise<ITFSDocumentTypeResponse> {
    parameter.apiCode = -1;
    return new Promise<ITFSDocumentTypeResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.tfsDocument, parameter).then((result) => {
        const list: Array<ITFSDocumentTypeResponse> = result.data.gridModel as Array<ITFSDocumentTypeResponse>;

        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnInsuranceCompanies(parameter: IInsuranceCompaniesRequest): Promise<IInsuranceCompaniesResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.insuranceCompany, parameter).then((result) => {
        const list: Array<IInsuranceCompaniesResponse> = result.data.gridModel as Array<IInsuranceCompaniesResponse>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnActivitiesList(): Promise<IActivitiesResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.activity).then((result) => {
        const list: Array<IActivitiesResponse> = result.data.gridModel as Array<IActivitiesResponse>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnShipmentTerms(parameter: IShipmentTermsRequest): Promise<IShipmentTermsResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.shipmentTerms, parameter).then((result) => {
        const list: Array<IShipmentTermsResponse> = result.data.gridModel as Array<IShipmentTermsResponse>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnExpiredHoldingList(parameter: ISecurityListRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnExpiredSecurityList, parameter
      ).then
        ((result) => {
          const list: Array<ISecurityListResponse> = result.data.gridModel as Array<ISecurityListResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  returnPrayTime(parameter: IOmniPrayerTimeRequest): Promise<IPrayerTimeResponse> {
    return new Promise<IPrayerTimeResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.prayersList, parameter
      ).then
        ((result) => {
          resolve(
            result.data
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }


  /**
   *
   * @param parameter
   */
  returnIPOSecurities(parameter: ISukukSecuritiesRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.sukukSecurities, parameter

      ).then
        ((result) => {
          const list: Array<ISukukSecuritiesCO> = result.data.gridModel as Array<ISukukSecuritiesCO>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }
  /*
           Params:
            IChequeTypesRequest
           Returns:
             IOmniCommonResponse
           Description:
             used to return cheque book types
         */

  returnChequebookTypes(parameter: IChequeTypesRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.chequeBookType, parameter
      ).then
        ((result) => {
          const list: Array<IChequeTypesResponse> = result.data.gridModel as Array<IChequeTypesResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }


  /**
   *
   */
  returnSmartDetails(parameter: ISmartFieldRequest): Promise<ISmartFieldResponse> {
    return new Promise<ISmartFieldResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.smartDetails, parameter
      ).then((result) => {
        const list: Array<ISmartFieldCO> = result.data.gridModel as Array<ISmartFieldCO>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
        resolve(result.data);
      }).catch((error) => {
        this.omniCommon.common.logger.error(error);
        reject(error);
      });
    });
  }



  updateUserProfileImage(paramData: IUpdateUserProfileRequest): Promise<IOmniCommonServiceResponse> {
    return new Promise<IOmniCommonServiceResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.updateUserInfoProfileImage, paramData).then((result) => {
        resolve(result.data);
      }).catch((error) => {

        reject(error);
      });
    });
  }
  returnPostalCodes(parameter: IOcPostalCodeRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.postalCode, parameter).then((result) => {
        const list: Array<any> = result.data.gridModel as Array<any>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnNationalities(parameter: any): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.nationalities, parameter).then((result) => {
        const list: Array<any> = result.data.gridModel as Array<any>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnEcoSector(parameter: IOmniReturnPurpose): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnEcoSectors, parameter
      ).then
        ((result) => {
          const list: Array<any> = result.data.gridModel as Array<any>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          this.omniCommon.common.logger.error(error + ' : error while fetching accounts in OmniPullService'); reject(error);
        });
    });
  }

  returnNotifications(parameter: IOmniINotificationRequest): Promise<INotificationResponse> {
    parameter.apiCode = -1;
    return new Promise<INotificationResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.NotificationsData, parameter
      ).then
        ((result) => {
          this.omniCommon.common.logger.log('Countries :' + JSON.stringify(result.data.gridModel));
          const list: Array<INotificationResponse> = result.data.gridModel as Array<INotificationResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  returnCifTypes(parameter: ICifTypeRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnCifTypes, parameter).then((result) => {
        const list: Array<any> = result.data.gridModel as Array<any>;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  reutrnOccupation(params): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnOccupation, params).then((result) => {
        resolve(result.data);
      }).catch((error) => {

        reject(error);
      });
    });
  }

  returnSubmitDataList(parameter: IOmniCommonRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnSubmitDataList, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {

        reject(error);
      });
    });
  }


  returnCoreReasons(parameter: ICoreReasonsRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnCoreReasons, parameter
      ).then
        ((result) => {
          const list: Array<IOmniCommonResponse> = result.data.gridModel as Array<IOmniCommonResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @author Aftab.Ali
   * @since 21/06/2020
   *
   */
  returnMaturityAccountInformation(parameter: IMaturityAccountInforRequest): Promise<IMaturityAccountInforResponse> {
    parameter.apiCode = -1;
    return new Promise<IMaturityAccountInforResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.maturityAccountDetailsRestEndPoint, parameter
      ).then
        ((result) => {
          resolve(result.data);
        }).catch((error) => {
          reject(error);
        });
    });
  }


  /**
   * @author Aftab.Ali
   * @since 22/06/2020
   *
   */
  returnProfitRate(parameter: IProfitRateRequest): Promise<IOmniCommonResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.profitRateRestEndPoint, parameter
      ).then
        ((result) => {
          const list: Array<IOmniCommonResponse> = result.data.gridModel as Array<IOmniCommonResponse>;
          resolve(
            {
              gridModel: list,
              totalNbRec: result.data.totalNbRec
            }
          );
        }).catch((error) => {
          reject(error);
        });
    });
  }

  returnAccountNumberCurrency(parameter: IAccountNumberCurrRequest): Promise<IAccountNumberCurrResponse> {
    parameter.apiCode = -1;
    return new Promise<IAccountNumberCurrResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.accountNumberCurrencyEndPoint, parameter
      ).then
        ((result) => {
          resolve(result.data);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  returnFormOfDocumentaryCredit(parameter: IFormOfDocumentaryRequest): Promise<IFormOfDocumentaryResponse> {
    parameter.apiCode = -1;
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.formOfDocumentaryCreditEndPoint, parameter).then((result) => {
        const list: Array<IFormOfDocumentaryResponse> = result.data.gridModel;
        resolve(
          {
            gridModel: list,
            totalNbRec: result.data.totalNbRec
          }
        );
      }).catch((error) => {
        reject(error);
      });
    });
  }

  returnBillTypeList(parameter: IOmniCommonRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.billTypeListEndPoint, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {

        reject(error);
      });
    });
  }

  returnBillersList(parameter: any): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.billersListEndPoint, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {

        reject(error);
      });
    });
  }


  async checkBranch(param): Promise<{ enableCifBranch: boolean; }> {
    const operId = PsCommonSettings.oper_ID;
    let valueToCompareWith;
    let reverseChecking = false;
    const returnValue: any = { enableCifBranch: false };


    if (operId === ConstantCommon.AccountOpeningPage_OPER_ID) {
      valueToCompareWith = ConstantCommon.cifBranch;
    }

    if (operId === ConstantCommon.AccountOpeningFixedMaturityAccountPage_OPER_ID) {
      valueToCompareWith = ConstantCommon.cifBranch;
    }

    if (operId === CommonBussinessConstant.DEBIT_CARD_REQ) {
      valueToCompareWith = CommonBussinessConstant.END_USER_INPUT_ID;
      reverseChecking = true;
    }

    if (operId === CommonBussinessConstant.CREDIT_CARD_REQ) {
      valueToCompareWith = CommonBussinessConstant.END_USER_INPUT_ID;
      reverseChecking = true;
    }

    if (operId === CommonBussinessConstant.CHEQUE_BOOK_REQ) {
      valueToCompareWith = CommonBussinessConstant.END_USER_INPUT_ID;
      reverseChecking = true;
    }

    if (operId === CommonBussinessConstant.FACILITY_REQUEST_OPER) {
      valueToCompareWith = CommonBussinessConstant.FACILITY_USER_INPUT_VALUE;
    }

    if (operId === CommonBussinessConstant.CIF_ONBOARDING_OPER) {
      valueToCompareWith = CommonBussinessConstant.OTHER;
      reverseChecking = true;
    }

    if (operId === CommonBussinessConstant.ON_BOARDING_OPER) {
      valueToCompareWith = CommonBussinessConstant.OTHER;
      reverseChecking = true;
    }
    if (operId > 0 && param && valueToCompareWith) {
      const result = await this.getParamValOf(param).catch((error) => { });
      if (result !== -1 && (valueToCompareWith != null && result[param] === valueToCompareWith)) {
        returnValue.enableCifBranch = reverseChecking ? false : true;
      } else {
        returnValue.enableCifBranch = reverseChecking ? true : false;
      }
    }
    return returnValue;
  }

}

