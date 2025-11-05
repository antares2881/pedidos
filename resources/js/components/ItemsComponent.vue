<template>
    <v-app>
        <view-history-price ref="historyPrice" />
        <crear-cliente ref="crearCliente" @cliente_id="clienteNew"/>
        <informacion-final-facturas ref="finalizarFactura" />
        <modalitem-component ref="modalProducto" @updateItems="updateListItems"/>
        <modalfacturas-pendientes ref="facturas" @seleccionar="llenarReferencia" />
        <div class="row" >           
            
            <div class="col-md-6 col-sm-12">
                <div class="row p-2 mb-1">
                    <div class="col-12 col-md-8">
                        <input type="text" class="form-control form-control-sm" placeholder="Buscar productos" @keyup="filterItems" v-model="nombreProducto">
                    </div>
                    <div class="col-12 col-md-4">
                        <button class="btn btn-outline-primary btn-sm btn-block text-wrap" @click="nuevoProducto"><i class="fas fa-plus"></i> Crear</button>
                    </div>                        
                </div>
                <div class="products-grid overflow-y-auto overflow-x-hidden p-2" style="max-height: 520px;">
                    <!-- Professional Loading State -->
                    <div v-if="loader" class="loading-container">
                        <div class="loading-content">
                            <div class="professional-loader">
                                <div class="loader-spinner"></div>
                                <div class="loader-pulse"></div>
                            </div>
                            <div class="loading-text">
                                <h5 class="loading-title">Cargando productos...</h5>
                                <p class="loading-subtitle">Por favor espera mientras obtenemos la información</p>
                            </div>
                            <div class="loading-dots">
                                <span class="dot dot-1"></span>
                                <span class="dot dot-2"></span>
                                <span class="dot dot-3"></span>
                            </div>
                        </div>
                    </div>                            
                    <div class="row justify-center" v-else>
                        
                        <div class="col-6 col-lg-4 col-xl-3 mb-2"  v-for="item, index in items" :key="index" >
                            <div class="product-card p-2">

                                <img 
                                :src="item.logo ? '/' + item.logo : '/images/default.png'" 
                                :alt="'Logo ' + item.Laboratorio" 
                                :title="item.Laboratorio" 
                                width="25px" 
                                class="product-logo"
                                />
                                <p class="product-title mb-1"> {{ item.producto }}</p>
                                <div class="text-center mb-2">
                                    <span class="badge badge-info badge-sm text-wrap"> {{ item.presentacion }} </span>
                                </div>                               
                                <div class="text-center mb-2">
                                    <div v-if="historyLoading[item.codigo]" class="history-btn loading">
                                        <div class="mini-spinner"></div>
                                    </div>
                                    <i v-else class="fas fa-search history-btn" role="button" @click="viewHistory(item)"></i>
                                </div>
                                <hr class="my-2">
                                <div class="product-info" @click="addProducto(item, index)" style="cursor: pointer;">                                    
                                    <span class="stock-info" :class="[item.stock >0 ?'text-success':'text-danger']">Cant. {{ item.stock }}</span>  <br>
                                    <span class="price-info">{{ item.precio | currency }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="card order-card">
                    <div class="card-header bg-light">
                        <h5 class="card-title mb-0 text-center">
                            <slot name="title"></slot>
                        </h5>
                    </div>
                    <div class="card-body p-3">      

                        <!-- OPCIONES FACTURA -->
                        <div class="row">
                            <div class="col-12" v-if="esFactura">
                                <b-alert show variant="info" v-if="datosFactura.code === 1">No existen acciones pendientes por realizar.</b-alert>
                            </div>               
                        </div>               
                        <!-- FIN OPCIONES FACTURA -->

                        <!-- OPCIONES DE EDICION DE PEDIDOS O CREACIÓN DE NUEVA COMPRA. -->
                        <slot name="opcionesExtras"></slot>

                        <div class="row">
                            <div class="col-12">
                                <b-form-select 
                                    id="tipolista_id"
                                    v-model="pedido.tipolista_id" 
                                    :options="tipoListas"
                                    value-field="id"
                                    text-field="tipo_lista"
                                    @change="getProductos(tipo_cliente)" 
                                ></b-form-select>
                            </div>
                            <div class="col-12 col-lg-8 col-md-12">
                                <basic-select
                                    :options="clientes"
                                    id="cliente"
                                    placeholder="Buscar Cliente"
                                    :selected-option="itemCliente"
                                    @select="selectCliente"
                                    v-model="pedido.cliente_id"
                                ></basic-select>
                            </div>

                            <!-- OPCION NOTA -->
                            <div class="col-12 col-lg-4 col-md-12" v-if="esNota">
                                <button class="btn btn-outline-success btn-block text-small text-wrap" @click="referenciarFactura">
                                    <i class="fas fa-search"></i> Referenciar
                                </button>
                            </div>
                            <!-- FIN OPCION NOTA -->

                            <div class="col-12 col-lg-4 col-md-12" v-else>
                                <button class="btn btn-outline-success btn-block text-small text-wrap" @click="newCliente">
                                    <i class="fas fa-user-plus"></i> Nuevo
                                </button>
                            </div>
                        </div>
                        <div class="row overflow-auto mb-2" style="max-height: 380px;">
                            <div class="col-12 p-0">
                                <table class="table table-sm table-compact mb-0">
                                    <thead class="thead-light">
                                        <tr class="compact-header">
                                            <th class="compact-th" style="width: 35%;">Item</th>
                                            <th class="compact-th text-center" style="width: 20%;">Precio</th>
                                            <th class="compact-th text-center" style="width: 12%;">Cant.</th>
                                            <th class="compact-th text-center" style="width: 12%;">Bon.</th>
                                            <th class="compact-th text-center" style="width: 15%;">Total</th>
                                            <th class="compact-th text-center" style="width: 6%;"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item, index in pedidos" :key="index" class="compact-row">
                                            <td class="compact-cell product-cell">
                                                <span class="product-name">{{ item.producto.toLowerCase() }}</span>
                                            </td>
                                            <td class="compact-cell text-center">
                                                <input type="text" class="compact-input precio-input" :value="formatCurrency(item.precio)" :id="'precio'+index" @blur="calcularTotalProducto(index)" @input="formatPriceInput(index)">
                                            </td>
                                            <td class="compact-cell text-center">
                                                <input type="number" class="compact-input cantidad-input" :value="item.cantidad" :id="'cantidad'+index" @input="changeCantidad(index)">
                                            </td>
                                            <td class="compact-cell text-center">
                                                <input type="number" class="compact-input cantidad-input" :value="item.bonificacion" :id="'bonus'+index" @input="addBonus(index)">
                                            </td>
                                            <td class="compact-cell text-center total-cell">
                                                <span class="total-value">{{ item.total | currency }}</span>
                                            </td>
                                            <td class="compact-cell text-center">
                                                <i class="fas fa-trash text-danger delete-btn" role="button" @click="deleteItem(item, index)"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- OPCIONES AGREGAR NOTA-->
                        <div class="row" v-if="esNota">
                            <div class="col-6">
                                <label for="numero_referencia">No. referencia</label>
                                <input type="text" id="numero_referencia" class="form-control" v-model="pedido.numero_referencia" placeholder="No. referencia">
                            </div>
                            <div class="col-6">
                                <label for="fecha_referencia">Fecha referencia</label>
                                <input type="date" id="fecha_referencia" class="form-control" v-model="pedido.fecha_referencia">
                            </div>                        
                            <div class="col-12" v-if="pedido.id_factura">
                                <a :href="'/imprimir-factura/' + pedido.id_factura " target="_blank">Representación grafica - saldo factura ({{ pedido.valor_max_nota | currency }}) <i class="fas fa-file-pdf"></i></a>
                            </div>
                            <div class="col-12">
                                <label for="razon_referencia">Razon de la referencia</label>
                                <input type="text" id="razon_referencia" class="form-control" v-model="pedido.razon_referencia">
                            </div>
                        </div>
                        <!-- FIN OPCIONES NOTA -->

                        <div class="d-flex justify-content-between my-2 p-1 bg-info rounded">
                            <div>
                                Items: {{ this.pedidos.length }}
                            </div>
                            <div v-if="!esNota">
                                Total: {{ totalPedido | currency }}
                            </div>

                            <!-- OPCION NOTA -->
                            <div v-else>
                                <input type="number" class="form-control" v-model="pedido.valor_nota">
                            </div>
                            <!-- FIN OPCION NOTA -->

                        </div>

                        <!-- OPCIONES FACTURA -->
                        <div class="row" v-if="esFactura">
                            <div class="col-12" v-if="datosFactura.code !== 1">
                                <button class="btn btn-primary btn-block" @click="facturar" :disabled="facturaLoading">
                                    <div v-if="facturaLoading" class="d-flex align-items-center justify-content-center">
                                        <div class="save-spinner mr-2"></div>
                                        Procesando...
                                    </div>
                                    <div v-else>
                                        <i class="fas fa-file mr-2"></i>Facturar
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div class="row" v-if="!esFactura && !esFacturaDirecto">
                            <div class="col-6">
                                <button class="btn btn-secondary btn-block" @click="emptyCart" :disabled="saveLoading">
                                    <i class="fas fa-trash mr-2"></i>Vaciar productos
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary btn-block" @click="save" :disabled="saveLoading">
                                    <div v-if="saveLoading" class="d-flex align-items-center justify-content-center">
                                        <div class="save-spinner mr-2"></div>
                                        Guardando...
                                    </div>
                                    <div v-else>
                                        <i class="fas fa-save mr-2"></i>Guardar
                                    </div>
                                </button>
                            </div>
                        </div>
                        <!-- FIN OPCIONES FACTURA -->

                        <!-- OPCIONES COMPRAS -->
                        <div class="row" v-if="esFacturaDirecto">
                            <slot name="checkEsFactura" />
                            <div class="col-12">
                                <button class="btn btn-success btn-block" @click="guardarFacturaDirecto" :disabled="saveLoading">
                                    <div v-if="saveLoading" class="d-flex align-items-center justify-content-center">
                                        <div class="save-spinner mr-2"></div>
                                        Guardando...
                                    </div>
                                    <div v-else>
                                        <i class="fas fa-save"></i> Guardar
                                    </div>
                                </button>
                            </div>
                        </div>
                        <!-- FIN OPCIONES COMPRAS -->
                    </div>
                </div>
            </div>
        </div>
    </v-app>
</template>
<script>
    import { BasicSelect, ModelSelect } from 'vue-search-select';
    export default {
        props: ['tipo_cliente', 'num_pedido', 'datosFactura', 'esFactura', 'esNota'],
        data(){
            return{
                clientes: [],
                esFacturaDirecto: false,
                facturado: false,
                historyLoading: {},
                saveLoading: false,
                facturaLoading: false,
                itemCliente: {
                    value: '',
                    text: ''
                },
                items: [],
                laboratorios: [],
                loader: true,                
                nombreProducto: '',
                pedido: {id: '', cliente_id: '', numero: '', fecha: '', pedidos: [], total: 0, tipolista_id: 3, laboratorio_id: '', esFacturaDirecto: false, numero_referencia: null, fecha_referencia: null, id_factura: null, valor_max_nota: 0},
                pedidos: [],
                porcentaje: 0,
                productos: [],
                tipoListas: [],
                totalPedido: 0,
            }
        },
        mounted() {
            this.pedido.fecha = this.formatingDate(new Date());
            this.getPorcentaje();
            this.getClientes();
            this.getLaboratorios();
            this.getTiposListaPrecios();
            if(this.esFactura){
                this.setPedidos();
            }
                 
        },
        methods: {
            addBonus(index){
                const bonus = document.getElementById('bonus'+index).value;
                if(bonus < 0){
                    this.pedidos[index].bonificacion = 0;
                }else{
                    this.pedidos[index].bonificacion = bonus;
                }
            },  
            addProducto(item, index){
                // console.log(item)
                // this.productos[index].selected = true;
                const i = this.pedidos.findIndex(el => el.codigo == item.codigo);

                if(i >= 0){               
                    this.pedidos[i].cantidad += 1; 
                    this.pedidos[i].total = this.pedidos[i].cantidad * this.pedidos[i].precio
                }else{

                    this.pedidos.unshift({
                        id: item.id,
                        codigo: item.codigo,
                        producto: item.producto + ' - ' + item.presentacion,
                        cantidad: 1,
                        bonificacion: 0,
                        precio: item.precio,
                        total: item.precio * 1
                    })
                }                
                this.calculaTotalPedido();

            },  
            
            calculaTotalPedido(){
                this.totalPedido = 0;
                for (let i = 0; i < this.pedidos.length; i++) {
                    this.totalPedido += this.pedidos[i].total;
                }
                this.pedido.valor_nota = this.totalPedido;
                
            },
            calcularTotalProducto(index){
                const precio = this.parseCurrency(document.getElementById('precio'+index).value);
                this.pedidos[index].precio = precio
                this.pedidos[index].total = this.pedidos[index].cantidad * precio;
                this.calculaTotalPedido();
            },
            formatCurrency(value) {
                if (!value || value === 0) return '';
                // Asegurar que el valor sea un número entero para pesos colombianos
                const numericValue = parseInt(value) || 0;
                return new Intl.NumberFormat('es-CO').format(numericValue);
            },
            parseCurrency(value) {
                if (!value) return 0;
                // Remover puntos, comas y espacios, mantener solo dígitos
                const cleanValue = value.toString().replace(/[^\d]/g, '');
                return parseInt(cleanValue) || 0;
            },
            formatPriceInput(index) {
                const input = document.getElementById('precio' + index);
                if (!input) return;
                
                const value = this.parseCurrency(input.value);
                // Solo formatear si hay un valor válido
                if (value > 0) {
                    input.value = this.formatCurrency(value);
                }
            },
            changeCantidad(i){
                const cantidad = document.getElementById('cantidad'+ i).value;
                
                if(cantidad === '' || cantidad < 0){
                    this.pedidos[i].cantidad = 0;
                    this.pedidos[i].total =  0;
                }else{
                    this.pedidos[i].cantidad = parseInt(cantidad);
                    this.pedidos[i].total = this.pedidos[i].precio * parseInt(cantidad);
                }
                this.calculaTotalPedido();
            },
            clienteNew(cliente){
                // console.log(cliente)
                this.pedido.cliente_id = cliente.id
                this.itemCliente.text = cliente.razon_social
                this.itemCliente.value = cliente.id
            },
            deleteItem(item, index){
                /* const i = this.productos.findIndex(el => el.codigo == item.codigo);
                this.productos[i].selected = false; */
                this.pedidos.splice(index, 1);
                this.calculaTotalPedido();
            },
            formatingDate(dateToFormat) {
                const d = new Date(dateToFormat);
                const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
                const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const year = d.getFullYear();
                return `${year}-${month}-${day}`;
            },
            async guardarFacturaDirecto(){
                this.saveLoading = true;
                try {
                    this.pedido.totalPedido = this.totalPedido;
                    this.pedido.pedidos = this.pedidos;
                    await this.$emit('guardar', this.pedido);
                } catch (error) {
                    console.error('Error al guardar factura directa:', error);
                } finally {
                    setTimeout(() => {
                        this.saveLoading = false;
                    }, 1500);
                }
            },
            emptyCart(){
                this.pedidos = [];
                this.totalPedido = 0;
            },
            async facturar(){
                this.facturaLoading = true;
                try {
                    const factura = {
                        datos: this.datosFactura,
                        productos: this.pedidos,
                        total: this.totalPedido
                    }
                    await this.$refs.finalizarFactura.facturar(factura);
                } catch (error) {
                    console.error('Error al facturar:', error);
                } finally {
                    // Mantener el loading por un momento para mejor UX
                    setTimeout(() => {
                        this.facturaLoading = false;
                    }, 1000);
                }
            },
            filterItems() {
                    this.items = this.productos.filter((producto) => producto.producto.toLowerCase().includes(this.nombreProducto.toLowerCase()))                                
            },            
            getClientes(){
                this.clientes = [];                
                axios.get('/clientes')
                    .then(res => {
                        // console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            this.clientes.push({
                                value: res.data[i].id,
                                text: res.data[i].razon_social+' - '+res.data[i].municipios.mcpio
                            });
                        }
                        // Removido this.loader = false; - solo getProductos debe controlarlo
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getLaboratorios(){
                axios.get('/laboratorios')
                    .then(res => {
                        // console.log(res.data)
                        res.data.map((el) => {                            
                            this.laboratorios.push({
                                text: el.Laboratorio,
                                value: el.id
                            });                            
                        })
                    })
            },  
            getPorcentaje(){
                axios.get('/porcentaje')
                    .then(res => {
                        // console.log(res.data)
                        this.porcentaje = res.data.porcentaje;
                        this.getProductos(this.tipo_cliente);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            async getProductos(tipo_cliente){
                this.loader = true
                try {
                    const res = await axios.get(`/listas-precios/${this.pedido.tipolista_id}`);
                    // console.log(res.data)
                    if(tipo_cliente == 1){
                        this.productos = [];
                        for (let i = 0; i < res.data.length; i++) {                                                          
                            this.productos.push({
                                id: res.data[i].id,
                                codigo: res.data[i].codigo,
                                producto: res.data[i].producto,
                                presentacion: res.data[i].presentacion,
                                Laboratorio: res.data[i].Laboratorio,
                                logo: res.data[i].logo,
                                stock: res.data[i].stock,
                                precio: Math.round(res.data[i].precio * this.porcentaje) + res.data[i].precio,
                            })      
                        }
                    }else{
                        this.productos = res.data
                    }
                    this.items = this.productos
                    this.loader = false;
                } catch (err) {
                    console.log(err)
                }
            },
            getTiposListaPrecios(){
                axios.get('/tipos-lista-precios')
                    .then(res => {
                        // console.log(res.data);
                        this.tipoListas = res.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },            
            llenarReferencia(nota){
                // console.log(nota);
                this.pedido.numero_referencia = (nota.electronica == 0) ? nota.numero_factura : nota.electronica;
                this.pedido.fecha_referencia = nota.fecha_factura;
                this.pedido.id_factura = nota.id_factura;
                this.pedido.valor_max_nota = nota.saldo;
                this.pedido.tipo_factura = nota.tipo_factura;
            },
            newCliente(){
                this.$refs.crearCliente.newCliente();
            },
            nuevoProducto(){
                this.$refs.modalProducto.newProduct(this.tipoListas);
            },            
            referenciarFactura(){
                this.$refs.facturas.mostrarModalFacturas(this.pedido.cliente_id);
            },
            async save(){
                this.saveLoading = true;
                try {
                    if(this.tipo_cliente == 2){
                        this.pedido.num_pedido = document.getElementById('num_pedido').value;
                    }
                    this.pedido.totalPedido = this.totalPedido;
                    this.pedido.pedidos = this.pedidos;
                    await this.$emit('guardar', this.pedido);
                } catch (error) {
                    console.error('Error al guardar:', error);
                } finally {
                    setTimeout(() => {
                        this.saveLoading = false;
                    }, 1500);
                }
            },  
            selectCliente(item){
                if(item){
                    this.pedido.cliente_id = item.value
                    this.itemCliente = item
                }else{
                    this.itemCliente = {
                        text: null, value: null
                    }
                    this.pedido.cliente_id = null
                }
            },
            setPedidos(){
                console.log(this.datosFactura)
                if(this.datosFactura.code === 2){

                    if(this.datosFactura.estado === 4){
                        this.facturado = true
                        return;
                    }

                    for (let i = 0; i < this.datosFactura.productos.length; i++) {                    
                        this.pedidos.push({
                            id: this.datosFactura.productos[i].detalleproducto_id,
                            codigo: this.datosFactura.productos[i].codigo,
                            producto: this.datosFactura.productos[i].producto +'-'+this.datosFactura.productos[i].presentacion,
                            cantidad: this.datosFactura.productos[i].cantidad,
                            bonificacion: this.datosFactura.productos[i].adicionales,
                            precio: this.datosFactura.productos[i].precio,
                            total: this.datosFactura.productos[i].precio * this.datosFactura.productos[i].cantidad,
                            
                        })                    
                    }
                    this.selectCliente(this.datosFactura.cliente);
                    this.calculaTotalPedido();
                }
            },
            setVentas(pedidos, cliente){
                this.pedidos = pedidos;
                this.selectCliente(cliente);
                this.calculaTotalPedido();      
                this.esFacturaDirecto = true;      
            },
            setTransferencia(pedidos, cliente){
                this.pedidos = pedidos;
                this.selectCliente(cliente);
                this.calculaTotalPedido();     
            },
            updateListItems(item){
                this.productos.unshift(item);
                this.items = this.productos;
            },
            async viewHistory(item){
                // Activar el loader para este item específico
                this.$set(this.historyLoading, item.codigo, true);
                
                try {
                    // Llamar al método del modal
                    await this.$refs.historyPrice.showPriceProducts(item);
                } catch (error) {
                    console.error('Error al cargar historial:', error);
                } finally {
                    // Desactivar el loader después de un pequeño delay para mejor UX
                    setTimeout(() => {
                        this.$set(this.historyLoading, item.codigo, false);
                    }, 500);
                }
            }
        },
        components: {
            BasicSelect,
            ModelSelect
        },
        computed: {
            formatTotal(){
                const options2 = { style: "currency", currency: "USD" };
                const formateo = new Intl.NumberFormat("en-US", options2);
                return formateo.format(this.pedido.valor_nota);
            }
        },
    }
</script>

<style scoped>
/* Estilos para productos */
.products-grid {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
    padding: 15px;
}

.product-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.03);
    border: 1px solid rgba(255,255,255,0.8);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    min-height: 200px;
    position: relative;
    overflow: hidden;
}

.product-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #17a2b8 0%, #138496 50%, #f093fb 100%);
    opacity: 0;
    transition: opacity 0.3s;
}

.product-card:hover {
    box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06);
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(102, 126, 234, 0.3);
}

.product-card:hover::before {
    opacity: 1;
}

.product-logo {
    display: block;
    margin: 0 auto 12px;
    padding: 4px;
    background: transparent;
    border-radius: 8px;
    width: 45px;
    height: 45px;
    object-fit: contain;
}

.product-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #2c3e50;
    line-height: 1.3;
    margin-bottom: 8px;
    text-align: center;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.badge-sm {
    font-size: 0.75rem;
    padding: 0.4em 0.8em;
    border-radius: 20px;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    border: none;
    color: white;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(23, 162, 184, 0.3);
}

.history-btn {
    color: #17a2b8;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    padding: 8px;
    border-radius: 50%;
    background: rgba(102, 126, 234, 0.1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
}

.history-btn:hover {
    color: #5a67d8;
    background: rgba(102, 126, 234, 0.2);
    transform: scale(1.1);
}

.history-btn.loading {
    background: rgba(23, 162, 184, 0.2);
    cursor: default;
    pointer-events: none;
}

.mini-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(23, 162, 184, 0.3);
    border-left: 2px solid #17a2b8;
    border-radius: 50%;
    animation: miniSpin 1s linear infinite;
    margin: 0 auto;
}

@keyframes miniSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Save Button Loading Spinner */
.save-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-left: 2px solid #ffffff;
    border-radius: 50%;
    animation: saveSpinAnimation 1s linear infinite;
    display: inline-block;
}

@keyframes saveSpinAnimation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Button loading states */
.btn:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    pointer-events: none;
}

