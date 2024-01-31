import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {
  SocialAuthService,
  SocialLoginModule,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { ProfileComponent } from './profile/profile.component';
import { CardComponent } from './shared/container/card/card.component';
import { EventCategoryComponent } from './events/event-category/event-category.component';
import { SidenavBarComponent } from './sidenav-bar/sidenav-bar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ContactusComponent } from './contactus/contactus.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    EventCategoryComponent,
    CardComponent,
    SidenavBarComponent,
    CalendarComponent,
    GroupListComponent,
    ForbiddenComponent,
    ContactusComponent,
    EventAddComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    Ng2SearchPipeModule,
    NgxUiLoaderModule.forRoot({
      bgsColor: 'var(--appbg)',
      bgsOpacity: 0.5,
      bgsPosition: 'bottom-right',
      bgsSize: 90,
      bgsType: 'ball-spin-clockwise',
      blur: 15,
      delay: 0,
      fastFadeOut: true,
      fgsColor: 'var(--appbg)',
      fgsPosition: 'center-center',
      fgsSize: 90,
      fgsType: 'square-jelly-box',
      gap: 24,
      logoPosition: 'center-center',
      logoSize: 120,
      logoUrl: '',
      masterLoaderId: 'master',
      overlayBorderRadius: '0',
      overlayColor: 'rgba(255,255,255,0.94)',
      pbColor: 'var(--appbg)',
      pbDirection: 'ltr',
      pbThickness: 3,
      hasProgressBar: true,
      text: '',
      textColor: 'red',
      textPosition: 'center-center',
    }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxPaginationModule,
  ],
  providers: [
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1020684760760-1ct59mbknaeen9v1vcu3j6tfojq51kd0.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
