"use strict";
(self["webpackChunkDX_FE_Treasury"] = self["webpackChunkDX_FE_Treasury"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth/auth.guard */ 3870);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);




const routes = [{
  path: '',
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard],
  canActivateChild: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authChildGuard],
  canMatch: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authMatchGuard],
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_dashboard_dashboard_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./dashboard/dashboard.module */ 4814)).then(m => m.DashboardModule)
}, {
  path: 'dashboard',
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard],
  canActivateChild: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authChildGuard],
  canMatch: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authMatchGuard],
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_dashboard_dashboard_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./dashboard/dashboard.module */ 4814)).then(m => m.DashboardModule)
}];
class AppRoutingModule {}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
  return new (t || AppRoutingModule)();
};
AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: AppRoutingModule
});
AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/services/app-config.service */ 1559);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ 7217);




class AppComponent {
  constructor(configService) {
    this.configService = configService;
    this.configService.loadCompanyConfiguration();
  }
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_0__.AppConfigService));
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 3,
  vars: 0,
  consts: [["bdColor", "rgba(0, 0, 0, 0.7)", "template", "<i class='fa-solid fa-circle-notch fa-spin fa-3x primary-clr'></i>"], [1, "page"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "ngx-spinner", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, ngx_spinner__WEBPACK_IMPORTED_MODULE_3__.NgxSpinnerComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "initializeApp": () => (/* binding */ initializeApp),
/* harmony export */   "jwtOptionsFactory": () => (/* binding */ jwtOptionsFactory)
/* harmony export */ });
/* harmony import */ var _var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @auth0/angular-jwt */ 4467);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! angular-svg-icon */ 2183);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-toastr */ 4817);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ng-select/ng-select */ 3054);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _shared_services_token_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/services/token.service */ 8128);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 9200);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _shared_services_excel_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/services/excel.service */ 8219);
/* harmony import */ var _shared_services_helper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/services/helper.service */ 1785);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-spinner */ 7217);
/* harmony import */ var _shared_jwt_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/jwt.interceptor */ 2824);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth/auth.module */ 1674);
/* harmony import */ var _shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/services/app-config.service */ 1559);

























function initializeApp(configService) {
  return /*#__PURE__*/(0,_var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    yield configService.load();
    // await configService.loadVersion();
  });
}

function jwtOptionsFactory(tokenService, appConfig) {
  return {
    tokenGetter: () => tokenService.token,
    allowedDomains: appConfig.allowedDomains || [],
    disallowedRoutes: [] // you can add if needed
  };
}

class AppModule {}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)();
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
  type: AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent]
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
  providers: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe, _shared_services_excel_service__WEBPACK_IMPORTED_MODULE_4__.ExcelService, _shared_services_helper_service__WEBPACK_IMPORTED_MODULE_5__.HelperService, {
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_9__.APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_8__.AppConfigService],
    multi: true
  }, {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HTTP_INTERCEPTORS,
    useClass: _shared_jwt_interceptor__WEBPACK_IMPORTED_MODULE_6__.JwtInterceptor,
    multi: true
  }],
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule, _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_15__.JwtModule.forRoot({
    jwtOptionsProvider: {
      provide: _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_15__.JWT_OPTIONS,
      useFactory: jwtOptionsFactory,
      deps: [_shared_services_token_service__WEBPACK_IMPORTED_MODULE_3__.TokenService, _shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_8__.AppConfigService]
    }
  }), angular_svg_icon__WEBPACK_IMPORTED_MODULE_16__.AngularSvgIconModule.forRoot(), ngx_toastr__WEBPACK_IMPORTED_MODULE_17__.ToastrModule.forRoot({
    timeOut: 3000,
    closeButton: true,
    positionClass: 'toast-top-center'
  }), _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_18__.NgSelectModule, _auth_auth_module__WEBPACK_IMPORTED_MODULE_7__.AuthModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_19__.FontAwesomeModule, ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule, _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_15__.JwtModule, angular_svg_icon__WEBPACK_IMPORTED_MODULE_16__.AngularSvgIconModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_17__.ToastrModule, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_18__.NgSelectModule, _auth_auth_module__WEBPACK_IMPORTED_MODULE_7__.AuthModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_19__.FontAwesomeModule, ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerModule]
  });
})();

/***/ }),

/***/ 431:
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthRoutingModule": () => (/* binding */ AuthRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.component */ 980);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);




const routes = [{
  path: 'login',
  component: _auth_component__WEBPACK_IMPORTED_MODULE_0__.AuthComponent
}];
class AuthRoutingModule {}
AuthRoutingModule.ɵfac = function AuthRoutingModule_Factory(t) {
  return new (t || AuthRoutingModule)();
};
AuthRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: AuthRoutingModule
});
AuthRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AuthRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 980:
/*!****************************************!*\
  !*** ./src/app/auth/auth.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthComponent": () => (/* binding */ AuthComponent)
/* harmony export */ });
/* harmony import */ var _var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 8951);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _shared_services_token_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/services/token.service */ 8128);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @auth0/angular-jwt */ 4467);
/* harmony import */ var _shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/app-config.service */ 1559);








