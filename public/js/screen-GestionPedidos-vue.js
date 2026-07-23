"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-GestionPedidos-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['ventas'],
  data: function data() {
    return {
      abono: {
        abono: false,
        recibo_caja: null
      },
      dialogAbonar: false,
      error: '',
      headers: [{
        text: 'Lab',
        value: 'LogoEmpresa',
        width: '80px',
        sortable: false
      }, {
        text: 'Cliente',
        value: 'cliente',
        width: '250px'
      }, {
        text: 'Fecha',
        value: 'fecha',
        width: '120px'
      }, {
        text: 'Pedido',
        value: 'pedido',
        width: '120px',
        sortable: false
      }, {
        text: 'Factura',
        value: 'factura',
        width: '120px',
        sortable: false
      }, {
        text: 'Valor',
        value: 'Valorfactura',
        width: '130px',
        align: 'end'
      }, {
        text: 'Acciones',
        value: 'btnAcciones',
        width: '120px',
        sortable: false,
        align: 'center'
      }],
      index: -1,
      loader: false,
      mensajeError: false,
      pedidosCalox: [],
      saldo: 0,
      search: '',
      title: 'Pedidos pendientes',
      todasLasFacturas: [],
      // Paginación personalizada
      currentPage: 1,
      itemsPerPage: 15,
      itemsPerPageOptions: [10, 15, 25, 50, 100]
    };
  },
  watch: {
    search: function search() {
      // Resetear página cuando cambie la búsqueda
      this.currentPage = 1;
    }
  },
  mounted: function mounted() {
    this.todasLasFacturas = this.ventas;
    var opcion = {
      pendientes: true,
      canceladas: false,
      pagadas: false
    };
    this.filtrar(opcion);
  },
  methods: {
    filtrar: function filtrar(opcion) {
      var _this = this;
      this.loader = true;
      var facturas = [];
      if (opcion.canceladas) {
        this.title = 'Pedidos cancelados';
        this.todasLasFacturas.map(function (el) {
          if (el.estado_id === 3) {
            facturas.push(Object.assign({}, el));
          }
        });
        this.setVentas(facturas);
      } else if (opcion.pagadas) {
        this.title = 'Pedidos pagados';
        this.todasLasFacturas.map(function (el) {
          if (el.estado_id === 6) {
            facturas.push(Object.assign({}, el));
          }
        });
        this.setVentas(facturas);
      } else if (opcion.pendientes) {
        this.title = 'Pedidos pendientes';
        this.todasLasFacturas.map(function (el) {
          if (el.estado_id === 4 || el.estado_id === 5 || el.estado_id === 1) {
            facturas.push(Object.assign({}, el));
          }
        });
        this.setVentas(facturas);
      }
      this.modalFiltrar = false;
      setTimeout(function () {
        _this.loader = false;
      }, 500);
    },
    getStatusClass: function getStatusClass(estadoId) {
      switch (estadoId) {
        case 1:
          return 'status-nuevo';
        case 3:
          return 'status-cancelado';
        case 4:
          return 'status-pendiente';
        case 5:
          return 'status-parcial';
        case 6:
          return 'status-pagado';
        default:
          return 'status-default';
      }
    },
    getStatusText: function getStatusText(estadoId) {
      switch (estadoId) {
        case 1:
          return 'Nuevo';
        case 3:
          return 'Cancelado';
        case 4:
          return 'Pendiente';
        case 5:
          return 'Parcial';
        case 6:
          return 'Pagado';
        default:
          return 'N/A';
      }
    },
    formatingDate: function formatingDate(dateToFormat) {
      var d = new Date(dateToFormat);
      var day = d.getDate() < 10 ? "0".concat(d.getDate()) : d.getDate();
      var month = d.getMonth() + 1 < 10 ? "0".concat(d.getMonth() + 1) : d.getMonth() + 1;
      var year = d.getFullYear();
      return "".concat(year, "-").concat(month, "-").concat(day);
    },
    historyCoin: function historyCoin(item) {
      this.$refs.historialPagos.getHistorialPagos(2, item);
    },
    opcionesFiltrado: function opcionesFiltrado() {
      this.$refs.filtros.showFiltros(2);
    },
    setTiempo: function setTiempo(item) {
      var hoy = new Date();
      var fecha = new Date(item); //Calcula el tiempo transcurrido de la factura
      var tiempo = Math.round((hoy.getTime() - fecha.getTime()) / 86400000);
      return tiempo;
    },
    setVentas: function setVentas(facturas) {
      var _this2 = this;
      this.pedidosCalox = [];
      facturas.map(function (el) {
        _this2.pedidosCalox.push({
          id: el.id,
          cliente: el.razon_social + ' - ' + el.mcpio,
          laboratorio: el.Laboratorio,
          logo: el.logo,
          num_pedido: el.num_pedido,
          numero_factura: el.numero_factura,
          fecha_pedido: el.fecha,
          fecha_factura: el.fecha_factura,
          valor: el.valor,
          total_factura: el.total_factura,
          estado_id: el.estado_id
        });
      });

      // Reset pagination
      this.currentPage = 1;
    },
    // Métodos de paginación
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
      if (page !== '...' && page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    changeItemsPerPage: function changeItemsPerPage() {
      this.currentPage = 1; // Reset to first page
    },
    getVisiblePages: function getVisiblePages() {
      var total = this.totalPages;
      var current = this.currentPage;
      var pages = [];
      if (total <= 7) {
        // Si hay 7 páginas o menos, mostrar todas
        for (var i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Lógica para páginas con elipsis
        if (current <= 4) {
          // Cerca del inicio
          for (var _i = 1; _i <= 5; _i++) {
            pages.push(_i);
          }
          pages.push('ellipsis');
          pages.push(total);
        } else if (current >= total - 3) {
          // Cerca del final
          pages.push(1);
          pages.push('ellipsis');
          for (var _i2 = total - 4; _i2 <= total; _i2++) {
            pages.push(_i2);
          }
        } else {
          // En el medio
          pages.push(1);
          pages.push('ellipsis');
          for (var _i3 = current - 1; _i3 <= current + 1; _i3++) {
            pages.push(_i3);
          }
          pages.push('ellipsis');
          pages.push(total);
        }
      }
      return pages;
    }
  },
  computed: {
    filteredData: function filteredData() {
      var filtered = this.pedidosCalox;

      // Aplicar filtro de búsqueda
      if (this.search) {
        var searchTerm = this.search.toLowerCase();
        filtered = filtered.filter(function (item) {
          return item.cliente.toLowerCase().includes(searchTerm) || item.num_pedido.toString().includes(searchTerm) || item.numero_factura && item.numero_factura.toString().includes(searchTerm);
        });
      }
      return filtered;
    },
    paginatedPedidos: function paginatedPedidos() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    },
    totalPages: function totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    paginationInfo: function paginationInfo() {
      var start = (this.currentPage - 1) * this.itemsPerPage + 1;
      var end = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
      return {
        start: this.filteredData.length > 0 ? start : 0,
        end: end
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Professional Container */\n.pedidos-container[data-v-55c44250] {\r\n    min-height: 100vh;\r\n    background: #f8f9fa;\r\n    padding: 2rem;\n}\r\n\r\n/* Header Section */\n.header-section[data-v-55c44250] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 2rem;\n}\n.page-header h2[data-v-55c44250] {\r\n    font-size: 2.2rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.5rem 0;\r\n    display: flex;\r\n    align-items: center;\n}\r\n\r\n/* Sistema de iconos personalizados con emojis */\n.custom-icon[data-v-55c44250] {\r\n    display: inline-block;\r\n    font-size: 1.2em;\r\n    line-height: 1;\r\n    margin-right: 0.5rem;\r\n    vertical-align: middle;\r\n    font-style: normal;\r\n    font-weight: normal;\n}\n.custom-icon-document[data-v-55c44250] {\r\n    font-size: 2rem;\r\n    margin-right: 1rem;\r\n    color: #10b981;\n}\n.custom-icon-search[data-v-55c44250] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    z-index: 3;\r\n    pointer-events: none;\r\n    font-size: 1.2rem;\r\n    margin-right: 0;\r\n    color: #64748b;\n}\n.custom-icon-filter[data-v-55c44250] {\r\n    font-size: 1rem;\r\n    margin-right: 0.5rem;\r\n    color: white;\n}\r\n\r\n/* Iconos en headers de tabla */\n.professional-table thead th .custom-icon[data-v-55c44250] {\r\n    color: #10b981;\r\n    margin-right: 0.5rem;\r\n    font-size: 1.1rem;\n}\r\n\r\n/* Asegurar que los emojis se vean bien en todos los navegadores */\n.custom-icon[data-v-55c44250] {\r\n    font-family: \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Noto Color Emoji\", \"Android Emoji\", \"EmojiSymbols\", serif;\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\n}\n.page-title[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\r\n    font-weight: 700;\n}\n.page-description[data-v-55c44250] {\r\n    color: #64748b;\r\n    font-size: 1.1rem;\r\n    margin: 0;\r\n    font-weight: 400;\n}\n.header-actions[data-v-55c44250] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    align-items: center;\r\n    flex-wrap: wrap;\n}\n.search-box[data-v-55c44250] {\r\n    position: relative;\r\n    min-width: 300px;\n}\n.search-input[data-v-55c44250] {\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 1rem 0 3rem !important;\r\n    border: 2px solid #e2e8f0;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: rgba(255, 255, 255, 0.9);\r\n    backdrop-filter: blur(10px);\r\n    transition: all 0.3s ease;\n}\n.search-input[data-v-55c44250]::-moz-placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-55c44250]::placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-55c44250]:focus {\r\n    outline: none;\r\n    border-color: #10b981;\r\n    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);\r\n    background: white;\n}\n.new-lab-btn[data-v-55c44250] {\r\n    height: 50px;\r\n    padding: 0 2rem;\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);\n}\n.new-lab-btn[data-v-55c44250]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);\r\n    color: white;\n}\r\n\r\n/* Professional Header */\n.professional-header[data-v-55c44250] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2.5rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.header-content[data-v-55c44250] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: flex-start;\n}\n.header-left[data-v-55c44250] {\r\n    flex: 1;\n}\n.header-title[data-v-55c44250] {\r\n    font-size: 2.5rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    margin: 0 0 0.5rem 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\n}\n.header-icon[data-v-55c44250] {\r\n    color: #3b82f6;\r\n    font-size: 2rem;\n}\n.header-subtitle[data-v-55c44250] {\r\n    font-size: 1.1rem;\r\n    color: #64748b;\r\n    margin: 0;\r\n    line-height: 1.6;\n}\n.header-right[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\n}\n.stats-badge[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    padding: 1.5rem 2rem;\r\n    border-radius: 16px;\r\n    text-align: center;\r\n    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);\r\n    min-width: 120px;\n}\n.stat-number[data-v-55c44250] {\r\n    display: block;\r\n    font-size: 2rem;\r\n    font-weight: 700;\r\n    line-height: 1;\r\n    margin-bottom: 0.5rem;\n}\n.stat-label[data-v-55c44250] {\r\n    display: block;\r\n    font-size: 0.9rem;\r\n    font-weight: 500;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\r\n    opacity: 0.9;\n}\r\n\r\n/* Professional Controls */\n.controls-section[data-v-55c44250] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.search-filter-container[data-v-55c44250] {\r\n    display: flex;\r\n    gap: 1.5rem;\r\n    align-items: center;\n}\n.search-container[data-v-55c44250] {\r\n    position: relative;\r\n    flex: 1;\r\n    max-width: 500px;\n}\n.search-icon[data-v-55c44250] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    color: #64748b;\r\n    font-size: 1rem;\r\n    z-index: 2;\n}\n.search-input[data-v-55c44250] {\r\n    width: 100%;\r\n    padding: 1rem 1rem 1rem 3rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: #f8fafc;\r\n    color: #374151;\r\n    outline: none;\r\n    transition: all 0.3s ease;\n}\n.search-input[data-v-55c44250]:focus {\r\n    border-color: #3b82f6;\r\n    background: white;\r\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.search-input[data-v-55c44250]::-moz-placeholder {\r\n    color: #9ca3af;\n}\n.search-input[data-v-55c44250]::placeholder {\r\n    color: #9ca3af;\n}\n.clear-search-btn[data-v-55c44250] {\r\n    position: absolute;\r\n    right: 0.75rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    background: #f3f4f6;\r\n    border: none;\r\n    border-radius: 6px;\r\n    width: 28px;\r\n    height: 28px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    color: #6b7280;\r\n    transition: all 0.2s ease;\n}\n.clear-search-btn[data-v-55c44250]:hover {\r\n    background: #e5e7eb;\r\n    color: #374151;\n}\n.professional-btn[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem 2rem;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    text-decoration: none;\n}\n.btn-filter[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);\n}\n.btn-filter[data-v-55c44250]:hover {\r\n    transform: translateY(-3px);\r\n    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);\n}\r\n\r\n/* Loading Section */\n.loading-section[data-v-55c44250] {\r\n    margin-top: 2rem;\r\n    width: 100%;\n}\n.professional-report-container[data-v-55c44250] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    overflow: hidden;\r\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    width: 100%;\r\n    box-sizing: border-box;\n}\n.loader-container[data-v-55c44250] {\r\n    text-align: center;\r\n    padding: 4rem 2rem;\n}\n.spinner-professional[data-v-55c44250] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border: 4px solid #e5e7eb;\r\n    border-top: 4px solid #3b82f6;\r\n    border-radius: 50%;\r\n    animation: spin-55c44250 1s linear infinite;\r\n    margin: 0 auto 2rem;\n}\n.loader-title[data-v-55c44250] {\r\n    color: #1e293b;\r\n    font-size: 1.5rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.75rem 0;\n}\n.loader-subtitle[data-v-55c44250] {\r\n    color: #64748b;\r\n    font-size: 1rem;\r\n    font-weight: 500;\r\n    margin: 0 0 2rem 0;\r\n    line-height: 1.5;\n}\n.loading-progress[data-v-55c44250] {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 4px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.progress-bar[data-v-55c44250] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #3b82f6, #2563eb);\r\n    border-radius: 2px;\r\n    animation: progress-55c44250 2s ease-in-out infinite;\n}\n.filter-container[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: stretch;\n}\n.filter-btn[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    border: none;\r\n    padding: 0.875rem 1.5rem;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 0.9rem;\r\n    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\r\n    white-space: nowrap;\n}\n.filter-btn .v-icon[data-v-55c44250] {\r\n    margin-right: 0.25rem;\n}\n.filter-btn[data-v-55c44250]:hover {\r\n    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);\n}\n.filter-btn[data-v-55c44250]:active {\r\n    transform: translateY(0);\n}\r\n\r\n/* Content */\n.pedidos-content[data-v-55c44250] {\r\n    margin-top: 0;\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-55c44250] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-55c44250] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\r\n    min-width: 900px;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #10b981;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-55c44250] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\n}\n.professional-table tbody tr[data-v-55c44250]:hover {\r\n    background: rgba(16, 185, 129, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-55c44250] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.lab-cell[data-v-55c44250] {\r\n    text-align: center;\n}\n.lab-logo[data-v-55c44250] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 8px;\r\n    -o-object-fit: contain;\r\n       object-fit: contain;\r\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.client-cell[data-v-55c44250] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.client-name[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\r\n    display: block;\r\n    margin-bottom: 0.25rem;\n}\n.client-location[data-v-55c44250] {\r\n    color: #64748b;\r\n    font-size: 0.85rem;\r\n    font-weight: 500;\n}\n.date-cell[data-v-55c44250] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.date-value[data-v-55c44250] {\r\n    background: #f8fafc;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    border: 1px solid #e2e8f0;\n}\n.pedido-cell a.pedido-number[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);\r\n    color: #16a34a;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #86efac;\r\n    text-decoration: none;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    transition: all 0.3s ease;\n}\n.pedido-cell a.pedido-number[data-v-55c44250]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);\n}\n.invoice-cell a.invoice-number[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #92400e;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #fcd34d;\r\n    text-decoration: none;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    transition: all 0.3s ease;\n}\n.invoice-cell a.invoice-number[data-v-55c44250]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 5px 15px rgba(251, 191, 36, 0.3);\n}\n.no-factura[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);\r\n    color: #dc2626;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #f87171;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.amount-cell[data-v-55c44250] {\r\n    font-weight: 600;\r\n    font-family: 'Courier New', monospace;\n}\n.amount-value[data-v-55c44250] {\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    border: 1px solid #93c5fd;\n}\r\n\r\n/* Action Buttons */\n.action-buttons[data-v-55c44250] {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    justify-content: center;\n}\n.action-btn[data-v-55c44250] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    border: none;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 1rem;\r\n    text-decoration: none;\n}\n.history-btn[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);\n}\n.history-btn[data-v-55c44250]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);\n}\r\n\r\n/* Cell Styles */\n.client-cell[data-v-55c44250] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.client-name[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\r\n    display: block;\r\n    margin-bottom: 0.25rem;\n}\n.client-location[data-v-55c44250] {\r\n    color: #64748b;\r\n    font-size: 0.8rem;\r\n    font-weight: 500;\n}\n.invoice-cell[data-v-55c44250] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.pedido-number[data-v-55c44250], .invoice-number[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #92400e;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #fcd34d;\r\n    text-decoration: none;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pedido-number[data-v-55c44250]:hover, .invoice-number[data-v-55c44250]:hover {\r\n    background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);\r\n    transform: translateY(-1px);\r\n    box-shadow: 0 4px 8px rgba(146, 64, 14, 0.2);\n}\n.date-cell[data-v-55c44250] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.date-value[data-v-55c44250] {\r\n    background: #f8fafc;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    border: 1px solid #e2e8f0;\n}\n.amount-cell[data-v-55c44250] {\r\n    font-weight: 600;\r\n    font-family: 'Courier New', monospace;\n}\n.amount-value[data-v-55c44250] {\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    border: 1px solid #93c5fd;\n}\n.no-factura[data-v-55c44250] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.5rem 0.75rem;\r\n    background: #fef3c7;\r\n    color: #92400e;\r\n    border-radius: 8px;\r\n    font-size: 0.85rem;\r\n    font-weight: 600;\r\n    border: 1px solid #fcd34d;\r\n    white-space: nowrap;\n}\r\n\r\n/* Status Badges */\n.status-badge[data-v-55c44250] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\n}\n.status-nuevo[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #1d4ed8;\r\n    border: 1px solid #93c5fd;\n}\n.status-cancelado[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);\r\n    color: #dc2626;\r\n    border: 1px solid #f87171;\n}\n.status-pendiente[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);\r\n    color: #ea580c;\r\n    border: 1px solid #fb923c;\n}\n.status-parcial[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #d97706;\r\n    border: 1px solid #fcd34d;\n}\n.status-pagado[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);\r\n    color: #059669;\r\n    border: 1px solid #4ade80;\n}\n.status-default[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);\r\n    color: #64748b;\r\n    border: 1px solid #cbd5e1;\n}\r\n\r\n/* Action Buttons */\n.action-buttons[data-v-55c44250] {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    justify-content: center;\n}\n.action-btn[data-v-55c44250] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    border: none;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 1rem;\r\n    text-decoration: none;\n}\n.history-btn[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);\n}\n.history-btn[data-v-55c44250]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);\n}\r\n\r\n/* Logo Container */\n.logo-container[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.lab-logo[data-v-55c44250] {\r\n    width: 45px;\r\n    height: 45px;\r\n    -o-object-fit: contain;\r\n       object-fit: contain;\r\n    border-radius: 8px;\r\n    border: 2px solid #f1f5f9;\r\n    padding: 4px;\r\n    background: white;\r\n    transition: all 0.2s ease;\n}\n.lab-logo[data-v-55c44250]:hover {\r\n    transform: scale(1.1);\r\n    border-color: #3b82f6;\n}\n.client-info[data-v-55c44250] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.25rem;\n}\n.client-name[data-v-55c44250] {\r\n    font-weight: 600;\r\n    color: #1e293b;\r\n    font-size: 0.9rem;\r\n    line-height: 1.3;\n}\n.client-location[data-v-55c44250] {\r\n    color: #64748b;\r\n    font-size: 0.8rem;\r\n    font-weight: 500;\n}\n.date-container[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\n}\n.date-value[data-v-55c44250] {\r\n    background: #f8fafc;\r\n    padding: 0.4rem 0.75rem;\r\n    border-radius: 8px;\r\n    font-size: 0.85rem;\r\n    font-weight: 600;\r\n    color: #475569;\r\n    border: 1px solid #e2e8f0;\n}\n.action-container[data-v-55c44250] {\r\n    display: flex;\r\n    justify-content: center;\n}\n.pedido-btn[data-v-55c44250], .factura-btn[data-v-55c44250] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.5rem 0.75rem;\r\n    border-radius: 8px;\r\n    text-decoration: none !important;\r\n    font-weight: 600;\r\n    font-size: 0.85rem;\r\n    transition: all 0.2s ease;\r\n    border: 1px solid;\r\n    white-space: nowrap;\r\n    min-width: -moz-fit-content;\r\n    min-width: fit-content;\n}\n.pedido-btn .v-icon[data-v-55c44250],\r\n.factura-btn .v-icon[data-v-55c44250] {\r\n    font-size: 14px !important;\r\n    flex-shrink: 0;\r\n    margin-right: 0.25rem;\n}\n.pedido-btn[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #1d4ed8 !important;\r\n    border-color: #93c5fd;\n}\n.pedido-btn[data-v-55c44250]:hover {\r\n    background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);\r\n    color: #1d4ed8 !important;\r\n    transform: translateY(-1px);\r\n    box-shadow: 0 4px 8px rgba(29, 78, 216, 0.2);\n}\n.factura-btn[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);\r\n    color: #059669 !important;\r\n    border-color: #4ade80;\n}\n.factura-btn[data-v-55c44250]:hover {\r\n    background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);\r\n    color: #059669 !important;\r\n    transform: translateY(-1px);\r\n    box-shadow: 0 4px 8px rgba(5, 150, 105, 0.2);\n}\n.no-factura[data-v-55c44250] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.5rem 0.75rem;\r\n    background: #fef3c7;\r\n    color: #92400e;\r\n    border-radius: 8px;\r\n    font-size: 0.85rem;\r\n    font-weight: 600;\r\n    border: 1px solid #fcd34d;\r\n    white-space: nowrap;\n}\n.no-factura .v-icon[data-v-55c44250] {\r\n    font-size: 14px !important;\r\n    flex-shrink: 0;\r\n    margin-right: 0.25rem;\n}\n.value-container[data-v-55c44250] {\r\n    display: flex;\r\n    justify-content: flex-end;\n}\n.value-amount[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);\r\n    color: #16a34a;\r\n    padding: 0.5rem 0.75rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    font-family: 'Courier New', monospace;\r\n    font-size: 0.9rem;\r\n    border: 1px solid #bbf7d0;\n}\n.actions-container[data-v-55c44250] {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\n}\n.history-btn[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #d97706;\r\n    border: 1px solid #fcd34d;\r\n    border-radius: 8px;\r\n    width: 36px;\r\n    height: 36px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.2s ease;\r\n    font-size: 0.9rem;\r\n    min-width: 36px;\r\n    flex-shrink: 0;\n}\n.history-btn .v-icon[data-v-55c44250] {\r\n    font-size: 16px !important;\r\n    line-height: 1;\n}\n.history-btn[data-v-55c44250]:hover {\r\n    background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);\r\n    transform: translateY(-1px);\r\n    box-shadow: 0 4px 8px rgba(217, 119, 6, 0.2);\n}\r\n\r\n/* Status Indicators */\n.status-indicator[data-v-55c44250] {\r\n    padding: 0.375rem 0.75rem;\r\n    border-radius: 20px;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\r\n    text-align: center;\r\n    min-width: 80px;\n}\n.status-nuevo[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #1d4ed8;\r\n    border: 1px solid #93c5fd;\n}\n.status-cancelado[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);\r\n    color: #dc2626;\r\n    border: 1px solid #f87171;\n}\n.status-pendiente[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);\r\n    color: #ea580c;\r\n    border: 1px solid #fb923c;\n}\n.status-parcial[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #d97706;\r\n    border: 1px solid #fcd34d;\n}\n.status-pagado[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);\r\n    color: #059669;\r\n    border: 1px solid #4ade80;\n}\n.status-default[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);\r\n    color: #64748b;\r\n    border: 1px solid #cbd5e1;\n}\r\n\r\n\r\n\r\n/* Responsive Design */\n@media (max-width: 1200px) {\n.professional-header[data-v-55c44250] {\r\n        padding: 2rem;\n}\n.header-content[data-v-55c44250] {\r\n        flex-direction: column;\r\n        gap: 1.5rem;\r\n        align-items: center;\r\n        text-align: center;\n}\n.search-filter-container[data-v-55c44250] {\r\n        flex-direction: column;\r\n        gap: 1rem;\n}\n.search-container[data-v-55c44250] {\r\n        max-width: 100%;\n}\n.professional-btn[data-v-55c44250] {\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n.header-title[data-v-55c44250] {\r\n        font-size: 2rem;\n}\n}\n@media (max-width: 768px) {\n.pedidos-container[data-v-55c44250] {\r\n        padding: 1rem;\n}\n.professional-header[data-v-55c44250],\r\n    .controls-section[data-v-55c44250] {\r\n        border-radius: 16px;\r\n        padding: 1.5rem;\n}\n.professional-report-container[data-v-55c44250] {\r\n        border-radius: 16px;\n}\n.loader-container[data-v-55c44250] {\r\n        padding: 3rem 1.5rem;\n}\n.loader-title[data-v-55c44250] {\r\n        font-size: 1.3rem;\n}\n.loader-subtitle[data-v-55c44250] {\r\n        font-size: 0.9rem;\n}\n.table-card[data-v-55c44250] {\r\n        border-radius: 16px !important;\n}\n.header-title[data-v-55c44250] {\r\n        font-size: 1.8rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 0.5rem;\n}\n.custom-data-table[data-v-55c44250] thead th {\r\n        font-size: 0.75rem !important;\r\n        padding: 0.75rem 0.5rem !important;\n}\n.custom-data-table[data-v-55c44250] tbody td {\r\n        padding: 0.75rem 0.5rem !important;\r\n        font-size: 0.85rem;\n}\r\n    \r\n    /* Responsive Pagination */\n.pagination-section[data-v-55c44250] {\r\n        padding: 1rem;\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        gap: 1rem;\n}\n.pagination-info[data-v-55c44250] {\r\n        justify-content: center;\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        text-align: center;\n}\n.items-per-page[data-v-55c44250] {\r\n        justify-content: center;\n}\n.pagination-controls[data-v-55c44250] {\r\n        justify-content: center;\r\n        flex-wrap: wrap;\n}\n.page-numbers[data-v-55c44250] {\r\n        margin: 0 0.5rem;\r\n        flex-wrap: wrap;\r\n        justify-content: center;\n}\n.pagination-btn[data-v-55c44250] {\r\n        font-size: 0.8rem;\r\n        padding: 0.6rem 0.8rem;\n}\n.page-btn[data-v-55c44250] {\r\n        width: 35px;\r\n        height: 35px;\r\n        font-size: 0.8rem;\n}\n.lab-logo[data-v-55c44250] {\r\n        width: 35px;\r\n        height: 35px;\n}\n.client-name[data-v-55c44250] {\r\n        font-size: 0.85rem;\n}\n.client-location[data-v-55c44250] {\r\n        font-size: 0.75rem;\n}\n}\n@media (max-width: 480px) {\n.pedidos-container[data-v-55c44250] {\r\n        padding: 0.75rem;\n}\n.professional-header[data-v-55c44250],\r\n    .controls-section[data-v-55c44250] {\r\n        padding: 1.25rem;\n}\n.header-title[data-v-55c44250] {\r\n        font-size: 1.6rem;\n}\n.loader-container[data-v-55c44250] {\r\n        padding: 2.5rem 1rem;\n}\n.loader-title[data-v-55c44250] {\r\n        font-size: 1.2rem;\n}\n.loader-subtitle[data-v-55c44250] {\r\n        font-size: 0.85rem;\n}\n.spinner-professional[data-v-55c44250] {\r\n        width: 50px;\r\n        height: 50px;\n}\n.stats-badge[data-v-55c44250] {\r\n        min-width: 100px;\r\n        padding: 1.25rem 1.5rem;\n}\n.stat-number[data-v-55c44250] {\r\n        font-size: 1.75rem;\n}\n.pagination-controls[data-v-55c44250] {\r\n        flex-direction: column;\r\n        gap: 1rem;\n}\n.page-numbers[data-v-55c44250] {\r\n        margin: 0;\r\n        order: 2;\n}\n.prev-btn[data-v-55c44250] {\r\n        order: 1;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n.next-btn[data-v-55c44250] {\r\n        order: 3;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n}\r\n\r\n/* Loading state */\n.custom-data-table[data-v-55c44250] .v-data-table__progress {\r\n    background: linear-gradient(90deg, #3b82f6, #17a2b8, #3b82f6);\r\n    background-size: 200% 100%;\r\n    animation: loading-55c44250 1.5s ease-in-out infinite;\n}\n@keyframes loading-55c44250 {\n0% { background-position: 200% 0;\n}\n100% { background-position: -200% 0;\n}\n}\r\n\r\n/* Animations for Professional Loader */\n@keyframes spin-55c44250 {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes progress-55c44250 {\n0% { transform: translateX(-100%);\n}\n50% { transform: translateX(0%);\n}\n100% { transform: translateX(100%);\n}\n}\r\n\r\n/* No data state */\n.custom-data-table[data-v-55c44250] .v-data-table__empty-wrapper {\r\n    padding: 3rem;\r\n    text-align: center;\r\n    color: #64748b;\r\n    font-size: 1rem;\n}\r\n\r\n/* Hover effects for interactive elements */\n.pedido-btn[data-v-55c44250]:focus,\r\n.factura-btn[data-v-55c44250]:focus,\r\n.history-btn[data-v-55c44250]:focus {\r\n    outline: 2px solid #3b82f6;\r\n    outline-offset: 2px;\n}\r\n\r\n/* Professional Pagination Styles */\n.pagination-section[data-v-55c44250] {\r\n    background: white;\r\n    border-top: 2px solid #f1f5f9;\r\n    padding: 1.5rem 2rem;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 1rem;\r\n    border-radius: 0 0 16px 16px;\n}\n.pagination-info[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2rem;\r\n    flex-wrap: wrap;\n}\n.items-per-page[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-label[data-v-55c44250] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 0.9rem;\n}\n.items-select[data-v-55c44250] {\r\n    padding: 0.5rem 0.75rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #374151;\r\n    background: white;\r\n    cursor: pointer;\r\n    outline: none;\r\n    transition: all 0.3s ease;\n}\n.items-select[data-v-55c44250]:focus {\r\n    border-color: #3b82f6;\r\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.page-info-text[data-v-55c44250] {\r\n    font-size: 0.9rem;\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.pagination-controls[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-btn[data-v-55c44250] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.75rem 1rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\n}\n.pagination-btn[data-v-55c44250]:hover:not(:disabled) {\r\n    border-color: #3b82f6;\r\n    color: #3b82f6;\r\n    background: rgba(59, 130, 246, 0.05);\n}\n.pagination-btn[data-v-55c44250]:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n    color: #9ca3af;\n}\n.page-numbers[data-v-55c44250] {\r\n    display: flex;\r\n    gap: 0.25rem;\r\n    margin: 0 1rem;\n}\n.page-btn[data-v-55c44250] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.page-btn[data-v-55c44250]:hover:not(:disabled):not(.ellipsis) {\r\n    border-color: #3b82f6;\r\n    color: #3b82f6;\r\n    background: rgba(59, 130, 246, 0.05);\n}\n.page-btn.active[data-v-55c44250] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    border-color: #3b82f6;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);\n}\n.page-btn.ellipsis[data-v-55c44250] {\r\n    border: none;\r\n    background: transparent;\r\n    cursor: default;\r\n    color: #9ca3af;\n}\n.page-btn.ellipsis[data-v-55c44250]:hover {\r\n    background: transparent;\r\n    border: none;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_style_index_0_id_55c44250_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_style_index_0_id_55c44250_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_style_index_0_id_55c44250_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=template&id=55c44250&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=template&id=55c44250&scoped=true ***!
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
    staticClass: "pedidos-container"
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
  }, [_vm._v("📋")]), _vm._v(" "), _c("span", {
    staticClass: "page-title"
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c("p", {
    staticClass: "page-description"
  }, [_vm._v("\n                    Gestión y seguimiento completo de pedidos con herramientas de búsqueda avanzada\n                ")])]), _vm._v(" "), _c("div", {
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
      placeholder: "Buscar por cliente, pedido o factura..."
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
  }, [_vm._v("🔽")]), _vm._v("\n                    Filtrar Pedidos\n                ")])])]), _vm._v(" "), _vm.loader ? _c("div", {
    staticClass: "loading-section"
  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), !_vm.loader ? _c("div", {
    staticClass: "pedidos-content"
  }, [_c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "desktop-table"
  }, [_c("div", {
    staticClass: "table-responsive professional-table-wrapper"
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(1), _vm._v(" "), _c("tbody", _vm._l(_vm.paginatedPedidos, function (item, index) {
    return _c("tr", {
      key: index,
      staticClass: "data-row"
    }, [_c("td", {
      staticClass: "text-center lab-cell"
    }, [_c("div", {
      staticClass: "logo-container"
    }, [_c("img", {
      staticClass: "lab-logo",
      attrs: {
        src: item.logo,
        alt: "Logo laboratorio"
      }
    })])]), _vm._v(" "), _c("td", {
      staticClass: "text-left client-cell"
    }, [_c("span", {
      staticClass: "client-name"
    }, [_vm._v(_vm._s(item.cliente.split(" - ")[0]))]), _vm._v(" "), _c("small", {
      staticClass: "client-location"
    }, [_vm._v(_vm._s(item.cliente.split(" - ")[1]))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center date-cell"
    }, [_c("span", {
      staticClass: "date-value"
    }, [_vm._v("\n                                            " + _vm._s(item.numero_factura == 0 ? item.fecha_pedido : item.fecha_factura) + "\n                                        ")])]), _vm._v(" "), _c("td", {
      staticClass: "text-center pedido-cell"
    }, [_c("a", {
      staticClass: "pedido-number",
      attrs: {
        href: "/imprimir-pedido-calox/1/" + item.num_pedido,
        target: "_blank"
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("🖨️")]), _vm._v("\n                                            " + _vm._s(item.num_pedido) + "\n                                        ")])]), _vm._v(" "), _c("td", {
      staticClass: "text-center invoice-cell"
    }, [item.numero_factura != 0 ? _c("a", {
      staticClass: "invoice-number",
      attrs: {
        href: "/imprimir-pedido-calox/2/" + item.id,
        target: "_blank"
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("📄")]), _vm._v(" " + _vm._s(item.numero_factura) + "\n                                        ")]) : _c("span", {
      staticClass: "no-factura"
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("⏰")]), _vm._v("\n                                            Pendiente\n                                        ")])]), _vm._v(" "), _c("td", {
      staticClass: "text-right amount-cell"
    }, [_c("span", {
      staticClass: "amount-value"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.total_factura)))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center actions-cell"
    }, [_c("div", {
      staticClass: "action-buttons"
    }, [item.estado_id === 6 || item.estado_id === 5 ? _c("button", {
      staticClass: "action-btn history-btn",
      attrs: {
        title: "Ver historial de abonos"
      },
      on: {
        click: function click($event) {
          return _vm.historyCoin(item);
        }
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("💳")])]) : _c("div", {
      staticClass: "status-badge",
      "class": _vm.getStatusClass(item.estado_id)
    }, [_vm._v("\n                                                " + _vm._s(_vm.getStatusText(item.estado_id)) + "\n                                            ")])])])]);
  }), 0)])])]), _vm._v(" "), _vm.filteredData.length > 0 ? _c("div", {
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
      }, _vm.changeItemsPerPage]
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
  }, [_vm._v("\n                                " + _vm._s(_vm.paginationInfo.start) + " - " + _vm._s(_vm.paginationInfo.end) + " de " + _vm._s(_vm.filteredData.length) + " registros\n                            ")])])]), _vm._v(" "), _c("div", {
    staticClass: "pagination-controls"
  }, [_c("button", {
    staticClass: "pagination-btn prev-btn",
    attrs: {
      disabled: _vm.currentPage === 1
    },
    on: {
      click: _vm.prevPage
    }
  }, [_c("i", {
    staticClass: "fas fa-chevron-left"
  }), _vm._v("\n                            Anterior\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "page-numbers"
  }, [_vm._l(_vm.getVisiblePages(), function (page) {
    return [page !== "ellipsis" ? _c("button", {
      key: "btn-" + page,
      "class": ["page-btn", {
        active: _vm.currentPage === page
      }],
      on: {
        click: function click($event) {
          return _vm.goToPage(page);
        }
      }
    }, [_vm._v("\n                                    " + _vm._s(page) + "\n                                ")]) : _c("span", {
      key: "ellipsis-" + page,
      staticClass: "page-btn ellipsis"
    }, [_vm._v("...")])];
  })], 2), _vm._v(" "), _c("button", {
    staticClass: "pagination-btn next-btn",
    attrs: {
      disabled: _vm.currentPage === _vm.totalPages
    },
    on: {
      click: _vm.nextPage
    }
  }, [_vm._v("\n                            Siguiente\n                            "), _c("i", {
    staticClass: "fas fa-chevron-right"
  })])])]) : _vm._e()])]) : _vm._e()], 1)]);
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
  }, [_vm._v("Cargando gestión de pedidos")]), _vm._v(" "), _c("p", {
    staticClass: "loader-subtitle"
  }, [_vm._v("Procesando información de pedidos, facturas y estados...")]), _vm._v(" "), _c("div", {
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("🏢")]), _vm._v("\n                                        Lab\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-left"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("👤")]), _vm._v("\n                                        Cliente\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("📅")]), _vm._v("\n                                        Fecha\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("📋")]), _vm._v("\n                                        Pedido\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("📄")]), _vm._v("\n                                        Factura\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-right"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("💰")]), _vm._v("\n                                        Valor\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("⚙️")]), _vm._v("\n                                        Acciones\n                                    ")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/GestionPedidos.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/GestionPedidos.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GestionPedidos_vue_vue_type_template_id_55c44250_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GestionPedidos.vue?vue&type=template&id=55c44250&scoped=true */ "./resources/js/components/GestionPedidos.vue?vue&type=template&id=55c44250&scoped=true");
/* harmony import */ var _GestionPedidos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GestionPedidos.vue?vue&type=script&lang=js */ "./resources/js/components/GestionPedidos.vue?vue&type=script&lang=js");
/* harmony import */ var _GestionPedidos_vue_vue_type_style_index_0_id_55c44250_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css */ "./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GestionPedidos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _GestionPedidos_vue_vue_type_template_id_55c44250_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _GestionPedidos_vue_vue_type_template_id_55c44250_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "55c44250",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/GestionPedidos.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/GestionPedidos.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/GestionPedidos.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GestionPedidos.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_style_index_0_id_55c44250_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=style&index=0&id=55c44250&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/GestionPedidos.vue?vue&type=template&id=55c44250&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/GestionPedidos.vue?vue&type=template&id=55c44250&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_template_id_55c44250_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_template_id_55c44250_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionPedidos_vue_vue_type_template_id_55c44250_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GestionPedidos.vue?vue&type=template&id=55c44250&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionPedidos.vue?vue&type=template&id=55c44250&scoped=true");


/***/ })

}]);