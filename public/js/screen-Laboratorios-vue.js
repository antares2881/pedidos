"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-Laboratorios-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    laboratorios: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      loader: true,
      saveLoader: false,
      // Loader para guardar/actualizar
      search: '',
      dialog: false,
      editedIndex: -1,
      logoPreview: null,
      errors: [],
      validationErrors: {
        Laboratorio: [],
        prefijo: []
      },
      // Paginación
      currentPage: 1,
      itemsPerPage: 15,
      itemsPerPageOptions: [10, 15, 25, 50],
      laboratorio: {
        id: null,
        Laboratorio: '',
        prefijo: '',
        logo: null
      },
      defaultLaboratorio: {
        id: null,
        Laboratorio: '',
        prefijo: '',
        logo: null
      }
    };
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex >= 0 ? 'Editar Laboratorio' : 'Nuevo Laboratorio';
    },
    filteredLaboratorios: function filteredLaboratorios() {
      var _this = this;
      var filtered = this.laboratorios || [];

      // Aplicar filtro de búsqueda
      if (this.search && this.search.trim()) {
        filtered = filtered.filter(function (laboratorio) {
          if (!laboratorio) return false;
          var nombre = laboratorio.Laboratorio || '';
          var prefijo = laboratorio.prefijo || '';
          var searchTerm = _this.search.toLowerCase();
          return nombre.toLowerCase().includes(searchTerm) || prefijo.toLowerCase().includes(searchTerm);
        });
      }
      return filtered;
    },
    paginatedLaboratorios: function paginatedLaboratorios() {
      var filtered = this.filteredLaboratorios || [];
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    totalPages: function totalPages() {
      var filtered = this.filteredLaboratorios || [];
      return Math.ceil(filtered.length / this.itemsPerPage);
    },
    paginationInfo: function paginationInfo() {
      var filtered = this.filteredLaboratorios || [];
      var start = filtered.length > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
      var end = Math.min(this.currentPage * this.itemsPerPage, filtered.length);
      return {
        start: start,
        end: end,
        total: filtered.length
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
    // Simular carga de datos - reemplazar por llamada real a la API
    this.getLaboratorios();
  },
  methods: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
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
    getLaboratorios: function getLaboratorios() {
      var _this2 = this;
      this.loader = true;
      axios.get('/laboratorios', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      }).then(function (res) {
        // Asignar los datos del backend al componente padre o manejar localmente
        // Como el componente recibe laboratorios como prop, emitir evento al padre
        _this2.$emit('laboratorios-loaded', res.data);
        _this2.loader = false;
      })["catch"](function (err) {
        console.log('Error al cargar laboratorios:', err);
        _this2.showError('Error al cargar los laboratorios');
        _this2.loader = false;
      });
    },
    openModal: function openModal() {
      this.resetForm();
      this.dialog = true;
    },
    closeModal: function closeModal() {
      this.dialog = false;
      this.resetForm();
    },
    hasError: function hasError(field) {
      return !!(this.validationErrors && this.validationErrors[field] && this.validationErrors[field].length);
    },
    firstError: function firstError(field) {
      return this.hasError(field) ? this.validationErrors[field][0] : null;
    },
    clearError: function clearError(field) {
      if (this.validationErrors && this.validationErrors[field]) {
        this.$delete(this.validationErrors, field);
      }
    },
    resetForm: function resetForm() {
      this.laboratorio = Object.assign({}, this.defaultLaboratorio);
      this.editedIndex = -1;
      this.logoPreview = null;
      this.errors = [];
      this.saveLoader = false; // Resetear loader

      // Limpiar completamente todos los errores de validación
      this.validationErrors = {
        Laboratorio: [],
        prefijo: []
      };

      // Limpiar errores generales
      this.errors = [];
    },
    editLaboratorio: function editLaboratorio(item) {
      if (!item) return;

      // Limpiar errores antes de abrir el modal para editar
      this.errors = [];
      this.saveLoader = false;
      this.validationErrors = {
        Laboratorio: [],
        prefijo: []
      };
      this.editedIndex = this.laboratorios.indexOf(item);
      this.laboratorio = Object.assign({}, item);
      this.logoPreview = item.logo || null;
      this.dialog = true;
    },
    handlePrefijoInput: function handlePrefijoInput() {
      // Convertir a mayúsculas y limitar a 3 caracteres
      if (this.laboratorio.prefijo) {
        var value = this.laboratorio.prefijo.toUpperCase().replace(/[^A-Z]/g, '');
        this.laboratorio.prefijo = value.substring(0, 3);
      }
      this.clearError('prefijo');
    },
    handleFileUpload: function handleFileUpload(event) {
      var _this3 = this;
      var file = event.target.files[0];
      if (file) {
        // Validar tamaño (2MB máx)
        if (file.size > 2 * 1024 * 1024) {
          this.showError('El archivo no puede ser mayor a 2MB');
          return;
        }

        // Validar tipo
        if (!file.type.startsWith('image/')) {
          this.showError('Solo se permiten archivos de imagen');
          return;
        }

        // Crear preview
        var reader = new FileReader();
        reader.onload = function (e) {
          _this3.logoPreview = e.target.result;
          _this3.laboratorio.logo = file;
        };
        reader.readAsDataURL(file);
      }
    },
    validateForm: function validateForm() {
      this.validationErrors = {
        Laboratorio: [],
        prefijo: []
      };
      var isValid = true;

      // Validar nombre del laboratorio
      var nombreLab = this.laboratorio.Laboratorio || '';
      if (!nombreLab || nombreLab.trim() === '') {
        this.validationErrors.Laboratorio.push('El nombre del laboratorio es requerido');
        isValid = false;
      }

      // Validar prefijo
      var prefijo = this.laboratorio.prefijo || '';
      if (!prefijo || prefijo.length !== 3) {
        this.validationErrors.prefijo.push('El prefijo debe tener exactamente 3 letras');
        isValid = false;
      }
      return isValid;
    }
  }, "clearError", function clearError(field) {
    if (this.validationErrors && this.validationErrors[field]) {
      this.validationErrors[field] = [];
    }
  }), "showError", function showError(message) {
    this.errors = [message];
  }), "showSuccessMessage", function showSuccessMessage(message) {
    // Usar SweetAlert2 si está disponible
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: message,
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      // Fallback simple
      alert(message);
    }
  }), "saveLaboratorio", function saveLaboratorio() {
    var _this4 = this;
    if (!this.validateForm()) {
      return;
    }
    this.saveLoader = true; // Activar loader

    // Asegurar que el prefijo esté en mayúsculas
    var prefijo = this.laboratorio.prefijo || '';
    this.laboratorio.prefijo = prefijo.toUpperCase();

    // Crear FormData para enviar archivos
    var formData = new FormData();
    formData.append('Laboratorio', this.laboratorio.Laboratorio);
    formData.append('prefijo', this.laboratorio.prefijo);

    // Agregar logo si existe
    if (this.laboratorio.logo && this.laboratorio.logo instanceof File) {
      formData.append('logo', this.laboratorio.logo);
    }

    // Llamada real a la API
    axios.post('/laboratorios', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    }).then(function (res) {
      _this4.saveLoader = false; // Desactivar loader
      if (res.data.id) {
        // Mostrar mensaje de éxito
        _this4.showSuccessMessage('Laboratorio creado exitosamente');
        // Recargar la página para mostrar los cambios
        setTimeout(function () {
          location.reload();
        }, 1500);
      } else {
        _this4.validationErrors = res.data.errors || res.data || {};
      }
    })["catch"](function (err) {
      _this4.saveLoader = false; // Desactivar loader
      // Captura validación 422 de Laravel
      if (err.response && err.response.status === 422) {
        _this4.validationErrors = err.response.data.errors || {};
      } else {
        console.log(err);
        _this4.showError('Error al guardar el laboratorio');
      }
    });
  }), "updateLaboratorio", function updateLaboratorio() {
    var _this5 = this;
    if (!this.validateForm()) {
      return;
    }
    this.saveLoader = true; // Activar loader

    // Asegurar que el prefijo esté en mayúsculas
    var prefijo = this.laboratorio.prefijo || '';
    this.laboratorio.prefijo = prefijo.toUpperCase();

    // Crear FormData para enviar archivos
    var formData = new FormData();
    formData.append('Laboratorio', this.laboratorio.Laboratorio);
    formData.append('prefijo', this.laboratorio.prefijo);
    formData.append('_method', 'PUT'); // Laravel method spoofing

    // Agregar logo si existe y es un archivo nuevo
    if (this.laboratorio.logo && this.laboratorio.logo instanceof File) {
      formData.append('logo', this.laboratorio.logo);
    }

    // Llamada real a la API
    axios.post("/laboratorios/".concat(this.laboratorio.id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    }).then(function (res) {
      _this5.saveLoader = false; // Desactivar loader
      if (res.data.status === 'ok') {
        // Mostrar mensaje de éxito usando SweetAlert2
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'success',
            title: 'Laboratorio actualizado',
            text: 'Los cambios se han guardado correctamente',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Aceptar'
          }).then(function (result) {
            if (result.value) {
              location.reload();
            }
          });
        } else {
          // Fallback sin SweetAlert
          _this5.showSuccessMessage('Laboratorio actualizado exitosamente');
          setTimeout(function () {
            location.reload();
          }, 1500);
        }
      } else {
        _this5.validationErrors = res.data.errors || res.data || {};
      }
    })["catch"](function (err) {
      _this5.saveLoader = false; // Desactivar loader
      if (err.response && err.response.status === 422) {
        _this5.validationErrors = err.response.data.errors || {};
      } else {
        console.log(err);
        _this5.showError('Error al actualizar el laboratorio');
      }
    });
  })
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Professional Container */\n.laboratorios-container[data-v-0d80d932] {\r\n    min-height: 100vh;\r\n    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\r\n    padding: 2rem;\n}\r\n\r\n/* Professional Loading */\n.loading-container[data-v-0d80d932] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-height: 400px;\r\n    padding: 40px 20px;\r\n    background: linear-gradient(135deg, #17a2b820 0%, #13849620 100%);\r\n    border-radius: 12px;\r\n    backdrop-filter: blur(10px);\r\n    border: 1px solid rgba(255, 255, 255, 0.3);\n}\n.loading-content[data-v-0d80d932] {\r\n    text-align: center;\r\n    max-width: 300px;\n}\n.professional-loader[data-v-0d80d932] {\r\n    position: relative;\r\n    display: inline-block;\r\n    margin-bottom: 30px;\n}\n.loader-spinner[data-v-0d80d932] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border: 4px solid rgba(102, 126, 234, 0.1);\r\n    border-left: 4px solid #17a2b8;\r\n    border-radius: 50%;\r\n    animation: spin-0d80d932 1s linear infinite;\r\n    position: relative;\r\n    z-index: 2;\n}\n.loader-pulse[data-v-0d80d932] {\r\n    position: absolute;\r\n    top: -10px;\r\n    left: -10px;\r\n    width: 80px;\r\n    height: 80px;\r\n    border: 2px solid rgba(102, 126, 234, 0.3);\r\n    border-radius: 50%;\r\n    animation: pulse-0d80d932 2s ease-in-out infinite;\r\n    z-index: 1;\n}\n@keyframes spin-0d80d932 {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes pulse-0d80d932 {\n0% { transform: scale(0.8); opacity: 1;\n}\n50% { transform: scale(1.2); opacity: 0.5;\n}\n100% { transform: scale(0.8); opacity: 1;\n}\n}\n.loading-title[data-v-0d80d932] {\r\n    color: #2c3e50;\r\n    font-size: 1.4rem;\r\n    font-weight: 700;\r\n    margin-bottom: 8px;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\n}\n.loading-subtitle[data-v-0d80d932] {\r\n    color: #6c757d;\r\n    font-size: 0.95rem;\r\n    font-weight: 400;\r\n    margin: 0 0 2rem 0;\r\n    line-height: 1.4;\n}\n.loading-progress[data-v-0d80d932] {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 4px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.progress-bar[data-v-0d80d932] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #17a2b8, #138496);\r\n    border-radius: 2px;\r\n    animation: progress-0d80d932 2s ease-in-out infinite;\n}\n@keyframes progress-0d80d932 {\n0% { transform: translateX(-100%);\n}\n50% { transform: translateX(0%);\n}\n100% { transform: translateX(100%);\n}\n}\r\n\r\n/* Header Section */\n.laboratorios-content[data-v-0d80d932] {\r\n    max-width: 1400px;\r\n    margin: 0 auto;\n}\n.header-section[data-v-0d80d932] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 2rem;\n}\n.page-header h2[data-v-0d80d932] {\r\n    color: #2c3e50;\r\n    font-size: 2.2rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.5rem 0;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\r\n    display: flex;\r\n    align-items: center;\n}\n.page-description[data-v-0d80d932] {\r\n    color: #64748b;\r\n    font-size: 1.1rem;\r\n    margin: 0;\r\n    font-weight: 400;\n}\n.header-actions[data-v-0d80d932] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    align-items: center;\r\n    flex-wrap: wrap;\n}\n.search-box[data-v-0d80d932] {\r\n    position: relative;\r\n    min-width: 300px;\n}\n.search-icon[data-v-0d80d932] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    color: #64748b;\r\n    z-index: 3;\r\n    pointer-events: none;\n}\n.search-input[data-v-0d80d932] {\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 1rem 0 3rem !important;\r\n    border: 2px solid #e2e8f0;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: rgba(255, 255, 255, 0.9);\r\n    backdrop-filter: blur(10px);\r\n    transition: all 0.3s ease;\n}\n.search-input[data-v-0d80d932]::-moz-placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-0d80d932]::placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-0d80d932]:focus {\r\n    outline: none;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\r\n    background: white;\n}\n.new-lab-btn[data-v-0d80d932] {\r\n    height: 50px;\r\n    padding: 0 2rem;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);\n}\n.new-lab-btn[data-v-0d80d932]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);\n}\r\n\r\n/* Mobile Cards - Hidden by default */\n.mobile-cards-container[data-v-0d80d932] {\r\n    display: none;\n}\n.desktop-table[data-v-0d80d932] {\r\n    display: block;\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-0d80d932] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-0d80d932] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-0d80d932] {\r\n    background: transparent;\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #e5e7eb;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.professional-table thead th i[data-v-0d80d932] {\r\n    margin-right: 0.5rem;\r\n    color: #17a2b8;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-0d80d932] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\r\n    background: rgba(255, 255, 255, 0.8);\r\n    backdrop-filter: blur(10px);\n}\n.professional-table tbody tr[data-v-0d80d932]:hover {\r\n    background: rgba(102, 126, 234, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-0d80d932] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.logo-cell[data-v-0d80d932] {\r\n    font-weight: 600;\r\n    color: #1e293b;\r\n    width: 80px;\n}\n.lab-logo[data-v-0d80d932] {\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 10px;\r\n    -o-object-fit: contain;\r\n       object-fit: contain;\r\n    background: white;\r\n    padding: 5px;\r\n    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);\r\n    border: 2px solid #e2e8f0;\n}\n.lab-cell[data-v-0d80d932] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.lab-name[data-v-0d80d932] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\n}\n.lab-icon[data-v-0d80d932] {\r\n    color: #17a2b8;\r\n    font-size: 1rem;\r\n    width: 20px;\r\n    text-align: center;\n}\n.name-text[data-v-0d80d932] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 1rem;\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\n}\n.prefix-cell[data-v-0d80d932] {\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.prefix-badge[data-v-0d80d932] {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    padding: 0.5rem 1rem;\r\n    border-radius: 20px;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\r\n    text-transform: uppercase;\r\n    letter-spacing: 1px;\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);\n}\r\n\r\n/* Action Buttons */\n.action-buttons[data-v-0d80d932] {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    justify-content: center;\n}\n.action-btn[data-v-0d80d932] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    border: none;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 1rem;\r\n    text-decoration: none;\n}\n.btn-edit[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-edit[data-v-0d80d932]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);\n}\r\n\r\n/* Mobile Cards Styles */\n.lab-card[data-v-0d80d932] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    margin-bottom: 1rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    transition: all 0.3s ease;\n}\n.lab-card[data-v-0d80d932]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.card-header[data-v-0d80d932] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 1.5rem;\r\n    padding-bottom: 1rem;\r\n    border-bottom: 2px solid #f1f5f9;\n}\n.lab-info[data-v-0d80d932] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    flex: 1;\n}\n.lab-logo-mobile[data-v-0d80d932] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border-radius: 12px;\r\n    overflow: hidden;\r\n    border: 2px solid #e2e8f0;\r\n    background: white;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.lab-logo-mobile img[data-v-0d80d932] {\r\n    width: 100%;\r\n    height: 100%;\r\n    -o-object-fit: contain;\r\n       object-fit: contain;\r\n    padding: 5px;\n}\n.lab-details[data-v-0d80d932] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.5rem;\r\n    flex: 1;\n}\n.lab-name-mobile[data-v-0d80d932] {\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-size: 1.1rem;\r\n    line-height: 1.2;\n}\n.prefix-badge-mobile[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\r\n    color: white;\r\n    padding: 0.25rem 0.75rem;\r\n    border-radius: 12px;\r\n    font-weight: 700;\r\n    font-size: 0.8rem;\r\n    text-transform: uppercase;\r\n    letter-spacing: 1px;\r\n    display: inline-block;\r\n    width: -moz-fit-content;\r\n    width: fit-content;\n}\n.card-body[data-v-0d80d932] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\n}\r\n\r\n/* Actions Section Mobile */\n.actions-section[data-v-0d80d932] {\r\n    display: flex;\r\n    gap: 1rem;\n}\n.mobile-action-btn[data-v-0d80d932] {\r\n    flex: 1;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    text-decoration: none;\r\n    border: none;\n}\n.edit-btn[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);\n}\n.edit-btn[data-v-0d80d932]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\r\n\r\n/* Professional Modal */\n.professional-modal[data-v-0d80d932] {\r\n    border-radius: 20px !important;\r\n    overflow: hidden;\r\n    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2) !important;\n}\n.modal-header[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%) !important;\r\n    color: white !important;\r\n    font-size: 1.3rem !important;\r\n    font-weight: 700 !important;\r\n    padding: 1.5rem 2rem !important;\n}\n.modal-content[data-v-0d80d932] {\r\n    padding: 2rem !important;\r\n    background: #f8fafc;\n}\n.field-label[data-v-0d80d932] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    margin-bottom: 0.5rem;\r\n    display: block;\n}\r\n\r\n/* Logo Upload Styles */\n.logo-upload-section[data-v-0d80d932] {\r\n    width: 100%;\n}\n.upload-area[data-v-0d80d932] {\r\n    width: 100%;\r\n    height: 150px;\r\n    border: 2px dashed #e2e8f0;\r\n    border-radius: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    background: rgba(255, 255, 255, 0.5);\r\n    position: relative;\r\n    overflow: hidden;\n}\n.upload-area[data-v-0d80d932]:hover {\r\n    border-color: #17a2b8;\r\n    background: rgba(102, 126, 234, 0.05);\n}\n.upload-placeholder[data-v-0d80d932] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    color: #64748b;\n}\n.upload-placeholder i[data-v-0d80d932] {\r\n    font-size: 2rem;\n}\n.logo-preview[data-v-0d80d932] {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\n}\n.preview-image[data-v-0d80d932] {\r\n    width: 100%;\r\n    height: 100%;\r\n    -o-object-fit: contain;\r\n       object-fit: contain;\r\n    border-radius: 8px;\n}\n.overlay[data-v-0d80d932] {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background: rgba(0, 0, 0, 0.7);\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    color: white;\r\n    opacity: 0;\r\n    transition: opacity 0.3s;\r\n    gap: 0.5rem;\n}\n.upload-area:hover .overlay[data-v-0d80d932] {\r\n    opacity: 1;\n}\n.file-hint[data-v-0d80d932] {\r\n    color: #64748b;\r\n    font-size: 0.8rem;\r\n    margin-top: 0.5rem;\r\n    display: block;\n}\n.error-list[data-v-0d80d932] {\r\n    background: rgba(239, 68, 68, 0.1);\r\n    border: 1px solid rgba(239, 68, 68, 0.3);\r\n    border-radius: 8px;\r\n    padding: 1rem;\n}\n.error-item[data-v-0d80d932] {\r\n    color: #dc2626;\r\n    font-size: 0.9rem;\r\n    margin-bottom: 0.5rem;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.error-item[data-v-0d80d932]:last-child {\r\n    margin-bottom: 0;\n}\n.modal-actions[data-v-0d80d932] {\r\n    padding: 1.5rem 2rem !important;\r\n    background: white;\r\n    border-top: 1px solid #e2e8f0;\n}\n.cancel-btn[data-v-0d80d932] {\r\n    color: #64748b !important;\r\n    font-weight: 600 !important;\n}\n.save-btn[data-v-0d80d932] {\r\n    font-weight: 600 !important;\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;\n}\r\n\r\n/* Pagination Styles */\n.pagination-section[data-v-0d80d932] {\r\n    background: white;\r\n    border-top: 2px solid #f1f5f9;\r\n    padding: 1.5rem 2rem;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 1rem;\n}\n.pagination-info[data-v-0d80d932] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2rem;\r\n    flex-wrap: wrap;\n}\n.items-per-page[data-v-0d80d932] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-label[data-v-0d80d932] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 0.9rem;\n}\n.items-select[data-v-0d80d932] {\r\n    padding: 0.5rem 0.75rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #374151;\r\n    background: white;\r\n    cursor: pointer;\r\n    outline: none;\r\n    transition: all 0.3s ease;\n}\n.items-select[data-v-0d80d932]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.page-info-text[data-v-0d80d932] {\r\n    font-size: 0.9rem;\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.pagination-controls[data-v-0d80d932] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-btn[data-v-0d80d932] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.75rem 1rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\n}\n.pagination-btn[data-v-0d80d932]:hover:not(:disabled) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    background: rgba(102, 126, 234, 0.05);\n}\n.pagination-btn[data-v-0d80d932]:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n    color: #9ca3af;\n}\n.page-numbers[data-v-0d80d932] {\r\n    display: flex;\r\n    gap: 0.25rem;\r\n    margin: 0 1rem;\n}\n.page-btn[data-v-0d80d932] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.page-btn[data-v-0d80d932]:hover:not(:disabled):not(.ellipsis) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    background: rgba(102, 126, 234, 0.05);\n}\n.page-btn.active[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);\n}\n.page-btn.ellipsis[data-v-0d80d932] {\r\n    border: none;\r\n    background: transparent;\r\n    cursor: default;\r\n    color: #9ca3af;\n}\n.page-btn.ellipsis[data-v-0d80d932]:hover {\r\n    background: transparent;\r\n    border: none;\n}\r\n\r\n/* Responsive Pagination */\n@media (max-width: 768px) {\n.pagination-section[data-v-0d80d932] {\r\n        padding: 1rem;\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        gap: 1rem;\n}\n.pagination-info[data-v-0d80d932] {\r\n        justify-content: center;\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        text-align: center;\n}\n.items-per-page[data-v-0d80d932] {\r\n        justify-content: center;\n}\n.pagination-controls[data-v-0d80d932] {\r\n        justify-content: center;\r\n        flex-wrap: wrap;\n}\n.page-numbers[data-v-0d80d932] {\r\n        margin: 0 0.5rem;\r\n        flex-wrap: wrap;\r\n        justify-content: center;\n}\n.pagination-btn[data-v-0d80d932] {\r\n        font-size: 0.8rem;\r\n        padding: 0.6rem 0.8rem;\n}\n.page-btn[data-v-0d80d932] {\r\n        width: 35px;\r\n        height: 35px;\r\n        font-size: 0.8rem;\n}\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 1024px) {\n.header-section[data-v-0d80d932] {\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        text-align: center;\n}\n.header-actions[data-v-0d80d932] {\r\n        justify-content: center;\n}\n.search-box[data-v-0d80d932] {\r\n        min-width: 100%;\n}\n.page-header h2[data-v-0d80d932] {\r\n        font-size: 2rem;\r\n        justify-content: center;\n}\n}\n@media (max-width: 900px) {\r\n    /* Show mobile cards, hide desktop table */\n.desktop-table[data-v-0d80d932] {\r\n        display: none;\n}\n.mobile-cards-container[data-v-0d80d932] {\r\n        display: block;\r\n        padding: 0 0.5rem;\n}\n}\n@media (max-width: 768px) {\n.laboratorios-container[data-v-0d80d932] {\r\n        padding: 1rem;\n}\n.header-section[data-v-0d80d932] {\r\n        border-radius: 16px;\r\n        padding: 1.5rem;\n}\n.professional-report-container[data-v-0d80d932] {\r\n        border-radius: 16px;\n}\n.page-header h2[data-v-0d80d932] {\r\n        font-size: 1.8rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 0.5rem;\n}\n.lab-card[data-v-0d80d932] {\r\n        margin-bottom: 1rem;\r\n        padding: 1.25rem;\r\n        border-radius: 14px;\n}\n.card-header[data-v-0d80d932] {\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        align-items: stretch;\r\n        margin-bottom: 1.25rem;\n}\n.lab-info[data-v-0d80d932] {\r\n        justify-content: center;\r\n        text-align: center;\n}\n.lab-name-mobile[data-v-0d80d932] {\r\n        font-size: 1rem;\r\n        text-align: center;\n}\n.actions-section[data-v-0d80d932] {\r\n        flex-direction: column;\r\n        gap: 0.75rem;\n}\n}\n@media (max-width: 480px) {\n.laboratorios-container[data-v-0d80d932] {\r\n        padding: 0.75rem;\n}\n.header-section[data-v-0d80d932] {\r\n        padding: 1.25rem;\n}\n.page-header h2[data-v-0d80d932] {\r\n        font-size: 1.6rem;\n}\n.lab-card[data-v-0d80d932] {\r\n        padding: 1rem;\r\n        margin-bottom: 0.875rem;\n}\n.lab-name-mobile[data-v-0d80d932] {\r\n        font-size: 0.95rem;\n}\n.pagination-controls[data-v-0d80d932] {\r\n        flex-direction: column;\r\n        gap: 1rem;\n}\n.page-numbers[data-v-0d80d932] {\r\n        margin: 0;\r\n        order: 2;\n}\n.prev-btn[data-v-0d80d932] {\r\n        order: 1;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n.next-btn[data-v-0d80d932] {\r\n        order: 3;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n}\r\n\r\n/* Bootstrap Modal Styles */\n.modal-header[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    border-bottom: none;\r\n    border-radius: 0;\n}\n.modal-title[data-v-0d80d932] {\r\n    font-weight: 700;\r\n    font-size: 1.2rem;\n}\n.modal-body[data-v-0d80d932] {\r\n    padding: 2rem;\r\n    background: #f8fafc;\n}\n.form-control[data-v-0d80d932] {\r\n    border-radius: 8px;\r\n    border: 2px solid #e2e8f0;\r\n    padding: 0.75rem 1rem;\r\n    transition: all 0.3s ease;\r\n    font-size: 0.95rem;\n}\n.form-control[data-v-0d80d932]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);\n}\n.is-invalid[data-v-0d80d932] {\r\n    border-color: #dc3545 !important;\n}\n.invalid-feedback[data-v-0d80d932] {\r\n    display: block;\r\n    color: #dc3545;\r\n    font-size: 0.875rem;\r\n    margin-top: 0.25rem;\n}\n.form-text[data-v-0d80d932] {\r\n    font-size: 0.875rem;\r\n    color: #6b7280;\r\n    margin-top: 0.25rem;\n}\r\n\r\n/* Logo Upload Styles for Bootstrap */\n.logo-upload-section .upload-area[data-v-0d80d932] {\r\n    width: 100%;\r\n    height: 120px;\r\n    border: 2px dashed #e2e8f0;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    background: rgba(255, 255, 255, 0.5);\r\n    position: relative;\r\n    overflow: hidden;\r\n    margin-top: 0.5rem;\n}\n.logo-upload-section .upload-area[data-v-0d80d932]:hover {\r\n    border-color: #17a2b8;\r\n    background: rgba(102, 126, 234, 0.05);\n}\n.logo-upload-section .upload-placeholder[data-v-0d80d932] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    color: #64748b;\r\n    text-align: center;\n}\n.logo-upload-section .upload-placeholder i[data-v-0d80d932] {\r\n    font-size: 1.5rem;\n}\n.logo-upload-section .logo-preview[data-v-0d80d932] {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\n}\n.logo-upload-section .preview-image[data-v-0d80d932] {\r\n    width: 100%;\r\n    height: 100%;\r\n    -o-object-fit: cover;\r\n       object-fit: cover;\r\n    border-radius: 6px;\n}\n.logo-upload-section .overlay[data-v-0d80d932] {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background: rgba(102, 126, 234, 0.8);\r\n    color: white;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    opacity: 0;\r\n    transition: opacity 0.3s ease;\r\n    border-radius: 6px;\n}\n.logo-upload-section .logo-preview:hover .overlay[data-v-0d80d932] {\r\n    opacity: 1;\n}\n.btn[data-v-0d80d932] {\r\n    border-radius: 8px;\r\n    font-weight: 600;\r\n    padding: 0.75rem 1.5rem;\r\n    transition: all 0.3s ease;\n}\n.btn[data-v-0d80d932]:hover {\r\n    transform: translateY(-1px);\n}\n.btn-primary[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    border: none;\n}\n.btn-primary[data-v-0d80d932]:hover {\r\n    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);\n}\n.btn-warning[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n    border: none;\n}\n.btn-warning[data-v-0d80d932]:hover {\r\n    background: linear-gradient(135deg, #e28b00 0%, #c26605 100%);\n}\n.btn-outline-secondary[data-v-0d80d932] {\r\n    border: 2px solid #6b7280;\r\n    color: #6b7280;\r\n    background: transparent;\n}\n.btn-outline-secondary[data-v-0d80d932]:hover {\r\n    background: #6b7280;\r\n    color: white;\n}\n.alert-danger[data-v-0d80d932] {\r\n    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);\r\n    border: 1px solid #f87171;\r\n    border-radius: 8px;\r\n    color: #991b1b;\n}\n.alert-danger ul[data-v-0d80d932] {\r\n    margin-bottom: 0;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_style_index_0_id_0d80d932_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_style_index_0_id_0d80d932_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_style_index_0_id_0d80d932_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=template&id=0d80d932&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=template&id=0d80d932&scoped=true ***!
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
  return _c("div", [_c("div", {
    staticClass: "laboratorios-container"
  }, [_vm.loader ? _c("div", {
    staticClass: "loading-container"
  }, [_vm._m(0)]) : _c("div", {
    staticClass: "laboratorios-content"
  }, [_c("div", {
    staticClass: "header-section"
  }, [_vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "header-actions"
  }, [_c("div", {
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
      placeholder: "Buscar laboratorios..."
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
      click: function click($event) {
        return _vm.openModal();
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-plus mr-2"
  }), _vm._v("\n                        Nuevo Laboratorio\n                    ")])])]), _vm._v(" "), _c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "desktop-table"
  }, [_c("div", {
    staticClass: "table-responsive professional-table-wrapper"
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(2), _vm._v(" "), _c("tbody", _vm._l(_vm.paginatedLaboratorios, function (item, index) {
    return _c("tr", {
      key: index,
      staticClass: "data-row"
    }, [_c("td", {
      staticClass: "text-center logo-cell"
    }, [_c("img", {
      staticClass: "lab-logo",
      attrs: {
        src: item.logo || "/images/default-lab.png",
        alt: "Logo " + (item.Laboratorio || "Laboratorio")
      },
      on: {
        error: function error($event) {
          $event.target.src = "/images/default-lab.png";
        }
      }
    })]), _vm._v(" "), _c("td", {
      staticClass: "text-left lab-cell"
    }, [_c("div", {
      staticClass: "lab-name"
    }, [_c("i", {
      staticClass: "fas fa-industry lab-icon"
    }), _vm._v(" "), _c("span", {
      staticClass: "name-text"
    }, [_vm._v(_vm._s(item.Laboratorio || "Sin nombre"))])])]), _vm._v(" "), _c("td", {
      staticClass: "text-center prefix-cell"
    }, [_c("span", {
      staticClass: "prefix-badge"
    }, [_vm._v(_vm._s(item.prefijo || "N/A"))])]), _vm._v(" "), _c("td", {
      staticClass: "text-center actions-cell"
    }, [_c("div", {
      staticClass: "action-buttons"
    }, [_c("button", {
      staticClass: "action-btn btn-edit",
      attrs: {
        title: "Editar laboratorio"
      },
      on: {
        click: function click($event) {
          return _vm.editLaboratorio(item);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-edit"
    })])])])]);
  }), 0)])])]), _vm._v(" "), _c("div", {
    staticClass: "mobile-cards-container"
  }, _vm._l(_vm.paginatedLaboratorios, function (item, index) {
    return _c("div", {
      key: index,
      staticClass: "lab-card"
    }, [_c("div", {
      staticClass: "card-header"
    }, [_c("div", {
      staticClass: "lab-info"
    }, [_c("div", {
      staticClass: "lab-logo-mobile"
    }, [_c("img", {
      attrs: {
        src: item.logo || "/images/default-lab.png",
        alt: "Logo " + (item.Laboratorio || "Laboratorio")
      },
      on: {
        error: function error($event) {
          $event.target.src = "/images/default-lab.png";
        }
      }
    })]), _vm._v(" "), _c("div", {
      staticClass: "lab-details"
    }, [_c("span", {
      staticClass: "lab-name-mobile"
    }, [_vm._v(_vm._s(item.Laboratorio || "Sin nombre"))]), _vm._v(" "), _c("span", {
      staticClass: "prefix-badge-mobile"
    }, [_vm._v(_vm._s(item.prefijo || "N/A"))])])])]), _vm._v(" "), _c("div", {
      staticClass: "card-body"
    }, [_c("div", {
      staticClass: "actions-section"
    }, [_c("button", {
      staticClass: "mobile-action-btn edit-btn",
      on: {
        click: function click($event) {
          return _vm.editLaboratorio(item);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-edit"
    }), _vm._v("\n                                    Editar Laboratorio\n                                ")])])])]);
  }), 0), _vm._v(" "), _vm.filteredLaboratorios.length > 0 ? _c("div", {
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
  }, [_c("i", {
    staticClass: "fas fa-chevron-left"
  }), _vm._v("\n                            Anterior\n                        ")]), _vm._v(" "), _c("div", {
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
  }, [_vm._v("\n                            Siguiente\n                            "), _c("i", {
    staticClass: "fas fa-chevron-right"
  })])])]) : _vm._e()]), _vm._v(" "), _c("b-modal", {
    attrs: {
      id: "modal-laboratorio",
      "no-close-on-backdrop": "",
      scrollable: "",
      centered: "",
      "hide-footer": "",
      title: _vm.formTitle,
      size: "lg"
    },
    on: {
      hidden: _vm.resetForm
    },
    model: {
      value: _vm.dialog,
      callback: function callback($$v) {
        _vm.dialog = $$v;
      },
      expression: "dialog"
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("label", {
    attrs: {
      "for": "laboratorio"
    }
  }, [_vm._v("Nombre del Laboratorio")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.laboratorio.Laboratorio,
      expression: "laboratorio.Laboratorio"
    }],
    staticClass: "form-control",
    "class": {
      "is-invalid": _vm.hasError("Laboratorio")
    },
    attrs: {
      type: "text",
      id: "laboratorio",
      placeholder: "Ingrese el nombre del laboratorio"
    },
    domProps: {
      value: _vm.laboratorio.Laboratorio
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.laboratorio, "Laboratorio", $event.target.value);
      }, function ($event) {
        return _vm.clearError("Laboratorio");
      }]
    }
  }), _vm._v(" "), _vm.hasError("Laboratorio") ? _c("div", {
    staticClass: "invalid-feedback"
  }, [_vm._v(_vm._s(_vm.firstError("Laboratorio")))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "col-6"
  }, [_c("label", {
    attrs: {
      "for": "prefijo"
    }
  }, [_vm._v("Prefijo (3 letras)")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.laboratorio.prefijo,
      expression: "laboratorio.prefijo"
    }],
    staticClass: "form-control",
    "class": {
      "is-invalid": _vm.hasError("prefijo")
    },
    attrs: {
      type: "text",
      id: "prefijo",
      maxlength: "3",
      placeholder: "Ej: LAB"
    },
    domProps: {
      value: _vm.laboratorio.prefijo
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.laboratorio, "prefijo", $event.target.value);
      }, _vm.handlePrefijoInput]
    }
  }), _vm._v(" "), _vm.hasError("prefijo") ? _c("div", {
    staticClass: "invalid-feedback"
  }, [_vm._v(_vm._s(_vm.firstError("prefijo")))]) : _vm._e(), _vm._v(" "), _c("small", {
    staticClass: "form-text text-muted"
  }, [_vm._v("Exactamente 3 letras (se convertirá a mayúsculas)")])]), _vm._v(" "), _c("div", {
    staticClass: "col-6"
  }, [_c("label", {
    attrs: {
      "for": "logo"
    }
  }, [_vm._v("Logo del Laboratorio")]), _vm._v(" "), _c("div", {
    staticClass: "logo-upload-section"
  }, [_c("div", {
    staticClass: "upload-area",
    on: {
      click: function click($event) {
        return _vm.$refs.fileInput.click();
      }
    }
  }, [!_vm.logoPreview ? _c("div", {
    staticClass: "upload-placeholder"
  }, [_c("i", {
    staticClass: "fas fa-cloud-upload-alt"
  }), _vm._v(" "), _c("span", [_vm._v("Seleccionar imagen")])]) : _c("div", {
    staticClass: "logo-preview"
  }, [_c("img", {
    staticClass: "preview-image",
    attrs: {
      src: _vm.logoPreview,
      alt: "Logo preview"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "overlay"
  }, [_c("i", {
    staticClass: "fas fa-edit"
  }), _vm._v(" "), _c("span", [_vm._v("Cambiar imagen")])])])]), _vm._v(" "), _c("input", {
    ref: "fileInput",
    staticStyle: {
      display: "none"
    },
    attrs: {
      type: "file",
      accept: "image/*"
    },
    on: {
      change: _vm.handleFileUpload
    }
  }), _vm._v(" "), _c("small", {
    staticClass: "form-text text-muted"
  }, [_vm._v("Formatos: JPG, PNG, GIF (máx. 2MB)")])])]), _vm._v(" "), _vm.errors && _vm.errors.length > 0 ? _c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "alert alert-danger",
    attrs: {
      role: "alert"
    }
  }, [_c("ul", {
    staticClass: "mb-0"
  }, _vm._l(_vm.errors, function (error, index) {
    return _c("li", {
      key: index
    }, [_vm._v("\n                                    " + _vm._s(error) + "\n                                ")]);
  }), 0)])]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "col-6"
  }, [_c("button", {
    staticClass: "btn btn-outline-secondary btn-block",
    on: {
      click: _vm.closeModal
    }
  }, [_c("i", {
    staticClass: "fas fa-times mr-2"
  }), _vm._v("Cancelar\n                        ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-6"
  }, [_vm.editedIndex >= 0 ? _c("button", {
    staticClass: "btn btn-warning btn-block",
    attrs: {
      disabled: _vm.saveLoader
    },
    on: {
      click: _vm.updateLaboratorio
    }
  }, [!_vm.saveLoader ? _c("i", {
    staticClass: "fas fa-save mr-2"
  }) : _c("i", {
    staticClass: "fas fa-spinner fa-spin mr-2"
  }), _vm._v("\n                            " + _vm._s(_vm.saveLoader ? "Guardando..." : "Guardar cambios") + "\n                        ")]) : _c("button", {
    staticClass: "btn btn-primary btn-block",
    attrs: {
      disabled: _vm.saveLoader
    },
    on: {
      click: _vm.saveLaboratorio
    }
  }, [!_vm.saveLoader ? _c("i", {
    staticClass: "fas fa-plus mr-2"
  }) : _c("i", {
    staticClass: "fas fa-spinner fa-spin mr-2"
  }), _vm._v("\n                            " + _vm._s(_vm.saveLoader ? "Creando..." : "Crear laboratorio") + "\n                        ")])])])])], 1)])]);
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
  })]), _vm._v(" "), _c("div", {
    staticClass: "loading-text"
  }, [_c("h5", {
    staticClass: "loading-title"
  }, [_vm._v("Cargando laboratorios...")]), _vm._v(" "), _c("p", {
    staticClass: "loading-subtitle"
  }, [_vm._v("Procesando información de laboratorios farmacéuticos...")]), _vm._v(" "), _c("div", {
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "page-header"
  }, [_c("h2", {
    staticClass: "page-title"
  }, [_c("i", {
    staticClass: "fas fa-flask mr-3"
  }), _vm._v("\n                        Gestión de Laboratorios\n                    ")]), _vm._v(" "), _c("p", {
    staticClass: "page-description"
  }, [_vm._v("\n                        Administra los laboratorios farmacéuticos y sus datos principales.\n                    ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fas fa-image"
  }), _vm._v("\n                                        Logo\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-left"
  }, [_c("i", {
    staticClass: "fas fa-industry"
  }), _vm._v("\n                                        Laboratorio\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fas fa-tag"
  }), _vm._v("\n                                        Prefijo\n                                    ")]), _vm._v(" "), _c("th", {
    staticClass: "text-center"
  }, [_c("i", {
    staticClass: "fas fa-cogs"
  }), _vm._v("\n                                        Acciones\n                                    ")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/Laboratorios.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/Laboratorios.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Laboratorios_vue_vue_type_template_id_0d80d932_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Laboratorios.vue?vue&type=template&id=0d80d932&scoped=true */ "./resources/js/components/Laboratorios.vue?vue&type=template&id=0d80d932&scoped=true");
/* harmony import */ var _Laboratorios_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Laboratorios.vue?vue&type=script&lang=js */ "./resources/js/components/Laboratorios.vue?vue&type=script&lang=js");
/* harmony import */ var _Laboratorios_vue_vue_type_style_index_0_id_0d80d932_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css */ "./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Laboratorios_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Laboratorios_vue_vue_type_template_id_0d80d932_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Laboratorios_vue_vue_type_template_id_0d80d932_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0d80d932",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/Laboratorios.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Laboratorios.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Laboratorios.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Laboratorios.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_style_index_0_id_0d80d932_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=style&index=0&id=0d80d932&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/Laboratorios.vue?vue&type=template&id=0d80d932&scoped=true":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/Laboratorios.vue?vue&type=template&id=0d80d932&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_template_id_0d80d932_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_template_id_0d80d932_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Laboratorios_vue_vue_type_template_id_0d80d932_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Laboratorios.vue?vue&type=template&id=0d80d932&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Laboratorios.vue?vue&type=template&id=0d80d932&scoped=true");


/***/ })

}]);