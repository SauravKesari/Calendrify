import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { StorageHelper } from '@helper/storage.helper';
import { StringHelper } from '@helper/string.helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!StringHelper.isNullorEmpty(StorageHelper.getUserID())) {
      return true; // Allow access for users with the "id" 
    } else {
      this.router.navigate(['forbidden']); // Redirect unauthorized users to the specified route
      return false;
    }
  }
}