.btn.btn-primary:disabled {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    border-color: #17a2b8;
}

.btn.btn-success:disabled {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-color: #28a745;
}

.btn.btn-secondary:disabled {
    background: #6c757d;
    border-color: #6c757d;
}

.product-info {
    text-align: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    padding: 12px 8px;
    margin: 8px 0;
}

.stock-info {
    font-size: 0.85rem;
    font-weight: 700;
    display: block;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.price-info {
    font-size: 1rem;
    font-weight: 800;
    color: #2c3e50;
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
    border-radius: 8px;
    padding: 4px 8px;
    display: inline-block;
    box-shadow: 0 2px 8px rgba(252, 182, 159, 0.3);
}

/* Estilos para la tabla compacta */
.order-card {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border: none;
}

.table-compact {
    margin-bottom: 0;
    font-size: 0.85rem;
}

.table-compact th,
.table-compact td {
    padding: 0.4rem 0.5rem;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
}

.compact-header {
    background: #f8f9fa;
    color: #495057;
}

.compact-th {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.5rem 0.4rem;
    border: none;
    text-align: center;
}

.compact-row {
    transition: background-color 0.2s;
    height: 38px;
}

.compact-row:hover {
    background-color: #f8f9fa;
}

.compact-cell {
    padding: 0.3rem 0.4rem;
    vertical-align: middle;
    font-size: 0.82rem;
    height: 38px;
}

.product-cell {
    width: 35%;
    max-width: 200px;
    text-align: left;
    padding-right: 8px;
}

.product-name {
    font-size: 0.8rem;
    font-weight: 500;
    color: #495057;
    line-height: 1.2;
    display: block;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
}

.total-cell {
    width: 15%;
    min-width: 90px;
}

.compact-input {
    width: 100%;
    height: 28px;
    padding: 0.25rem 0.4rem;
    font-size: 0.8rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    text-align: center;
    background: white;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.compact-input:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    outline: none;
}

.precio-input {
    background: #f1f3f4;
    border-color: #d1d5db;
    font-weight: 600;
    width: 100%;
    min-width: 80px;
    text-align: center;
}

.precio-input:focus {
    background: #e5e7eb;
    border-color: #9ca3af;
}

.cantidad-input {
    background: #f1f3f4;
    border-color: #d1d5db;
    font-weight: 600;
    width: 100%;
    min-width: 50px;
    text-align: center;
}

.cantidad-input:focus {
    background: #e5e7eb;
    border-color: #9ca3af;
}

.total-value {
    font-weight: 700;
    color: #28a745;
    font-size: 0.85rem;
    white-space: nowrap;
    display: inline-block;
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    padding: 2px 6px;
    border-radius: 6px;
    border: 1px solid rgba(40, 167, 69, 0.2);
}

.delete-btn {
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0.2rem;
    transition: color 0.2s;
}

.delete-btn:hover {
    color: #dc3545 !important;
    transform: scale(1.1);
}

/* Responsivo */
@media (max-width: 768px) {
    .product-card {
        min-height: 160px;
    }
    
    .compact-input {
        height: 32px;
        font-size: 0.85rem;
    }
    
    .compact-cell {
        padding: 0.4rem 0.3rem;
        height: 42px;
    }
    
    .product-name {
        font-size: 0.75rem;
    }
}

/* Professional Loading Styles */
.loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    padding: 40px 20px;
    background: linear-gradient(135deg, #17a2b820 0%, #13849620 100%);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.loading-content {
    text-align: center;
    max-width: 300px;
}

.professional-loader {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
}

.loader-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(102, 126, 234, 0.1);
    border-left: 4px solid #17a2b8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: relative;
    z-index: 2;
}

