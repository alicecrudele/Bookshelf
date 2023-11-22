import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class CanActivateGuard implements CanActivate {
  
  canActivate() {
    console.log("CanActivateGuard");
    return true;
  }
} 
