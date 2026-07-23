"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-HistorialFacturas-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['user'],
  data: function data() {
    return {
      abono: {},
      errores: '',
      facturas: [],
      fechaHoy: '',
      loader: true,
      mensajeError: false,
      search: '',
      title: 'Facturas Pendientes',
      todasLasFacturas: [],
      // Paginación
      currentPage: 1,
      itemsPerPage: 10,
      itemsPerPageOptions: [10, 25, 50, 100]
    };
  },
  computed: {
    filteredFacturas: function filteredFacturas() {
      var _this = this;
      var filtered = this.facturas;

      // Aplicar filtro de búsqueda
      if (this.search) {
        filtered = filtered.filter(function (factura) {
          return factura.cliente.toLowerCase().includes(_this.search.toLowerCase()) || factura.num_factura.toString().toLowerCase().includes(_this.search.toLowerCase()) || factura.electronica && factura.electronica.toString().toLowerCase().includes(_this.search.toLowerCase());
        });
      }
      return filtered;
    },
    paginatedFacturas: function paginatedFacturas() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return this.filteredFacturas.slice(start, end);
    },
    totalPages: function totalPages() {
      return Math.ceil(this.filteredFacturas.length / this.itemsPerPage);
    },
    paginationInfo: function paginationInfo() {
      var start = (this.currentPage - 1) * this.itemsPerPage + 1;
      var end = Math.min(this.currentPage * this.itemsPerPage, this.filteredFacturas.length);
      return {
        start: start,
        end: end,
        total: this.filteredFacturas.length
      };
    }
  },
  watch: {
    search: function search() {
      // Resetear página cuando cambie la búsqueda
      this.currentPage = 1;
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.getFacturas();
    // console.log(this.user)
  },
  methods: {
    filtrar: function filtrar(opcion) {
      var _this2 = this;
      // Mostrar loader al aplicar filtros
      this.loader = true;

      // Simular tiempo de procesamiento para mostrar el loader
      setTimeout(function () {
        var facturas = [];
        if (opcion.canceladas) {
          _this2.title = 'Facturas Canceladas';
          _this2.todasLasFacturas.map(function (el) {
            if (el.estado_id === 3) {
              facturas.push(Object.assign({}, el));
            }
          });
          _this2.setFacturas(facturas);
        } else if (opcion.pagadas) {
          _this2.title = 'Facturas Pagadas';
          _this2.todasLasFacturas.map(function (el) {
            if (el.estado_id === 6) {
              facturas.push(Object.assign({}, el));
            }
          });
          _this2.setFacturas(facturas);
        } else if (opcion.pendientes) {
          _this2.title = 'Facturas Pendientes';
          _this2.todasLasFacturas.map(function (el) {
            if (el.estado_id === 4 || el.estado_id === 5) {
              facturas.push(Object.assign({}, el));
            }
          });
          _this2.setFacturas(facturas);
        }

        // Resetear página actual al aplicar filtros
        _this2.currentPage = 1;
        _this2.loader = false;
      }, 800); // 800ms para mostrar el loader
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
    },
    goToPage: function goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    changeItemsPerPage: function changeItemsPerPage(newValue) {
      this.itemsPerPage = newValue;
      this.currentPage = 1; // Reset to first page
    },
    getVisiblePages: function getVisiblePages() {
      var totalPages = this.totalPages;
      var current = this.currentPage;
      var delta = 2; // Número de páginas a mostrar a cada lado de la actual

      if (totalPages <= 7) {
        // Si hay 7 páginas o menos, mostrar todas
        return Array.from({
          length: totalPages
        }, function (_, i) {
          return i + 1;
        });
      }
      var pages = [];

      // Siempre mostrar la primera página
      pages.push(1);
      if (current - delta > 2) {
        pages.push('...');
      }

      // Páginas alrededor de la actual
      var start = Math.max(2, current - delta);
      var end = Math.min(totalPages - 1, current + delta);
      for (var i = start; i <= end; i++) {
        pages.push(i);
      }
      if (current + delta < totalPages - 1) {
        pages.push('...');
      }

      // Siempre mostrar la última página
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      return pages;
    },
    historyCoin: function historyCoin(item) {
      this.$refs.historialPagos.getHistorialPagos(1, item);
    },
    getFacturas: function getFacturas() {
      var _this3 = this;
      axios.get('/facturas').then(function (res) {
        // console.log(res.data)
        _this3.setFacturas(res.data);
        _this3.todasLasFacturas = res.data;
        _this3.loader = false;
        var opcion = {
          pendientes: true,
          canceladas: false,
          pagadas: false
        };
        _this3.filtrar(opcion);
      })["catch"](function (err) {
        console.log(err);
      });
    },
    opcionesFiltrado: function opcionesFiltrado() {
      this.$refs.filtros.showFiltros(1);
    },
    setFacturas: function setFacturas(facturas) {
      this.facturas = [];
      var hoy = new Date();
      for (var i = 0; i < facturas.length; i++) {
        var fecha = new Date(facturas[i].fecha_factura); //Calcula el tiempo transcurrido de la factura
        var tiempo = Math.round((hoy.getTime() - fecha.getTime()) / 86400000);
        this.facturas.push({
          id: facturas[i].id,
          estado_id: facturas[i].estado_id,
          estado: facturas[i].estado,
          cliente: facturas[i].razon_social,
          num_factura: facturas[i].numero_factura,
          electronica: facturas[i].electronica,
          fecha: facturas[i].fecha_factura,
          total: facturas[i].valor,
          tiempo: tiempo
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Professional Container */\n.invoices-container[data-v-54a1b622] {\r\n    min-height: 100vh;\r\n    background: #f8f9fa;\r\n    padding: 2rem;\n}\r\n\r\n/* Header Section */\n.header-section[data-v-54a1b622] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 2rem;\n}\n.page-header h2[data-v-54a1b622] {\r\n    font-size: 2.2rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.5rem 0;\r\n    display: flex;\r\n    align-items: center;\n}\n.page-header h2 i[data-v-54a1b622],\r\n.header-icon[data-v-54a1b622] {\r\n    color: #3b82f6 !important;\r\n    margin-right: 1rem;\r\n    font-size: 2rem;\r\n    display: inline-block;\r\n    -webkit-text-fill-color: #3b82f6 !important;\r\n    background: none !important;\r\n    background-clip: unset !important;\r\n    -webkit-background-clip: unset !important;\r\n    opacity: 1 !important;\r\n    visibility: visible !important;\n}\n.header-icon-fallback[data-v-54a1b622] {\r\n    margin-right: 1rem;\r\n    font-size: 2rem;\r\n    display: none;\n}\r\n\r\n/* Sistema de iconos personalizados con emojis */\n.custom-icon[data-v-54a1b622] {\r\n    display: inline-block;\r\n    font-size: 1.2em;\r\n    line-height: 1;\r\n    margin-right: 0.5rem;\r\n    vertical-align: middle;\r\n    font-style: normal;\r\n    font-weight: normal;\n}\n.custom-icon-document[data-v-54a1b622] {\r\n    font-size: 2rem;\r\n    margin-right: 1rem;\r\n    color: #3b82f6;\n}\n.custom-icon-search[data-v-54a1b622] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    z-index: 3;\r\n    pointer-events: none;\r\n    font-size: 1.2rem;\r\n    margin-right: 0;\r\n    color: #64748b;\n}\n.custom-icon-filter[data-v-54a1b622] {\r\n    font-size: 1rem;\r\n    margin-right: 0.5rem;\r\n    color: white;\n}\r\n\r\n/* Iconos en headers de tabla */\n.professional-table thead th .custom-icon[data-v-54a1b622] {\r\n    color: #3b82f6;\r\n    margin-right: 0.5rem;\r\n    font-size: 1.1rem;\n}\r\n\r\n/* Iconos de cliente móvil */\n.client-icon.custom-icon[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.3rem;\r\n    margin-right: 0.75rem;\n}\r\n\r\n/* Iconos de información móvil */\n.info-icon.custom-icon[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #2563eb;\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.1rem;\r\n    margin-right: 0;\n}\r\n\r\n/* Iconos de edad */\n.age-icon.custom-icon[data-v-54a1b622] {\r\n    font-size: 1.5rem;\r\n    color: #64748b;\r\n    margin-right: 1rem;\n}\r\n\r\n/* Botones de acción con iconos */\n.action-btn .custom-icon[data-v-54a1b622] {\r\n    font-size: 1.2rem;\r\n    margin: 0;\n}\n.mobile-action-btn .custom-icon[data-v-54a1b622] {\r\n    font-size: 1.1rem;\r\n    margin-right: 0.5rem;\n}\r\n\r\n/* Iconos de paginación */\n.pagination-btn .custom-icon[data-v-54a1b622] {\r\n    font-size: 1rem;\r\n    margin: 0 0.25rem;\n}\r\n\r\n/* Estados específicos de iconos */\n.status-badge .custom-icon[data-v-54a1b622],\r\n.status-badge-mobile .custom-icon[data-v-54a1b622] {\r\n    margin-right: 0.5rem;\r\n    font-size: 1rem;\n}\r\n\r\n/* Asegurar que los emojis se vean bien en todos los navegadores */\n.custom-icon[data-v-54a1b622] {\r\n    font-family: \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Noto Color Emoji\", \"Android Emoji\", \"EmojiSymbols\", serif;\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\n}\n.page-title[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\r\n    font-weight: 700;\n}\n.page-description[data-v-54a1b622] {\r\n    color: #64748b;\r\n    font-size: 1.1rem;\r\n    margin: 0;\r\n    font-weight: 400;\n}\n.header-actions[data-v-54a1b622] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    align-items: center;\r\n    flex-wrap: wrap;\n}\n.search-box[data-v-54a1b622] {\r\n    position: relative;\r\n    min-width: 300px;\n}\n.search-icon[data-v-54a1b622] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    color: #64748b;\r\n    z-index: 3;\r\n    pointer-events: none;\n}\n.search-input[data-v-54a1b622] {\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 1rem 0 3rem !important;\r\n    border: 2px solid #e2e8f0;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: rgba(255, 255, 255, 0.9);\r\n    backdrop-filter: blur(10px);\r\n    transition: all 0.3s ease;\n}\n.search-input[data-v-54a1b622]::-moz-placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-54a1b622]::placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-54a1b622]:focus {\r\n    outline: none;\r\n    border-color: #3b82f6;\r\n    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);\r\n    background: white;\n}\n.new-lab-btn[data-v-54a1b622] {\r\n    height: 50px;\r\n    padding: 0 2rem;\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);\n}\n.new-lab-btn[data-v-54a1b622]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\r\n    color: white;\n}\r\n\r\n/* Loading Section */\n.loading-section[data-v-54a1b622] {\r\n    margin-top: 2rem;\r\n    width: 100%;\n}\n.professional-report-container[data-v-54a1b622] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    overflow: hidden;\r\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    width: 100%;\r\n    box-sizing: border-box;\n}\n.loader-container[data-v-54a1b622] {\r\n    text-align: center;\r\n    padding: 4rem 2rem;\n}\n.spinner-professional[data-v-54a1b622] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border: 4px solid #e5e7eb;\r\n    border-top: 4px solid #3b82f6;\r\n    border-radius: 50%;\r\n    animation: spin-54a1b622 1s linear infinite;\r\n    margin: 0 auto 2rem;\n}\n.loader-title[data-v-54a1b622] {\r\n    color: #1e293b;\r\n    font-size: 1.5rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.75rem 0;\n}\n.loader-subtitle[data-v-54a1b622] {\r\n    color: #64748b;\r\n    font-size: 1rem;\r\n    font-weight: 500;\r\n    margin: 0 0 2rem 0;\r\n    line-height: 1.5;\n}\n.loading-progress[data-v-54a1b622] {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 4px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.progress-bar[data-v-54a1b622] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #3b82f6, #2563eb);\r\n    border-radius: 2px;\r\n    animation: progress-54a1b622 2s ease-in-out infinite;\n}\r\n\r\n/* Content */\n.invoices-content[data-v-54a1b622] {\r\n    margin-top: 2rem;\n}\r\n\r\n/* Mobile Cards - Hidden by default */\n.mobile-cards-container[data-v-54a1b622] {\r\n    display: none;\n}\n.desktop-table[data-v-54a1b622] {\r\n    display: block;\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-54a1b622] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-54a1b622] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\r\n    min-width: 900px;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #3b82f6;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\n}\n.professional-table thead th i[data-v-54a1b622] {\r\n    margin-right: 0.5rem;\r\n    color: #3b82f6;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-54a1b622] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\n}\n.professional-table tbody tr[data-v-54a1b622]:hover {\r\n    background: rgba(59, 130, 246, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-54a1b622] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.client-cell[data-v-54a1b622] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.client-name[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\n}\n.invoice-cell[data-v-54a1b622] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.invoice-number[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #92400e;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #fcd34d;\n}\n.date-cell[data-v-54a1b622] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.date-value[data-v-54a1b622] {\r\n    background: #f8fafc;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    border: 1px solid #e2e8f0;\n}\n.amount-cell[data-v-54a1b622] {\r\n    font-weight: 600;\r\n    font-family: 'Courier New', monospace;\n}\n.amount-value[data-v-54a1b622] {\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    border: 1px solid #93c5fd;\n}\r\n\r\n/* Status Badges */\n.status-badge[data-v-54a1b622] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\n}\n.status-cancelled[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);\r\n    color: #dc2626;\r\n    border: 1px solid #f87171;\n}\n.status-paid[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);\r\n    color: #059669;\r\n    border: 1px solid #4ade80;\n}\n.age-badge[data-v-54a1b622] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\n}\n.age-normal[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);\r\n    color: #0369a1;\r\n    border: 1px solid #7dd3fc;\n}\n.age-warning[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #d97706;\r\n    border: 1px solid #fbbf24;\n}\n.age-danger[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);\r\n    color: #dc2626;\r\n    border: 1px solid #f87171;\n}\r\n\r\n/* Action Buttons */\n.action-buttons[data-v-54a1b622] {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    justify-content: center;\n}\n.action-btn[data-v-54a1b622] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    border: none;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 1rem;\r\n    text-decoration: none;\n}\n.print-btn[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(248, 113, 113, 0.3);\n}\n.print-btn[data-v-54a1b622]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(248, 113, 113, 0.4);\n}\n.history-btn[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);\n}\n.history-btn[data-v-54a1b622]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);\n}\r\n\r\n/* Mobile Cards Styles */\n.invoice-card[data-v-54a1b622] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    margin-bottom: 1rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    transition: all 0.3s ease;\n}\n.invoice-card[data-v-54a1b622]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.card-header[data-v-54a1b622] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 1.5rem;\r\n    padding-bottom: 1rem;\r\n    border-bottom: 2px solid #f1f5f9;\n}\n.client-info[data-v-54a1b622] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    flex: 1;\n}\n.client-icon[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.1rem;\n}\n.client-name-mobile[data-v-54a1b622] {\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-size: 1.1rem;\r\n    line-height: 1.2;\n}\n.invoice-badge[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #92400e;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    border: 1px solid #fcd34d;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    font-size: 0.9rem;\n}\n.card-body[data-v-54a1b622] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1.5rem;\n}\n.info-row[data-v-54a1b622] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 1rem;\n}\n.info-item[data-v-54a1b622] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\n}\n.info-icon[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #2563eb;\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 0.9rem;\n}\n.info-content[data-v-54a1b622] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.25rem;\r\n    flex: 1;\n}\n.info-label[data-v-54a1b622] {\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.info-value[data-v-54a1b622] {\r\n    font-size: 1rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\n}\r\n\r\n/* Status Section Mobile */\n.status-section[data-v-54a1b622] {\r\n    padding: 1.5rem;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\n}\n.status-badge-mobile[data-v-54a1b622] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.75rem 1.25rem;\r\n    border-radius: 12px;\r\n    font-weight: 700;\r\n    font-size: 1rem;\r\n    width: 100%;\r\n    justify-content: center;\n}\n.age-container[data-v-54a1b622] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    justify-content: center;\n}\n.age-icon[data-v-54a1b622] {\r\n    font-size: 1.5rem;\r\n    color: #64748b;\n}\n.age-badge-mobile[data-v-54a1b622] {\r\n    font-weight: 700;\r\n    font-size: 1.1rem;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    text-align: center;\n}\r\n\r\n/* Actions Section Mobile */\n.actions-section[data-v-54a1b622] {\r\n    display: flex;\r\n    gap: 1rem;\n}\n.mobile-action-btn[data-v-54a1b622] {\r\n    flex: 1;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    text-decoration: none;\r\n    border: none;\n}\r\n\r\n/* Animations */\n@keyframes spin-54a1b622 {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes progress-54a1b622 {\n0% { transform: translateX(-100%);\n}\n50% { transform: translateX(0%);\n}\n100% { transform: translateX(100%);\n}\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 1024px) {\n.header-section[data-v-54a1b622] {\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        text-align: center;\n}\n.header-actions[data-v-54a1b622] {\r\n        justify-content: center;\n}\n.search-box[data-v-54a1b622] {\r\n        min-width: 100%;\n}\n.page-header h2[data-v-54a1b622] {\r\n        font-size: 2rem;\r\n        justify-content: center;\n}\n}\n@media (max-width: 900px) {\r\n    /* Show mobile cards, hide desktop table */\n.desktop-table[data-v-54a1b622] {\r\n        display: none;\n}\n.mobile-cards-container[data-v-54a1b622] {\r\n        display: block;\r\n        padding: 0 0.5rem;\n}\n}\n@media (max-width: 768px) {\n.invoices-container[data-v-54a1b622] {\r\n        padding: 1rem;\n}\n.header-section[data-v-54a1b622] {\r\n        border-radius: 16px;\r\n        padding: 1.5rem;\n}\n.professional-report-container[data-v-54a1b622] {\r\n        border-radius: 16px;\n}\n.page-header h2[data-v-54a1b622] {\r\n        font-size: 1.8rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 0.5rem;\n}\n.invoice-card[data-v-54a1b622] {\r\n        margin-bottom: 1rem;\r\n        padding: 1.25rem;\r\n        border-radius: 14px;\n}\n.card-header[data-v-54a1b622] {\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        align-items: stretch;\r\n        margin-bottom: 1.25rem;\n}\n.client-info[data-v-54a1b622] {\r\n        justify-content: center;\r\n        text-align: center;\n}\n.client-name-mobile[data-v-54a1b622] {\r\n        font-size: 1rem;\r\n        text-align: center;\n}\n.invoice-badge[data-v-54a1b622] {\r\n        align-self: center;\r\n        font-size: 0.85rem;\n}\n.info-row[data-v-54a1b622] {\r\n        grid-template-columns: 1fr;\r\n        gap: 0.75rem;\n}\n.actions-section[data-v-54a1b622] {\r\n        flex-direction: column;\r\n        gap: 0.75rem;\n}\n}\n@media (max-width: 480px) {\n.invoices-container[data-v-54a1b622] {\r\n        padding: 0.75rem;\n}\n.header-section[data-v-54a1b622] {\r\n        padding: 1.25rem;\n}\n.page-header h2[data-v-54a1b622] {\r\n        font-size: 1.6rem;\n}\n.invoice-card[data-v-54a1b622] {\r\n        padding: 1rem;\r\n        margin-bottom: 0.875rem;\n}\n.client-name-mobile[data-v-54a1b622] {\r\n        font-size: 0.95rem;\n}\n}\r\n\r\n/* Pagination Styles */\n.pagination-section[data-v-54a1b622] {\r\n    background: white;\r\n    border-top: 2px solid #f1f5f9;\r\n    padding: 1.5rem 2rem;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 1rem;\n}\n.pagination-info[data-v-54a1b622] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2rem;\r\n    flex-wrap: wrap;\n}\n.items-per-page[data-v-54a1b622] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-label[data-v-54a1b622] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 0.9rem;\n}\n.items-select[data-v-54a1b622] {\r\n    padding: 0.5rem 0.75rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #374151;\r\n    background: white;\r\n    cursor: pointer;\r\n    outline: none;\r\n    transition: all 0.3s ease;\n}\n.items-select[data-v-54a1b622]:focus {\r\n    border-color: #3b82f6;\r\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.page-info-text[data-v-54a1b622] {\r\n    font-size: 0.9rem;\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.pagination-controls[data-v-54a1b622] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-btn[data-v-54a1b622] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.75rem 1rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\n}\n.pagination-btn[data-v-54a1b622]:hover:not(:disabled) {\r\n    border-color: #3b82f6;\r\n    color: #3b82f6;\r\n    background: rgba(59, 130, 246, 0.05);\n}\n.pagination-btn[data-v-54a1b622]:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n    color: #9ca3af;\n}\n.page-numbers[data-v-54a1b622] {\r\n    display: flex;\r\n    gap: 0.25rem;\r\n    margin: 0 1rem;\n}\n.page-btn[data-v-54a1b622] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.page-btn[data-v-54a1b622]:hover:not(:disabled):not(.ellipsis) {\r\n    border-color: #3b82f6;\r\n    color: #3b82f6;\r\n    background: rgba(59, 130, 246, 0.05);\n}\n.page-btn.active[data-v-54a1b622] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    border-color: #3b82f6;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);\n}\n.page-btn.ellipsis[data-v-54a1b622] {\r\n    border: none;\r\n    background: transparent;\r\n    cursor: default;\r\n    color: #9ca3af;\n}\n.page-btn.ellipsis[data-v-54a1b622]:hover {\r\n    background: transparent;\r\n    border: none;\n}\r\n\r\n/* Responsive Pagination */\n@media (max-width: 768px) {\n.pagination-section[data-v-54a1b622] {\r\n        padding: 1rem;\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        gap: 1rem;\n}\n.pagination-info[data-v-54a1b622] {\r\n        justify-content: center;\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        text-align: center;\n}\n.items-per-page[data-v-54a1b622] {\r\n        justify-content: center;\n}\n.pagination-controls[data-v-54a1b622] {\r\n        justify-content: center;\r\n        flex-wrap: wrap;\n}\n.page-numbers[data-v-54a1b622] {\r\n        margin: 0 0.5rem;\r\n        flex-wrap: wrap;\r\n        justify-content: center;\n}\n.pagination-btn[data-v-54a1b622] {\r\n        font-size: 0.8rem;\r\n        padding: 0.6rem 0.8rem;\n}\n.page-btn[data-v-54a1b622] {\r\n        width: 35px;\r\n        height: 35px;\r\n        font-size: 0.8rem;\n}\n}\n@media (max-width: 480px) {\n.pagination-controls[data-v-54a1b622] {\r\n        flex-direction: column;\r\n        gap: 1rem;\n}\n.page-numbers[data-v-54a1b622] {\r\n        margin: 0;\r\n        order: 2;\n}\n.prev-btn[data-v-54a1b622] {\r\n        order: 1;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n.next-btn[data-v-54a1b622] {\r\n        order: 3;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_style_index_0_id_54a1b622_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_style_index_0_id_54a1b622_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_style_index_0_id_54a1b622_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=template&id=54a1b622&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=template&id=54a1b622&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "invoices-container"
  }, [_c("aplicar-filtros", {
    ref: "filtros",
    on: {
      aplicarFiltros: _vm.filtrar
    }
  }), _vm._v(" "), _c("historial-pagos", {
    ref: "historialPagos"
  }), _vm._v(" "), _c("div", {
    staticClass: "header-section"
  }, [_c("div", {
    staticClass: "page-header"
  }, [_c("h2", [_c("span", {
    staticClass: "custom-icon custom-icon-document"
  }, [_vm._v("📄")]), _vm._v(" "), _c("span", {
    staticClass: "page-title"
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c("p", {
    staticClass: "page-description"
  }, [_vm._v("\n                    Gestión completa del historial de facturas y seguimiento de pagos\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "header-actions"
  }, [_c("div", {
    staticClass: "search-box"
  }, [_c("span", {
    staticClass: "custom-icon custom-icon-search"
  }, [_vm._v("🔍")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    staticClass: "form-control search-input",
    attrs: {
      type: "text",
      placeholder: "Buscar por cliente o factura..."
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
  })]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary new-lab-btn",
    on: {
      click: _vm.opcionesFiltrado
    }
  }, [_c("span", {
    staticClass: "custom-icon custom-icon-filter"
  }, [_vm._v("🔽")]), _vm._v("\n                    Filtrar Facturas\n                ")])])]), _vm._v(" "), _vm.loader ? _c("div", {
    staticClass: "loading-section"
  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), !_vm.loader ? _c("div", {
    staticClass: "invoices-content"
  }, [_c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "desktop-table"
  }, [_c("div", {
    staticClass: "table-responsive professional-table-wrapper"
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(1), _vm._v(" "), _c("tbody", _vm._l(_vm.paginatedFacturas, function (item, index) {
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
    }, [_vm._v("\n                                            " + _vm._s(item.electronica == 0 ? item.num_factura : item.electronica) + "\n                                        ")])]), _vm._v(" "), _c("td", {
      staticClass: "text-center date-cell"
    }, [_c("span", {
      staticClass: "date-value"
    }, [_vm._v(_vm._s(item.fecha))])]), _vm._v(" "), _c("td", {
      staticClass: "text-right amount-cell"
    }, [_c("span", {
      staticClass: "amount-value"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.total)))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center status-cell"
    }, [item.estado_id === 3 || item.estado_id === 6 ? _c("div", [item.estado_id === 3 ? _c("span", {
      staticClass: "status-badge status-cancelled"
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("❌")]), _vm._v("\n                                                Cancelada\n                                            ")]) : _vm._e(), _vm._v(" "), item.estado_id === 6 ? _c("span", {
      staticClass: "status-badge status-paid"
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("✅")]), _vm._v("\n                                                Pagada\n                                            ")]) : _vm._e()]) : _c("div", [_c("span", {
      staticClass: "age-badge",
      "class": {
        "age-normal": item.tiempo <= 30,
        "age-warning": item.tiempo > 30 && item.tiempo <= 45,
        "age-danger": item.tiempo > 45
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("⏰")]), _vm._v("\n                                                " + _vm._s(item.tiempo) + " días\n                                            ")])])]), _vm._v(" "), _c("td", {
      staticClass: "text-center actions-cell"
    }, [_c("div", {
      staticClass: "action-buttons"
    }, [_c("a", {
      staticClass: "action-btn print-btn",
      attrs: {
        href: "/imprimir-factura/" + item.id,
        target: "_blank",
        title: "Imprimir factura"
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("🖨️")])]), _vm._v(" "), item.estado_id === 6 || item.estado_id === 5 ? _c("button", {
      staticClass: "action-btn history-btn",
      attrs: {
        title: "Historial de abonos"
      },
      on: {
        click: function click($event) {
          return _vm.historyCoin(item);
        }
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("💳")])]) : _vm._e()])])]);
  }), 0)])])]), _vm._v(" "), _c("div", {
    staticClass: "mobile-cards-container"
  }, _vm._l(_vm.paginatedFacturas, function (item, index) {
    return _c("div", {
      key: index,
      staticClass: "invoice-card"
    }, [_c("div", {
      staticClass: "card-header"
    }, [_c("div", {
      staticClass: "client-info"
    }, [_c("span", {
      staticClass: "custom-icon client-icon"
    }, [_vm._v("👤")]), _vm._v(" "), _c("span", {
      staticClass: "client-name-mobile"
    }, [_vm._v(_vm._s(item.cliente))])]), _vm._v(" "), _c("div", {
      staticClass: "invoice-badge"
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("📄")]), _vm._v(" " + _vm._s(item.electronica == 0 ? item.num_factura : item.electronica) + "\n                            ")])]), _vm._v(" "), _c("div", {
      staticClass: "card-body"
    }, [_c("div", {
      staticClass: "info-row"
    }, [_c("div", {
      staticClass: "info-item"
    }, [_c("span", {
      staticClass: "custom-icon info-icon"
    }, [_vm._v("📅")]), _vm._v(" "), _c("div", {
      staticClass: "info-content"
    }, [_c("span", {
      staticClass: "info-label"
    }, [_vm._v("Fecha")]), _vm._v(" "), _c("span", {
      staticClass: "info-value"
    }, [_vm._v(_vm._s(item.fecha))])])]), _vm._v(" "), _c("div", {
      staticClass: "info-item"
    }, [_c("span", {
      staticClass: "custom-icon info-icon"
    }, [_vm._v("💰")]), _vm._v(" "), _c("div", {
      staticClass: "info-content"
    }, [_c("span", {
      staticClass: "info-label"
    }, [_vm._v("Valor")]), _vm._v(" "), _c("span", {
      staticClass: "info-value"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.total)))])])])]), _vm._v(" "), _c("div", {
      staticClass: "status-section"
    }, [item.estado_id === 3 || item.estado_id === 6 ? _c("div", {
      staticClass: "status-container"
    }, [item.estado_id === 3 ? _c("span", {
      staticClass: "status-badge-mobile status-cancelled"
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("❌")]), _vm._v("\n                                        Cancelada\n                                    ")]) : _vm._e(), _vm._v(" "), item.estado_id === 6 ? _c("span", {
      staticClass: "status-badge-mobile status-paid"
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("✅")]), _vm._v("\n                                        Pagada\n                                    ")]) : _vm._e()]) : _c("div", {
      staticClass: "age-container"
    }, [_c("span", {
      staticClass: "custom-icon age-icon"
    }, [_vm._v("⏰")]), _vm._v(" "), _c("span", {
      staticClass: "age-badge-mobile",
      "class": {
        "age-normal": item.tiempo <= 30,
        "age-warning": item.tiempo > 30 && item.tiempo <= 45,
        "age-danger": item.tiempo > 45
      }
    }, [_vm._v("\n                                        " + _vm._s(item.tiempo) + " días de antigüedad\n                                    ")])])]), _vm._v(" "), _c("div", {
      staticClass: "actions-section"
    }, [_c("a", {
      staticClass: "mobile-action-btn print-btn",
      attrs: {
        href: "/imprimir-factura/" + item.id,
        target: "_blank"
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("🖨️")]), _vm._v("\n                                    Imprimir\n                                ")]), _vm._v(" "), item.estado_id === 6 || item.estado_id === 5 ? _c("button", {
      staticClass: "mobile-action-btn history-btn",
      on: {
        click: function click($event) {
          return _vm.historyCoin(item);
        }
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("💳")]), _vm._v("\n                                    Historial\n                                ")]) : _vm._e()])])]);
  }), 0), _vm._v(" "), _vm.filteredFacturas.length > 0 ? _c("div", {
    staticClass: "pagination-section"
  }, [_c("div", {
    staticClass: "pagination-info"
  }, [_c("div", {
    staticClass: "items-per-page"
  }, [_c("span", {
    staticClass: "pagination-label"
  }, [_vm._v("Mostrar:")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.itemsPerPage,
      expression: "itemsPerPage"
    }],
    staticClass: "items-select",
    on: {
      change: [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.itemsPerPage = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, function ($event) {
        return _vm.changeItemsPerPage(_vm.itemsPerPage);
      }]
    }
  }, _vm._l(_vm.itemsPerPageOptions, function (option) {
    return _c("option", {
      key: option,
      domProps: {
        value: option
      }
    }, [_vm._v("\n                                    " + _vm._s(option) + "\n                                ")]);
  }), 0), _vm._v(" "), _c("span", {
    staticClass: "pagination-label"
  }, [_vm._v("registros")])]), _vm._v(" "), _c("div", {
    staticClass: "page-info"
  }, [_c("span", {
    staticClass: "page-info-text"
  }, [_vm._v("\n                                Mostrando " + _vm._s(_vm.paginationInfo.start) + " - " + _vm._s(_vm.paginationInfo.end) + " de " + _vm._s(_vm.paginationInfo.total) + " registros\n                            ")])])]), _vm._v(" "), _c("div", {
    staticClass: "pagination-controls"
  }, [_c("button", {
    staticClass: "pagination-btn prev-btn",
    attrs: {
      disabled: _vm.currentPage === 1
    },
    on: {
      click: _vm.prevPage
    }
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("◀️")]), _vm._v("\n                            Anterior\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "page-numbers"
  }, _vm._l(_vm.getVisiblePages(), function (page) {
    return _c("button", {
      key: page,
      "class": ["page-btn", {
        active: page === _vm.currentPage,
        ellipsis: page === "..."
      }],
      attrs: {
        disabled: page === "..."
      },
      on: {
        click: function click($event) {
          return _vm.goToPage(page);
        }
      }
    }, [_vm._v("\n                                " + _vm._s(page) + "\n                            ")]);
  }), 0), _vm._v(" "), _c("button", {
    staticClass: "pagination-btn next-btn",
    attrs: {
      disabled: _vm.currentPage === _vm.totalPages
    },
    on: {
      click: _vm.nextPage
    }
  }, [_vm._v("\n                            Siguiente\n                            "), _c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("▶️")])])])]) : _vm._e()])]) : _vm._e()], 1)]);
};
var staticRenderFns = [function () {
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
  }, [_vm._v("Cargando historial de facturas")]), _vm._v(" "), _c("p", {
    staticClass: "loader-subtitle"
  }, [_vm._v("Procesando información de facturas y estados de pago...")]), _vm._v(" "), _c("div", {
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", {
    staticClass: "text-left"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("👤")]), _vm._v("\n                                        Cliente\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("📄")]), _vm._v(" Factura\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("📅")]), _vm._v("\n                                        Fecha\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-right"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("💰")]), _vm._v("\n                                        Valor\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("⏱️")]), _vm._v("\n                                        Estado/Edad\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("⚙️")]), _vm._v("\n                                        Acciones\n                                    ")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/HistorialFacturas.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/HistorialFacturas.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HistorialFacturas_vue_vue_type_template_id_54a1b622_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HistorialFacturas.vue?vue&type=template&id=54a1b622&scoped=true */ "./resources/js/components/HistorialFacturas.vue?vue&type=template&id=54a1b622&scoped=true");
/* harmony import */ var _HistorialFacturas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HistorialFacturas.vue?vue&type=script&lang=js */ "./resources/js/components/HistorialFacturas.vue?vue&type=script&lang=js");
/* harmony import */ var _HistorialFacturas_vue_vue_type_style_index_0_id_54a1b622_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css */ "./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _HistorialFacturas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _HistorialFacturas_vue_vue_type_template_id_54a1b622_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _HistorialFacturas_vue_vue_type_template_id_54a1b622_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "54a1b622",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/HistorialFacturas.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/HistorialFacturas.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/HistorialFacturas.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HistorialFacturas.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_style_index_0_id_54a1b622_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=style&index=0&id=54a1b622&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/HistorialFacturas.vue?vue&type=template&id=54a1b622&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/HistorialFacturas.vue?vue&type=template&id=54a1b622&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_template_id_54a1b622_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_template_id_54a1b622_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HistorialFacturas_vue_vue_type_template_id_54a1b622_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HistorialFacturas.vue?vue&type=template&id=54a1b622&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/HistorialFacturas.vue?vue&type=template&id=54a1b622&scoped=true");


/***/ })

}]);