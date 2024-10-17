import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // debugger
  const token = window.localStorage.getItem('token');
  const cloneReq = req.clone({
    setHeaders: {
    Authorization: `Bearer ${token}`
    }
  });
    return next(req);
    
};

// import { inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const platformId = inject(PLATFORM_ID);
  
//   if (isPlatformBrowser(platformId)) {
//     const token = window.localStorage.getItem('token');
    
//     if (token) {
//       const cloneReq = req.clone({
//         setHeaders: {
//             Authorization: `Bearer ${token}`  // Correct syntax
//         }
//     });
    
//       return next(cloneReq);
//     }
//   }

//   return next(req);
// };

