"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-ViewHistoryPrice-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      productos: null,
      title: null,
      loading: false,
      currentProduct: null // Para mantener referencia del producto actual
    };
  },
  computed: {
    // Tamaño del modal basado en el ancho de pantalla
    modalSize: function modalSize() {
      return 'xl'; // Usar tamaño fijo para evitar problemas de reactividad
    },
    // Productos de la página actual (ya vienen paginados desde Laravel)
    paginatedProducts: function paginatedProducts() {
      return this.productos && this.productos.data ? this.productos.data : [];
    },
    // Total de páginas desde Laravel
    totalPages: function totalPages() {
      return this.productos && this.productos.last_page ? this.productos.last_page : 1;
    },
    // Página actual desde Laravel
    currentLaravelPage: function currentLaravelPage() {
      return this.productos && this.productos.current_page ? this.productos.current_page : 1;
    },
    // Total de registros desde Laravel
    totalRecords: function totalRecords() {
      return this.productos && this.productos.total ? this.productos.total : 0;
    },
    // Índice de inicio para mostrar información de paginación
    startIndex: function startIndex() {
      return this.productos && this.productos.from ? this.productos.from - 1 : 0;
    },
    // Índice de fin para mostrar información de paginación
    endIndex: function endIndex() {
      return this.productos && this.productos.to ? this.productos.to : 0;
    }
  },
  methods: {
    formatingDate: function formatingDate(dateToFormat) {
      var d = new Date(dateToFormat);
      var day = d.getDate() < 10 ? "0".concat(d.getDate()) : d.getDate();
      var month = d.getMonth() + 1 < 10 ? "0".concat(d.getMonth() + 1) : d.getMonth() + 1;
      var year = d.getFullYear();
      return "".concat(year, "-").concat(month, "-").concat(day);
    },
    showPriceProducts: function showPriceProducts(item) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var res;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _this.loading = true;
              _this.productos = null;
              _this.title = item.producto + ' - ' + item.presentacion;
              _this.currentProduct = item;
              _context.n = 1;
              return new Promise(function (resolve) {
                return _this.$nextTick(resolve);
              });
            case 1:
              _this.$refs['my-modal'].show();
              _context.p = 2;
              _context.n = 3;
              return axios.get("/view-history-price/".concat(item.codigo));
            case 3:
              res = _context.v;
              _this.productos = res.data;
              return _context.a(2, res.data);
            case 4:
              _context.p = 4;
              _this.loading = false;
              return _context.f(4);
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[2,, 4, 5]]);
      }))();
    },
    // Método para cambiar de página
    changePage: function changePage(page) {
      var _this2 = this;
      if (!this.currentProduct || !this.currentProduct.codigo) {
        console.error('No hay producto actual para cargar');
        return;
      }

      // Evitar cargar la misma página
      if (page === this.currentLaravelPage) {
        return;
      }
      this.loading = true;
      axios.get("/view-history-price/".concat(this.currentProduct.codigo, "?page=").concat(page)).then(function (res) {
        _this2.productos = res.data;
        _this2.loading = false;
      })["catch"](function (err) {
        console.error('Error al cambiar página:', err);
        _this2.loading = false;

        // Opcional: mostrar mensaje de error al usuario
        if (_this2.$toast) {
          _this2.$toast.error('Error al cargar los datos. Inténtalo de nuevo.');
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Estilos para el modal de historial de precios */\n.history-price-modal {\r\n    --primary-color: #17a2b8;\r\n    --primary-hover: #138496;\n}\n.history-price-modal .history-price-dialog {\n    width: calc(100vw - 3rem);\n    max-width: 1280px;\n    margin: 1.5rem auto;\n}\n.history-price-modal .modal-content {\n    max-height: calc(100vh - 3rem);\n    overflow: hidden;\n    border: 0;\n    border-radius: 16px;\n}\n.history-price-modal .history-price-body {\n    padding: 1.25rem;\n    overflow-y: auto;\n}\n@media (max-width: 768px) {\n.history-price-modal .history-price-dialog {\n        width: calc(100vw - 1rem);\n        max-width: calc(100vw - 1rem);\n        margin: 0.5rem auto;\n}\n.history-price-modal .modal-content {\n        max-height: calc(100vh - 1rem);\n}\n.history-price-modal .history-price-body {\n        padding: 0.75rem;\n}\n}\n\r\n/* Tabla responsiva mejorada */\n.history-price-modal .table-responsive {\n    border-radius: 0.5rem;\r\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n.history-price-modal .table {\n    min-width: 920px;\n    margin-bottom: 0;\n    background-color: white;\n}\n.history-price-modal .table th {\n    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);\r\n    color: white;\r\n    font-weight: 600;\r\n    border: none;\r\n    padding: 0.75rem 0.5rem;\r\n    font-size: 0.85rem;\n}\n.history-price-modal .table td {\n    padding: 0.75rem 0.5rem;\r\n    vertical-align: middle;\r\n    border-top: 1px solid #e9ecef;\r\n    font-size: 0.85rem;\n}\n.history-price-modal .table-row:hover {\n    background-color: #f8f9fa;\r\n    transform: translateY(-1px);\r\n    transition: all 0.2s ease;\n}\r\n\r\n/* Texto truncado para celdas largas */\n.history-price-modal .text-truncate {\n    max-width: 200px;\n}\r\n\r\n/* Estilos para precios */\n.history-price-modal .text-success {\n    color: var(--primary-color) !important;\r\n    font-weight: 600;\n}\r\n\r\n/* Paginación personalizada */\n.history-price-modal .pagination .page-link {\n    color: var(--primary-color);\r\n    border: 1px solid #dee2e6;\r\n    background-color: white;\n}\n.history-price-modal .pagination .page-link:hover {\n    color: white;\r\n    background-color: var(--primary-color);\r\n    border-color: var(--primary-color);\n}\n.history-price-modal .pagination .page-item.active .page-link {\n    background-color: var(--primary-color);\r\n    border-color: var(--primary-color);\r\n    color: white;\n}\r\n\r\n/* Responsive para pantallas pequeñas */\n@media (max-width: 576px) {\n.history-price-modal .table th,\n    .history-price-modal .table td {\n        padding: 0.5rem 0.25rem;\r\n        font-size: 0.8rem;\n}\n.history-price-modal .text-truncate {\n        max-width: 120px;\n}\n.history-price-modal .pagination {\n        font-size: 0.8rem;\n}\n}\r\n\r\n/* Estado vacío */\n.history-price-modal .table tbody tr td[colspan=\"6\"] {\n    padding: 2rem;\r\n    background-color: #f8f9fa;\n}\n.history-price-modal .table tbody tr td[colspan=\"6\"] i {\n    color: #6c757d;\n}\r\n\r\n/* Mejoras visuales adicionales */\n.history-price-modal .modal-header {\n    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);\r\n    color: white;\r\n    border-bottom: none;\n}\n.history-price-modal .modal-header .modal-title {\n    font-weight: 600;\n}\n.history-price-modal .modal-header .close {\n    color: white;\r\n    opacity: 0.8;\n}\n.history-price-modal .modal-header .close:hover {\n    opacity: 1;\n}\r\n\r\n/* Información de paginación */\n.history-price-modal .text-muted.small {\n    font-size: 0.8rem;\n    color: #6c757d !important;\n}\n.history-pagination {\n    gap: 1rem;\n}\n@media (max-width: 767.98px) {\n.history-pagination {\n        align-items: flex-start !important;\n        flex-direction: column;\n}\n}\n\r\n/* Spinner de carga */\n.history-price-modal .spinner-border.text-primary {\n    color: var(--primary-color) !important;\r\n    border-right-color: transparent;\n}\r\n\r\n/* Paginación deshabilitada */\n.history-price-modal .pagination.disabled .page-link {\n    opacity: 0.5;\r\n    pointer-events: none;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_style_index_0_id_566c2dc5_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_style_index_0_id_566c2dc5_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_style_index_0_id_566c2dc5_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=template&id=566c2dc5":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=template&id=566c2dc5 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    ref: "my-modal",
    attrs: {
      "hide-footer": "",
      centered: "",
      scrollable: "",
      title: _vm.title,
      size: _vm.modalSize,
      "modal-class": "history-price-modal",
      "dialog-class": "history-price-dialog",
      "body-class": "history-price-body"
    }
  }, [_c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-sm table-striped table-hover"
  }, [_c("thead", {
    staticClass: "thead-light"
  }, [_c("tr", [_c("th", {
    staticClass: "text-nowrap",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Cliente")]), _vm._v(" "), _c("th", {
    staticClass: "text-nowrap",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("N° Pedido")]), _vm._v(" "), _c("th", {
    staticClass: "text-nowrap text-right",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Precio Entrada")]), _vm._v(" "), _c("th", {
    staticClass: "text-nowrap text-center",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Cantidad")]), _vm._v(" "), _c("th", {
    staticClass: "text-nowrap text-center",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Adicional")]), _vm._v(" "), _c("th", {
    staticClass: "text-nowrap",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Fecha")])])]), _vm._v(" "), _c("tbody", [_vm.loading ? _c("tr", [_c("td", {
    staticClass: "text-center py-4",
    attrs: {
      colspan: "6"
    }
  }, [_c("div", {
    staticClass: "d-flex justify-content-center align-items-center"
  }, [_c("div", {
    staticClass: "spinner-border text-primary mr-2",
    staticStyle: {
      width: "1.5rem",
      height: "1.5rem"
    },
    attrs: {
      role: "status"
    }
  }, [_c("span", {
    staticClass: "sr-only"
  }, [_vm._v("Cargando...")])]), _vm._v(" "), _c("span", {
    staticClass: "text-muted"
  }, [_vm._v("Cargando datos...")])])])]) : _vm._l(_vm.paginatedProducts, function (item, index) {
    return _c("tr", {
      key: index,
      staticClass: "table-row"
    }, [_c("td", {
      staticClass: "text-truncate",
      attrs: {
        title: item.razon_social
      }
    }, [_vm._v(_vm._s(item.razon_social))]), _vm._v(" "), _c("td", {
      staticClass: "text-center"
    }, [_vm._v(_vm._s(item.num_pedido))]), _vm._v(" "), _c("td", {
      staticClass: "text-right font-weight-bold text-success"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.precio_entrada)))]), _vm._v(" "), _c("td", {
      staticClass: "text-center"
    }, [_vm._v(_vm._s(item.cantidad))]), _vm._v(" "), _c("td", {
      staticClass: "text-center"
    }, [_vm._v(_vm._s(item.adicionales || "-"))]), _vm._v(" "), _c("td", {
      staticClass: "text-nowrap"
    }, [_vm._v(_vm._s(_vm.formatingDate(item.created_at)))])]);
  }), _vm._v(" "), !_vm.loading && _vm.paginatedProducts.length === 0 ? _c("tr", [_c("td", {
    staticClass: "text-center text-muted py-4",
    attrs: {
      colspan: "6"
    }
  }, [_c("i", {
    staticClass: "fas fa-inbox fa-2x mb-2"
  }), _vm._v(" "), _c("br"), _vm._v("No hay historial de precios disponible\n                    ")])]) : _vm._e()], 2)])]), _vm._v(" "), _vm.totalPages > 1 ? _c("div", {
    staticClass: "history-pagination d-flex justify-content-between align-items-center mt-3"
  }, [_c("div", {
    staticClass: "text-muted small"
  }, [_vm._v("\n            Mostrando " + _vm._s(_vm.startIndex + 1) + " - " + _vm._s(_vm.endIndex) + " de " + _vm._s(_vm.totalRecords) + " registros\n        ")]), _vm._v(" "), _c("b-pagination", {
    staticClass: "mb-0",
    attrs: {
      value: _vm.currentLaravelPage,
      "total-rows": _vm.totalRecords,
      "per-page": 5,
      size: "sm",
      "prev-text": "‹",
      "next-text": "›",
      "first-text": "«",
      "last-text": "»",
      limit: "5",
      disabled: _vm.loading
    },
    on: {
      input: _vm.changePage
    }
  })], 1) : _vm._e()]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/ViewHistoryPrice.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/ViewHistoryPrice.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewHistoryPrice_vue_vue_type_template_id_566c2dc5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewHistoryPrice.vue?vue&type=template&id=566c2dc5 */ "./resources/js/components/ViewHistoryPrice.vue?vue&type=template&id=566c2dc5");
