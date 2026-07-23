"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-ReportesAbonos-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      cobros: [],
      loader: false,
      reporte: {
        fecha_i: null,
        fecha_f: null
      },
      search: '',
      totalAbono: 0,
      fechaFinalInvalida: false
    };
  },
  computed: {
    filteredCobros: function filteredCobros() {
      if (!this.search) return this.cobros;
      var searchTerm = this.search.toLowerCase();
      return this.cobros.filter(function (item) {
        return item.cliente.toLowerCase().includes(searchTerm) || item.num_factura.toString().toLowerCase().includes(searchTerm) || item.fecha.toLowerCase().includes(searchTerm);
      });
    }
  },
  watch: {
    'reporte.fecha_i': function reporteFecha_i() {
      this.validarFechas();
    },
    'reporte.fecha_f': function reporteFecha_f() {
      this.validarFechas();
    }
  },
  methods: {
    validarFechas: function validarFechas() {
      if (this.reporte.fecha_i && this.reporte.fecha_f) {
        var fechaInicial = new Date(this.reporte.fecha_i);
        var fechaFinal = new Date(this.reporte.fecha_f);
        this.fechaFinalInvalida = fechaFinal < fechaInicial;
      } else {
        this.fechaFinalInvalida = false;
      }
    },
    buscarCobros: function buscarCobros() {
      var _this = this;
      // Validaciones
      if (!this.reporte.fecha_i || !this.reporte.fecha_f) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
          icon: 'error',
          title: 'Campos requeridos',
          text: 'Debe seleccionar las fechas inicial y final'
        });
        return;
      }
      if (this.fechaFinalInvalida) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
          icon: 'error',
          title: 'Error en las fechas',
          text: 'La fecha final no puede ser menor a la fecha inicial'
        });
        return;
      }

      // Reset data
      this.cobros = [];
      this.totalAbono = 0;
      this.loader = true;
      axios.post('/reporte-abonos', this.reporte).then(function (res) {
        res.data.map(function (el) {
          _this.totalAbono += el.valor;
          _this.cobros.push({
            cliente: el.cliente.razon_social,
            num_factura: el.factura.numero_factura,
            valor: el.factura.valor,
            fecha: el.fecha,
            valor_abono: el.valor
          });
        });
      })["catch"](function (err) {
        console.log(err);
        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo generar el reporte. Intenta nuevamente.'
        });
      })["finally"](function () {
        _this.loader = false;
      });
    },
    formatDateRange: function formatDateRange() {
      if (!this.reporte.fecha_i || !this.reporte.fecha_f) return '';
      var startDate = new Date(this.reporte.fecha_i).toLocaleDateString('es-ES');
      var endDate = new Date(this.reporte.fecha_f).toLocaleDateString('es-ES');
      return "".concat(startDate, " - ").concat(endDate);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Professional Container */\n.reports-container[data-v-0ed3bb51] {\r\n    min-height: 100vh;\r\n    background: #f8f9fa;\r\n    padding: 2rem;\n}\r\n\r\n/* Professional Header */\n.professional-header[data-v-0ed3bb51] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2.5rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.header-content[data-v-0ed3bb51] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-start;\n}\n.header-left[data-v-0ed3bb51] {\r\n    flex: 1;\n}\n.header-title[data-v-0ed3bb51] {\r\n    font-size: 2.5rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    margin: 0 0 0.5rem 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\n}\n.header-icon[data-v-0ed3bb51] {\r\n    color: #10b981;\r\n    font-size: 2rem;\n}\n.header-subtitle[data-v-0ed3bb51] {\r\n    font-size: 1.1rem;\r\n    color: #64748b;\r\n    margin: 0;\r\n    line-height: 1.6;\n}\r\n\r\n/* Professional Filters */\n.filters-section[data-v-0ed3bb51] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.date-filters[data-v-0ed3bb51] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 2rem;\r\n    margin-bottom: 2rem;\n}\n.date-group[data-v-0ed3bb51] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.75rem;\n}\n.filter-label[data-v-0ed3bb51] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 0.95rem;\r\n    margin: 0;\n}\n.date-input[data-v-0ed3bb51] {\r\n    width: 100%;\r\n    height: 56px;\r\n    padding: 1rem 1.25rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 500;\r\n    outline: none;\r\n    cursor: pointer;\r\n    box-sizing: border-box;\r\n    transition: all 0.3s ease;\n}\n.date-input[data-v-0ed3bb51]:focus {\r\n    border-color: #10b981;\r\n    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);\n}\n.date-input.is-invalid[data-v-0ed3bb51] {\r\n    border-color: #dc3545;\r\n    background: linear-gradient(145deg, #fff5f5 0%, #ffeaea 100%);\r\n    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n}\n.date-input.is-invalid[data-v-0ed3bb51]:focus {\r\n    border-color: #dc3545;\r\n    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);\n}\n.invalid-feedback[data-v-0ed3bb51] {\r\n    display: block;\r\n    width: 100%;\r\n    margin-top: 8px;\r\n    font-size: 0.85rem;\r\n    color: #dc3545;\r\n    font-weight: 600;\r\n    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);\r\n    padding: 10px 15px;\r\n    border-radius: 10px;\r\n    border: 1px solid rgba(220, 53, 69, 0.2);\r\n    display: flex;\r\n    align-items: center;\r\n    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);\n}\n.invalid-feedback[data-v-0ed3bb51]::before {\r\n    content: '⚠️';\r\n    margin-right: 10px;\r\n    font-size: 1rem;\n}\r\n\r\n/* Actions Section */\n.actions-section[data-v-0ed3bb51] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    flex-wrap: wrap;\n}\n.professional-btn[data-v-0ed3bb51] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem 2rem;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    text-decoration: none;\r\n    position: relative;\r\n    overflow: hidden;\n}\n.professional-btn[data-v-0ed3bb51]:disabled {\r\n    opacity: 0.7;\r\n    cursor: not-allowed;\n}\n.btn-primary[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);\n}\n.btn-primary[data-v-0ed3bb51]:hover:not(:disabled) {\r\n    transform: translateY(-3px);\r\n    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);\n}\r\n\r\n/* Mini Spinner for Button */\n.spinner-mini[data-v-0ed3bb51] {\r\n    width: 18px;\r\n    height: 18px;\r\n    border: 2px solid rgba(255, 255, 255, 0.3);\r\n    border-top: 2px solid white;\r\n    border-radius: 50%;\r\n    animation: spin-0ed3bb51 1s linear infinite;\n}\r\n\r\n/* Loading Section */\n.loading-section[data-v-0ed3bb51] {\r\n    margin-top: 2rem;\r\n    width: 100%;\n}\n.professional-report-container[data-v-0ed3bb51] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    overflow: hidden;\r\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    width: 100%;\r\n    box-sizing: border-box;\n}\n.loader-container[data-v-0ed3bb51] {\r\n    text-align: center;\r\n    padding: 4rem 2rem;\n}\n.spinner-professional[data-v-0ed3bb51] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border: 4px solid #e5e7eb;\r\n    border-top: 4px solid #10b981;\r\n    border-radius: 50%;\r\n    animation: spin-0ed3bb51 1s linear infinite;\r\n    margin: 0 auto 2rem;\n}\n.loader-title[data-v-0ed3bb51] {\r\n    color: #1e293b;\r\n    font-size: 1.5rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.75rem 0;\n}\n.loader-subtitle[data-v-0ed3bb51] {\r\n    color: #64748b;\r\n    font-size: 1rem;\r\n    font-weight: 500;\r\n    margin: 0 0 2rem 0;\r\n    line-height: 1.5;\n}\n.loading-progress[data-v-0ed3bb51] {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 4px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.progress-bar[data-v-0ed3bb51] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #10b981, #059669);\r\n    border-radius: 2px;\r\n    animation: progress-0ed3bb51 2s ease-in-out infinite;\n}\r\n\r\n/* Report Content */\n.reports-content[data-v-0ed3bb51] {\r\n    margin-top: 2rem;\n}\n.report-header[data-v-0ed3bb51] {\r\n    padding: 2rem 2.5rem 1.5rem;\r\n    border-bottom: 2px solid #e5e7eb;\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n}\n.report-info[data-v-0ed3bb51] {\r\n    width: 100%;\r\n    text-align: center;\n}\n.report-title[data-v-0ed3bb51] {\r\n    font-size: 1.8rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    margin: 0 0 1rem 0;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 0.75rem;\n}\n.report-icon[data-v-0ed3bb51] {\r\n    color: #10b981;\n}\n.report-details[data-v-0ed3bb51] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1.5rem;\r\n    align-items: center;\n}\n.report-period[data-v-0ed3bb51] {\r\n    font-size: 1.1rem;\r\n    font-weight: 600;\r\n    color: #374151;\r\n    text-align: center;\n}\n.summary-cards[data-v-0ed3bb51] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 2rem;\r\n    width: 100%;\r\n    max-width: 600px;\n}\n.summary-card[data-v-0ed3bb51] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    transition: all 0.3s ease;\n}\n.summary-card[data-v-0ed3bb51]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.total-card .summary-icon[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\n}\n.count-card .summary-icon[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\n}\n.summary-icon[data-v-0ed3bb51] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.5rem;\n}\n.summary-content[data-v-0ed3bb51] {\r\n    flex: 1;\n}\n.summary-title[data-v-0ed3bb51] {\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    margin: 0 0 0.5rem 0;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.summary-value[data-v-0ed3bb51] {\r\n    font-size: 1.8rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    margin: 0;\n}\r\n\r\n/* Table Controls */\n.table-controls[data-v-0ed3bb51] {\r\n    padding: 1.5rem 2.5rem;\r\n    border-bottom: 1px solid #e5e7eb;\r\n    background: white;\n}\n.search-container[data-v-0ed3bb51] {\r\n    position: relative;\r\n    max-width: 400px;\n}\n.search-icon[data-v-0ed3bb51] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    color: #64748b;\r\n    font-size: 1rem;\n}\n.search-input[data-v-0ed3bb51] {\r\n    width: 100%;\r\n    padding: 0.875rem 1rem 0.875rem 3rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: #f8fafc;\r\n    color: #374151;\r\n    outline: none;\r\n    transition: all 0.3s ease;\n}\n.search-input[data-v-0ed3bb51]:focus {\r\n    border-color: #10b981;\r\n    background: white;\r\n    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-0ed3bb51] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-0ed3bb51] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\r\n    min-width: 800px;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #10b981;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\n}\n.professional-table thead th i[data-v-0ed3bb51] {\r\n    margin-right: 0.5rem;\r\n    color: #10b981;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-0ed3bb51] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\n}\n.professional-table tbody tr[data-v-0ed3bb51]:hover {\r\n    background: rgba(16, 185, 129, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-0ed3bb51] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.client-cell[data-v-0ed3bb51] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.client-name[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\n}\n.invoice-cell[data-v-0ed3bb51] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.invoice-number[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #92400e;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #fcd34d;\n}\n.date-cell[data-v-0ed3bb51] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.date-value[data-v-0ed3bb51] {\r\n    background: #f8fafc;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    border: 1px solid #e2e8f0;\n}\n.amount-cell[data-v-0ed3bb51] {\r\n    font-weight: 600;\r\n    font-family: 'Courier New', monospace;\n}\n.amount-value[data-v-0ed3bb51] {\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    border: 1px solid #93c5fd;\n}\n.abono-value[data-v-0ed3bb51] {\r\n    color: #059669;\r\n    background: rgba(16, 185, 129, 0.1);\r\n    border: 2px solid #10b981;\r\n    font-size: 1.05rem;\n}\r\n\r\n/* Table Footer */\n.professional-table tfoot[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);\r\n    color: white;\n}\n.professional-table tfoot th[data-v-0ed3bb51] {\r\n    padding: 1.5rem 1rem;\r\n    color: white;\r\n    font-weight: 700;\r\n    font-size: 1.1rem;\n}\n.total-label[data-v-0ed3bb51] {\r\n    text-align: center;\n}\n.total-label i[data-v-0ed3bb51] {\r\n    margin-right: 0.5rem;\r\n    color: #fbbf24;\n}\n.final-total[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);\r\n    color: #1e293b;\r\n    padding: 0.75rem 1.25rem;\r\n    border-radius: 10px;\r\n    font-weight: 800;\r\n    font-size: 1.25rem;\r\n    box-shadow: 0 5px 15px rgba(251, 191, 36, 0.4);\r\n    border: 2px solid #fbbf24;\n}\r\n\r\n/* Animations */\n@keyframes spin-0ed3bb51 {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes progress-0ed3bb51 {\n0% { transform: translateX(-100%);\n}\n50% { transform: translateX(0%);\n}\n100% { transform: translateX(100%);\n}\n}\r\n\r\n/* Mobile Cards - Hidden by default */\n.mobile-cards-container[data-v-0ed3bb51] {\r\n    display: none;\n}\n.desktop-table[data-v-0ed3bb51] {\r\n    display: block;\n}\r\n\r\n/* Mobile Cards Styles */\n.abono-card[data-v-0ed3bb51] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    margin-bottom: 1rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    transition: all 0.3s ease;\n}\n.abono-card[data-v-0ed3bb51]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.card-header[data-v-0ed3bb51] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 1.5rem;\r\n    padding-bottom: 1rem;\r\n    border-bottom: 2px solid #f1f5f9;\n}\n.client-info[data-v-0ed3bb51] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    flex: 1;\n}\n.client-icon[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.1rem;\n}\n.client-name-mobile[data-v-0ed3bb51] {\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-size: 1.1rem;\r\n    line-height: 1.2;\n}\n.invoice-badge[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #92400e;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    border: 1px solid #fcd34d;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    font-size: 0.9rem;\n}\n.card-body[data-v-0ed3bb51] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1.5rem;\n}\n.info-row[data-v-0ed3bb51] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 1rem;\n}\n.info-item[data-v-0ed3bb51] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\n}\n.info-icon[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #2563eb;\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 0.9rem;\n}\n.info-content[data-v-0ed3bb51] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.25rem;\r\n    flex: 1;\n}\n.info-label[data-v-0ed3bb51] {\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.info-value[data-v-0ed3bb51] {\r\n    font-size: 1rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\n}\n.abono-highlight[data-v-0ed3bb51] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    padding: 1.5rem;\r\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);\r\n    border-radius: 16px;\r\n    border: 2px solid #10b981;\n}\n.abono-icon[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.25rem;\n}\n.abono-content[data-v-0ed3bb51] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.5rem;\r\n    flex: 1;\n}\n.abono-label[data-v-0ed3bb51] {\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #059669;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.abono-amount[data-v-0ed3bb51] {\r\n    font-size: 1.5rem;\r\n    font-weight: 800;\r\n    color: #1e293b;\r\n    font-family: 'Courier New', monospace;\n}\n.mobile-total-card[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-top: 1.5rem;\r\n    color: white;\r\n    text-align: center;\n}\n.total-header[data-v-0ed3bb51] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 0.75rem;\r\n    margin-bottom: 1rem;\n}\n.total-icon[data-v-0ed3bb51] {\r\n    background: rgba(251, 191, 36, 0.2);\r\n    color: #fbbf24;\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.1rem;\n}\n.total-title[data-v-0ed3bb51] {\r\n    font-size: 1.2rem;\r\n    font-weight: 700;\r\n    color: white;\n}\n.total-amount-mobile[data-v-0ed3bb51] {\r\n    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);\r\n    color: #1e293b;\r\n    padding: 1rem 2rem;\r\n    border-radius: 16px;\r\n    font-weight: 800;\r\n    font-size: 2rem;\r\n    box-shadow: 0 10px 25px rgba(251, 191, 36, 0.4);\r\n    border: 2px solid #fbbf24;\r\n    font-family: 'Courier New', monospace;\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 1024px) {\n.date-filters[data-v-0ed3bb51] {\r\n        grid-template-columns: 1fr;\r\n        gap: 1.5rem;\n}\n.summary-cards[data-v-0ed3bb51] {\r\n        grid-template-columns: 1fr;\r\n        gap: 1rem;\n}\n.header-title[data-v-0ed3bb51] {\r\n        font-size: 2rem;\n}\n.actions-section[data-v-0ed3bb51] {\r\n        justify-content: stretch;\n}\n.professional-btn[data-v-0ed3bb51] {\r\n        flex: 1;\r\n        justify-content: center;\n}\r\n    \r\n    /* Table adjustments for medium screens */\n.professional-table[data-v-0ed3bb51] {\r\n        font-size: 0.9rem;\r\n        min-width: 700px;\n}\n.professional-table thead th[data-v-0ed3bb51],\r\n    .professional-table tbody td[data-v-0ed3bb51],\r\n    .professional-table tfoot th[data-v-0ed3bb51] {\r\n        padding: 1rem 0.75rem;\n}\n}\n@media (max-width: 900px) {\r\n    /* Show mobile cards, hide desktop table */\n.desktop-table[data-v-0ed3bb51] {\r\n        display: none;\n}\n.mobile-cards-container[data-v-0ed3bb51] {\r\n        display: block;\r\n        padding: 0 0.5rem;\n}\n}\n@media (max-width: 768px) {\n.reports-container[data-v-0ed3bb51] {\r\n        padding: 1rem;\n}\n.professional-header[data-v-0ed3bb51],\r\n    .filters-section[data-v-0ed3bb51] {\r\n        border-radius: 16px;\r\n        padding: 1.5rem;\n}\n.professional-report-container[data-v-0ed3bb51] {\r\n        border-radius: 16px;\n}\n.header-title[data-v-0ed3bb51] {\r\n        font-size: 1.8rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 0.5rem;\n}\n.report-header[data-v-0ed3bb51] {\r\n        padding: 1.5rem 1rem;\n}\n.report-title[data-v-0ed3bb51] {\r\n        font-size: 1.5rem;\r\n        flex-direction: column;\r\n        gap: 0.5rem;\n}\n.table-controls[data-v-0ed3bb51] {\r\n        padding: 1rem;\n}\n.search-container[data-v-0ed3bb51] {\r\n        max-width: 100%;\n}\r\n    \r\n    /* Mobile card adjustments */\n.abono-card[data-v-0ed3bb51] {\r\n        margin-bottom: 1rem;\r\n        padding: 1.25rem;\r\n        border-radius: 14px;\n}\n.card-header[data-v-0ed3bb51] {\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        align-items: stretch;\r\n        margin-bottom: 1.25rem;\n}\n.client-info[data-v-0ed3bb51] {\r\n        justify-content: center;\r\n        text-align: center;\n}\n.client-name-mobile[data-v-0ed3bb51] {\r\n        font-size: 1rem;\r\n        text-align: center;\n}\n.invoice-badge[data-v-0ed3bb51] {\r\n        align-self: center;\r\n        font-size: 0.85rem;\n}\n.info-row[data-v-0ed3bb51] {\r\n        grid-template-columns: 1fr;\r\n        gap: 0.75rem;\n}\n.info-item[data-v-0ed3bb51] {\r\n        padding: 0.875rem;\n}\n.info-icon[data-v-0ed3bb51] {\r\n        width: 32px;\r\n        height: 32px;\r\n        font-size: 0.8rem;\n}\n.info-value[data-v-0ed3bb51] {\r\n        font-size: 0.95rem;\n}\n.abono-highlight[data-v-0ed3bb51] {\r\n        padding: 1.25rem;\r\n        gap: 0.875rem;\n}\n.abono-icon[data-v-0ed3bb51] {\r\n        width: 45px;\r\n        height: 45px;\r\n        font-size: 1.1rem;\n}\n.abono-amount[data-v-0ed3bb51] {\r\n        font-size: 1.35rem;\n}\n.mobile-total-card[data-v-0ed3bb51] {\r\n        padding: 1.5rem;\r\n        margin-top: 1.25rem;\n}\n.total-title[data-v-0ed3bb51] {\r\n        font-size: 1.1rem;\n}\n.total-amount-mobile[data-v-0ed3bb51] {\r\n        font-size: 1.75rem;\r\n        padding: 0.875rem 1.5rem;\n}\n}\n@media (max-width: 480px) {\n.reports-container[data-v-0ed3bb51] {\r\n        padding: 0.75rem;\n}\n.professional-header[data-v-0ed3bb51],\r\n    .filters-section[data-v-0ed3bb51] {\r\n        padding: 1.25rem;\n}\n.header-title[data-v-0ed3bb51] {\r\n        font-size: 1.6rem;\n}\n.report-title[data-v-0ed3bb51] {\r\n        font-size: 1.3rem;\n}\n.summary-cards[data-v-0ed3bb51] {\r\n        gap: 0.75rem;\n}\n.summary-card[data-v-0ed3bb51] {\r\n        padding: 1.25rem;\n}\n.summary-icon[data-v-0ed3bb51] {\r\n        width: 50px;\r\n        height: 50px;\r\n        font-size: 1.25rem;\n}\n.summary-value[data-v-0ed3bb51] {\r\n        font-size: 1.6rem;\n}\n.abono-card[data-v-0ed3bb51] {\r\n        padding: 1rem;\r\n        margin-bottom: 0.875rem;\n}\n.client-name-mobile[data-v-0ed3bb51] {\r\n        font-size: 0.95rem;\n}\n.abono-amount[data-v-0ed3bb51] {\r\n        font-size: 1.25rem;\n}\n.total-amount-mobile[data-v-0ed3bb51] {\r\n        font-size: 1.5rem;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_style_index_0_id_0ed3bb51_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_style_index_0_id_0ed3bb51_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_style_index_0_id_0ed3bb51_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=template&id=0ed3bb51&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=template&id=0ed3bb51&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "reports-container"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "filters-section"
  }, [_c("div", {
    staticClass: "date-filters"
  }, [_c("div", {
    staticClass: "date-group"
  }, [_c("label", {
    staticClass: "filter-label"
  }, [_vm._v("Fecha Inicial")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.reporte.fecha_i,
      expression: "reporte.fecha_i"
    }],
    staticClass: "date-input",
    "class": {
      "is-invalid": _vm.fechaFinalInvalida && _vm.reporte.fecha_i
    },
    attrs: {
      type: "date"
    },
    domProps: {
      value: _vm.reporte.fecha_i
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.reporte, "fecha_i", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "date-group"
  }, [_c("label", {
    staticClass: "filter-label"
  }, [_vm._v("Fecha Final")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.reporte.fecha_f,
      expression: "reporte.fecha_f"
    }],
    staticClass: "date-input",
    "class": {
      "is-invalid": _vm.fechaFinalInvalida
    },
    attrs: {
      type: "date"
    },
    domProps: {
      value: _vm.reporte.fecha_f
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.reporte, "fecha_f", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.fechaFinalInvalida ? _c("div", {
    staticClass: "invalid-feedback"
  }, [_vm._v("\n                        La fecha final no puede ser menor a la fecha inicial\n                    ")]) : _vm._e()])]), _vm._v(" "), _c("div", {
    staticClass: "actions-section"
  }, [_c("button", {
    staticClass: "professional-btn btn-primary",
    attrs: {
      disabled: _vm.loader || _vm.fechaFinalInvalida
    },
    on: {
      click: _vm.buscarCobros
    }
  }, [!_vm.loader ? _c("i", {
    staticClass: "fas fa-search"
  }) : _vm._e(), _vm._v(" "), _vm.loader ? _c("div", {
    staticClass: "spinner-mini"
  }) : _vm._e(), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.loader ? "Buscando..." : "Buscar Abonos"))])])])]), _vm._v(" "), _vm.loader ? _c("div", {
    staticClass: "loading-section"
  }, [_vm._m(1)]) : _vm._e(), _vm._v(" "), !_vm.loader && _vm.cobros.length > 0 ? _c("div", {
    staticClass: "reports-content"
  }, [_c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "report-header"
  }, [_c("div", {
    staticClass: "report-info"
  }, [_vm._m(2), _vm._v(" "), _c("div", {
    staticClass: "report-details"
  }, [_c("span", {
    staticClass: "report-period"
  }, [_vm._v("\n                                " + _vm._s(_vm.formatDateRange()) + "\n                            ")]), _vm._v(" "), _c("div", {
    staticClass: "summary-cards"
  }, [_c("div", {
    staticClass: "summary-card total-card"
  }, [_vm._m(3), _vm._v(" "), _c("div", {
    staticClass: "summary-content"
  }, [_c("h4", {
    staticClass: "summary-title"
  }, [_vm._v("Total Abonos")]), _vm._v(" "), _c("p", {
    staticClass: "summary-value"
  }, [_vm._v(_vm._s(_vm._f("currency")(_vm.totalAbono)))])])]), _vm._v(" "), _c("div", {
    staticClass: "summary-card count-card"
  }, [_vm._m(4), _vm._v(" "), _c("div", {
    staticClass: "summary-content"
  }, [_c("h4", {
    staticClass: "summary-title"
  }, [_vm._v("Registros")]), _vm._v(" "), _c("p", {
    staticClass: "summary-value"
  }, [_vm._v(_vm._s(_vm.cobros.length))])])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "table-controls"
  }, [_c("div", {
    staticClass: "search-container"
  }, [_c("i", {
    staticClass: "fas fa-search search-icon"
  }), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    staticClass: "search-input",
    attrs: {
      placeholder: "Buscar en la tabla..."
    },
    domProps: {
      value: _vm.search
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.search = $event.target.value;
      }
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "table-responsive professional-table-wrapper desktop-table"
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(5), _vm._v(" "), _c("tbody", _vm._l(_vm.filteredCobros, function (item, index) {
    return _c("tr", {
      key: index,
      staticClass: "data-row"
    }, [_c("td", {
      staticClass: "text-left client-cell"
    }, [_c("span", {
      staticClass: "client-name"
    }, [_vm._v(_vm._s(item.cliente))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center invoice-cell"
    }, [_c("span", {
      staticClass: "invoice-number"
    }, [_vm._v(_vm._s(item.num_factura))])]), _vm._v(" "), _c("td", {
      staticClass: "text-right amount-cell"
    }, [_c("span", {
      staticClass: "amount-value"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.valor)))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center date-cell"
    }, [_c("span", {
      staticClass: "date-value"
    }, [_vm._v(_vm._s(item.fecha))])]), _vm._v(" "), _c("td", {
      staticClass: "text-right amount-cell"
    }, [_c("span", {
      staticClass: "amount-value abono-value"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.valor_abono)))])])]);
  }), 0), _vm._v(" "), _c("tfoot", [_c("tr", {
    staticClass: "total-row"
  }, [_vm._m(6), _vm._v(" "), _c("th", {
    staticClass: "total-amount"
  }, [_c("span", {
    staticClass: "final-total"
  }, [_vm._v(_vm._s(_vm._f("currency")(_vm.totalAbono)))])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "mobile-cards-container"
  }, [_vm._l(_vm.filteredCobros, function (item, index) {
    return _c("div", {
      key: index,
      staticClass: "abono-card"
    }, [_c("div", {
      staticClass: "card-header"
    }, [_c("div", {
      staticClass: "client-info"
    }, [_c("i", {
      staticClass: "fas fa-user client-icon"
    }), _vm._v(" "), _c("span", {
      staticClass: "client-name-mobile"
    }, [_vm._v(_vm._s(item.cliente))])]), _vm._v(" "), _c("div", {
      staticClass: "invoice-badge"
    }, [_c("i", {
      staticClass: "fas fa-file-invoice"
    }), _vm._v("\n                                " + _vm._s(item.num_factura) + "\n                            ")])]), _vm._v(" "), _c("div", {
      staticClass: "card-body"
    }, [_c("div", {
      staticClass: "info-row"
    }, [_c("div", {
      staticClass: "info-item"
    }, [_c("i", {
      staticClass: "fas fa-dollar-sign info-icon"
    }), _vm._v(" "), _c("div", {
      staticClass: "info-content"
    }, [_c("span", {
      staticClass: "info-label"
    }, [_vm._v("Valor Factura")]), _vm._v(" "), _c("span", {
      staticClass: "info-value"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.valor)))])])]), _vm._v(" "), _c("div", {
      staticClass: "info-item"
    }, [_c("i", {
      staticClass: "fas fa-calendar-alt info-icon"
    }), _vm._v(" "), _c("div", {
      staticClass: "info-content"
    }, [_c("span", {
      staticClass: "info-label"
    }, [_vm._v("Fecha Abono")]), _vm._v(" "), _c("span", {
      staticClass: "info-value"
    }, [_vm._v(_vm._s(item.fecha))])])])]), _vm._v(" "), _c("div", {
      staticClass: "abono-highlight"
    }, [_c("i", {
      staticClass: "fas fa-credit-card abono-icon"
    }), _vm._v(" "), _c("div", {
      staticClass: "abono-content"
    }, [_c("span", {
      staticClass: "abono-label"
    }, [_vm._v("Valor Abono")]), _vm._v(" "), _c("span", {
      staticClass: "abono-amount"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.valor_abono)))])])])])]);
  }), _vm._v(" "), _c("div", {
    staticClass: "mobile-total-card"
  }, [_vm._m(7), _vm._v(" "), _c("div", {
    staticClass: "total-amount-mobile"
  }, [_vm._v(_vm._s(_vm._f("currency")(_vm.totalAbono)))])])], 2)])]) : _vm._e()])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "professional-header"
  }, [_c("div", {
    staticClass: "header-content"
  }, [_c("div", {
    staticClass: "header-left"
  }, [_c("h1", {
    staticClass: "header-title"
  }, [_c("i", {
    staticClass: "fas fa-credit-card header-icon"
  }), _vm._v("\n                        Reportes de Abonos\n                    ")]), _vm._v(" "), _c("p", {
    staticClass: "header-subtitle"
  }, [_vm._v("\n                        Consulta y analiza los abonos realizados por período de fechas\n                    ")])])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "loader-container"
  }, [_c("div", {
    staticClass: "spinner-professional"
  }), _vm._v(" "), _c("h3", {
    staticClass: "loader-title"
  }, [_vm._v("Generando reporte de abonos")]), _vm._v(" "), _c("p", {
    staticClass: "loader-subtitle"
  }, [_vm._v("Procesando información de pagos del período seleccionado...")]), _vm._v(" "), _c("div", {
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h3", {
    staticClass: "report-title"
  }, [_c("i", {
    staticClass: "fas fa-file-invoice-dollar report-icon"
  }), _vm._v("\n                            Reporte de Abonos\n                        ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "summary-icon"
  }, [_c("i", {
    staticClass: "fas fa-dollar-sign"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "summary-icon"
  }, [_c("i", {
    staticClass: "fas fa-list-ol"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", {
    staticClass: "text-left"
  }, [_c("i", {
    staticClass: "fas fa-user"
  }), _vm._v("\n                                    Cliente\n                                ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fas fa-file-invoice"
  }), _vm._v("\n                                    No. Factura\n                                ")]), _vm._v(" "), _c("th", {
    staticClass: "text-right"
  }, [_c("i", {
    staticClass: "fas fa-dollar-sign"
  }), _vm._v("\n                                    Valor Factura\n                                ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fas fa-calendar-alt"
  }), _vm._v("\n                                    Fecha Abono\n                                ")]), _vm._v(" "), _c("th", {
    staticClass: "text-right"
  }, [_c("i", {
    staticClass: "fas fa-credit-card"
  }), _vm._v("\n                                    Valor Abono\n                                ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("th", {
    staticClass: "total-label",
    attrs: {
      colspan: "4"
    }
  }, [_c("i", {
    staticClass: "fas fa-calculator"
  }), _vm._v(" "), _c("strong", [_vm._v("Total de Abonos:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "total-header"
  }, [_c("i", {
    staticClass: "fas fa-calculator total-icon"
  }), _vm._v(" "), _c("span", {
    staticClass: "total-title"
  }, [_vm._v("Total de Abonos")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/ReportesAbonos.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/ReportesAbonos.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReportesAbonos_vue_vue_type_template_id_0ed3bb51_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReportesAbonos.vue?vue&type=template&id=0ed3bb51&scoped=true */ "./resources/js/components/ReportesAbonos.vue?vue&type=template&id=0ed3bb51&scoped=true");
/* harmony import */ var _ReportesAbonos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReportesAbonos.vue?vue&type=script&lang=js */ "./resources/js/components/ReportesAbonos.vue?vue&type=script&lang=js");
/* harmony import */ var _ReportesAbonos_vue_vue_type_style_index_0_id_0ed3bb51_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css */ "./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ReportesAbonos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReportesAbonos_vue_vue_type_template_id_0ed3bb51_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ReportesAbonos_vue_vue_type_template_id_0ed3bb51_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0ed3bb51",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/ReportesAbonos.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ReportesAbonos.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/ReportesAbonos.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReportesAbonos.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_style_index_0_id_0ed3bb51_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=style&index=0&id=0ed3bb51&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/ReportesAbonos.vue?vue&type=template&id=0ed3bb51&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/ReportesAbonos.vue?vue&type=template&id=0ed3bb51&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_template_id_0ed3bb51_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_template_id_0ed3bb51_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportesAbonos_vue_vue_type_template_id_0ed3bb51_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReportesAbonos.vue?vue&type=template&id=0ed3bb51&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReportesAbonos.vue?vue&type=template&id=0ed3bb51&scoped=true");


/***/ })

}]);