class AuthComponent {
  constructor(router, activatedRoute, _tokenService, jwtService, appConfig) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this._tokenService = _tokenService;
    this.jwtService = jwtService;
    this.appConfig = appConfig;
    this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
  }
  ngOnInit() {
    var _this = this;
    if (this.appConfig.bypassAuth) {
      this.router.navigateByUrl('/dashboard');
      return;
    }
    this.activatedRoute.queryParams.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.unsubscribe)).subscribe( /*#__PURE__*/function () {
      var _ref = (0,_var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params) {
        const urlToken = params['token'];
        const redirect = params['redirectUrl'] || '/dashboard';
        const localToken = _this._tokenService.token;
        const ssoToken = _this._tokenService.ssoAccessToken;
        // Normal app login
        if (urlToken) {
          try {
            localStorage.setItem('redirectUrl', redirect);
            _this._tokenService.saveToken(urlToken);
            const payload = _this.jwtService.decodeToken(urlToken);
            if (payload) {
              _this._tokenService.saveUser(payload);
              yield _this.appConfig.loadCompanyConfiguration();
              _this.router.navigateByUrl('/dashboard');
            } else {
              _this.router.navigateByUrl('/unauthorized');
            }
          } catch (e) {
            console.error('Login error (url token):', e);
            _this.router.navigateByUrl('/unauthorized');
          }
          return;
        }
        // SSO login
        if (!localToken && ssoToken) {
          try {
            if (!localStorage.getItem('redirectUrl')) {
              localStorage.setItem('redirectUrl', redirect);
            }
            const decoded = _this.jwtService.decodeToken(ssoToken);
            if (!decoded) {
              _this.router.navigateByUrl('/unauthorized');
              return;
            }
            const id = decoded.nameid ?? decoded.UserID ?? decoded.sid ?? decoded.sub ?? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'] ?? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? null;
            _this._tokenService.saveUser({
              nameid: id,
              UserID: id,
              fullName: decoded.unique_name ?? decoded.name ?? '',
              userPortals: decoded.userPortals ?? []
            });
            yield _this.appConfig.loadCompanyConfiguration();
            const redirectUrl = localStorage.getItem('redirectUrl') || '/dashboard';
            localStorage.removeItem('redirectUrl');
            _this.router.navigateByUrl(redirectUrl);
          } catch (e) {
            console.error('Login error (SSO cookie):', e);
            _this.router.navigateByUrl('/unauthorized');
          }
          return;
        }
        // Already authenticated
        if (localToken) {
          yield _this.appConfig.loadCompanyConfiguration();
          return;
        }
        // No authentication
        if (!urlToken && !ssoToken) {
          window.location.href = _this.appConfig.portalUrl;
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
AuthComponent.ɵfac = function AuthComponent_Factory(t) {
  return new (t || AuthComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_token_service__WEBPACK_IMPORTED_MODULE_1__.TokenService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_7__.JwtHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__.AppConfigService));
};
AuthComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: AuthComponent,
  selectors: [["app-auth"]],
  decls: 0,
  vars: 0,
  template: function AuthComponent_Template(rf, ctx) {},
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 3870:
/*!************************************!*\
  !*** ./src/app/auth/auth.guard.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authChildGuard": () => (/* binding */ authChildGuard),
/* harmony export */   "authGuard": () => (/* binding */ authGuard),
/* harmony export */   "authMatchGuard": () => (/* binding */ authMatchGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 5474);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @auth0/angular-jwt */ 4467);
/* harmony import */ var _shared_services_token_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/services/token.service */ 8128);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/services/auth.service */ 8915);
/* harmony import */ var _shared_api_urls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/api-urls */ 6296);
/* harmony import */ var _shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/app-config.service */ 1559);










