"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-ReporteVentas-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
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
      clientes: [],
      headers: [{
        text: 'Cliente',
        value: 'cliente'
      }, {
        text: 'Fecha',
        value: 'fecha'
      }, {
        text: 'Valor',
        value: 'valor'
      }, {
        text: 'Estado',
        value: 'estado'
      }],
      reporte: {
        fecha_i: null,
        fecha_f: null
      },
      ventas: [],
      loader: false,
      fechaFinalInvalida: false,
      paginaActual: 1,
      registrosPorPagina: 25,
      opcionesPorPagina: [10, 25, 50, 100]
    };
  },
  computed: {
    totalPaginas: function totalPaginas() {
      return Math.max(1, Math.ceil(this.ventas.length / this.registrosPorPagina));
    },
    ventasPaginadas: function ventasPaginadas() {
      var inicio = (this.paginaActual - 1) * this.registrosPorPagina;
      return this.ventas.slice(inicio, inicio + this.registrosPorPagina);
    },
    rangoPaginacion: function rangoPaginacion() {
      if (this.ventas.length === 0) {
        return {
          inicio: 0,
          fin: 0
        };
      }
      var inicio = (this.paginaActual - 1) * this.registrosPorPagina + 1;
      return {
        inicio: inicio,
        fin: Math.min(inicio + this.registrosPorPagina - 1, this.ventas.length)
      };
    },
    paginasVisibles: function paginasVisibles() {
      if (this.totalPaginas <= 7) {
        return Array.from({
          length: this.totalPaginas
        }, function (_, index) {
          return index + 1;
        });
      }
      var paginas = [1];
      var desde = Math.max(2, this.paginaActual - 2);
      var hasta = Math.min(this.totalPaginas - 1, this.paginaActual + 2);
      if (desde > 2) paginas.push('...');
      for (var pagina = desde; pagina <= hasta; pagina++) paginas.push(pagina);
      if (hasta < this.totalPaginas - 1) paginas.push('...');
      paginas.push(this.totalPaginas);
      return paginas;
    }
  },
  mounted: function mounted() {},
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
    generarReporteVentas: function generarReporteVentas() {
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
      this.ventas = [];
      this.paginaActual = 1;
      this.loader = true;
      axios.post('/reportes-ventas', this.reporte).then(function (res) {
        console.log(res.data);
        if (res.data.length > 0) {
          res.data.map(function (el) {
            _this.ventas.push({
              cliente: el.clientes.razon_social,
              fecha: el.fecha_factura,
              valor: el.valor,
              estado: el.estado.estado
            });
          });
        } else {
          _this.ventas = [];
        }
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
    calcularTotalVentas: function calcularTotalVentas() {
      return this.ventas.reduce(function (total, venta) {
        return total + parseFloat(venta.valor || 0);
      }, 0);
    },
    irPagina: function irPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
      }
    },
    cambiarRegistrosPorPagina: function cambiarRegistrosPorPagina() {
      this.paginaActual = 1;
    },
    formatearFecha: function formatearFecha(fecha) {
      if (!fecha) return '';
      var date = new Date(fecha);
      return date.toLocaleDateString('es-ES');
    },
    getStatusClass: function getStatusClass(estado) {
      var estados = {
        'PAGADO': 'status-success',
        'PENDIENTE': 'status-warning',
        'CANCELADO': 'status-danger',
        'ANULADO': 'status-danger'
      };
      return estados[estado === null || estado === void 0 ? void 0 : estado.toUpperCase()] || 'status-default';
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Professional Container */\n.reporte-ventas-container[data-v-61d9545d] {\r\n    min-height: 100vh;\r\n    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\r\n    padding: 2rem;\n}\r\n\r\n/* Professional Loading */\n.loading-container[data-v-61d9545d] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-height: 400px;\r\n    padding: 40px 20px;\r\n    background: linear-gradient(135deg, #17a2b820 0%, #13849620 100%);\r\n    border-radius: 12px;\r\n    backdrop-filter: blur(10px);\r\n    border: 1px solid rgba(255, 255, 255, 0.3);\n}\n.loading-content[data-v-61d9545d] {\r\n    text-align: center;\r\n    max-width: 300px;\n}\n.professional-loader[data-v-61d9545d] {\r\n    position: relative;\r\n    display: inline-block;\r\n    margin-bottom: 30px;\n}\n.loader-spinner[data-v-61d9545d] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border: 4px solid rgba(102, 126, 234, 0.1);\r\n    border-left: 4px solid #17a2b8;\r\n    border-radius: 50%;\r\n    animation: spin-61d9545d 1s linear infinite;\r\n    position: relative;\r\n    z-index: 2;\n}\n.loader-pulse[data-v-61d9545d] {\r\n    position: absolute;\r\n    top: -10px;\r\n    left: -10px;\r\n    width: 80px;\r\n    height: 80px;\r\n    border: 2px solid rgba(102, 126, 234, 0.3);\r\n    border-radius: 50%;\r\n    animation: pulse-61d9545d 2s ease-in-out infinite;\r\n    z-index: 1;\n}\n@keyframes spin-61d9545d {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes pulse-61d9545d {\n0% { transform: scale(0.8); opacity: 1;\n}\n50% { transform: scale(1.2); opacity: 0.5;\n}\n100% { transform: scale(0.8); opacity: 1;\n}\n}\n.loading-title[data-v-61d9545d] {\r\n    color: #2c3e50;\r\n    font-size: 1.4rem;\r\n    font-weight: 700;\r\n    margin-bottom: 8px;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\n}\n.loading-subtitle[data-v-61d9545d] {\r\n    color: #6c757d;\r\n    font-size: 0.95rem;\r\n    font-weight: 400;\r\n    margin: 0 0 2rem 0;\r\n    line-height: 1.4;\n}\n.loading-progress[data-v-61d9545d] {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 4px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.progress-bar[data-v-61d9545d] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #17a2b8, #138496);\r\n    border-radius: 2px;\r\n    animation: progress-61d9545d 2s ease-in-out infinite;\n}\n@keyframes progress-61d9545d {\n0% { transform: translateX(-100%);\n}\n50% { transform: translateX(0%);\n}\n100% { transform: translateX(100%);\n}\n}\r\n\r\n/* Header Section */\n.reporte-content[data-v-61d9545d] {\r\n    max-width: 1400px;\r\n    margin: 0 auto;\n}\n.header-section[data-v-61d9545d] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2.5rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.page-header h2[data-v-61d9545d] {\r\n    color: #2c3e50;\r\n    font-size: 2.5rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.5rem 0;\r\n    display: flex;\r\n    align-items: center;\n}\n.page-header h2 i[data-v-61d9545d] {\r\n    color: #17a2b8;\n}\n.page-description[data-v-61d9545d] {\r\n    color: #64748b;\r\n    font-size: 1.1rem;\r\n    margin: 0;\r\n    line-height: 1.6;\n}\r\n\r\n/* Filters Section */\n.filters-section[data-v-61d9545d] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    overflow: hidden;\n}\n.filters-header[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\r\n    padding: 20px 30px;\r\n    border-bottom: 1px solid #e9ecef;\n}\n.filters-title[data-v-61d9545d] {\r\n    color: #2c3e50;\r\n    font-weight: 600;\r\n    margin-bottom: 0;\r\n    font-size: 1.1rem;\n}\n.filters-content[data-v-61d9545d] {\r\n    padding: 2rem;\n}\n.date-filters[data-v-61d9545d] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 2rem;\r\n    margin-bottom: 2rem;\n}\n.date-group[data-v-61d9545d] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.75rem;\n}\n.filter-label[data-v-61d9545d] {\r\n    font-weight: 600;\r\n    color: #2c3e50;\r\n    margin-bottom: 10px;\r\n    font-size: 0.9rem;\r\n    display: flex;\r\n    align-items: center;\n}\n.filter-label i[data-v-61d9545d] {\r\n    color: #17a2b8;\n}\n.date-input[data-v-61d9545d] {\r\n    height: 56px;\r\n    padding: 1rem 1.25rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);\r\n    color: #374151;\r\n    font-weight: 500;\r\n    outline: none;\r\n    cursor: pointer;\r\n    box-sizing: border-box;\r\n    transition: all 0.3s ease;\r\n    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);\n}\n.date-input[data-v-61d9545d]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), inset 0 2px 4px rgba(0,0,0,0.05);\r\n    background: #ffffff;\n}\n.date-input.is-invalid[data-v-61d9545d] {\r\n    border-color: #dc3545;\r\n    background: linear-gradient(145deg, #fff5f5 0%, #ffeaea 100%);\r\n    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n}\n.date-input.is-invalid[data-v-61d9545d]:focus {\r\n    border-color: #dc3545;\r\n    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);\n}\n.invalid-feedback[data-v-61d9545d] {\r\n    display: block;\r\n    width: 100%;\r\n    margin-top: 8px;\r\n    font-size: 0.85rem;\r\n    color: #dc3545;\r\n    font-weight: 600;\r\n    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);\r\n    padding: 10px 15px;\r\n    border-radius: 10px;\r\n    border: 1px solid rgba(220, 53, 69, 0.2);\r\n    display: flex;\r\n    align-items: center;\r\n    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);\n}\n.invalid-feedback[data-v-61d9545d]::before {\r\n    content: '⚠️';\r\n    margin-right: 10px;\r\n    font-size: 1rem;\n}\r\n\r\n/* Actions Section */\n.actions-section[data-v-61d9545d] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    justify-content: flex-start;\n}\n.professional-btn[data-v-61d9545d] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem 2rem;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    text-decoration: none;\r\n    position: relative;\r\n    overflow: hidden;\n}\n.professional-btn[data-v-61d9545d]:disabled {\r\n    opacity: 0.7;\r\n    cursor: not-allowed;\n}\n.btn-primary[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);\n}\n.btn-primary[data-v-61d9545d]:hover:not(:disabled) {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);\r\n    color: white;\n}\r\n\r\n/* Results Section */\n.results-section[data-v-61d9545d] {\r\n    animation: fadeInUp-61d9545d 0.6s ease-out;\n}\n.professional-report-container[data-v-61d9545d] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    overflow: hidden;\r\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.report-header[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    padding: 2rem 2.5rem;\r\n    border-bottom: 2px solid #e5e7eb;\n}\n.report-info[data-v-61d9545d] {\r\n    width: 100%;\n}\n.report-title[data-v-61d9545d] {\r\n    font-size: 1.8rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    margin: 0 0 1.5rem 0;\r\n    display: flex;\r\n    align-items: center;\n}\n.report-title i[data-v-61d9545d] {\r\n    color: #17a2b8;\n}\n.report-summary[data-v-61d9545d] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 2rem;\n}\n.summary-card[data-v-61d9545d] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    transition: all 0.3s ease;\n}\n.summary-card[data-v-61d9545d]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.summary-card:first-child .summary-icon[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\n}\n.summary-card:last-child .summary-icon[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\n}\n.summary-icon[data-v-61d9545d] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.5rem;\n}\n.summary-content[data-v-61d9545d] {\r\n    flex: 1;\n}\n.summary-title[data-v-61d9545d] {\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    margin: 0 0 0.5rem 0;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.summary-value[data-v-61d9545d] {\r\n    font-size: 1.8rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    margin: 0;\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-61d9545d] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-61d9545d] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\r\n    min-width: 800px;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #17a2b8;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.professional-table thead th i[data-v-61d9545d] {\r\n    color: #17a2b8;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-61d9545d] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\r\n    background: rgba(255, 255, 255, 0.8);\r\n    backdrop-filter: blur(10px);\n}\n.professional-table tbody tr[data-v-61d9545d]:hover {\r\n    background: rgba(102, 126, 234, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-61d9545d] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.client-cell[data-v-61d9545d] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.client-info[data-v-61d9545d] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\n}\n.client-icon[data-v-61d9545d] {\r\n    color: #17a2b8;\r\n    font-size: 1rem;\r\n    width: 20px;\r\n    text-align: center;\n}\n.client-name[data-v-61d9545d] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 1rem;\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\n}\n.date-cell[data-v-61d9545d] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.date-badge[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #fff3e0 0%, #ffcc02 20%);\r\n    color: #f57c00;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    border: 1px solid rgba(245, 124, 0, 0.2);\n}\n.amount-cell[data-v-61d9545d] {\r\n    font-weight: 600;\r\n    font-family: 'Courier New', monospace;\n}\n.amount-value[data-v-61d9545d] {\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    border: 1px solid #93c5fd;\r\n    font-size: 1.05rem;\r\n    color: #059669;\r\n    background: rgba(16, 185, 129, 0.1);\r\n    border: 2px solid #10b981;\n}\n.status-cell[data-v-61d9545d] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.status-badge[data-v-61d9545d] {\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 12px;\r\n    font-weight: 700;\r\n    font-size: 0.8rem;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.status-success[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);\r\n    color: #155724;\r\n    border: 1px solid rgba(40, 167, 69, 0.2);\n}\n.status-warning[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);\r\n    color: #856404;\r\n    border: 1px solid rgba(255, 193, 7, 0.2);\n}\n.status-danger[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);\r\n    color: #721c24;\r\n    border: 1px solid rgba(220, 53, 69, 0.2);\n}\n.status-default[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\r\n    color: #495057;\r\n    border: 1px solid rgba(108, 117, 125, 0.2);\n}\r\n\r\n/* Table Footer */\n.professional-table tfoot[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);\r\n    color: white;\n}\n.professional-table tfoot th[data-v-61d9545d] {\r\n    padding: 1.5rem 1rem;\r\n    color: white;\r\n    font-weight: 700;\r\n    font-size: 1.1rem;\n}\n.total-label[data-v-61d9545d] {\r\n    text-align: center;\n}\n.total-label i[data-v-61d9545d] {\r\n    margin-right: 0.5rem;\r\n    color: #fbbf24;\n}\n.final-total[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);\r\n    color: #1e293b;\r\n    padding: 0.75rem 1.25rem;\r\n    border-radius: 10px;\r\n    font-weight: 800;\r\n    font-size: 1.25rem;\r\n    box-shadow: 0 5px 15px rgba(251, 191, 36, 0.4);\r\n    border: 2px solid #fbbf24;\r\n    font-family: 'Courier New', monospace;\n}\n.count-badge[data-v-61d9545d] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    padding: 0.75rem 1.25rem;\r\n    border-radius: 10px;\r\n    font-weight: 800;\r\n    font-size: 1rem;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);\r\n    border: 2px solid #3b82f6;\n}\r\n\r\n/* No Data State */\n.no-data-section[data-v-61d9545d] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-height: 300px;\r\n    padding: 3rem 2rem;\n}\n.no-data-container[data-v-61d9545d] {\r\n    text-align: center;\r\n    max-width: 400px;\n}\n.no-data-icon[data-v-61d9545d] {\r\n    width: 80px;\r\n    height: 80px;\r\n    border-radius: 50%;\r\n    background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin: 0 auto 1.5rem;\r\n    color: #9ca3af;\r\n    font-size: 2rem;\n}\n.no-data-title[data-v-61d9545d] {\r\n    color: #374151;\r\n    font-size: 1.5rem;\r\n    font-weight: 700;\r\n    margin: 0 0 1rem 0;\n}\n.no-data-description[data-v-61d9545d] {\n    color: #6b7280;\r\n    font-size: 1rem;\r\n    margin: 0;\r\n    line-height: 1.5;\n}\n\n/* Pagination */\n.pagination-section[data-v-61d9545d] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 1rem;\n    padding: 1.25rem 1.5rem;\n    background: #ffffff;\n    border-top: 1px solid #e5e7eb;\n}\n.pagination-summary[data-v-61d9545d],\n.pagination-controls[data-v-61d9545d],\n.pagination-pages[data-v-61d9545d] {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n}\n.pagination-summary[data-v-61d9545d] {\n    color: #64748b;\n    font-size: 0.9rem;\n    font-weight: 600;\n}\n.pagination-select[data-v-61d9545d] {\n    min-width: 72px;\n    height: 40px;\n    padding: 0 0.75rem;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    background: #ffffff;\n    color: #334155;\n    font-weight: 700;\n    cursor: pointer;\n}\n.pagination-select[data-v-61d9545d]:focus {\n    outline: none;\n    border-color: #17a2b8;\n    box-shadow: 0 0 0 3px rgba(23, 162, 184, 0.15);\n}\n.pagination-range[data-v-61d9545d] {\n    margin-left: 0.75rem;\n    padding-left: 0.75rem;\n    border-left: 1px solid #cbd5e1;\n}\n.pagination-btn[data-v-61d9545d],\n.pagination-page[data-v-61d9545d] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-height: 40px;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    background: #ffffff;\n    color: #334155;\n    font-weight: 700;\n    cursor: pointer;\n    transition: all 0.2s ease;\n}\n.pagination-btn[data-v-61d9545d] {\n    gap: 0.5rem;\n    padding: 0.55rem 0.9rem;\n}\n.pagination-page[data-v-61d9545d] {\n    min-width: 40px;\n    padding: 0.55rem;\n}\n.pagination-btn[data-v-61d9545d]:hover:not(:disabled),\n.pagination-page[data-v-61d9545d]:hover:not(:disabled),\n.pagination-page.active[data-v-61d9545d] {\n    border-color: #17a2b8;\n    background: #17a2b8;\n    color: #ffffff;\n    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.25);\n}\n.pagination-btn[data-v-61d9545d]:disabled,\n.pagination-page[data-v-61d9545d]:disabled {\n    opacity: 0.45;\n    cursor: not-allowed;\n}\n.pagination-page.ellipsis[data-v-61d9545d] {\n    border-color: transparent;\n    background: transparent;\n    box-shadow: none;\n    color: #64748b;\n}\n\r\n/* Animations */\n@keyframes fadeInUp-61d9545d {\nfrom {\r\n        opacity: 0;\r\n        transform: translateY(30px);\n}\nto {\r\n        opacity: 1;\r\n        transform: translateY(0);\n}\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 1024px) {\n.date-filters[data-v-61d9545d] {\r\n        grid-template-columns: 1fr;\r\n        gap: 1.5rem;\n}\n.report-summary[data-v-61d9545d] {\r\n        grid-template-columns: 1fr;\r\n        gap: 1rem;\n}\n.page-header h2[data-v-61d9545d] {\r\n        font-size: 2rem;\n}\n.actions-section[data-v-61d9545d] {\r\n        justify-content: stretch;\n}\n.professional-btn[data-v-61d9545d] {\r\n        flex: 1;\r\n        justify-content: center;\n}\n}\n@media (max-width: 768px) {\n.reporte-ventas-container[data-v-61d9545d] {\r\n        padding: 1rem;\n}\n.header-section[data-v-61d9545d],\r\n    .filters-section[data-v-61d9545d] {\r\n        border-radius: 16px;\r\n        padding: 1.5rem;\n}\n.professional-report-container[data-v-61d9545d] {\r\n        border-radius: 16px;\n}\n.page-header h2[data-v-61d9545d] {\r\n        font-size: 1.8rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 0.5rem;\n}\n.report-header[data-v-61d9545d] {\r\n        padding: 1.5rem 1rem;\n}\n.report-title[data-v-61d9545d] {\r\n        font-size: 1.5rem;\r\n        flex-direction: column;\r\n        gap: 0.5rem;\n}\n.professional-table[data-v-61d9545d] {\r\n        font-size: 0.85rem;\r\n        min-width: 700px;\n}\n.professional-table thead th[data-v-61d9545d],\n    .professional-table tbody td[data-v-61d9545d],\r\n    .professional-table tfoot th[data-v-61d9545d] {\r\n        padding: 0.875rem 0.5rem;\n}\n.pagination-section[data-v-61d9545d],\n    .pagination-summary[data-v-61d9545d],\n    .pagination-controls[data-v-61d9545d] {\n        justify-content: center;\n        width: 100%;\n}\n.pagination-controls[data-v-61d9545d] {\n        flex-wrap: wrap;\n}\n}\n@media (max-width: 480px) {\n.reporte-ventas-container[data-v-61d9545d] {\r\n        padding: 0.75rem;\n}\n.header-section[data-v-61d9545d],\r\n    .filters-section[data-v-61d9545d] {\r\n        padding: 1.25rem;\n}\n.page-header h2[data-v-61d9545d] {\r\n        font-size: 1.6rem;\n}\n.report-title[data-v-61d9545d] {\r\n        font-size: 1.3rem;\n}\n.summary-card[data-v-61d9545d] {\r\n        padding: 1.25rem;\n}\n.summary-icon[data-v-61d9545d] {\r\n        width: 50px;\r\n        height: 50px;\r\n        font-size: 1.25rem;\n}\n.summary-value[data-v-61d9545d] {\r\n        font-size: 1.6rem;\n}\n.professional-table[data-v-61d9545d] {\r\n        min-width: 600px;\r\n        font-size: 0.8rem;\n}\n.professional-table thead th[data-v-61d9545d],\n    .professional-table tbody td[data-v-61d9545d],\r\n    .professional-table tfoot th[data-v-61d9545d] {\r\n        padding: 0.75rem 0.25rem;\n}\n.pagination-summary[data-v-61d9545d] {\n        flex-wrap: wrap;\n}\n.pagination-range[data-v-61d9545d] {\n        width: 100%;\n        margin-left: 0;\n        padding-left: 0;\n        border-left: 0;\n        text-align: center;\n}\n.pagination-pages[data-v-61d9545d] {\n        order: 3;\n        width: 100%;\n        justify-content: center;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_style_index_0_id_61d9545d_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_style_index_0_id_61d9545d_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_style_index_0_id_61d9545d_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=template&id=61d9545d&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=template&id=61d9545d&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "reporte-ventas-container"
  }, [_vm.loader ? _c("div", {
    staticClass: "loading-container"
  }, [_vm._m(0)]) : _c("div", {
    staticClass: "reporte-content"
  }, [_vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "filters-section"
  }, [_vm._m(2), _vm._v(" "), _c("div", {
    staticClass: "filters-content"
  }, [_c("div", {
    staticClass: "date-filters"
  }, [_c("div", {
    staticClass: "date-group"
  }, [_vm._m(3), _vm._v(" "), _c("input", {
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
  }, [_vm._m(4), _vm._v(" "), _c("input", {
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
  }, [_vm._v("\n                                La fecha final no puede ser menor a la fecha inicial\n                            ")]) : _vm._e()])]), _vm._v(" "), _c("div", {
    staticClass: "actions-section"
  }, [_c("button", {
    staticClass: "professional-btn btn-primary",
    attrs: {
      disabled: _vm.fechaFinalInvalida
    },
    on: {
      click: _vm.generarReporteVentas
    }
  }, [_c("i", {
    staticClass: "fas fa-search mr-2"
  }), _vm._v("\n                            Generar Reporte\n                        ")])])])]), _vm._v(" "), _vm.ventas.length > 0 ? _c("div", {
    staticClass: "results-section"
  }, [_c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "report-header"
  }, [_c("div", {
    staticClass: "report-info"
  }, [_vm._m(5), _vm._v(" "), _c("div", {
    staticClass: "report-summary"
  }, [_c("div", {
    staticClass: "summary-card"
  }, [_vm._m(6), _vm._v(" "), _c("div", {
    staticClass: "summary-content"
  }, [_c("h4", {
    staticClass: "summary-title"
  }, [_vm._v("Total Registros")]), _vm._v(" "), _c("p", {
    staticClass: "summary-value"
  }, [_vm._v(_vm._s(_vm.ventas.length))])])]), _vm._v(" "), _c("div", {
    staticClass: "summary-card"
  }, [_vm._m(7), _vm._v(" "), _c("div", {
    staticClass: "summary-content"
  }, [_c("h4", {
    staticClass: "summary-title"
  }, [_vm._v("Total Ventas")]), _vm._v(" "), _c("p", {
    staticClass: "summary-value"
  }, [_vm._v(_vm._s(_vm._f("currency")(_vm.calcularTotalVentas())))])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "table-responsive professional-table-wrapper"
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(8), _vm._v(" "), _c("tbody", _vm._l(_vm.ventasPaginadas, function (item, index) {
    return _c("tr", {
      key: "".concat(item.cliente, "-").concat(item.fecha, "-").concat(index),
      staticClass: "data-row"
    }, [_c("td", {
      staticClass: "text-left client-cell"
    }, [_c("div", {
      staticClass: "client-info"
    }, [_c("i", {
      staticClass: "fas fa-user client-icon"
    }), _vm._v(" "), _c("span", {
      staticClass: "client-name"
    }, [_vm._v(_vm._s(item.cliente))])])]), _vm._v(" "), _c("td", {
      staticClass: "text-center date-cell"
    }, [_c("span", {
      staticClass: "date-badge"
    }, [_vm._v(_vm._s(_vm.formatearFecha(item.fecha)))])]), _vm._v(" "), _c("td", {
      staticClass: "text-right amount-cell"
    }, [_c("span", {
      staticClass: "amount-value"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.valor)))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center status-cell"
    }, [_c("span", {
      staticClass: "status-badge",
      "class": _vm.getStatusClass(item.estado)
    }, [_vm._v("\n                                            " + _vm._s(item.estado) + "\n                                        ")])])]);
  }), 0), _vm._v(" "), _c("tfoot", [_c("tr", {
    staticClass: "total-row"
  }, [_vm._m(9), _vm._v(" "), _c("th", {
    staticClass: "total-amount"
  }, [_c("span", {
    staticClass: "final-total"
  }, [_vm._v(_vm._s(_vm._f("currency")(_vm.calcularTotalVentas())))])]), _vm._v(" "), _c("th", {
    staticClass: "total-count"
  }, [_c("span", {
    staticClass: "count-badge"
  }, [_vm._v(_vm._s(_vm.ventas.length) + " registros")])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "pagination-section"
  }, [_c("div", {
    staticClass: "pagination-summary"
  }, [_c("label", {
    attrs: {
      "for": "ventas-per-page"
    }
  }, [_vm._v("Mostrar")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: _vm.registrosPorPagina,
      expression: "registrosPorPagina",
      modifiers: {
        number: true
      }
    }],
    staticClass: "pagination-select",
    attrs: {
      id: "ventas-per-page"
    },
    on: {
      change: [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return _vm._n(val);
        });
        _vm.registrosPorPagina = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, _vm.cambiarRegistrosPorPagina]
    }
  }, _vm._l(_vm.opcionesPorPagina, function (opcion) {
    return _c("option", {
      key: opcion,
      domProps: {
        value: opcion
      }
    }, [_vm._v("\n                                    " + _vm._s(opcion) + "\n                                ")]);
  }), 0), _vm._v(" "), _c("span", [_vm._v("registros")]), _vm._v(" "), _c("span", {
    staticClass: "pagination-range"
  }, [_vm._v("\n                                Mostrando " + _vm._s(_vm.rangoPaginacion.inicio) + "–" + _vm._s(_vm.rangoPaginacion.fin) + " de " + _vm._s(_vm.ventas.length) + "\n                            ")])]), _vm._v(" "), _c("nav", {
    staticClass: "pagination-controls",
    attrs: {
      "aria-label": "Paginaci&oacute;n del reporte de ventas"
    }
  }, [_c("button", {
    staticClass: "pagination-btn",
    attrs: {
      type: "button",
      disabled: _vm.paginaActual === 1
    },
    on: {
      click: function click($event) {
        return _vm.irPagina(_vm.paginaActual - 1);
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-chevron-left"
  }), _vm._v("\n                                Anterior\n                            ")]), _vm._v(" "), _c("div", {
    staticClass: "pagination-pages"
  }, _vm._l(_vm.paginasVisibles, function (pagina) {
    return _c("button", {
      key: "pagina-".concat(pagina),
      staticClass: "pagination-page",
      "class": {
        active: pagina === _vm.paginaActual,
        ellipsis: pagina === "..."
      },
      attrs: {
        type: "button",
        disabled: pagina === "..."
      },
      on: {
        click: function click($event) {
          pagina !== "..." && _vm.irPagina(pagina);
        }
      }
    }, [_vm._v("\n                                    " + _vm._s(pagina) + "\n                                ")]);
  }), 0), _vm._v(" "), _c("button", {
    staticClass: "pagination-btn",
    attrs: {
      type: "button",
      disabled: _vm.paginaActual === _vm.totalPaginas
    },
    on: {
      click: function click($event) {
        return _vm.irPagina(_vm.paginaActual + 1);
      }
    }
  }, [_vm._v("\n                                Siguiente\n                                "), _c("i", {
    staticClass: "fas fa-chevron-right"
  })])])])])]) : !_vm.loader ? _c("div", {
    staticClass: "no-data-section"
  }, [_vm._m(10)]) : _vm._e()])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "loading-content"
  }, [_c("div", {
    staticClass: "professional-loader"
  }, [_c("div", {
    staticClass: "loader-spinner"
  }), _vm._v(" "), _c("div", {
    staticClass: "loader-pulse"
  })]), _vm._v(" "), _c("h3", {
    staticClass: "loading-title"
  }, [_vm._v("Generando Reporte de Ventas")]), _vm._v(" "), _c("p", {
    staticClass: "loading-subtitle"
  }, [_vm._v("Procesando información de ventas del período seleccionado...")]), _vm._v(" "), _c("div", {
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "header-section"
  }, [_c("div", {
    staticClass: "page-header"
  }, [_c("h2", [_c("i", {
    staticClass: "fas fa-chart-line mr-3"
  }), _vm._v("\n                        Reporte de Ventas\n                    ")]), _vm._v(" "), _c("p", {
    staticClass: "page-description"
  }, [_vm._v("\n                        Consulta y analiza las ventas realizadas por período de fechas\n                    ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "filters-header"
  }, [_c("h5", {
    staticClass: "filters-title"
  }, [_c("i", {
    staticClass: "fas fa-filter mr-2"
  }), _vm._v("\n                        Filtros de búsqueda\n                    ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("label", {
    staticClass: "filter-label"
  }, [_c("i", {
    staticClass: "fas fa-calendar-alt mr-2"
  }), _vm._v("\n                                Fecha Inicial\n                            ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("label", {
    staticClass: "filter-label"
  }, [_c("i", {
    staticClass: "fas fa-calendar-alt mr-2"
  }), _vm._v("\n                                Fecha Final\n                            ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h3", {
    staticClass: "report-title"
  }, [_c("i", {
    staticClass: "fas fa-table mr-2"
  }), _vm._v("\n                                Resultados del Reporte\n                            ")]);
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
  return _c("div", {
    staticClass: "summary-icon"
  }, [_c("i", {
    staticClass: "fas fa-dollar-sign"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", {
    staticClass: "text-left"
  }, [_c("i", {
    staticClass: "fas fa-user mr-2"
  }), _vm._v("\n                                        Cliente\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fas fa-calendar-alt mr-2"
  }), _vm._v("\n                                        Fecha\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-right"
  }, [_c("i", {
    staticClass: "fas fa-dollar-sign mr-2"
  }), _vm._v("\n                                        Valor\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fas fa-info-circle mr-2"
  }), _vm._v("\n                                        Estado\n                                    ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("th", {
    staticClass: "total-label",
    attrs: {
      colspan: "2"
    }
  }, [_c("i", {
    staticClass: "fas fa-calculator mr-2"
  }), _vm._v(" "), _c("strong", [_vm._v("Total General:")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "no-data-container"
  }, [_c("div", {
    staticClass: "no-data-icon"
  }, [_c("i", {
    staticClass: "fas fa-search"
  })]), _vm._v(" "), _c("h3", {
    staticClass: "no-data-title"
  }, [_vm._v("No hay información para mostrar")]), _vm._v(" "), _c("p", {
    staticClass: "no-data-description"
  }, [_vm._v("\n                        Selecciona un rango de fechas y genera el reporte para ver los resultados\n                    ")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/ReporteVentas.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/ReporteVentas.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReporteVentas_vue_vue_type_template_id_61d9545d_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReporteVentas.vue?vue&type=template&id=61d9545d&scoped=true */ "./resources/js/components/ReporteVentas.vue?vue&type=template&id=61d9545d&scoped=true");
/* harmony import */ var _ReporteVentas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReporteVentas.vue?vue&type=script&lang=js */ "./resources/js/components/ReporteVentas.vue?vue&type=script&lang=js");
/* harmony import */ var _ReporteVentas_vue_vue_type_style_index_0_id_61d9545d_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css */ "./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ReporteVentas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReporteVentas_vue_vue_type_template_id_61d9545d_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ReporteVentas_vue_vue_type_template_id_61d9545d_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "61d9545d",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/ReporteVentas.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ReporteVentas.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/components/ReporteVentas.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReporteVentas.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_style_index_0_id_61d9545d_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=style&index=0&id=61d9545d&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/ReporteVentas.vue?vue&type=template&id=61d9545d&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/ReporteVentas.vue?vue&type=template&id=61d9545d&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_template_id_61d9545d_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_template_id_61d9545d_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReporteVentas_vue_vue_type_template_id_61d9545d_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReporteVentas.vue?vue&type=template&id=61d9545d&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ReporteVentas.vue?vue&type=template&id=61d9545d&scoped=true");


/***/ })

}]);