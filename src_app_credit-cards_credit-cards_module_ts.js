"use strict";
(self["webpackChunkDX_FE_Treasury"] = self["webpackChunkDX_FE_Treasury"] || []).push([["src_app_credit-cards_credit-cards_module_ts"],{

/***/ 1631:
/*!**********************************************************************************************************************!*\
  !*** ./src/app/credit-cards/create-reconciliation/components/group-reconciliation/group-reconciliation.component.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupReconciliationComponent": () => (/* binding */ GroupReconciliationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _shared_modals_message_modal_message_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/modals/message-modal/message-modal.component */ 4280);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 4534);
/* harmony import */ var _shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/services/credit-card.service */ 1265);
/* harmony import */ var src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/app-config.service */ 1559);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-select/ng-select */ 3054);
/* harmony import */ var _shared_components_table_advanced_table_advanced_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/components/table-advanced/table-advanced.component */ 9973);
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ 1863);
/* harmony import */ var _shared_directives_decimal_number_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/directives/decimal-number.directive */ 8648);
/* harmony import */ var _shared_components_validation_error_validation_error_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/components/validation-error/validation-error.component */ 7711);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 4666);














function GroupReconciliationComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const item_r2 = ctx.item;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", (item_r2 == null ? null : item_r2.accountName) + "-" + (item_r2 == null ? null : item_r2.bankNameEnglish) + "-" + (item_r2 == null ? null : item_r2.accountNumber), " ");
  }
}
const _c0 = function () {
  return {
    required: "Input is required"
  };
};
const _c1 = function () {
  return {
    containerClass: "theme-red",
    isAnimated: true,
    showClearButton: true
  };
};
const _c2 = "Commission amount cannot be greater than total amount.";
const _c3 = function () {
  return {
    inValidAmount: _c2
  };
};
const _c4 = function () {
  return {
    required: "Input is required",
    min: "Value must be in 0-100 range.",
    max: "Value must be in 0-100 range."
  };
};
class GroupReconciliationComponent {
  constructor(fb, _activeModal, _modalService, cerditCardService, appConfigService) {
    this.fb = fb;
    this._activeModal = _activeModal;
    this._modalService = _modalService;
    this.cerditCardService = cerditCardService;
    this.appConfigService = appConfigService;
    this.currency = '';
    this.bankAccountList = [];
    this.commisionPercentage = '';
    this.checkRecon = false;
    this.tableConfig = {
      paging: false
    };
    this.reconList = [];
    this.tableColumns = [];
    this.eventData = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
  }
  ngOnInit() {
    this.initForm();
    this.getBankAccountList();
    this.initTableColumns();
    console.log(this.data);
    this.currency = this.appConfigService.currency || '';
  }
  initForm() {
    this.formGroup = this.fb.group({
      bankId: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      date: [new Date(), [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]],
      commission: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.max(100)]]
    });
  }
  getBankAccountList() {
    this.cerditCardService.getBankAccounts(`pageSize=1000&status=2001&accountType=15010`).subscribe(response => {
      this.bankAccountList = response.data;
    });
  }
  handleCommissionAmountChange(event) {
    const amount = +event.target.value;
    if (amount > +this.data?.totalAmount) {
      this.f.get('commission')?.setErrors({
        inValidAmount: true
      });
      this.f.get('commission').markAsTouched();
    } else {
      if (amount > 0) {
        this.commisionPercentage = ((1 - (this.data?.totalAmount - amount) / this.data?.totalAmount) * 100).toString();
        this.f.get('commission')?.setValue(this.commisionPercentage);
        this.f.get('commission')?.setErrors(null);
      }
    }
  }
  handleCheckRecon() {
    this.checkRecon = true;
    this.reconList = [...this.data?.cardIds];
    this.reconList = this.reconList.map(x => {
      let comAmount = +(+x?.cardCollectionJod * +this.commisionPercentage / 100).toFixed(3);
      return {
        ...x,
        comPercentage: +this.commisionPercentage,
        comAmount,
        amount: (x?.cardCollectionJod).toFixed(3),
        netAmount: (+x?.cardCollectionJod - comAmount).toFixed(3)
      };
    });
  }
  calculateCommission(item) {
    let amount = item?.cardCollectionJod;
    let commissionPercentage = +this.f.get('commission')?.value;
    let commissionAmount = (amount * (commissionPercentage / 100)).toFixed(3);
    let netAmount = (amount - +commissionAmount).toFixed(3);
    return {
      netAmount,
      commissionAmount
    };
  }
  save() {
    //console.log(this.calculateCommission({ cardCollectionJod: 100 }));
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    let value = this.formGroup.value;
    let dataArray = [];
    //this.data.cardIds.forEach((item: any) => {
    //  let obj = {
    //    reconcilationIds: item?.reconcilationIds,
    //    commission: this.calculateCommission(item).commissionAmount,
    //    cardCollectionJodNet: this.calculateCommission(item).netAmount,
    //    cardBankDepositDate: value?.date,
    //    bankaccountID: value?.bankId,
    //  }
    //  dataArray.push(obj);
    //})
    this.reconList.forEach(item => {
      let obj = {
        reconcilationIds: item?.reconcilationIds,
        commission: item?.comAmount,
        cardCollectionJodNet: item?.netAmount,
        cardBankDepositDate: value?.date,
        bankaccountID: value?.bankId
      };
      dataArray.push(obj);
    });
    this.cerditCardService.ReconcilationIds(dataArray).subscribe({
      next: response => {
        if (response.isSuccess) {
          this.responseModal('success', 'Reconciliation successfully done.');
          this.eventData.emit(response.data);
        }
      },
      error: err => {
        this.responseModal('error', err?.error?.errors[0].errorMessageEn || err?.error?.errors[0].ErrorMessageEn || err?.info);
      }
    });
  }
  responseModal(type, message) {
    const ref = this._modalService.open(_shared_modals_message_modal_message_modal_component__WEBPACK_IMPORTED_MODULE_0__.MessageModalComponent);
    ref.componentInstance.type = type;
    ref.componentInstance.message = message;
  }
  toggleEdit() {
    this.formGroup.enable();
  }
  get f() {
    return this.formGroup;
  }
  initTableColumns() {
    this.tableColumns = [{
      key: 'reconcilationIds',
      label: 'Card ID'
    }, {
      key: 'comPercentage',
      label: 'Commission Percentage'
    }, {
      key: 'comAmount',
      label: 'Commission Amount'
    }, {
      key: 'amount',
      label: 'Amount'
    }, {
      key: 'netAmount',
      label: 'Net Amount'
    }];
  }
}
GroupReconciliationComponent.ɵfac = function GroupReconciliationComponent_Factory(t) {
  return new (t || GroupReconciliationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbActiveModal), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_1__.CreditCardService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__.AppConfigService));
};
GroupReconciliationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: GroupReconciliationComponent,
  selectors: [["app-group-reconciliation"]],
  outputs: {
    eventData: "eventData"
  },
  decls: 59,
  vars: 26,
  consts: [[1, "modal-header", "align-items-center", "justify-content-between"], ["ngbAutoFocus", "", 1, "modal-title"], [1, "modal-body"], [3, "formGroup"], [1, "row", "mb-3"], [1, "col-4"], [1, "col-8"], ["placeholder", "Bank Account", "formControlName", "bankId", "bindLabel", "accountName", "bindValue", "accountId", 3, "items"], ["ng-option-tmp", ""], [3, "control", "errorMessages"], [1, "input-group"], ["type", "text", "formControlName", "date", "placeholder", "Select Date", "bsDatepicker", "", 1, "form-control", "custom-input-field", 3, "bsConfig"], ["drp", "bsDatepicker"], [1, "input-group-text", "cursor-pointer", 3, "click"], ["src", "/assets/images/calendar.png", "alt", "", 1, "calender"], [1, "fw-600"], ["type", "text", "decimalNumber", "", "placeholder", "Commission Amount", 1, "form-control", "height-47", 3, "change"], ["type", "text", "decimalNumber", "", "formControlName", "commission", "placeholder", "Commission Percentage", 1, "form-control", "height-47"], [1, "input-group-text"], [3, "config", "columns", "data"], [1, "modal-footer", "border-0"], ["type", "button", 1, "btn", "btn-add", 3, "disabled", "click"], ["type", "button", 1, "btn", "btn-cancel", 3, "click"]],
  template: function GroupReconciliationComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "h4", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Reconciliation of selected cards");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 2)(4, "form", 3)(5, "div", 4)(6, "div", 5)(7, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Deposit Bank Account");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 6)(10, "ng-select", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, GroupReconciliationComponent_ng_template_11_Template, 1, 1, "ng-template", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "validation-error", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 4)(14, "div", 5)(15, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "Deposit Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 6)(18, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "input", 11, 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "span", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function GroupReconciliationComponent_Template_span_click_21_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r3);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](20);
        return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](_r1.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](22, "img", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](23, "validation-error", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "div", 4)(25, "div", 5)(26, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](27, "Total Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "div", 6)(29, "h6", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](31, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "div", 4)(33, "div", 5)(34, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, "Commission Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "div", 6)(37, "div", 10)(38, "input", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function GroupReconciliationComponent_Template_input_change_38_listener($event) {
        return ctx.handleCommissionAmountChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](39, "validation-error", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "div", 4)(41, "div", 5)(42, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](43, "Commission Percentage");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](44, "div", 6)(45, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](46, "input", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](47, "span", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](48, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](49, "validation-error", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](50);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](51, "app-table-advanced", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](52, "div", 20)(53, "button", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function GroupReconciliationComponent_Template_button_click_53_listener() {
        return ctx.handleCheckRecon();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](54, "Check Reconciliation");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](55, "button", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function GroupReconciliationComponent_Template_button_click_55_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](56, "Group Reconciliation");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](57, "button", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function GroupReconciliationComponent_Template_button_click_57_listener() {
        return ctx._activeModal.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](58, "Cancel");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("items", ctx.bankAccountList);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("control", ctx.f.get("bankId"))("errorMessages", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](21, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("bsConfig", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](22, _c1));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("control", ctx.f.get("date"))("errorMessages", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](23, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](31, 18, ctx.data == null ? null : ctx.data.totalAmount, "2.3-3"), " ", ctx.currency, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("control", ctx.f.get("commission"))("errorMessages", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](24, _c3));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("control", ctx.f.get("commission"))("errorMessages", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](25, _c4));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("config", ctx.tableConfig)("columns", ctx.tableColumns)("data", ctx.reconList);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx.formGroup.invalid);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx.formGroup.invalid);
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__.NgSelectComponent, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_9__.NgOptionTemplateDirective, _shared_components_table_advanced_table_advanced_component__WEBPACK_IMPORTED_MODULE_3__.TableAdvancedComponent, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_10__.BsDatepickerDirective, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_10__.BsDatepickerInputDirective, _shared_directives_decimal_number_directive__WEBPACK_IMPORTED_MODULE_4__.DecimalNumberDirective, _shared_components_validation_error_validation_error_component__WEBPACK_IMPORTED_MODULE_5__.ValidationErrorComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DecimalPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 8224:
/*!***************************************************************************************!*\
  !*** ./src/app/credit-cards/create-reconciliation/create-reconciliation.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateReconciliationComponent": () => (/* binding */ CreateReconciliationComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 1640);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 1989);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 4534);
/* harmony import */ var _shared_modals_message_modal_message_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/modals/message-modal/message-modal.component */ 4280);
/* harmony import */ var _components_group_reconciliation_group_reconciliation_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/group-reconciliation/group-reconciliation.component */ 1631);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/credit-card.service */ 1265);
/* harmony import */ var _shared_services_header_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/header.service */ 940);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _shared_services_helper_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/helper.service */ 1785);
/* harmony import */ var src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/app-config.service */ 1559);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ng-select/ng-select */ 3054);
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ 1863);
/* harmony import */ var _shared_directives_decimal_number_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/directives/decimal-number.directive */ 8648);
/* harmony import */ var _shared_components_validation_error_validation_error_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/validation-error/validation-error.component */ 7711);



















