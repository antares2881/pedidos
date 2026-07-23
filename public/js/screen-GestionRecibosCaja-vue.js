"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-GestionRecibosCaja-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************/
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
  name: 'GestionRecibosCaja',
  data: function data() {
    return {
      loading: false,
      busquedaRealizada: false,
      recibos: [],
      reciboSeleccionado: null,
      filtros: {
        num_recibo: '',
        tipo_cliente: ''
      }
    };
  },
  mounted: function mounted() {
    // Componente listo sin configuraciones iniciales
  },
  computed: {
    mostrarElectronica: function mostrarElectronica() {
      // Mostrar columna de electrónica solo si hay recibos de clientes indirectos (tipo 1)
      return this.recibos.some(function (recibo) {
        return recibo.tipo_cliente === '1';
      });
    },
    totalValorAbono: function totalValorAbono() {
      // Suma total de los valores de abono del recibo
      return this.recibos.reduce(function (total, recibo) {
        return total + parseFloat(recibo.valor_abono || 0);
      }, 0);
    }
  },
  methods: {
    buscarRecibos: function buscarRecibos() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var url, response, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _this.loading = true;
              _this.busquedaRealizada = true;
              _this.recibos = []; // Limpiar resultados anteriores
              _context.p = 1;
              if (_this.filtros.num_recibo) {
                _context.n = 2;
                break;
              }
              Swal.fire({
                icon: 'warning',
                title: 'Campo requerido',
                text: 'Debe ingresar el número de recibo para realizar la búsqueda'
              });
              _this.loading = false;
              return _context.a(2);
            case 2:
              if (_this.filtros.tipo_cliente) {
                _context.n = 3;
                break;
              }
              Swal.fire({
                icon: 'warning',
                title: 'Campo requerido',
                text: 'Debe seleccionar el tipo de cliente para realizar la búsqueda'
              });
              _this.loading = false;
              return _context.a(2);
            case 3:
              url = ''; // Determinar la ruta según el tipo de cliente
              if (_this.filtros.tipo_cliente == '1') {
                // Clientes indirectos - tabla cobros
                url = "/cobro/".concat(_this.filtros.num_recibo);
              } else if (_this.filtros.tipo_cliente == '2') {
                // Clientes directos - tabla abonopedidos
                url = "/abono/".concat(_this.filtros.num_recibo);
              }
              _context.n = 4;
              return axios.get(url);
            case 4:
              response = _context.v;
              // Procesar los datos según el tipo de cliente
              _this.recibos = _this.procesarDatosRecibo(response.data, _this.filtros.tipo_cliente);
              if (_this.recibos.length === 0) {
                Swal.fire({
                  icon: 'info',
                  title: 'Sin resultados',
                  text: 'No se encontraron recibos con el número especificado'
                });
              }
              _context.n = 6;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              console.error('Error al buscar recibos:', _t);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al buscar los recibos'
              });
            case 6:
              _context.p = 6;
              _this.loading = false;
              return _context.f(6);
            case 7:
              return _context.a(2);
          }
        }, _callee, null, [[1, 5, 6, 7]]);
      }))();
    },
    procesarDatosRecibo: function procesarDatosRecibo(data, tipoCliente) {
      return data.map(function (item) {
        console.log('Procesando item:', item); // Debug para verificar datos
        return {
          id: item.id,
          num_recibo_caja: item.num_recibo_caja,
          razon_social: item.razon_social,
          nit: item.nit,
          fecha_factura: item.fecha_factura,
          numero_factura: item.numero_factura,
          electronica: tipoCliente == '1' ? item.electronica : null,
          // Solo para clientes indirectos
          total_factura: item.total_factura,
          fecha_pago: item.fecha_pago,
          saldo: item.saldo,
          valor_abono: item.valor_abono,
          retencion: item.retencion || 0,
          descuento: item.descuento || 0,
          valor_nota: item.valor_nota || 0,
          pendiente: item.pendiente || 0,
          tipo_cliente: tipoCliente,
          estado_id: item.estado_id,
          // Incluir IDs necesarios para cancelación
          // Para clientes indirectos (cobros) - necesitamos factura_id
          factura_id: tipoCliente == '1' ? item.factura_id || item.id_factura : null,
          // Para clientes directos (abonos) - necesitamos venta_id
          venta_id: tipoCliente == '2' ? item.venta_id || item.id_venta || item.pedido_id : null
        };
      });
    },
    verDetalle: function verDetalle(recibo) {
      this.reciboSeleccionado = recibo;
      $('#modalDetalleRecibo').modal('show');
    },
    imprimirRecibo: function imprimirRecibo(numRecibo) {
      window.open("/recibo-caja/".concat(numRecibo), '_blank');
    },
    cancelarRecibo: function cancelarRecibo(numRecibo, tipoCliente, facturaId, ventaId) {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var result, url, payload, response, _error$response, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.n = 1;
              return Swal.fire({
                title: '¿Confirmar cancelación?',
                text: "\xBFEst\xE1 seguro de cancelar el recibo N\xB0 ".concat(numRecibo, "?"),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, cancelar',
                cancelButtonText: 'No, mantener'
              });
            case 1:
              result = _context2.v;
              if (!result.isConfirmed) {
                _context2.n = 7;
                break;
              }
              _context2.p = 2;
              url = '';
              payload = {
                num_recibo_caja: numRecibo
              }; // Determinar la ruta y datos según el tipo de cliente
              if (tipoCliente === '1') {
                // Clientes indirectos - enviar factura_id para CobroController
                url = "/cancelar-cobro/".concat(numRecibo);
                if (facturaId) {
                  payload.factura_id = facturaId;
                }
                console.log('Cancelando cobro con factura_id:', facturaId);
              } else if (tipoCliente === '2') {
                // Clientes directos - enviar venta_id para AbonopedidoController
                url = "/cancelar-abono/".concat(numRecibo);
                if (ventaId) {
                  payload.venta_id = ventaId;
                }
                console.log('Cancelando abono con venta_id:', ventaId);
              }
              console.log('Payload enviado:', payload);
              _context2.n = 3;
              return axios.put(url, payload);
            case 3:
              response = _context2.v;
              if (!response.data.success) {
                _context2.n = 4;
                break;
              }
              Swal.fire({
                icon: 'success',
                title: 'Recibo cancelado',
                text: 'El recibo ha sido cancelado exitosamente. El estado de la factura/venta ha sido actualizado.'
              });

              // Actualizar la búsqueda para mostrar el estado actualizado
              _this2.buscarRecibos();
              _context2.n = 5;
              break;
            case 4:
              throw new Error(response.data.message || 'Error al cancelar el recibo');
            case 5:
              _context2.n = 7;
              break;
            case 6:
              _context2.p = 6;
              _t2 = _context2.v;
              console.error('Error al cancelar recibo:', _t2);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: ((_error$response = _t2.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Ocurrió un error al cancelar el recibo'
              });
            case 7:
              return _context2.a(2);
          }
        }, _callee2, null, [[2, 6]]);
      }))();
    },
    formatDate: function formatDate(date) {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString('es-CO');
    },
    formatCurrency: function formatCurrency(value) {
      if (!value) return '$0';
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(value);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Estilos principales simplificados */\n.gestion-recibos-wrapper[data-v-3153da84] {\r\n    padding: 20px;\r\n    background-color: #f5f5f5;\n}\n.abonos-container[data-v-3153da84] {\r\n    max-width: 100%;\n}\r\n\r\n/* Header simple */\n.professional-header[data-v-3153da84] {\r\n    background: #007bff;\r\n    color: white;\r\n    padding: 20px;\r\n    border-radius: 8px;\r\n    margin-bottom: 20px;\r\n    text-align: center;\n}\n.professional-header h2[data-v-3153da84] {\r\n    margin: 0;\r\n    font-size: 24px;\r\n    font-weight: bold;\n}\r\n\r\n/* Sección de búsqueda simple */\n.search-section[data-v-3153da84] {\r\n    background: white;\r\n    padding: 20px;\r\n    border-radius: 8px;\r\n    margin-bottom: 20px;\r\n    display: flex;\r\n    gap: 15px;\r\n    align-items: end;\r\n    flex-wrap: wrap;\n}\n.search-field[data-v-3153da84] {\r\n    flex: 1;\r\n    min-width: 200px;\n}\n.form-label[data-v-3153da84] {\r\n    display: block;\r\n    margin-bottom: 5px;\r\n    font-weight: bold;\r\n    color: #333;\n}\n.professional-input[data-v-3153da84],\r\n.professional-select[data-v-3153da84] {\r\n    width: 100%;\r\n    padding: 12px 15px;\r\n    border: 1px solid #ddd;\r\n    border-radius: 4px;\r\n    font-size: 14px;\r\n    line-height: 1.4;\r\n    min-height: 42px;\n}\n.professional-select[data-v-3153da84] {\r\n    -webkit-appearance: none;\r\n       -moz-appearance: none;\r\n            appearance: none;\r\n    background-image: url(\"data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4z'/><path fill='%23666' d='m0 3 2 2 2-2z'/></svg>\");\r\n    background-repeat: no-repeat;\r\n    background-position: right 12px center;\r\n    background-size: 12px 10px;\r\n    padding-right: 35px;\n}\n.professional-input[data-v-3153da84]:focus,\r\n.professional-select[data-v-3153da84]:focus {\r\n    border-color: #007bff;\r\n    outline: none;\r\n    box-shadow: 0 0 5px rgba(0,123,255,0.3);\n}\n.search-button[data-v-3153da84] {\r\n    background: #28a745;\r\n    color: white;\r\n    border: none;\r\n    padding: 10px 20px;\r\n    border-radius: 4px;\r\n    cursor: pointer;\r\n    font-weight: bold;\n}\n.search-button[data-v-3153da84]:hover:not(:disabled) {\r\n    background: #218838;\n}\n.search-button[data-v-3153da84]:disabled {\r\n    background: #6c757d;\r\n    cursor: not-allowed;\n}\r\n\r\n/* Alert simple */\n.professional-alert[data-v-3153da84] {\r\n    background: #d1ecf1;\r\n    border: 1px solid #bee5eb;\r\n    border-radius: 4px;\r\n    padding: 15px;\r\n    margin-top: 15px;\n}\n.alert-content[data-v-3153da84] {\r\n    display: flex;\r\n    align-items: center;\n}\n.custom-icon[data-v-3153da84] {\r\n    margin-right: 10px;\r\n    color: #0c5460;\r\n    font-size: 18px;\n}\r\n\r\n/* Loading simple */\n.loading-section[data-v-3153da84] {\r\n    text-align: center;\r\n    padding: 40px;\r\n    background: white;\r\n    border-radius: 8px;\r\n    margin: 20px 0;\n}\n.loading-content i[data-v-3153da84] {\r\n    font-size: 48px;\r\n    color: #007bff;\n}\n.loading-text[data-v-3153da84] {\r\n    margin: 15px 0;\r\n    font-size: 16px;\r\n    color: #666;\n}\r\n\r\n/* Resultados */\n.results-section[data-v-3153da84] {\r\n    background: white;\r\n    border-radius: 8px;\r\n    padding: 20px;\r\n    margin-top: 20px;\n}\r\n\r\n/* Tabla simple */\n.professional-table-wrapper[data-v-3153da84] {\r\n    overflow-x: auto;\r\n    margin-top: 20px;\n}\n.professional-table[data-v-3153da84] {\r\n    width: 100%;\r\n    border-collapse: collapse;\n}\n.professional-table th[data-v-3153da84] {\r\n    background: #f8f9fa;\r\n    padding: 12px 8px;\r\n    border: 1px solid #ddd;\r\n    font-weight: bold;\r\n    text-align: left;\r\n    font-size: 13px;\n}\n.professional-table td[data-v-3153da84] {\r\n    padding: 10px 8px;\r\n    border: 1px solid #ddd;\r\n    font-size: 13px;\n}\n.professional-table tbody tr[data-v-3153da84]:hover {\r\n    background-color: #f5f5f5;\n}\r\n\r\n/* Badges simples */\n.badge[data-v-3153da84] {\r\n    padding: 4px 8px;\r\n    border-radius: 3px;\r\n    font-size: 11px;\r\n    font-weight: bold;\r\n    color: white;\n}\n.bg-primary[data-v-3153da84] { background: #007bff;\n}\n.bg-info[data-v-3153da84] { background: #17a2b8;\n}\n.bg-success[data-v-3153da84] { background: #28a745;\n}\n.bg-danger[data-v-3153da84] { background: #dc3545;\n}\n.bg-warning[data-v-3153da84] { background: #ffc107; color: #212529;\n}\n.bg-secondary[data-v-3153da84] { background: #6c757d;\n}\r\n\r\n/* Botones simples */\n.btn[data-v-3153da84] {\r\n    padding: 6px 12px;\r\n    border: none;\r\n    border-radius: 4px;\r\n    cursor: pointer;\r\n    font-size: 13px;\r\n    margin-right: 3px;\n}\n.btn-primary[data-v-3153da84] { background: #007bff; color: white;\n}\n.btn-info[data-v-3153da84] { background: #17a2b8; color: white;\n}\n.btn-danger[data-v-3153da84] { background: #dc3545; color: white;\n}\n.btn-outline-primary[data-v-3153da84] { \r\n    background: transparent; \r\n    color: #007bff; \r\n    border: 1px solid #007bff;\n}\n.btn[data-v-3153da84]:hover {\r\n    opacity: 0.9;\n}\r\n\r\n/* Mobile cards */\n.mobile-cards .mobile-card[data-v-3153da84] {\r\n    background: white;\r\n    border: 1px solid #ddd;\r\n    border-radius: 8px;\r\n    margin-bottom: 15px;\r\n    overflow: hidden;\n}\n.mobile-card .card-header[data-v-3153da84] {\r\n    background: #007bff !important;\r\n    color: white;\r\n    padding: 15px;\n}\n.mobile-card .card-body[data-v-3153da84] {\r\n    padding: 15px;\n}\n.info-card[data-v-3153da84] {\r\n    background: #f8f9fa;\r\n    border: 1px solid #e9ecef;\r\n    border-radius: 4px;\r\n    padding: 10px;\r\n    margin-bottom: 10px;\n}\r\n\r\n/* Sin resultados */\n.no-results[data-v-3153da84] {\r\n    text-align: center;\r\n    padding: 40px;\r\n    color: #666;\n}\n.no-results i[data-v-3153da84] {\r\n    font-size: 48px;\r\n    margin-bottom: 15px;\r\n    color: #ccc;\n}\r\n\r\n/* Modal simple */\n.modal-content-professional[data-v-3153da84] {\r\n    border-radius: 8px;\n}\n.modal-header-professional[data-v-3153da84] {\r\n    background: #007bff;\r\n    color: white;\r\n    padding: 15px;\n}\n.modal-body-professional[data-v-3153da84] {\r\n    padding: 20px;\n}\r\n\r\n/* Responsive */\n@media (max-width: 768px) {\n.search-section[data-v-3153da84] {\r\n        flex-direction: column;\r\n        align-items: stretch;\n}\n.search-field[data-v-3153da84] {\r\n        min-width: auto;\n}\n.gestion-recibos-wrapper[data-v-3153da84] {\r\n        padding: 10px;\n}\n.professional-header h2[data-v-3153da84] {\r\n        font-size: 20px;\n}\n.professional-table th[data-v-3153da84],\r\n    .professional-table td[data-v-3153da84] {\r\n        padding: 8px 4px;\r\n        font-size: 12px;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_style_index_0_id_3153da84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_style_index_0_id_3153da84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_style_index_0_id_3153da84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=template&id=3153da84&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=template&id=3153da84&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "gestion-recibos-wrapper"
  }, [_c("div", {
    staticClass: "abonos-container"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "search-section"
  }, [_c("div", {
    staticClass: "search-field"
  }, [_vm._m(1), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.filtros.num_recibo,
      expression: "filtros.num_recibo"
    }],
    staticClass: "form-control professional-input",
    attrs: {
      type: "text",
      placeholder: "Ej: 13442"
    },
    domProps: {
      value: _vm.filtros.num_recibo
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
        return _vm.buscarRecibos.apply(null, arguments);
      },
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.filtros, "num_recibo", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "search-field"
  }, [_vm._m(2), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.filtros.tipo_cliente,
      expression: "filtros.tipo_cliente"
    }],
    staticClass: "form-control professional-select",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.filtros, "tipo_cliente", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      value: ""
    }
  }, [_vm._v("Seleccionar tipo...")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "2"
    }
  }, [_vm._v("Cliente directo")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "1"
    }
  }, [_vm._v("Cliente indirecto")])])]), _vm._v(" "), _c("div", [_c("button", {
    staticClass: "search-button",
    attrs: {
      disabled: _vm.loading || !_vm.filtros.num_recibo.trim()
    },
    on: {
      click: _vm.buscarRecibos
    }
  }, [_vm.loading ? _c("i", {
    staticClass: "fas fa-spinner fa-spin"
  }) : _c("i", {
    staticClass: "fas fa-search"
  }), _vm._v("\n                        " + _vm._s(_vm.loading ? "Buscando..." : "Buscar Recibos") + "\n                    ")])])]), _vm._v(" "), !_vm.filtros.num_recibo.trim() ? _c("div", {
    staticClass: "professional-alert"
  }, [_vm._m(3)]) : _vm._e()]), _vm._v(" "), _vm.loading ? _c("div", {
    staticClass: "loading-section"
  }, [_vm._m(4)]) : _vm._e(), _vm._v(" "), _vm.recibos.length > 0 ? _c("div", {
    staticClass: "results-section"
  }, [_c("div", {
    staticClass: "d-flex flex-column flex-lg-row justify-content-between align-items-start mb-4"
  }, [_c("div", {
    staticClass: "mb-3 mb-lg-0"
  }, [_vm._m(5), _vm._v(" "), _c("div", {
    staticClass: "d-flex align-items-center mb-2"
  }, [_c("span", {
    staticClass: "badge bg-primary mr-2"
  }, [_vm._v(_vm._s(_vm.recibos.length) + " registro" + _vm._s(_vm.recibos.length > 1 ? "s" : ""))]), _vm._v(" "), _c("span", {
    staticClass: "badge",
    "class": _vm.recibos[0].tipo_cliente === "1" ? "bg-info" : "bg-success"
  }, [_c("i", {
    staticClass: "mr-1",
    "class": _vm.recibos[0].tipo_cliente === "1" ? "fas fa-store" : "fas fa-user"
  }), _vm._v("\n                            " + _vm._s(_vm.recibos[0].tipo_cliente === "1" ? "Cliente Indirecto" : "Cliente Directo") + "\n                        ")]), _vm._v(" "), _vm.recibos[0].estado_id == 3 ? _c("span", {
    staticClass: "badge bg-danger ml-2"
  }, [_c("i", {
    staticClass: "fas fa-ban mr-1"
  }), _vm._v("\n                            ANULADO\n                        ")]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "mb-2"
  }, [_c("span", {
    staticClass: "text-muted"
  }, [_c("i", {
    staticClass: "fas fa-building mr-1"
  }), _vm._v("\n                            " + _vm._s(_vm.recibos[0].razon_social || _vm.recibos[0].nombre_cliente) + "\n                        ")]), _vm._v(" "), _c("span", {
    staticClass: "text-muted mx-2"
  }, [_vm._v("•")]), _vm._v(" "), _c("span", {
    staticClass: "text-muted"
  }, [_c("i", {
    staticClass: "fas fa-id-card mr-1"
  }), _vm._v("\n                            " + _vm._s(_vm.recibos[0].nit || _vm.recibos[0].cedula_cliente) + "\n                        ")])])]), _vm._v(" "), _c("div", {
    staticClass: "d-flex align-items-center"
  }, [_c("div", {
    staticClass: "mr-3"
  }, [_c("small", {
    staticClass: "text-muted d-block"
  }, [_vm._v("Recibo N°")]), _vm._v(" "), _c("strong", {
    staticClass: "h5"
  }, [_vm._v(_vm._s(_vm.recibos[0].num_recibo_caja || _vm.recibos[0].numero_recibo))])]), _vm._v(" "), _c("div", {
    staticClass: "mr-3"
  }, [_c("small", {
    staticClass: "text-muted d-block"
  }, [_vm._v("Total recibo:")]), _vm._v(" "), _c("strong", {
    staticClass: "h4 text-success"
  }, [_vm._v(_vm._s(_vm.formatCurrency(_vm.totalValorAbono)))])]), _vm._v(" "), _vm.recibos[0].estado_id != 3 ? _c("button", {
    staticClass: "btn btn-danger",
    attrs: {
      title: "Cancelar recibo"
    },
    on: {
      click: function click($event) {
        return _vm.cancelarRecibo(_vm.recibos[0].num_recibo_caja, _vm.recibos[0].tipo_cliente, _vm.recibos[0].factura_id, _vm.recibos[0].venta_id);
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-times mr-1"
  }), _vm._v("\n                        Cancelar Recibo\n                    ")]) : _vm._e()])]), _vm._v(" "), _c("div", [_c("div", {
    staticClass: "professional-table-wrapper d-none d-lg-block"
  }, [_c("table", {
    staticClass: "table professional-table"
  }, [_c("thead", [_c("tr", [_c("th", [_vm._v("Fecha Factura")]), _vm._v(" "), _c("th", [_vm._v("Número Factura")]), _vm._v(" "), _vm.mostrarElectronica ? _c("th", [_vm._v("Electrónica")]) : _vm._e(), _vm._v(" "), _c("th", [_vm._v("Saldo")]), _vm._v(" "), _c("th", [_vm._v("Fecha Pago")]), _vm._v(" "), _c("th", [_vm._v("Valor Abono")]), _vm._v(" "), _c("th", [_vm._v("Retención")]), _vm._v(" "), _c("th", [_vm._v("Descuento")]), _vm._v(" "), _c("th", [_vm._v("Valor Nota")]), _vm._v(" "), _c("th", [_vm._v("Pendiente")]), _vm._v(" "), _c("th", [_vm._v("Acciones")])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.recibos, function (recibo) {
    return _c("tr", {
      key: recibo.id
    }, [_c("td", [_vm._v(_vm._s(_vm.formatDate(recibo.fecha_factura)))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(recibo.numero_factura))]), _vm._v(" "), _vm.mostrarElectronica ? _c("td", [recibo.electronica !== 0 ? _c("span", {
      staticClass: "badge badge-success"
    }, [_vm._v(_vm._s(recibo.electronica))]) : _c("span", {
      staticClass: "badge badge-secondary"
    }, [_vm._v("No")])]) : _vm._e(), _vm._v(" "), _c("td", {
      staticClass: "text-right"
    }, [_vm._v(_vm._s(_vm.formatCurrency(recibo.saldo)))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(_vm.formatDate(recibo.fecha_pago)))]), _vm._v(" "), _c("td", {
      staticClass: "text-right"
    }, [_vm._v(_vm._s(_vm.formatCurrency(recibo.valor_abono)))]), _vm._v(" "), _c("td", {
      staticClass: "text-right"
    }, [_vm._v(_vm._s(_vm.formatCurrency(recibo.retencion)))]), _vm._v(" "), _c("td", {
      staticClass: "text-right"
    }, [_vm._v(_vm._s(_vm.formatCurrency(recibo.descuento)))]), _vm._v(" "), _c("td", {
      staticClass: "text-right"
    }, [_vm._v(_vm._s(_vm.formatCurrency(recibo.valor_nota)))]), _vm._v(" "), _c("td", {
      staticClass: "text-right"
    }, [_vm._v(_vm._s(_vm.formatCurrency(recibo.pendiente)))]), _vm._v(" "), _c("td", [_c("div", {
      staticClass: "btn-group",
      attrs: {
        role: "group"
      }
    }, [_c("button", {
      staticClass: "btn btn-sm btn-info",
      attrs: {
        title: "Ver detalle"
      },
      on: {
        click: function click($event) {
          return _vm.verDetalle(recibo);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-eye"
    })]), _vm._v(" "), recibo.tipo_cliente === "1" ? _c("button", {
      staticClass: "btn btn-sm btn-primary",
      attrs: {
        title: "Imprimir recibo"
      },
      on: {
        click: function click($event) {
          return _vm.imprimirRecibo(recibo.num_recibo_caja);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-print"
    })]) : _vm._e()])])]);
  }), 0)])]), _vm._v(" "), _c("div", {
    staticClass: "d-lg-none mobile-cards"
  }, _vm._l(_vm.recibos, function (recibo) {
    return _c("div", {
      key: recibo.id,
      staticClass: "mobile-card mb-3"
    }, [_c("div", {
      staticClass: "card shadow-sm border-0"
    }, [_c("div", {
      staticClass: "card-header bg-gradient-primary text-white border-0 rounded-top"
    }, [_c("div", {
      staticClass: "d-flex justify-content-between align-items-center"
    }, [_c("div", {
      staticClass: "d-flex align-items-center"
    }, [_c("i", {
      staticClass: "fas fa-receipt fa-lg me-2"
    }), _vm._v(" "), _c("div", [_c("h6", {
      staticClass: "mb-0 fw-bold"
    }, [_vm._v("Recibo #" + _vm._s(recibo.num_recibo_caja || recibo.numero_recibo))]), _vm._v(" "), _c("small", {
      staticClass: "text-white-50"
    }, [_vm._v(_vm._s(_vm.formatDate(recibo.fecha_recibo || recibo.fecha)))])])]), _vm._v(" "), _c("div", [recibo.estado_id == 3 || recibo.anulado ? _c("span", {
      staticClass: "badge bg-danger shadow-sm"
    }, [_c("i", {
      staticClass: "fas fa-times-circle me-1"
    }), _vm._v("Anulado\n                                        ")]) : _c("span", {
      staticClass: "badge bg-success shadow-sm"
    }, [_c("i", {
      staticClass: "fas fa-check-circle me-1"
    }), _vm._v("Activo\n                                        ")])])])]), _vm._v(" "), _c("div", {
      staticClass: "card-body p-3"
    }, [_c("div", {
      staticClass: "mb-3"
    }, [_vm._m(6, true), _vm._v(" "), _c("h6", {
      staticClass: "text-dark fw-bold mb-0"
    }, [_vm._v(_vm._s(recibo.nombre_cliente || recibo.cliente))]), _vm._v(" "), _c("small", {
      staticClass: "text-muted"
    }, [_vm._v(_vm._s(recibo.cedula_cliente || recibo.nit_cliente || "N/A"))])]), _vm._v(" "), _c("div", {
      staticClass: "row g-2 mb-3"
    }, [_c("div", {
      staticClass: "col-6"
    }, [_c("div", {
      staticClass: "info-card bg-success bg-opacity-10 p-2 rounded"
    }, [_c("i", {
      staticClass: "fas fa-dollar-sign text-success me-1"
    }), _vm._v(" "), _c("small", {
      staticClass: "text-muted d-block"
    }, [_vm._v("Valor Abono")]), _vm._v(" "), _c("strong", {
      staticClass: "text-success fw-bold"
    }, [_vm._v(_vm._s(_vm.formatCurrency(recibo.valor_abono || recibo.valor)))])])]), _vm._v(" "), recibo.pendiente ? _c("div", {
      staticClass: "col-6"
    }, [_c("div", {
      staticClass: "info-card bg-warning bg-opacity-10 p-2 rounded"
    }, [_c("i", {
      staticClass: "fas fa-exclamation-triangle text-warning me-1"
    }), _vm._v(" "), _c("small", {
      staticClass: "text-muted d-block"
    }, [_vm._v("Pendiente")]), _vm._v(" "), _c("strong", {
      staticClass: "text-warning fw-bold"
    }, [_vm._v(_vm._s(_vm.formatCurrency(recibo.pendiente)))])])]) : _vm._e()]), _vm._v(" "), recibo.retencion > 0 || recibo.descuento > 0 || recibo.valor_nota > 0 ? _c("div", {
      staticClass: "row g-2 mb-3"
    }, [_c("div", {
      staticClass: "col-12"
    }, [_c("div", {
      staticClass: "additional-info bg-light p-2 rounded"
    }, [_vm._m(7, true), _vm._v(" "), _c("div", {
      staticClass: "d-flex justify-content-between flex-wrap"
    }, [recibo.retencion > 0 ? _c("span", {
      staticClass: "badge bg-secondary me-1 mb-1"
    }, [_vm._v("\n                                                    Ret: " + _vm._s(_vm.formatCurrency(recibo.retencion)) + "\n                                                ")]) : _vm._e(), _vm._v(" "), recibo.descuento > 0 ? _c("span", {
      staticClass: "badge bg-info me-1 mb-1"
    }, [_vm._v("\n                                                    Desc: " + _vm._s(_vm.formatCurrency(recibo.descuento)) + "\n                                                ")]) : _vm._e(), _vm._v(" "), recibo.valor_nota > 0 ? _c("span", {
      staticClass: "badge bg-warning me-1 mb-1"
    }, [_vm._v("\n                                                    Nota: " + _vm._s(_vm.formatCurrency(recibo.valor_nota)) + "\n                                                ")]) : _vm._e()])])])]) : _vm._e(), _vm._v(" "), recibo.vendedor ? _c("div", {
      staticClass: "mb-3"
    }, [_c("div", {
      staticClass: "d-flex align-items-center"
    }, [_c("i", {
      staticClass: "fas fa-user-tie text-info me-2"
    }), _vm._v(" "), _c("small", {
      staticClass: "text-muted me-2"
    }, [_vm._v("Vendedor:")]), _vm._v(" "), _c("strong", {
      staticClass: "text-dark"
    }, [_vm._v(_vm._s(recibo.vendedor))])])]) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "d-grid gap-2"
    }, [_c("div", {
      staticClass: "btn-group",
      attrs: {
        role: "group"
      }
    }, [_c("button", {
      staticClass: "btn btn-primary",
      attrs: {
        title: "Ver detalle completo"
      },
      on: {
        click: function click($event) {
          return _vm.verDetalle(recibo);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-eye me-2"
    }), _vm._v("Ver Detalle\n                                        ")]), _vm._v(" "), recibo.tipo_cliente === "1" || !recibo.tipo_cliente ? _c("button", {
      staticClass: "btn btn-outline-primary",
      attrs: {
        title: "Descargar recibo en PDF"
      },
      on: {
        click: function click($event) {
          return _vm.imprimirRecibo(recibo.num_recibo_caja || recibo.numero_recibo);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-download me-2"
    }), _vm._v("PDF\n                                        ")]) : _vm._e()])])])])]);
  }), 0)])]) : _vm._e(), _vm._v(" "), !_vm.loading && _vm.recibos.length === 0 && _vm.busquedaRealizada ? _c("div", {
    staticClass: "results-section"
  }, [_vm._m(8)]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "modal fade",
    attrs: {
      id: "modalDetalleRecibo",
      tabindex: "-1",
      role: "dialog"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg",
    attrs: {
      role: "document"
    }
  }, [_c("div", {
    staticClass: "modal-content modal-content-professional"
  }, [_vm._m(9), _vm._v(" "), _vm.reciboSeleccionado ? _c("div", {
    staticClass: "modal-body modal-body-professional"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_vm._m(10), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Número:")]), _vm._v(" " + _vm._s(_vm.reciboSeleccionado.num_recibo_caja))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Fecha Pago:")]), _vm._v(" " + _vm._s(_vm.formatDate(_vm.reciboSeleccionado.fecha_pago)))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Tipo Cliente:")]), _vm._v(" " + _vm._s(_vm.reciboSeleccionado.tipo_cliente === "1" ? "Indirecto" : "Directo"))])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-6"
  }, [_vm._m(11), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Razón Social:")]), _vm._v(" " + _vm._s(_vm.reciboSeleccionado.razon_social))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("NIT:")]), _vm._v(" " + _vm._s(_vm.reciboSeleccionado.nit))])])]), _vm._v(" "), _c("hr"), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_vm._m(12), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Número:")]), _vm._v(" " + _vm._s(_vm.reciboSeleccionado.numero_factura))]), _vm._v(" "), _vm.reciboSeleccionado && _vm.reciboSeleccionado.tipo_cliente === "1" ? _c("p", [_c("strong", [_vm._v("Electrónica:")]), _vm._v(" "), _vm.reciboSeleccionado.electronica === 1 || _vm.reciboSeleccionado.electronica === "1" ? _c("span", {
    staticClass: "badge badge-success"
  }, [_vm._v("Sí")]) : _c("span", {
    staticClass: "badge badge-secondary"
  }, [_vm._v("No")])]) : _vm._e(), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Fecha Factura:")]), _vm._v(" " + _vm._s(_vm.formatDate(_vm.reciboSeleccionado.fecha_factura)))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Total Factura:")]), _vm._v(" " + _vm._s(_vm.formatCurrency(_vm.reciboSeleccionado.total_factura)))])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-6"
  }, [_vm._m(13), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Valor Abono:")]), _vm._v(" " + _vm._s(_vm.formatCurrency(_vm.reciboSeleccionado.valor_abono)))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Retención:")]), _vm._v(" " + _vm._s(_vm.formatCurrency(_vm.reciboSeleccionado.retencion)))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Descuento:")]), _vm._v(" " + _vm._s(_vm.formatCurrency(_vm.reciboSeleccionado.descuento)))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Valor Nota:")]), _vm._v(" " + _vm._s(_vm.formatCurrency(_vm.reciboSeleccionado.valor_nota)))]), _vm._v(" "), _c("p", [_c("strong", [_vm._v("Saldo Pendiente:")]), _vm._v(" " + _vm._s(_vm.formatCurrency(_vm.reciboSeleccionado.pendiente)))])])])]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "btn btn-secondary",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("Cerrar")]), _vm._v(" "), _vm.reciboSeleccionado && _vm.reciboSeleccionado.tipo_cliente === "1" ? _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        return _vm.imprimirRecibo(_vm.reciboSeleccionado.num_recibo_caja);
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-print"
  }), _vm._v(" Imprimir\n                    ")]) : _vm._e()])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "professional-header"
  }, [_c("h2", [_c("i", {
    staticClass: "fas fa-receipt"
  }), _vm._v("\n                Gestión de Recibos de Caja\n            ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("label", {
    staticClass: "form-label"
  }, [_c("i", {
    staticClass: "fas fa-receipt mr-1"
  }), _vm._v("\n                        Número de Recibo\n                    ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("label", {
    staticClass: "form-label"
  }, [_c("i", {
    staticClass: "fas fa-users mr-1"
  }), _vm._v("\n                        Tipo de Cliente\n                    ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "alert-content"
  }, [_c("i", {
    staticClass: "fas fa-info-circle custom-icon"
  }), _vm._v(" "), _c("div", [_c("h6", [_vm._v("Instrucciones de Búsqueda")]), _vm._v(" "), _c("p", [_vm._v("Para buscar recibos, ingrese el número de recibo y seleccione el tipo de cliente correspondiente.")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "loading-content"
  }, [_c("div", {
    staticClass: "spinner-professional"
  }, [_c("i", {
    staticClass: "fas fa-spinner fa-spin fa-3x text-primary"
  })]), _vm._v(" "), _c("p", {
    staticClass: "loading-text"
  }, [_vm._v("Buscando recibos...")]), _vm._v(" "), _c("div", {
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h4", {
    staticClass: "mb-1"
  }, [_c("i", {
    staticClass: "fas fa-receipt mr-2"
  }), _vm._v("\n                        Recibos de Caja Encontrados\n                    ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "d-flex align-items-center mb-2"
  }, [_c("i", {
    staticClass: "fas fa-user text-muted me-2"
  }), _vm._v(" "), _c("small", {
    staticClass: "text-muted text-uppercase fw-bold"
  }, [_vm._v("Cliente")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("small", {
    staticClass: "text-muted fw-bold d-block mb-1"
  }, [_c("i", {
    staticClass: "fas fa-info-circle me-1"
  }), _vm._v("Otros valores:\n                                            ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "no-results"
  }, [_c("i", {
    staticClass: "fas fa-search fa-3x mb-3"
  }), _vm._v(" "), _c("h5", [_vm._v("No se encontraron recibos")]), _vm._v(" "), _c("p", [_vm._v("Intenta ajustar los filtros de búsqueda")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header modal-header-professional"
  }, [_c("h4", [_c("i", {
    staticClass: "fas fa-receipt mr-2"
  }), _vm._v("\n                        Detalle del Recibo de Caja\n                    ")]), _vm._v(" "), _c("button", {
    staticClass: "close text-white",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    }
  }, [_c("span", [_vm._v("×")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h6", [_c("strong", [_vm._v("Información del Recibo")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h6", [_c("strong", [_vm._v("Información del Cliente")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h6", [_c("strong", [_vm._v("Información de la Factura")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h6", [_c("strong", [_vm._v("Detalle del Pago")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/GestionRecibosCaja.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/GestionRecibosCaja.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GestionRecibosCaja_vue_vue_type_template_id_3153da84_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GestionRecibosCaja.vue?vue&type=template&id=3153da84&scoped=true */ "./resources/js/components/GestionRecibosCaja.vue?vue&type=template&id=3153da84&scoped=true");
/* harmony import */ var _GestionRecibosCaja_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GestionRecibosCaja.vue?vue&type=script&lang=js */ "./resources/js/components/GestionRecibosCaja.vue?vue&type=script&lang=js");
/* harmony import */ var _GestionRecibosCaja_vue_vue_type_style_index_0_id_3153da84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css */ "./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GestionRecibosCaja_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _GestionRecibosCaja_vue_vue_type_template_id_3153da84_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _GestionRecibosCaja_vue_vue_type_template_id_3153da84_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "3153da84",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/GestionRecibosCaja.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/GestionRecibosCaja.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/components/GestionRecibosCaja.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GestionRecibosCaja.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_style_index_0_id_3153da84_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=style&index=0&id=3153da84&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/GestionRecibosCaja.vue?vue&type=template&id=3153da84&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/GestionRecibosCaja.vue?vue&type=template&id=3153da84&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_template_id_3153da84_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_template_id_3153da84_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_GestionRecibosCaja_vue_vue_type_template_id_3153da84_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GestionRecibosCaja.vue?vue&type=template&id=3153da84&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/GestionRecibosCaja.vue?vue&type=template&id=3153da84&scoped=true");


/***/ })

}]);