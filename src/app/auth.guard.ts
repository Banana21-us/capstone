import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localData = localStorage.getItem('token');
  if(localData != null){
    return true;
  }else{
    router.navigateByUrl("/login")
    return false;
  }
};
// import { isPlatformBrowser } from '@angular/common';
// import { inject, PLATFORM_ID } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const platformId = inject(PLATFORM_ID);
//   const router = inject(Router);

//   if (isPlatformBrowser(platformId)) {
//     const localData = localStorage.getItem('token');
//     if (localData != null) {
//       return true;
//     }
//   }
  
//   router.navigateByUrl("/login");
//   return false;
// };