const SESSION_FLAG_USER = `ssoUserSaved`;
const DEV_BYPASS = false;
const authGuard = (route, state) => {
  return handleAuthGuard(route, state.url);
};
const authChildGuard = (route, state) => {
  return handleAuthGuard(route, state.url);
};
const authMatchGuard = (route, segments) => {
  const url = '/' + segments.map(s => s.path).join('/');
  return handleAuthGuard({
    queryParams: {}
  }, url);
};
function handleAuthGuard(route, url) {
  const http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient);
  const tokenStore = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_shared_services_token_service__WEBPACK_IMPORTED_MODULE_0__.TokenService);
  const authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService);
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router);
  const jwtHelper = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_7__.JwtHelperService);
  if (url.startsWith('/login') || url.startsWith('/unauthorized')) {
    return true;
  }
  const appConfig = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_3__.AppConfigService);
  const getAccessEndpoint = `${appConfig.masterBaseUrl.replace(/\/+$/, '')}/${_shared_api_urls__WEBPACK_IMPORTED_MODULE_2__.ApiUrls.User.GetAccess.replace(/^\/+/, '')}`;
  const urlToken = route.queryParams['token'];
  const localStorageToken = tokenStore.token;
  const isSSOMode = tokenStore.isSingleSignOnMode;
  const ssoAccessToken = tokenStore.ssoAccessToken;
  if (urlToken) {
    const redirectUrl = localStorage.getItem('redirectUrl') || route.queryParams['redirectUrl'] || url || '/';
    return processUrlTokenWithValidation(urlToken, redirectUrl, tokenStore, jwtHelper, router, http, getAccessEndpoint, authService);
  }
  if (localStorageToken || ssoAccessToken) {
    saveLastProtectedUrl(url);
    if (isSSOMode && ssoAccessToken) {
      ensureSsoUserSaved(tokenStore, jwtHelper);
      return validateAccessToken(tokenStore, http, authService, router, getAccessEndpoint);
    } else {
      return true;
    }
  }
  if (!localStorageToken && ssoAccessToken) {
    return processSsoTokenWithValidation(ssoAccessToken, tokenStore, jwtHelper, router, http, getAccessEndpoint, authService, url);
  }
  if (DEV_BYPASS) {
    return true;
  }
  if (!isSSOMode) {
    return redirect(url, router);
  }
  return redirect(url, router);
}
function saveLastProtectedUrl(url) {
  if (url && url !== '/login' && url !== '/welcome') {
    localStorage.setItem('lastProtectedUrl', url);
  }
}
function processUrlTokenWithValidation(token, redirectUrl, tokenStore, jwtHelper, router, http, getAccessEndpoint, authService) {
  try {
    localStorage.setItem('redirectUrl', redirectUrl);
    tokenStore.setToken(token);
    const payload = jwtHelper.decodeToken(token);
    if (!payload) {
      router.navigateByUrl('/unauthorized');
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => new Error('Invalid token'));
    }
    tokenStore.saveUser(payload);
    return validateAccessToken(tokenStore, http, authService, router, getAccessEndpoint);
  } catch (e) {
    router.navigateByUrl('/unauthorized');
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => e);
  }
}
function processSsoTokenWithValidation(token, tokenStore, jwtHelper, router, http, getAccessEndpoint, authService, attemptedUrl) {
  try {
    const decoded = jwtHelper.decodeToken(token);
    if (!decoded) {
      router.navigateByUrl('/unauthorized');
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => new Error('Invalid SSO token'));
    }
    let redirectUrl = localStorage.getItem('redirectUrl');
    if (!redirectUrl) {
      redirectUrl = localStorage.getItem('lastProtectedUrl');
      if (!redirectUrl || redirectUrl === '/' || redirectUrl === '/login') {
        redirectUrl = attemptedUrl && attemptedUrl !== '/login' ? attemptedUrl : '/dashboard';
      }
      localStorage.setItem('redirectUrl', redirectUrl);
    }
    const id = decoded.nameid ?? decoded.UserID ?? decoded.sid ?? decoded.sub ?? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'] ?? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? null;
    const userData = {
      nameid: id,
      UserID: id,
      fullName: decoded.unique_name ?? decoded.name ?? '',
      userPortals: decoded.userPortals ?? []
    };
    tokenStore.saveUser(userData);
    ensureSsoUserSaved(tokenStore, jwtHelper);
    return validateAccessToken(tokenStore, http, authService, router, getAccessEndpoint);
  } catch (e) {
    router.navigateByUrl('/unauthorized');
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => e);
  }
}
function validateAccessToken(tokenStore, http, authService, router, getAccessEndpoint) {
  const token = tokenStore.ssoAccessToken || tokenStore.token;
  if (!token) {
    router.navigate(['/login']);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => new Error('No access token'));
  }
  return http.post(getAccessEndpoint, {
    token
  }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(response => {
    if (response?.Status === false) {
      throw new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpErrorResponse({
        error: response,
        status: 401,
        statusText: 'API Error',
        url: getAccessEndpoint
      });
    }
    const userId = response?.enhancedUserDetails?.userId;
    const roleId = response?.enhancedUserDetails?.roles?.roleId;
    const roleName = response?.enhancedUserDetails?.roles?.roleName || response?.enhancedUserDetails?.roles?.name;
    if (userId) localStorage.setItem('userId', userId.toString());
    if (roleId) localStorage.setItem('roleId', roleId.toString());
    if (roleName) localStorage.setItem('roleName', roleName);
    if (roleId && roleName) {
      localStorage.setItem('trole', JSON.stringify({
        roleId,
        name: roleName
      }));
    }
    return true;
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.catchError)(err => {
    return handleAccessError(err, tokenStore, authService, router, getAccessEndpoint, http);
  }));
}
function handleAccessError(err, tokenStore, authService, router, getAccessEndpoint, http) {
  if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpErrorResponse && err.status === 401 && tokenStore.isSingleSignOnMode) {
    const refreshToken = tokenStore.ssoRefreshToken;
    if (!refreshToken) {
      router.navigate(['/login']);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => new Error('No refresh token'));
    }
    return refreshAndRetry(authService, tokenStore, router, getAccessEndpoint, http);
  }
  if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpErrorResponse && err.status === 401 && tokenStore.isSingleSignOnMode) {
    const refreshToken = tokenStore.ssoRefreshToken;
    if (!refreshToken) {
      router.navigate(['/login']);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => new Error('No refresh token'));
    }
    clearTimeout(window.__loginRedirectTimer);
    return refreshAndRetry(authService, tokenStore, router, getAccessEndpoint, http);
  }
  return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => err);
}
function refreshAndRetry(authService, tokenStore, router, getAccessEndpoint, http) {
  const {
    isRefreshing,
    tokenSubject
  } = authService.getRefreshState();
  if (!isRefreshing) {
    const refreshToken = tokenStore.ssoRefreshToken;
    return authService.refreshToken(refreshToken).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(() => true), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.catchError)(e => {
      router.navigate(['/login']);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => e);
    }));
  }
  return tokenSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.filter)(t => t !== null), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(() => true));
}
function ensureSsoUserSaved(tokenStore, jwtHelper) {
  if (DEV_BYPASS || !tokenStore.isSingleSignOnMode || sessionStorage.getItem(SESSION_FLAG_USER) === '1') {
    return;
  }
  const token = tokenStore.ssoAccessToken;
  if (!token) {
    return;
  }
  const decoded = jwtHelper.decodeToken(token);
  if (!decoded) {
    return;
  }
  const id = decoded.nameid ?? decoded.UserID ?? decoded.sid ?? decoded.sub ?? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'] ?? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? null;
  const user = {
    nameid: id,
    UserID: id,
    fullName: decoded.unique_name ?? decoded.name ?? '',
    userPortals: decoded.userPortals ?? []
  };
  tokenStore.saveUser(user);
  sessionStorage.setItem(SESSION_FLAG_USER, '1');
}
function redirect(returnUrl, router) {
  const currentUrl = router.url;
  if (currentUrl === '/login') {
    return router.parseUrl('/unauthorized');
  }
  if (returnUrl && returnUrl !== '/login') {
    localStorage.setItem('redirectUrl', returnUrl);
    localStorage.setItem('lastProtectedUrl', returnUrl);
  }
  return router.parseUrl('/login');
}

/***/ }),

/***/ 1674:
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthModule": () => (/* binding */ AuthModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-routing.module */ 431);
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.component */ 980);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);




class AuthModule {}
AuthModule.ɵfac = function AuthModule_Factory(t) {
  return new (t || AuthModule)();
};
AuthModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: AuthModule
});
AuthModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _auth_routing_module__WEBPACK_IMPORTED_MODULE_0__.AuthRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AuthModule, {
    declarations: [_auth_component__WEBPACK_IMPORTED_MODULE_1__.AuthComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _auth_routing_module__WEBPACK_IMPORTED_MODULE_0__.AuthRoutingModule]
  });
})();

/***/ }),

/***/ 6296:
/*!************************************!*\
  !*** ./src/app/shared/api-urls.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiUrls": () => (/* binding */ ApiUrls)
/* harmony export */ });
const ApiUrls = {
  User: {
    GetAccess: '/User/GetAccess',
    RefreshThirdPartyToken: '/User/RefreshThirdPartyToken',
    ClickPortal: "User/ClickPortal"
  },
  CompanyConfiguration: {
    GetCompanyConfig: 'CompanyConfiguration/GetCompanyConfig'
  }
};

/***/ }),

