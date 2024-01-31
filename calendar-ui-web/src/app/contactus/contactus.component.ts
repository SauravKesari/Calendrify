import { Component } from '@angular/core';
import { StringHelper } from '@helper/string.helper';
import { ContactUsModel } from '@model/contactus.model';
import { MailApiService } from '@service/mail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  name: string | undefined;
  email: string | undefined;
  contact: string | undefined;
  message: string | undefined;
  constructor(private mailAPI: MailApiService) { }
  async sendMail() {
    if (
      StringHelper.isNullorEmpty(this.name!) ||
      StringHelper.isNullorEmpty(this.email!) ||
      StringHelper.isNullorEmpty(this.contact!) ||
      StringHelper.isNullorEmpty(this.message!)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill all details!',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      return;
    }
    const contactusBody: ContactUsModel = {
      name: this.name!,
      email: this.email!,
      contact: this.contact!,
      message: this.message!,
    };
    const mailResponse = await this.mailAPI.sendMail(contactusBody);
    if (mailResponse?.status) {
      Swal.fire({
        icon: 'success',
        title: 'Your message has been submitted !',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      this.name = '';
      this.email = '';
      this.contact = '';
      this.message = '';
    }


  }
}