const _c0 = ["myModal"];
const _c1 = ["myErrorModal"];
function CreateReconciliationComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const item_r9 = ctx.item;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", item_r9 == null ? null : item_r9.terminalID, " ", (item_r9 == null ? null : item_r9.machineName) ? "(" + (item_r9 == null ? null : item_r9.machineName) + ")" : "", " ");
  }
}
function CreateReconciliationComponent_ng_template_30_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 50)(1, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_ng_template_30_div_0_Template_span_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);
      const item_r14 = restoredCtx.$implicit;
      const clear_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().clear;
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](clear_r11(item_r14));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"]((item_r14 == null ? null : item_r14.terminalID) || item_r14);
  }
}
function CreateReconciliationComponent_ng_template_30_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 53)(1, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const items_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().items;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("+", items_r10.length - 1, " more");
  }
}
function CreateReconciliationComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, CreateReconciliationComponent_ng_template_30_div_0_Template, 5, 1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, CreateReconciliationComponent_ng_template_30_div_2_Template, 3, 1, "div", 49);
  }
  if (rf & 2) {
    const items_r10 = ctx.items;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind3"](1, 2, items_r10, 0, 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", items_r10.length > 1);
  }
}
function CreateReconciliationComponent_tr_117_ng_container_25_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Input is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreateReconciliationComponent_tr_117_ng_container_25_ng_container_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Invalid amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreateReconciliationComponent_tr_117_ng_container_25_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CreateReconciliationComponent_tr_117_ng_container_25_ng_container_1_span_1_Template, 2, 0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, CreateReconciliationComponent_tr_117_ng_container_25_ng_container_1_span_2_Template, 2, 0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const control_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    let tmp_0_0;
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", control_r19 == null ? null : (tmp_0_0 = control_r19.get("comissionAmount")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", control_r19 == null ? null : (tmp_1_0 = control_r19.get("comissionAmount")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["amountExceeded"]);
  }
}
function CreateReconciliationComponent_tr_117_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CreateReconciliationComponent_tr_117_ng_container_25_ng_container_1_Template, 3, 2, "ng-container", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const control_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (control_r19 == null ? null : (tmp_0_0 = control_r19.get("comissionAmount")) == null ? null : tmp_0_0.invalid) && (control_r19 == null ? null : (tmp_0_0 = control_r19.get("comissionAmount")) == null ? null : tmp_0_0.touched) || (control_r19 == null ? null : (tmp_0_0 = control_r19.get("comissionAmount")) == null ? null : tmp_0_0.dirty));
  }
}
function CreateReconciliationComponent_tr_117_ng_container_28_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Input is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreateReconciliationComponent_tr_117_ng_container_28_ng_container_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Invalid amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreateReconciliationComponent_tr_117_ng_container_28_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CreateReconciliationComponent_tr_117_ng_container_28_ng_container_1_span_1_Template, 2, 0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, CreateReconciliationComponent_tr_117_ng_container_28_ng_container_1_span_2_Template, 2, 0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const control_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    let tmp_0_0;
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", control_r19 == null ? null : (tmp_0_0 = control_r19.get("netAmount")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", control_r19 == null ? null : (tmp_1_0 = control_r19.get("netAmount")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["amountExceeded"]);
  }
}
function CreateReconciliationComponent_tr_117_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CreateReconciliationComponent_tr_117_ng_container_28_ng_container_1_Template, 3, 2, "ng-container", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const control_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (control_r19 == null ? null : (tmp_0_0 = control_r19.get("netAmount")) == null ? null : tmp_0_0.invalid) && (control_r19 == null ? null : (tmp_0_0 = control_r19.get("netAmount")) == null ? null : tmp_0_0.touched) || (control_r19 == null ? null : (tmp_0_0 = control_r19.get("netAmount")) == null ? null : tmp_0_0.dirty));
  }
}
function CreateReconciliationComponent_tr_117_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const item_r36 = ctx.item;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", (item_r36 == null ? null : item_r36.accountName) + "-" + (item_r36 == null ? null : item_r36.bankNameEnglish) + "-" + (item_r36 == null ? null : item_r36.accountNumber), " ");
  }
}
function CreateReconciliationComponent_tr_117_ng_container_39_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Input is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreateReconciliationComponent_tr_117_ng_container_39_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CreateReconciliationComponent_tr_117_ng_container_39_ng_container_1_span_1_Template, 2, 0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const control_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", control_r19 == null ? null : (tmp_0_0 = control_r19.get("depositDate")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
  }
}
function CreateReconciliationComponent_tr_117_ng_container_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, CreateReconciliationComponent_tr_117_ng_container_39_ng_container_1_Template, 2, 1, "ng-container", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const control_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (control_r19 == null ? null : (tmp_0_0 = control_r19.get("depositDate")) == null ? null : tmp_0_0.invalid) && (control_r19 == null ? null : (tmp_0_0 = control_r19.get("depositDate")) == null ? null : tmp_0_0.touched) || (control_r19 == null ? null : (tmp_0_0 = control_r19.get("depositDate")) == null ? null : tmp_0_0.dirty));
  }
}
const _c2 = function () {
  return {
    required: "Input is required"
  };
};
const _c3 = function () {
  return {
    containerClass: "theme-red",
    isAnimated: true,
    showClearButton: true
  };
};
function CreateReconciliationComponent_tr_117_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "tr", 54)(1, "td")(2, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CreateReconciliationComponent_tr_117_Template_input_change_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r42);
      const index_r20 = restoredCtx.index;
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r41.handleChangeCheckBox($event, ctx_r41.reconciliation[index_r20], index_r20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](22, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "td")(24, "input", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CreateReconciliationComponent_tr_117_Template_input_change_24_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r42);
      const index_r20 = restoredCtx.index;
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r43.handleCommissionAmountChange($event, index_r20, ctx_r43.reconciliation[index_r20]));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](25, CreateReconciliationComponent_tr_117_ng_container_25_Template, 2, 1, "ng-container", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "td")(27, "input", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CreateReconciliationComponent_tr_117_Template_input_change_27_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r42);
      const index_r20 = restoredCtx.index;
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r44.handleNetAmountChange($event, index_r20, ctx_r44.reconciliation[index_r20]));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](28, CreateReconciliationComponent_tr_117_ng_container_28_Template, 2, 1, "ng-container", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "td")(30, "ng-select", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CreateReconciliationComponent_tr_117_Template_ng_select_change_30_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r42);
      const index_r20 = restoredCtx.index;
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r45.saveRowState(index_r20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](31, CreateReconciliationComponent_tr_117_ng_template_31_Template, 1, 1, "ng-template", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](32, "validation-error", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "td")(34, "div", 4)(35, "input", 61, 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("bsValueChange", function CreateReconciliationComponent_tr_117_Template_input_bsValueChange_35_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r42);
      const index_r20 = restoredCtx.index;
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r46.saveRowState(index_r20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](37, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_tr_117_Template_span_click_37_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r42);
      const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](36);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](_r24.toggle());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](38, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](39, CreateReconciliationComponent_tr_117_ng_container_39_Template, 2, 1, "ng-container", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const control_r19 = ctx.$implicit;
    const index_r20 = ctx.index;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    let tmp_11_0;
    let tmp_12_0;
    let tmp_17_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroupName", index_r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].cardLast4Digits);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"]((ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].machineID) || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].provider == null ? null : ctx_r3.reconciliation[index_r20].provider.providerName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].orderCollectionId);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](13, 18, ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].collectionAt, "mediumDate"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].branch == null ? null : ctx_r3.reconciliation[index_r20].branch.branchName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].register == null ? null : ctx_r3.reconciliation[index_r20].register.registersName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].cardType == null ? null : ctx_r3.reconciliation[index_r20].cardType.translations[0].lookupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](22, 21, ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].cardCollectionJod, "2.3-3"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", (ctx_r3.reconciliation[index_r20] == null ? null : ctx_r3.reconciliation[index_r20].isReturn) && "disabled");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", control_r19 == null ? null : (tmp_11_0 = control_r19.get("comissionAmount")) == null ? null : tmp_11_0.errors);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", control_r19 == null ? null : (tmp_12_0 = control_r19.get("netAmount")) == null ? null : tmp_12_0.errors);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx_r3.bankAccountList);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("control", control_r19.get("bankaccountID"))("errorMessages", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](24, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("bsConfig", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](25, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", control_r19 == null ? null : (tmp_17_0 = control_r19.get("depositDate")) == null ? null : tmp_17_0.errors);
  }
}
function CreateReconciliationComponent_div_118_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "svg", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "path", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreateReconciliationComponent_div_118_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "svg", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "path", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreateReconciliationComponent_div_118_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", p_r51, " ");
  }
}
function CreateReconciliationComponent_div_118_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 65)(1, "h6", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, " Showing ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, " from ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, " data ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "ngb-pagination", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("pageChange", function CreateReconciliationComponent_div_118_Template_ngb_pagination_pageChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r53);
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r52.onPageChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](10, CreateReconciliationComponent_div_118_ng_template_10_Template, 2, 0, "ng-template", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, CreateReconciliationComponent_div_118_ng_template_11_Template, 2, 0, "ng-template", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, CreateReconciliationComponent_div_118_ng_template_12_Template, 2, 1, "ng-template", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", ctx_r4.page * ctx_r4.limit - (ctx_r4.limit - 1), " - ", ctx_r4.reconciliation.length === ctx_r4.limit ? ctx_r4.page * ctx_r4.limit : ctx_r4.totalAllRecordsCount, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r4.totalAllRecordsCount, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("collectionSize", ctx_r4.totalAllRecordsCount)("page", ctx_r4.page)("pageSize", ctx_r4.limit)("maxSize", 3)("ellipses", false)("rotate", true)("boundaryLinks", true);
  }
}
function CreateReconciliationComponent_ng_template_128_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 75)(1, "div", 76)(2, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "img", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "h5", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Successfully posted!");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "p", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Your reconciliation is created successfully");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
  }
}
function CreateReconciliationComponent_ng_template_130_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 75)(1, "div", 76)(2, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "img", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "h5", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Failed to create reconciliation ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "p", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r8.erromessage);
  }
}
const _c4 = function () {
  return {
    containerClass: "theme-red",
    isAnimated: true,
    showClearButton: true,
    rangeInputFormat: "MM-DD-YYYY"
  };
};
class CreateReconciliationComponent {
  constructor(creditcardservice, headerService, modalService, router, modalConfig, fb, _datePipe, _helperService, appConfigService) {
    this.creditcardservice = creditcardservice;
    this.headerService = headerService;
    this.modalService = modalService;
    this.router = router;
    this.modalConfig = modalConfig;
    this.fb = fb;
    this._datePipe = _datePipe;
    this._helperService = _helperService;
    this.appConfigService = appConfigService;
    this.searchText = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.netAmount = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.collectionDate = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    this.isvalid = true;
    this.isReturn = false;
    this.tableColumns = [];
    this.searchChequeNo = '';
    this.searchCustomerNo = '';
    this.loading = false;
    this.reconciliation = [];
    this.bankAccountList = [];
    this.branchList = [];
    this.terminalMachineList = [];
    this.totalAllRecordsCount = 0;
    this.page = 1;
    this.total = 0;
    this.limit = 6;
    this.sort = 1;
    this.startDate = '';
    this.tableConfig = {
      paging: true,
      filter: {
        Sort: 1,
        PageSize: this.limit
      }
    };
    this.selectedAmount = 0;
    this.filterParams = '';
    this.currency = '';
    /**
     * Persistent state storage keyed by ordersCardsCollectionId.
     * Survives page navigation and form rebuilds.
     */
    this.rowStates = {};
    this.selectAllChecked = false;
    this.selecteddata = [];
    this.provider = [];
    this.cardlist = [];
    this.modalConfig.centered = true;
  }
  ngOnInit() {
    this.headerService.setTitle('Create Reconciliation');
    this.initFilterForm();
    this.getData();
    this.formGroup = this.fb.group({
      cardsArray: this.fb.array([])
    });
    this.fetcAllData();
    this.getBankAccountList();
    this.currency = this.appConfigService.currency || '';
  }
  getData() {
    const api1$ = this.creditcardservice.GetProviders({
      pageSize: 1000,
      status: 2001
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
      data: []
    })));
    const api2$ = this.creditcardservice.GetCards().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
      data: []
    })));
    const branch$ = this.creditcardservice.GetBranch({}).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
      data: []
    })));
    const terminal$ = this.creditcardservice.GetTerminalProviderMachine({
      PageNo: 0,
      PageSize: 1000,
      Status: 2001,
      pageSize: 1000,
      status: 2001
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
      data: []
    })));
    (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.forkJoin)([api1$, api2$, branch$, terminal$]).subscribe(([result1, result2, branch, terminal]) => {
      this.provider = result1?.data || [];
      this.cardlist = result2?.data || [];
      this.branchList = branch?.data || [];
      this.terminalMachineList = terminal?.data || [];
    }, error => {}, () => {
      this.loading = false;
    });
  }
  initFilterForm() {
    this.filterForm = this.fb.group({
      providerId: [null],
      collectionDate: [''],
      collectionDateFrom: [''],
      collectionDateTo: [''],
      cardTypeId: [null],
      netAmount: [''],
      last4digits: [''],
      machineID: [''],
      TerminalProviderMachineIDsList: [null],
      branchId: [null],
      status: [30001]
    });
    this.filterForm.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.debounceTime)(500)).subscribe(data => {
      // Reset pagination only; keep selections so they survive filter changes
      this.page = 1;
      let formValues = this._helperService.trim(data);
      if (formValues?.collectionDate) {
        formValues = {
          ...formValues,
          collectionDateFrom: this._datePipe.transform(formValues.collectionDate[0], 'yyyy-MM-dd'),
          collectionDateTo: this._datePipe.transform(formValues.collectionDate[1], 'yyyy-MM-dd')
        };
        delete formValues.collectionDate;
      }
      if (formValues?.TerminalProviderMachineIDsList) {
        if (Array.isArray(formValues.TerminalProviderMachineIDsList) && formValues.TerminalProviderMachineIDsList.length > 0) {
          formValues.TerminalProviderMachineIDsList = formValues.TerminalProviderMachineIDsList.join(',');
        } else if (Array.isArray(formValues.TerminalProviderMachineIDsList) && formValues.TerminalProviderMachineIDsList.length === 0) {
          delete formValues.TerminalProviderMachineIDsList;
        }
      } else {
        delete formValues.TerminalProviderMachineIDsList;
      }
      this.filterParams = new URLSearchParams(formValues).toString();
      this.fetcAllData();
    });
  }
  fetcAllData() {
    this.loading = true;
    // Save current page state before fetching new data
    this.saveCurrentPageState();
    let params = '';
    if (this.filterParams) {
      params = `${this.filterParams}&pageSize=${this.limit}&pageNo=${this.page - 1}&sort=${this.sort}`;
    } else {
      params = `status=${30001}&pageSize=${this.limit}&pageNo=${this.page - 1}&sort=${this.sort}`;
    }
    this.creditcardservice.GetReconHistory(params).subscribe(result => {
      if (result) {
        this.reconciliation = result.data || [];
        this.totalAllRecordsCount = result?.totalRecordCount;
        this.total = result?.totalRecordCount;
        // Rebuild form array for current page
        this.buildCurrentPageForm();
      }
    }).add(() => this.loading = false);
  }
  /**
   * Save the current page's form values into rowStates before navigating away.
   */
  saveCurrentPageState() {
    this.cardsArray.controls.forEach((control, index) => {
      if (this.reconciliation[index]) {
        this.saveRowState(index);
      }
    });
  }
  /**
   * Save a specific row's current form values into rowStates.
   * Public so it can be triggered from template change handlers (ng-select, datepicker).
   */
  saveRowState(index) {
    const ordersCardsCollectionId = this.reconciliation[index]?.ordersCardsCollectionId;
    if (!ordersCardsCollectionId) return;
    const control = this.cardsArray.at(index);
    const rawValue = control.getRawValue();
    this.rowStates[ordersCardsCollectionId] = {
      ordersCardsCollectionId,
      reconcilationIds: rawValue.reconcilationIds,
      comissionAmount: rawValue.comissionAmount || '',
      netAmount: rawValue.netAmount,
      bankaccountID: rawValue.bankaccountID,
      depositDate: rawValue.depositDate,
      checked: rawValue.checked,
      isReturn: rawValue.isReturn,
      cardCollectionJod: rawValue.cardCollectionJod
    };
  }
  /**
   * Clear and rebuild cardsArray for the current page data.
   * Restores values from rowStates if they exist.
   */
  buildCurrentPageForm() {
    this.cardsArray.clear();
    this.reconciliation = this.reconciliation.map(element => {
      const ordersCardsCollectionId = element.ordersCardsCollectionId;
      const savedState = this.rowStates[ordersCardsCollectionId];
      let formControl;
      const checked = this.selectAllChecked ? true : savedState?.checked ?? false;
      if (savedState || this.selectAllChecked) {
        formControl = this.fb.group({
          reconcilationIds: [checked ? element.ordersCardsCollectionId : savedState?.reconcilationIds ?? null],
          comissionAmount: [savedState?.comissionAmount || ''],
          netAmount: [savedState?.netAmount ?? null],
          bankaccountID: [savedState?.bankaccountID ?? null],
          depositDate: [savedState?.depositDate ?? new Date()],
          checked: [checked],
          isReturn: [savedState?.isReturn ?? element?.isReturn],
          cardCollectionJod: [savedState?.cardCollectionJod ?? element?.cardCollectionJod]
        });
        // Handle disabled controls for return transactions
        if (formControl.get('isReturn')?.value) {
          formControl.get('comissionAmount')?.disable();
          formControl.get('netAmount')?.disable();
        }
      } else {
        // Initialize new row using existing logic
        formControl = this.initFormGroup(element);
      }
      this.cardsArray.push(formControl);
      const rowIndex = this.cardsArray.length - 1;
      // Restore validators if the row is checked (must run after push so at(index) resolves)
      if (checked) {
        this.setValidator('comissionAmount', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, rowIndex);
        this.setValidator('netAmount', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, rowIndex);
        this.setValidator('depositDate', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, rowIndex);
        this.setValidator('bankaccountID', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, rowIndex);
      }
      this.saveRowState(rowIndex);
      return {
        ...element,
        checked
      };
    });
    // Recalculate global selectedAmount and isReturn
    this.calculateSelectedAmount();
    this.getNotReturnedCardTransactions();
  }
  /**
   * Calculate selectedAmount from all checked rows in rowStates.
   */
  calculateSelectedAmount() {
    this.selectedAmount = 0;
    Object.values(this.rowStates).forEach(state => {
      if (state.checked) {
        this.selectedAmount += state.cardCollectionJod;
      }
    });
  }
  getBankAccountList() {
    this.creditcardservice.getBankAccounts(`pageSize=1000&status=2001&accountType=15010`).subscribe(response => {
      this.bankAccountList = response.data;
    });
  }
  get cardsArray() {
    return this.formGroup.get('cardsArray');
  }
  getNotReturnedCardTransactions() {
    const checkedRows = Object.values(this.rowStates).filter(state => state.checked && state.reconcilationIds);
    if (checkedRows.length) {
      this.isReturn = checkedRows.every(state => !state.isReturn);
    } else {
      this.isReturn = false;
    }
  }
  groupReconciliation() {
    // Collect all checked non-return transactions from rowStates
    const selectedRows = Object.values(this.rowStates).filter(state => state.checked && state.reconcilationIds && !state.isReturn);
    if (!selectedRows.length) return;
    const cardIds = selectedRows.map(state => state.reconcilationIds);
    const modalRef = this.modalService.open(_components_group_reconciliation_group_reconciliation_component__WEBPACK_IMPORTED_MODULE_1__.GroupReconciliationComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.data = {
      cardIds,
      totalAmount: this.selectedAmount
    };
    modalRef.componentInstance.eventData.subscribe(value => {
      this.resetSelectionState();
      modalRef.dismiss();
    });
  }
  /**
   * Clear all cross-page selection state and refetch page 1.
   * Clears cardsArray first so stale checked controls aren't re-saved into rowStates by fetcAllData().
   */
  resetSelectionState() {
    this.cardsArray.clear();
    this.rowStates = {};
    this.selectedAmount = 0;
    this.isReturn = false;
    this.selectAllChecked = false;
    this.page = 1;
    this.fetcAllData();
  }
  initFormGroup(item) {
    const formGroup = this.fb.group({
      reconcilationIds: [null],
      comissionAmount: [''],
      netAmount: [null],
      bankaccountID: [null],
      depositDate: [new Date()],
      checked: [false],
      isReturn: [item?.isReturn],
      cardCollectionJod: [item?.cardCollectionJod]
    });
    if (item && item.isReturn) {
      formGroup.get('comissionAmount')?.setValue('0');
      formGroup.get('comissionAmount')?.disable();
      formGroup.get('netAmount')?.setValue(item?.collectedAmount);
      formGroup.get('netAmount')?.disable();
    }
    return formGroup;
  }
  handleCommissionAmountChange(event, index, row) {
    let commissionAmount = event.target.value;
    if (commissionAmount) {
      let amount = row?.cardCollectionJod;
      if (commissionAmount > amount) {
        this.cardsArray.at(index).get('comissionAmount')?.setErrors({
          amountExceeded: true
        });
        return;
      }
      this.cardsArray.at(index).get('netAmount')?.setValue((amount - commissionAmount).toFixed(3));
    }
    // Persist the change immediately
    this.saveRowState(index);
  }
  handleNetAmountChange(event, index, row) {
    let netAmount = event.target.value;
    if (netAmount) {
      let amount = row?.cardCollectionJod;
      if (netAmount > amount) {
        this.cardsArray.at(index).get('netAmount')?.setErrors({
          amountExceeded: true
        });
        return;
      }
      this.cardsArray.at(index).get('comissionAmount')?.setValue((amount - netAmount).toFixed(3));
    }
    // Persist the change immediately
    this.saveRowState(index);
  }
  checkAll(event) {
    let checked = event.target.checked;
    this.selectAllChecked = checked;
    this.reconciliation.forEach((x, index) => {
      if (checked) {
        this.cardsArray.at(index).get('checked')?.setValue(true);
        this.cardsArray.at(index).get('reconcilationIds')?.setValue(x?.ordersCardsCollectionId);
        this.setValidator('comissionAmount', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, index);
        this.setValidator('netAmount', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, index);
        this.setValidator('depositDate', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, index);
        this.setValidator('bankaccountID', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, index);
      } else {
        this.cardsArray.at(index).get('checked')?.setValue(false);
        this.cardsArray.at(index).get('reconcilationIds')?.setValue(null);
        this.setValidator('comissionAmount', null, index);
        this.setValidator('netAmount', null, index);
        this.setValidator('depositDate', null, index);
        this.setValidator('bankaccountID', null, index);
      }
      // Persist each row's state
      this.saveRowState(index);
    });
    // Apply the same state to rows on pages that were already visited
    Object.values(this.rowStates).forEach(state => {
      state.checked = checked;
      state.reconcilationIds = checked ? state.ordersCardsCollectionId : null;
    });
    this.calculateSelectedAmount();
    this.getNotReturnedCardTransactions();
  }
  handleChangeCheckBox(event, item, index) {
    let checked = event.target.checked;
    if (checked) {
      this.cardsArray.at(index).get('reconcilationIds')?.setValue(item?.ordersCardsCollectionId);
      this.setValidator('comissionAmount', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, index);
      this.setValidator('netAmount', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, index);
      this.setValidator('bankaccountID', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, index);
    } else {
      this.cardsArray.at(index).get('reconcilationIds')?.setValue(null);
      this.setValidator('comissionAmount', null, index);
      this.setValidator('netAmount', null, index);
      this.setValidator('depositDate', null, index);
      this.setValidator('bankaccountID', null, index);
    }
    if (!checked) {
      this.selectAllChecked = false;
    }
    // Persist the change
    this.saveRowState(index);
    this.calculateSelectedAmount();
    this.getNotReturnedCardTransactions();
  }
  setValidator(controlName, validator, index) {
    const control = this.cardsArray.at(index).get(controlName);
    if (control && validator) {
      control.setValidators(validator);
      control.updateValueAndValidity();
    } else if (!validator) {
      control?.clearValidators();
      control?.updateValueAndValidity();
    }
  }
  /**
   * Validate that all checked rows across all pages have required values.
   */
  isSelectedRowsValid() {
    const checkedRows = Object.values(this.rowStates).filter(state => state.checked && state.reconcilationIds);
    if (checkedRows.length === 0) {
      return false;
    }
    return checkedRows.every(state => {
      // Check required fields
      if (!state.comissionAmount && state.comissionAmount !== '0') return false;
      if (state.netAmount === null || state.netAmount === undefined || state.netAmount === '') return false;
      if (!state.bankaccountID) return false;
      if (!state.depositDate) return false;
      // Check amount validity
      const commissionAmount = parseFloat(state.comissionAmount);
      const netAmount = parseFloat(state.netAmount);
      if (isNaN(commissionAmount) || isNaN(netAmount)) return false;
      if (commissionAmount > state.cardCollectionJod || netAmount > state.cardCollectionJod) return false;
      return true;
    });
  }
  onPostReconcilationIds() {
    // Ensure current page state is saved
    this.saveCurrentPageState();
    // Validate all checked rows
    if (!this.isSelectedRowsValid()) {
      this.responseModal('error', 'Please complete all required fields for selected transactions.');
      return;
    }
    // Build payload from all checked rows in rowStates
    let data = Object.values(this.rowStates).filter(state => state.checked && state.reconcilationIds).map(state => {
      return {
        reconcilationIds: state.reconcilationIds,
        commission: state.comissionAmount,
        cardCollectionJodNet: state.netAmount,
        cardBankDepositDate: state.depositDate,
        bankaccountID: state.bankaccountID
      };
    });
    this.creditcardservice.ReconcilationIds(data).subscribe(result => {
      if (result.isSuccess) {
        this.responseModal('success', `Reconciliation successfully done.`);
        this.resetSelectionState();
      }
    }, err => {
      this.responseModal('error', err?.error?.errors[0]?.ErrorMessageEn);
    }).add(() => this.loading = false);
  }
  /**
   * Check if Post button should be enabled.
   * Validates all checked rows across all pages.
   */
  isPostEnabled() {
    return this.isSelectedRowsValid();
  }
  responseModal(type, message) {
    const ref = this.modalService.open(_shared_modals_message_modal_message_modal_component__WEBPACK_IMPORTED_MODULE_0__.MessageModalComponent);
    ref.componentInstance.type = type;
    ref.componentInstance.message = message;
  }
  openmdel() {
    this.modalService.open(this.event, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then(result => {
      this.closeResult = `Closed with: ${result}`;
    }, reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openmdelerroe() {
    this.modalService.open(this.eventerror, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then(result => {
      this.closeResult = `Closed with: ${result}`;
    }, reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getDismissReason(reason) {
    if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  sortByCardLast4Digits() {
    this.saveCurrentPageState();
    if (this.sort == 3) this.sort = 1;else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    ;
    this.page = 1;
    this.fetcAllData();
  }
  sortByProviderName() {
    this.saveCurrentPageState();
    if (this.sort == 5) this.sort = 1;else this.sort = this.sort == 4 ? 5 : 4;
    this.page = 1;
    this.fetcAllData();
  }
  sortByOrderCollectionId() {
    this.saveCurrentPageState();
    if (this.sort == 7) this.sort = 1;else this.sort = this.sort == 6 ? 7 : 6;
    this.page = 1;
    this.fetcAllData();
  }
  sortByCollectionAt() {
    this.saveCurrentPageState();
    if (this.sort == 9) this.sort = 1;else this.sort = this.sort == 8 ? 9 : 8;
    this.page = 1;
    this.fetcAllData();
  }
  sortByBranchName() {
    this.saveCurrentPageState();
    if (this.sort == 11) this.sort = 1;else this.sort = this.sort == 10 ? 11 : 10;
    this.page = 1;
    this.fetcAllData();
  }
  sortByRegisterName() {
    this.saveCurrentPageState();
    if (this.sort == 11) this.sort = 1;else this.sort = this.sort == 10 ? 11 : 10;
    this.page = 1;
    this.fetcAllData();
  }
  sortByCardType() {
    this.saveCurrentPageState();
    if (this.sort == 13) this.sort = 1;else this.sort = this.sort == 12 ? 13 : 12;
    this.page = 1;
    this.fetcAllData();
  }
  sortByCardCollectionJod() {
    this.saveCurrentPageState();
    if (this.sort == 15) this.sort = 1;else this.sort = this.sort == 14 ? 15 : 14;
    this.page = 1;
    this.fetcAllData();
  }
  onPageChange(page) {
    this.page = page;
    this.fetcAllData();
  }
  modelClose(num) {
    if (num == 1) {
      this.modalService.dismissAll();
      this.router.navigate(['credit-card'], {
        queryParams: {
          num: 2
        }
      });
    } else {
      this.modalService.dismissAll();
    }
  }
  validateInput(event) {
    const enteredValue = event.target.value;
    const pattern = /^[0-9]*\.?[0-9]*$/;
    if (!pattern.test(enteredValue)) {
      event.target.value = enteredValue.replace(/[^0-9.]/g, '');
    }
  }
}
CreateReconciliationComponent.ɵfac = function CreateReconciliationComponent_Factory(t) {
  return new (t || CreateReconciliationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_2__.CreditCardService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_header_service__WEBPACK_IMPORTED_MODULE_3__.HeaderService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbModalConfig), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_17__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_helper_service__WEBPACK_IMPORTED_MODULE_4__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_5__.AppConfigService));
};
CreateReconciliationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: CreateReconciliationComponent,
  selectors: [["app-create-reconciliation"]],
  viewQuery: function CreateReconciliationComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.event = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.eventerror = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵProvidersFeature"]([_angular_common__WEBPACK_IMPORTED_MODULE_17__.DatePipe])],
  decls: 132,
  vars: 67,
  consts: [[3, "formGroup"], [1, "row"], [1, "col-3", "mb-3"], ["formControlName", "providerId", "placeholder", "Provider", "bindLabel", "providerName", "bindValue", "providerId", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items"], [1, "input-group"], ["type", "text", "placeholder", "Collection Date", "formControlName", "collectionDate", "bsDaterangepicker", "", 1, "form-control", "custom-input-field", 3, "bsConfig"], ["toDate", "bsDaterangepicker"], [1, "input-group-text", "cursor-pointer", 3, "click"], ["src", "/assets/images/calendar.png", "alt", "", 1, "calender"], ["formControlName", "cardTypeId", "placeholder", "Search By Card", "bindLabel", "name.lookupName", "bindValue", "id", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items"], [1, "input-group-text"], [1, "fa-solid", "fa-search"], ["type", "text", "placeholder", "Net Amount", "formControlName", "netAmount", 1, "form-control", "height-45"], ["type", "text", "placeholder", "Last 4 Digits", "formControlName", "last4digits", 1, "form-control", "height-45"], ["type", "text", "placeholder", "Merchant ID", "formControlName", "machineID", 1, "form-control", "height-45"], ["formControlName", "TerminalProviderMachineIDsList", "placeholder", "Terminal ID", "bindLabel", "terminalID", "bindValue", "terminalProviderMachineID", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items", "multiple", "closeOnSelect"], ["ng-option-tmp", ""], ["ng-multi-label-tmp", ""], ["formControlName", "branchId", "placeholder", "Search By Branch", "bindLabel", "branchName", "bindValue", "branchId", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items"], [1, "col-12", "mb-3", "d-flex", "justify-content-end"], [1, "btn", "btn-add", 3, "click"], [1, "row", "mt-2"], [1, "col-lg-12", "text-heading"], [1, "col-lg-6", "text-heading"], [1, "col-lg-5", "offset-1"], [1, "col-lg-9", "text-end", "text-heading"], [1, "col-lg-3", "text-end"], [1, "table-advanced", "custom-table", "mt-3"], [1, "table-wrapper", "table-responsive"], [1, "table"], ["scope", "col"], [1, "btn", "d-flex", "gap-2", "flex-column", "align-items-start", "justify-content-start", 3, "disabled"], ["type", "checkbox", 1, "form-check-input", "input-checkbox", 3, "checked", "change"], [1, "btn", 3, "disabled", "click"], [1, "fa-solid", "fa-arrow-up-long"], [1, "fa-solid", "fa-arrow-down-long"], [1, "btn", 3, "disabled"], ["scope", "col", "width", "15%"], ["formArrayName", "cardsArray"], [3, "formGroupName", 4, "ngFor", "ngForOf"], ["class", "paging-wrapper", 4, "ngIf"], [1, "col-lg-12", "mt-3", "text-end"], ["routerLink", "/credit-card", 1, "btn", "btn-cancel", "me-2"], [1, "btn", "btn-add", "me-2", 3, "disabled", "click"], [1, "btn", "btn-add", 3, "disabled", "click"], ["class", "modal fade w-100 modal-dialog-centered", "id", "exampleModalToggle", "aria-hidden", "true", "aria-labelledby", "exampleModalToggleLabel", "tabindex", "-1"], ["myModal", ""], ["myErrorModal", ""], ["class", "ng-value", 4, "ngFor", "ngForOf"], ["class", "ng-value badge-more", 4, "ngIf"], [1, "ng-value"], ["aria-hidden", "true", 1, "ng-value-icon", "left", 3, "click"], [1, "ng-value-label"], [1, "ng-value", "badge-more"], [3, "formGroupName"], ["type", "checkbox", "formControlName", "checked", 1, "form-check-input", "input-checkbox", 3, "change"], ["type", "text", "formControlName", "comissionAmount", "decimalNumber", "", 1, "form-control", 3, "ngClass", "change"], [4, "ngIf"], ["type", "text", "formControlName", "netAmount", "decimalNumber", "", 1, "form-control", 3, "change"], ["placeholder", "Bank Account", "formControlName", "bankaccountID", "bindLabel", "accountName", "bindValue", "accountId", 3, "items", "change"], [3, "control", "errorMessages"], ["type", "text", "formControlName", "depositDate", "placeholder", "Select Date", "bsDatepicker", "", 1, "form-control", "custom-input-field", 3, "bsConfig", "bsValueChange"], ["drp", "bsDatepicker"], ["class", "text-danger", 4, "ngIf"], [1, "text-danger"], [1, "paging-wrapper"], [1, "showing"], ["aria-label", "Default pagination", 3, "collectionSize", "page", "pageSize", "maxSize", "ellipses", "rotate", "boundaryLinks", "pageChange"], ["ngbPaginationPrevious", ""], ["ngbPaginationNext", ""], ["ngbPaginationNumber", ""], ["width", "9", "height", "15", "viewBox", "0 0 11 17", "fill", "#BDBDBD", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M9.32804 16.6743L1.05966 9.21509C0.705664 8.91166 0.705664 8.35538 1.05966 8.05195L9.32804 0.592708C9.85904 0.112282 10.7187 0.46628 10.7187 1.17428L10.7187 16.0928C10.7187 16.8008 9.85904 17.1548 9.32804 16.6743Z"], ["d", "M1.96861 0.853985L10.555 8.31323C10.9226 8.61666 10.9226 9.17294 10.555 9.47637L1.96861 16.9356C1.41719 17.416 0.524414 17.062 0.524414 16.354L0.524414 1.43555C0.524414 0.727558 1.41719 0.37356 1.96861 0.853985Z"], [1, "page-number"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content"], [1, "modal-body", "text-center"], ["src", "../../../assets/svg/check-one.svg", "alt", "", "srcset", "", 1, "mt-4"], [1, "mt-4"], [1, "mt-3", "mb-4"], ["src", "../../../assets/svg/close-circle.svg", "alt", "", "srcset", "", 1, "mt-2"]],
  template: function CreateReconciliationComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "form", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ng-select", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 2)(5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "input", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_span_click_8_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r56);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](7);
        return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](_r0.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "ng-select", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 2)(13, "div", 4)(14, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "i", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](16, "input", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "div", 2)(18, "div", 4)(19, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](20, "i", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](21, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "div", 2)(23, "div", 4)(24, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](25, "i", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](26, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "div", 2)(28, "ng-select", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](29, CreateReconciliationComponent_ng_template_29_Template, 1, 2, "ng-template", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](30, CreateReconciliationComponent_ng_template_30_Template, 3, 6, "ng-template", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](32, "ng-select", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "div", 19)(34, "button", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_34_listener() {
        return ctx.filterForm.reset({
          status: "30001"
        });
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](35, "Clear Filters");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](36, "div", 21)(37, "div", 22)(38, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](39);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](40, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](41, "div", 21)(42, "div", 23)(43, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](44, "Unreconciled Cards Transactions List");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](45, "div", 24)(46, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](47, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](48, "div", 26)(49, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](50);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](51, "div", 27)(52, "form", 0)(53, "div", 28)(54, "table", 29)(55, "thead")(56, "tr")(57, "th", 30)(58, "button", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](59, " Select All ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](60, "input", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CreateReconciliationComponent_Template_input_change_60_listener($event) {
        return ctx.checkAll($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](61, "th", 30)(62, "button", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_62_listener() {
        return ctx.sortByCardLast4Digits();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](63, " Last 4 Digit ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](64, "i", 34)(65, "i", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](66, "th", 30)(67, "button", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](68, "Merchant ID");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](69, "th", 30)(70, "button", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_70_listener() {
        return ctx.sortByProviderName();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](71, " Provider ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](72, "i", 34)(73, "i", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](74, "th", 30)(75, "button", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_75_listener() {
        return ctx.sortByOrderCollectionId();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](76, " Invoice ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](77, "i", 34)(78, "i", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](79, "th", 30)(80, "button", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_80_listener() {
        return ctx.sortByCollectionAt();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](81, " Date ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](82, "i", 34)(83, "i", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](84, "th", 30)(85, "button", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_85_listener() {
        return ctx.sortByBranchName();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](86, " Branch Name ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](87, "i", 34)(88, "i", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](89, "th", 30)(90, "button", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_90_listener() {
        return ctx.sortByRegisterName();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](91, " Register Name ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](92, "i", 34)(93, "i", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](94, "th", 30)(95, "button", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_95_listener() {
        return ctx.sortByCardType();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](96, " Card Type ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](97, "i", 34)(98, "i", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](99, "th", 30)(100, "button", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_100_listener() {
        return ctx.sortByCardCollectionJod();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](101, " Amount ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](102, "i", 34)(103, "i", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](104, "th", 30)(105, "button", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](106, " Commission Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](107, "th", 30)(108, "button", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](109, " Net Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](110, "th", 30)(111, "button", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](112, "Bank Account Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](113, "th", 37)(114, "button", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](115, "Bank Deposit Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](116, "tbody", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](117, CreateReconciliationComponent_tr_117_Template, 40, 26, "tr", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](118, CreateReconciliationComponent_div_118_Template, 13, 10, "div", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](119, "div", 41)(120, "button", 42)(121, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](122, "Close");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](123, "button", 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_123_listener() {
        return ctx.groupReconciliation();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](124, " Group Reconciliation ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](125, "button", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreateReconciliationComponent_Template_button_click_125_listener() {
        return ctx.onPostReconcilationIds();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](126, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](127, "Post");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](128, CreateReconciliationComponent_ng_template_128_Template, 8, 0, "ng-template", 45, 46, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](130, CreateReconciliationComponent_ng_template_130_Template, 8, 1, "ng-template", 45, 47, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx.filterForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.provider);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("bsConfig", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](66, _c4));
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.cardlist);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.terminalMachineList)("multiple", true)("closeOnSelect", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.branchList);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"]("Selected Amount: ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](40, 63, ctx.selectedAmount, "1.3-3"), " ", ctx.currency, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Total No. ", ctx.total, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("checked", ctx.selectAllChecked);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx.sort == 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.reconciliation.length == 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.cardsArray.controls);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.totalAllRecordsCount > ctx.limit);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.isReturn);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.isPostEnabled());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormArrayName, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_18__.NgSelectComponent, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_18__.NgOptionTemplateDirective, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_18__.NgMultiLabelTemplateDirective, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_19__.BsDatepickerDirective, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_19__.BsDatepickerInputDirective, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_19__.BsDaterangepickerDirective, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_19__.BsDaterangepickerInputDirective, _shared_directives_decimal_number_directive__WEBPACK_IMPORTED_MODULE_6__.DecimalNumberDirective, _shared_components_validation_error_validation_error_component__WEBPACK_IMPORTED_MODULE_7__.ValidationErrorComponent, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbPagination, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbPaginationNext, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbPaginationNumber, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbPaginationPrevious, _angular_common__WEBPACK_IMPORTED_MODULE_17__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.DatePipe],
  styles: [".applyMargin[_ngcontent-%COMP%] {\n  margin-top: 2.5rem;\n}\n\n.total[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 15px 0 0px;\n  padding: 10px 0px;\n}\n.total[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 16px;\n  line-height: 19px;\n  color: #929eae;\n  margin: 0px;\n  padding: 10px 0px;\n}\n\n.card-table[_ngcontent-%COMP%] {\n  border: 0.5px solid #f4f4f4;\n  box-shadow: 3px 7px 12px 0px rgba(0, 0, 0, 0.18);\n  -webkit-box-shadow: 3px 7px 12px 0px rgba(0, 0, 0, 0.18);\n  -moz-box-shadow: 3px 7px 12px 0px rgba(0, 0, 0, 0.18);\n}\n\n.btn-provide[_ngcontent-%COMP%] {\n  background-color: #dc3545;\n  color: white;\n  outline: none;\n  border: none;\n  padding: 8px 14px 8px 14px;\n  border-radius: 4px;\n  font-size: 12px;\n  width: 80px;\n}\n\n.btn-disabled[_ngcontent-%COMP%] {\n  background-color: #c5c6c7;\n  color: white;\n  outline: none;\n  border: none;\n  padding: 8px 14px 8px 14px;\n  border-radius: 4px;\n  font-size: 12px;\n  width: 80px;\n}\n\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: end;\n  align-items: center;\n  gap: 8px;\n}\n\n.play-left[_ngcontent-%COMP%] {\n  color: #eceaea;\n  transform: rotate(180deg);\n  margin-right: 5px;\n}\n\n.play-right[_ngcontent-%COMP%] {\n  color: #eceaea;\n}\n\n.dropdownBox[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 150px;\n  height: 48px;\n  background: #4e9aff;\n  border-radius: 8px;\n}\n\n.headButton[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 95px;\n  height: 34.2px;\n  border-radius: 8px;\n}\n\n.headButtonText[_ngcontent-%COMP%] {\n  font-family: Kumbh Sans;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 17px;\n  letter-spacing: 0em;\n  text-align: left;\n}\n\n.menu[_ngcontent-%COMP%] {\n  width: 180px;\n  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));\n}\n\n.menu2[_ngcontent-%COMP%] {\n  width: 235px;\n  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));\n}\n\n.more-filter-drop[_ngcontent-%COMP%] {\n  height: 46px;\n  width: 150px;\n  background: #4e9aff;\n  border-radius: 8px;\n  color: white;\n  outline: none;\n  border: none;\n}\n\n.dropdown-item[_ngcontent-%COMP%] {\n  padding: 12px 12px;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n\n.checkBox[_ngcontent-%COMP%] {\n  accent-color: #dc3545;\n  width: 20px;\n  height: 20px;\n}\n\n.dropdownFilters[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  border: 1px solid #dc3545;\n}\n\n.filterFlex[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.btn-edit[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 20px;\n}\n\np[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 16px;\n  line-height: 19px;\n  color: #929eae;\n  margin: 0px;\n}\n\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  background-color: #F8F8F8;\n  border-radius: 8px;\n  color: red;\n}\n\n.modal-content[_ngcontent-%COMP%] {\n  border: 0px;\n}\n\n  .ng-select.ng-select-multiple .ng-select-container {\n  height: 46px !important;\n  min-height: 46px;\n}\n  .ng-select.ng-select-multiple .ng-select-container .ng-value-container {\n  flex-wrap: nowrap !important;\n  overflow: hidden !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  align-items: center;\n}\n  .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value {\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n  max-width: 140px;\n  padding: 4px 8px;\n  margin: 0 4px 0 0;\n  font-size: 12px;\n  line-height: normal;\n}\n  .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-label {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n  .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.badge-more {\n  background-color: #6c757d;\n  cursor: default;\n}\n  .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-input {\n  padding-top: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY3JlZGl0LWNhcmRzL2NyZWF0ZS1yZWNvbmNpbGlhdGlvbi9jcmVhdGUtcmVjb25jaWxpYXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtBQUNKOztBQUVJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQUNOO0FBQ0k7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUFDTjs7QUFFRTtFQUNFLDJCQUFBO0VBQ0EsZ0RBQUE7RUFDQSx3REFBQTtFQUNBLHFEQUFBO0FBQ0o7O0FBQ0U7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQUVKOztBQUFFO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUFHSjs7QUFERTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQUlKOztBQUZFO0VBQ0UsY0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7QUFLSjs7QUFIRTtFQUNFLGNBQUE7QUFNSjs7QUFIRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFFQSxtQkFBQTtFQUNBLGtCQUFBO0FBS0o7O0FBRkU7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBRUEsa0JBQUE7QUFJSjs7QUFGRTtFQUNFLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBS0o7O0FBSEU7RUFDRSxZQUFBO0VBQ0EscURBQUE7QUFNSjs7QUFIRTtFQUNFLFlBQUE7RUFFQSxxREFBQTtBQUtKOztBQUZFO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBS0o7O0FBRkU7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0FBS0o7O0FBSEU7RUFDRSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBTUo7O0FBSEU7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLHlCQUFBO0FBTUo7O0FBSEU7RUFDRSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FBTUo7O0FBRkk7RUFDRSxXQUFBO0FBS047O0FBRkU7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBS0o7O0FBSEU7RUFFSSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FBS047O0FBRkU7RUFDRSxXQUFBO0FBS0o7O0FBQUk7RUFDRSx1QkFBQTtFQUNBLGdCQUFBO0FBR047QUFETTtFQUNFLDRCQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtFQUNBLDRCQUFBO0VBQ0EsbUJBQUE7QUFHUjtBQURRO0VBQ0Usb0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBR1Y7QUFEVTtFQUNFLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUdaO0FBQVU7RUFDRSx5QkFBQTtFQUNBLGVBQUE7QUFFWjtBQUVRO0VBQ0UsY0FBQTtBQUFWIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcGx5TWFyZ2luIHtcbiAgICBtYXJnaW4tdG9wOiAyLjVyZW07XG4gIH1cbiAgLnRvdGFsIHtcbiAgICBoNCB7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgbWFyZ2luOiAxNXB4IDAgMHB4O1xuICAgICAgcGFkZGluZzogMTBweCAwcHg7XG4gICAgfVxuICAgIHAge1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxOXB4O1xuICAgICAgY29sb3I6ICM5MjllYWU7XG4gICAgICBtYXJnaW46IDBweDtcbiAgICAgIHBhZGRpbmc6IDEwcHggMHB4O1xuICAgIH1cbiAgfVxuICAuY2FyZC10YWJsZSB7XG4gICAgYm9yZGVyOiAwLjVweCBzb2xpZCAjZjRmNGY0O1xuICAgIGJveC1zaGFkb3c6IDNweCA3cHggMTJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE4KTtcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDNweCA3cHggMTJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE4KTtcbiAgICAtbW96LWJveC1zaGFkb3c6IDNweCA3cHggMTJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE4KTtcbiAgfVxuICAuYnRuLXByb3ZpZGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDU7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHBhZGRpbmc6IDhweCAxNHB4IDhweCAxNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgd2lkdGg6IDgwcHg7XG4gIH1cbiAgLmJ0bi1kaXNhYmxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2M1YzZjNztcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcGFkZGluZzogOHB4IDE0cHggOHB4IDE0cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB3aWR0aDogODBweDtcbiAgfVxuICAucGFnaW5hdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICB9XG4gIC5wbGF5LWxlZnQge1xuICAgIGNvbG9yOiAjZWNlYWVhO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIH1cbiAgLnBsYXktcmlnaHQge1xuICAgIGNvbG9yOiAjZWNlYWVhO1xuICB9XG4gIFxuICAuZHJvcGRvd25Cb3gge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiA0OHB4O1xuICBcbiAgICBiYWNrZ3JvdW5kOiAjNGU5YWZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgfVxuICBcbiAgLmhlYWRCdXR0b24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB3aWR0aDogOTVweDtcbiAgICBoZWlnaHQ6IDM0LjJweDtcbiAgXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICB9XG4gIC5oZWFkQnV0dG9uVGV4dCB7XG4gICAgZm9udC1mYW1pbHk6IEt1bWJoIFNhbnM7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbGluZS1oZWlnaHQ6IDE3cHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDBlbTtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB9XG4gIC5tZW51IHtcbiAgICB3aWR0aDogMTgwcHg7XG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwcHggMTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xKSk7XG4gIH1cbiAgXG4gIC5tZW51MiB7XG4gICAgd2lkdGg6IDIzNXB4O1xuICBcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDBweCAxMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjEpKTtcbiAgfVxuICBcbiAgLm1vcmUtZmlsdGVyLWRyb3Age1xuICAgIGhlaWdodDogNDZweDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgYmFja2dyb3VuZDogIzRlOWFmZjtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyOiBub25lO1xuICB9XG4gIFxuICAuZHJvcGRvd24taXRlbSB7XG4gICAgcGFkZGluZzogMTJweCAxMnB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cbiAgLmNoZWNrQm94IHtcbiAgICBhY2NlbnQtY29sb3I6ICNkYzM1NDU7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICB9XG4gIFxuICAuZHJvcGRvd25GaWx0ZXJzIHtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGMzNTQ1O1xuICB9XG4gIFxuICAuZmlsdGVyRmxleCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cbiBcbiAgLmJ0bi1lZGl0IHtcbiAgICBpbWcge1xuICAgICAgd2lkdGg6IDIwcHg7XG4gICAgfVxuICB9XG4gIHAge1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxOXB4O1xuICAgIGNvbG9yOiAjOTI5ZWFlO1xuICAgIG1hcmdpbjogMHB4O1xuICB9XG4gIC5idG4tY2FuY2Vse1xuICAgXG4gICAgICBwYWRkaW5nOiAxMnB4IDI0cHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjhGOEY4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgY29sb3I6IHJlZDtcbiAgXG4gIH1cbiAgLm1vZGFsLWNvbnRlbnQge1xuICAgIGJvcmRlcjogMHB4O1xuICB9XG5cbjo6bmctZGVlcCB7XG4gIC5uZy1zZWxlY3Qubmctc2VsZWN0LW11bHRpcGxlIHtcbiAgICAubmctc2VsZWN0LWNvbnRhaW5lciB7XG4gICAgICBoZWlnaHQ6IDQ2cHggIWltcG9ydGFudDtcbiAgICAgIG1pbi1oZWlnaHQ6IDQ2cHg7XG5cbiAgICAgIC5uZy12YWx1ZS1jb250YWluZXIge1xuICAgICAgICBmbGV4LXdyYXA6IG5vd3JhcCAhaW1wb3J0YW50O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XG4gICAgICAgIHBhZGRpbmctdG9wOiAwICFpbXBvcnRhbnQ7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgLm5nLXZhbHVlIHtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgbWF4LXdpZHRoOiAxNDBweDtcbiAgICAgICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgICAgIG1hcmdpbjogMCA0cHggMCAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuXG4gICAgICAgICAgLm5nLXZhbHVlLWxhYmVsIHtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi5iYWRnZS1tb3JlIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM2Yzc1N2Q7XG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLm5nLWlucHV0IHtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 7879:
/*!*****************************************************************************!*\
  !*** ./src/app/credit-cards/credit-card-list/credit-card-list.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreditCardListComponent": () => (/* binding */ CreditCardListComponent)