/***/ 2824:
/*!*******************************************!*\
  !*** ./src/app/shared/jwt.interceptor.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JwtInterceptor": () => (/* binding */ JwtInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 5474);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1353);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var _api_urls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-urls */ 6296);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_token_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/token.service */ 8128);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/auth.service */ 8915);
/* harmony import */ var _services_app_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/app-config.service */ 1559);









class JwtInterceptor {
  constructor(tokenStore, authService, appConfig, handler) {
    this.tokenStore = tokenStore;
    this.authService = authService;
    this.appConfig = appConfig;
    this.getAccessEndpoint = `${this.appConfig.masterBaseUrl.replace(/\/+$/, '')}/${_api_urls__WEBPACK_IMPORTED_MODULE_0__.ApiUrls.User.GetAccess.replace(/^\/+/, '')}`;
    this.refreshEndpoint = `${this.appConfig.masterBaseUrl.replace(/\/+$/, '')}/${_api_urls__WEBPACK_IMPORTED_MODULE_0__.ApiUrls.User.RefreshThirdPartyToken.replace(/^\/+/, '')}`;
    this.rawHttp = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient(handler);
  }
  isTokenEndpoint(url) {
    return url.startsWith(this.getAccessEndpoint) || url.startsWith(this.refreshEndpoint);
  }
  intercept(req, next) {
    const localToken = this.tokenStore.token;
    const ssoAccess = this.tokenStore.ssoAccessToken;
    const inSsoMode = this.tokenStore.isSingleSignOnMode;
    const tokenToUse = this.isTokenEndpoint(req.url) ? ssoAccess || localToken || null : localToken || ssoAccess || null;
    const authedReq = tokenToUse ? this.addAuth(req, tokenToUse) : req;
    return next.handle(authedReq).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.mergeMap)(event => {
      if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpResponse) {
        const body = event.body;
        if (event.url?.startsWith(this.getAccessEndpoint) && body?.originalResponse?.Status === true) {
          this.saveUserFromGetAccess(body);
        }
        if (body?.Status === false && (body?.Error === 'Token has expired' || body?.Message === 'Token has expired')) {
          const ssoRefresh = this.tokenStore.ssoRefreshToken;
          if (inSsoMode && ssoRefresh) {
            return this.refreshAndRetry(req, next, ssoRefresh);
          }
        }
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(event);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(err => this.handleError(err, authedReq, next)));
  }
  saveUserFromGetAccess(res) {
    const data = res?.originalResponse?.Data;
    const enhanced = res?.enhancedUserDetails;
    if (!data) return;
    const id = data.EmployeeID && data.EmployeeID !== 0 ? data.EmployeeID : data.ID && data.ID !== 0 ? data.ID : data.MarkaziaUserID ?? null;
    const fullName = enhanced?.userDetails?.fullName || [data.FirstName, data.SecondName, data.ThirdName, data.LastName].filter(Boolean).join(' ') || data.Email || '';
    const email = enhanced?.userDetails?.userEmail || data.Email || '';
    this.tokenStore.saveUser({
      nameid: id,
      UserID: id,
      EmployeeID: data.EmployeeID ?? data.ID ?? null,
      EmpNo: data.EmpNo ?? null,
      Email: email,
      fullName,
      userPortals: [],
      role: enhanced?.roles?.roleName ?? null,
      city: enhanced?.city ?? null,
      profileImage: enhanced?.userDetails?.profileImage ?? ''
    });
    this.tokenStore.saveEmployeeInfo(res);
  }
  handleError(err, req, next) {
    if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpErrorResponse && (err.status === 401 || err.status === 400 && /unauthorized/i.test(err.error?.errors?.[0]?.errorMessageEn ?? ''))) {
      const message = err?.error?.Message || err?.error?.Error || err?.message || '';
      const expired = /expired|invalid/i.test(message);
      if (expired) {
        const refreshToken = this.tokenStore.ssoRefreshToken;
        if (refreshToken) {
          return this.refreshAndRetry(req, next, refreshToken);
        }
      }
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => err);
  }
  refreshAndRetry(req, next, refreshToken) {
    const {
      isRefreshing,
      tokenSubject
    } = this.authService.getRefreshState();
    if (!isRefreshing) {
      return this.authService.refreshToken(refreshToken).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(({
        accessToken
      }) => {
        const retried = this.addAuth(req, accessToken);
        return next.handle(retried);
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(e => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.throwError)(() => e)));
    }
    return tokenSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(t => !!t), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(t => next.handle(this.addAuth(req, t))));
  }
  /**
   * Dynamically attaches the correct header for local or SSO authentication.
   */
  addAuth(req, token) {
    const url = req.url.toLowerCase();
    // Skip adding auth header for specific endpoints
    if (url.includes('getaccess') || url.includes('refreshthirdpartytoken')) {
      return req;
    }
    const headerName = this.tokenStore.isSingleSignOnMode ? 'HubAuthorization' : 'Authorization';
    return req.clone({
      setHeaders: {
        [headerName]: `Bearer ${token}`
      }
    });
  }
}
JwtInterceptor.ɵfac = function JwtInterceptor_Factory(t) {
  return new (t || JwtInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_services_token_service__WEBPACK_IMPORTED_MODULE_1__.TokenService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_services_app_config_service__WEBPACK_IMPORTED_MODULE_3__.AppConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpBackend));
};
JwtInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjectable"]({
  token: JwtInterceptor,
  factory: JwtInterceptor.ɵfac
});

/***/ }),

/***/ 1559:
/*!*******************************************************!*\
  !*** ./src/app/shared/services/app-config.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppConfigService": () => (/* binding */ AppConfigService)
/* harmony export */ });
/* harmony import */ var _var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 4363);
/* harmony import */ var _api_urls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api-urls */ 6296);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8987);





