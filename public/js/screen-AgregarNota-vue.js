"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-AgregarNota-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      errores: '',
      nota: {
        referencia: 'Sin referencia',
        esDebito: false,
        numero_referencia: null,
        fecha_referencia: null,
        numero: null
      },
      tiponotas: [{
        text: 'NC',
        value: 4
      }, {
        text: 'Otra',
        value: 5
      }]
    };
  },
  mounted: function mounted() {
    this.nota.fecha = this.formatingDate(new Date());
  },
  methods: {
    formatingDate: function formatingDate(dateToFormat) {
      var d = new Date(dateToFormat);
      var day = d.getDate() < 10 ? "0".concat(d.getDate()) : d.getDate();
      var month = d.getMonth() + 1 < 10 ? "0".concat(d.getMonth() + 1) : d.getMonth() + 1;
      var year = d.getFullYear();
      return "".concat(year, "-").concat(month, "-").concat(day);
    },
    crearNota: function crearNota(nota) {
      var _this = this;
      // Probar guardado.
      Swal.showLoading();
      this.nota.cliente_id = nota.cliente_id;
      this.nota.tipo_factura = nota.tipo_factura;
      this.nota.valor_nota = nota.valor_nota;
      this.nota.numero_referencia = nota.numero_referencia;
      this.nota.fecha_referencia = nota.fecha_referencia;
      this.nota.razon_referencia = nota.razon_referencia;
      this.nota.productos = nota.pedidos;
      // console.log(this.nota);
      axios.post('/notas', this.nota).then(function (res) {
        Swal.hideLoading();
        if (res.data.code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Nota creada con exito',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Aceptar'
          }).then(function (result) {
            if (result.value) {
              location.reload();
            }
          });
        } else {
          _this.errores = res.data;
        }
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getConsecutivo: function getConsecutivo() {
      var _this2 = this;
      axios.get("consecutivo-nota/".concat(this.nota.tipofactura_id)).then(function (res) {
        _this2.nota.numero = parseInt(res.data[0].consecutivo) + 1;
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Container principal */\n.nota-container[data-v-12c9b75c] {\r\n    padding: 20px;\r\n    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\r\n    min-height: 100vh;\n}\r\n\r\n/* Alertas profesionales */\n.alert-container[data-v-12c9b75c] {\r\n    margin-bottom: 20px;\n}\n.professional-alert[data-v-12c9b75c] {\r\n    border-radius: 12px;\r\n    border: none;\r\n    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);\r\n    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);\r\n    color: #721c24;\r\n    font-weight: 500;\r\n    padding: 15px 20px;\n}\n.professional-alert i[data-v-12c9b75c] {\r\n    color: #dc3545;\n}\r\n\r\n/* Card de opciones */\n.nota-options-card[data-v-12c9b75c] {\r\n    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);\r\n    border-radius: 16px;\r\n    padding: 25px;\r\n    margin-bottom: 25px;\r\n    box-shadow: 0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.03);\r\n    border: 1px solid rgba(255,255,255,0.8);\r\n    position: relative;\r\n    overflow: hidden;\n}\r\n\r\n/* Contenedor de campos con margen superior */\n.fields-container[data-v-12c9b75c] {\r\n    margin: 0 0 14px;\n}\n.nota-options-card[data-v-12c9b75c]::before {\r\n    content: '';\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    height: 4px;\r\n    background: linear-gradient(90deg, #17a2b8 0%, #138496 50%, #f093fb 100%);\n}\r\n\r\n/* Grupos de formulario modernos */\n.form-group-modern[data-v-12c9b75c] {\r\n    margin-bottom: 0;\n}\n.form-label-modern[data-v-12c9b75c] {\r\n    display: block;\r\n    margin-bottom: 6px;\r\n    color: #475569;\r\n    font-family: inherit;\r\n    font-size: 0.78rem;\r\n    font-weight: 700;\r\n    line-height: 1.2;\r\n    letter-spacing: 0.025em;\n}\n.input-group-modern[data-v-12c9b75c] {\r\n    position: relative;\r\n    display: flex;\r\n    align-items: center;\n}\r\n\r\n/* Inputs modernos */\n.modern-input[data-v-12c9b75c] {\r\n    width: 100%;\r\n    height: 46px;\r\n    padding: 0.75rem 0.9rem;\r\n    color: #334155;\r\n    background: #fff;\r\n    border: 1px solid #d7dee8;\r\n    border-radius: 10px;\r\n    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);\r\n    font-family: inherit;\r\n    font-size: 0.9rem;\r\n    line-height: 1.2;\r\n    transition: border-color 0.2s, box-shadow 0.2s;\n}\n.modern-input[data-v-12c9b75c]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 3px rgba(23, 162, 184, 0.14);\r\n    outline: none;\n}\r\n\r\n/* Select moderno */\n.modern-select[data-v-12c9b75c] {\r\n    width: 100%;\r\n    height: 46px;\r\n    padding: 0.75rem 2.5rem 0.75rem 0.9rem;\r\n    color: #334155;\r\n    background: #fff;\r\n    border: 1px solid #d7dee8;\r\n    border-radius: 10px;\r\n    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);\r\n    font-family: inherit;\r\n    font-size: 0.9rem;\r\n    line-height: 1.2;\r\n    transition: border-color 0.2s, box-shadow 0.2s;\n}\n.modern-select[data-v-12c9b75c]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 3px rgba(23, 162, 184, 0.14);\r\n    outline: none;\n}\n.note-fields[data-v-12c9b75c] {\r\n    margin-right: -7px;\r\n    margin-left: -7px;\r\n    row-gap: 14px;\n}\n.note-field[data-v-12c9b75c] {\r\n    padding-right: 7px;\r\n    padding-left: 7px;\n}\r\n\r\n/* Responsive adjustments */\n@media (max-width: 768px) {\n.nota-container[data-v-12c9b75c] {\r\n        padding: 15px;\n}\n.nota-options-card[data-v-12c9b75c] {\r\n        padding: 20px 15px;\r\n        margin-bottom: 20px;\n}\n.note-fields[data-v-12c9b75c] {\r\n        row-gap: 12px;\n}\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_style_index_0_id_12c9b75c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_style_index_0_id_12c9b75c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_style_index_0_id_12c9b75c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=template&id=12c9b75c&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=template&id=12c9b75c&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", {
    staticClass: "nota-container"
  }, [_vm.errores.length > 0 ? _c("div", {
    staticClass: "alert-container"
  }, [_c("div", {
    staticClass: "alert alert-danger professional-alert"
  }, [_c("i", {
    staticClass: "fas fa-exclamation-triangle mr-2"
  }), _vm._v("\n                " + _vm._s(_vm.errores) + "\n            ")])]) : _vm._e(), _vm._v(" "), _c("items-component", {
    attrs: {
      esNota: true
    },
    on: {
      guardar: _vm.crearNota
    },
    scopedSlots: _vm._u([{
      key: "title",
      fn: function fn() {
        return [_vm._v("Agregar nota")];
      },
      proxy: true
    }, {
      key: "opcionesExtras",
      fn: function fn() {
        return [_c("div", {
          staticClass: "fields-container"
        }, [_c("div", {
          staticClass: "row note-fields"
        }, [_c("div", {
          staticClass: "col-12 col-md-4 note-field"
        }, [_c("div", {
          staticClass: "form-group-modern"
        }, [_c("label", {
          staticClass: "form-label-modern",
          attrs: {
            "for": "tipofactura_id"
          }
        }, [_vm._v("Tipo")]), _vm._v(" "), _c("div", {
          staticClass: "input-group-modern"
        }, [_c("b-select", {
          staticClass: "modern-select",
          attrs: {
            options: _vm.tiponotas,
            id: "tipofactura_id"
          },
          on: {
            input: _vm.getConsecutivo
          },
          model: {
            value: _vm.nota.tipofactura_id,
            callback: function callback($$v) {
              _vm.$set(_vm.nota, "tipofactura_id", $$v);
            },
            expression: "nota.tipofactura_id"
          }
        })], 1)])]), _vm._v(" "), _c("div", {
          staticClass: "col-12 col-md-4 note-field"
        }, [_c("div", {
          staticClass: "form-group-modern"
        }, [_c("label", {
          staticClass: "form-label-modern",
          attrs: {
            "for": "numero"
          }
        }, [_vm._v("No. nota")]), _vm._v(" "), _c("div", {
          staticClass: "input-group-modern"
        }, [_c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.nota.numero,
            expression: "nota.numero"
          }],
          staticClass: "form-control modern-input",
          attrs: {
            type: "number",
            id: "numero",
            placeholder: "Número de nota"
          },
          domProps: {
            value: _vm.nota.numero
          },
          on: {
            input: function input($event) {
              if ($event.target.composing) return;
              _vm.$set(_vm.nota, "numero", $event.target.value);
            }
          }
        })])])]), _vm._v(" "), _c("div", {
          staticClass: "col-12 col-md-4 note-field"
        }, [_c("div", {
          staticClass: "form-group-modern"
        }, [_c("label", {
          staticClass: "form-label-modern",
          attrs: {
            "for": "fecha"
          }
        }, [_vm._v("Fecha")]), _vm._v(" "), _c("div", {
          staticClass: "input-group-modern"
        }, [_c("input", {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.nota.fecha,
            expression: "nota.fecha"
          }],
          staticClass: "form-control modern-input",
          attrs: {
            type: "date",
            id: "fecha"
          },
          domProps: {
            value: _vm.nota.fecha
          },
          on: {
            input: function input($event) {
              if ($event.target.composing) return;
              _vm.$set(_vm.nota, "fecha", $event.target.value);
            }
          }
        })])])]), _vm._v(" "), _vm.errores ? _c("div", {
          staticClass: "col-12"
        }, [_c("div", {
          staticClass: "alert alert-danger professional-alert"
        }, [_c("i", {
          staticClass: "fas fa-exclamation-circle mr-2"
        }), _vm._v("\n                                    " + _vm._s(_vm.errores) + "\n                                ")])]) : _vm._e()])])];
      },
      proxy: true
    }])
  })], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/AgregarNota.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/AgregarNota.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AgregarNota_vue_vue_type_template_id_12c9b75c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AgregarNota.vue?vue&type=template&id=12c9b75c&scoped=true */ "./resources/js/components/AgregarNota.vue?vue&type=template&id=12c9b75c&scoped=true");
/* harmony import */ var _AgregarNota_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AgregarNota.vue?vue&type=script&lang=js */ "./resources/js/components/AgregarNota.vue?vue&type=script&lang=js");
/* harmony import */ var _AgregarNota_vue_vue_type_style_index_0_id_12c9b75c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css */ "./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AgregarNota_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AgregarNota_vue_vue_type_template_id_12c9b75c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _AgregarNota_vue_vue_type_template_id_12c9b75c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "12c9b75c",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/AgregarNota.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/AgregarNota.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/components/AgregarNota.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AgregarNota.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_style_index_0_id_12c9b75c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=style&index=0&id=12c9b75c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/AgregarNota.vue?vue&type=template&id=12c9b75c&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/AgregarNota.vue?vue&type=template&id=12c9b75c&scoped=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_template_id_12c9b75c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_template_id_12c9b75c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AgregarNota_vue_vue_type_template_id_12c9b75c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AgregarNota.vue?vue&type=template&id=12c9b75c&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/AgregarNota.vue?vue&type=template&id=12c9b75c&scoped=true");


/***/ })

}]);