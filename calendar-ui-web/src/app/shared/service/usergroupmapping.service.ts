import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApiService } from './api.service';
import { APIOperation } from '@enums/operations.enum';
import { ApiResponse } from '@model/apiresponse';
import { UserGroupMapping } from '@model/groupmapping.model';

@Injectable({
  providedIn: 'root',
})
export class UserGroupMappingApiService {
  sourceURL: string = environment.apiBaseUrl + 'userGroupMapping/';
  constructor(private http: HttpClient) { }

  async deleteMapping(mapID: number) {
    try {
      const response = await this.http
        .delete(this.sourceURL + APIOperation.Delete + '/' + mapID)
        .toPromise();
      const apiResponse = response as ApiResponse;
      return apiResponse;
    } catch (error) {
      return null;
    }
  }

  async saveUserToGroup(body: UserGroupMapping[]) {
    try {
      const response = await this.http
        .post(this.sourceURL + APIOperation.Add, body)
        .toPromise();
      const apiResponse = response as ApiResponse;
      return apiResponse;
    } catch (error) {
      return null;
    }
  }

  async deleteUserToGroup(body: UserGroupMapping[]) {
    try {
      const response = await this.http
        .post(this.sourceURL + APIOperation.Delete, body)
        .toPromise();
      const apiResponse = response as ApiResponse;
      return apiResponse;
    } catch (error) {
      return null;
    }
  }
}