class AppConfigService {
  constructor(http) {
    this.http = http;
    this.config = null;
    this.isLoaded = false;
    this.companyConfiguration = null;
  }
  load() {
    return Promise.all([(0,rxjs__WEBPACK_IMPORTED_MODULE_2__.firstValueFrom)(this.http.get('/assets/config.json')), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.firstValueFrom)(this.http.get('/assets/version.json')).catch(() => ({}))]).then(([config, version]) => {
      this.config = {
        ...config,
        ...version
      };
      this.isLoaded = true;
      console.log('AppConfig loaded successfully', this.config);
    }).catch(err => {
      console.error('Failed to load app config', err);
      throw err;
    });
  }
  loadCompanyConfiguration() {
    var _this = this;
    return (0,_var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const response = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.firstValueFrom)(_this.http.get(_this.masterBaseUrl + _api_urls__WEBPACK_IMPORTED_MODULE_1__.ApiUrls.CompanyConfiguration.GetCompanyConfig, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }));
        if (response?.data) {
          _this.companyConfiguration = response.data;
        }
      } catch (err) {
        console.error('Failed to load company configuration', err);
        _this.companyConfiguration = {};
      }
    })();
  }
  get companyLogo() {
    return this.companyConfiguration?.logoURL || this.config.logoURL || '';
  }
  // currency
  get currency() {
    return this.companyConfiguration?.currency || this.config.currency;
  }
  getValue(key, defaultValue = null) {
    if (!this.isLoaded || !this.config) {
      // Silence warnings for keys commonly accessed early
      const earlyKeys = ['production', 'bypassAuth', 'masterBaseUrl', 'apiUrl'];
      if (!earlyKeys.includes(key)) {
        console.warn(`${key} accessed BEFORE config loaded.`);
      }
      return defaultValue;
    }
    const value = this.config[key];
    return value !== undefined && value !== null ? value : defaultValue;
  }
  // ==================== Getters ====================
  get production() {
    return this.getValue('production', false);
  }
  get bypassAuth() {
    return this.getValue('bypassAuth', false);
  }
  get apiUrl() {
    return this.getValue('apiUrl', '');
  }
  get apiUrl2() {
    return this.getValue('apiUrl2', '');
  }
  get masterBaseUrl() {
    return this.getValue('masterBaseUrl', '');
  }
  get portalUrl() {
    return this.getValue('portalUrl', '');
  }
  get portalPageUrl() {
    return this.getValue('portalUrl', '');
  }
  get env() {
    return this.getValue('env', '');
  }
  // Domain of the SSO cookies written by the Hub, prefixed with env (e.g. .dev.markaziahub.com)
  get ssoCookieDomain() {
    const env = this.env;
    return env ? `.${env}.markaziahub.com` : '.markaziahub.com';
  }
  get googleMapKey() {
    return this.getValue('googleMapKey', '');
  }
  get generalToken() {
    return this.getValue('generalToken', '');
  }
  get allowedDomains() {
    return this.getValue('allowedDomains', []);
  }
  get staticAuth() {
    return this.bypassAuth ? this.getValue('staticAuth', null) : null;
  }
  get version() {
    return this.getValue('version', '1.0.0');
  }
  get isReady() {
    return this.isLoaded;
  }
}
AppConfigService.ɵfac = function AppConfigService_Factory(t) {
  return new (t || AppConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
};
AppConfigService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: AppConfigService,
  factory: AppConfigService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 8915:
/*!*************************************************!*\
  !*** ./src/app/shared/services/auth.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 5474);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 2313);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @auth0/angular-jwt */ 4467);
/* harmony import */ var _token_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token.service */ 8128);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.service */ 8613);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-config.service */ 1559);








class AuthService {
  constructor(jwtHelperService, tokenService, userService, http, appConfig) {
    this.jwtHelperService = jwtHelperService;
    this.tokenService = tokenService;
    this.userService = userService;
    this.http = http;
    this.appConfig = appConfig;
    this._isRefreshing = false;
    this._tokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null);
    this.refreshUrl = `${this.appConfig.masterBaseUrl?.replace(/\/+$/, '')}/User/RefreshThirdPartyToken`;
  }
  get userId() {
    const token = this.getDecodedToken();
    return token ? Number(token.nameid) : localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : localStorage.getItem('employeeId') ? Number(localStorage.getItem('employeeId')) : null;
  }
  get getUserRole() {
    return JSON.parse(localStorage.getItem('trole') || 'null');
  }
  getDecodedToken() {
    try {
      return this.jwtHelperService.decodeToken(this.tokenService.token);
    } catch (error) {
      console.error('[AuthService] Token decode error:', error);
      return null;
    }
  }
  getLoggedUserDetails() {
    if (this.userId) {
      return this.userService.getUserDetails(this.userId);
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(null);
  }
  refreshToken(refreshToken) {
    if (this._isRefreshing) {
      return this._tokenSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(token => ({
        accessToken: token || '',
        refreshToken
      })));
    }
    this._isRefreshing = true;
    this._tokenSubject.next(null);
    const body = {
      RefreshToken: refreshToken
    };
    return this.http.post(this.refreshUrl, body).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(res => {
      if (!res?.Status || !res?.Data?.AccessToken) {
        throw new Error(res?.Message || res?.Error || 'Invalid refresh response');
      }
      this.tokenService.ssoAccessTokenSet(res.Data.AccessToken);
      if (res.Data.RefreshToken) {
        this.tokenService.ssoRefreshTokenSet(res.Data.RefreshToken);
      }
      this._tokenSubject.next(res.Data.AccessToken);
      return {
        accessToken: res.Data.AccessToken,
        refreshToken: res.Data.RefreshToken
      };
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => {
      console.error('[AuthService.refreshToken] Error:', err);
      this.tokenService.signOut();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)(() => err);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.finalize)(() => {
      this._isRefreshing = false;
    }));
  }
  getRefreshState() {
    return {
      isRefreshing: this._isRefreshing,
      tokenSubject: this._tokenSubject.asObservable()
    };
  }
}
AuthService.ɵfac = function AuthService_Factory(t) {
  return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_10__.JwtHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_token_service__WEBPACK_IMPORTED_MODULE_0__.TokenService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_1__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_app_config_service__WEBPACK_IMPORTED_MODULE_2__.AppConfigService));
};
AuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
  token: AuthService,
  factory: AuthService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 8219:
/*!**************************************************!*\
  !*** ./src/app/shared/services/excel.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExcelService": () => (/* binding */ ExcelService)