/* harmony export */ });
/* harmony import */ var _var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 1989);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 8977);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 1640);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _shared_services_excel_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/excel.service */ 8219);
/* harmony import */ var src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/credit-card.service */ 1265);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_shared_services_header_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/services/header.service */ 940);
/* harmony import */ var _shared_services_helper_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/helper.service */ 1785);
/* harmony import */ var src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/app-config.service */ 1559);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-select/ng-select */ 3054);
/* harmony import */ var _shared_components_table_advanced_table_advanced_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/components/table-advanced/table-advanced.component */ 9973);
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ 1863);
/* harmony import */ var _shared_components_table_advanced_table_advanced_directives__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/table-advanced/table-advanced.directives */ 5746);

















function CreditCardListComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 68)(1, "div", 69)(2, "div", 2)(3, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "img", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 72)(6, "span", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const item_r23 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", item_r23.provider.imageFile, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Total No . ", item_r23.cardsCount, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](11, 4, item_r23.total, "1.3-3"), " ", ctx_r0.currency, "");
  }
}
function CreditCardListComponent_i_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "i", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_i_27_Template_i_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r24.removeCollectionDateFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreditCardListComponent_div_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17)(1, "div", 7)(2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "input", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_div_91_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r26.removeInvoiceFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControl", ctx_r3.searchText);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r3.searchText.value == null);
  }
}
function CreditCardListComponent_div_92_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17)(1, "div", 7)(2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "input", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function CreditCardListComponent_div_92_Template_input_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r28.inputvalue($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_div_92_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r29);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r30.removeCommissionFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControl", ctx_r4.CommissionRatiochange);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r4.CommissionRatiochange.value == null);
  }
}
function CreditCardListComponent_div_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17)(1, "div", 7)(2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "input", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function CreditCardListComponent_div_93_Template_input_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r32);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r31.validateInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_div_93_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r32);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r33.removeAmountFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControl", ctx_r5.amountchange);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r5.amountchange.value == null);
  }
}
function CreditCardListComponent_div_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17)(1, "div", 7)(2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "input", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function CreditCardListComponent_div_94_Template_input_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r34.validateNumberInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_div_94_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r35);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r36.removeSectionFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControl", ctx_r6.SessionNumberchange);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r6.SessionNumberchange.value == null);
  }
}
function CreditCardListComponent_div_95_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17)(1, "div", 7)(2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "input", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function CreditCardListComponent_div_95_Template_input_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r38);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r37.validateInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_div_95_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r38);
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r39.removeNetAmountFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControl", ctx_r7.netamountchange);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r7.netamountchange.value == null);
  }
}
function CreditCardListComponent_div_96_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "All");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreditCardListComponent_div_96_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r43 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", item_r43 + ",", " ");
  }
}
function CreditCardListComponent_div_96_a_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 29)(1, "input", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CreditCardListComponent_div_96_a_9_Template_input_change_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r47);
      const item_r44 = restoredCtx.$implicit;
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r46.handleCategoryChange3(item_r44, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r44 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", item_r44.branchId);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" \u00A0 ", item_r44 == null ? null : item_r44.branchName, " ");
  }
}
function CreditCardListComponent_div_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17)(1, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, " Branch : ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, CreditCardListComponent_div_96_span_3_Template, 2, 0, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, CreditCardListComponent_div_96_div_4_Template, 2, 1, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "i", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "i", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_div_96_Template_i_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r49);
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r48.removebranchFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ul", 85)(8, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, CreditCardListComponent_div_96_a_9_Template, 3, 2, "a", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r8.newDropdownbranch.length == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r8.newDropdownbranch);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r8.branch);
  }
}
function CreditCardListComponent_div_97_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "All");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function CreditCardListComponent_div_97_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r53 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", item_r53 + ",", " ");
  }
}
function CreditCardListComponent_div_97_a_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 29)(1, "input", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CreditCardListComponent_div_97_a_9_Template_input_change_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r57);
      const item_r54 = restoredCtx.$implicit;
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r56.handleCategoryChange4(item_r54, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r54 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", item_r54.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" \u00A0 ", item_r54 == null ? null : item_r54.registersName, " ");
  }
}
function CreditCardListComponent_div_97_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17)(1, "button", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, " Register : ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, CreditCardListComponent_div_97_span_3_Template, 2, 0, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, CreditCardListComponent_div_97_div_4_Template, 2, 1, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "i", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "i", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_div_97_Template_i_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r59);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r58.removeregisterFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ul", 90)(8, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, CreditCardListComponent_div_97_a_9_Template, 3, 2, "a", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r9.newDropdownregister.length == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r9.newDropdownregister);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r9.register);
  }
}
function CreditCardListComponent_div_98_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 17)(1, "div", 7)(2, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "i", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "input", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "button", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_div_98_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r61);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r60.removeMachineIdFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControl", ctx_r10.machineId);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r10.machineId.value == null);
  }
}
function CreditCardListComponent_ng_template_111_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r62 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", row_r62.provider == null ? null : row_r62.provider.providerName, " ");
  }
}
function CreditCardListComponent_ng_template_112_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "date");
  }
  if (rf & 2) {
    const row_r63 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 1, row_r63 == null ? null : row_r63.collectionAt), " ");
  }
}
function CreditCardListComponent_ng_template_113_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r64 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", row_r64.branch == null ? null : row_r64.branch.branchName, " ");
  }
}
function CreditCardListComponent_ng_template_114_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r65 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", row_r65.register == null ? null : row_r65.register.registersName, " ");
  }
}
function CreditCardListComponent_ng_template_115_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 94)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "img", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r66 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](row_r66 == null ? null : row_r66.cardType == null ? null : row_r66.cardType.translations[0] == null ? null : row_r66.cardType.translations[0].lookupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("src", row_r66.cardType == null ? null : row_r66.cardType.lookupImage, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
function CreditCardListComponent_ng_template_116_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "number");
  }
  if (rf & 2) {
    const row_r67 = ctx.row;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](1, 2, row_r67 == null ? null : row_r67.cardCollectionJod, "1.3-3"), " ", ctx_r16.currency, " ");
  }
}
function CreditCardListComponent_ng_template_117_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "number");
  }
  if (rf & 2) {
    const row_r68 = ctx.row;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", (row_r68 == null ? null : row_r68.commissionAmount) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](1, 1, row_r68 == null ? null : row_r68.commissionAmount, "2.3-3") + " " + ctx_r17.currency || "-", " ");
  }
}
function CreditCardListComponent_ng_template_118_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r69 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", (row_r69 == null ? null : row_r69.statusObj == null ? null : row_r69.statusObj.lookupId) == 30001 && "-" || (row_r69 == null ? null : row_r69.commissionRatio) + " %" || 0, " ");
  }
}
function CreditCardListComponent_ng_template_119_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "number");
  }
  if (rf & 2) {
    const row_r70 = ctx.row;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", (row_r70 == null ? null : row_r70.statusObj == null ? null : row_r70.statusObj.lookupId) == 30001 && "-" || _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](1, 1, row_r70 == null ? null : row_r70.cardCollectionJodNet, "1.3-3") + " " + ctx_r19.currency, " ");
  }
}
function CreditCardListComponent_ng_template_120_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "date");
  }
  if (rf & 2) {
    const row_r71 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](1, 1, row_r71 == null ? null : row_r71.cardBankDepositDate, "mediumDate") || "-", " ");
  }
}
function CreditCardListComponent_ng_template_121_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r72 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleProp"]("color", row_r72 == null ? null : row_r72.statusObj == null ? null : row_r72.statusObj.lookupTextColor)("background-color", row_r72 == null ? null : row_r72.statusObj == null ? null : row_r72.statusObj.lookupBGColor);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", row_r72 == null ? null : row_r72.statusObj == null ? null : row_r72.statusObj.translations == null ? null : row_r72.statusObj.translations[0].lookupName, " ");
  }
}
function CreditCardListComponent_ng_template_122_Template(rf, ctx) {
  if (rf & 1) {
    const _r75 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "i", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_ng_template_122_Template_i_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r75);
      const row_r73 = restoredCtx.row;
      const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r74.gotopaymentdetails(row_r73.ordersCardsCollectionId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
const _c0 = function () {
  return {
    containerClass: "theme-red",
    isAnimated: true,
    showClearButton: true
  };
};
class CreditCardListComponent {
  constructor(_excelService, creditcardservice, router, headerService, _helperService, appConfigService) {
    this._excelService = _excelService;
    this.creditcardservice = creditcardservice;
    this.router = router;
    this.headerService = headerService;
    this._helperService = _helperService;
    this.appConfigService = appConfigService;
    // Form controls for search inputs
    this.currency = '';
    this.searchChequeText = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.machineId = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.searchText = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.amountchange = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.SessionNumberchange = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.netamountchange = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null);
    this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    this.CommissionRatiochange = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(0);
    this.tableColumns = [];
    this.searchChequeNo = '';
    this.searchCustomerNo = '';
    this.loading = false;
    this.chequeList = [];
    this.dropDownbankId = [];
    this.cardlist = [];
    this.branch = [];
    this.register = [];
    this.carddetial = [];
    this.totalAllRecordsCount = 0;
    this.page = 1;
    this.total = 0;
    this.limit = 6;
    this.sort = 1;
    this.startDate = '';
    this.tableConfig = {
      paging: true,
      filter: {
        Sort: 1,
        PageSize: this.limit
      }
    };
    this.isMachineId = false;
    this.newDropdownbank = [];
    this.bank = false;
    this.dueDate = false;
    this.RegisterName = false;
    this.BranchName = false;
    this.NetAmount = false;
    this.Amount = false;
    this.SessionNumber = false;
    this.Commission = false;
    this.Invoice = false;
    this.newDropdownbranch = [];
    this.dropDownbranchId = [];
    this.newDropdownregister = [];
    this.dropDownregisterId = [];
  }
  ngOnInit() {
    this.currency = this.appConfigService.currency || '';
    // Set the page title
    this.headerService.setTitle('Credit Cards Payments ');
    // Initialize table columns
    this.initTableColumns();
    // Fetch data from APIs
    this.getdata();
    this.gettable();
    // Subscribe to form control value changes for search inputs
    this.searchChequeText.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.unsubscribe)).subscribe(value => {
      // Update the Last4digits filter and refresh the table
      const text = value || '';
      if (text?.length >= 3 || !text?.length && this.tableConfig.filter.Last4digits?.length) {
        this.tableConfig.filter.Last4digits = text;
        this.page = 1;
        this.gettable();
      }
    });
    this.machineId.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.unsubscribe)).subscribe(value => {
      // Update the Last4digits filter and refresh the table
      const text = value || '';
      if (text?.length >= 3 || !text?.length && this.tableConfig.filter.machineId?.length) {
        this.tableConfig.filter.machineId = text;
        this.page = 1;
        this.gettable();
      }
    });
    this.searchText.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.unsubscribe)).subscribe(value => {
      // Update the MachineReceipt filter and refresh the table
      const text = value || '';
      if (text?.length >= 3 || !text?.length && this.tableConfig.filter.MachineReceipt?.length) {
        this.tableConfig.filter.MachineReceipt = text;
        this.page = 1;
        this.gettable();
      }
    });
    this.amountchange.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.unsubscribe)).subscribe(value => {
      // Update the Amount filter and refresh the table
      const text = value || '';
      if (text?.length >= 0 || !text?.length && this.tableConfig.filter.Amount?.length) {
        this.tableConfig.filter.Amount = text;
        this.page = 1;
        this.gettable();
      }
    });
    this.SessionNumberchange.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.unsubscribe)).subscribe(value => {
      // Update the Amount filter and refresh the table
      const text = value || '';
      if (text?.length >= 0 || !text?.length && this.tableConfig.filter.SessionNumber?.length) {
        let checktext = parseFloat(text);
        if (!isNaN(checktext)) this.tableConfig.filter.RegisterSessionId = checktext;
        this.page = 1;
        this.gettable();
      }
    });
    this.netamountchange.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.unsubscribe)).subscribe(value => {
      // Update the NetAmount filter and refresh the table
      const text = value || '';
      if (text?.length >= 0 || !text?.length && this.tableConfig.filter.NetAmount?.length) {
        this.tableConfig.filter.NetAmount = text;
        this.page = 1;
        this.gettable();
      }
    });
  }
  ngOnDestroy() {
    // Unsubscribe from subscriptions to avoid memory leaks
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  getCardsForExport() {
    this.loading = true;
    this.tableConfig.filter.PageNo = this.page - 1;
    this.tableConfig.filter.PageSize = 100000;
    this.creditcardservice.GetTable(this.tableConfig.filter).subscribe(result => {
      if (result) {
        this.generateExcelExport(result.data);
        this.tableConfig.filter.PageSize = this.limit;
      }
    }).add(() => this.loading = false);
  }
  generateExcelExport(data) {
    var _this = this;
    return (0,_var_www_Sources_DxFE_DX_FE_Treasury_DX_FE_Treasury_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      data = data.map(x => {
        return {
          ...x,
          collectionAt: _this._helperService.dateFormate(x?.collectionAt),
          cardBankDepositDate: _this._helperService.dateFormate(x?.cardBankDepositDate)
        };
      });
      const exportOptions = {
        fileName: 'Card_Transactions',
        mainHeading: '',
        sections: [{
          heading: [],
          headerStyle: {
            bold: true,
            size: 12,
            color: {
              argb: 'ff000000'
            },
            fgColor: {
              argb: 'ffe7e6e6'
            }
          },
          headers: ['Last 4 Digit', 'Provider', 'Merchant ID', 'Machine Receipt Number', 'Collection Date', 'Branch Name', 'Ragister Name', 'Card Type', 'Amount', 'Commission Ratio', 'Commission Amount', 'Net Amount', 'Bank Deposit Date', 'Session Number', 'Status'],
          mainKeyMapping: ['cardLast4Digits', 'provider.providerName', 'machineID', 'machineReceiptNumber', 'collectionAt', 'branch.branchName', 'register.registersName', 'cardType.translations[0].lookupName', 'cardCollectionJod', 'commissionRatio', 'commissionAmount', 'cardCollectionJodNet', 'cardBankDepositDate', 'registerSessionId', 'statusObj.translations[0].lookupName'],
          data: data
        }]
      };
      const result = yield _this._excelService.exportToExcelJs1(exportOptions);
    })();
  }
  // Initialize table columns
  initTableColumns() {
    this.tableColumns = [
    // Define columns with their keys and labels
    {
      key: 'cardLast4Digits',
      label: 'Last 4 Digit',
      canSort: true
    }, {
      key: 'provider',
      label: 'Provider',
      canSort: true
    }, {
      key: 'machineID',
      label: 'Merchant ID'
    }, {
      key: 'machineReceiptNumber',
      label: 'Machine Receipt Number',
      canSort: true
    }, {
      key: 'collectionAt',
      label: 'Collection Date',
      canSort: true
    }, {
      key: 'branch',
      label: 'Branch Name',
      canSort: true
    }, {
      key: 'registers',
      label: 'Ragister Name',
      canSort: true
    }, {
      key: 'cardType',
      label: 'Card Type',
      canSort: true
    }, {
      key: 'cardCollectionJod',
      label: 'Amount',
      canSort: true
    }, {
      key: 'commissionRatio',
      label: 'Commission Ratio',
      canSort: true
    }, {
      key: 'commissionAmount',
      label: 'Commission Amount'
    }, {
      key: 'cardCollectionJodNet',
      label: 'Net Amount',
      canSort: true
    }, {
      key: 'cardBankDepositDate',
      label: 'Bank Deposit Date'
    }, {
      key: 'registerSessionId',
      label: 'Session Number',
      canSort: true
    }, {
      key: 'statusObj',
      label: 'Status',
      canSort: true
    }, {
      key: 'Action',
      label: 'Action',
      canSort: true
    }];
  }
  // Handle table sort change
  onSortChange(sort) {
    if (sort?.direction && sort?.column) {
      // Map the sort column to the corresponding filter property
      switch (sort.column) {
        case 'cardLast4Digits':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 3 : 2;
          break;
        case 'provider':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 5 : 4;
          break;
        case 'machineReceiptNumber':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 7 : 6;
          break;
        case 'collectionAt':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 9 : 8;
          break;
        case 'branch':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 11 : 10;
          break;
        case 'registers':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 13 : 12;
          break;
        case 'cardType':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 15 : 14;
          break;
        case 'cardCollectionJod':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 17 : 16;
          break;
        case 'commission':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 19 : 18;
          break;
        case 'cardCollectionJodNet':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 21 : 20;
          break;
        case 'registerSessionId':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 23 : 22;
          break;
        case 'statusObj':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 25 : 24;
          break;
        case 'Action':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 27 : 26;
          break;
        default:
          break;
      }
    } else {
      this.tableConfig.filter.Sort = 1;
    }
    this.gettable();
  }
  // Fetch necessary data from APIs
  getdata() {
    const api1$ = this.creditcardservice.GetProviders({
      pageSize: 1000,
      status: 2001
    });
    const api2$ = this.creditcardservice.GetCards();
    const api3$ = this.creditcardservice.GetBranch(this.tableConfig.filter);
    const api4$ = this.creditcardservice.GetRegister(this.tableConfig.filter);
    const api5$ = this.creditcardservice.Getcard();
    (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.forkJoin)([api1$, api2$, api3$, api4$, api5$]).subscribe(([result1, result2, result3, result4, result5]) => {
      // Store the fetched data in respective variables
      if (result1) {
        this.provider = result1.data || [];
      }
      if (result2) {
        this.cardlist = result2.data || [];
      }
      if (result3) {
        this.branch = result3.data || [];
      }
      if (result4) {
        this.register = result4.data || [];
      }
      if (result5) {
        this.carddetial = result5.data || [];
      }
    }, error => {
      console.error(error);
    }, () => {
      this.loading = false;
    });
  }
  // Fetch table data
  gettable() {
    this.loading = true;
    this.tableConfig.filter.PageNo = this.page - 1;
    this.creditcardservice.GetTable(this.tableConfig.filter).subscribe(result => {
      if (result) {
        this.chequeList = result.data;
        this.totalAllRecordsCount = result.totalRecordCount;
        this.total = result.totalRecordCount;
      }
    }).add(() => this.loading = false);
  }
  // Handle table sort change
  onPageChange(page) {
    console.log(page);
    this.page = page;
    this.gettable();
  }
  removelast4Filter() {
    this.searchChequeText.setValue(null);
    this.tableConfig.filter.Last4digits = '';
    this.page = 1;
    this.gettable();
  }
  removebankFilter() {
    this.newDropdownbank = [];
    this.dropDownbankId = [];
    this.bank = false;
    this.page = 1;
    this.gettable();
  }
  removeInvoiceFilter() {
    this.searchText.setValue(null);
    this.tableConfig.filter.MachineReceipt = '';
    this.page = 1;
    this.gettable();
  }
  removeCommissionFilter() {
    this.Commission = false;
    this.CommissionRatiochange.setValue(0);
    this.tableConfig.filter.Commission = '';
    this.page = 1;
    this.gettable();
  }
  removeAmountFilter() {
    this.amountchange.setValue(null);
    this.tableConfig.filter.Amount = '';
    this.page = 1;
    this.gettable();
  }
  removeMachineIdFilter() {
    this.machineId.setValue(null);
    this.tableConfig.filter.machineId = '';
    this.page = 1;
    this.gettable();
  }
  removeSectionFilter() {
    this.SessionNumberchange.setValue(null);
    this.tableConfig.filter.RegisterSessionId = '';
    this.page = 1;
    this.gettable();
  }
  removeNetAmountFilter() {
    this.netamountchange.setValue(null);
    this.tableConfig.filter.NetAmount = '';
    this.page = 1;
    this.gettable();
  }
  removeBranchNameFilter() {
    this.BranchName = false;
    this.branch = '';
    this.page = 1;
    this.gettable();
  }
  removeRegisterNameFilter() {
    this.RegisterName = false;
    this.page = 1;
    this.gettable();
  }
  filterRegisterName(event) {
    this.RegisterName = event.checked;
    if (!this.RegisterName) {
      this.RegisterName = false;
      delete this.tableConfig.filter.RegisterId;
      this.page = 1;
      this.gettable();
    }
  }
  filterMachineId(event) {
    this.isMachineId = event.checked;
    if (!this.isMachineId) {
      delete this.tableConfig.filter.machineId;
      this.page = 1;
      this.gettable();
    }
  }
  filterBranchName(event) {
    this.BranchName = event.checked;
    if (!this.BranchName) {
      this.BranchName = false;
      delete this.tableConfig.filter.BranchId;
      this.page = 1;
      this.gettable();
    }
  }
  filterNetAmount(event) {
    this.NetAmount = event.checked;
    if (!this.NetAmount) {
      this.NetAmount = false;
      this.netamountchange.setValue(null);
      this.tableConfig.filter.netamountchange = '';
      this.page = 1;
      this.gettable();
    }
  }
  filterAmount(event) {
    this.Amount = event.checked;
    if (!this.Amount) {
      this.Amount = false;
      this.amountchange.setValue(null);
      this.tableConfig.filter.amountchange = '';
      this.page = 1;
      this.gettable();
    }
  }
  filterSessionNumber(event) {
    this.SessionNumber = event.checked;
    if (!this.SessionNumber) {
      this.SessionNumber = false;
      this.SessionNumberchange.setValue(null);
      this.tableConfig.filter.RegisterSessionId = '';
      this.page = 1;
      this.gettable();
    }
  }
  filterCommission(event) {
    this.Commission = event.checked;
    if (!this.Commission) {
      this.Commission = false;
      this.CommissionRatiochange.setValue(null);
      this.tableConfig.filter.Commission = '';
      this.page = 1;
      this.gettable();
    }
  }
  filterInvoice(event) {
    this.Invoice = event.checked;
    if (!this.Invoice) {
      this.Invoice = false;
      this.searchText.setValue(null);
      this.tableConfig.filter.searchText = '';
      this.page = 1;
      this.gettable();
    }
  }
  onDateValueChange(event) {
    var pipe = new _angular_common__WEBPACK_IMPORTED_MODULE_15__.DatePipe('en-US');
    this.startDate = pipe.transform(event) || '';
    console.log(this.startDate);
    if (this.startDate) {
      const fromDate = new Date(this.startDate);
      fromDate.setDate(fromDate.getDate() + 1); // Adding one day
      const formattedFromDate = fromDate.toISOString();
      this.tableConfig.filter.CollectionDate = formattedFromDate;
    } else this.tableConfig.filter.CollectionDate = this.startDate;
    this.page = 1;
    this.gettable();
  }
  removeCollectionDateFilter() {
    delete this.tableConfig.filter.CollectionDate;
    this.page = 1;
    this.datepickerInput = null;
    this.gettable();
  }
  handleCategoryChange(event) {
    console.log('bhushan ==>', event.providerId);
    this.tableConfig.filter.providerId = event.providerId;
    this.page = 1;
    // this.statusId = event?.id;
    this.gettable();
  }
  handleCategoryChange2(event) {
    this.tableConfig.filter.CardTypeId = event.id;
    this.page = 1;
    // this.statusId = event?.id;
    this.gettable();
  }
  handleCategoryChange3(item, event) {
    const obj4 = item.branchName;
    const branchId = item.branchId;
    if (event.target.checked) {
      // checking if the checkbox has been checked
      this.newDropdownbranch.push(obj4); // pushing object to newArray[]
      this.dropDownbranchId.push(branchId); // pushing object to newArray[]
    } else {
      this.newDropdownbranch = this.newDropdownbranch.filter(v => v !== obj4); // if the checkbox has been unchecked removing the object from the array
      this.dropDownbranchId = this.dropDownbranchId.filter(x => x !== branchId);
    }
    this.tableConfig.filter.BranchId = this.dropDownbranchId;
    this.page = 1;
    // this.statusId = event?.id;
    this.gettable();
  }
  removebranchFilter() {
    this.newDropdownbranch = [];
    this.dropDownbranchId = [];
    this.tableConfig.filter.BranchId = [];
    this.BranchName = false;
    this.page = 1;
    this.gettable();
  }
  handleCategoryChange4(item, event) {
    const obj4 = item.registersName;
    const id = item.id;
    if (event.target.checked) {
      // checking if the checkbox has been checked
      this.newDropdownregister.push(obj4); // pushing object to newArray[]
      this.dropDownregisterId.push(id); // pushing object to newArray[]
    } else {
      this.newDropdownregister = this.newDropdownregister.filter(v => v !== obj4); // if the checkbox has been unchecked removing the object from the array
      this.dropDownregisterId = this.dropDownregisterId.filter(x => x !== id);
    }
    this.tableConfig.filter.RegisterId = this.dropDownregisterId;
    this.page = 1;
    // this.statusId = event?.id;
    this.gettable();
  }
  removeregisterFilter() {
    this.newDropdownregister = [];
    this.dropDownregisterId = [];
    this.tableConfig.filter.RegisterId = [];
    this.RegisterName = false;
    this.page = 1;
    this.gettable();
  }
  onClear() {
    delete this.tableConfig.filter.BranchId;
    this.page = 1;
    this.gettable();
  }
  onClearR() {
    delete this.tableConfig.filter.RegisterId;
    this.page = 1;
    this.gettable();
  }
  onClearcard() {
    delete this.tableConfig.filter.CardTypeId;
    this.page = 1;
    this.gettable();
  }
  IsPDCFilter(value) {
    this.tableConfig.filter.Status = value;
    // this.statusId = event?.id;
    this.page = 1;
    this.gettable();
  }
  // Navigate to payment details page
  gotopaymentdetails(value) {
    this.router.navigate(['credit-card/payment-details'], {
      queryParams: {
        ordersCardsCollectionId: value
      }
    });
  }
  onClearprovider() {
    delete this.tableConfig.filter.providerId;
    this.page = 1;
    this.gettable();
  }
  inputvalue(value) {
    let checkPoint = false;
    const inputValue = value?.target?.value;
    if (inputValue && inputValue.includes('.')) {
      const parts = inputValue.split('.');
      if (parts.length === 2 && parts[1].length > 0) {
        if (inputValue === '0.0') checkPoint = true;else if (inputValue === '0.00') checkPoint = true;else checkPoint = false;
      } else if (parts.length === 2 && parts[1].length === 0) {
        checkPoint = true;
      } else {
        checkPoint = false;
      }
    }
    if (!checkPoint && parseFloat(inputValue) > 0) {
      this.tableConfig.filter.Commission = parseFloat(inputValue).toFixed(3);
      this.CommissionRatiochange.patchValue(parseFloat(parseFloat(inputValue).toFixed(3)));
      this.page = 1;
      this.sort = 1;
      this.gettable();
    } else if (inputValue.includes('-')) {
      this.CommissionRatiochange.patchValue(0);
    } else if (isNaN(parseFloat(inputValue))) {
      this.CommissionRatiochange.patchValue(0);
    } else if (parseFloat(inputValue) == 0 && !checkPoint) {
      this.CommissionRatiochange.patchValue(0);
    }
  }
  validateInput(event) {
    const enteredValue = event.target.value;
    const pattern = /^[0-9]*\.?[0-9]*$/; // Regex pattern to allow numbers and decimal point
    if (!pattern.test(enteredValue)) {
      event.target.value = enteredValue.replace(/[^0-9.]/g, ''); // Remove any invalid characters
    }
  }

  validateNumberInput(event) {
    const enteredValue = event.target.value;
    const pattern = /^[1-9]\d*$/; // Regex pattern to allow positive integers
    if (!pattern.test(enteredValue)) {
      event.target.value = enteredValue.replace(/[^1-9]/g, ''); // Remove any invalid characters
    }
  }

  validateCommissionInput(event) {
    const enteredValue = event.target.value;
    const pattern = /^[1-9]\d*$/; // Regex pattern to allow positive integers
    if (!pattern.test(enteredValue)) {
      event.target.value = enteredValue.replace(/[^1-9]/g, ''); // Remove any invalid characters
    } else {
      // Check if the value is greater than 100, and if so, set it to 100
      const numericValue = parseInt(enteredValue, 10);
      if (numericValue > 100) {
        event.target.value = '100';
      }
    }
  }
}
CreditCardListComponent.ɵfac = function CreditCardListComponent_Factory(t) {
  return new (t || CreditCardListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_excel_service__WEBPACK_IMPORTED_MODULE_1__.ExcelService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_2__.CreditCardService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_shared_services_header_service__WEBPACK_IMPORTED_MODULE_3__.HeaderService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_helper_service__WEBPACK_IMPORTED_MODULE_4__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_5__.AppConfigService));
};
CreditCardListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: CreditCardListComponent,
  selectors: [["app-credit-card-list"]],
  decls: 123,
  vars: 34,
  consts: [[1, "card-wrapper"], [1, "notes-wrapper", "row"], [1, "row"], ["class", "col-lg-3", 4, "ngFor", "ngForOf"], [1, "row", "mt-2"], [1, "col-md-10"], [1, "col-lg-3", "col-md-6"], [1, "input-group", "search-box"], ["type", "button", "id", "button-addon1", 1, "btn"], [1, "fa-solid", "fa-search"], ["type", "text", "placeholder", "Last 4 Digits", 1, "form-control", 3, "formControl"], ["type", "button", "id", "button-addon1", 1, "btn", 3, "hidden", "click"], [1, "fa-solid", "fa-xmark"], [1, "input-group"], ["placeholder", "Search By Provider Name", "bindLabel", "providerName", "bindValue", "providerId", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items", "formControl", "clear", "change"], [1, "col-lg-3", "col-md-6", "filterFlex"], ["placeholder", "Search By Card Type", "bindLabel", "name.lookupName", "bindValue", "id", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items", "clear", "change"], [1, "dropdown"], ["type", "button", 1, "btn", "dropdownFilters"], ["type", "text", "placeholder", "Select Date", "bsDatepicker", "", 1, "form-control", 3, "ngModel", "bsConfig", "ngModelChange", "bsValueChange"], ["dp", "bsDatepicker"], ["src", "../../../../assets/images/calendar.png", "alt", "", 1, "calender", 3, "click"], ["class", "fa-regular fa-circle-xmark", 3, "click", 4, "ngIf"], [1, "col-md-2"], [1, "row", "justify-content-end"], [1, "col-lg-10", "col-md-6", "d-flex", "justify-content-end"], ["type", "button", "id", "dropdownMenuButton", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "dropdownButton", "more-filter-drop"], [1, "fa-regular", "fa-plus"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu", "menu"], [1, "dropdown-item"], ["type", "checkbox", 1, "checkBox", 3, "ngModel", "ngModelChange", "change"], [1, "deposited-cheques-list-tabs"], [1, "col-lg-7"], [1, "col-lg-2"], [1, "col-lg-8"], ["role", "group", "aria-label", "Basic example", 1, "btn-group"], ["type", "button", 1, "btn", "btn-light"], [1, "form-check"], ["type", "radio", "name", "exampleRadios", "id", "exampleRadios1", "value", "", "checked", "", 1, "form-check-input", 3, "click"], ["for", "exampleRadios1", 1, "form-check-label"], ["type", "radio", "name", "exampleRadios", "id", "exampleRadios1", "value", "", 1, "form-check-input", 3, "click"], ["type", "radio", "name", "exampleRadios", "id", "exampleRadios2", "value", "true", 1, "form-check-input", 3, "click"], ["for", "exampleRadios2", 1, "form-check-label"], [1, "col-lg-5", "text-end"], ["routerLink", "/credit-card/reconciliation", 1, "btn", "btn-add"], [1, "col-lg-12"], [1, "filterFlex", "mt-4"], ["class", "dropdown", 4, "ngIf"], [1, "col-lg-12", "mb-3", "d-flex", "justify-content-between", "align-items-center"], [1, "m-0", "fw-600"], [1, "d-flex", "gap-2", "align-items-center"], ["type", "button", 1, "btn", "btn-success", "btn-lg", "font-16", 3, "click"], [1, "fas", "fa-file-excel", "me-2"], [1, "m-0", "txt-light"], [1, "col-md-12"], [3, "config", "columns", "data", "loading", "page", "total", "limit", "sortUpdated", "pageUpdated"], ["libTableAdvancedColumn", "provider"], ["libTableAdvancedColumn", "collectionAt"], ["libTableAdvancedColumn", "branch"], ["libTableAdvancedColumn", "registers"], ["libTableAdvancedColumn", "cardType"], ["libTableAdvancedColumn", "cardCollectionJod"], ["libTableAdvancedColumn", "commissionAmount"], ["libTableAdvancedColumn", "commissionRatio"], ["libTableAdvancedColumn", "cardCollectionJodNet"], ["libTableAdvancedColumn", "cardBankDepositDate"], ["libTableAdvancedColumn", "statusObj"], ["libTableAdvancedColumn", "Action"], [1, "col-lg-3"], [1, "card", "mb-3"], [1, "col-md-4"], ["alt", "", "srcset", "", "width", "72;", 3, "src"], [1, "col-md-8"], [1, "label"], [1, "label-txt"], [1, "fa-regular", "fa-circle-xmark", 3, "click"], ["type", "text", "placeholder", "Machine Receipt Number", 1, "form-control", 3, "formControl"], ["type", "text", "placeholder", "Commission", 1, "form-control", 3, "formControl", "input"], ["type", "text", "placeholder", "Amount", 1, "form-control", 3, "formControl", "input"], ["type", "text", "placeholder", "Section No", 1, "form-control", 3, "formControl", "input"], ["type", "text", "placeholder", "Net Amount", 1, "form-control", 3, "formControl", "input"], ["type", "button", "id", "dropdownbranch", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "dropdownFilters"], [4, "ngIf"], ["class", "d-flex", 4, "ngFor", "ngForOf"], [1, "fa-solid", "fa-chevron-down"], ["aria-labelledby", "dropdownbranch", 1, "dropdown-menu", "menu2"], ["class", "dropdown-item", 4, "ngFor", "ngForOf"], [1, "d-flex"], ["type", "checkbox", 1, "checkBox", 3, "value", "change"], ["type", "button", "id", "dropdownregister", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "dropdownFilters"], ["aria-labelledby", "dropdownregister", 1, "dropdown-menu", "menu2"], ["type", "button", "id", "button-addon133", 1, "btn"], ["type", "text", "placeholder", "MachineId", 1, "form-control", 3, "formControl"], ["type", "button", "id", "button-addon133", 1, "btn", 3, "hidden", "click"], [1, "d-flex", "flex-column"], ["alt", "", "srcset", "", "width", "55", 3, "src"], [1, "collected-btn"], [1, "fa-solid", "fa-eye", 2, "cursor", "pointer", 3, "click"]],
  template: function CreditCardListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r76 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, CreditCardListComponent_div_3_Template, 12, 7, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 4)(5, "div", 5)(6, "div", 2)(7, "div", 6)(8, "div", 7)(9, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "i", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "input", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_Template_button_click_12_listener() {
        return ctx.removelast4Filter();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "i", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 6)(15, "div", 13)(16, "ng-select", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("clear", function CreditCardListComponent_Template_ng_select_clear_16_listener() {
        return ctx.onClearprovider();
      })("change", function CreditCardListComponent_Template_ng_select_change_16_listener($event) {
        return ctx.handleCategoryChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "div", 15)(18, "div", 13)(19, "ng-select", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("clear", function CreditCardListComponent_Template_ng_select_clear_19_listener() {
        return ctx.onClearcard();
      })("change", function CreditCardListComponent_Template_ng_select_change_19_listener($event) {
        return ctx.handleCategoryChange2($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "div", 15)(21, "div", 7)(22, "div", 17)(23, "button", 18)(24, "input", 19, 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_24_listener($event) {
        return ctx.datepickerInput = $event;
      })("bsValueChange", function CreditCardListComponent_Template_input_bsValueChange_24_listener($event) {
        return ctx.onDateValueChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "img", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_Template_img_click_26_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r76);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](25);
        return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](_r1.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](27, CreditCardListComponent_i_27_Template, 1, 0, "i", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](28, "div", 23)(29, "div", 24)(30, "div", 25)(31, "div", 17)(32, "button", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](33, "i", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](34, " More Filters ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "ul", 28)(36, "li")(37, "a", 29)(38, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_38_listener($event) {
        return ctx.Invoice = $event;
      })("change", function CreditCardListComponent_Template_input_change_38_listener($event) {
        return ctx.filterInvoice($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](39, " \u00A0 Machine Receipt ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "a", 29)(41, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_41_listener($event) {
        return ctx.Commission = $event;
      })("change", function CreditCardListComponent_Template_input_change_41_listener($event) {
        return ctx.filterCommission($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](42, " \u00A0Commission ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "a", 29)(44, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_44_listener($event) {
        return ctx.Amount = $event;
      })("change", function CreditCardListComponent_Template_input_change_44_listener($event) {
        return ctx.filterAmount($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](45, " \u00A0Amount ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](46, "a", 29)(47, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_47_listener($event) {
        return ctx.SessionNumber = $event;
      })("change", function CreditCardListComponent_Template_input_change_47_listener($event) {
        return ctx.filterSessionNumber($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](48, " \u00A0Session Number ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](49, "a", 29)(50, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_50_listener($event) {
        return ctx.NetAmount = $event;
      })("change", function CreditCardListComponent_Template_input_change_50_listener($event) {
        return ctx.filterNetAmount($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](51, " \u00A0Net Amount ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](52, "a", 29)(53, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_53_listener($event) {
        return ctx.BranchName = $event;
      })("change", function CreditCardListComponent_Template_input_change_53_listener($event) {
        return ctx.filterBranchName($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](54, " \u00A0Branch Name ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](55, "a", 29)(56, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_56_listener($event) {
        return ctx.RegisterName = $event;
      })("change", function CreditCardListComponent_Template_input_change_56_listener($event) {
        return ctx.filterRegisterName($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](57, " \u00A0Register Name ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](58, "a", 29)(59, "input", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function CreditCardListComponent_Template_input_ngModelChange_59_listener($event) {
        return ctx.isMachineId = $event;
      })("change", function CreditCardListComponent_Template_input_change_59_listener($event) {
        return ctx.filterMachineId($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](60, " \u00A0Merchant ID ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](61, "div", 31)(62, "div", 2)(63, "div", 32)(64, "div", 4)(65, "div", 33)(66, "h6");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](67, "Status");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](68, "div", 34)(69, "div", 35)(70, "button", 36)(71, "div", 37)(72, "input", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_Template_input_click_72_listener() {
        return ctx.IsPDCFilter("");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](73, "label", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](74, " All ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](75, "button", 36)(76, "div", 37)(77, "input", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_Template_input_click_77_listener() {
        return ctx.IsPDCFilter(30001);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](78, "label", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](79, " UnReconciled ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](80, "button", 36)(81, "div", 37)(82, "input", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_Template_input_click_82_listener() {
        return ctx.IsPDCFilter(30002);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](83, "label", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](84, " Reconciled ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](85, "div", 43)(86, "button", 44)(87, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](88, "Create Reconciliation");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](89, "div", 45)(90, "div", 46);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](91, CreditCardListComponent_div_91_Template, 7, 2, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](92, CreditCardListComponent_div_92_Template, 7, 2, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](93, CreditCardListComponent_div_93_Template, 7, 2, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](94, CreditCardListComponent_div_94_Template, 7, 2, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](95, CreditCardListComponent_div_95_Template, 7, 2, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](96, CreditCardListComponent_div_96_Template, 10, 3, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](97, CreditCardListComponent_div_97_Template, 10, 3, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](98, CreditCardListComponent_div_98_Template, 7, 2, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](99, "div", 4)(100, "div", 48)(101, "h5", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](102, "Cards Transactions List");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](103, "div", 50)(104, "button", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CreditCardListComponent_Template_button_click_104_listener() {
        return ctx.getCardsForExport();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](105, "i", 52);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](106, " Export");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](107, "h6", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](108);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](109, "div", 54)(110, "app-table-advanced", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("sortUpdated", function CreditCardListComponent_Template_app_table_advanced_sortUpdated_110_listener($event) {
        return ctx.onSortChange($event);
      })("pageUpdated", function CreditCardListComponent_Template_app_table_advanced_pageUpdated_110_listener($event) {
        return ctx.onPageChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](111, CreditCardListComponent_ng_template_111_Template, 1, 1, "ng-template", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](112, CreditCardListComponent_ng_template_112_Template, 2, 3, "ng-template", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](113, CreditCardListComponent_ng_template_113_Template, 1, 1, "ng-template", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](114, CreditCardListComponent_ng_template_114_Template, 1, 1, "ng-template", 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](115, CreditCardListComponent_ng_template_115_Template, 4, 2, "ng-template", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](116, CreditCardListComponent_ng_template_116_Template, 2, 5, "ng-template", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](117, CreditCardListComponent_ng_template_117_Template, 2, 4, "ng-template", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](118, CreditCardListComponent_ng_template_118_Template, 1, 1, "ng-template", 63);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](119, CreditCardListComponent_ng_template_119_Template, 2, 4, "ng-template", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](120, CreditCardListComponent_ng_template_120_Template, 2, 4, "ng-template", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](121, CreditCardListComponent_ng_template_121_Template, 2, 5, "ng-template", 66);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](122, CreditCardListComponent_ng_template_122_Template, 1, 0, "ng-template", 67);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.carddetial);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControl", ctx.searchChequeText);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx.searchChequeText.value == null);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.provider)("formControl", ctx.searchText);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.cardlist);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.datepickerInput)("bsConfig", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](33, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.datepickerInput);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.Invoice);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.Commission);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.Amount);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.SessionNumber);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.NetAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.BranchName);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.RegisterName);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.isMachineId);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](32);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.Invoice);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.Commission);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.Amount);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.SessionNumber);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.NetAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.BranchName);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.RegisterName);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isMachineId);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Total No. : ", ctx.totalAllRecordsCount, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("config", ctx.tableConfig)("columns", ctx.tableColumns)("data", ctx.chequeList)("loading", ctx.loading)("page", ctx.page)("total", ctx.total)("limit", ctx.limit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlDirective, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_17__.NgSelectComponent, _shared_components_table_advanced_table_advanced_component__WEBPACK_IMPORTED_MODULE_6__.TableAdvancedComponent, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_18__.BsDatepickerDirective, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_18__.BsDatepickerInputDirective, _shared_components_table_advanced_table_advanced_directives__WEBPACK_IMPORTED_MODULE_7__.TableAdvancedColumnDirective, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DatePipe],
  styles: ["[_nghost-%COMP%]     .ant-tabs-nav {\n  margin: 0 0 24px;\n}\n\n.card-wrapper[_ngcontent-%COMP%] {\n  margin-bottom: 25px;\n}\n.card-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  flex: 1;\n}\n.card-wrapper[_ngcontent-%COMP%]   .columns[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 24px;\n}\n.card-wrapper[_ngcontent-%COMP%]   .columns[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  min-width: 400px;\n}\n\n.heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 24px;\n}\n\n.card-subheading[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n@media (max-width: 768px) {\n  .card-wrapper[_ngcontent-%COMP%]   .columns[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .card-wrapper[_ngcontent-%COMP%]   .columns[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n}\n.more-filter-drop[_ngcontent-%COMP%] {\n  height: 46px;\n  width: 150px;\n  background: #4e9aff;\n  border-radius: 8px;\n  color: white;\n  outline: none;\n  border: none;\n}\n\n.label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 24px;\n  color: #929eae;\n}\n\n.label-txt[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 18px;\n  line-height: 24px;\n  letter-spacing: 0.016em;\n  color: #00261c;\n}\n\n.checkBox[_ngcontent-%COMP%] {\n  accent-color: #dc3545;\n  width: 20px;\n  height: 20px;\n}\n\n.dropdownFilters[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  border: 1px solid #dc3545;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY3JlZGl0LWNhcmRzL2NyZWRpdC1jYXJkLWxpc3QvY3JlZGl0LWNhcmQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNFLGdCQUFBO0FBRE47O0FBTUE7RUFDRSxtQkFBQTtBQUhGO0FBS0U7RUFDRSxnQkFBQTtFQUNBLE9BQUE7QUFISjtBQU1FO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBSko7QUFNSTtFQUNFLGdCQUFBO0FBSk47O0FBU0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBTkY7O0FBU0E7RUFDRSxtQkFBQTtBQU5GOztBQVVBO0VBRUk7SUFDRSxzQkFBQTtFQVJKO0VBVUk7SUFDRSxZQUFBO0VBUk47QUFDRjtBQWFBO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBWEY7O0FBYUE7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFWRjs7QUFZQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0FBVEY7O0FBV0E7RUFDRSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBUkY7O0FBVUE7RUFFRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLHlCQUFBO0FBUkYiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIDo6bmctZGVlcCB7XG4gICAgLmFudC10YWJzLW5hdiB7XG4gICAgICBtYXJnaW46IDAgMCAyNHB4O1xuICAgIH1cbiAgfVxufVxuXG4uY2FyZC13cmFwcGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMjVweDtcblxuICAuY2FyZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICBmbGV4OiAxO1xuICB9XG5cbiAgLmNvbHVtbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGdhcDogMjRweDtcblxuICAgIC5jYXJkIHtcbiAgICAgIG1pbi13aWR0aDogNDAwcHg7XG4gICAgfVxuICB9XG59XG5cbi5oZWFkaW5nIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMjRweDtcbn1cblxuLmNhcmQtc3ViaGVhZGluZyB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5jYXJkLXdyYXBwZXIge1xuICAgIC5jb2x1bW5zIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgICAgIC5jYXJkIHtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4ubW9yZS1maWx0ZXItZHJvcCB7XG4gIGhlaWdodDogNDZweDtcbiAgd2lkdGg6IDE1MHB4O1xuICBiYWNrZ3JvdW5kOiAjNGU5YWZmO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xufVxuLmxhYmVsIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgY29sb3I6ICM5MjllYWU7XG59XG4ubGFiZWwtdHh0IHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDE2ZW07XG4gIGNvbG9yOiAjMDAyNjFjO1xufVxuLmNoZWNrQm94IHtcbiAgYWNjZW50LWNvbG9yOiAjZGMzNTQ1O1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xufVxuLmRyb3Bkb3duRmlsdGVycyB7XG5cbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGMzNTQ1O1xufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 2970:
/*!*************************************************************************************!*\
  !*** ./src/app/credit-cards/credit-cards-payment/credit-cards-payment.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreditCardsPaymentComponent": () => (/* binding */ CreditCardsPaymentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _shared_services_header_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/services/header.service */ 940);
/* harmony import */ var _shared_services_sidebar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/sidebar.service */ 9106);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _credit_card_list_credit_card_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../credit-card-list/credit-card-list.component */ 7879);
/* harmony import */ var _reconciliation_history_reconciliation_history_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reconciliation-history/reconciliation-history.component */ 1840);







function CreditCardsPaymentComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function CreditCardsPaymentComponent_button_4_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const item_r4 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r5.chooseDeposit(item_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("active", item_r4.id === ctx_r0.selecteddeposit);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r4.name, " ");
  }
}
function CreditCardsPaymentComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 8)(1, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Total No. ", ctx_r1.totalAllRecordsCount, "");
  }
}
function CreditCardsPaymentComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-credit-card-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function CreditCardsPaymentComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-reconciliation-history");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class CreditCardsPaymentComponent {
  constructor(headerService, sidebarService, route) {
    this.headerService = headerService;
    this.sidebarService = sidebarService;
    this.route = route;
    this.selecteddeposit = 1;
    this.depositTypes = [];
    this.totalAllRecordsCount = 0;
    this.headerService.selecteddeposit = 1;
    const step = this.route.snapshot.queryParamMap.get('num');
    if (step) {
      this.selecteddeposit = parseInt(step);
    } else {
      this.selecteddeposit = 1;
    }
  }
  ngOnInit() {
    this.headerService.setTitle('Deposited Cheques > Cheques List ');
    const activeNavLink = this.sidebarService.findNavLink(this.sidebarService.navLinks, 'deposites');
    if (activeNavLink) {
      this.sidebarService.emitEvent({
        select: {
          navLink: activeNavLink,
          silent: true
        }
      });
    }
    this.getdepositTypes();
  }
  ngOnDestroy() {}
  chooseDeposit(deposit) {
    this.selecteddeposit = deposit.id;
  }
  getdepositTypes() {
    this.depositTypes = [{
      id: 1,
      name: 'Credit Cards Payments List'
    }, {
      id: 2,
      name: 'Reconciliation History'
    }];
  }
}
CreditCardsPaymentComponent.ɵfac = function CreditCardsPaymentComponent_Factory(t) {
  return new (t || CreditCardsPaymentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_services_header_service__WEBPACK_IMPORTED_MODULE_0__.HeaderService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_services_sidebar_service__WEBPACK_IMPORTED_MODULE_1__.SidebarService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute));
};
CreditCardsPaymentComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: CreditCardsPaymentComponent,
  selectors: [["app-credit-cards-payment"]],
  decls: 8,
  vars: 4,
  consts: [[1, "card-page"], [1, "row"], [1, "col-md-9"], [1, "btn-tabs"], ["type", "button", "class", "btn", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "col-md-3", 4, "ngIf"], ["class", "row", 4, "ngIf"], ["type", "button", 1, "btn", 3, "click"], [1, "col-md-3"], [1, "total-amount"]],
  template: function CreditCardsPaymentComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, CreditCardsPaymentComponent_button_4_Template, 2, 3, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, CreditCardsPaymentComponent_div_5_Template, 3, 1, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, CreditCardsPaymentComponent_div_6_Template, 2, 0, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, CreditCardsPaymentComponent_div_7_Template, 2, 0, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.depositTypes);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selecteddeposit == 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selecteddeposit == 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selecteddeposit == 2);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _credit_card_list_credit_card_list_component__WEBPACK_IMPORTED_MODULE_2__.CreditCardListComponent, _reconciliation_history_reconciliation_history_component__WEBPACK_IMPORTED_MODULE_3__.ReconciliationHistoryComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 2530:
