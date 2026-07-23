"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-Stock-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      headers: [{
        text: 'Laboratorio',
        value: 'lab'
      },
      // {text: 'Codigo', value: 'codigo'},
      {
        text: 'Producto',
        value: 'producto'
      }, {
        text: 'Presentacion',
        value: 'presentacion'
      }, {
        text: 'Stock',
        value: 'stock'
      }, {
        text: 'VlrUnit',
        value: 'precio'
      }, {
        text: 'Lista',
        value: 'tipo_lista'
      }, {
        text: 'Acciones',
        value: 'acciones'
      }],
      loader: true,
      tableLoader: false,
      productos: [],
      search: '',
      tipolista_id: 3,
      tipoListas: [],
      totalStock: 0,
      // Paginación
      currentPage: 1,
      itemsPerPage: 15,
      itemsPerPageOptions: [10, 15, 25, 50],
      movimientosModal: false,
      productoMovimiento: null,
      movimientoTab: 'entradas',
      movimientosCargando: false,
      movimientosError: '',
      movimientos: {
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0
      }
    };
  },
  computed: {
    filteredProductos: function filteredProductos() {
      var _this = this;
      var filtered = this.productos;

      // Aplicar filtro de búsqueda
      if (this.search) {
        filtered = filtered.filter(function (producto) {
          return producto.producto.toLowerCase().includes(_this.search.toLowerCase()) || producto.Laboratorio.toLowerCase().includes(_this.search.toLowerCase()) || producto.presentacion.toLowerCase().includes(_this.search.toLowerCase()) || producto.codigo && producto.codigo.toLowerCase().includes(_this.search.toLowerCase()) || producto.tipo_lista.toLowerCase().includes(_this.search.toLowerCase());
        });
      }
      return filtered;
    },
    paginatedProductos: function paginatedProductos() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return this.filteredProductos.slice(start, end);
    },
    totalPages: function totalPages() {
      return Math.ceil(this.filteredProductos.length / this.itemsPerPage);
    },
    paginationInfo: function paginationInfo() {
      var start = (this.currentPage - 1) * this.itemsPerPage + 1;
      var end = Math.min(this.currentPage * this.itemsPerPage, this.filteredProductos.length);
      return {
        start: start,
        end: end,
        total: this.filteredProductos.length
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
    this.getProductos();
    this.getTiposListaPrecios();
  },
  methods: {
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
    changeItemsPerPage: function changeItemsPerPage() {
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
    getTiposListaPrecios: function getTiposListaPrecios() {
      var _this2 = this;
      axios.get('/tipos-lista-precios').then(function (res) {
        // console.log(res.data);
        _this2.tipoListas = res.data;
      })["catch"](function (err) {
        console.log(err);
      });
    },
    getProductos: function getProductos() {
      var _this3 = this;
      // Activar loader de tabla solo si no es la carga inicial
      if (!this.loader) {
        this.tableLoader = true;
      }
      axios.get("/listas-precios/".concat(this.tipolista_id)).then(function (res) {
        // console.log(res.data)
        _this3.productos = res.data;
        _this3.loader = false;
        _this3.tableLoader = false;
      })["catch"](function (err) {
        console.log(err);
        _this3.loader = false;
        _this3.tableLoader = false;
      });
    },
    editarProducto: function editarProducto(item) {
      this.$refs.modalProducto.editProduct(item);
    },
    nuevoProducto: function nuevoProducto() {
      this.$refs.modalProducto.newProduct();
    },
    editarItemProducto: function editarItemProducto(item) {
      this.$refs.modalItemProducto.editProduct(item, this.tipoListas);
    },
    nuevoItemProducto: function nuevoItemProducto() {
      this.$refs.modalItemProducto.newProduct(this.tipoListas);
    },
    updateListItems: function updateListItems(item) {
      var index = this.productos.findIndex(function (producto) {
        return producto.id === item.id;
      });
      this.productos.splice(index, 1);
      this.productos.unshift(item);
      // console.log(this.productos[index])
    },
    abrirMovimientos: function abrirMovimientos(producto) {
      this.productoMovimiento = producto;
      this.movimientoTab = 'entradas';
      this.movimientosModal = true;
      this.cargarMovimientos(1);
    },
    cerrarMovimientos: function cerrarMovimientos() {
      this.movimientosModal = false;
      this.productoMovimiento = null;
    },
    cambiarTabMovimiento: function cambiarTabMovimiento(tab) {
      if (this.movimientoTab === tab) return;
      this.movimientoTab = tab;
      this.cargarMovimientos(1);
    },
    cargarMovimientos: function cargarMovimientos() {
      var _this4 = this;
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      if (!this.productoMovimiento || page < 1) return;
      this.movimientosCargando = true;
      this.movimientosError = '';
      axios.get("/inventario-productos/".concat(this.productoMovimiento.id, "/movimientos/").concat(this.movimientoTab), {
        params: {
          page: page
        }
      }).then(function (response) {
        _this4.movimientos = response.data;
      })["catch"](function () {
        _this4.movimientosError = 'No fue posible consultar los movimientos. Intenta nuevamente.';
        _this4.movimientos = {
          data: [],
          current_page: 1,
          last_page: 1,
          total: 0
        };
      })["finally"](function () {
        _this4.movimientosCargando = false;
      });
    },
    formatearMoneda: function formatearMoneda(valor) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(Number(valor) || 0);
    },
    formatearFecha: function formatearFecha(fecha) {
      if (!fecha) return 'Sin fecha';
      var partes = fecha.substring(0, 10).split('-');
      return partes.length === 3 ? "".concat(partes[2], "/").concat(partes[1], "/").concat(partes[0]) : fecha;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Professional Container */\n.products-container[data-v-1debf4bb] {\r\n    min-height: 100vh;\r\n    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\r\n    padding: 2rem;\n}\r\n\r\n/* Professional Loading */\n.loading-container[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-height: 400px;\r\n    padding: 40px 20px;\r\n    background: linear-gradient(135deg, #17a2b820 0%, #13849620 100%);\r\n    border-radius: 12px;\r\n    backdrop-filter: blur(10px);\r\n    border: 1px solid rgba(255, 255, 255, 0.3);\n}\n.loading-content[data-v-1debf4bb] {\r\n    text-align: center;\r\n    max-width: 300px;\n}\n.professional-loader[data-v-1debf4bb] {\r\n    position: relative;\r\n    display: inline-block;\r\n    margin-bottom: 30px;\n}\n.loader-spinner[data-v-1debf4bb] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border: 4px solid rgba(102, 126, 234, 0.1);\r\n    border-left: 4px solid #17a2b8;\r\n    border-radius: 50%;\r\n    animation: spin-1debf4bb 1s linear infinite;\r\n    position: relative;\r\n    z-index: 2;\n}\n.loader-pulse[data-v-1debf4bb] {\r\n    position: absolute;\r\n    top: -10px;\r\n    left: -10px;\r\n    width: 80px;\r\n    height: 80px;\r\n    border: 2px solid rgba(102, 126, 234, 0.3);\r\n    border-radius: 50%;\r\n    animation: pulse-1debf4bb 2s ease-in-out infinite;\r\n    z-index: 1;\n}\n@keyframes spin-1debf4bb {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes pulse-1debf4bb {\n0% { transform: scale(0.8); opacity: 1;\n}\n50% { transform: scale(1.2); opacity: 0.5;\n}\n100% { transform: scale(0.8); opacity: 1;\n}\n}\n.loading-title[data-v-1debf4bb] {\r\n    color: #2c3e50;\r\n    font-size: 1.4rem;\r\n    font-weight: 700;\r\n    margin-bottom: 8px;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\n}\n.loading-subtitle[data-v-1debf4bb] {\r\n    color: #6c757d;\r\n    font-size: 0.95rem;\r\n    font-weight: 400;\r\n    margin: 0 0 2rem 0;\r\n    line-height: 1.4;\n}\n.loading-progress[data-v-1debf4bb] {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 4px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.progress-bar[data-v-1debf4bb] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #17a2b8, #138496);\r\n    border-radius: 2px;\r\n    animation: progress-1debf4bb 2s ease-in-out infinite;\n}\n@keyframes progress-1debf4bb {\n0% { transform: translateX(-100%);\n}\n50% { transform: translateX(0%);\n}\n100% { transform: translateX(100%);\n}\n}\r\n\r\n/* Header Section */\n.products-content[data-v-1debf4bb] {\r\n    max-width: 1400px;\r\n    margin: 0 auto;\n}\n.header-section[data-v-1debf4bb] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.page-header h2[data-v-1debf4bb] {\r\n    color: #2c3e50;\r\n    font-size: 2.2rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.5rem 0;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\r\n    display: flex;\r\n    align-items: center;\n}\n.page-description[data-v-1debf4bb] {\r\n    color: #64748b;\r\n    font-size: 1.1rem;\r\n    margin: 0;\r\n    font-weight: 400;\n}\n.header-actions[data-v-1debf4bb] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    justify-content: flex-end;\n}\n.new-product-btn[data-v-1debf4bb], .new-item-btn[data-v-1debf4bb] {\r\n    height: 50px;\r\n    padding: 0 2rem;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\n}\n.new-product-btn[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);\n}\n.new-product-btn[data-v-1debf4bb]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);\n}\n.new-item-btn[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);\n}\n.new-item-btn[data-v-1debf4bb]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);\n}\n.filter-group[data-v-1debf4bb] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.75rem;\n}\n.filter-label[data-v-1debf4bb] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 0.95rem;\r\n    margin: 0;\n}\n.select-wrapper[data-v-1debf4bb] {\r\n    position: relative;\n}\n.form-select[data-v-1debf4bb] {\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 1rem 0 1rem;\r\n    border: 2px solid #e2e8f0;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: rgba(255, 255, 255, 0.9);\r\n    backdrop-filter: blur(10px);\r\n    color: #374151;\r\n    -webkit-appearance: none;\r\n       -moz-appearance: none;\r\n            appearance: none;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    padding-right: 3rem;\n}\n.form-select[data-v-1debf4bb]:focus {\r\n    outline: none;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\r\n    background: white;\n}\n.select-icon[data-v-1debf4bb] {\r\n    position: absolute;\r\n    right: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    color: #6b7280;\r\n    pointer-events: none;\r\n    transition: transform 0.3s ease;\n}\n.search-box[data-v-1debf4bb] {\r\n    position: relative;\n}\n.search-icon[data-v-1debf4bb] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    color: #64748b;\r\n    z-index: 3;\r\n    pointer-events: none;\n}\n.search-input[data-v-1debf4bb] {\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 1rem 0 3rem !important;\r\n    border: 2px solid #e2e8f0;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: rgba(255, 255, 255, 0.9);\r\n    backdrop-filter: blur(10px);\r\n    transition: all 0.3s ease;\n}\n.search-input[data-v-1debf4bb]::-moz-placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-1debf4bb]::placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-1debf4bb]:focus {\r\n    outline: none;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\r\n    background: white;\n}\r\n\r\n/* Professional Report Container */\n.professional-report-container[data-v-1debf4bb] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    overflow: hidden;\n}\r\n\r\n/* Table Loading */\n.table-loading-container[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-height: 300px;\r\n    padding: 3rem 2rem;\r\n    background: rgba(248, 250, 252, 0.3);\n}\n.table-loading-content[data-v-1debf4bb] {\r\n    text-align: center;\r\n    max-width: 280px;\n}\n.table-loader[data-v-1debf4bb] {\r\n    position: relative;\r\n    display: inline-block;\r\n    margin-bottom: 25px;\n}\n.table-loader-spinner[data-v-1debf4bb] {\r\n    width: 50px;\r\n    height: 50px;\r\n    border: 3px solid rgba(102, 126, 234, 0.1);\r\n    border-left: 3px solid #17a2b8;\r\n    border-radius: 50%;\r\n    animation: spin-1debf4bb 1s linear infinite;\r\n    position: relative;\r\n    z-index: 2;\n}\n.table-loader-pulse[data-v-1debf4bb] {\r\n    position: absolute;\r\n    top: -8px;\r\n    left: -8px;\r\n    width: 66px;\r\n    height: 66px;\r\n    border: 2px solid rgba(102, 126, 234, 0.2);\r\n    border-radius: 50%;\r\n    animation: pulse-1debf4bb 1.8s ease-in-out infinite;\r\n    z-index: 1;\n}\n.table-loading-title[data-v-1debf4bb] {\r\n    color: #374151;\r\n    font-size: 1.2rem;\r\n    font-weight: 600;\r\n    margin-bottom: 6px;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\n}\n.table-loading-subtitle[data-v-1debf4bb] {\r\n    color: #64748b;\r\n    font-size: 0.9rem;\r\n    font-weight: 400;\r\n    margin: 0 0 1.5rem 0;\r\n    line-height: 1.3;\n}\n.table-loading-progress[data-v-1debf4bb] {\r\n    width: 100%;\r\n    max-width: 250px;\r\n    height: 3px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.table-progress-bar[data-v-1debf4bb] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #17a2b8, #138496);\r\n    border-radius: 2px;\r\n    animation: progress-1debf4bb 1.5s ease-in-out infinite;\n}\r\n\r\n/* Table Header Section */\n.table-header-section[data-v-1debf4bb] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    padding: 1.5rem 2rem;\r\n    border-bottom: 2px solid #f1f5f9;\r\n    background: rgba(248, 250, 252, 0.5);\n}\n.table-info[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2rem;\n}\n.table-title[data-v-1debf4bb] {\r\n    font-size: 1.5rem;\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    margin: 0;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\n}\n.table-icon[data-v-1debf4bb] {\r\n    color: #17a2b8;\n}\n.table-count[data-v-1debf4bb] {\r\n    color: #64748b;\r\n    font-weight: 500;\r\n    background: #f8fafc;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    border: 1px solid #e2e8f0;\r\n    font-size: 0.9rem;\n}\n.table-actions[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\n}\n.excel-btn[data-v-1debf4bb] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    color: #059669;\r\n    text-decoration: none;\r\n    font-weight: 600;\r\n    padding: 0.75rem 1.5rem;\r\n    background: rgba(5, 150, 105, 0.1);\r\n    border-radius: 10px;\r\n    transition: all 0.3s ease;\r\n    border: 1px solid rgba(5, 150, 105, 0.2);\r\n    font-size: 0.9rem;\n}\n.excel-btn[data-v-1debf4bb]:hover {\r\n    background: rgba(5, 150, 105, 0.2);\r\n    transform: translateY(-2px);\r\n    color: #047857;\r\n    text-decoration: none;\r\n    box-shadow: 0 5px 15px rgba(5, 150, 105, 0.2);\n}\r\n\r\n/* Mobile Cards - Hidden by default */\n.mobile-cards-container[data-v-1debf4bb] {\r\n    display: none;\n}\n.desktop-table[data-v-1debf4bb] {\r\n    display: block;\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-1debf4bb] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-1debf4bb] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-1debf4bb] {\r\n    background: transparent;\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #e5e7eb;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.professional-table thead th i[data-v-1debf4bb] {\r\n    margin-right: 0.5rem;\r\n    color: #17a2b8;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-1debf4bb] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\r\n    background: rgba(255, 255, 255, 0.8);\r\n    backdrop-filter: blur(10px);\n}\n.professional-table tbody tr[data-v-1debf4bb]:hover {\r\n    background: rgba(102, 126, 234, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-1debf4bb] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.lab-cell[data-v-1debf4bb] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.lab-container[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\n}\n.lab-logo[data-v-1debf4bb] {\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 10px;\r\n    -o-object-fit: contain;\r\n       object-fit: contain;\r\n    background: white;\r\n    padding: 5px;\r\n    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);\r\n    border: 2px solid #e2e8f0;\n}\n.lab-name[data-v-1debf4bb] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 1rem;\n}\n.product-cell[data-v-1debf4bb] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.product-info[data-v-1debf4bb] {\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    padding: 0.5rem 0;\n}\n.product-info[data-v-1debf4bb]:hover {\r\n    color: #17a2b8;\n}\n.product-name[data-v-1debf4bb] {\r\n    display: block;\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 1rem;\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\r\n    margin-bottom: 0.25rem;\n}\n.product-code[data-v-1debf4bb] {\r\n    display: block;\r\n    font-size: 0.8rem;\r\n    color: #6b7280;\r\n    font-weight: 500;\n}\n.presentation-cell[data-v-1debf4bb] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.presentation-badge[data-v-1debf4bb] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 20px;\r\n    font-weight: 600;\r\n    font-size: 0.85rem;\r\n    background: #f8fafc;\r\n    color: #374151;\r\n    border: 1px solid #e2e8f0;\n}\n.stock-cell[data-v-1debf4bb] {\r\n    text-align: center;\n}\n.stock-badge[data-v-1debf4bb] {\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 20px;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\r\n    text-transform: uppercase;\r\n    letter-spacing: 1px;\r\n    min-width: 60px;\r\n    display: inline-block;\n}\n.stock-low[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\r\n    color: white;\r\n    box-shadow: 0 3px 10px rgba(239, 68, 68, 0.3);\n}\n.stock-medium[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n    color: white;\r\n    box-shadow: 0 3px 10px rgba(245, 158, 11, 0.3);\n}\n.stock-high[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);\n}\n.price-cell[data-v-1debf4bb] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.price-value[data-v-1debf4bb] {\r\n    font-weight: 700;\r\n    color: #059669;\r\n    font-size: 1.1rem;\n}\r\n\r\n/* Action Buttons */\n.actions-cell[data-v-1debf4bb] {\r\n    text-align: center;\n}\n.action-buttons[data-v-1debf4bb] {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    justify-content: center;\n}\n.action-btn[data-v-1debf4bb] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    border: none;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 1rem;\r\n    text-decoration: none;\n}\n.btn-edit[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-edit[data-v-1debf4bb]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);\n}\r\n\r\n/* Mobile Cards Styles */\n.product-card[data-v-1debf4bb] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    margin-bottom: 1rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    transition: all 0.3s ease;\n}\n.product-card[data-v-1debf4bb]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.card-header[data-v-1debf4bb] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 1.5rem;\r\n    padding-bottom: 1rem;\r\n    border-bottom: 2px solid #f1f5f9;\n}\n.product-info-mobile[data-v-1debf4bb] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    width: 100%;\n}\n.lab-info-mobile[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    flex: 1;\n}\n.lab-logo-mobile[data-v-1debf4bb] {\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 12px;\r\n    -o-object-fit: contain;\r\n       object-fit: contain;\r\n    border: 2px solid #e2e8f0;\r\n    background: white;\r\n    padding: 5px;\n}\n.lab-name-mobile[data-v-1debf4bb] {\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-size: 1rem;\n}\n.stock-badge-mobile[data-v-1debf4bb] {\r\n    padding: 0.25rem 0.75rem;\r\n    border-radius: 12px;\r\n    font-weight: 700;\r\n    font-size: 0.8rem;\r\n    text-transform: uppercase;\r\n    letter-spacing: 1px;\r\n    display: inline-block;\r\n    width: -moz-fit-content;\r\n    width: fit-content;\n}\n.stock-badge-mobile.stock-low[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\r\n    color: white;\n}\n.stock-badge-mobile.stock-medium[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n    color: white;\n}\n.stock-badge-mobile.stock-high[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\n}\n.card-body[data-v-1debf4bb] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\n}\n.product-name-mobile[data-v-1debf4bb] {\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-size: 1.1rem;\r\n    cursor: pointer;\r\n    transition: color 0.3s ease;\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 8px;\r\n    border: 1px solid #81d4fa;\r\n    margin-bottom: 0.5rem;\n}\n.product-name-mobile[data-v-1debf4bb]:hover {\r\n    color: #17a2b8;\n}\n.product-code-mobile[data-v-1debf4bb] {\r\n    font-size: 0.9rem;\r\n    color: #64748b;\r\n    font-weight: 500;\r\n    margin-bottom: 1rem;\n}\n.info-row[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\r\n    font-size: 0.95rem;\r\n    color: #64748b;\n}\n.info-row i[data-v-1debf4bb] {\r\n    color: #17a2b8;\r\n    width: 20px;\r\n    text-align: center;\n}\n.price-mobile[data-v-1debf4bb] {\r\n    font-weight: 700;\r\n    color: #059669;\r\n    font-size: 1.1rem;\n}\r\n\r\n/* Actions Section Mobile */\n.actions-section[data-v-1debf4bb] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    margin-top: 1rem;\r\n    padding-top: 1rem;\r\n    border-top: 2px solid #f1f5f9;\n}\n.mobile-action-btn[data-v-1debf4bb] {\r\n    flex: 1;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    text-decoration: none;\r\n    border: none;\n}\n.edit-btn[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);\n}\n.edit-btn[data-v-1debf4bb]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\r\n\r\n/* No Data Message */\n.no-data-container[data-v-1debf4bb] {\r\n    padding: 4rem 2rem;\r\n    text-align: center;\n}\n.no-data-message[data-v-1debf4bb] {\r\n    text-align: center;\r\n    color: #6b7280;\n}\n.no-data-icon[data-v-1debf4bb] {\r\n    font-size: 4rem;\r\n    color: #d1d5db;\r\n    margin-bottom: 1rem;\n}\n.no-data-message h4[data-v-1debf4bb] {\r\n    margin: 0 0 0.5rem 0;\r\n    color: #374151;\r\n    font-size: 1.5rem;\n}\n.no-data-message p[data-v-1debf4bb] {\r\n    margin: 0;\r\n    font-size: 1rem;\n}\r\n\r\n/* Pagination Styles */\n.pagination-section[data-v-1debf4bb] {\r\n    background: white;\r\n    border-top: 2px solid #f1f5f9;\r\n    padding: 1.5rem 2rem;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 1rem;\n}\n.pagination-info[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2rem;\r\n    flex-wrap: wrap;\n}\n.items-per-page[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-label[data-v-1debf4bb] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 0.9rem;\n}\n.items-select[data-v-1debf4bb] {\r\n    padding: 0.5rem 0.75rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #374151;\r\n    background: white;\r\n    cursor: pointer;\r\n    outline: none;\r\n    transition: all 0.3s ease;\n}\n.items-select[data-v-1debf4bb]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.page-info-text[data-v-1debf4bb] {\r\n    font-size: 0.9rem;\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.pagination-controls[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-btn[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.75rem 1rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\n}\n.pagination-btn[data-v-1debf4bb]:hover:not(:disabled) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    background: rgba(102, 126, 234, 0.05);\n}\n.pagination-btn[data-v-1debf4bb]:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n    color: #9ca3af;\n}\n.page-numbers[data-v-1debf4bb] {\r\n    display: flex;\r\n    gap: 0.25rem;\r\n    margin: 0 1rem;\n}\n.page-btn[data-v-1debf4bb] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.page-btn[data-v-1debf4bb]:hover:not(:disabled):not(.ellipsis) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    background: rgba(102, 126, 234, 0.05);\n}\n.page-btn.active[data-v-1debf4bb] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);\n}\n.page-btn.ellipsis[data-v-1debf4bb] {\r\n    border: none;\r\n    background: transparent;\r\n    cursor: default;\r\n    color: #9ca3af;\n}\n.page-btn.ellipsis[data-v-1debf4bb]:hover {\r\n    background: transparent;\r\n    border: none;\n}\r\n\r\n/* Responsive Pagination */\n@media (max-width: 768px) {\n.pagination-section[data-v-1debf4bb] {\r\n        padding: 1rem;\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        gap: 1rem;\n}\n.pagination-info[data-v-1debf4bb] {\r\n        justify-content: center;\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        text-align: center;\n}\n.items-per-page[data-v-1debf4bb] {\r\n        justify-content: center;\n}\n.pagination-controls[data-v-1debf4bb] {\r\n        justify-content: center;\r\n        flex-wrap: wrap;\n}\n.page-numbers[data-v-1debf4bb] {\r\n        margin: 0 0.5rem;\r\n        flex-wrap: wrap;\r\n        justify-content: center;\n}\n.pagination-btn[data-v-1debf4bb] {\r\n        font-size: 0.8rem;\r\n        padding: 0.6rem 0.8rem;\n}\n.page-btn[data-v-1debf4bb] {\r\n        width: 35px;\r\n        height: 35px;\r\n        font-size: 0.8rem;\n}\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 1024px) {\n.header-section[data-v-1debf4bb] {\r\n        text-align: center;\n}\n.header-actions[data-v-1debf4bb] {\r\n        justify-content: center;\r\n        margin-top: 1rem;\n}\n.page-header h2[data-v-1debf4bb] {\r\n        font-size: 2rem;\r\n        justify-content: center;\n}\n.excel-link[data-v-1debf4bb] {\r\n        justify-content: center;\n}\n}\n@media (max-width: 900px) {\r\n    /* Show mobile cards, hide desktop table */\n.desktop-table[data-v-1debf4bb] {\r\n        display: none;\n}\n.mobile-cards-container[data-v-1debf4bb] {\r\n        display: block;\r\n        padding: 0 0.5rem;\n}\n}\n@media (max-width: 768px) {\n.products-container[data-v-1debf4bb] {\r\n        padding: 1rem;\n}\n.header-section[data-v-1debf4bb] {\r\n        border-radius: 16px;\r\n        padding: 1.5rem;\n}\n.professional-report-container[data-v-1debf4bb] {\r\n        border-radius: 16px;\n}\n.page-header h2[data-v-1debf4bb] {\r\n        font-size: 1.8rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 0.5rem;\n}\n.header-actions[data-v-1debf4bb] {\r\n        flex-direction: column;\r\n        gap: 0.75rem;\r\n        margin-top: 1rem;\r\n        justify-content: center;\n}\n.new-product-btn[data-v-1debf4bb], .new-item-btn[data-v-1debf4bb] {\r\n        width: 100%;\r\n        justify-content: center;\n}\n.table-header-section[data-v-1debf4bb] {\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        text-align: center;\n}\n.table-info[data-v-1debf4bb] {\r\n        flex-direction: column;\r\n        gap: 1rem;\n}\n.table-loading-container[data-v-1debf4bb] {\r\n        min-height: 250px;\r\n        padding: 2rem 1rem;\n}\n.table-loading-title[data-v-1debf4bb] {\r\n        font-size: 1.1rem;\n}\n.table-loading-subtitle[data-v-1debf4bb] {\r\n        font-size: 0.85rem;\n}\n.filter-group[data-v-1debf4bb] {\r\n        margin-bottom: 1rem;\n}\n.product-card[data-v-1debf4bb] {\r\n        margin-bottom: 1rem;\r\n        padding: 1.25rem;\r\n        border-radius: 14px;\n}\n.actions-section[data-v-1debf4bb] {\r\n        flex-direction: column;\r\n        gap: 0.75rem;\n}\n}\n@media (max-width: 480px) {\n.products-container[data-v-1debf4bb] {\r\n        padding: 0.75rem;\n}\n.header-section[data-v-1debf4bb] {\r\n        padding: 1.25rem;\n}\n.page-header h2[data-v-1debf4bb] {\r\n        font-size: 1.6rem;\n}\n.product-card[data-v-1debf4bb] {\r\n        padding: 1rem;\r\n        margin-bottom: 0.875rem;\n}\n.pagination-controls[data-v-1debf4bb] {\r\n        flex-direction: column;\r\n        gap: 1rem;\n}\n.page-numbers[data-v-1debf4bb] {\r\n        margin: 0;\r\n        order: 2;\n}\n.prev-btn[data-v-1debf4bb] {\r\n        order: 1;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n.next-btn[data-v-1debf4bb] {\r\n        order: 3;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n}\n.btn-movements[data-v-1debf4bb] {\r\n    background: #e0f2fe;\r\n    color: #0369a1;\n}\n.btn-movements[data-v-1debf4bb]:hover {\r\n    background: #0369a1;\r\n    color: #fff;\n}\n.movements-btn[data-v-1debf4bb] {\r\n    background: #e0f2fe;\r\n    color: #0369a1;\n}\n.movements-overlay[data-v-1debf4bb] {\r\n    position: fixed;\r\n    inset: 0;\r\n    z-index: 2100;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    padding: 1rem;\r\n    background: rgba(15, 23, 42, .7);\n}\n.movements-modal[data-v-1debf4bb] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: min(1180px, 96vw);\r\n    max-height: 90vh;\r\n    overflow: hidden;\r\n    background: #fff;\r\n    border-radius: 18px;\r\n    box-shadow: 0 25px 70px rgba(15, 23, 42, .35);\n}\n.movements-header[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: flex-start;\r\n    justify-content: space-between;\r\n    gap: 1rem;\r\n    padding: 1.25rem 1.5rem;\r\n    color: #fff;\r\n    background: linear-gradient(135deg, #0e7490, #0369a1);\n}\n.movements-header h3[data-v-1debf4bb],\r\n.movements-header p[data-v-1debf4bb] {\r\n    margin: 0;\n}\n.movements-header p[data-v-1debf4bb] {\r\n    margin-top: .35rem;\r\n    color: rgba(255, 255, 255, .85);\n}\n.movements-close[data-v-1debf4bb] {\r\n    width: 44px;\r\n    height: 44px;\r\n    flex: 0 0 44px;\r\n    border: 0;\r\n    border-radius: 50%;\r\n    color: #fff;\r\n    background: rgba(255, 255, 255, .16);\n}\n.movements-tabs[data-v-1debf4bb] {\r\n    display: flex;\r\n    padding: 0 1.5rem;\r\n    border-bottom: 1px solid #e2e8f0;\n}\n.movements-tabs button[data-v-1debf4bb] {\r\n    min-width: 150px;\r\n    padding: 1rem 1.25rem;\r\n    border: 0;\r\n    border-bottom: 3px solid transparent;\r\n    color: #64748b;\r\n    font-weight: 700;\r\n    background: transparent;\n}\n.movements-tabs button.active[data-v-1debf4bb] {\r\n    color: #0369a1;\r\n    border-bottom-color: #0284c7;\n}\n.movements-body[data-v-1debf4bb] {\r\n    min-height: 260px;\r\n    overflow: auto;\r\n    padding: 1.25rem 1.5rem;\n}\n.movements-state[data-v-1debf4bb] {\r\n    display: flex;\r\n    min-height: 230px;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: .6rem;\r\n    color: #64748b;\r\n    text-align: center;\n}\n.movements-error[data-v-1debf4bb] { color: #b91c1c;\n}\n.movements-table-wrapper[data-v-1debf4bb] { overflow-x: auto;\n}\n.movements-table[data-v-1debf4bb] {\r\n    width: 100%;\r\n    min-width: 900px;\r\n    border-collapse: collapse;\n}\n.movements-table th[data-v-1debf4bb],\r\n.movements-table td[data-v-1debf4bb] {\r\n    padding: .8rem .75rem;\r\n    border-bottom: 1px solid #e2e8f0;\r\n    text-align: left;\r\n    vertical-align: middle;\n}\n.movements-table th[data-v-1debf4bb] {\r\n    position: sticky;\r\n    top: 0;\r\n    color: #334155;\r\n    font-size: .78rem;\r\n    letter-spacing: .03em;\r\n    text-transform: uppercase;\r\n    background: #f8fafc;\n}\n.movement-number[data-v-1debf4bb] { white-space: nowrap; text-align: right !important;\n}\n.movements-pagination[data-v-1debf4bb] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 1rem;\r\n    padding: 1rem 1.5rem;\r\n    border-top: 1px solid #e2e8f0;\r\n    color: #64748b;\n}\n.movements-pagination button[data-v-1debf4bb] {\r\n    margin-left: .5rem;\r\n    padding: .55rem .9rem;\r\n    border: 1px solid #cbd5e1;\r\n    border-radius: 8px;\r\n    color: #0369a1;\r\n    background: #fff;\n}\n.movements-pagination button[data-v-1debf4bb]:disabled { color: #94a3b8; opacity: .6;\n}\n@media (max-width: 768px) {\n.movements-overlay[data-v-1debf4bb] { padding: .35rem;\n}\n.movements-modal[data-v-1debf4bb] { width: 100%; max-height: 96vh; border-radius: 12px;\n}\n.movements-header[data-v-1debf4bb], .movements-body[data-v-1debf4bb] { padding: 1rem;\n}\n.movements-tabs[data-v-1debf4bb] { padding: 0;\n}\n.movements-tabs button[data-v-1debf4bb] { min-width: 0; flex: 1;\n}\n.movements-pagination[data-v-1debf4bb] { align-items: stretch; flex-direction: column; padding: 1rem;\n}\n.movements-pagination > div[data-v-1debf4bb] { display: flex;\n}\n.movements-pagination button[data-v-1debf4bb] { flex: 1; margin: 0 .25rem 0 0; min-height: 44px;\n}\n.movements-table[data-v-1debf4bb] { min-width: 0;\n}\n.movements-table thead[data-v-1debf4bb] { display: none;\n}\n.movements-table[data-v-1debf4bb],\r\n    .movements-table tbody[data-v-1debf4bb],\r\n    .movements-table tr[data-v-1debf4bb],\r\n    .movements-table td[data-v-1debf4bb] { display: block; width: 100%;\n}\n.movements-table tr[data-v-1debf4bb] {\r\n        margin-bottom: 1rem;\r\n        padding: .55rem .8rem;\r\n        border: 1px solid #e2e8f0;\r\n        border-radius: 10px;\r\n        background: #fff;\r\n        box-shadow: 0 2px 8px rgba(15, 23, 42, .05);\n}\n.movements-table td[data-v-1debf4bb] {\r\n        display: grid;\r\n        grid-template-columns: minmax(105px, 38%) 1fr;\r\n        gap: .65rem;\r\n        padding: .55rem 0;\r\n        border-bottom: 1px solid #f1f5f9;\r\n        text-align: left !important;\r\n        white-space: normal;\n}\n.movements-table td[data-v-1debf4bb]:last-child { border-bottom: 0;\n}\n.movements-table td[data-v-1debf4bb]::before {\r\n        content: attr(data-label);\r\n        color: #64748b;\r\n        font-size: .72rem;\r\n        font-weight: 700;\r\n        letter-spacing: .03em;\r\n        text-transform: uppercase;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_style_index_0_id_1debf4bb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_style_index_0_id_1debf4bb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_style_index_0_id_1debf4bb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=template&id=1debf4bb&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=template&id=1debf4bb&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "products-container"
  }, [_c("modalitem-component", {
    ref: "modalItemProducto",
    on: {
      updateItems: _vm.updateListItems
    }
  }), _vm._v(" "), _c("modalproducto-component", {
    ref: "modalProducto"
  }), _vm._v(" "), _vm.loader ? _c("div", {
    staticClass: "loading-container"
  }, [_vm._m(0)]) : _c("div", {
    staticClass: "products-content"
  }, [_c("div", {
    staticClass: "header-section"
  }, [_c("div", {
    staticClass: "row align-items-center mb-4"
  }, [_vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "col-12 col-lg-6"
  }, [_c("div", {
    staticClass: "header-actions"
  }, [_c("button", {
    staticClass: "btn btn-success new-product-btn",
    on: {
      click: _vm.nuevoProducto
    }
  }, [_c("i", {
    staticClass: "fas fa-tags mr-2"
  }), _vm._v("\n                                Nuevo producto\n                            ")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary new-item-btn",
    on: {
      click: _vm.nuevoItemProducto
    }
  }, [_c("i", {
    staticClass: "fas fa-plus mr-2"
  }), _vm._v("\n                                Nuevo item\n                            ")])])])]), _vm._v(" "), _c("div", {
    staticClass: "row align-items-end"
  }, [_c("div", {
    staticClass: "col-12 col-md-4"
  }, [_c("div", {
    staticClass: "filter-group"
  }, [_c("label", {
    staticClass: "filter-label"
  }, [_vm._v("Lista de precios")]), _vm._v(" "), _c("div", {
    staticClass: "select-wrapper"
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.tipolista_id,
      expression: "tipolista_id"
    }],
    staticClass: "form-select",
    attrs: {
      id: "tipolista"
    },
    on: {
      change: [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.tipolista_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, _vm.getProductos]
    }
  }, _vm._l(_vm.tipoListas, function (item, index) {
    return _c("option", {
      key: index,
      domProps: {
        value: item.id
      }
    }, [_vm._v("\n                                        " + _vm._s(item.tipo_lista) + "\n                                    ")]);
  }), 0), _vm._v(" "), _c("i", {
    staticClass: "fas fa-chevron-down select-icon"
  })])])]), _vm._v(" "), _c("div", {
    staticClass: "col-12 col-md-8"
  }, [_c("div", {
    staticClass: "filter-group"
  }, [_c("label", {
    staticClass: "filter-label"
  }, [_vm._v("Buscar producto")]), _vm._v(" "), _c("div", {
    staticClass: "search-box"
  }, [_c("i", {
    staticClass: "fas fa-search search-icon"
  }), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    staticClass: "form-control search-input",
    attrs: {
      type: "text",
      placeholder: "Escribe el nombre del producto..."
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
  })])])])])]), _vm._v(" "), _c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "table-header-section"
  }, [_c("div", {
    staticClass: "table-info"
  }, [_vm._m(2), _vm._v(" "), _c("span", {
    staticClass: "table-count"
  }, [_vm._v(_vm._s(_vm.filteredProductos.length) + " productos encontrados")])]), _vm._v(" "), _vm._m(3)]), _vm._v(" "), _vm.tableLoader ? _c("div", {
    staticClass: "table-loading-container"
  }, [_vm._m(4)]) : _c("div", {
    staticClass: "desktop-table"
  }, [_c("div", {
    staticClass: "professional-table-wrapper"
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(5), _vm._v(" "), _c("tbody", _vm._l(_vm.paginatedProductos, function (producto) {
    return _c("tr", {
      key: producto.id
    }, [_c("td", {
      staticClass: "lab-cell"
    }, [_c("div", {
      staticClass: "lab-container"
    }, [_c("img", {
      staticClass: "lab-logo",
      attrs: {
        src: producto.logo,
        alt: "Logo " + producto.Laboratorio,
        title: producto.Laboratorio
      },
      on: {
        error: function error($event) {
          $event.target.src = "/images/default-lab.png";
        }
      }
    }), _vm._v(" "), _c("span", {
      staticClass: "lab-name"
    }, [_vm._v(_vm._s(producto.Laboratorio))])])]), _vm._v(" "), _c("td", {
      staticClass: "product-cell"
    }, [_c("div", {
      staticClass: "product-info",
      on: {
        click: function click($event) {
          return _vm.editarProducto(producto);
        }
      }
    }, [_c("span", {
      staticClass: "product-name"
    }, [_vm._v(_vm._s(producto.producto))]), _vm._v(" "), producto.codigo ? _c("span", {
      staticClass: "product-code"
    }, [_vm._v(_vm._s(producto.codigo))]) : _vm._e()])]), _vm._v(" "), _c("td", {
      staticClass: "presentation-cell"
    }, [_c("span", {
      staticClass: "presentation-badge"
    }, [_vm._v(_vm._s(producto.presentacion))])]), _vm._v(" "), _c("td", {
      staticClass: "stock-cell"
    }, [_c("span", {
      staticClass: "stock-badge",
      "class": {
        "stock-low": producto.stock < 5,
        "stock-medium": producto.stock >= 5 && producto.stock < 20,
        "stock-high": producto.stock >= 20
      }
    }, [_vm._v("\n                                            " + _vm._s(producto.stock) + "\n                                        ")])]), _vm._v(" "), _c("td", {
      staticClass: "price-cell"
    }, [_c("span", {
      staticClass: "price-value"
    }, [_vm._v("$" + _vm._s(_vm._f("currency")(producto.precio)))])]), _vm._v(" "), _c("td", {
      staticClass: "actions-cell"
    }, [_c("div", {
      staticClass: "action-buttons"
    }, [_c("button", {
      staticClass: "action-btn btn-edit",
      attrs: {
        title: "Editar producto"
      },
      on: {
        click: function click($event) {
          return _vm.editarItemProducto(producto);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-edit"
    })]), _vm._v(" "), _c("button", {
      staticClass: "action-btn btn-movements",
      attrs: {
        title: "Ver movimientos"
      },
      on: {
        click: function click($event) {
          return _vm.abrirMovimientos(producto);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-exchange-alt"
    })])])])]);
  }), 0)])])]), _vm._v(" "), !_vm.tableLoader ? _c("div", {
    staticClass: "mobile-cards-container"
  }, _vm._l(_vm.paginatedProductos, function (producto) {
    return _c("div", {
      key: producto.id,
      staticClass: "product-card"
    }, [_c("div", {
      staticClass: "card-header"
    }, [_c("div", {
      staticClass: "product-info-mobile"
    }, [_c("div", {
      staticClass: "lab-info-mobile"
    }, [_c("img", {
      staticClass: "lab-logo-mobile",
      attrs: {
        src: producto.logo,
        alt: "Logo " + producto.Laboratorio
      },
      on: {
        error: function error($event) {
          $event.target.src = "/images/default-lab.png";
        }
      }
    }), _vm._v(" "), _c("span", {
      staticClass: "lab-name-mobile"
    }, [_vm._v(_vm._s(producto.Laboratorio))])]), _vm._v(" "), _c("span", {
      staticClass: "stock-badge-mobile",
      "class": {
        "stock-low": producto.stock < 5,
        "stock-medium": producto.stock >= 5 && producto.stock < 20,
        "stock-high": producto.stock >= 20
      }
    }, [_vm._v("\n                                    Stock: " + _vm._s(producto.stock) + "\n                                ")])])]), _vm._v(" "), _c("div", {
      staticClass: "card-body"
    }, [_c("div", {
      staticClass: "product-name-mobile",
      on: {
        click: function click($event) {
          return _vm.editarProducto(producto);
        }
      }
    }, [_vm._v(_vm._s(producto.producto))]), _vm._v(" "), producto.codigo ? _c("div", {
      staticClass: "product-code-mobile"
    }, [_vm._v(_vm._s(producto.codigo))]) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "info-row"
    }, [_c("i", {
      staticClass: "fas fa-pills"
    }), _vm._v(" "), _c("span", [_vm._v(_vm._s(producto.presentacion))])]), _vm._v(" "), _c("div", {
      staticClass: "info-row"
    }, [_c("i", {
      staticClass: "fas fa-dollar-sign"
    }), _vm._v(" "), _c("span", {
      staticClass: "price-mobile"
    }, [_vm._v("$" + _vm._s(_vm._f("currency")(producto.precio)))])])]), _vm._v(" "), _c("div", {
      staticClass: "actions-section"
    }, [_c("button", {
      staticClass: "mobile-action-btn edit-btn",
      on: {
        click: function click($event) {
          return _vm.editarItemProducto(producto);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-edit"
    }), _vm._v("\n                                Editar Producto\n                            ")]), _vm._v(" "), _c("button", {
      staticClass: "mobile-action-btn movements-btn",
      on: {
        click: function click($event) {
          return _vm.abrirMovimientos(producto);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-exchange-alt"
    }), _vm._v("\n                                Movimientos\n                            ")])])]);
  }), 0) : _vm._e(), _vm._v(" "), !_vm.tableLoader && _vm.filteredProductos.length === 0 ? _c("div", {
    staticClass: "no-data-container"
  }, [_vm._m(6)]) : _vm._e(), _vm._v(" "), !_vm.tableLoader && _vm.filteredProductos.length > 0 ? _c("div", {
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
  }), 0)]), _vm._v(" "), _c("div", {
    staticClass: "page-info-text"
  }, [_vm._v("\n                            Mostrando " + _vm._s(_vm.paginationInfo.start) + " - " + _vm._s(_vm.paginationInfo.end) + " de " + _vm._s(_vm.paginationInfo.total) + " productos\n                        ")])]), _vm._v(" "), _c("div", {
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
  }, _vm._l(_vm.getVisiblePages(), function (page) {
    return _c("button", {
      key: page,
      staticClass: "page-btn",
      "class": {
        active: page === _vm.currentPage,
        ellipsis: page === "..."
      },
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
  }, [_vm._v("\n                            Siguiente\n                            "), _c("i", {
    staticClass: "fas fa-chevron-right"
  })])])]) : _vm._e()])]), _vm._v(" "), _vm.movimientosModal ? _c("div", {
    staticClass: "movements-overlay",
    on: {
      click: function click($event) {
        if ($event.target !== $event.currentTarget) return null;
        return _vm.cerrarMovimientos.apply(null, arguments);
      }
    }
  }, [_c("section", {
    staticClass: "movements-modal",
    attrs: {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "movements-title"
    }
  }, [_c("header", {
    staticClass: "movements-header"
  }, [_c("div", [_c("h3", {
    attrs: {
      id: "movements-title"
    }
  }, [_vm._v("Movimientos del producto")]), _vm._v(" "), _vm.productoMovimiento ? _c("p", [_vm._v("\n                            " + _vm._s(_vm.productoMovimiento.producto) + " " + _vm._s(_vm.productoMovimiento.presentacion) + "\n                        ")]) : _vm._e()]), _vm._v(" "), _c("button", {
    staticClass: "movements-close",
    attrs: {
      "aria-label": "Cerrar movimientos"
    },
    on: {
      click: _vm.cerrarMovimientos
    }
  }, [_c("i", {
    staticClass: "fas fa-times"
  })])]), _vm._v(" "), _c("nav", {
    staticClass: "movements-tabs",
    attrs: {
      "aria-label": "Tipos de movimientos"
    }
  }, [_c("button", {
    "class": {
      active: _vm.movimientoTab === "entradas"
    },
    on: {
      click: function click($event) {
        return _vm.cambiarTabMovimiento("entradas");
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-arrow-down"
  }), _vm._v(" Entradas\n                    ")]), _vm._v(" "), _c("button", {
    "class": {
      active: _vm.movimientoTab === "salidas"
    },
    on: {
      click: function click($event) {
        return _vm.cambiarTabMovimiento("salidas");
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-arrow-up"
  }), _vm._v(" Salidas\n                    ")])]), _vm._v(" "), _c("div", {
    staticClass: "movements-body"
  }, [_vm.movimientosCargando ? _c("div", {
    staticClass: "movements-state"
  }, [_c("i", {
    staticClass: "fas fa-spinner fa-spin"
  }), _vm._v(" Cargando movimientos...\n                    ")]) : _vm.movimientosError ? _c("div", {
    staticClass: "movements-state movements-error"
  }, [_vm._v("\n                        " + _vm._s(_vm.movimientosError) + "\n                    ")]) : _vm.movimientos.data.length === 0 ? _c("div", {
    staticClass: "movements-state"
  }, [_vm._v("\n                        No hay " + _vm._s(_vm.movimientoTab) + " registradas para este producto.\n                    ")]) : _c("div", {
    staticClass: "movements-table-wrapper"
  }, [_c("table", {
    staticClass: "movements-table"
  }, [_c("thead", [_c("tr", [_c("th", [_vm._v("Producto")]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.movimientoTab === "entradas" ? "Venta / factura" : "Factura"))]), _vm._v(" "), _vm.movimientoTab === "salidas" ? _c("th", [_vm._v("Cliente")]) : _vm._e(), _vm._v(" "), _c("th", [_vm._v("Fecha")]), _vm._v(" "), _c("th", [_vm._v("Cantidad")]), _vm._v(" "), _c("th", [_vm._v("Precio")]), _vm._v(" "), _c("th", [_vm._v("Adicionales")]), _vm._v(" "), _vm.movimientoTab === "salidas" ? _c("th", [_vm._v("IVA")]) : _vm._e()])]), _vm._v(" "), _c("tbody", _vm._l(_vm.movimientos.data, function (movimiento) {
    return _c("tr", {
      key: movimiento.id
    }, [_c("td", {
      attrs: {
        "data-label": "Producto"
      }
    }, [_c("strong", [_vm._v(_vm._s(movimiento.producto) + " " + _vm._s(movimiento.presentacion))])]), _vm._v(" "), _c("td", {
      attrs: {
        "data-label": _vm.movimientoTab === "entradas" ? "Venta / factura" : "Factura"
      }
    }, [_vm._v("#" + _vm._s(movimiento.numero_factura || "Sin número"))]), _vm._v(" "), _vm.movimientoTab === "salidas" ? _c("td", {
      attrs: {
        "data-label": "Cliente"
      }
    }, [_c("strong", [_vm._v(_vm._s(movimiento.razon_social))]), _c("br"), _vm._v(" "), _c("small", [_vm._v("NIT " + _vm._s(movimiento.nit) + "-" + _vm._s(movimiento.dv))])]) : _vm._e(), _vm._v(" "), _c("td", {
      attrs: {
        "data-label": "Fecha"
      }
    }, [_vm._v(_vm._s(_vm.formatearFecha(movimiento.fecha_documento)))]), _vm._v(" "), _c("td", {
      staticClass: "movement-number",
      attrs: {
        "data-label": "Cantidad"
      }
    }, [_vm._v(_vm._s(movimiento.cantidad))]), _vm._v(" "), _c("td", {
      staticClass: "movement-number",
      attrs: {
        "data-label": "Precio"
      }
    }, [_vm._v(_vm._s(_vm.formatearMoneda(movimiento.precio)))]), _vm._v(" "), _c("td", {
      staticClass: "movement-number",
      attrs: {
        "data-label": "Adicionales"
      }
    }, [_vm._v(_vm._s(movimiento.adicionales || 0))]), _vm._v(" "), _vm.movimientoTab === "salidas" ? _c("td", {
      staticClass: "movement-number",
      attrs: {
        "data-label": "IVA"
      }
    }, [_vm._v(_vm._s(_vm.formatearMoneda(movimiento.iva || 0)))]) : _vm._e()]);
  }), 0)])])]), _vm._v(" "), _vm.movimientos.last_page > 1 ? _c("footer", {
    staticClass: "movements-pagination"
  }, [_c("span", [_vm._v("Página " + _vm._s(_vm.movimientos.current_page) + " de " + _vm._s(_vm.movimientos.last_page) + " · " + _vm._s(_vm.movimientos.total) + " registros")]), _vm._v(" "), _c("div", [_c("button", {
    attrs: {
      disabled: _vm.movimientos.current_page <= 1
    },
    on: {
      click: function click($event) {
        return _vm.cargarMovimientos(_vm.movimientos.current_page - 1);
      }
    }
  }, [_vm._v("Anterior")]), _vm._v(" "), _c("button", {
    attrs: {
      disabled: _vm.movimientos.current_page >= _vm.movimientos.last_page
    },
    on: {
      click: function click($event) {
        return _vm.cargarMovimientos(_vm.movimientos.current_page + 1);
      }
    }
  }, [_vm._v("Siguiente")])])]) : _vm._e()])]) : _vm._e()], 1)]);
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
  }, [_vm._v("Cargando Productos")]), _vm._v(" "), _c("p", {
    staticClass: "loading-subtitle"
  }, [_vm._v("Obteniendo información del inventario...")]), _vm._v(" "), _c("div", {
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "col-12 col-lg-6"
  }, [_c("div", {
    staticClass: "page-header"
  }, [_c("h2", {
    staticClass: "page-title"
  }, [_c("i", {
    staticClass: "fas fa-boxes mr-3"
  }), _vm._v("\n                                Productos\n                            ")]), _vm._v(" "), _c("p", {
    staticClass: "page-description"
  }, [_vm._v("\n                                Crea, edita y administra los productos de tu inventario\n                            ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h3", {
    staticClass: "table-title"
  }, [_c("i", {
    staticClass: "fas fa-list table-icon"
  }), _vm._v("\n                            Inventario de Productos\n                        ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "table-actions"
  }, [_c("a", {
    staticClass: "excel-btn",
    attrs: {
      href: "/descargar-inventario",
      target: "_blank"
    }
  }, [_c("i", {
    staticClass: "fas fa-file-excel"
  }), _vm._v("\n                            Exportar inventario\n                        ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "table-loading-content"
  }, [_c("div", {
    staticClass: "table-loader"
  }, [_c("div", {
    staticClass: "table-loader-spinner"
  }), _vm._v(" "), _c("div", {
    staticClass: "table-loader-pulse"
  })]), _vm._v(" "), _c("h4", {
    staticClass: "table-loading-title"
  }, [_vm._v("Cargando Lista de Precios")]), _vm._v(" "), _c("p", {
    staticClass: "table-loading-subtitle"
  }, [_vm._v("Actualizando productos...")]), _vm._v(" "), _c("div", {
    staticClass: "table-loading-progress"
  }, [_c("div", {
    staticClass: "table-progress-bar"
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_c("i", {
    staticClass: "fas fa-flask"
  }), _vm._v(" Laboratorio")]), _vm._v(" "), _c("th", [_c("i", {
    staticClass: "fas fa-box"
  }), _vm._v(" Producto")]), _vm._v(" "), _c("th", [_c("i", {
    staticClass: "fas fa-pills"
  }), _vm._v(" Presentación")]), _vm._v(" "), _c("th", [_c("i", {
    staticClass: "fas fa-warehouse"
  }), _vm._v(" Stock")]), _vm._v(" "), _c("th", [_c("i", {
    staticClass: "fas fa-dollar-sign"
  }), _vm._v(" Precio")]), _vm._v(" "), _c("th", [_c("i", {
    staticClass: "fas fa-cogs"
  }), _vm._v(" Acciones")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "no-data-message"
  }, [_c("i", {
    staticClass: "fas fa-inbox no-data-icon"
  }), _vm._v(" "), _c("h4", [_vm._v("No se encontraron productos")]), _vm._v(" "), _c("p", [_vm._v("Intenta cambiar los filtros o crear un nuevo producto")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/Stock.vue":
/*!*******************************************!*\
  !*** ./resources/js/components/Stock.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Stock_vue_vue_type_template_id_1debf4bb_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stock.vue?vue&type=template&id=1debf4bb&scoped=true */ "./resources/js/components/Stock.vue?vue&type=template&id=1debf4bb&scoped=true");
/* harmony import */ var _Stock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Stock.vue?vue&type=script&lang=js */ "./resources/js/components/Stock.vue?vue&type=script&lang=js");
/* harmony import */ var _Stock_vue_vue_type_style_index_0_id_1debf4bb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css */ "./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Stock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Stock_vue_vue_type_template_id_1debf4bb_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Stock_vue_vue_type_template_id_1debf4bb_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "1debf4bb",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/Stock.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Stock.vue?vue&type=script&lang=js":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Stock.vue?vue&type=script&lang=js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Stock.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_style_index_0_id_1debf4bb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=style&index=0&id=1debf4bb&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/Stock.vue?vue&type=template&id=1debf4bb&scoped=true":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Stock.vue?vue&type=template&id=1debf4bb&scoped=true ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_template_id_1debf4bb_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_template_id_1debf4bb_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Stock_vue_vue_type_template_id_1debf4bb_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Stock.vue?vue&type=template&id=1debf4bb&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Stock.vue?vue&type=template&id=1debf4bb&scoped=true");


/***/ })

}]);