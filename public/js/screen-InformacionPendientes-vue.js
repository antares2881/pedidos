"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-InformacionPendientes-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      cotizaciones: [],
      data: [],
      directos: [],
      indirectos: [],
      tipo_cliente: {
        id: null,
        tipo: null
      }
    };
  },
  mounted: function mounted() {
    this.getCotizaciones();
    this.getIndirectos();
  },
  methods: {
    cancelPedido: function cancelPedido(id) {
      Swal.fire({
        title: 'Estas seguro?',
        text: "Intentas cancelar una transferencia!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then(function (result) {
        if (result.isConfirmed) {
          axios.put("/estado-transferencias/".concat(id)).then(function (res) {
            // console.log(res.data)
            if (res.data === 'ok') {
              Swal.fire('Cancelada!', 'La transferencia fue cancelada.', 'success');
              location.reload();
            }
          })["catch"](function (err) {
            console.log(err);
          });
        }
      });
    },
    getCotizaciones: function getCotizaciones() {},
    getIndirectos: function getIndirectos() {
      var _this = this;
      axios.get('/transferencias-pendientes').then(function (res) {
        console.log(res.data);
        _this.indirectos = res.data;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    showPendientes: function showPendientes(id) {
      this.data = [];
      this.tipo_cliente.id = id;
      if (id === 1) {
        this.tipo_cliente.tipo = 'Indirecto';
        this.data = this.indirectos;
      } else if (id === 2) {
        this.tipo_cliente.tipo = 'Directo';
        this.data = this.directos;
      } else {
        this.tipo_cliente.tipo = 'Cotización';
      }
      this.$refs['my-modal'].show();
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* ====================================\r\n   ESTILOS PROFESIONALES - PENDIENTES\r\n   ==================================== */\n.pendientes-container[data-v-526900c6] {\r\n    min-height: 100vh;\r\n    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\r\n    padding: 2rem;\n}\r\n\r\n/* Header profesional */\n.professional-header[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);\r\n    border-radius: 16px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 8px 32px rgba(0,0,0,0.1);\r\n    color: #ffffff !important;\r\n    position: relative;\n}\n.header-content[data-v-526900c6] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1.5rem;\r\n    color: #ffffff !important;\n}\n.header-text[data-v-526900c6] {\r\n    color: #ffffff !important;\n}\n.header-text *[data-v-526900c6] {\r\n    color: inherit !important;\n}\n.header-icon[data-v-526900c6] {\r\n    background: rgba(255,255,255,0.2);\r\n    width: 64px;\r\n    height: 64px;\r\n    border-radius: 50%;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.5rem;\r\n    color: #ffffff !important;\r\n    border: 2px solid rgba(255,255,255,0.3);\n}\n.header-title[data-v-526900c6] {\r\n    font-size: 2rem;\r\n    font-weight: 600;\r\n    margin: 0;\r\n    letter-spacing: -0.5px;\r\n    color: #ffffff !important;\r\n    text-shadow: 0 2px 4px rgba(0,0,0,0.3);\n}\n.header-subtitle[data-v-526900c6] {\r\n    font-size: 1rem;\r\n    margin: 0.5rem 0 0 0;\r\n    color: #ecf0f1 !important;\r\n    opacity: 0.95;\n}\r\n\r\n/* Grid de estadísticas */\n.statistics-grid[data-v-526900c6] {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\r\n    gap: 2rem;\r\n    margin-bottom: 2rem;\n}\r\n\r\n/* Cards de estadísticas */\n.stat-card[data-v-526900c6] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 2rem;\r\n    box-shadow: 0 4px 20px rgba(0,0,0,0.08);\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    border: 1px solid rgba(0,0,0,0.05);\r\n    position: relative;\r\n    overflow: hidden;\n}\n.stat-card[data-v-526900c6]::before {\r\n    content: '';\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    height: 4px;\r\n    background: linear-gradient(90deg, #3498db, #2980b9);\n}\n.stat-card[data-v-526900c6]:hover {\r\n    transform: translateY(-4px);\r\n    box-shadow: 0 12px 40px rgba(0,0,0,0.15);\n}\n.transferencias-card[data-v-526900c6]::before {\r\n    background: linear-gradient(90deg, #e67e22, #d35400);\n}\n.cotizaciones-card[data-v-526900c6]::before {\r\n    background: linear-gradient(90deg, #9b59b6, #8e44ad);\n}\n.stat-card-header[data-v-526900c6] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 1.5rem;\n}\n.stat-icon[data-v-526900c6] {\r\n    width: 56px;\r\n    height: 56px;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.5rem;\r\n    color: white;\n}\n.transferencias-icon[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #e67e22, #d35400);\n}\n.cotizaciones-icon[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #9b59b6, #8e44ad);\n}\n.stat-badge[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #2c3e50, #34495e);\r\n    color: white;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 20px;\r\n    font-size: 1.25rem;\r\n    font-weight: 700;\r\n    min-width: 60px;\r\n    text-align: center;\n}\n.stat-card-body[data-v-526900c6] {\r\n    margin-bottom: 1.5rem;\n}\n.stat-title[data-v-526900c6] {\r\n    font-size: 1.5rem;\r\n    font-weight: 600;\r\n    color: #2c3e50;\r\n    margin: 0 0 0.5rem 0;\n}\n.stat-description[data-v-526900c6] {\r\n    color: #6c757d;\r\n    margin: 0;\r\n    font-size: 0.95rem;\n}\n.stat-card-footer[data-v-526900c6] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    color: #495057;\r\n    font-weight: 500;\n}\n.view-details[data-v-526900c6] {\r\n    font-size: 0.9rem;\n}\r\n\r\n/* Modal profesional */\n.professional-modal .modal-header[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px 12px 0 0;\n}\n.professional-table-container[data-v-526900c6] {\r\n    background: white;\r\n    border-radius: 12px;\r\n    overflow: hidden;\r\n    box-shadow: 0 4px 20px rgba(0,0,0,0.08);\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-526900c6] {\r\n    margin: 0;\r\n    width: 100%;\r\n    min-width: 780px;\r\n    table-layout: auto;\r\n    word-wrap: break-word;\n}\n.professional-table thead th[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\r\n    color: #2c3e50;\r\n    font-weight: 600;\r\n    padding: 1rem 0.5rem;\r\n    border: none;\r\n    font-size: 0.8rem;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.3px;\r\n    white-space: nowrap;\r\n    text-align: center;\r\n    line-height: 1.2;\r\n    vertical-align: middle;\n}\r\n\r\n/* ITEM - Columna 1 */\n.professional-table thead th[data-v-526900c6]:first-child {\r\n    width: 7%;\r\n    min-width: 50px;\n}\r\n\r\n/* LAB - Columna 2 (condicional) */\n.professional-table thead th[data-v-526900c6]:nth-child(2) {\r\n    width: 7%;\r\n    min-width: 50px;\n}\r\n\r\n/* NÚMERO - Columna 3 */\n.professional-table thead th[data-v-526900c6]:nth-child(4) {\r\n    width: 4%;\r\n    min-width: 45px;\r\n    text-align: center;\n}\r\n\r\n/* CLIENTE - Columna 4 */\n.professional-table thead th[data-v-526900c6]:nth-child(5) {\r\n    width: 10%;\r\n    min-width: 80px;\r\n    text-align: left;\r\n    padding-left: 1rem;\n}\r\n\r\n/* VALOR - Columna 5 */\n.professional-table thead th[data-v-526900c6]:nth-child(3) {\r\n    width: 52%;\r\n    min-width: 340px;\n}\r\n\r\n/* FECHA - Columna 6 */\n.professional-table thead th[data-v-526900c6]:nth-child(6) {\r\n    width: 11%;\r\n    min-width: 90px;\n}\r\n\r\n/* ACCIONES - Última columna */\n.professional-table thead th[data-v-526900c6]:last-child {\r\n    width: 12%;\r\n    min-width: 110px;\n}\r\n\r\n/* Reglas específicas cuando hay columna LAB */\r\n/* En este caso las posiciones cambian: Item(1), Lab(2), Número(3), Cliente(4), Valor(5), Fecha(6), Acciones(7) */\n.professional-table thead th[data-v-526900c6]:nth-child(4):not(:nth-last-child(3)) {\r\n    width: 8%;\r\n    min-width: 70px;\r\n    text-align: left;\r\n    padding-left: 1rem;\n}\n.professional-table tbody td[data-v-526900c6] {\r\n    padding: 1rem 0.75rem;\r\n    border-bottom: 1px solid #f1f3f4;\r\n    vertical-align: middle;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    text-align: center;\n}\r\n\r\n/* Columna de cliente - ahora más compacta */\n.professional-table tbody td[data-v-526900c6]:nth-child(3) {\r\n    text-align: left !important;\r\n    white-space: nowrap !important;\r\n    overflow: hidden !important;\r\n    text-overflow: ellipsis !important;\r\n    padding: 1rem 0.5rem !important;\r\n    font-weight: 600 !important;\r\n    color: #2c3e50 !important;\n}\r\n\r\n/* Columna de valor - ahora más amplia */\n.professional-table tbody td[data-v-526900c6]:nth-child(4) {\r\n    text-align: center !important;\r\n    white-space: nowrap !important;\r\n    padding: 1rem 0.5rem !important;\n}\r\n\r\n/* Elemento strong dentro de la columna cliente */\n.professional-table tbody td strong[data-v-526900c6] {\r\n    white-space: normal !important;\r\n    word-wrap: break-word !important;\r\n    overflow: visible !important;\r\n    text-overflow: unset !important;\r\n    display: block !important;\r\n    width: 100% !important;\r\n    font-weight: 600 !important;\r\n    color: #2c3e50 !important;\n}\n.professional-table tbody tr[data-v-526900c6]:hover {\r\n    background: rgba(52, 152, 219, 0.05);\n}\r\n\r\n/* Elementos de tabla */\n.item-badge[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #3498db, #2980b9);\r\n    color: white;\r\n    padding: 0.25rem 0.5rem;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 0.8rem;\r\n    display: inline-block;\r\n    min-width: 30px;\r\n    text-align: center;\n}\n.number-badge[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #2c3e50, #34495e);\r\n    color: white;\r\n    padding: 0.15rem 0.3rem;\r\n    border-radius: 4px;\r\n    font-weight: 600;\r\n    font-size: 0.75rem;\r\n    display: inline-block;\r\n    text-align: center;\r\n    white-space: nowrap;\r\n    min-width: 40px;\r\n    max-width: 50px;\n}\n.value-badge[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #27ae60, #229954);\r\n    color: white;\r\n    padding: 0.2rem 0.4rem;\r\n    border-radius: 6px;\r\n    font-weight: 600;\r\n    font-size: 0.8rem;\r\n    display: inline-block;\r\n    text-align: center;\r\n    white-space: nowrap;\r\n    min-width: 70px;\r\n    max-width: 100px;\n}\n.date-text[data-v-526900c6] {\r\n    color: #6c757d;\r\n    font-weight: 500;\r\n    font-size: 0.85rem;\r\n    white-space: nowrap;\n}\n.lab-logo[data-v-526900c6] {\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n    box-shadow: 0 2px 8px rgba(0,0,0,0.1);\r\n    display: block;\r\n    margin: 0 auto;\n}\r\n\r\n/* Botones de acción */\n.action-buttons[data-v-526900c6] {\r\n    display: flex;\r\n    gap: 0.25rem;\r\n    justify-content: center;\r\n    flex-wrap: nowrap;\n}\n.action-btn[data-v-526900c6] {\r\n    width: 35px;\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    text-decoration: none;\r\n    border: none;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 0.9rem;\r\n    position: relative;\r\n    flex-shrink: 0;\n}\n.action-btn i[data-v-526900c6] {\r\n    color: white !important;\r\n    font-size: 0.9rem !important;\r\n    line-height: 1;\r\n    display: inline-block;\r\n    width: auto;\r\n    height: auto;\n}\n.btn-facturar[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #f39c12, #e67e22);\r\n    color: white !important;\n}\n.btn-facturar[data-v-526900c6]:hover {\r\n    transform: scale(1.1);\r\n    box-shadow: 0 4px 12px rgba(243, 156, 18, 0.4);\r\n    color: white !important;\r\n    text-decoration: none;\n}\n.btn-facturar i[data-v-526900c6] {\r\n    color: white !important;\n}\n.btn-editar[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #3498db, #2980b9);\r\n    color: white !important;\n}\n.btn-editar[data-v-526900c6]:hover {\r\n    transform: scale(1.1);\r\n    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);\r\n    color: white !important;\r\n    text-decoration: none;\n}\n.btn-editar i[data-v-526900c6] {\r\n    color: white !important;\n}\n.btn-imprimir[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #e74c3c, #c0392b);\r\n    color: white !important;\n}\n.btn-imprimir[data-v-526900c6]:hover {\r\n    transform: scale(1.1);\r\n    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);\r\n    color: white !important;\r\n    text-decoration: none;\n}\n.btn-imprimir i[data-v-526900c6] {\r\n    color: white !important;\n}\n.btn-cancelar[data-v-526900c6] {\r\n    background: linear-gradient(135deg, #95a5a6, #7f8c8d);\r\n    color: white !important;\n}\n.btn-cancelar[data-v-526900c6]:hover {\r\n    transform: scale(1.1);\r\n    box-shadow: 0 4px 12px rgba(149, 165, 166, 0.4);\r\n    color: white !important;\n}\n.btn-cancelar i[data-v-526900c6] {\r\n    color: white !important;\n}\r\n\r\n\r\n\r\n/* Animaciones */\n.fade-in-up[data-v-526900c6] {\r\n    animation: fadeInUp-526900c6 0.6s ease-out;\n}\n@keyframes fadeInUp-526900c6 {\nfrom {\r\n        opacity: 0;\r\n        transform: translateY(20px);\n}\nto {\r\n        opacity: 1;\r\n        transform: translateY(0);\n}\n}\r\n\r\n/* Responsive */\n@media (max-width: 1200px) {\n.professional-table[data-v-526900c6] {\r\n        min-width: 680px;\n}\n.professional-table thead th[data-v-526900c6] {\r\n        font-size: 0.75rem;\r\n        padding: 0.8rem 0.4rem;\r\n        letter-spacing: 0.2px;\n}\n.professional-table thead th[data-v-526900c6]:nth-child(3) {\r\n        font-size: 0.7rem;\r\n        line-height: 1.1;\r\n        width: 4% !important;\r\n        min-width: 40px !important;\n}\n.professional-table tbody td[data-v-526900c6] {\r\n        padding: 0.8rem 0.4rem;\r\n        font-size: 0.85rem;\n}\n.professional-table tbody td[data-v-526900c6]:nth-child(4) {\r\n        padding: 0.8rem 0.3rem !important;\r\n        font-size: 0.82rem !important;\n}\n.professional-table tbody td[data-v-526900c6]:nth-child(5) {\r\n        padding: 0.8rem 0.3rem !important;\r\n        font-size: 0.85rem !important;\n}\n.professional-table tbody td strong[data-v-526900c6] {\r\n        font-size: 0.82rem !important;\n}\n}\n@media (max-width: 992px) {\n.professional-table[data-v-526900c6] {\r\n        min-width: 580px;\n}\n.professional-table thead th[data-v-526900c6] {\r\n        padding: 0.75rem 0.3rem;\r\n        font-size: 0.7rem;\r\n        letter-spacing: 0.1px;\n}\n.professional-table thead th[data-v-526900c6]:nth-child(4) {\r\n        font-size: 0.65rem;\r\n        line-height: 1.0;\n}\n.professional-table tbody td[data-v-526900c6] {\r\n        padding: 0.75rem 0.3rem;\r\n        font-size: 0.8rem;\n}\n.professional-table tbody td[data-v-526900c6]:nth-child(4) {\r\n        padding: 0.75rem 0.2rem !important;\r\n        font-size: 0.75rem !important;\n}\n.professional-table tbody td[data-v-526900c6]:nth-child(5) {\r\n        padding: 0.75rem 0.2rem !important;\r\n        font-size: 0.78rem !important;\n}\n.professional-table tbody td strong[data-v-526900c6] {\r\n        font-size: 0.75rem !important;\n}\n.action-btn[data-v-526900c6] {\r\n        width: 32px;\r\n        height: 32px;\r\n        font-size: 0.8rem;\n}\n.action-btn i[data-v-526900c6] {\r\n        font-size: 0.8rem !important;\n}\n.item-badge[data-v-526900c6],\r\n    .number-badge[data-v-526900c6],\r\n    .value-badge[data-v-526900c6] {\r\n        font-size: 0.75rem;\r\n        padding: 0.2rem 0.4rem;\n}\n.lab-logo[data-v-526900c6] {\r\n        width: 30px;\r\n        height: 30px;\n}\n}\n@media (max-width: 768px) {\n.pendientes-container[data-v-526900c6] {\r\n        padding: 1rem;\n}\n.professional-header[data-v-526900c6] {\r\n        padding: 1.5rem;\n}\n.header-content[data-v-526900c6] {\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 1rem;\n}\n.header-title[data-v-526900c6] {\r\n        font-size: 1.5rem;\n}\n.statistics-grid[data-v-526900c6] {\r\n        grid-template-columns: 1fr;\r\n        gap: 1rem;\n}\n.stat-card[data-v-526900c6] {\r\n        padding: 1.5rem;\n}\r\n    \r\n    /* Tabla más compacta en móviles */\n.professional-table[data-v-526900c6] {\r\n        min-width: 510px;\r\n        font-size: 0.8rem;\n}\n.professional-table thead th[data-v-526900c6] {\r\n        padding: 0.6rem 0.25rem;\r\n        font-size: 0.65rem;\r\n        letter-spacing: 0px;\r\n        line-height: 1.1;\n}\n.professional-table thead th[data-v-526900c6]:nth-child(4) {\r\n        font-size: 0.6rem;\r\n        line-height: 1.0;\r\n        word-spacing: -1px;\n}\n.professional-table tbody td[data-v-526900c6] {\r\n        padding: 0.6rem 0.25rem;\r\n        font-size: 0.75rem;\n}\n.professional-table tbody td[data-v-526900c6]:nth-child(4) {\r\n        padding: 0.6rem 0.15rem !important;\r\n        font-size: 0.7rem !important;\r\n        max-width: none !important;\n}\n.professional-table tbody td[data-v-526900c6]:nth-child(5) {\r\n        padding: 0.6rem 0.15rem !important;\r\n        font-size: 0.72rem !important;\r\n        max-width: none !important;\n}\n.professional-table tbody td strong[data-v-526900c6] {\r\n        font-size: 0.7rem !important;\n}\n.action-buttons[data-v-526900c6] {\r\n        flex-direction: column;\r\n        gap: 0.2rem;\r\n        align-items: center;\n}\n.action-btn[data-v-526900c6] {\r\n        width: 28px;\r\n        height: 28px;\r\n        font-size: 0.7rem;\n}\n.action-btn i[data-v-526900c6] {\r\n        font-size: 0.7rem !important;\n}\n.item-badge[data-v-526900c6] {\r\n        min-width: 25px;\r\n        font-size: 0.7rem;\r\n        padding: 0.15rem 0.3rem;\n}\n.number-badge[data-v-526900c6],\r\n    .value-badge[data-v-526900c6] {\r\n        font-size: 0.7rem;\r\n        padding: 0.15rem 0.3rem;\n}\n.date-text[data-v-526900c6] {\r\n        font-size: 0.7rem;\n}\n.lab-logo[data-v-526900c6] {\r\n        width: 25px;\r\n        height: 25px;\n}\r\n    \r\n    /* Scroll indicator para móviles */\n.professional-table-container[data-v-526900c6]::after {\r\n        content: \"← Desliza horizontalmente para ver más →\";\r\n        display: block;\r\n        text-align: center;\r\n        padding: 0.5rem;\r\n        background: rgba(52, 152, 219, 0.1);\r\n        color: #3498db;\r\n        font-size: 0.7rem;\r\n        margin: 0;\r\n        border-radius: 0 0 12px 12px;\r\n        font-weight: 600;\n}\n}\n@media (max-width: 480px) {\n.professional-table[data-v-526900c6] {\r\n        min-width: 480px;\n}\n.professional-table thead th[data-v-526900c6] {\r\n        padding: 0.5rem 0.2rem;\r\n        font-size: 0.6rem;\r\n        letter-spacing: -0.2px;\r\n        line-height: 1.0;\n}\n.professional-table thead th[data-v-526900c6]:nth-child(4) {\r\n        font-size: 0.55rem;\r\n        line-height: 0.9;\r\n        word-spacing: -2px;\n}\n.professional-table tbody td[data-v-526900c6] {\r\n        padding: 0.5rem 0.2rem;\r\n        font-size: 0.7rem;\n}\n.professional-table tbody td[data-v-526900c6]:nth-child(4),\r\n    .professional-table tbody td[data-v-526900c6]:nth-child(5) {\r\n        padding: 0.5rem 0.1rem !important;\r\n        font-size: 0.65rem !important;\r\n        max-width: none !important;\r\n        line-height: 1.2 !important;\n}\n.professional-table tbody td strong[data-v-526900c6] {\r\n        font-size: 0.65rem !important;\r\n        line-height: 1.2 !important;\n}\n.action-buttons[data-v-526900c6] {\r\n        gap: 0.1rem;\n}\n.action-btn[data-v-526900c6] {\r\n        width: 25px;\r\n        height: 25px;\r\n        font-size: 0.65rem;\r\n        border-radius: 6px;\n}\n.action-btn i[data-v-526900c6] {\r\n        font-size: 0.65rem !important;\n}\n.item-badge[data-v-526900c6],\r\n    .number-badge[data-v-526900c6],\r\n    .value-badge[data-v-526900c6] {\r\n        font-size: 0.65rem;\r\n        padding: 0.1rem 0.25rem;\n}\n.date-text[data-v-526900c6] {\r\n        font-size: 0.65rem;\n}\n.lab-logo[data-v-526900c6] {\r\n        width: 22px;\r\n        height: 22px;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.professional-modal .modal-dialog {\n    width: calc(100vw - 2rem);\n    max-width: 1100px;\n    margin: 1.75rem auto;\n}\n@media (min-width: 1200px) {\n.professional-modal .modal-dialog {\n        width: 80vw;\n        max-width: 1500px;\n}\n.professional-modal .modal-body {\n        padding: 2rem 2.5rem;\n}\n}\n@media (max-width: 767.98px) {\n.professional-modal .modal-dialog {\n        width: calc(100vw - 1rem);\n        max-width: none;\n        margin: 0.5rem auto;\n}\n.professional-modal .modal-body {\n        padding: 1rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_style_index_0_id_526900c6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_style_index_0_id_526900c6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_style_index_0_id_526900c6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_style_index_1_id_526900c6_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_style_index_1_id_526900c6_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_style_index_1_id_526900c6_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=template&id=526900c6&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=template&id=526900c6&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "pendientes-container"
  }, [_c("b-modal", {
    ref: "my-modal",
    attrs: {
      "no-close-on-backdrop": "",
      scrollable: "",
      "hide-footer": "",
      title: "Pendientes " + _vm.tipo_cliente.tipo,
      size: "xl",
      "modal-class": "professional-modal"
    }
  }, [_c("div", {
    staticClass: "professional-table-container"
  }, [_c("table", {
    staticClass: "table professional-table"
  }, [_c("thead", [_c("tr", [_c("th", [_vm._v("Item")]), _vm._v(" "), _c("th", [_vm._v("Número")]), _vm._v(" "), _c("th", [_vm._v("Cliente")]), _vm._v(" "), _c("th", [_vm._v("Valor")]), _vm._v(" "), _c("th", [_vm._v("Fecha")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_vm._v("Acciones")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.data, function (item, index) {
    return _c("tr", {
      key: index,
      staticClass: "fade-in-up"
    }, [_c("td", [_c("span", {
      staticClass: "item-badge"
    }, [_vm._v(_vm._s(index + 1))])]), _vm._v(" "), _c("td", [_c("span", {
      staticClass: "number-badge"
    }, [_vm._v(_vm._s(_vm.tipo_cliente.id === 1 ? item.numero : item.num_pedido))])]), _vm._v(" "), _c("td", [_vm.tipo_cliente.id === 2 ? _c("img", {
      staticClass: "lab-logo",
      attrs: {
        src: item.logo
      }
    }) : _vm._e(), _vm._v(" "), _c("strong", [_vm._v(_vm._s(item.razon_social))])]), _vm._v(" "), _c("td", [_c("span", {
      staticClass: "value-badge"
    }, [_vm._v(_vm._s(_vm._f("currency")(item.valor)))])]), _vm._v(" "), _c("td", [_c("span", {
      staticClass: "date-text"
    }, [_vm._v(_vm._s(item.fecha))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center"
    }, [_c("div", {
      staticClass: "action-buttons"
    }, [_c("a", {
      staticClass: "action-btn btn-facturar",
      attrs: {
        href: "/realizar-facturas/" + item.numero,
        title: "Facturar"
      }
    }, [_c("i", {
      staticClass: "fas fa-dollar-sign"
    })]), _vm._v(" "), _c("a", {
      staticClass: "action-btn btn-editar",
      attrs: {
        href: "/nueva-transferencia/" + item.numero,
        title: "Editar"
      }
    }, [_c("i", {
      staticClass: "fas fa-edit"
    })]), _vm._v(" "), _c("a", {
      staticClass: "action-btn btn-imprimir",
      attrs: {
        href: "/imprimir-transferencia/" + item.id,
        target: "_blank",
        title: "Imprimir pedido"
      }
    }, [_c("i", {
      staticClass: "fas fa-print"
    })]), _vm._v(" "), _c("button", {
      staticClass: "action-btn btn-cancelar",
      attrs: {
        title: "Cancelar pedido"
      },
      on: {
        click: function click($event) {
          return _vm.cancelPedido(item.id);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-times"
    })])])])]);
  }), 0)])])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "statistics-grid"
  }, [_c("div", {
    staticClass: "stat-card transferencias-card",
    on: {
      click: function click($event) {
        return _vm.showPendientes(1);
      }
    }
  }, [_c("div", {
    staticClass: "stat-card-header"
  }, [_vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "stat-badge"
  }, [_vm._v("\n                        " + _vm._s(_vm.indirectos.length) + "\n                    ")])]), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3)]), _vm._v(" "), _c("div", {
    staticClass: "stat-card cotizaciones-card",
    on: {
      click: function click($event) {
        return _vm.showPendientes(3);
      }
    }
  }, [_c("div", {
    staticClass: "stat-card-header"
  }, [_vm._m(4), _vm._v(" "), _c("div", {
    staticClass: "stat-badge"
  }, [_vm._v("\n                        " + _vm._s(_vm.cotizaciones.length) + "\n                    ")])]), _vm._v(" "), _vm._m(5), _vm._v(" "), _vm._m(6)])])], 1)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "professional-header"
  }, [_c("div", {
    staticClass: "header-content"
  }, [_c("div", {
    staticClass: "header-icon"
  }, [_c("i", {
    staticClass: "fas fa-clock"
  })]), _vm._v(" "), _c("div", {
    staticClass: "header-text"
  }, [_c("h2", {
    staticClass: "header-title"
  }, [_vm._v("Panel de Pendientes")]), _vm._v(" "), _c("p", {
    staticClass: "header-subtitle"
  }, [_vm._v("Gestión de transferencias y cotizaciones pendientes")])])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "stat-icon transferencias-icon"
  }, [_c("i", {
    staticClass: "fas fa-exchange-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "stat-card-body"
  }, [_c("h3", {
    staticClass: "stat-title"
  }, [_vm._v("Transferencias")]), _vm._v(" "), _c("p", {
    staticClass: "stat-description"
  }, [_vm._v("Pendientes por procesar")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "stat-card-footer"
  }, [_c("span", {
    staticClass: "view-details"
  }, [_vm._v("Ver detalles")]), _vm._v(" "), _c("i", {
    staticClass: "fas fa-arrow-right"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "stat-icon cotizaciones-icon"
  }, [_c("i", {
    staticClass: "fas fa-file-alt"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "stat-card-body"
  }, [_c("h3", {
    staticClass: "stat-title"
  }, [_vm._v("Cotizaciones")]), _vm._v(" "), _c("p", {
    staticClass: "stat-description"
  }, [_vm._v("En espera de respuesta")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "stat-card-footer"
  }, [_c("span", {
    staticClass: "view-details"
  }, [_vm._v("Ver detalles")]), _vm._v(" "), _c("i", {
    staticClass: "fas fa-arrow-right"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/InformacionPendientes.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/InformacionPendientes.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _InformacionPendientes_vue_vue_type_template_id_526900c6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InformacionPendientes.vue?vue&type=template&id=526900c6&scoped=true */ "./resources/js/components/InformacionPendientes.vue?vue&type=template&id=526900c6&scoped=true");
/* harmony import */ var _InformacionPendientes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InformacionPendientes.vue?vue&type=script&lang=js */ "./resources/js/components/InformacionPendientes.vue?vue&type=script&lang=js");
/* harmony import */ var _InformacionPendientes_vue_vue_type_style_index_0_id_526900c6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css */ "./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css");
/* harmony import */ var _InformacionPendientes_vue_vue_type_style_index_1_id_526900c6_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css */ "./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _InformacionPendientes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _InformacionPendientes_vue_vue_type_template_id_526900c6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _InformacionPendientes_vue_vue_type_template_id_526900c6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "526900c6",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/InformacionPendientes.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/InformacionPendientes.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/InformacionPendientes.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InformacionPendientes.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_style_index_0_id_526900c6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=0&id=526900c6&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_style_index_1_id_526900c6_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=style&index=1&id=526900c6&lang=css");


/***/ }),

/***/ "./resources/js/components/InformacionPendientes.vue?vue&type=template&id=526900c6&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/InformacionPendientes.vue?vue&type=template&id=526900c6&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_template_id_526900c6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_template_id_526900c6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_InformacionPendientes_vue_vue_type_template_id_526900c6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./InformacionPendientes.vue?vue&type=template&id=526900c6&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/InformacionPendientes.vue?vue&type=template&id=526900c6&scoped=true");


/***/ })

}]);