/*!*************************************************************!*\
  !*** ./src/app/credit-cards/credit-cards-routing.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreditCardsRoutingModule": () => (/* binding */ CreditCardsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _credit_cards_payment_credit_cards_payment_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./credit-cards-payment/credit-cards-payment.component */ 2970);
/* harmony import */ var _create_reconciliation_create_reconciliation_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-reconciliation/create-reconciliation.component */ 8224);
/* harmony import */ var _reconciliation_details_reconciliation_details_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reconciliation-details/reconciliation-details.component */ 7380);
/* harmony import */ var _payment_detail_view_payment_detail_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment-detail-view/payment-detail-view.component */ 5081);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);







const routes = [{
  path: '',
  component: _credit_cards_payment_credit_cards_payment_component__WEBPACK_IMPORTED_MODULE_0__.CreditCardsPaymentComponent
}, {
  path: 'reconciliation',
  component: _create_reconciliation_create_reconciliation_component__WEBPACK_IMPORTED_MODULE_1__.CreateReconciliationComponent
}, {
  path: 'reconciliation-details',
  component: _reconciliation_details_reconciliation_details_component__WEBPACK_IMPORTED_MODULE_2__.ReconciliationDetailsComponent
}, {
  path: 'payment-details',
  component: _payment_detail_view_payment_detail_view_component__WEBPACK_IMPORTED_MODULE_3__.PaymentDetailViewComponent
}
// { path: 'detail/:id', component: DepositChequeDetailComponent },
// { path: 'replace', component: ReplaceChequeComponent },
// { path: 'replace-view', component: ReplacedChequeDetailViewComponent },
//   { path: 'view-branch/:id', component: AddBranchComponent },
];

