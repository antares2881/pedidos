"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-InformacionFinalFacturas-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionFinalFacturas.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionFinalFacturas.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      erroresValidacion: '',
      saving: false,
      factura: {
        cliente: {
          razon_social: null,
          nit: null
        }
      },
      formaspago: [{
        text: 'Contado',
        value: 1
      }, {
        text: 'Credito',
        value: 2
      }],
      informacionAdicional: {
        tipo_factura: 1,
        forma_pago: 2,
        medio_pago: 1,
        factura_electronica: 0
      },
      mediospago: [{
        text: 'Efectivo',
        value: 1
      }, {
        text: 'Tarjeta debito',
        value: 2
      }, {
        text: 'Tarjeta de credito',
        value: 3
      }, {
        text: 'Transferencia electronica',
        value: 4
      }],
      tiposFactura: [{
        text: 'Factura de venta nacional',
        value: 1
      }, {
        text: 'Factura de exportacion',
        value: 2
      }, {
        text: 'Factura de contingencia',
        value: 3
      }, {
        text: 'Nota credito',
        value: 4
      }, {
        text: 'Nota debito',
        value: 5
      }, {
        text: 'ZIP',
        value: 6
      }]
    };
  },
  methods: {
    facturar: function facturar(item) {
      console.log(item);
      // this.factura = Object.assign({}, item);
      this.factura = {
        cliente: {
          razon_social: item.datos.cliente.text,
          nit: item.datos.nit
        },
        cliente_id: item.datos.cliente.value,
        numero_factura: item.datos.num_factura + 1,
        numero_transferencia: parseInt(item.datos.numero),
        valor: item.total,
        pedidos: item.productos
      };
      this.ordenarProductos();
      this.$refs['adicional-factura'].show();
    },
    ordenarProductos: function ordenarProductos() {
      this.factura.pedidos.sort(function (a, b) {
        var nameA = a.producto.toUpperCase();
        var nameB = b.producto.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    },
    save: function save() {
      var _this = this;
      this.saving = true;
      this.erroresValidacion = '';
      this.factura.electronica = this.informacionAdicional.factura_electronica;
      this.factura.formapago_id = this.informacionAdicional.forma_pago;
      this.factura.mediopago_id = this.informacionAdicional.medio_pago;
      this.factura.tipofactura_id = this.informacionAdicional.tipo_factura;
      this.factura.observaciones = this.informacionAdicional.observaciones;
      this.ordenarProductos();
      axios.post('/facturas', this.factura).then(function (res) {
        _this.saving = false;
        console.log(res.data);
        if (typeof res.data === 'number') {
          Swal.fire({
            icon: 'success',
            title: 'Factura guardada con éxito',
            html: "<a href=\"/imprimir-factura/".concat(res.data, "\" target=\"_blank\">Descargar Factura</a>"),
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Aceptar'
          }).then(function (result) {
            if (result.value) {
              window.location.href = '/gestionar-indirectos';
            }
          });
        } else {
          _this.erroresValidacion = res.data;
        }
      })["catch"](function (error) {
        _this.saving = false;
        console.error('Error al guardar factura:', error);
        _this.erroresValidacion = 'Error al guardar la factura. Por favor, inténtelo de nuevo.';
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionFinalFacturas.vue?vue&type=template&id=22ced11f":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionFinalFacturas.vue?vue&type=template&id=22ced11f ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("b-modal", {
    ref: "adicional-factura",
    attrs: {
      "no-close-on-backdrop": "",
      scrollable: "",
      centered: "",
      "hide-footer": "",
      title: _vm.factura.cliente.razon_social
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("p", [_vm._v("Nit. " + _vm._s(_vm.factura.cliente.nit))])]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-6 col-6"
  }, [_c("label", {
    attrs: {
      "for": "fecha"
    }
  }, [_c("strong", [_vm._v("Fact. electronica")])]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.informacionAdicional.factura_electronica,
      expression: "informacionAdicional.factura_electronica"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      id: "fecha"
    },
    domProps: {
      value: _vm.informacionAdicional.factura_electronica
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.informacionAdicional, "factura_electronica", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "col-sm-6 col-6"
  }, [_c("label", {
    attrs: {
      "for": "tipo_factura"
    }
  }, [_c("strong", [_vm._v("Tipo de factura")])]), _vm._v(" "), _c("b-form-select", {
    staticClass: "mb-3",
    attrs: {
      id: "tipo_factura",
      options: _vm.tiposFactura
    },
    model: {
      value: _vm.informacionAdicional.tipo_factura,
      callback: function callback($$v) {
        _vm.$set(_vm.informacionAdicional, "tipo_factura", $$v);
      },
      expression: "informacionAdicional.tipo_factura"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "col-sm-6 col-6"
  }, [_c("label", {
    attrs: {
      "for": "forma_pago"
    }
  }, [_c("strong", [_vm._v("Forma de pago")])]), _vm._v(" "), _c("b-form-select", {
    staticClass: "mb-3",
    attrs: {
      id: "forma_pago",
      options: _vm.formaspago
    },
    model: {
      value: _vm.informacionAdicional.forma_pago,
      callback: function callback($$v) {
        _vm.$set(_vm.informacionAdicional, "forma_pago", $$v);
      },
      expression: "informacionAdicional.forma_pago"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "col-sm-6 col-6"
  }, [_c("label", {
    attrs: {
      "for": "medio_pago"
    }
  }, [_c("strong", [_vm._v("Medio de pago")])]), _vm._v(" "), _c("b-form-select", {
    staticClass: "mb-3",
    attrs: {
      id: "medio_pago",
      options: _vm.mediospago
    },
    model: {
      value: _vm.informacionAdicional.medio_pago,
      callback: function callback($$v) {
        _vm.$set(_vm.informacionAdicional, "medio_pago", $$v);
      },
      expression: "informacionAdicional.medio_pago"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "col-12"
  }, [_c("label", {
    attrs: {
      "for": "observaciones"
    }
  }, [_c("strong", [_vm._v("Observaciones")])]), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.informacionAdicional.observaciones,
      expression: "informacionAdicional.observaciones"
    }],
    staticClass: "form-control",
    attrs: {
      id: "observaciones"
    },
    domProps: {
      value: _vm.informacionAdicional.observaciones
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.informacionAdicional, "observaciones", $event.target.value);
      }
    }
  })]), _vm._v(" "), _vm.erroresValidacion ? _c("div", {
    staticClass: "col-12"
  }, [_c("b-alert", {
    attrs: {
      show: "",
      variant: "danger"
    }
  }, [_vm._v("\n                " + _vm._s(_vm.erroresValidacion) + "\n            ")])], 1) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "col-12"
  }, [_c("button", {
    staticClass: "btn btn-primary btn-block",
    attrs: {
      disabled: _vm.saving
    },
    on: {
      click: _vm.save
    }
  }, [_vm.saving ? _c("span", [_c("i", {
    staticClass: "fas fa-spinner fa-spin"
  }), _vm._v(" Guardando...\n                ")]) : _c("span", [_c("i", {
    staticClass: "fas fa-save"
  }), _vm._v(" Guardar\n                ")])])])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/InformacionFinalFacturas.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/InformacionFinalFacturas.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _InformacionFinalFacturas_vue_vue_type_template_id_22ced11f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InformacionFinalFacturas.vue?vue&type=template&id=22ced11f */ "./resources/js/components/InformacionFinalFacturas.vue?vue&type=template&id=22ced11f");
/* harmony import */ var _InformacionFinalFacturas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InformacionFinalFacturas.vue?vue&type=script&lang=js */ "./resources/js/components/InformacionFinalFacturas.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _InformacionFinalFacturas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _InformacionFinalFacturas_vue_vue_type_template_id_22ced11f__WEBPACK_IMPORTED_MODULE_0__.render,
  _InformacionFinalFacturas_vue_vue_type_template_id_22ced11f__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/InformacionFinalFacturas.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/InformacionFinalFacturas.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/InformacionFinalFacturas.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionFinalFacturas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InformacionFinalFacturas.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionFinalFacturas.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionFinalFacturas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/InformacionFinalFacturas.vue?vue&type=template&id=22ced11f":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/InformacionFinalFacturas.vue?vue&type=template&id=22ced11f ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionFinalFacturas_vue_vue_type_template_id_22ced11f__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionFinalFacturas_vue_vue_type_template_id_22ced11f__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionFinalFacturas_vue_vue_type_template_id_22ced11f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InformacionFinalFacturas.vue?vue&type=template&id=22ced11f */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionFinalFacturas.vue?vue&type=template&id=22ced11f");


/***/ })

}]);