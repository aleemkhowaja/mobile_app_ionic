import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';


const mapperValue = [
    ["currCode", "currencieCode", "curCode", "currencie", "currencie"],
    ["fromAccount", "fromAcc", "frAccount", "fAccount", "accountFrom"],
    ["toAccount", "toAcc", "tAccount", "accountTo", "accTo"],
    ["amount", "amt"]
];

@Injectable()
export class ObjectMapperProvider {
    constructor(private logger: LoggerService) { }
    private keys1: Array<string>;
    private keys2: Array<string>;
    private obj: Map<string, string>;
    private match(str1: string, str2: string): boolean {
        for (const arrayKey of mapperValue) {
            if ((arrayKey.indexOf(str1) > -1) && (arrayKey.indexOf(str2) > -1)) {
                return true;
            }
        }
        return false;
    }
    public prepare(obj1: any, obj2: any): any {
        if (!(obj1 && obj1)) {
            throw "empty object are passed";
        }
        this.obj = new Map<string, string>();
        this.keys1 = this.fetchKeys(obj1);
        this.keys2 = this.fetchKeys(obj2);
        for (const key2 in this.keys2) {
            if (this.match(this.keys2[key2], this.keys2[key2])) {
            } else {
                this.logger.error("['" + this.keys2[key2] + "']" + " <== tis key is not available in the mapper constant please add this key to the array of constant to make it available.")
            }
        }
        for (const key1 in this.keys1) {
            for (const key2 in this.keys2) {
                if (this.match(this.keys1[key1], this.keys2[key2])) {
                    this.obj.set(this.keys1[key1], obj2[this.keys2[key2]]);
                }
            }
        }
        return JSON.parse(JSON.stringify(
            Array.from(this.obj).reduce((o, [key, value]) => {
                o[key] = value;
                return o;
            }, {})
        ));
    }
    private fetchKeys(obj: any) {
        let arr = new Array<string>();
        Object.keys(obj).forEach(key => {
            arr.push(key);
        });
        return arr;
    }

}