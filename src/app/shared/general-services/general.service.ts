import { ReadVarExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
  saveToStorage(array, key) {
    switch (array.length) {
      case 0: {
        break;
      }
      default: {
        localStorage.setItem(key, JSON.stringify(array))
        break;
      }
    }
  }

  openPage(uri) {
     const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    window.open(uri, '_blank', `width=${screenWidth},height=${screenHeight}`)
  }


  pushAppArray(array, keyword) {
    let srcArray;
    let outArray: any[] = [];
    srcArray = array;
    var recInt;
    recInt = 0;
    var websiteCategory
    var websiteName
    var websiteURL

    for (let i = 0; i < srcArray.length; ++i) {
      switch (srcArray[i].websiteCategory) {
        case keyword: {
          websiteCategory = srcArray[i].websiteCategory
          websiteName = srcArray[i].websiteName.toLowerCase()
          websiteURL = srcArray[i].websiteURL
          outArray[recInt] = {
            websiteCategory: websiteCategory,
            websiteName: websiteName,
            websiteURL: websiteURL,
          }
          recInt = recInt + 1
          break;
        }
        default: {
          break;
        }
      }
    }
    return outArray;
  }

  checkLocalCache(key) {
    let localCache;
    let cacheExists: boolean;
    try {
      localCache = JSON.parse(localStorage.getItem(key))
      switch (localCache) {
        case null: {
          cacheExists = false;
          break;
        }
        default: {
          cacheExists = true;
          break;
        }
      }
    }
    catch (e) { }
    return cacheExists;
  }

  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.editDataDetails);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}







