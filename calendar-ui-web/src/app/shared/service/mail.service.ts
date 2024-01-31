import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { APIOperation } from '@enums/operations.enum';
import { ApiResponse } from '@model/apiresponse';
import { ContactUsModel } from '@model/contactus.model';

@Injectable({
    providedIn: 'root',
})
export class MailApiService {
    sourceURL: string = environment.apiBaseUrl + 'mail/';
    constructor(private http: HttpClient) { }

    async sendMail(body: ContactUsModel) {
        try {
            const response = await this.http
                .post(this.sourceURL + APIOperation.SendComplaint, body)
                .toPromise();
            const apiResponse = response as ApiResponse;
            return apiResponse;
        } catch (error) {
            return null;
        }
    }
}