class CreditCardsRoutingModule {}
CreditCardsRoutingModule.ɵfac = function CreditCardsRoutingModule_Factory(t) {
  return new (t || CreditCardsRoutingModule)();
};
CreditCardsRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: CreditCardsRoutingModule
});
CreditCardsRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CreditCardsRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 9354:
/*!*****************************************************!*\
  !*** ./src/app/credit-cards/credit-cards.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreditCardsModule": () => (/* binding */ CreditCardsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/google-maps */ 3889);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/shared.module */ 4466);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _credit_cards_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./credit-cards-routing.module */ 2530);
/* harmony import */ var _credit_card_list_credit_card_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./credit-card-list/credit-card-list.component */ 7879);
/* harmony import */ var _create_reconciliation_create_reconciliation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-reconciliation/create-reconciliation.component */ 8224);
/* harmony import */ var _reconciliation_history_reconciliation_history_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reconciliation-history/reconciliation-history.component */ 1840);
/* harmony import */ var _reconciliation_details_reconciliation_details_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reconciliation-details/reconciliation-details.component */ 7380);
/* harmony import */ var _credit_cards_payment_credit_cards_payment_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./credit-cards-payment/credit-cards-payment.component */ 2970);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-charts */ 1208);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 4534);
/* harmony import */ var _payment_detail_view_payment_detail_view_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./payment-detail-view/payment-detail-view.component */ 5081);
/* harmony import */ var _create_reconciliation_components_group_reconciliation_group_reconciliation_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./create-reconciliation/components/group-reconciliation/group-reconciliation.component */ 1631);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2560);
















