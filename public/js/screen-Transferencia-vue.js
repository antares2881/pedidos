"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-Transferencia-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      detalleProductos: [],
      loader: true,
      filterLoading: false,
      search: '',
      title: 'Transferencias Pendientes',
      todosPedidos: [],
      transferencia: {},
      transferencias: [],
      // Paginación
      currentPage: 1,
      itemsPerPage: 10,
      itemsPerPageOptions: [10, 25, 50, 100]
    };
  },
  computed: {
    filteredTransferencias: function filteredTransferencias() {
      var _this = this;
      var filtered = this.transferencias;

      // Aplicar filtro de búsqueda
      if (this.search) {
        filtered = filtered.filter(function (transfer) {
          return transfer.cliente.toLowerCase().includes(_this.search.toLowerCase()) || transfer.numero.toString().toLowerCase().includes(_this.search.toLowerCase());
        });
      }
      return filtered;
    },
    paginatedTransferencias: function paginatedTransferencias() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return this.filteredTransferencias.slice(start, end);
    },
    totalPages: function totalPages() {
      return Math.ceil(this.filteredTransferencias.length / this.itemsPerPage);
    },
    paginationInfo: function paginationInfo() {
      var start = (this.currentPage - 1) * this.itemsPerPage + 1;
      var end = Math.min(this.currentPage * this.itemsPerPage, this.filteredTransferencias.length);
      return {
        start: start,
        end: end,
        total: this.filteredTransferencias.length
      };
    }
  },
  watch: {
    search: function search() {
      // Resetear página cuando cambie la búsqueda
      this.currentPage = 1;
    }
  },
  mounted: function mounted() {
    this.getTransferencias();
  },
  methods: {
    filtrar: function filtrar(opcion) {
      var _this2 = this;
      // Mostrar loader completo al aplicar filtros
      this.loader = true;

      // Simular tiempo de procesamiento para mostrar el loader
      setTimeout(function () {
        _this2.aplicarFiltro(opcion);
        // Resetear página actual al aplicar filtros
        _this2.currentPage = 1;
        _this2.loader = false;
      }, 800); // 800ms para mostrar el loader como en HistorialFacturas
    },
    getLoaderTitle: function getLoaderTitle() {
      if (this.filterLoading) {
        return 'Aplicando filtros';
      }
      return 'Cargando transferencias';
    },
    getLoaderSubtitle: function getLoaderSubtitle() {
      if (this.filterLoading) {
        return 'Filtrando transferencias según criterios seleccionados...';
      }
      return 'Procesando información de transferencias y estados...';
    },
    aplicarFiltroInicial: function aplicarFiltroInicial() {
      // Aplicar filtro inicial inmediatamente sin delay
      var opcion = {
        canceladas: false,
        pagadas: false,
        pendientes: true
      };
      this.aplicarFiltro(opcion);
    },
    aplicarFiltro: function aplicarFiltro(opcion) {
      var pedidos = [];
      if (opcion.canceladas) {
        this.title = 'Transferencias Canceladas';
        this.todosPedidos.forEach(function (el) {
          if (el.estado_id === 3) {
            pedidos.push(Object.assign({}, el));
          }
        });
      } else if (opcion.pagadas) {
        this.title = 'Transferencias Completadas';
        this.todosPedidos.forEach(function (el) {
          if (el.estado_id === 2) {
            pedidos.push(Object.assign({}, el));
          }
        });
      } else if (opcion.pendientes) {
        this.title = 'Transferencias Pendientes';
        this.todosPedidos.forEach(function (el) {
          if (el.estado_id === 1) {
            pedidos.push(Object.assign({}, el));
          }
        });
      }
      this.setTransferencias(pedidos);
    },
    getColor: function getColor(estado) {
      if (estado === 1) return 'info';else if (estado === 2) return 'success';else return 'red';
    },
    getStatusClass: function getStatusClass(estadoId) {
      if (estadoId === 1) return 'status-pending';else if (estadoId === 2) return 'status-completed';else return 'status-cancelled';
    },
    getStatusIcon: function getStatusIcon(estadoId) {
      if (estadoId === 1) return 'fas fa-clock';else if (estadoId === 2) return 'fas fa-check-circle';else return 'fas fa-times-circle';
    },
    getStatusEmoji: function getStatusEmoji(estadoId) {
      if (estadoId === 1) return '⏰';else if (estadoId === 2) return '✅';else return '❌';
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
    getTransferencias: function getTransferencias() {
      var _this3 = this;
      axios.get('/historial-transferencias').then(function (res) {
        // console.log(res.data)
        _this3.todosPedidos = res.data;
        // Aplicar filtro inicial inmediatamente
        _this3.aplicarFiltroInicial();
        _this3.loader = false;
      })["catch"](function (err) {
        console.log(err);
        _this3.loader = false;
      });
    },
    opcionesFiltrado: function opcionesFiltrado() {
      console.log('Abriendo modal de filtros');
      this.$refs.filtros.showFiltros(3);
    },
    setTransferencias: function setTransferencias(pedidos) {
      // Optimización: usar map para mejor rendimiento
      this.transferencias = pedidos.map(function (pedido) {
        return {
          id: pedido.id,
          nit: pedido.clientes.nit,
          dv: pedido.clientes.dv,
          cliente: pedido.clientes.razon_social,
          estado: pedido.estados.estado,
          estado_id: pedido.estado_id,
          numero: pedido.numero,
          fecha: pedido.fecha,
          valor: pedido.valor,
          factura: pedido.factura
        };
      });
    },
    showTransfer: function showTransfer(item) {
      this.$refs.imprimir.showTransferencia(item);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Professional Container */\n.transfers-container[data-v-160fda8c] {\r\n    min-height: 100vh;\r\n    background: #f8f9fa;\r\n    padding: 2rem;\n}\r\n\r\n/* Header Section */\n.header-section[data-v-160fda8c] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 2rem;\n}\n.page-header h2[data-v-160fda8c] {\r\n    font-size: 2.2rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.5rem 0;\r\n    display: flex;\r\n    align-items: center;\n}\r\n\r\n/* Sistema de iconos personalizados con emojis */\n.custom-icon[data-v-160fda8c] {\r\n    display: inline-block;\r\n    font-size: 1.2em;\r\n    line-height: 1;\r\n    margin-right: 0.5rem;\r\n    vertical-align: middle;\r\n    font-style: normal;\r\n    font-weight: normal;\n}\n.custom-icon-document[data-v-160fda8c] {\r\n    font-size: 2rem;\r\n    margin-right: 1rem;\r\n    color: #17a2b8;\n}\n.custom-icon-search[data-v-160fda8c] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    z-index: 3;\r\n    pointer-events: none;\r\n    font-size: 1.2rem;\r\n    margin-right: 0;\r\n    color: #64748b;\n}\n.custom-icon-filter[data-v-160fda8c] {\r\n    font-size: 1rem;\r\n    margin-right: 0.5rem;\r\n    color: white;\n}\r\n\r\n/* Iconos en headers de tabla */\n.professional-table thead th .custom-icon[data-v-160fda8c] {\r\n    color: #17a2b8;\r\n    margin-right: 0.5rem;\r\n    font-size: 1.1rem;\n}\r\n\r\n/* Iconos de cliente móvil */\n.client-icon.custom-icon[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.3rem;\r\n    margin-right: 0.75rem;\n}\r\n\r\n/* Iconos de información móvil */\n.info-icon.custom-icon[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);\r\n    color: #17a2b8;\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.1rem;\r\n    margin-right: 0;\n}\r\n\r\n/* Iconos de estado */\n.status-flag.custom-icon[data-v-160fda8c] {\r\n    font-size: 1.5rem;\r\n    color: #64748b;\r\n    margin-right: 1rem;\n}\r\n\r\n/* Botones de acción con iconos */\n.action-btn .custom-icon[data-v-160fda8c] {\r\n    font-size: 1.2rem;\r\n    margin: 0;\n}\n.mobile-action-btn .custom-icon[data-v-160fda8c] {\r\n    font-size: 1.1rem;\r\n    margin-right: 0.5rem;\n}\r\n\r\n/* Iconos de paginación */\n.pagination-btn .custom-icon[data-v-160fda8c] {\r\n    font-size: 1rem;\r\n    margin: 0 0.25rem;\n}\r\n\r\n/* Estados específicos de iconos */\n.status-badge .custom-icon[data-v-160fda8c],\r\n.status-badge-mobile .custom-icon[data-v-160fda8c] {\r\n    margin-right: 0.5rem;\r\n    font-size: 1rem;\n}\r\n\r\n/* Asegurar que los emojis se vean bien en todos los navegadores */\n.custom-icon[data-v-160fda8c] {\r\n    font-family: \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Noto Color Emoji\", \"Android Emoji\", \"EmojiSymbols\", serif;\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\n}\n.page-title[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #17a2b8 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\r\n    font-weight: 700;\n}\n.page-description[data-v-160fda8c] {\r\n    color: #64748b;\r\n    font-size: 1.1rem;\r\n    margin: 0;\r\n    font-weight: 400;\n}\n.header-actions[data-v-160fda8c] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    align-items: center;\r\n    flex-wrap: wrap;\n}\n.search-box[data-v-160fda8c] {\r\n    position: relative;\r\n    min-width: 300px;\n}\n.search-input[data-v-160fda8c] {\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 1rem 0 3rem !important;\r\n    border: 2px solid #e2e8f0;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: rgba(255, 255, 255, 0.9);\r\n    backdrop-filter: blur(10px);\r\n    transition: all 0.3s ease;\n}\n.search-input[data-v-160fda8c]::-moz-placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-160fda8c]::placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-160fda8c]:focus {\r\n    outline: none;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);\r\n    background: white;\n}\n.new-lab-btn[data-v-160fda8c] {\r\n    height: 50px;\r\n    padding: 0 2rem;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #17a2b8 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);\n}\n.new-lab-btn[data-v-160fda8c]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);\r\n    color: white;\n}\r\n\r\n\r\n\r\n/* Loading Section */\n.loading-section[data-v-160fda8c] {\r\n    margin-top: 2rem;\r\n    width: 100%;\n}\n.professional-report-container[data-v-160fda8c] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    overflow: hidden;\r\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    width: 100%;\r\n    box-sizing: border-box;\n}\n.loader-container[data-v-160fda8c] {\r\n    text-align: center;\r\n    padding: 4rem 2rem;\n}\n.spinner-professional[data-v-160fda8c] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border: 4px solid #e5e7eb;\r\n    border-top: 4px solid #17a2b8;\r\n    border-radius: 50%;\r\n    animation: spin-160fda8c 1s linear infinite;\r\n    margin: 0 auto 2rem;\n}\n.loader-title[data-v-160fda8c] {\r\n    color: #1e293b;\r\n    font-size: 1.5rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.75rem 0;\n}\n.loader-subtitle[data-v-160fda8c] {\r\n    color: #64748b;\r\n    font-size: 1rem;\r\n    font-weight: 500;\r\n    margin: 0 0 2rem 0;\r\n    line-height: 1.5;\n}\n.loading-progress[data-v-160fda8c] {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 4px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.progress-bar[data-v-160fda8c] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #17a2b8, #17a2b8);\r\n    border-radius: 2px;\r\n    animation: progress-160fda8c 2s ease-in-out infinite;\n}\r\n\r\n/* Content */\n.transfers-content[data-v-160fda8c] {\r\n    margin-top: 2rem;\n}\r\n\r\n/* Mobile Cards - Hidden by default */\n.mobile-cards-container[data-v-160fda8c] {\r\n    display: none;\n}\n.desktop-table[data-v-160fda8c] {\r\n    display: block;\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-160fda8c] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-160fda8c] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\r\n    min-width: 900px;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #17a2b8;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-160fda8c] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\n}\n.professional-table tbody tr[data-v-160fda8c]:hover {\r\n    background: rgba(139, 92, 246, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-160fda8c] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.client-cell[data-v-160fda8c] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.client-name[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\n}\n.transfer-cell[data-v-160fda8c] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.transfer-number[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);\r\n    color: #17a2b8;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #c4b5fd;\n}\n.date-cell[data-v-160fda8c] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.date-value[data-v-160fda8c] {\r\n    background: #f8fafc;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    border: 1px solid #e2e8f0;\n}\n.amount-cell[data-v-160fda8c] {\r\n    font-weight: 600;\r\n    font-family: 'Courier New', monospace;\n}\n.amount-value[data-v-160fda8c] {\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    border: 1px solid #93c5fd;\n}\r\n\r\n/* Status Badges */\n.status-badge[data-v-160fda8c] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\n}\n.status-pending[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);\r\n    color: #d97706;\r\n    border: 1px solid #fbbf24;\n}\n.status-completed[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);\r\n    color: #059669;\r\n    border: 1px solid #4ade80;\n}\n.status-cancelled[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);\r\n    color: #dc2626;\r\n    border: 1px solid #f87171;\n}\r\n\r\n/* Action Buttons */\n.action-buttons[data-v-160fda8c] {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    justify-content: center;\n}\n.action-btn[data-v-160fda8c] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    border: none;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 1rem;\r\n    text-decoration: none;\n}\n.view-btn[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);\n}\n.view-btn[data-v-160fda8c]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\r\n\r\n/* Mobile Cards Styles */\n.transfer-card[data-v-160fda8c] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    margin-bottom: 1rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    transition: all 0.3s ease;\n}\n.transfer-card[data-v-160fda8c]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.card-header[data-v-160fda8c] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 1.5rem;\r\n    padding-bottom: 1rem;\r\n    border-bottom: 2px solid #f1f5f9;\n}\n.client-info[data-v-160fda8c] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    flex: 1;\n}\n.client-icon[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.1rem;\n}\n.client-name-mobile[data-v-160fda8c] {\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-size: 1.1rem;\r\n    line-height: 1.2;\n}\n.transfer-badge[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);\r\n    color: #17a2b8;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 10px;\r\n    font-weight: 700;\r\n    border: 1px solid #c4b5fd;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    font-size: 0.9rem;\n}\n.card-body[data-v-160fda8c] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1.5rem;\n}\n.info-row[data-v-160fda8c] {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 1rem;\n}\n.info-item[data-v-160fda8c] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\n}\n.info-icon[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);\r\n    color: #2563eb;\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 0.9rem;\n}\n.info-content[data-v-160fda8c] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.25rem;\r\n    flex: 1;\n}\n.info-label[data-v-160fda8c] {\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    color: #64748b;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.info-value[data-v-160fda8c] {\r\n    font-size: 1rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\n}\r\n\r\n/* Status Section Mobile */\n.status-section[data-v-160fda8c] {\r\n    padding: 1.5rem;\r\n    background: #f8fafc;\r\n    border-radius: 12px;\r\n    border: 1px solid #e2e8f0;\n}\n.status-container[data-v-160fda8c] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    justify-content: center;\n}\n.status-flag[data-v-160fda8c] {\r\n    font-size: 1.5rem;\r\n    color: #64748b;\n}\n.status-badge-mobile[data-v-160fda8c] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.75rem 1.25rem;\r\n    border-radius: 12px;\r\n    font-weight: 700;\r\n    font-size: 1rem;\r\n    flex: 1;\r\n    justify-content: center;\n}\r\n\r\n/* Actions Section Mobile */\n.actions-section[data-v-160fda8c] {\r\n    display: flex;\r\n    gap: 1rem;\n}\n.mobile-action-btn[data-v-160fda8c] {\r\n    flex: 1;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    text-decoration: none;\r\n    border: none;\n}\r\n\r\n/* Pagination Styles (same as HistorialFacturas) */\n.pagination-section[data-v-160fda8c] {\r\n    background: white;\r\n    border-top: 2px solid #f1f5f9;\r\n    padding: 1.5rem 2rem;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 1rem;\n}\n.pagination-info[data-v-160fda8c] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2rem;\r\n    flex-wrap: wrap;\n}\n.items-per-page[data-v-160fda8c] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-label[data-v-160fda8c] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 0.9rem;\n}\n.items-select[data-v-160fda8c] {\r\n    padding: 0.5rem 0.75rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #374151;\r\n    background: white;\r\n    cursor: pointer;\r\n    outline: none;\r\n    transition: all 0.3s ease;\n}\n.items-select[data-v-160fda8c]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);\n}\n.page-info-text[data-v-160fda8c] {\r\n    font-size: 0.9rem;\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.pagination-controls[data-v-160fda8c] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-btn[data-v-160fda8c] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.75rem 1rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\n}\n.pagination-btn[data-v-160fda8c]:hover:not(:disabled) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    background: rgba(139, 92, 246, 0.05);\n}\n.pagination-btn[data-v-160fda8c]:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n    color: #9ca3af;\n}\n.page-numbers[data-v-160fda8c] {\r\n    display: flex;\r\n    gap: 0.25rem;\r\n    margin: 0 1rem;\n}\n.page-btn[data-v-160fda8c] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.page-btn[data-v-160fda8c]:hover:not(:disabled):not(.ellipsis) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    background: rgba(139, 92, 246, 0.05);\n}\n.page-btn.active[data-v-160fda8c] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #17a2b8 100%);\r\n    color: white;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);\n}\n.page-btn.ellipsis[data-v-160fda8c] {\r\n    border: none;\r\n    background: transparent;\r\n    cursor: default;\r\n    color: #9ca3af;\n}\n.page-btn.ellipsis[data-v-160fda8c]:hover {\r\n    background: transparent;\r\n    border: none;\n}\r\n\r\n/* Animations */\n@keyframes spin-160fda8c {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes progress-160fda8c {\n0% { transform: translateX(-100%);\n}\n50% { transform: translateX(0%);\n}\n100% { transform: translateX(100%);\n}\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 1024px) {\n.header-section[data-v-160fda8c] {\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        text-align: center;\n}\n.header-actions[data-v-160fda8c] {\r\n        justify-content: center;\n}\n.search-box[data-v-160fda8c] {\r\n        min-width: 100%;\n}\n.page-header h2[data-v-160fda8c] {\r\n        font-size: 2rem;\r\n        justify-content: center;\n}\n}\n@media (max-width: 900px) {\r\n    /* Show mobile cards, hide desktop table */\n.desktop-table[data-v-160fda8c] {\r\n        display: none;\n}\n.mobile-cards-container[data-v-160fda8c] {\r\n        display: block;\r\n        padding: 0 0.5rem;\n}\n}\n@media (max-width: 768px) {\n.transfers-container[data-v-160fda8c] {\r\n        padding: 1rem;\n}\n.header-section[data-v-160fda8c] {\r\n        border-radius: 16px;\r\n        padding: 1.5rem;\n}\n.professional-report-container[data-v-160fda8c] {\r\n        border-radius: 16px;\n}\n.page-header h2[data-v-160fda8c] {\r\n        font-size: 1.8rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 0.5rem;\n}\n.transfer-card[data-v-160fda8c] {\r\n        margin-bottom: 1rem;\r\n        padding: 1.25rem;\r\n        border-radius: 14px;\n}\n.card-header[data-v-160fda8c] {\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        align-items: stretch;\r\n        margin-bottom: 1.25rem;\n}\n.client-info[data-v-160fda8c] {\r\n        justify-content: center;\r\n        text-align: center;\n}\n.client-name-mobile[data-v-160fda8c] {\r\n        font-size: 1rem;\r\n        text-align: center;\n}\n.transfer-badge[data-v-160fda8c] {\r\n        align-self: center;\r\n        font-size: 0.85rem;\n}\n.info-row[data-v-160fda8c] {\r\n        grid-template-columns: 1fr;\r\n        gap: 0.75rem;\n}\n.pagination-section[data-v-160fda8c] {\r\n        padding: 1rem;\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        gap: 1rem;\n}\n.pagination-info[data-v-160fda8c] {\r\n        justify-content: center;\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        text-align: center;\n}\n.items-per-page[data-v-160fda8c] {\r\n        justify-content: center;\n}\n.pagination-controls[data-v-160fda8c] {\r\n        justify-content: center;\r\n        flex-wrap: wrap;\n}\n.page-numbers[data-v-160fda8c] {\r\n        margin: 0 0.5rem;\r\n        flex-wrap: wrap;\r\n        justify-content: center;\n}\n}\n@media (max-width: 480px) {\n.transfers-container[data-v-160fda8c] {\r\n        padding: 0.75rem;\n}\n.header-section[data-v-160fda8c] {\r\n        padding: 1.25rem;\n}\n.page-header h2[data-v-160fda8c] {\r\n        font-size: 1.6rem;\n}\n.transfer-card[data-v-160fda8c] {\r\n        padding: 1rem;\r\n        margin-bottom: 0.875rem;\n}\n.client-name-mobile[data-v-160fda8c] {\r\n        font-size: 0.95rem;\n}\n.pagination-controls[data-v-160fda8c] {\r\n        flex-direction: column;\r\n        gap: 1rem;\n}\n.page-numbers[data-v-160fda8c] {\r\n        margin: 0;\r\n        order: 2;\n}\n.prev-btn[data-v-160fda8c] {\r\n        order: 1;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n.next-btn[data-v-160fda8c] {\r\n        order: 3;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_style_index_0_id_160fda8c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_style_index_0_id_160fda8c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_style_index_0_id_160fda8c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=template&id=160fda8c&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=template&id=160fda8c&scoped=true ***!
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
    staticClass: "transfers-container"
  }, [_c("aplicar-filtros", {
    ref: "filtros",
    on: {
      aplicarFiltros: _vm.filtrar
    }
  }), _vm._v(" "), _c("printransfer-component", {
    ref: "imprimir"
  }), _vm._v(" "), _c("div", {
    staticClass: "header-section"
  }, [_c("div", {
    staticClass: "page-header"
  }, [_c("h2", [_c("span", {
    staticClass: "custom-icon custom-icon-document"
  }, [_vm._v("🔄")]), _vm._v(" "), _c("span", {
    staticClass: "page-title"
  }, [_vm._v(_vm._s(_vm.title || "Transferencias"))])]), _vm._v(" "), _c("p", {
    staticClass: "page-description"
  }, [_vm._v("\n                    Gestión y seguimiento completo de transferencias entre almacenes\n                ")])]), _vm._v(" "), _c("div", {
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
      placeholder: "Buscar por cliente..."
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
  }, [_vm._v("🔽")]), _vm._v("\n                    Filtrar Transferencias\n                ")])])]), _vm._v(" "), _vm.loader ? _c("div", {
    staticClass: "loading-section"
  }, [_c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "loader-container"
  }, [_c("div", {
    staticClass: "spinner-professional"
  }), _vm._v(" "), _c("h3", {
    staticClass: "loader-title"
  }, [_vm._v(_vm._s(_vm.getLoaderTitle()))]), _vm._v(" "), _c("p", {
    staticClass: "loader-subtitle"
  }, [_vm._v(_vm._s(_vm.getLoaderSubtitle()))]), _vm._v(" "), _vm._m(0)])])]) : _vm._e(), _vm._v(" "), !_vm.loader ? _c("div", {
    staticClass: "transfers-content"
  }, [_c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "desktop-table"
  }, [_c("div", {
    staticClass: "table-responsive professional-table-wrapper",
    "class": {
      filtering: _vm.filterLoading
    }
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(1), _vm._v(" "), _c("tbody", _vm._l(_vm.paginatedTransferencias, function (item, index) {
    return _c("tr", {
      key: index,
      staticClass: "data-row"
    }, [_c("td", {
      staticClass: "text-left client-cell"
    }, [_c("span", {
      staticClass: "client-name"
    }, [_vm._v(_vm._s(item.cliente))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center transfer-cell"
    }, [_c("span", {
      staticClass: "transfer-number"
    }, [_vm._v(_vm._s(item.numero))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center date-cell"
    }, [_c("span", {
      staticClass: "date-value"
    }, [_vm._v(_vm._s(item.fecha))])]), _vm._v(" "), _c("td", {
      staticClass: "text-right amount-cell"
    }, [_c("span", {
      staticClass: "amount-value"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.valor)))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center status-cell"
    }, [_c("span", {
      staticClass: "status-badge",
      "class": _vm.getStatusClass(item.estado_id)
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v(_vm._s(_vm.getStatusEmoji(item.estado_id)))]), _vm._v("\n                                            " + _vm._s(item.estado) + "\n                                        ")])]), _vm._v(" "), _c("td", {
      staticClass: "text-center actions-cell"
    }, [_c("div", {
      staticClass: "action-buttons"
    }, [_c("button", {
      staticClass: "action-btn view-btn",
      attrs: {
        title: "Ver detalles"
      },
      on: {
        click: function click($event) {
          return _vm.showTransfer(item);
        }
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("👁️")])])])])]);
  }), 0)])])]), _vm._v(" "), _c("div", {
    staticClass: "mobile-cards-container",
    "class": {
      filtering: _vm.filterLoading
    }
  }, _vm._l(_vm.paginatedTransferencias, function (item, index) {
    return _c("div", {
      key: index,
      staticClass: "transfer-card"
    }, [_c("div", {
      staticClass: "card-header"
    }, [_c("div", {
      staticClass: "client-info"
    }, [_c("span", {
      staticClass: "custom-icon client-icon"
    }, [_vm._v("👤")]), _vm._v(" "), _c("span", {
      staticClass: "client-name-mobile"
    }, [_vm._v(_vm._s(item.cliente))])]), _vm._v(" "), _c("div", {
      staticClass: "transfer-badge"
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("#️⃣")]), _vm._v("\n                                " + _vm._s(item.numero) + "\n                            ")])]), _vm._v(" "), _c("div", {
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
    }, [_vm._v(_vm._s(_vm._f("currency")(item.valor)))])])])]), _vm._v(" "), _c("div", {
      staticClass: "status-section"
    }, [_c("div", {
      staticClass: "status-container"
    }, [_c("span", {
      staticClass: "custom-icon status-flag"
    }, [_vm._v("🏃‍♂️")]), _vm._v(" "), _c("span", {
      staticClass: "status-badge-mobile",
      "class": _vm.getStatusClass(item.estado_id)
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v(_vm._s(_vm.getStatusEmoji(item.estado_id)))]), _vm._v("\n                                        " + _vm._s(item.estado) + "\n                                    ")])])]), _vm._v(" "), _c("div", {
      staticClass: "actions-section"
    }, [_c("button", {
      staticClass: "mobile-action-btn view-btn",
      on: {
        click: function click($event) {
          return _vm.showTransfer(item);
        }
      }
    }, [_c("span", {
      staticClass: "custom-icon"
    }, [_vm._v("👁️")]), _vm._v("\n                                    Ver Detalles\n                                ")])])])]);
  }), 0), _vm._v(" "), _vm.filteredTransferencias.length > 0 ? _c("div", {
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
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })]);
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
  }, [_vm._v("#️⃣")]), _vm._v("\n                                        No. Transferencia\n                                    ")]), _vm._v(" "), _c("th", {
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
  }, [_vm._v("🏃‍♂️")]), _vm._v("\n                                        Estado\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("span", {
    staticClass: "custom-icon"
  }, [_vm._v("⚙️")]), _vm._v("\n                                        Acciones\n                                    ")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/Transferencia.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/Transferencia.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Transferencia_vue_vue_type_template_id_160fda8c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transferencia.vue?vue&type=template&id=160fda8c&scoped=true */ "./resources/js/components/Transferencia.vue?vue&type=template&id=160fda8c&scoped=true");
/* harmony import */ var _Transferencia_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transferencia.vue?vue&type=script&lang=js */ "./resources/js/components/Transferencia.vue?vue&type=script&lang=js");
/* harmony import */ var _Transferencia_vue_vue_type_style_index_0_id_160fda8c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css */ "./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Transferencia_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Transferencia_vue_vue_type_template_id_160fda8c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Transferencia_vue_vue_type_template_id_160fda8c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "160fda8c",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/Transferencia.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Transferencia.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Transferencia.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Transferencia.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_style_index_0_id_160fda8c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=style&index=0&id=160fda8c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/Transferencia.vue?vue&type=template&id=160fda8c&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/Transferencia.vue?vue&type=template&id=160fda8c&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_template_id_160fda8c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_template_id_160fda8c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Transferencia_vue_vue_type_template_id_160fda8c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Transferencia.vue?vue&type=template&id=160fda8c&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Transferencia.vue?vue&type=template&id=160fda8c&scoped=true");


/***/ })

}]);