/* harmony export */ });
/* harmony import */ var _var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! exceljs */ 4498);
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 2938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _helper_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper.service */ 1785);





class ExcelService {
  constructor(_helperService) {
    this._helperService = _helperService;
  }
  exportToExcelJs1(exportToExcelOptions) {
    const workbook = new exceljs__WEBPACK_IMPORTED_MODULE_1__.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    // Add main heading if provided
    if (exportToExcelOptions.mainHeading) {
      const mainHeadingRow = worksheet.addRow([exportToExcelOptions.mainHeading]);
      mainHeadingRow.font = {
        bold: true,
        size: 18,
        color: {
          argb: 'ff000000'
        }
      };
      worksheet.addRow([]); // Add an empty row for spacing
    }
    // Function to add a section
    const addSection = section => {
      // Add section heading
      if (section.heading.length) {
        const headingRow = worksheet.addRow(section.heading);
        headingRow.font = {
          bold: true,
          size: 14,
          color: {
            argb: 'ff000000'
          }
        };
      }
      // Display data as key-value pairs or in table format
      if (section.showAsKeyValue) {
        section.headers.forEach((header, index) => {
          const row = worksheet.addRow([header, section.data[index]]);
          row.getCell(1).font = {
            bold: true
          }; // Make key (header) bold
        });
      } else {
        const headerRow = worksheet.addRow(section.headers); // Add section headers
        if (this._helperService.hasValue(section.headerStyle)) {
          headerRow.eachCell((cell, colNumber) => {
            let font = {};
            for (let key in section.headerStyle) {
              let value = section?.headerStyle[key];
              if (key !== 'fgColor') {
                if (value) {
                  font[key] = value;
                }
              }
            }
            cell.font = font;
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: section?.headerStyle?.fgColor
            };
            worksheet.getColumn(colNumber).width = 20;
          });
        } else headerRow.font = {
          bold: true,
          size: 12,
          color: {
            argb: 'ff000000'
          }
        };
        // Add nested headers dynamically (if present)
        if (section.nestedHeaders && section.nestedHeaders.length) {
          const emptySpace = Array(section.headers.length).fill(''); // Create empty cells for main headers
          const nestedHeaderRow = worksheet.addRow([...emptySpace, ...section.nestedHeaders]);
          nestedHeaderRow.font = {
            bold: true,
            size: 12,
            color: {
              argb: 'ff000000'
            }
          };
        }
        // Loop through each item in the data array
        section.data.forEach(item => {
          // Dynamically construct the main row based on section.headerKeyMapping
          const mainRowData = section.mainKeyMapping.map(key => lodash__WEBPACK_IMPORTED_MODULE_2__.get(item, key)); // Map data keys to headers
          const mainRow = worksheet.addRow(mainRowData); // Add dynamic main row
          // If the item has nested data
          if (item.nestedData && section.nestedHeaders && section.nestedKeyMapping) {
            item.nestedData.forEach(nestedItem => {
              // Create an array of nested row data based on nestedKeyMapping
              const nestedRow = section.nestedKeyMapping.map(key => nestedItem[key]);
              worksheet.addRow([...Array(section.headers.length).fill(''), ...nestedRow]);
            });
          } else if (item.nestedData && section.nestedKeyMapping) {
            item.nestedData.forEach(nestedItem => {
              const nestedRow = section.nestedKeyMapping.map(key => nestedItem[key]);
              worksheet.addRow([...Array(section.skipNestedColumn).fill(''), ...nestedRow]);
            });
          }
          // Add gap after each data row
          if (section?.dataRowGap > 0) {
            for (var i = 0; i < section?.dataRowGap; i++) {
              worksheet.addRow([]);
            }
          }
        });
      }
      worksheet.addRow([]); // Add gap after each section
    };
    // Loop through each section and add it to the worksheet
    exportToExcelOptions.sections.forEach(section => {
      addSection(section);
    });
    // Generate Excel file
    if (!exportToExcelOptions.blob) {
      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = exportToExcelOptions.fileName + '.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
      return false;
    } else {
      return this.exportToExcelFunc(workbook, exportToExcelOptions);
    }
  }
  exportToExcelFunc(workbook, exportToExcelOptions) {
    return (0,_var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const buffer = yield workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      return blob;
    })();
  }
}
ExcelService.ɵfac = function ExcelService_Factory(t) {
  return new (t || ExcelService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_helper_service__WEBPACK_IMPORTED_MODULE_3__.HelperService));
};
ExcelService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: ExcelService,
  factory: ExcelService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 1785:
/*!***************************************************!*\
  !*** ./src/app/shared/services/helper.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelperService": () => (/* binding */ HelperService)
/* harmony export */ });
/* harmony import */ var _var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 2938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);