class CreditCardsModule {}
CreditCardsModule.ɵfac = function CreditCardsModule_Factory(t) {
  return new (t || CreditCardsModule)();
};
CreditCardsModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
  type: CreditCardsModule
});
CreditCardsModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _credit_cards_routing_module__WEBPACK_IMPORTED_MODULE_1__.CreditCardsRoutingModule, _angular_google_maps__WEBPACK_IMPORTED_MODULE_11__.GoogleMapsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientJsonpModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ng2_charts__WEBPACK_IMPORTED_MODULE_13__.NgChartsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](CreditCardsModule, {
    declarations: [_credit_card_list_credit_card_list_component__WEBPACK_IMPORTED_MODULE_2__.CreditCardListComponent, _create_reconciliation_create_reconciliation_component__WEBPACK_IMPORTED_MODULE_3__.CreateReconciliationComponent, _reconciliation_history_reconciliation_history_component__WEBPACK_IMPORTED_MODULE_4__.ReconciliationHistoryComponent, _reconciliation_details_reconciliation_details_component__WEBPACK_IMPORTED_MODULE_5__.ReconciliationDetailsComponent, _credit_cards_payment_credit_cards_payment_component__WEBPACK_IMPORTED_MODULE_6__.CreditCardsPaymentComponent, _payment_detail_view_payment_detail_view_component__WEBPACK_IMPORTED_MODULE_7__.PaymentDetailViewComponent, _create_reconciliation_components_group_reconciliation_group_reconciliation_component__WEBPACK_IMPORTED_MODULE_8__.GroupReconciliationComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _credit_cards_routing_module__WEBPACK_IMPORTED_MODULE_1__.CreditCardsRoutingModule, _angular_google_maps__WEBPACK_IMPORTED_MODULE_11__.GoogleMapsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientJsonpModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ng2_charts__WEBPACK_IMPORTED_MODULE_13__.NgChartsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbModule]
  });
})();

/***/ }),

/***/ 5081:
/*!***********************************************************************************!*\
  !*** ./src/app/credit-cards/payment-detail-view/payment-detail-view.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymentDetailViewComponent": () => (/* binding */ PaymentDetailViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/credit-card.service */ 1265);
/* harmony import */ var src_app_shared_services_header_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/header.service */ 940);
/* harmony import */ var src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/app-config.service */ 1559);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4666);






const _c0 = function (a0, a1) {
  return {
    "background-color": a0,
    "color": a1
  };
};
class PaymentDetailViewComponent {
  constructor(route, creditcardservice, headerService, appConfigService, router) {
    this.route = route;
    this.creditcardservice = creditcardservice;
    this.headerService = headerService;
    this.appConfigService = appConfigService;
    this.router = router;
    this.currency = '';
    this.loading = false;
    this.tableConfig = {
      paging: true,
      filter: {}
    };
    const step = this.route.snapshot.queryParamMap.get('ordersCardsCollectionId');
    if (step) {
      this.tableConfig.filter.OrdersCardsCollectionId = step;
    }
  }
  ngOnInit() {
    this.currency = this.appConfigService.currency || '';
    this.headerService.setTitle('Credit Cards Payments > Payment Details View');
    this.getdetial();
  }
  getdetial() {
    this.creditcardservice.getCardsCollectionDetial(this.tableConfig.filter).subscribe(result => {
      if (result) {
        this.data = result;
        const dateString = result.collectionAt;
        const datetimesettled = result.settledAt;
        const date = new Date(dateString);
        const datesettled = new Date(datetimesettled);
        this.extractedDate = date.toLocaleDateString();
        this.extractedTime = date.toLocaleTimeString();
        this.extractedDatesettled = datesettled.toLocaleDateString();
        this.extractedTimesettled = datesettled.toLocaleTimeString();
        this.lookupname = result.statusObj.translations[0].lookupName;
        this.lookupcolor = result.statusObj.lookupBGColor;
        this.lookupTextColor = result.statusObj.lookupTextColor;
      }
    }).add(() => this.loading = false);
  }
  close() {
    this.router.navigate(['credit-card']);
  }
}
PaymentDetailViewComponent.ɵfac = function PaymentDetailViewComponent_Factory(t) {
  return new (t || PaymentDetailViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_0__.CreditCardService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_services_header_service__WEBPACK_IMPORTED_MODULE_1__.HeaderService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__.AppConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
PaymentDetailViewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: PaymentDetailViewComponent,
  selectors: [["app-payment-detail-view"]],
  decls: 171,
  vars: 51,
  consts: [[1, "cr-card"], [1, "wizard-content"], [1, "top-heading"], [1, "btn-light", "collected-btn", 3, "ngStyle"], [1, "row"], [1, "col-lg-4", "col-md-6", "filterFlex"], [1, "form-group", "input-group", "search-box", "p-3"], [1, "input-group", "search-box", "p-3"], ["alt", "", "width", "35", 1, "me-3", 3, "src"], [1, "row", "mt-2"], [1, "col-2", "filterFlex"], [1, "col-md-6"], [1, "row", "mb-4"], [1, "col-lg-3", "col-md-6", "filterFlex"], [1, "form-group", "input-group"], [1, "input-group"], [1, "row", "my-2"], [1, "my-5"], [1, "col-md-11"], [1, "col-md-1"], [1, "btns-group"], ["type", "button", 1, "btn", "btn-cancel", 3, "click"]],
  template: function PaymentDetailViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " Customer Name: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 1)(10, "div", 4)(11, "div", 5)(12, "label")(13, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Paid Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](17, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](18, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 5)(20, "label")(21, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Card Type");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](24, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 5)(27, "label")(28, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "Last 4 digits of the card");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 9)(33, "div", 5)(34, "label")(35, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "Payer name");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 5)(40, "label")(41, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, "Machine Receipt No.");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 10)(46, "label")(47, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, "Merchant ID");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 10)(52, "label")(53, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, "Bank Deposit Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](57, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "div", 9)(59, "div", 5)(60, "label")(61, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62, "Terminal Provider");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](64, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](65);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "div", 5)(67, "label")(68, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](69, "Commission Ratio");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](71);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "div", 5)(73, "label")(74, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](75, "Net Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](76, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](77);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](78, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "div", 4)(80, "div", 11)(81, "div", 0)(82, "div", 1)(83, "div", 2)(84, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](85, "Collection Details");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](86, "div", 12)(87, "div", 13)(88, "label")(89, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](90, "Branch");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](91, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](92);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](93, "div", 13)(94, "label")(95, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](96, "Register Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](97, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](98);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](99, "div", 13)(100, "label")(101, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](102, "Register No.");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](103, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](104);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](105, "div", 13)(106, "label")(107, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](108, "Session No.");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](109, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](110);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](111, "h5")(112, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](113, "Registered By");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "div", 16)(115, "div", 13)(116, "label")(117, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](118, "Employee");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](119, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](120);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](121, "div", 13)(122, "label")(123, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](124, "Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](126);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](127, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](128, "div", 13)(129, "label")(130, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](131, "Time");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](132, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](133);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](134, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](135, "div", 11)(136, "div", 0)(137, "div", 1)(138, "div", 2)(139, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](140, "Settlement Details");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](141, "h5", 17)(142, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](143, "Settled By");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](144, "div", 16)(145, "div", 13)(146, "label")(147, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](148, "Employee");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](149, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](150);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](151, "div", 13)(152, "label")(153, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](154, "Date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](155, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](156);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](157, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](158, "div", 13)(159, "label")(160, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](161, "Time");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](162, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](163);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](164, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](165, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](166, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](167, "div", 19)(168, "div", 20)(169, "button", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PaymentDetailViewComponent_Template_button_click_169_listener() {
        return ctx.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](170, "Close");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.data == null ? null : ctx.data.customer == null ? null : ctx.data.customer.customerName);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](48, _c0, ctx.lookupcolor, ctx.lookupTextColor));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.lookupname);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](17, 25, ctx.data == null ? null : ctx.data.cardCollectionJod) ? _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](18, 27, ctx.data == null ? null : ctx.data.cardCollectionJod, "1.3-3") + " " + ctx.currency : "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", (ctx.data == null ? null : ctx.data.cardType == null ? null : ctx.data.cardType.lookupImage) || "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.cardType == null ? null : ctx.data.cardType.translations[0] == null ? null : ctx.data.cardType.translations[0].lookupName) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.cardLast4Digits) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.cardPayerName) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.machineReceiptNumber) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.machineID) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](57, 30, ctx.data == null ? null : ctx.data.cardBankDepositDate, "mediumDate") || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", (ctx.data == null ? null : ctx.data.provider == null ? null : ctx.data.provider.imageFile) || "", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.provider == null ? null : ctx.data.provider.providerName) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.statusObj == null ? null : ctx.data.statusObj.lookupId) == 30001 && "-" || (ctx.data == null ? null : ctx.data.commissionRatio) && (ctx.data == null ? null : ctx.data.commissionRatio) + " %" || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.statusObj == null ? null : ctx.data.statusObj.lookupId) == 30001 && "-" || (ctx.data == null ? null : ctx.data.cardCollectionJodNet) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](78, 33, ctx.data == null ? null : ctx.data.cardCollectionJodNet, "2.3-3") + " " + ctx.currency || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.branch == null ? null : ctx.data.branch.branchName) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.register == null ? null : ctx.data.register.registersName) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.register == null ? null : ctx.data.register.registerId) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.registerSessionId) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data.collectedBy == null ? null : ctx.data.collectedBy.fullName) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](127, 36, ctx.data.collectionAt, "dd MMM yyyy"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](134, 39, ctx.data.collectionAt, "h:mm a"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (ctx.data == null ? null : ctx.data.settledBy == null ? null : ctx.data.settledBy.fullName) || "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](157, 42, ctx.data.settledAt, "dd MMM yyyy"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](164, 45, ctx.data.settledAt, "h:mm a"), " ");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 7380:
/*!*****************************************************************************************!*\
  !*** ./src/app/credit-cards/reconciliation-details/reconciliation-details.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReconciliationDetailsComponent": () => (/* binding */ ReconciliationDetailsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 1989);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 1640);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/credit-card.service */ 1265);
/* harmony import */ var _shared_services_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/helper.service */ 1785);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/app-config.service */ 1559);
/* harmony import */ var src_app_shared_services_header_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/services/header.service */ 940);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ng-select/ng-select */ 3054);
/* harmony import */ var _shared_components_table_advanced_table_advanced_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/table-advanced/table-advanced.component */ 9973);
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ 1863);
/* harmony import */ var _shared_components_table_advanced_table_advanced_directives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/components/table-advanced/table-advanced.directives */ 5746);














function ReconciliationDetailsComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 7)(1, "label", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Reconciliation Amount:");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](5, 2, ctx_r0.reconciliation[0] == null ? null : ctx_r0.reconciliation[0].totalAmount, "1.3-3"), " ", ctx_r0.currency, "");
  }
}
function ReconciliationDetailsComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 7)(1, "label", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Reconciliation Net Amount:");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](5, 2, ctx_r1.reconciliation[0] == null ? null : ctx_r1.reconciliation[0].totalNetAmount, "1.3-3"), " ", ctx_r1.currency, "");
  }
}
function ReconciliationDetailsComponent_ng_template_98_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const index_r17 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", index_r17 + 1, " ");
  }
}
function ReconciliationDetailsComponent_ng_template_99_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "date");
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](1, 1, row_r18 == null ? null : row_r18.collectionAt, "dd MMM yyyy"), " ");
  }
}
function ReconciliationDetailsComponent_ng_template_100_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", row_r19.provider == null ? null : row_r19.provider.providerName, " ");
  }
}
function ReconciliationDetailsComponent_ng_template_101_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r20 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", row_r20.branch == null ? null : row_r20.branch.branchName, " ");
  }
}
function ReconciliationDetailsComponent_ng_template_102_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", row_r21.register == null ? null : row_r21.register.registersName, " ");
  }
}
function ReconciliationDetailsComponent_ng_template_103_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "number");
  }
  if (rf & 2) {
    const row_r22 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](1, 2, row_r22 == null ? null : row_r22.cardCollectionJod, "1.3-3"), " ", ctx_r9.currency, " ");
  }
}
function ReconciliationDetailsComponent_ng_template_104_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", (row_r23 == null ? null : row_r23.commissionRatio) + " %" || 0, " ");
  }
}
function ReconciliationDetailsComponent_ng_template_105_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "number");
  }
  if (rf & 2) {
    const row_r24 = ctx.row;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](1, 1, row_r24 == null ? null : row_r24.commissionAmount, "1.3-3") + " " + ctx_r11.currency || "-", " ");
  }
}
function ReconciliationDetailsComponent_ng_template_106_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "number");
  }
  if (rf & 2) {
    const row_r25 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](1, 2, row_r25 == null ? null : row_r25.cardCollectionJodNet, "1.3-3"), " ", ctx_r12.currency, " ");
  }
}
function ReconciliationDetailsComponent_ng_template_107_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r26 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", (row_r26 == null ? null : row_r26.bank == null ? null : row_r26.bank.bankNameEnglish) + " - " + (row_r26 == null ? null : row_r26.bank == null ? null : row_r26.bank.accountName) + " - " + (row_r26 == null ? null : row_r26.bank == null ? null : row_r26.bank.accountNumber), " ");
  }
}
function ReconciliationDetailsComponent_ng_template_108_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "date");
  }
  if (rf & 2) {
    const row_r27 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](1, 1, row_r27 == null ? null : row_r27.cardBankDepositDate, "mediumDate") || "-", " ");
  }
}
function ReconciliationDetailsComponent_ng_template_109_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 45)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "img", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r28 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r28 == null ? null : row_r28.cardType == null ? null : row_r28.cardType.translations[0] == null ? null : row_r28.cardType.translations[0].lookupName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("src", row_r28.cardType == null ? null : row_r28.cardType.lookupImage, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
  }
}
const _c0 = function () {
  return {
    containerClass: "theme-red",
    isAnimated: true,
    showClearButton: true,
    rangeInputFormat: "MM-DD-YYYY"
  };
};
class ReconciliationDetailsComponent {
  constructor(route, fb, creditcardservice, _helperService, _datePipe, appConfigService, headerService) {
    this.route = route;
    this.fb = fb;
    this.creditcardservice = creditcardservice;
    this._helperService = _helperService;
    this._datePipe = _datePipe;
    this.appConfigService = appConfigService;
    this.headerService = headerService;
    this.currency = '';
    this.searchChequeText = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(null);
    this.searchText = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(null);
    this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    this.tableColumns = [];
    this.searchChequeNo = '';
    this.searchCustomerNo = '';
    this.loading = false;
    this.chequeList = [];
    this.cardlist = [];
    this.branchList = [];
    this.page = 1;
    this.total = 0;
    this.limit = 6;
    this.sort = 1;
    this.startDate = '';
    this.tableConfig = {
      paging: true,
      filter: {
        Sort: 1,
        PageSize: this.limit
      }
    };
    this.filterParams = '';
    const step = this.route.snapshot.queryParamMap.get('reconciliationHistoryid');
    if (step) {
      this.reconsilationstepid = step;
    }
    this.currency = this.appConfigService.currency || '';
  }
  ngOnInit() {
    this.headerService.setTitle('Reconciliation History > Reconciliation Details');
    this.getData();
    this.initFilterForm();
    this.initTableColumns();
    this.GetReconciliationTable(this.reconsilationstepid);
    this.getDetails();
  }
  initFilterForm() {
    this.filterForm = this.fb.group({
      providerId: [null],
      collectionDate: [''],
      depositDate: [''],
      cardTypeId: [null],
      last4digits: [''],
      machineID: [''],
      branchId: [null],
      reconciliationId: [this.reconsilationstepid]
    });
    this.filterForm.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.debounceTime)(500)).subscribe(data => {
      this.page = 1;
      let formValues = this._helperService.trim(data);
      if (formValues?.collectionDate) {
        formValues = {
          ...formValues,
          collectionDateFrom: this._datePipe.transform(formValues.collectionDate[0], 'yyyy-MM-dd'),
          collectionDateTo: this._datePipe.transform(formValues.collectionDate[1], 'yyyy-MM-dd')
        };
        delete formValues.collectionDate;
      }
      if (formValues?.depositDate) {
        formValues = {
          ...formValues,
          bankDepositDateFrom: this._datePipe.transform(formValues.depositDate[0], 'yyyy-MM-dd'),
          bankDepositDateTo: this._datePipe.transform(formValues.depositDate[1], 'yyyy-MM-dd')
        };
        delete formValues.depositDate;
      }
      this.filterParams = new URLSearchParams(formValues).toString();
      this.getDetails();
    });
  }
  resetFilterForm() {
    this.filterForm.reset({
      reconciliationId: this.reconsilationstepid
    });
  }
  getDetails() {
    let params = '';
    if (this.filterParams) params = `${this.filterParams}&pageSize=6&pageNo=${this.page - 1}&sort=${this.sort}`;else params = `reconciliationId=${this.reconsilationstepid}&pageSize=6&pageNo=${this.page - 1}&sort=${this.sort}`;
    this.creditcardservice.ReconciledTransactionsList(params).subscribe(response => {
      this.chequeList = response.data;
      this.total = response.totalRecordCount;
      this.cardsData = response.info;
    });
  }
  getData() {
    const api1$ = this.creditcardservice.GetProviders({
      pageSize: 1000,
      status: 2001
    });
    const api2$ = this.creditcardservice.GetCards();
    const branch$ = this.creditcardservice.GetBranch({});
    (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)([api1$, api2$, branch$]).subscribe(([result1, result2, branch]) => {
      this.provider = result1.data;
      this.cardlist = result2.data;
      this.branchList = branch.data;
    }, error => {}, () => {
      this.loading = false;
    });
  }
  initTableColumns() {
    this.tableColumns = [{
      key: 'No',
      label: 'No.',
      canSort: false
    }, {
      key: 'cardLast4Digits',
      label: 'Last 4 Digit',
      canSort: true
    }, {
      key: 'provider',
      label: 'Provider',
      canSort: true
    }, {
      key: 'machineID',
      label: 'Merchant ID'
    }, {
      key: 'machineReceiptNumber',
      label: 'Machine Receipt Number',
      canSort: true
    }, {
      key: 'collectionAt',
      label: 'Collection Date',
      canSort: true
    }, {
      key: 'branch',
      label: 'Branch Name',
      canSort: true
    }, {
      key: 'register',
      label: 'Register Name',
      canSort: true
    }, {
      key: 'cardType',
      label: 'Card Type',
      canSort: true
    }, {
      key: 'cardCollectionJod',
      label: 'Amount',
      canSort: true
    }, {
      key: 'commissionRatio',
      label: 'Commission Ratio'
    }, {
      key: 'commissionAmount',
      label: 'Commission Amount'
    }, {
      key: 'cardCollectionJodNet',
      label: 'Net Amount:',
      canSort: true
    }, {
      key: 'bankDepositAccount',
      label: 'Bank Deposit Account'
    }, {
      key: 'cardBankDepositDate',
      label: 'Bank Deposit Date'
    }];
  }
  onSortChange(sort) {
    if (sort?.direction && sort?.column) {
      switch (sort.column) {
        // case 'No':
        //   this.tableConfig.filter.Sort = sort.direction === 'desc' ? 3 : 2;
        //   break;
        case 'cardLast4Digits':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 3 : 2;
          break;
        case 'reconciliationDetailId':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 5 : 4;
          break;
        case 'provider':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 7 : 6;
          break;
        case 'machineReceiptNumber':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 9 : 8;
          break;
        case 'collectionAt':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 11 : 10;
          break;
        case 'branch':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 13 : 12;
          break;
        case 'register':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 15 : 14;
          break;
        case 'cardType':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 17 : 16;
          break;
        case 'cardCollectionJod':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 19 : 18;
          break;
        case 'cardCollectionJodNet':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 21 : 20;
          break;
        default:
          break;
      }
    } else {
      this.tableConfig.filter.Sort = 1;
    }
    this.GetReconciliationTable(this.reconsilationstepid);
  }
  onPageChange(page) {
    this.page = page;
    this.getDetails();
  }
  GetReconciliationTable(id) {
    this.tableConfig.filter.PageNo = this.page - 1;
    this.tableConfig.filter.ReconciliationId = parseInt(id);
    const api1$ = this.creditcardservice.GetReconciliationHistory(this.tableConfig.filter);
    (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.forkJoin)([api1$]).subscribe(([result1]) => {
      if (result1) {
        this.reconciliation = result1.data;
        this.extractedTime = this.reconciliation[0]?.createdAt;
      }
    });
  }
}
ReconciliationDetailsComponent.ɵfac = function ReconciliationDetailsComponent_Factory(t) {
  return new (t || ReconciliationDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_0__.CreditCardService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_helper_service__WEBPACK_IMPORTED_MODULE_1__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__.AppConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_shared_services_header_service__WEBPACK_IMPORTED_MODULE_3__.HeaderService));
};
ReconciliationDetailsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: ReconciliationDetailsComponent,
  selectors: [["app-reconciliation-details"]],
  decls: 110,
  vars: 43,
  consts: [[1, "row", "mt-2"], [1, "col-lg-12", "text-heading"], [1, "mb-3"], [1, "col-12", "mb-4"], [1, "row"], [1, "col-3"], [1, "rh-card"], [1, "col-md-3"], [1, "mb-1", "label"], [1, "P-light"], ["class", "col-md-3", 4, "ngIf"], [3, "formGroup"], [1, "col-3", "mb-3"], [1, "input-group"], [1, "input-group-text"], [1, "fa-solid", "fa-search"], ["type", "text", "placeholder", "Last 4 Digits", "formControlName", "last4digits", 1, "form-control", "height-45"], ["formControlName", "providerId", "placeholder", "Provider", "bindLabel", "providerName", "bindValue", "providerId", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items"], ["type", "text", "placeholder", "Collection Date", "formControlName", "collectionDate", "bsDaterangepicker", "", 1, "form-control", "custom-input-field", 3, "bsConfig"], ["toDate", "bsDaterangepicker"], [1, "input-group-text", "cursor-pointer", 3, "click"], ["src", "/assets/images/calendar.png", "alt", "", 1, "calender"], ["formControlName", "branchId", "placeholder", "Search By Branch", "bindLabel", "branchName", "bindValue", "branchId", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items"], ["type", "text", "placeholder", "Deposit Date", "formControlName", "depositDate", "bsDaterangepicker", "", 1, "form-control", "custom-input-field", 3, "bsConfig"], ["depositDate", "bsDaterangepicker"], ["formControlName", "cardTypeId", "placeholder", "Search By Card", "bindLabel", "name.lookupName", "bindValue", "id", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items"], ["type", "text", "placeholder", "Merchant ID", "formControlName", "machineID", 1, "form-control", "height-45"], [1, "col-12", "mb-3", "d-flex", "justify-content-end"], [1, "btn", "btn-add", 3, "click"], [1, "col-lg-12", "text-heading", "mt-2"], [1, "text-end"], [1, "col-lg-12", "mt-4"], [3, "config", "columns", "data", "loading", "page", "total", "limit", "sortUpdated", "pageUpdated"], ["libTableAdvancedColumn", "No"], ["libTableAdvancedColumn", "collectionAt"], ["libTableAdvancedColumn", "provider"], ["libTableAdvancedColumn", "branch"], ["libTableAdvancedColumn", "register"], ["libTableAdvancedColumn", "cardCollectionJod"], ["libTableAdvancedColumn", "commissionRatio"], ["libTableAdvancedColumn", "commissionAmount"], ["libTableAdvancedColumn", "cardCollectionJodNet"], ["libTableAdvancedColumn", "bankDepositAccount"], ["libTableAdvancedColumn", "cardBankDepositDate"], ["libTableAdvancedColumn", "cardType"], [1, "d-flex", "flex-column"], ["alt", "", "srcset", "", "width", "55", 3, "src"]],
  template: function ReconciliationDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h5", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Reconciliation Details");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "h6");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Reconciliation Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "h6")(11, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](13, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "div", 5)(16, "div", 6)(17, "h6");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "Commission Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "h6")(20, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](22, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "div", 5)(25, "div", 6)(26, "h6");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](27, "Net Amount");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "h6")(29, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](31, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](32);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "div", 7)(34, "label", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, "Created by:");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](38, "div", 7)(39, "label", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](40, "Date:");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](42);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](43, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](44, "div", 7)(45, "label", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](46, "Time:");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](47, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](48);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](49, "date");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](50, ReconciliationDetailsComponent_div_50_Template, 6, 5, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](51, ReconciliationDetailsComponent_div_51_Template, 6, 5, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](52, "div", 7)(53, "label", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](54, "Reconciliation Number:");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](55, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](56);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](57, "form", 11)(58, "div", 4)(59, "div", 12)(60, "div", 13)(61, "span", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](62, "i", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](63, "input", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](64, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](65, "ng-select", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](66, "div", 12)(67, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](68, "input", 18, 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](70, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ReconciliationDetailsComponent_Template_span_click_70_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](69);
        return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](_r2.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](71, "img", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](72, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](73, "ng-select", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](74, "div", 12)(75, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](76, "input", 23, 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](78, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ReconciliationDetailsComponent_Template_span_click_78_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](77);
        return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](_r3.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](79, "img", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](80, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](81, "ng-select", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](82, "div", 12)(83, "div", 13)(84, "span", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](85, "i", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](86, "input", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](87, "div", 27)(88, "button", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ReconciliationDetailsComponent_Template_button_click_88_listener() {
        return ctx.resetFilterForm();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](89, "Clear Filters");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](90, "div", 0)(91, "div", 29)(92, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](93, "Reconciled Transactions List");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](94, "h6", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](95);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](96, "div", 31)(97, "app-table-advanced", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("sortUpdated", function ReconciliationDetailsComponent_Template_app_table_advanced_sortUpdated_97_listener($event) {
        return ctx.onSortChange($event);
      })("pageUpdated", function ReconciliationDetailsComponent_Template_app_table_advanced_pageUpdated_97_listener($event) {
        return ctx.onPageChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](98, ReconciliationDetailsComponent_ng_template_98_Template, 1, 1, "ng-template", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](99, ReconciliationDetailsComponent_ng_template_99_Template, 2, 4, "ng-template", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](100, ReconciliationDetailsComponent_ng_template_100_Template, 1, 1, "ng-template", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](101, ReconciliationDetailsComponent_ng_template_101_Template, 1, 1, "ng-template", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](102, ReconciliationDetailsComponent_ng_template_102_Template, 1, 1, "ng-template", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](103, ReconciliationDetailsComponent_ng_template_103_Template, 2, 5, "ng-template", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](104, ReconciliationDetailsComponent_ng_template_104_Template, 1, 1, "ng-template", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](105, ReconciliationDetailsComponent_ng_template_105_Template, 2, 4, "ng-template", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](106, ReconciliationDetailsComponent_ng_template_106_Template, 2, 5, "ng-template", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](107, ReconciliationDetailsComponent_ng_template_107_Template, 1, 1, "ng-template", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](108, ReconciliationDetailsComponent_ng_template_108_Template, 2, 4, "ng-template", 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](109, ReconciliationDetailsComponent_ng_template_109_Template, 4, 2, "ng-template", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](13, 26, ctx.cardsData == null ? null : ctx.cardsData.totalReconciliationAmount, "2.3-3"));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx.currency, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](22, 29, ctx.cardsData == null ? null : ctx.cardsData.totalCommissionAmount, "2.3-3"));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx.currency, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](31, 32, ctx.cardsData == null ? null : ctx.cardsData.totalNetAmount, "2.3-3"));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx.currency, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.reconciliation && (ctx.reconciliation[0] == null ? null : ctx.reconciliation[0].createdBy.fullName) ? ctx.reconciliation[0] == null ? null : ctx.reconciliation[0].createdBy.fullName : "-");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.reconciliation && (ctx.reconciliation[0] == null ? null : ctx.reconciliation[0].createdAt) ? _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](43, 35, ctx.reconciliation[0] == null ? null : ctx.reconciliation[0].createdAt, "dd MMM yyyy") : "-");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](49, 38, ctx.extractedTime, "shortTime"));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.reconciliation);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.reconciliation);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.reconciliation && (ctx.reconciliation[0] == null ? null : ctx.reconciliation[0].reconciliationHistoryId) ? ctx.reconciliation[0] == null ? null : ctx.reconciliation[0].reconciliationHistoryId : "-");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.filterForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("items", ctx.provider);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("bsConfig", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](41, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("items", ctx.branchList);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("bsConfig", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](42, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("items", ctx.cardlist);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Total No. : ", ctx.total, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("config", ctx.tableConfig)("columns", ctx.tableColumns)("data", ctx.chequeList)("loading", ctx.loading)("page", ctx.page)("total", ctx.total)("limit", ctx.limit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_13__.NgSelectComponent, _shared_components_table_advanced_table_advanced_component__WEBPACK_IMPORTED_MODULE_4__.TableAdvancedComponent, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_14__.BsDaterangepickerDirective, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_14__.BsDaterangepickerInputDirective, _shared_components_table_advanced_table_advanced_directives__WEBPACK_IMPORTED_MODULE_5__.TableAdvancedColumnDirective, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe],
  styles: [".label[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n}\n\n.P-light[_ngcontent-%COMP%] {\n  color: #9B9B9B;\n  font-size: 15px;\n}\n\n.rh-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-radius: 5px;\n  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.08);\n  background: white;\n}\n.rh-card[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY3JlZGl0LWNhcmRzL3JlY29uY2lsaWF0aW9uLWRldGFpbHMvcmVjb25jaWxpYXRpb24tZGV0YWlscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUVBO0VBQ0ksY0FBQTtFQUNBLGVBQUE7QUFDSjs7QUFDQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLCtDQUFBO0VBQ0EsaUJBQUE7QUFFRjtBQUFFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBRUoiLCJzb3VyY2VzQ29udGVudCI6WyIubGFiZWwge1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4uUC1saWdodCB7XG4gICAgY29sb3I6ICM5QjlCOUI7XG4gICAgZm9udC1zaXplOiAxNXB4O1xufVxuLnJoLWNhcmQge1xuICBwYWRkaW5nOiAyMHB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggOHB4IDFweCByZ2IoMCAwIDAgLyA4JSk7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuXG4gIGg2IHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 1840:
/*!*****************************************************************************************!*\
  !*** ./src/app/credit-cards/reconciliation-history/reconciliation-history.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReconciliationHistoryComponent": () => (/* binding */ ReconciliationHistoryComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 1989);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 8977);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 1640);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/credit-card.service */ 1265);
/* harmony import */ var src_app_shared_services_header_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/header.service */ 940);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/app-config.service */ 1559);
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-select/ng-select */ 3054);
/* harmony import */ var _shared_components_table_advanced_table_advanced_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/table-advanced/table-advanced.component */ 9973);
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ 1863);
/* harmony import */ var _shared_components_table_advanced_table_advanced_directives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/table-advanced/table-advanced.directives */ 5746);

// import { Category, Users, depositChequeList } from '../data';













