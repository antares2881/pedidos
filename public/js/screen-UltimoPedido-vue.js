"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-UltimoPedido-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['datos'],
  data: function data() {
    return {
      headers: [{
        text: 'Producto',
        value: 'producto'
      }, {
        text: 'Presentación',
        value: 'presentacion'
      }, {
        text: 'Cantidad',
        value: 'cantidad'
      }, {
        text: 'Precio',
        value: 'precio_entrada'
      }, {
        text: 'Total',
        value: 'valor_total'
      }],
      // Paginación
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0
    };
  },
  computed: {
    paginatedData: function paginatedData() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return this.datos.slice(start, end);
    },
    shouldPaginate: function shouldPaginate() {
      return this.datos.length > this.itemsPerPage;
    }
  },
  watch: {
    datos: {
      handler: function handler() {
        this.totalPages = Math.ceil(this.datos.length / this.itemsPerPage);
        this.currentPage = 1;
      },
      immediate: true
    }
  },
  methods: {
    // Formato de moneda
    formatCurrency: function formatCurrency(value) {
      if (!value && value !== 0) return '$ 0';
      var num = parseFloat(value);
      return '$ ' + num.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    },
    // Paginación
    goToPage: function goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    nextPage: function nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage: function prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Container */\n.ultimo-pedido-container[data-v-3a50693e] {\r\n    width: 100%;\r\n    padding: 0;\n}\r\n\r\n/* Summary Header */\n.summary-header[data-v-3a50693e] {\r\n    padding: 1.5rem 2rem;\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    border-bottom: 2px solid #e5e7eb;\n}\n.summary-cards[data-v-3a50693e] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 2rem;\r\n    max-width: 800px;\r\n    margin: 0 auto;\n}\n.summary-card[data-v-3a50693e] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    transition: all 0.3s ease;\n}\n.summary-card[data-v-3a50693e]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.valor-factura .summary-icon[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\n}\n.fecha-factura .summary-icon[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n    color: white;\n}\n.summary-icon[data-v-3a50693e] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.5rem;\n}\n.summary-content[data-v-3a50693e] {\r\n    flex: 1;\n}\n.summary-title[data-v-3a50693e] {\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    margin: 0 0 0.5rem 0;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.summary-value[data-v-3a50693e] {\r\n    font-size: 1.5rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    margin: 0;\r\n    font-family: 'Courier New', monospace;\n}\r\n\r\n/* Mobile Cards - Hidden by default */\n.mobile-cards-container[data-v-3a50693e] {\r\n    display: none;\r\n    padding: 1.5rem;\n}\n.desktop-table[data-v-3a50693e] {\r\n    display: block;\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-3a50693e] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\r\n    background: white;\n}\n.professional-table[data-v-3a50693e] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\r\n    min-width: 800px;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #17a2b8;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\n}\n.professional-table thead th i[data-v-3a50693e] {\r\n    margin-right: 0.5rem;\r\n    color: #17a2b8;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-3a50693e] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\n}\n.professional-table tbody tr[data-v-3a50693e]:hover {\r\n    background: rgba(139, 92, 246, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-3a50693e] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.producto-cell[data-v-3a50693e] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.producto-name[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);\r\n    color: #059669;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #86efac;\r\n    display: inline-block;\r\n    max-width: 100%;\n}\n.presentacion-cell[data-v-3a50693e] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.presentacion-badge[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #92400e;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #fcd34d;\n}\n.cantidad-cell[data-v-3a50693e],\r\n.precio-cell[data-v-3a50693e],\r\n.total-cell[data-v-3a50693e] {\r\n    font-weight: 600;\r\n    font-family: 'Courier New', monospace;\n}\n.cantidad-value[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);\r\n    color: #4338ca;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #a5b4fc;\r\n    font-size: 1.1rem;\n}\n.precio-value[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #2563eb;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #93c5fd;\n}\n.total-value[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #e6f7ff 0%, #b3ecf2 100%);\r\n    color: #17a2b8;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #7dd3fc;\r\n    font-size: 1.1rem;\n}\r\n\r\n/* Mobile Cards Styles */\n.pedido-card[data-v-3a50693e] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    margin-bottom: 1rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    transition: all 0.3s ease;\n}\n.pedido-card[data-v-3a50693e]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.card-header[data-v-3a50693e] {\r\n    margin-bottom: 1.5rem;\r\n    padding-bottom: 1rem;\r\n    border-bottom: 2px solid #f1f5f9;\n}\n.producto-info[data-v-3a50693e] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\n}\n.producto-icon[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);\r\n    color: #059669;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.25rem;\n}\n.producto-details[data-v-3a50693e] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.5rem;\r\n    flex: 1;\n}\n.producto-name-mobile[data-v-3a50693e] {\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-size: 1.2rem;\r\n    line-height: 1.2;\n}\n.presentacion-mobile[data-v-3a50693e] {\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    font-size: 0.9rem;\r\n    background: #f8fafc;\r\n    padding: 0.25rem 0.75rem;\r\n    border-radius: 6px;\r\n    align-self: flex-start;\n}\n.card-body[data-v-3a50693e] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1.5rem;\n}\n.info-grid[data-v-3a50693e] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 1rem;\n}\n.info-item[data-v-3a50693e] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\n}\n.cantidad .info-icon[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);\r\n    color: #4338ca;\n}\n.precio .info-icon[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #2563eb;\n}\n.info-icon[data-v-3a50693e] {\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 0.9rem;\n}\n.info-content[data-v-3a50693e] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.25rem;\r\n    flex: 1;\n}\n.info-label[data-v-3a50693e] {\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.info-value[data-v-3a50693e] {\r\n    font-size: 1rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-family: 'Courier New', monospace;\n}\r\n\r\n/* Total Section */\n.total-section[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    border: 2px solid #c4b5fd;\n}\n.total-container[data-v-3a50693e] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    justify-content: center;\n}\n.total-icon[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.25rem;\n}\n.total-content[data-v-3a50693e] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.5rem;\r\n    flex: 1;\r\n    text-align: center;\n}\n.total-label[data-v-3a50693e] {\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #17a2b8;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.total-amount[data-v-3a50693e] {\r\n    font-size: 1.75rem;\r\n    font-weight: 800;\r\n    color: #1e293b;\r\n    font-family: 'Courier New', monospace;\n}\r\n\r\n/* Pagination */\n.pagination-section[data-v-3a50693e] {\r\n    background: white;\r\n    padding: 1.5rem 2rem;\r\n    border-top: 2px solid #f1f5f9;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 1rem;\n}\n.pagination-info[data-v-3a50693e] {\r\n    color: #64748b;\r\n    font-weight: 500;\r\n    font-size: 0.9rem;\n}\n.pagination-controls[data-v-3a50693e] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-btn[data-v-3a50693e] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 40px;\r\n    height: 40px;\r\n    border: 2px solid #e5e7eb;\r\n    background: white;\r\n    color: #64748b;\r\n    border-radius: 8px;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\n}\n.pagination-btn[data-v-3a50693e]:hover:not(:disabled) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.2);\n}\n.pagination-btn[data-v-3a50693e]:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n    transform: none;\n}\n.pagination-btn.page-number.active[data-v-3a50693e] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);\n}\n.pagination-dots[data-v-3a50693e] {\r\n    color: #94a3b8;\r\n    font-weight: 600;\r\n    padding: 0 0.5rem;\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 1200px) {\n.professional-table[data-v-3a50693e] {\r\n        font-size: 0.9rem;\n}\n.professional-table thead th[data-v-3a50693e],\r\n    .professional-table tbody td[data-v-3a50693e] {\r\n        padding: 0.875rem 0.75rem;\n}\n}\n@media (max-width: 900px) {\r\n    /* Show mobile cards, hide desktop table */\n.desktop-table[data-v-3a50693e] {\r\n        display: none;\n}\n.mobile-cards-container[data-v-3a50693e] {\r\n        display: block;\n}\n.pagination-section[data-v-3a50693e] {\r\n        padding: 1rem;\r\n        flex-direction: column;\r\n        text-align: center;\n}\n.pagination-controls[data-v-3a50693e] {\r\n        flex-wrap: wrap;\r\n        justify-content: center;\n}\n}\n@media (max-width: 768px) {\n.summary-header[data-v-3a50693e] {\r\n        padding: 1rem;\n}\n.summary-cards[data-v-3a50693e] {\r\n        grid-template-columns: 1fr;\r\n        gap: 1rem;\n}\n.summary-card[data-v-3a50693e] {\r\n        padding: 1.25rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 1rem;\n}\n.summary-icon[data-v-3a50693e] {\r\n        width: 50px;\r\n        height: 50px;\r\n        font-size: 1.25rem;\n}\n.summary-value[data-v-3a50693e] {\r\n        font-size: 1.25rem;\n}\n.mobile-cards-container[data-v-3a50693e] {\r\n        padding: 1rem;\n}\n.pedido-card[data-v-3a50693e] {\r\n        padding: 1.25rem;\r\n        margin-bottom: 0.875rem;\n}\n.producto-info[data-v-3a50693e] {\r\n        justify-content: center;\r\n        text-align: center;\n}\n.producto-name-mobile[data-v-3a50693e] {\r\n        font-size: 1.1rem;\r\n        text-align: center;\n}\n.info-grid[data-v-3a50693e] {\r\n        grid-template-columns: 1fr;\r\n        gap: 0.75rem;\n}\n.info-item[data-v-3a50693e] {\r\n        padding: 0.875rem;\n}\n.total-section[data-v-3a50693e] {\r\n        padding: 1.25rem;\n}\n.total-amount[data-v-3a50693e] {\r\n        font-size: 1.5rem;\n}\n}\n@media (max-width: 480px) {\n.pedido-card[data-v-3a50693e] {\r\n        padding: 1rem;\n}\n.producto-icon[data-v-3a50693e] {\r\n        width: 45px;\r\n        height: 45px;\r\n        font-size: 1.1rem;\n}\n.producto-name-mobile[data-v-3a50693e] {\r\n        font-size: 1rem;\n}\n.total-amount[data-v-3a50693e] {\r\n        font-size: 1.25rem;\n}\n.summary-value[data-v-3a50693e] {\r\n        font-size: 1.1rem;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_style_index_0_id_3a50693e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_style_index_0_id_3a50693e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_style_index_0_id_3a50693e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=template&id=3a50693e&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=template&id=3a50693e&scoped=true ***!
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
  return _c("div", {
    staticClass: "ultimo-pedido-container"
  }, [_c("div", {
    staticClass: "summary-header"
  }, [_c("div", {
    staticClass: "summary-cards"
  }, [_c("div", {
    staticClass: "summary-card valor-factura"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "summary-content"
  }, [_c("h4", {
    staticClass: "summary-title"
  }, [_vm._v("Valor Factura")]), _vm._v(" "), _c("p", {
    staticClass: "summary-value"
  }, [_vm._v(_vm._s(_vm.formatCurrency(_vm.datos[0].tipocliente_id === 1 ? _vm.datos[0].valor : _vm.datos[0].total_factura)))])])]), _vm._v(" "), _c("div", {
    staticClass: "summary-card fecha-factura"
  }, [_vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "summary-content"
  }, [_c("h4", {
    staticClass: "summary-title"
  }, [_vm._v("Fecha Factura")]), _vm._v(" "), _c("p", {
    staticClass: "summary-value"
  }, [_vm._v(_vm._s(_vm.datos[0].tipocliente_id === 1 ? _vm.datos[0].fecha_factura : _vm.datos[0].fecha))])])])])]), _vm._v(" "), _c("div", {
    staticClass: "desktop-table"
  }, [_c("div", {
    staticClass: "professional-table-wrapper"
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(2), _vm._v(" "), _c("tbody", _vm._l(_vm.paginatedData, function (item, index) {
    return _c("tr", {
      key: index,
      staticClass: "data-row"
    }, [_c("td", {
      staticClass: "text-left producto-cell"
    }, [_c("span", {
      staticClass: "producto-name"
    }, [_vm._v(_vm._s(item.producto))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center presentacion-cell"
    }, [_c("span", {
      staticClass: "presentacion-badge"
    }, [_vm._v(_vm._s(item.presentacion))])]), _vm._v(" "), _c("td", {
      staticClass: "text-right cantidad-cell"
    }, [_c("span", {
      staticClass: "cantidad-value"
    }, [_vm._v(_vm._s(item.cantidad))])]), _vm._v(" "), _c("td", {
      staticClass: "text-right precio-cell"
    }, [_c("span", {
      staticClass: "precio-value"
    }, [_vm._v(_vm._s(_vm.formatCurrency(item.tipocliente_id === 1 ? item.precio_factura : item.precio_entrada)))])]), _vm._v(" "), _c("td", {
      staticClass: "text-right total-cell"
    }, [_c("span", {
      staticClass: "total-value"
    }, [_vm._v(_vm._s(_vm.formatCurrency(item.tipocliente_id === 1 ? item.precio_factura * item.cantidad : item.precio_entrada * item.cantidad)))])])]);
  }), 0)])])]), _vm._v(" "), _vm.shouldPaginate ? _c("div", {
    staticClass: "pagination-section"
  }, [_c("div", {
    staticClass: "pagination-info"
  }, [_c("span", {
    staticClass: "pagination-text"
  }, [_vm._v("\n                Mostrando " + _vm._s((_vm.currentPage - 1) * _vm.itemsPerPage + 1) + " - " + _vm._s(Math.min(_vm.currentPage * _vm.itemsPerPage, _vm.datos.length)) + " de " + _vm._s(_vm.datos.length) + " productos\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "pagination-controls"
  }, [_c("button", {
    staticClass: "pagination-btn",
    attrs: {
      disabled: _vm.currentPage === 1
    },
    on: {
      click: _vm.prevPage
    }
  }, [_c("i", {
    staticClass: "fas fa-chevron-left"
  })]), _vm._v(" "), _vm._l(Math.min(_vm.totalPages, 5), function (page) {
    return _c("button", {
      key: page,
      staticClass: "pagination-btn page-number",
      "class": {
        active: _vm.currentPage === page
      },
      on: {
        click: function click($event) {
          return _vm.goToPage(page);
        }
      }
    }, [_vm._v("\n                " + _vm._s(page) + "\n            ")]);
  }), _vm._v(" "), _vm.totalPages > 5 ? _c("span", {
    staticClass: "pagination-dots"
  }, [_vm._v("...")]) : _vm._e(), _vm._v(" "), _c("button", {
    staticClass: "pagination-btn",
    attrs: {
      disabled: _vm.currentPage === _vm.totalPages
    },
    on: {
      click: _vm.nextPage
    }
  }, [_c("i", {
    staticClass: "fas fa-chevron-right"
  })])], 2)]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "mobile-cards-container"
  }, _vm._l(_vm.paginatedData, function (item, index) {
    return _c("div", {
      key: index,
      staticClass: "pedido-card"
    }, [_c("div", {
      staticClass: "card-header"
    }, [_c("div", {
      staticClass: "producto-info"
    }, [_c("i", {
      staticClass: "fas fa-box producto-icon"
    }), _vm._v(" "), _c("div", {
      staticClass: "producto-details"
    }, [_c("span", {
      staticClass: "producto-name-mobile"
    }, [_vm._v(_vm._s(item.producto))]), _vm._v(" "), _c("span", {
      staticClass: "presentacion-mobile"
    }, [_vm._v(_vm._s(item.presentacion))])])])]), _vm._v(" "), _c("div", {
      staticClass: "card-body"
    }, [_c("div", {
      staticClass: "info-grid"
    }, [_c("div", {
      staticClass: "info-item cantidad"
    }, [_c("i", {
      staticClass: "fas fa-sort-numeric-down info-icon"
    }), _vm._v(" "), _c("div", {
      staticClass: "info-content"
    }, [_c("span", {
      staticClass: "info-label"
    }, [_vm._v("Cantidad")]), _vm._v(" "), _c("span", {
      staticClass: "info-value"
    }, [_vm._v(_vm._s(item.cantidad))])])]), _vm._v(" "), _c("div", {
      staticClass: "info-item precio"
    }, [_c("i", {
      staticClass: "fas fa-dollar-sign info-icon"
    }), _vm._v(" "), _c("div", {
      staticClass: "info-content"
    }, [_c("span", {
      staticClass: "info-label"
    }, [_vm._v("Precio Unit.")]), _vm._v(" "), _c("span", {
      staticClass: "info-value"
    }, [_vm._v(_vm._s(_vm.formatCurrency(item.tipocliente_id === 1 ? item.precio_factura : item.precio_entrada)))])])])]), _vm._v(" "), _c("div", {
      staticClass: "total-section"
    }, [_c("div", {
      staticClass: "total-container"
    }, [_c("i", {
      staticClass: "fas fa-calculator total-icon"
    }), _vm._v(" "), _c("div", {
      staticClass: "total-content"
    }, [_c("span", {
      staticClass: "total-label"
    }, [_vm._v("Total Línea")]), _vm._v(" "), _c("span", {
      staticClass: "total-amount"
    }, [_vm._v(_vm._s(_vm.formatCurrency(item.tipocliente_id === 1 ? item.precio_factura * item.cantidad : item.precio_entrada * item.cantidad)))])])])])])]);
  }), 0)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "summary-icon"
  }, [_c("i", {
    staticClass: "fas fa-file-invoice-dollar"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "summary-icon"
  }, [_c("i", {
    staticClass: "fas fa-calendar-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", {
    staticClass: "text-left"
  }, [_c("i", {
    staticClass: "fas fa-box"
  }), _vm._v("\n                            Producto\n                        ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fas fa-pills"
  }), _vm._v("\n                            Presentación\n                        ")]), _vm._v(" "), _c("th", {
    staticClass: "text-right"
  }, [_c("i", {
    staticClass: "fas fa-sort-numeric-down"
  }), _vm._v("\n                            Cantidad\n                        ")]), _vm._v(" "), _c("th", {
    staticClass: "text-right"
  }, [_c("i", {
    staticClass: "fas fa-dollar-sign"
  }), _vm._v("\n                            Precio\n                        ")]), _vm._v(" "), _c("th", {
    staticClass: "text-right"
  }, [_c("i", {
    staticClass: "fas fa-calculator"
  }), _vm._v("\n                            Total\n                        ")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/UltimoPedido.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/UltimoPedido.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UltimoPedido_vue_vue_type_template_id_3a50693e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UltimoPedido.vue?vue&type=template&id=3a50693e&scoped=true */ "./resources/js/components/UltimoPedido.vue?vue&type=template&id=3a50693e&scoped=true");
/* harmony import */ var _UltimoPedido_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UltimoPedido.vue?vue&type=script&lang=js */ "./resources/js/components/UltimoPedido.vue?vue&type=script&lang=js");
/* harmony import */ var _UltimoPedido_vue_vue_type_style_index_0_id_3a50693e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css */ "./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UltimoPedido_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _UltimoPedido_vue_vue_type_template_id_3a50693e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _UltimoPedido_vue_vue_type_template_id_3a50693e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "3a50693e",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/UltimoPedido.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/UltimoPedido.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/components/UltimoPedido.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UltimoPedido.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_style_index_0_id_3a50693e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=style&index=0&id=3a50693e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/UltimoPedido.vue?vue&type=template&id=3a50693e&scoped=true":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/UltimoPedido.vue?vue&type=template&id=3a50693e&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_template_id_3a50693e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_template_id_3a50693e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UltimoPedido_vue_vue_type_template_id_3a50693e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UltimoPedido.vue?vue&type=template&id=3a50693e&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/UltimoPedido.vue?vue&type=template&id=3a50693e&scoped=true");


/***/ })

}]);