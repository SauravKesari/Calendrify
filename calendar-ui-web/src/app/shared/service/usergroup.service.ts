import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { APIOperation } from '@enums/operations.enum';
import { ApiResponse } from '@model/apiresponse';
import { UserGroup } from '@model/usergroup.model';
import { StorageHelper } from '@helper/storage.helper';
@Injectable({
  providedIn: 'root',
})
export class userGroupApiService {
  sourceURL: string = environment.apiBaseUrl + 'userGroup/';
  userID: string;
  constructor(private http: HttpClient) {
    this.userID = '/' + StorageHelper.getUserID();
  }

  async getUserGroupAPI({ eventCatID = '' }: { eventCatID?: string }) {
    try {
      let params = new HttpParams();
      params = ApiService.addParamsIfNotEmpty(params, 'eventCatID', eventCatID);
      params = ApiService.addParamsIfNotEmpty(
        params,
        'userID',
        StorageHelper.getUserID()
      );
      const options = { params: params };
      const response = await this.http
        .get(this.sourceURL + APIOperation.Get, options)
        .toPromise();
      const apiResponse = response as ApiResponse;
      return apiResponse;
    } catch (error) {
      console.error('getUserGroupAPI_ERROR', error);
      return null;
    }
  }

  async addUserGroupAPI(body: UserGroup) {
    try {
      const response = await this.http
        .post(this.sourceURL + APIOperation.Add + this.userID, body)
        .toPromise();
      const apiResponse = response as ApiResponse;
      return apiResponse;
    } catch (error) {
      return null;
    }
  }

  async updateUserGroupAPI(body: UserGroup, groupID?: number) {
    try {
      const response = await this.http
        .put(this.sourceURL + APIOperation.Update + '/' + groupID, body)
        .toPromise();
      const apiResponse = response as ApiResponse;
      return apiResponse;
    } catch (error) {
      return null;
    }
  }

  async deleteUserGroup(groupID: number) {
    try {
      const response = await this.http
        .delete(this.sourceURL + APIOperation.Delete + '/' + groupID)
        .toPromise();
      const apiResponse = response as ApiResponse;
      return apiResponse;
    } catch (error) {
      return null;
    }
  }

  async getGroupWithUsersAPI() {
    try {
      let params = new HttpParams();
      params = ApiService.addParamsIfNotEmpty(
        params,
        'userID',
        StorageHelper.getUserID()
      );
      const options = { params: params };
      const response = await this.http
        .get(this.sourceURL + APIOperation.GetGroupWithUsers, options)
        .toPromise();
      const apiResponse = response as ApiResponse;
      return apiResponse;
    } catch (error) {
      console.error('getUserGroupAPI_ERROR', error);
      return null;
    }
  }
}