function ReconciliationHistoryComponent_i_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ReconciliationHistoryComponent_i_12_Template_i_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r9.removeCollectionDateFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function ReconciliationHistoryComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "div", 6)(2, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("input", function ReconciliationHistoryComponent_div_29_Template_input_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r11.validateInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ReconciliationHistoryComponent_div_29_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r13.removeAmountFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "i", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx_r2.amountchange);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("hidden", ctx_r2.amountchange.value == null);
  }
}
function ReconciliationHistoryComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7)(1, "div", 6)(2, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "i", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("input", function ReconciliationHistoryComponent_div_30_Template_input_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r14.validateInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ReconciliationHistoryComponent_div_30_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r16.removeNetAmountFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "i", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx_r3.netamountchange);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("hidden", ctx_r3.netamountchange.value == null);
  }
}
function ReconciliationHistoryComponent_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const index_r18 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", index_r18 + 1, " ");
  }
}
function ReconciliationHistoryComponent_ng_template_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "date");
  }
  if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 1, row_r19 == null ? null : row_r19.createdAt), " ");
  }
}
function ReconciliationHistoryComponent_ng_template_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "number");
  }
  if (rf & 2) {
    const row_r20 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](1, 2, row_r20 == null ? null : row_r20.totalAmount, "1.3-3"), " ", ctx_r6.currency, " ");
  }
}
function ReconciliationHistoryComponent_ng_template_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "number");
  }
  if (rf & 2) {
    const row_r21 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](1, 2, row_r21 == null ? null : row_r21.totalNetAmount, "1.3-3"), " ", ctx_r7.currency, " ");
  }
}
function ReconciliationHistoryComponent_ng_template_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "i", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ReconciliationHistoryComponent_ng_template_43_Template_i_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r24);
      const row_r22 = restoredCtx.row;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r23.sendid(row_r22.reconciliationHistoryId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
const _c0 = function () {
  return {
    containerClass: "theme-red",
    isAnimated: true,
    showClearButton: true
  };
};
class ReconciliationHistoryComponent {
  constructor(creditcardservice, headerService, router, appConfigService) {
    this.creditcardservice = creditcardservice;
    this.headerService = headerService;
    this.router = router;
    this.appConfigService = appConfigService;
    this.currency = '';
    this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    this.amountchange = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(null);
    this.netamountchange = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(null);
    this.searchText = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(null);
    this.tableColumns = [];
    this.searchChequeNo = '';
    this.searchCustomerNo = '';
    this.loading = false;
    this.chequeList = [];
    this.totalAllRecordsCount = 0;
    this.page = 1;
    this.total = 0;
    this.limit = 6;
    this.sort = 1;
    this.startDate = '';
    this.tableConfig = {
      paging: true,
      filter: {
        Sort: 1,
        PageSize: this.limit
      }
    };
    /**
    * filter selection
    */
    this.commission = false;
    this.amount = false;
    this.netAmount = false;
    this.provider = [];
    this.cardlist = [];
  }
  ngOnInit() {
    this.currency = this.appConfigService.currency || '';
    this.headerService.setTitle('Reconciliation History');
    this.getData();
    this.initTableColumns();
    this.GetReconciliationTable();
    this.amountchange.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this.unsubscribe)).subscribe(value => {
      const text = value || '';
      if (text?.length >= 0 || !text?.length && this.tableConfig.filter.Amount?.length) {
        this.tableConfig.filter.Amount = text;
        this.page = 1;
        this.GetReconciliationTable();
      }
    });
    this.netamountchange.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this.unsubscribe)).subscribe(value => {
      const text = value || '';
      if (text?.length >= 0 || !text?.length && this.tableConfig.filter.NetAmount?.length) {
        this.tableConfig.filter.NetAmount = text;
        this.page = 1;
        this.GetReconciliationTable();
      }
    });
  }
  ngOnDestroy() {}
  initTableColumns() {
    this.tableColumns = [{
      key: 'No',
      label: 'No.',
      canSort: false
    }, {
      key: 'reconciliationHistoryId',
      label: 'Reconciliation ID',
      canSort: true
    }, {
      key: 'createdBy.fullName',
      label: 'Created by',
      canSort: true
    }, {
      key: 'createdAt',
      label: 'Date',
      canSort: true
    }, {
      key: 'totalAmount',
      label: 'Amount',
      canSort: true
    },
    // {
    //   key: 'Commission',
    //   label: 'Commission',
    // },
    {
      key: 'totalNetAmount',
      label: 'Net',
      canSort: true
    }, {
      key: 'Action',
      label: 'Action',
      canSort: false
    }];
  }
  onSortChange(sort) {
    if (sort?.direction && sort?.column) {
      switch (sort.column) {
        // case 'No':
        //   this.tableConfig.filter.Sort = sort.direction === 'desc' ? 3 : 2;
        //   break;
        case 'reconciliationHistoryId':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 3 : 2;
          break;
        case 'createdBy.fullName':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 5 : 4;
          break;
        case 'createdAt':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 7 : 6;
          break;
        case 'totalAmount':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 9 : 8;
          break;
        case 'totalNetAmount':
          this.tableConfig.filter.Sort = sort.direction === 'desc' ? 11 : 10;
          break;
        // case 'Action':
        //   this.tableConfig.filter.Sort = sort.direction === 'desc' ? 15 : 13;
        //   break;
        default:
          break;
      }
    } else {
      this.tableConfig.filter.Sort = 1;
    }
    this.GetReconciliationTable();
  }
  onPageChange(page) {
    this.page = page;
    this.GetReconciliationTable();
  }
  removeSearchChequeNo() {
    this.searchChequeNo = '';
    this.sort = 1;
  }
  onDateValueChange(event) {
    var pipe = new _angular_common__WEBPACK_IMPORTED_MODULE_11__.DatePipe('en-US');
    this.startDate = pipe.transform(event) || '';
    console.log(this.startDate);
    if (this.startDate) {
      const fromDate = new Date(this.startDate);
      fromDate.setDate(fromDate.getDate() + 1); // Adding one day
      const formattedFromDate = fromDate.toISOString();
      this.tableConfig.filter.ReconciliationDate = formattedFromDate;
    } else this.tableConfig.filter.ReconciliationDate = this.startDate;
    this.page = 1;
    this.GetReconciliationTable();
  }
  removeCollectionDateFilter() {
    this.startDate = '';
    if (this.datepickerInput) this.datepickerInput = '';
    this.page = 1;
    this.GetReconciliationTable();
  }
  // To Remove More Filters > Amount clear
  removeAmountFilter() {
    this.amountchange.setValue(null);
    this.tableConfig.filter.Amount = '';
    this.page = 1;
    this.GetReconciliationTable();
  }
  // To Remove Checkbox from More Filters > Amount
  filterAmount(event) {
    this.amount = event.checked;
    if (!this.amount) {
      this.amount = false;
      this.amountchange.setValue(null);
      this.tableConfig.filter.Amount = '';
      this.page = 1;
      this.GetReconciliationTable();
    }
  }
  // To Remove More Filters > Net Amount clear
  removeNetAmountFilter() {
    this.netamountchange.setValue(null);
    this.tableConfig.filter.NetAmount = '';
    this.page = 1;
    this.GetReconciliationTable();
  }
  // To Remove Checkbox from More Filters > Net Amount
  filterNetAmount(event) {
    this.netAmount = event.checked;
    if (!this.netAmount) {
      this.netAmount = false;
      this.netamountchange.setValue(null);
      this.tableConfig.filter.NetAmount = '';
      this.page = 1;
      this.GetReconciliationTable();
    }
  }
  getData() {
    const api1$ = this.creditcardservice.GetProviders({
      pageSize: 1000,
      status: 2001
    });
    const api2$ = this.creditcardservice.GetCards();
    (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.forkJoin)([api1$, api2$]).subscribe(([result1, result2]) => {
      if (result1) {
        console.log(result1.data);
        this.provider = result1.data || [];
      }
      console.log("result2", result2);
      if (result2) {
        this.cardlist = result2.data || [];
      }
    }, error => {
      console.error(error);
    }, () => {
      this.loading = false;
    });
  }
  GetReconciliationTable() {
    this.tableConfig.filter.PageNo = this.page - 1;
    const api1$ = this.creditcardservice.GetReconciliationHistory(this.tableConfig.filter);
    (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.forkJoin)([api1$]).subscribe(([result1]) => {
      console.log(result1);
      if (result1) {
        this.chequeList = result1.data || [];
        this.totalAllRecordsCount = result1.totalRecordCount;
        this.total = result1.totalRecordCount;
      }
    });
  }
  handleCategoryChange(event) {
    this.tableConfig.filter.ProviderId = event.providerId;
    this.page = 1;
    this.GetReconciliationTable();
  }
  onClear() {
    delete this.tableConfig.filter.ProviderId;
    this.page = 1;
    this.GetReconciliationTable();
  }
  onCTClear() {
    delete this.tableConfig.filter.CardTypeId;
    this.page = 1;
    this.GetReconciliationTable();
  }
  handleCardType(event) {
    this.tableConfig.filter.CardTypeId = event.id;
    this.page = 1;
    this.GetReconciliationTable();
  }
  sendid(reconciliationHistoryId) {
    this.router.navigate(['credit-card/reconciliation-details'], {
      queryParams: {
        reconciliationHistoryid: reconciliationHistoryId
      }
    });
  }
  validateInput(event) {
    const enteredValue = event.target.value;
    const pattern = /^[0-9]*\.?[0-9]*$/; // Regex pattern to allow numbers and decimal point
    if (!pattern.test(enteredValue)) {
      event.target.value = enteredValue.replace(/[^0-9.]/g, ''); // Remove any invalid characters
    }
  }
}

ReconciliationHistoryComponent.ɵfac = function ReconciliationHistoryComponent_Factory(t) {
  return new (t || ReconciliationHistoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_shared_services_credit_card_service__WEBPACK_IMPORTED_MODULE_0__.CreditCardService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_shared_services_header_service__WEBPACK_IMPORTED_MODULE_1__.HeaderService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_shared_services_app_config_service__WEBPACK_IMPORTED_MODULE_2__.AppConfigService));
};
ReconciliationHistoryComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: ReconciliationHistoryComponent,
  selectors: [["app-reconciliation-history"]],
  decls: 44,
  vars: 19,
  consts: [[1, "row", "mt-2"], [1, "col-md-10"], [1, "row"], [1, "col-lg-3", "col-md-6"], ["placeholder", "Provider", "bindLabel", "providerName", "bindValue", "providerId", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "formControl", "items", "clear", "change"], [1, "col-lg-3", "col-md-6", "filterFlex"], [1, "input-group", "search-box"], [1, "dropdown"], ["type", "button", 1, "btn", "dropdownFilters"], ["type", "text", "placeholder", "Select Date", "bsDatepicker", "", 1, "form-control", 3, "ngModel", "bsConfig", "ngModelChange", "bsValueChange"], ["dp", "bsDatepicker"], ["src", "../../../../assets/images/calendar.png", "alt", "", 1, "calender", 3, "click"], ["class", "fa-regular fa-circle-xmark", 3, "click", 4, "ngIf"], ["placeholder", "Search By Card", "bindLabel", "name.lookupName", "bindValue", "id", 1, "flex-grow-1", "mt-3", "mt-md-0", 3, "items", "clear", "change"], ["type", "button", "id", "dropdownMenuButton", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "dropdownButton", "more-filter-drop"], [1, "fa-regular", "fa-plus"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu", "menu"], [1, "dropdown-item"], ["type", "checkbox", 1, "checkBox", 3, "ngModel", "ngModelChange", "change"], [1, "filterFlex", "mt-3"], ["class", "dropdown", 4, "ngIf"], [1, "col-lg-12", "text-heading"], [1, "text-end"], [1, "col-md-12"], [3, "config", "columns", "data", "loading", "page", "total", "limit", "sortUpdated", "pageUpdated"], ["libTableAdvancedColumn", "No"], ["libTableAdvancedColumn", "createdAt"], ["libTableAdvancedColumn", "totalAmount"], ["libTableAdvancedColumn", "totalNetAmount"], ["libTableAdvancedColumn", "Action"], [1, "fa-regular", "fa-circle-xmark", 3, "click"], ["type", "button", "id", "button-addon1", 1, "btn"], [1, "fa-solid", "fa-search"], ["type", "text", "placeholder", "Amount", 1, "form-control", 3, "formControl", "input"], ["type", "button", "id", "button-addon1", 1, "btn", 3, "hidden", "click"], [1, "fa-solid", "fa-xmark"], ["type", "text", "placeholder", "Net Amount", 1, "form-control", 3, "formControl", "input"], [1, "fa-solid", "fa-eye", 2, "cursor", "pointer", 3, "click"]],
  template: function ReconciliationHistoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "ng-select", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("clear", function ReconciliationHistoryComponent_Template_ng_select_clear_4_listener() {
        return ctx.onClear();
      })("change", function ReconciliationHistoryComponent_Template_ng_select_change_4_listener($event) {
        return ctx.handleCategoryChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "button", 8)(9, "input", 9, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function ReconciliationHistoryComponent_Template_input_ngModelChange_9_listener($event) {
        return ctx.datepickerInput = $event;
      })("bsValueChange", function ReconciliationHistoryComponent_Template_input_bsValueChange_9_listener($event) {
        return ctx.onDateValueChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "img", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ReconciliationHistoryComponent_Template_img_click_11_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](10);
        return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](_r0.toggle());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, ReconciliationHistoryComponent_i_12_Template, 1, 0, "i", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 3)(14, "ng-select", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("clear", function ReconciliationHistoryComponent_Template_ng_select_clear_14_listener() {
        return ctx.onCTClear();
      })("change", function ReconciliationHistoryComponent_Template_ng_select_change_14_listener($event) {
        return ctx.handleCardType($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 5)(16, "div", 7)(17, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](18, "i", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, " More Filters ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "ul", 16)(21, "li")(22, "a", 17)(23, "input", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function ReconciliationHistoryComponent_Template_input_ngModelChange_23_listener($event) {
        return ctx.amount = $event;
      })("change", function ReconciliationHistoryComponent_Template_input_change_23_listener($event) {
        return ctx.filterAmount($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24, " \u00A0Amount ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "a", 17)(26, "input", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function ReconciliationHistoryComponent_Template_input_ngModelChange_26_listener($event) {
        return ctx.netAmount = $event;
      })("change", function ReconciliationHistoryComponent_Template_input_change_26_listener($event) {
        return ctx.filterNetAmount($event.target);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, " \u00A0Net Amount ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, ReconciliationHistoryComponent_div_29_Template, 7, 2, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](30, ReconciliationHistoryComponent_div_30_Template, 7, 2, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "div", 0)(32, "div", 21)(33, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](34, "Cards reconciliations List");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "h6", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "div", 23)(38, "app-table-advanced", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("sortUpdated", function ReconciliationHistoryComponent_Template_app_table_advanced_sortUpdated_38_listener($event) {
        return ctx.onSortChange($event);
      })("pageUpdated", function ReconciliationHistoryComponent_Template_app_table_advanced_pageUpdated_38_listener($event) {
        return ctx.onPageChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](39, ReconciliationHistoryComponent_ng_template_39_Template, 1, 1, "ng-template", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](40, ReconciliationHistoryComponent_ng_template_40_Template, 2, 3, "ng-template", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](41, ReconciliationHistoryComponent_ng_template_41_Template, 2, 5, "ng-template", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](42, ReconciliationHistoryComponent_ng_template_42_Template, 2, 5, "ng-template", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](43, ReconciliationHistoryComponent_ng_template_43_Template, 1, 0, "ng-template", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.searchText)("items", ctx.provider);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.datepickerInput)("bsConfig", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](18, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.datepickerInput);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("items", ctx.cardlist);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.amount);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.netAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.amount);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.netAmount);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Total No. : ", ctx.totalAllRecordsCount, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("config", ctx.tableConfig)("columns", ctx.tableColumns)("data", ctx.chequeList)("loading", ctx.loading)("page", ctx.page)("total", ctx.total)("limit", ctx.limit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlDirective, _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_14__.NgSelectComponent, _shared_components_table_advanced_table_advanced_component__WEBPACK_IMPORTED_MODULE_3__.TableAdvancedComponent, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_15__.BsDatepickerDirective, ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_15__.BsDatepickerInputDirective, _shared_components_table_advanced_table_advanced_directives__WEBPACK_IMPORTED_MODULE_4__.TableAdvancedColumnDirective, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DatePipe],
  styles: [".applyMargin[_ngcontent-%COMP%] {\n  margin-top: 2.5rem;\n}\n\n.total[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 15px 0 0px;\n  padding: 10px 0px;\n}\n.total[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 16px;\n  line-height: 19px;\n  color: #929eae;\n  margin: 0px;\n  padding: 10px 0px;\n}\n\n.card-table[_ngcontent-%COMP%] {\n  border: 0.5px solid #f4f4f4;\n  box-shadow: 3px 7px 12px 0px rgba(0, 0, 0, 0.18);\n  -webkit-box-shadow: 3px 7px 12px 0px rgba(0, 0, 0, 0.18);\n  -moz-box-shadow: 3px 7px 12px 0px rgba(0, 0, 0, 0.18);\n}\n\n.btn-provide[_ngcontent-%COMP%] {\n  background-color: #dc3545;\n  color: white;\n  outline: none;\n  border: none;\n  padding: 8px 14px 8px 14px;\n  border-radius: 4px;\n  font-size: 12px;\n  width: 80px;\n}\n\n.btn-disabled[_ngcontent-%COMP%] {\n  background-color: #c5c6c7;\n  color: white;\n  outline: none;\n  border: none;\n  padding: 8px 14px 8px 14px;\n  border-radius: 4px;\n  font-size: 12px;\n  width: 80px;\n}\n\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: end;\n  align-items: center;\n  gap: 8px;\n}\n\n.play-left[_ngcontent-%COMP%] {\n  color: #eceaea;\n  transform: rotate(180deg);\n  margin-right: 5px;\n}\n\n.play-right[_ngcontent-%COMP%] {\n  color: #eceaea;\n}\n\n.dropdownBox[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 150px;\n  height: 48px;\n  background: #4e9aff;\n  border-radius: 8px;\n}\n\n.headButton[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 95px;\n  height: 34.2px;\n  border-radius: 8px;\n}\n\n.headButtonText[_ngcontent-%COMP%] {\n  font-family: Kumbh Sans;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 17px;\n  letter-spacing: 0em;\n  text-align: left;\n}\n\n.menu[_ngcontent-%COMP%] {\n  width: 180px;\n  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));\n}\n\n.menu2[_ngcontent-%COMP%] {\n  width: 235px;\n  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));\n}\n\n.more-filter-drop[_ngcontent-%COMP%] {\n  height: 46px;\n  width: 150px;\n  background: #4e9aff;\n  border-radius: 8px;\n  color: white;\n  outline: none;\n  border: none;\n}\n\n.dropdown-item[_ngcontent-%COMP%] {\n  padding: 12px 12px;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n\n.checkBox[_ngcontent-%COMP%] {\n  accent-color: #dc3545;\n  width: 20px;\n  height: 20px;\n}\n\n.dropdownFilters[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  border: 1px solid #dc3545;\n}\n\n.filterFlex[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.btn-edit[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 20px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY3JlZGl0LWNhcmRzL3JlY29uY2lsaWF0aW9uLWhpc3RvcnkvcmVjb25jaWxpYXRpb24taGlzdG9yeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0FBQ0o7O0FBRUk7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBQ047QUFDSTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtBQUNOOztBQUVFO0VBQ0UsMkJBQUE7RUFDQSxnREFBQTtFQUNBLHdEQUFBO0VBQ0EscURBQUE7QUFDSjs7QUFDRTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsMEJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FBRUo7O0FBQUU7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQUdKOztBQURFO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBSUo7O0FBRkU7RUFDRSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtBQUtKOztBQUhFO0VBQ0UsY0FBQTtBQU1KOztBQUhFO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUVBLG1CQUFBO0VBQ0Esa0JBQUE7QUFLSjs7QUFGRTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFFQSxrQkFBQTtBQUlKOztBQUZFO0VBQ0UsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFLSjs7QUFIRTtFQUNFLFlBQUE7RUFDQSxxREFBQTtBQU1KOztBQUhFO0VBQ0UsWUFBQTtFQUVBLHFEQUFBO0FBS0o7O0FBRkU7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFLSjs7QUFGRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7QUFLSjs7QUFIRTtFQUNFLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFNSjs7QUFIRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EseUJBQUE7QUFNSjs7QUFIRTtFQUNFLGFBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7QUFNSjs7QUFGSTtFQUNFLFdBQUE7QUFLTiIsInNvdXJjZXNDb250ZW50IjpbIi5hcHBseU1hcmdpbiB7XG4gICAgbWFyZ2luLXRvcDogMi41cmVtO1xuICB9XG4gIC50b3RhbCB7XG4gICAgaDQge1xuICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIG1hcmdpbjogMTVweCAwIDBweDtcbiAgICAgIHBhZGRpbmc6IDEwcHggMHB4O1xuICAgIH1cbiAgICBwIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBsaW5lLWhlaWdodDogMTlweDtcbiAgICAgIGNvbG9yOiAjOTI5ZWFlO1xuICAgICAgbWFyZ2luOiAwcHg7XG4gICAgICBwYWRkaW5nOiAxMHB4IDBweDtcbiAgICB9XG4gIH1cbiAgLmNhcmQtdGFibGUge1xuICAgIGJvcmRlcjogMC41cHggc29saWQgI2Y0ZjRmNDtcbiAgICBib3gtc2hhZG93OiAzcHggN3B4IDEycHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xOCk7XG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAzcHggN3B4IDEycHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xOCk7XG4gICAgLW1vei1ib3gtc2hhZG93OiAzcHggN3B4IDEycHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xOCk7XG4gIH1cbiAgLmJ0bi1wcm92aWRlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGMzNTQ1O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBwYWRkaW5nOiA4cHggMTRweCA4cHggMTRweDtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIHdpZHRoOiA4MHB4O1xuICB9XG4gIC5idG4tZGlzYWJsZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNjNWM2Yzc7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHBhZGRpbmc6IDhweCAxNHB4IDhweCAxNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgd2lkdGg6IDgwcHg7XG4gIH1cbiAgLnBhZ2luYXRpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgfVxuICAucGxheS1sZWZ0IHtcbiAgICBjb2xvcjogI2VjZWFlYTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICB9XG4gIC5wbGF5LXJpZ2h0IHtcbiAgICBjb2xvcjogI2VjZWFlYTtcbiAgfVxuICBcbiAgLmRyb3Bkb3duQm94IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGhlaWdodDogNDhweDtcbiAgXG4gICAgYmFja2dyb3VuZDogIzRlOWFmZjtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIH1cbiAgXG4gIC5oZWFkQnV0dG9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDk1cHg7XG4gICAgaGVpZ2h0OiAzNC4ycHg7XG4gIFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgfVxuICAuaGVhZEJ1dHRvblRleHQge1xuICAgIGZvbnQtZmFtaWx5OiBLdW1iaCBTYW5zO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGxpbmUtaGVpZ2h0OiAxN3B4O1xuICAgIGxldHRlci1zcGFjaW5nOiAwZW07XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxuICAubWVudSB7XG4gICAgd2lkdGg6IDE4MHB4O1xuICAgIGZpbHRlcjogZHJvcC1zaGFkb3coMHB4IDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMSkpO1xuICB9XG4gIFxuICAubWVudTIge1xuICAgIHdpZHRoOiAyMzVweDtcbiAgXG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwcHggMTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xKSk7XG4gIH1cbiAgXG4gIC5tb3JlLWZpbHRlci1kcm9wIHtcbiAgICBoZWlnaHQ6IDQ2cHg7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGJhY2tncm91bmQ6ICM0ZTlhZmY7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgfVxuICBcbiAgLmRyb3Bkb3duLWl0ZW0ge1xuICAgIHBhZGRpbmc6IDEycHggMTJweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG4gIC5jaGVja0JveCB7XG4gICAgYWNjZW50LWNvbG9yOiAjZGMzNTQ1O1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgfVxuICBcbiAgLmRyb3Bkb3duRmlsdGVycyB7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RjMzU0NTtcbiAgfVxuICBcbiAgLmZpbHRlckZsZXgge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICB9XG4gXG4gIC5idG4tZWRpdCB7XG4gICAgaW1nIHtcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgIH1cbiAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_credit-cards_credit-cards_module_ts.js.map