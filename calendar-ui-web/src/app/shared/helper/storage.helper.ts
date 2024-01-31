import { StorageString } from '@enums/storage.enum';

export class StorageHelper {

  static setUserID(val: string) {
    localStorage.setItem(StorageString.userID, val);
  }
  static setUserProfile(val: string) {
    localStorage.setItem(StorageString.userProfile, val);
  }
  static setDeviceToken(val: string) {
    localStorage.setItem(StorageString.deviceToken, val);
  }
  static setUserName(val: string) {
    localStorage.setItem(StorageString.userName, val);
  }

  static getUserName(): string {
    return localStorage.getItem(StorageString.userName)!;
  }

  static setGoogleToken(val: string) {
    localStorage.setItem(StorageString.googleToken, val);
  }
  static setSelectedNavbar(val: string) {
    localStorage.setItem(StorageString.selectedNavbar, val);
  }

  static getSelectedNavbar(): string {
    return localStorage.getItem(StorageString.selectedNavbar)!;
  }
  static getUserID(): string {
    return localStorage.getItem(StorageString.userID)!;
  }
  static getUserProfile(): string {
    return localStorage.getItem(StorageString.userProfile)!;
  }
  static getDeviceToken(): string {
    return localStorage.getItem(StorageString.deviceToken)!;
  }
  static getGoogleToken(): string {
    return localStorage.getItem(StorageString.googleToken)!;
  }
}