/* harmony import */ var _ViewHistoryPrice_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewHistoryPrice.vue?vue&type=script&lang=js */ "./resources/js/components/ViewHistoryPrice.vue?vue&type=script&lang=js");
/* harmony import */ var _ViewHistoryPrice_vue_vue_type_style_index_0_id_566c2dc5_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css */ "./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ViewHistoryPrice_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewHistoryPrice_vue_vue_type_template_id_566c2dc5__WEBPACK_IMPORTED_MODULE_0__.render,
  _ViewHistoryPrice_vue_vue_type_template_id_566c2dc5__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/ViewHistoryPrice.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ViewHistoryPrice.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/ViewHistoryPrice.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewHistoryPrice.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_style_index_0_id_566c2dc5_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=style&index=0&id=566c2dc5&lang=css");


/***/ }),

/***/ "./resources/js/components/ViewHistoryPrice.vue?vue&type=template&id=566c2dc5":
/*!************************************************************************************!*\
  !*** ./resources/js/components/ViewHistoryPrice.vue?vue&type=template&id=566c2dc5 ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_template_id_566c2dc5__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_template_id_566c2dc5__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHistoryPrice_vue_vue_type_template_id_566c2dc5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewHistoryPrice.vue?vue&type=template&id=566c2dc5 */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ViewHistoryPrice.vue?vue&type=template&id=566c2dc5");


/***/ })

}]);