class HelperService {
  constructor(_datePipe, _router) {
    this._datePipe = _datePipe;
    this._router = _router;
    this.fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    this.fileToBase64 = /*#__PURE__*/function () {
      var _ref = (0,_var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (file.type !== 'application/pdf') {
              resolve({
                fileType: file.type,
                base64: reader.result,
                file,
                fileName: file.name
              });
            } else {
              resolve({
                fileType: file.type,
                file,
                fileName: file.name
              });
            }
          };
          reader.onerror = e => reject(e);
        });
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  }
  dateFormate(input, format) {
    let value = !format && 'yyyy-MM-dd' || format;
    return this._datePipe.transform(input, value);
  }
  trim(value) {
    for (var key in value) {
      if (value[key] && (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(value[key])) {
        value[key] = value[key].trim();
      } else if (value[key] === null || value[key] === undefined) {
        value[key] = '';
      }
    }
    return value;
  }
  allKeysHaveValue(obj) {
    for (const key in obj) {
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  }
  hasValue(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        return true; // At least one key has a value
      }
    }

    return false; // No key has a value
  }

  convertFormGroupToFormData(formGroup, preventAppendingControls) {
    // preventAppendingControls param sometime you don't need to append control to formdata then you need to pass that control name in that param;
    const formData = new FormData();
    Object.keys(formGroup.controls).forEach(controlName => {
      let isExists = preventAppendingControls?.includes(controlName);
      if (!isExists) {
        const control = formGroup.get(controlName);
        formData.append(controlName, control?.value);
      }
    });
    return formData;
  }
  checkInvalidImageFormat(data, returnObj = false) {
    let invalidError = '';
    let invalidExtentions = false;
    let files;
    let getFiles = data.map(x => {
      return x.file;
    });
    if (getFiles[0] !== undefined) files = getFiles;else files = data;
    for (let file of files) {
      if (!this.fileTypes.includes(file.type)) {
        invalidExtentions = true;
        invalidError = 'This file not support, supported formates: JPEG, JPG, PNG, PDF';
        break;
      }
    }
    if (returnObj) return {
      invalidExtentions,
      invalidError
    };else return invalidExtentions;
  }
  navigateToRouteWithQueryString(routeName, queryParams) {
    if (queryParams == undefined || queryParams == null) this._router.navigate([routeName]);else this._router.navigate([routeName], queryParams);
  }
  navigateToRoute(routeName, params) {
    if (!params) this._router.navigate([routeName]);else this._router.navigate([routeName, params]);
  }
  getAttachmentName(url) {
    return url.split('/').pop();
  }
  downloadFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = fileName;
    // Create a click event to trigger the download
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    });
    link.dispatchEvent(clickEvent);
  }
}
HelperService.ɵfac = function HelperService_Factory(t) {
  return new (t || HelperService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
HelperService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: HelperService,
  factory: HelperService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 8128:
/*!**************************************************!*\
  !*** ./src/app/shared/services/token.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenService": () => (/* binding */ TokenService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-config.service */ 1559);


const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'MarkaziaRefreshToken';
const USER_KEY = 'currentUser';
class TokenService {
  constructor(appConfig) {
    this.appConfig = appConfig;
  }
  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  get token() {
    let accessToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || '';
    if (!accessToken && !this.appConfig.production && this.appConfig.bypassAuth) {
      accessToken = this.appConfig.generalToken;
    }
    return accessToken;
  }
  setToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  }
  setRefreshToken(token) {
    if (token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }
  decodeToken() {
    const token = this.token;
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Invalid token format', error);
      return null;
    }
  }
  getFullName() {
    const decoded = this.decodeToken();
    return decoded?.unique_name || '';
  }
  getFirstAndLastName() {
    const fullName = this.getFullName().trim();
    if (!fullName) return {
      firstName: '',
      lastName: ''
    };
    const parts = fullName.split(' ').filter(Boolean);
    return {
      firstName: parts[0],
      lastName: parts.length > 1 ? parts.slice(1).join(' ') : ''
    };
  }
  writeCookieToken(name, value) {
    if (typeof document === 'undefined') return;
    const parts = [];
    if (value) {
      const json = `{"value":"${value}"}`;
      parts.push(`${name}=${json}`);
      parts.push('Max-Age=86400');
    } else {
      parts.push(`${name}=`);
      parts.push('expires=Thu, 01 Jan 1970 00:00:00 GMT', 'Max-Age=0');
    }
    parts.push('Path=/');
    parts.push('SameSite=Lax');
    const hostname = location.hostname;
    if (hostname.includes('markaziahub')) {
      parts.push(`Domain=${this.appConfig.ssoCookieDomain}`);
    }
    if (location.protocol === 'https:') {
      parts.push('Secure');
    }
    document.cookie = parts.join('; ');
  }
  readCookieToken(name) {
    if (typeof document === 'undefined' || !document.cookie) return null;
    const prefix = name + '=';
    const found = document.cookie.split('; ').find(c => c.startsWith(prefix));
    if (!found) return null;
    const raw = found.substring(prefix.length);
    try {
      const obj = JSON.parse(raw);
      if (typeof obj?.value === 'string' && obj.value.trim()) return obj.value;
    } catch {}
    try {
      const decoded = decodeURIComponent(raw);
      const obj = JSON.parse(decoded);
      if (typeof obj?.value === 'string' && obj.value.trim()) return obj.value;
    } catch {}
    return null;
  }
  // Hub cookie names are suffixed with the env from config.json (e.g. MarkaziaAccessToken.dev)
  get accessCookieName() {
    return 'MarkaziaAccessToken' + this.cookieEnvSuffix;
  }
  get refreshCookieName() {
    return 'MarkaziaRefreshToken' + this.cookieEnvSuffix;
  }
  get cookieEnvSuffix() {
    const env = this.appConfig.env;
    return env ? `.${env}` : '';
  }
  get ssoAccessToken() {
    return this.readCookieToken(this.accessCookieName);
  }
  get ssoRefreshToken() {
    return this.readCookieToken(this.refreshCookieName);
  }
  ssoAccessTokenSet(token) {
    this.writeCookieToken(this.accessCookieName, token);
  }
  ssoRefreshTokenSet(token) {
    this.writeCookieToken(this.refreshCookieName, token);
  }
  get isSingleSignOnMode() {
    const localToken = this.readTokenFromStorage();
    const ssoAccess = this.ssoAccessToken;
    const ssoRefresh = this.ssoRefreshToken;
    return !localToken && !!ssoAccess && !!ssoRefresh;
  }
  get effectiveAccessToken() {
    return this.readTokenFromStorage() || this.ssoAccessToken || '';
  }
  readTokenFromStorage() {
    return localStorage.getItem(TOKEN_KEY) || '';
  }
  saveUser(user) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {}
  }
  get getUser() {
    const cached = localStorage.getItem(USER_KEY);
    const employeeCache = localStorage.getItem('employeeData');
    let employeeInfo = null;
    if (employeeCache) {
      try {
        const parsed = JSON.parse(employeeCache);
        employeeInfo = parsed?.Data ?? null;
      } catch {
        console.warn('Invalid employeeData format in localStorage');
      }
    }
    if (cached) {
      try {
        const obj = JSON.parse(cached);
        if (employeeInfo?.EmployeeID) {
          obj.EmployeeID = employeeInfo.EmployeeID;
          obj.nameid = employeeInfo.EmployeeID;
          obj.UserID = employeeInfo.EmployeeID;
        }
        if (obj.UserID || obj.nameid) return {
          ...obj,
          ...this.portalPatch(obj)
        };
      } catch (err) {
        console.error('Error parsing cached user', err);
      }
    }
    const token = this.token || this.ssoAccessToken;
    if (token) {
      try {
        const payloadBase64Url = token.split('.')[1] ?? '';
        const b64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(payloadBase64Url.length / 4) * 4, '=');
        const payloadJson = atob(b64);
        const p = JSON.parse(payloadJson);
        console.log('Decoded JWT payload:', p);
        const id = this.extractUserId(p);
        let role = null;
        let branch = null;
        try {
          role = typeof p.Role === 'string' ? JSON.parse(p.Role) : p.Role;
        } catch {}
        try {
          branch = typeof p.Branch === 'string' ? JSON.parse(p.Branch) : p.Branch;
        } catch {}
        const fullName = p.fullName ?? p.unique_name ?? p.name ?? p.UserTitleEn ?? p['given_name'] ?? '';
        const employeeID = employeeInfo?.EmployeeID ?? null;
        return {
          nameid: employeeID ?? id,
          UserID: employeeID ?? id,
          EmployeeID: employeeID ?? null,
          unique_name: p.unique_name ?? p.name ?? '',
          fullName,
          mobile: p['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'] ?? employeeInfo?.MobileNumber ?? '',
          email: employeeInfo?.Email ?? '',
          branchId: p.BranchId ?? branch?.BranchId ?? null,
          branchName: branch?.BranchName ?? null,
          roleId: role?.RoleId ?? null,
          roleName: role?.Name ?? null,
          city: p.City ?? '',
          register: p.Register ?? '',
          register2: p.Register2 ?? '',
          issuedAt: p.iat ?? null,
          expiresAt: p.exp ?? null,
          notBefore: p.nbf ?? null,
          rawPayload: p,
          ...this.portalPatch({})
        };
      } catch (err) {
        console.error('Error decoding token', err);
      }
    }
    return {};
  }
  saveEmployeeInfo(data) {
    if (!data) return;
    try {
      localStorage.setItem('employeeData', JSON.stringify(data));
    } catch (err) {
      console.error('Error saving employee info', err);
    }
  }
  extractUserId(payload) {
    if (!payload) return null;
    if (payload.EmployeeID) return String(payload.EmployeeID);
    if (payload.EmpNo) return String(payload.EmpNo);
    const keys = ['nameid', 'sid', 'sub', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    for (const k of keys) {
      if (payload?.[k]) return String(payload[k]);
    }
    return null;
  }
  portalPatch(src) {
    const pid = localStorage.getItem('userPortal');
    return pid ? {
      portalID: pid
    } : src;
  }
  get currentUserId() {
    const u = this.getUser || {};
    return u?.nameid ?? u?.UserID ?? null;
  }
  clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    this.writeCookieToken(this.accessCookieName, null);
    this.writeCookieToken(this.refreshCookieName, null);
  }
  signOut() {
    this.clearTokens();
  }
  get firstName() {
    const user = this.getUser;
    if (user?.FirstName) return user.FirstName;
    if (!user?.fullName) return '';
    return user.fullName.split(' ')[0] || '';
  }
  get lastName() {
    const user = this.getUser;
    if (user?.LastName) return user.LastName || user.SecondName || '';
    if (!user?.fullName) return '';
    const parts = user.fullName.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }
}
TokenService.ɵfac = function TokenService_Factory(t) {
  return new (t || TokenService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_app_config_service__WEBPACK_IMPORTED_MODULE_0__.AppConfigService));
};
TokenService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: TokenService,
  factory: TokenService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 8613:
/*!*************************************************!*\
  !*** ./src/app/shared/services/user.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var url_join__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url-join */ 5487);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ 287);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-config.service */ 1559);





class UserService {
  constructor(http, appConfig) {
    this.http = http;
    this.appConfig = appConfig;
  }
  getUsers(filter) {
    return this.http.get((0,_utility__WEBPACK_IMPORTED_MODULE_0__.toFilteringUrl)((0,url_join__WEBPACK_IMPORTED_MODULE_2__["default"])(this.appConfig.apiUrl, '/User/GetUsers'), filter));
  }
  getUserDetails(userId) {
    return this.http.get((0,url_join__WEBPACK_IMPORTED_MODULE_2__["default"])(this.appConfig.apiUrl, '/User/GetUSERDetails', `?userId=${userId}`));
  }
  getUserPermissions(id, portalId) {
    return this.http.get((0,url_join__WEBPACK_IMPORTED_MODULE_2__["default"])(this.appConfig.apiUrl, `User/GetUserPermissions?userId=${id}&portalId=${portalId}`));
  }
  addUser(role) {
    return this.http.post((0,url_join__WEBPACK_IMPORTED_MODULE_2__["default"])(this.appConfig.apiUrl, '/User/AddUser'), role);
  }
  updateUser(data) {
    return this.http.post((0,url_join__WEBPACK_IMPORTED_MODULE_2__["default"])(this.appConfig.apiUrl, '/User/EditUser'), data);
  }
  logoutUser(userId) {
    return this.http.post((0,url_join__WEBPACK_IMPORTED_MODULE_2__["default"])(this.appConfig.apiUrl, '/User/Logout', `?userId=${userId}`), {});
  }
}
UserService.ɵfac = function UserService_Factory(t) {
  return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_app_config_service__WEBPACK_IMPORTED_MODULE_1__.AppConfigService));
};
UserService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: UserService,
  factory: UserService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 287:
/*!*****************************************!*\
  !*** ./src/app/shared/utility/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toFilteringUrl": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_0__.toFilteringUrl)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ 3855);


/***/ }),

/***/ 3855:
/*!****************************************!*\
  !*** ./src/app/shared/utility/util.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toFilteringUrl": () => (/* binding */ toFilteringUrl)
/* harmony export */ });
function toFilteringUrl(url, filter) {
  if (typeof filter === 'object' && Object.keys(filter)?.length) {
    const searchParams = new URLSearchParams(filter).toString();
    return url.concat('?', searchParams);
  } else if (typeof filter === 'string' && filter) {
    return url.concat('?', filter);
  }
  return url;
}

/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map