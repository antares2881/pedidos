"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["screen-Presentaciones-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      loader: true,
      search: '',
      dialog: false,
      editedIndex: -1,
      saving: false,
      validationErrors: {
        presentacion: []
      },
      // Paginación
      currentPage: 1,
      itemsPerPage: 15,
      itemsPerPageOptions: [10, 15, 25, 50],
      presentacion: {
        id: null,
        presentacion: ''
      },
      defaultPresentacion: {
        id: null,
        presentacion: ''
      },
      presentaciones: []
    };
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex >= 0 ? 'Editar Presentación' : 'Nueva Presentación';
    },
    filteredPresentaciones: function filteredPresentaciones() {
      var _this = this;
      var filtered = this.presentaciones;

      // Aplicar filtro de búsqueda
      if (this.search) {
        filtered = filtered.filter(function (presentacion) {
          return presentacion.presentacion.toLowerCase().includes(_this.search.toLowerCase());
        });
      }
      return filtered;
    },
    paginatedPresentaciones: function paginatedPresentaciones() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return this.filteredPresentaciones.slice(start, end);
    },
    totalPages: function totalPages() {
      return Math.ceil(this.filteredPresentaciones.length / this.itemsPerPage);
    },
    paginationInfo: function paginationInfo() {
      var start = (this.currentPage - 1) * this.itemsPerPage + 1;
      var end = Math.min(this.currentPage * this.itemsPerPage, this.filteredPresentaciones.length);
      return {
        start: start,
        end: end,
        total: this.filteredPresentaciones.length
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
    this.getPresentaciones();
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
    getPresentaciones: function getPresentaciones() {
      var _this2 = this;
      axios.get('/presentaciones').then(function (res) {
        _this2.presentaciones = res.data.map(function (el) {
          return {
            id: el.id,
            presentacion: el.presentacion
          };
        });
        _this2.loader = false;
      })["catch"](function (err) {
        console.log(err);
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
      this.presentacion = Object.assign({}, this.defaultPresentacion);
      this.editedIndex = -1;
      this.saving = false;
      this.validationErrors = {
        presentacion: []
      };
    },
    editPresentacion: function editPresentacion(item) {
      this.editedIndex = this.presentaciones.indexOf(item);
      this.presentacion = Object.assign({}, item);
      this.dialog = true;
    },
    validateForm: function validateForm() {
      this.validationErrors = {
        presentacion: []
      };
      var isValid = true;

      // Validar nombre de la presentación
      if (!this.presentacion.presentacion || this.presentacion.presentacion.trim() === '') {
        this.validationErrors.presentacion.push('El nombre de la presentación es requerido');
        isValid = false;
      }
      return isValid;
    },
    savePresentacion: function savePresentacion() {
      var _this3 = this;
      if (!this.validateForm()) {
        return;
      }
      this.saving = true;
      axios.post('/presentaciones', this.presentacion).then(function (res) {
        _this3.saving = false;
        if (res.data === 'ok') {
          Swal.fire({
            icon: 'success',
            title: 'Presentación Creada',
            text: 'La presentación fue agregada con éxito',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Aceptar'
          }).then(function (result) {
            if (result.value) {
              location.reload();
            }
          });
        } else {
          // Manejar errores del servidor
          if (Array.isArray(res.data) && res.data.length > 0) {
            _this3.$set(_this3.validationErrors, 'general', res.data);
          }
        }
      })["catch"](function (error) {
        _this3.saving = false;
        if (error.response && error.response.status === 422) {
          _this3.validationErrors = error.response.data.errors;
        } else {
          _this3.$set(_this3.validationErrors, 'general', ['Error al guardar la presentación. Por favor, inténtelo de nuevo.']);
        }
      });
    },
    updatePresentacion: function updatePresentacion() {
      var _this4 = this;
      if (!this.validateForm()) {
        return;
      }
      this.saving = true;
      axios.put("/presentaciones/".concat(this.presentacion.id), this.presentacion).then(function (res) {
        _this4.saving = false;
        if (res.data === 'ok') {
          Swal.fire({
            icon: 'success',
            title: 'Presentación Actualizada',
            text: 'La presentación fue modificada con éxito',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Aceptar'
          }).then(function (result) {
            if (result.value) {
              location.reload();
            }
          });
        } else {
          // Manejar errores del servidor
          if (Array.isArray(res.data) && res.data.length > 0) {
            _this4.$set(_this4.validationErrors, 'general', res.data);
          }
        }
      })["catch"](function (error) {
        _this4.saving = false;
        if (error.response && error.response.status === 422) {
          _this4.validationErrors = error.response.data.errors;
        } else {
          _this4.$set(_this4.validationErrors, 'general', ['Error al actualizar la presentación. Por favor, inténtelo de nuevo.']);
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* Professional Container */\n.presentaciones-container[data-v-a1f09d38] {\r\n    min-height: 100vh;\r\n    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\r\n    padding: 2rem;\n}\r\n\r\n/* Professional Loading */\n.loading-container[data-v-a1f09d38] {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-height: 400px;\r\n    padding: 40px 20px;\r\n    background: linear-gradient(135deg, #17a2b820 0%, #13849620 100%);\r\n    border-radius: 12px;\r\n    backdrop-filter: blur(10px);\r\n    border: 1px solid rgba(255, 255, 255, 0.3);\n}\n.loading-content[data-v-a1f09d38] {\r\n    text-align: center;\r\n    max-width: 300px;\n}\n.professional-loader[data-v-a1f09d38] {\r\n    position: relative;\r\n    display: inline-block;\r\n    margin-bottom: 30px;\n}\n.loader-spinner[data-v-a1f09d38] {\r\n    width: 60px;\r\n    height: 60px;\r\n    border: 4px solid rgba(102, 126, 234, 0.1);\r\n    border-left: 4px solid #17a2b8;\r\n    border-radius: 50%;\r\n    animation: spin-a1f09d38 1s linear infinite;\r\n    position: relative;\r\n    z-index: 2;\n}\n.loader-pulse[data-v-a1f09d38] {\r\n    position: absolute;\r\n    top: -10px;\r\n    left: -10px;\r\n    width: 80px;\r\n    height: 80px;\r\n    border: 2px solid rgba(102, 126, 234, 0.3);\r\n    border-radius: 50%;\r\n    animation: pulse-a1f09d38 2s ease-in-out infinite;\r\n    z-index: 1;\n}\n@keyframes spin-a1f09d38 {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n@keyframes pulse-a1f09d38 {\n0% { transform: scale(0.8); opacity: 1;\n}\n50% { transform: scale(1.2); opacity: 0.5;\n}\n100% { transform: scale(0.8); opacity: 1;\n}\n}\n.loading-title[data-v-a1f09d38] {\r\n    color: #2c3e50;\r\n    font-size: 1.4rem;\r\n    font-weight: 700;\r\n    margin-bottom: 8px;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\n}\n.loading-subtitle[data-v-a1f09d38] {\r\n    color: #6c757d;\r\n    font-size: 0.95rem;\r\n    font-weight: 400;\r\n    margin: 0 0 2rem 0;\r\n    line-height: 1.4;\n}\n.loading-progress[data-v-a1f09d38] {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    height: 4px;\r\n    background: #e5e7eb;\r\n    border-radius: 2px;\r\n    margin: 0 auto;\r\n    overflow: hidden;\n}\n.progress-bar[data-v-a1f09d38] {\r\n    height: 100%;\r\n    background: linear-gradient(90deg, #17a2b8, #138496);\r\n    border-radius: 2px;\r\n    animation: progress-a1f09d38 2s ease-in-out infinite;\n}\n@keyframes progress-a1f09d38 {\n0% { transform: translateX(-100%);\n}\n50% { transform: translateX(0%);\n}\n100% { transform: translateX(100%);\n}\n}\r\n\r\n/* Header Section */\n.presentaciones-content[data-v-a1f09d38] {\r\n    max-width: 1400px;\r\n    margin: 0 auto;\n}\n.header-section[data-v-a1f09d38] {\r\n    background: rgba(255, 255, 255, 0.95);\r\n    backdrop-filter: blur(20px);\r\n    border-radius: 20px;\r\n    padding: 2rem;\r\n    margin-bottom: 2rem;\r\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 2rem;\r\n    position: relative;\r\n    z-index: 5;\n}\n.page-header h2[data-v-a1f09d38] {\r\n    color: #2c3e50;\r\n    font-size: 2.2rem;\r\n    font-weight: 700;\r\n    margin: 0 0 0.5rem 0;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    background-clip: text;\r\n    -webkit-background-clip: text;\r\n    -webkit-text-fill-color: transparent;\r\n    display: flex;\r\n    align-items: center;\n}\n.page-description[data-v-a1f09d38] {\r\n    color: #64748b;\r\n    font-size: 1.1rem;\r\n    margin: 0;\r\n    font-weight: 400;\n}\n.header-actions[data-v-a1f09d38] {\r\n    display: flex;\r\n    gap: 1rem;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    position: relative;\r\n    z-index: 10;\n}\n.search-box[data-v-a1f09d38] {\r\n    position: relative;\r\n    min-width: 300px;\n}\n.search-icon[data-v-a1f09d38] {\r\n    position: absolute;\r\n    left: 1rem;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    color: #64748b;\r\n    z-index: 3;\r\n    pointer-events: none;\n}\n.search-input[data-v-a1f09d38] {\r\n    width: 100%;\r\n    height: 50px;\r\n    padding: 0 1rem 0 3rem !important;\r\n    border: 2px solid #e2e8f0;\r\n    border-radius: 12px;\r\n    font-size: 1rem;\r\n    background: rgba(255, 255, 255, 0.9);\r\n    backdrop-filter: blur(10px);\r\n    transition: all 0.3s ease;\n}\n.search-input[data-v-a1f09d38]::-moz-placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-a1f09d38]::placeholder {\r\n    color: #9ca3af;\r\n    padding-left: 0;\n}\n.search-input[data-v-a1f09d38]:focus {\r\n    outline: none;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\r\n    background: white;\n}\n.new-presentation-btn[data-v-a1f09d38] {\r\n    height: 50px;\r\n    padding: 0 2rem;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    border: none;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);\r\n    position: relative;\r\n    z-index: 10;\r\n    white-space: nowrap;\n}\n.new-presentation-btn[data-v-a1f09d38]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);\n}\r\n\r\n/* Professional Report Container */\n.professional-report-container[data-v-a1f09d38] {\r\n    background: white;\r\n    border-radius: 20px;\r\n    overflow: hidden;\r\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\r\n\r\n/* Mobile Cards - Hidden by default */\n.mobile-cards-container[data-v-a1f09d38] {\r\n    display: none;\r\n    padding: 1.5rem;\n}\n.desktop-table[data-v-a1f09d38] {\r\n    display: block;\n}\r\n\r\n/* Professional Table */\n.professional-table-wrapper[data-v-a1f09d38] {\r\n    overflow-x: auto;\r\n    -webkit-overflow-scrolling: touch;\n}\n.professional-table[data-v-a1f09d38] {\r\n    width: 100%;\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n    background: white;\r\n    font-size: 0.95rem;\n}\r\n\r\n/* Table Header */\n.professional-table thead th[data-v-a1f09d38] {\r\n    background: transparent;\r\n    color: #374151;\r\n    font-weight: 700;\r\n    font-size: 0.9rem;\r\n    padding: 1.25rem 1rem;\r\n    border-bottom: 2px solid #e5e7eb;\r\n    position: sticky;\r\n    top: 0;\r\n    z-index: 10;\r\n    white-space: nowrap;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\n}\n.professional-table thead th i[data-v-a1f09d38] {\r\n    margin-right: 0.5rem;\r\n    color: #17a2b8;\n}\r\n\r\n/* Table Body */\n.professional-table tbody tr[data-v-a1f09d38] {\r\n    transition: all 0.3s ease;\r\n    border-bottom: 1px solid #f1f5f9;\r\n    background: rgba(255, 255, 255, 0.8);\r\n    backdrop-filter: blur(10px);\n}\n.professional-table tbody tr[data-v-a1f09d38]:hover {\r\n    background: rgba(102, 126, 234, 0.05);\r\n    transform: translateX(5px);\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.professional-table tbody td[data-v-a1f09d38] {\r\n    padding: 1rem;\r\n    vertical-align: middle;\r\n    border-bottom: 1px solid #f1f5f9;\n}\r\n\r\n/* Cell Styles */\n.presentation-cell[data-v-a1f09d38] {\r\n    font-weight: 600;\r\n    color: #1e293b;\n}\n.presentation-name[data-v-a1f09d38] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.75rem;\n}\n.presentation-icon[data-v-a1f09d38] {\r\n    color: #17a2b8;\r\n    font-size: 1rem;\r\n    width: 20px;\r\n    text-align: center;\n}\n.name-text[data-v-a1f09d38] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 1rem;\r\n    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);\r\n    color: #0277bd;\r\n    padding: 0.4rem 0.8rem;\r\n    border-radius: 8px;\r\n    font-weight: 700;\r\n    border: 1px solid #81d4fa;\n}\r\n\r\n/* Action Buttons */\n.action-buttons[data-v-a1f09d38] {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    justify-content: center;\n}\n.action-btn[data-v-a1f09d38] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 10px;\r\n    border: none;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-size: 1rem;\r\n    text-decoration: none;\n}\n.btn-edit[data-v-a1f09d38] {\r\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);\n}\n.btn-edit[data-v-a1f09d38]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);\n}\r\n\r\n/* Mobile Cards Styles */\n.presentation-card[data-v-a1f09d38] {\r\n    background: white;\r\n    border-radius: 16px;\r\n    padding: 1.5rem;\r\n    margin-bottom: 1rem;\r\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\r\n    border: 1px solid #e5e7eb;\r\n    transition: all 0.3s ease;\n}\n.presentation-card[data-v-a1f09d38]:hover {\r\n    transform: translateY(-5px);\r\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.card-header[data-v-a1f09d38] {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 1.5rem;\r\n    padding-bottom: 1rem;\r\n    border-bottom: 2px solid #f1f5f9;\n}\n.presentation-info[data-v-a1f09d38] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n    flex: 1;\n}\n.presentation-icon[data-v-a1f09d38] {\r\n    width: 50px;\r\n    height: 50px;\r\n    border-radius: 12px;\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.2rem;\n}\n.presentation-details[data-v-a1f09d38] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.5rem;\r\n    flex: 1;\n}\n.presentation-name-mobile[data-v-a1f09d38] {\r\n    font-weight: 700;\r\n    color: #1e293b;\r\n    font-size: 1.1rem;\r\n    line-height: 1.2;\n}\n.card-body[data-v-a1f09d38] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\n}\r\n\r\n/* Actions Section Mobile */\n.actions-section[data-v-a1f09d38] {\r\n    display: flex;\r\n    gap: 1rem;\n}\n.mobile-action-btn[data-v-a1f09d38] {\r\n    flex: 1;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    gap: 0.75rem;\r\n    padding: 1rem;\r\n    border-radius: 12px;\r\n    font-weight: 600;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    text-decoration: none;\r\n    border: none;\n}\n.edit-btn[data-v-a1f09d38] {\r\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n    color: white;\r\n    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);\n}\n.edit-btn[data-v-a1f09d38]:hover {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);\n}\r\n\r\n/* Pagination Styles */\n.pagination-section[data-v-a1f09d38] {\r\n    background: white;\r\n    border-top: 2px solid #f1f5f9;\r\n    padding: 1.5rem 2rem;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 1rem;\n}\n.pagination-info[data-v-a1f09d38] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2rem;\r\n    flex-wrap: wrap;\n}\n.items-per-page[data-v-a1f09d38] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-label[data-v-a1f09d38] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    font-size: 0.9rem;\n}\n.items-select[data-v-a1f09d38] {\r\n    padding: 0.5rem 0.75rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    font-size: 0.9rem;\r\n    font-weight: 600;\r\n    color: #374151;\r\n    background: white;\r\n    cursor: pointer;\r\n    outline: none;\r\n    transition: all 0.3s ease;\n}\n.items-select[data-v-a1f09d38]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.page-info-text[data-v-a1f09d38] {\r\n    font-size: 0.9rem;\r\n    color: #64748b;\r\n    font-weight: 500;\n}\n.pagination-controls[data-v-a1f09d38] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\n}\n.pagination-btn[data-v-a1f09d38] {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    padding: 0.75rem 1rem;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\n}\n.pagination-btn[data-v-a1f09d38]:hover:not(:disabled) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    background: rgba(102, 126, 234, 0.05);\n}\n.pagination-btn[data-v-a1f09d38]:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n    color: #9ca3af;\n}\n.page-numbers[data-v-a1f09d38] {\r\n    display: flex;\r\n    gap: 0.25rem;\r\n    margin: 0 1rem;\n}\n.page-btn[data-v-a1f09d38] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border: 2px solid #e5e7eb;\r\n    border-radius: 8px;\r\n    background: white;\r\n    color: #374151;\r\n    font-weight: 600;\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\n.page-btn[data-v-a1f09d38]:hover:not(:disabled):not(.ellipsis) {\r\n    border-color: #17a2b8;\r\n    color: #17a2b8;\r\n    background: rgba(102, 126, 234, 0.05);\n}\n.page-btn.active[data-v-a1f09d38] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);\n}\n.page-btn.ellipsis[data-v-a1f09d38] {\r\n    border: none;\r\n    background: transparent;\r\n    cursor: default;\r\n    color: #9ca3af;\n}\n.page-btn.ellipsis[data-v-a1f09d38]:hover {\r\n    background: transparent;\r\n    border: none;\n}\r\n\r\n/* Bootstrap Modal Styles */\n.modal-header[data-v-a1f09d38] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    border-bottom: none;\r\n    border-radius: 0;\n}\n.modal-title[data-v-a1f09d38] {\r\n    font-weight: 700;\r\n    font-size: 1.2rem;\n}\n.modal-body[data-v-a1f09d38] {\r\n    padding: 2rem;\r\n    background: #f8fafc;\n}\n.field-label[data-v-a1f09d38] {\r\n    font-weight: 600;\r\n    color: #374151;\r\n    margin-bottom: 0.5rem;\r\n    display: block;\n}\n.form-control[data-v-a1f09d38] {\r\n    border-radius: 8px;\r\n    border: 2px solid #e2e8f0;\r\n    padding: 0.75rem 1rem;\r\n    transition: all 0.3s ease;\r\n    font-size: 0.95rem;\n}\n.form-control[data-v-a1f09d38]:focus {\r\n    border-color: #17a2b8;\r\n    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);\n}\n.is-invalid[data-v-a1f09d38] {\r\n    border-color: #dc3545 !important;\n}\n.invalid-feedback[data-v-a1f09d38] {\r\n    display: block;\r\n    color: #dc3545;\r\n    font-size: 0.875rem;\r\n    margin-top: 0.25rem;\n}\n.form-text[data-v-a1f09d38] {\r\n    font-size: 0.875rem;\r\n    color: #6b7280;\r\n    margin-top: 0.25rem;\n}\n.modal-actions[data-v-a1f09d38] {\r\n    padding: 1.5rem 2rem !important;\r\n    background: white;\r\n    border-top: 1px solid #e2e8f0;\n}\n.btn[data-v-a1f09d38] {\r\n    border-radius: 8px;\r\n    font-weight: 600;\r\n    padding: 0.75rem 1.5rem;\r\n    transition: all 0.3s ease;\n}\n.btn[data-v-a1f09d38]:hover {\r\n    transform: translateY(-1px);\n}\n.btn-primary[data-v-a1f09d38] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    border: none;\n}\n.btn-primary[data-v-a1f09d38]:hover {\r\n    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);\n}\n.btn-warning[data-v-a1f09d38] {\r\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\r\n    border: none;\n}\n.btn-warning[data-v-a1f09d38]:hover {\r\n    background: linear-gradient(135deg, #e28b00 0%, #c26605 100%);\n}\n.btn-outline-secondary[data-v-a1f09d38] {\r\n    border: 2px solid #6b7280;\r\n    color: #6b7280;\r\n    background: transparent;\n}\n.btn-outline-secondary[data-v-a1f09d38]:hover {\r\n    background: #6b7280;\r\n    color: white;\n}\n.alert-danger[data-v-a1f09d38] {\r\n    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);\r\n    border: 1px solid #f87171;\r\n    border-radius: 8px;\r\n    color: #991b1b;\n}\n.alert-danger ul[data-v-a1f09d38] {\r\n    margin-bottom: 0;\n}\r\n\r\n/* Custom Modal Styles */\n.modal-backdrop-custom[data-v-a1f09d38] {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    backdrop-filter: blur(5px);\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    z-index: 1050;\r\n    padding: 1rem;\n}\n.modal-dialog-custom[data-v-a1f09d38] {\r\n    max-width: 500px;\r\n    width: 100%;\r\n    max-height: 90vh;\r\n    overflow-y: auto;\n}\n.modal-content-custom[data-v-a1f09d38] {\r\n    background: white;\r\n    border-radius: 20px;\r\n    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\r\n    overflow: hidden;\n}\n.modal-header-custom[data-v-a1f09d38] {\r\n    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\r\n    color: white;\r\n    padding: 1.5rem 2rem;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\n}\n.modal-title-custom[data-v-a1f09d38] {\r\n    font-weight: 700;\r\n    font-size: 1.3rem;\r\n    margin: 0;\n}\n.close-btn-custom[data-v-a1f09d38] {\r\n    background: none;\r\n    border: none;\r\n    color: white;\r\n    font-size: 1.2rem;\r\n    cursor: pointer;\r\n    padding: 0.5rem;\r\n    border-radius: 50%;\r\n    transition: background 0.3s ease;\n}\n.close-btn-custom[data-v-a1f09d38]:hover {\r\n    background: rgba(255, 255, 255, 0.2);\n}\n.modal-body-custom[data-v-a1f09d38] {\r\n    padding: 2rem;\r\n    background: #f8fafc;\n}\n.modal-footer-custom[data-v-a1f09d38] {\r\n    padding: 1.5rem 2rem;\r\n    background: white;\r\n    border-top: 1px solid #e2e8f0;\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    gap: 1rem;\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 1024px) {\n.header-section[data-v-a1f09d38] {\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        text-align: center;\n}\n.header-actions[data-v-a1f09d38] {\r\n        justify-content: center;\n}\n.search-box[data-v-a1f09d38] {\r\n        min-width: 100%;\n}\n.page-header h2[data-v-a1f09d38] {\r\n        font-size: 2rem;\r\n        justify-content: center;\n}\n}\n@media (max-width: 900px) {\r\n    /* Show mobile cards, hide desktop table */\n.desktop-table[data-v-a1f09d38] {\r\n        display: none;\n}\n.mobile-cards-container[data-v-a1f09d38] {\r\n        display: block;\r\n        padding: 0 0.5rem;\n}\n}\n@media (max-width: 768px) {\n.presentaciones-container[data-v-a1f09d38] {\r\n        padding: 1rem;\n}\n.header-section[data-v-a1f09d38] {\r\n        border-radius: 16px;\r\n        padding: 1.5rem;\n}\n.professional-report-container[data-v-a1f09d38] {\r\n        border-radius: 16px;\n}\n.page-header h2[data-v-a1f09d38] {\r\n        font-size: 1.8rem;\r\n        flex-direction: column;\r\n        text-align: center;\r\n        gap: 0.5rem;\n}\n.presentation-card[data-v-a1f09d38] {\r\n        margin-bottom: 1rem;\r\n        padding: 1.25rem;\r\n        border-radius: 14px;\n}\n.card-header[data-v-a1f09d38] {\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        align-items: stretch;\r\n        margin-bottom: 1.25rem;\n}\n.presentation-info[data-v-a1f09d38] {\r\n        justify-content: center;\r\n        text-align: center;\n}\n.presentation-name-mobile[data-v-a1f09d38] {\r\n        font-size: 1rem;\r\n        text-align: center;\n}\n.actions-section[data-v-a1f09d38] {\r\n        flex-direction: column;\r\n        gap: 0.75rem;\n}\n.pagination-section[data-v-a1f09d38] {\r\n        padding: 1rem;\r\n        flex-direction: column;\r\n        align-items: stretch;\r\n        gap: 1rem;\n}\n.pagination-info[data-v-a1f09d38] {\r\n        justify-content: center;\r\n        flex-direction: column;\r\n        gap: 1rem;\r\n        text-align: center;\n}\n.items-per-page[data-v-a1f09d38] {\r\n        justify-content: center;\n}\n.pagination-controls[data-v-a1f09d38] {\r\n        justify-content: center;\r\n        flex-wrap: wrap;\n}\n.page-numbers[data-v-a1f09d38] {\r\n        margin: 0 0.5rem;\r\n        flex-wrap: wrap;\r\n        justify-content: center;\n}\n.pagination-btn[data-v-a1f09d38] {\r\n        font-size: 0.8rem;\r\n        padding: 0.6rem 0.8rem;\n}\n.page-btn[data-v-a1f09d38] {\r\n        width: 35px;\r\n        height: 35px;\r\n        font-size: 0.8rem;\n}\n}\n@media (max-width: 480px) {\n.presentaciones-container[data-v-a1f09d38] {\r\n        padding: 0.75rem;\n}\n.header-section[data-v-a1f09d38] {\r\n        padding: 1.25rem;\n}\n.page-header h2[data-v-a1f09d38] {\r\n        font-size: 1.6rem;\n}\n.presentation-card[data-v-a1f09d38] {\r\n        padding: 1rem;\r\n        margin-bottom: 0.875rem;\n}\n.presentation-name-mobile[data-v-a1f09d38] {\r\n        font-size: 0.95rem;\n}\n.pagination-controls[data-v-a1f09d38] {\r\n        flex-direction: column;\r\n        gap: 1rem;\n}\n.page-numbers[data-v-a1f09d38] {\r\n        margin: 0;\r\n        order: 2;\n}\n.prev-btn[data-v-a1f09d38] {\r\n        order: 1;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n.next-btn[data-v-a1f09d38] {\r\n        order: 3;\r\n        align-self: stretch;\r\n        justify-content: center;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_style_index_0_id_a1f09d38_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_style_index_0_id_a1f09d38_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_style_index_0_id_a1f09d38_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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

/***/ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=template&id=a1f09d38&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=template&id=a1f09d38&scoped=true ***!
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
    staticClass: "presentaciones-container"
  }, [_vm.loader ? _c("div", {
    staticClass: "loading-container"
  }, [_vm._m(0)]) : _c("div", {
    staticClass: "presentaciones-content"
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
    staticClass: "search-input",
    attrs: {
      type: "text",
      placeholder: "Buscar presentaciones..."
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
    staticClass: "new-presentation-btn",
    on: {
      click: _vm.openModal
    }
  }, [_c("i", {
    staticClass: "fas fa-plus"
  }), _vm._v("\n                        Nueva Presentación\n                    ")])])]), _vm._v(" "), _c("div", {
    staticClass: "professional-report-container"
  }, [_c("div", {
    staticClass: "mobile-cards-container"
  }, _vm._l(_vm.paginatedPresentaciones, function (presentacion) {
    return _c("div", {
      key: presentacion.id,
      staticClass: "presentation-card"
    }, [_c("div", {
      staticClass: "card-header"
    }, [_c("div", {
      staticClass: "presentation-info"
    }, [_vm._m(2, true), _vm._v(" "), _c("div", {
      staticClass: "presentation-details"
    }, [_c("div", {
      staticClass: "presentation-name-mobile"
    }, [_vm._v(_vm._s(presentacion.presentacion))])])])]), _vm._v(" "), _c("div", {
      staticClass: "card-body"
    }, [_c("div", {
      staticClass: "actions-section"
    }, [_c("button", {
      staticClass: "mobile-action-btn edit-btn",
      on: {
        click: function click($event) {
          return _vm.editPresentacion(presentacion);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-edit"
    }), _vm._v("\n                                    Editar\n                                ")])])])]);
  }), 0), _vm._v(" "), _c("div", {
    staticClass: "desktop-table"
  }, [_c("div", {
    staticClass: "professional-table-wrapper"
  }, [_c("table", {
    staticClass: "professional-table"
  }, [_vm._m(3), _vm._v(" "), _c("tbody", _vm._l(_vm.paginatedPresentaciones, function (presentacion) {
    return _c("tr", {
      key: presentacion.id
    }, [_c("td", {
      staticClass: "presentation-cell"
    }, [_c("div", {
      staticClass: "presentation-name"
    }, [_vm._m(4, true), _vm._v(" "), _c("span", {
      staticClass: "name-text"
    }, [_vm._v(_vm._s(presentacion.presentacion))])])]), _vm._v(" "), _c("td", {
      staticClass: "action-cell"
    }, [_c("div", {
      staticClass: "action-buttons"
    }, [_c("button", {
      staticClass: "action-btn btn-edit",
      attrs: {
        title: "Editar"
      },
      on: {
        click: function click($event) {
          return _vm.editPresentacion(presentacion);
        }
      }
    }, [_c("i", {
      staticClass: "fas fa-edit"
    })])])])]);
  }), 0)])]), _vm._v(" "), _c("div", {
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
    }, [_vm._v("\n                                        " + _vm._s(option) + "\n                                    ")]);
  }), 0), _vm._v(" "), _c("span", {
    staticClass: "pagination-label"
  }, [_vm._v("por página")])]), _vm._v(" "), _c("div", {
    staticClass: "page-info-text"
  }, [_vm._v("\n                                Mostrando " + _vm._s(_vm.paginationInfo.start) + "-" + _vm._s(_vm.paginationInfo.end) + " de " + _vm._s(_vm.paginationInfo.total) + " presentaciones\n                            ")])]), _vm._v(" "), _c("div", {
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
  }), _vm._v("\n                                Anterior\n                            ")]), _vm._v(" "), _c("div", {
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
          page !== "..." ? _vm.goToPage(page) : null;
        }
      }
    }, [_vm._v("\n                                    " + _vm._s(page) + "\n                                ")]);
  }), 0), _vm._v(" "), _c("button", {
    staticClass: "pagination-btn next-btn",
    attrs: {
      disabled: _vm.currentPage === _vm.totalPages
    },
    on: {
      click: _vm.nextPage
    }
  }, [_vm._v("\n                                Siguiente\n                                "), _c("i", {
    staticClass: "fas fa-chevron-right"
  })])])])])]), _vm._v(" "), _vm.dialog ? _c("div", {
    staticClass: "modal-backdrop-custom",
    on: {
      click: _vm.closeModal
    }
  }, [_c("div", {
    staticClass: "modal-dialog-custom",
    on: {
      click: function click($event) {
        $event.stopPropagation();
      }
    }
  }, [_c("div", {
    staticClass: "modal-content-custom"
  }, [_c("div", {
    staticClass: "modal-header-custom"
  }, [_c("h5", {
    staticClass: "modal-title-custom"
  }, [_vm._v(_vm._s(_vm.formTitle))]), _vm._v(" "), _c("button", {
    staticClass: "close-btn-custom",
    attrs: {
      type: "button"
    },
    on: {
      click: _vm.closeModal
    }
  }, [_c("i", {
    staticClass: "fas fa-times"
  })])]), _vm._v(" "), _c("div", {
    staticClass: "modal-body-custom"
  }, [_c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        _vm.dialog && _vm.editedIndex > -1 ? _vm.updatePresentacion() : _vm.savePresentacion();
      }
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("label", {
    staticClass: "field-label"
  }, [_vm._v("Nombre de la Presentación")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.presentacion.presentacion,
      expression: "presentacion.presentacion"
    }],
    staticClass: "form-control",
    "class": {
      "is-invalid": _vm.hasError("presentacion")
    },
    attrs: {
      type: "text",
      placeholder: "Ej: Frasco x 100 ml"
    },
    domProps: {
      value: _vm.presentacion.presentacion
    },
    on: {
      input: [function ($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.presentacion, "presentacion", $event.target.value);
      }, function ($event) {
        return _vm.clearError("presentacion");
      }]
    }
  }), _vm._v(" "), _vm.hasError("presentacion") ? _c("div", {
    staticClass: "invalid-feedback"
  }, [_vm._v("\n                                            " + _vm._s(_vm.firstError("presentacion")) + "\n                                        ")]) : _vm._e(), _vm._v(" "), _c("small", {
    staticClass: "form-text text-muted"
  }, [_vm._v("\n                                            Ingrese el nombre descriptivo de la presentación del producto\n                                        ")])]), _vm._v(" "), _vm.hasError("general") ? _c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "alert alert-danger"
  }, [_c("ul", {
    staticClass: "mb-0"
  }, _vm._l(_vm.validationErrors.general, function (error) {
    return _c("li", {
      key: error
    }, [_vm._v(_vm._s(error))]);
  }), 0)])]) : _vm._e()])])]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer-custom"
  }, [_c("button", {
    staticClass: "btn btn-outline-secondary me-2",
    attrs: {
      type: "button"
    },
    on: {
      click: _vm.closeModal
    }
  }, [_c("i", {
    staticClass: "fas fa-times"
  }), _vm._v("\n                                Cancelar\n                            ")]), _vm._v(" "), _c("button", {
    staticClass: "btn save-btn",
    "class": _vm.editedIndex > -1 ? "btn-warning" : "btn-primary",
    attrs: {
      type: "button",
      disabled: _vm.saving
    },
    on: {
      click: function click($event) {
        _vm.editedIndex > -1 ? _vm.updatePresentacion() : _vm.savePresentacion();
      }
    }
  }, [_vm.saving ? _c("span", [_c("i", {
    staticClass: "fas fa-spinner fa-spin"
  }), _vm._v("\n                                    " + _vm._s(_vm.editedIndex > -1 ? "Actualizando..." : "Guardando...") + "\n                                ")]) : _c("span", [_c("i", {
    "class": _vm.editedIndex > -1 ? "fas fa-edit" : "fas fa-save"
  }), _vm._v("\n                                    " + _vm._s(_vm.editedIndex > -1 ? "Actualizar" : "Guardar") + "\n                                ")])])])])])]) : _vm._e(), _vm._v(" "),  false ? 0 : _vm._e()], 1)])]);
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
  }, [_vm._v("Cargando Presentaciones")]), _vm._v(" "), _c("p", {
    staticClass: "loading-subtitle"
  }, [_vm._v("Obteniendo la información de presentaciones...")]), _vm._v(" "), _c("div", {
    staticClass: "loading-progress"
  }, [_c("div", {
    staticClass: "progress-bar"
  })])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "page-header"
  }, [_c("h2", [_c("i", {
    staticClass: "fas fa-boxes mr-3"
  }), _vm._v("Presentaciones")]), _vm._v(" "), _c("p", {
    staticClass: "page-description"
  }, [_vm._v("Gestiona las presentaciones de productos disponibles en el sistema")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "presentation-icon"
  }, [_c("i", {
    staticClass: "fas fa-box"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_c("i", {
    staticClass: "fas fa-box"
  }), _vm._v("Presentación")]), _vm._v(" "), _c("th", [_c("i", {
    staticClass: "fas fa-cogs"
  }), _vm._v("Acciones")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "presentation-icon"
  }, [_c("i", {
    staticClass: "fas fa-box"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/Presentaciones.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/Presentaciones.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Presentaciones_vue_vue_type_template_id_a1f09d38_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Presentaciones.vue?vue&type=template&id=a1f09d38&scoped=true */ "./resources/js/components/Presentaciones.vue?vue&type=template&id=a1f09d38&scoped=true");
/* harmony import */ var _Presentaciones_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Presentaciones.vue?vue&type=script&lang=js */ "./resources/js/components/Presentaciones.vue?vue&type=script&lang=js");
/* harmony import */ var _Presentaciones_vue_vue_type_style_index_0_id_a1f09d38_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css */ "./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Presentaciones_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Presentaciones_vue_vue_type_template_id_a1f09d38_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Presentaciones_vue_vue_type_template_id_a1f09d38_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "a1f09d38",
  null
  
)

/* hot reload */
if (false) // removed by dead control flow
{ var api; }
component.options.__file = "resources/js/components/Presentaciones.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Presentaciones.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Presentaciones.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Presentaciones.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_style_index_0_id_a1f09d38_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=style&index=0&id=a1f09d38&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/Presentaciones.vue?vue&type=template&id=a1f09d38&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Presentaciones.vue?vue&type=template&id=a1f09d38&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_template_id_a1f09d38_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_template_id_a1f09d38_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_ruleSet_1_rules_0_use_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Presentaciones_vue_vue_type_template_id_a1f09d38_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Presentaciones.vue?vue&type=template&id=a1f09d38&scoped=true */ "./node_modules/vuetify-loader/lib/loader.js??ruleSet[1].rules[0].use!./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Presentaciones.vue?vue&type=template&id=a1f09d38&scoped=true");


/***/ })

}]);