.loader-pulse {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 80px;
    height: 80px;
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
    z-index: 1;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes pulse {
    0% {
        transform: scale(0.8);
        opacity: 1;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.5;
    }
    100% {
        transform: scale(0.8);
        opacity: 1;
    }
}

.loading-text {
    margin-bottom: 25px;
}

.loading-title {
    color: #2c3e50;
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.loading-subtitle {
    color: #6c757d;
    font-size: 0.95rem;
    font-weight: 400;
    margin: 0;
    line-height: 1.4;
}

.loading-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    animation: dotBounce 1.4s ease-in-out infinite both;
}

.dot-1 {
    animation-delay: -0.32s;
}

.dot-2 {
    animation-delay: -0.16s;
}

.dot-3 {
    animation-delay: 0s;
}

@keyframes dotBounce {
    0%, 80%, 100% {
        transform: scale(0.6);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Loading hover effect */
.loading-container:hover .loader-spinner {
    border-left-color: #5a67d8;
    animation-duration: 0.8s;
}

.loading-container:hover .loader-pulse {
    border-color: rgba(90, 103, 216, 0.4);
    animation-duration: 1.5s;
}

/* Responsive loading */
@media (max-width: 768px) {
    .loading-container {
        min-height: 300px;
        padding: 30px 15px;
    }
    
    .loader-spinner {
        width: 50px;
        height: 50px;
    }
    
    .loader-pulse {
        width: 70px;
        height: 70px;
        top: -10px;
        left: -10px;
    }
    
    .loading-title {
        font-size: 1.2rem;
    }
    
    .loading-subtitle {
        font-size: 0.9rem;
    }
}

/* Ajustes específicos para el layout */
.row {
    margin-left: -10px;
    margin-right: -10px;
}

.row > [class*="col-"] {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
