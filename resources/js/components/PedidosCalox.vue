<template>
    <v-app>
        <div class="container-fluid mt-5">
            <div class="row" v-if="errores">
                <div class="col-12">
                    <b-alert show variant="danger">{{ errores }}</b-alert>
                </div>
            </div>
            <items-component tipo_cliente="2" v-if="showComponent" @guardar="savePedido" ref="items">
                <template #title>Agregar compra</template>
                <template #opcionesExtras>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="laboratorio_id">Laboratorio</label>
                            <model-select
                                id="laboratorio_id"
                                :options="laboratorios"
                                v-model="entrada.laboratorio_id"
                            ></model-select>
                        </div>
                        <div class="col-md-6">
                            <label for="num_pedido">Numero de pedido</label>
                            <input type="number" id="num_pedido" class="form-control" @keypress.enter="buscarPedidoCalox" v-if="!esFacturaDirecto">
                            <input type="number" id="num_pedido" v-model="entrada.num_pedido" class="form-control" @keypress.enter="buscarPedidoCalox" v-else>
                        </div>
                        <div class="col-md-6">
                            <label for="num_factura">No. factura</label>
                            <input type="text" id="num_factura" class="form-control" v-model="entrada.num_factura">
                        </div>
                        <div class="col-md-6">
                            <label for="fecha_factura">Fecha</label>
                            <input type="date" id="fecha_factura" class="form-control" v-model="entrada.fecha">
                        </div>
                    </div>
                </template>
                <template #checkEsFactura>
                    <div class="col-6" >
                        <b-form-checkbox
                            id="editar"
                            v-model="entrada.modificar"
                            >
                            Editar pedido
                        </b-form-checkbox>
                    </div>  
                                
                </template>
            </items-component>      
        </div>
    </v-app>
</template>
<script>
    import { BasicSelect, ModelSelect } from 'vue-search-select';
    export default {
        data() {
            return {
                entrada: {cliente_id: '', fechaentrada_id: '', num_factura: null, num_pedido: '', fecha: '', fecha_factura: null, entradas: [], valor: 0, total_factura: 0, afectarInventario: false, modificarFactura: false, esFacturaDirecto: false, observaciones: null, modificar: false},
                entradas: [],
                errores: null,
                esFacturaDirecto: false,
                laboratorios: [],
                num_pedido: null,
                showComponent: false,        
            }
        },
        mounted() {
            this.getLaboratorios();
            this.getConsecutivo();
            this.showComponent = true;
        },
        methods: {
            
            buscarPedidoCalox(){

                const numero = document.getElementById('num_pedido').value;
                this.entradas = [];
                axios.get(`/pedidos-calox/${numero}`)
                    // this.reset()
                    .then(res => {
                        // console.log(res.data)
                        if(res.data.length > 0){
                            const cliente = {
                                text:res.data[0].razon_social, value: res.data[0].cliente_id
                            };
                            this.entrada.laboratorio_id = res.data[0].laboratorio_id;
                            this.entrada.venta_id = res.data[0].id;
                            this.entrada.num_pedido = res.data[0].num_pedido;
                            this.entrada.fecha = res.data[0].fecha;
                            this.entrada.total_factura = res.data[0].total_factura;
    
                            for (let i = 0; i < res.data.length; i++) {                    
                                this.entradas.push({
                                    id: res.data[i].detalleproducto_id,
                                    codigo: res.data[i].codigo,
                                    producto: res.data[i].producto +'-'+res.data[i].presentacion,
                                    cantidad: res.data[i].cantidad,
                                    bonificacion: res.data[i].adicionales,
                                    precio: res.data[i].precio_entrada,
                                    total: res.data[i].precio_entrada * res.data[i].cantidad
                                })                    
                            }                    
                            this.$refs.items.setVentas(this.entradas, cliente);   
                            this.esFacturaDirecto = true;     
                            this.entrada.esFacturaDirecto = true;
                        }else{
                            this.entrada = {cliente_id: '', fechaentrada_id: '', num_factura: null, num_pedido: numero, fecha: '', fecha_factura: null, entradas: [], valor: 0, afectarInventario: false, modificarFactura: false, observaciones: null}
                            this.$refs.items.setVentas([], null);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            formatingDate(dateToFormat) {
                const d = new Date(dateToFormat);
                const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
                const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const year = d.getFullYear();
                return `${year}-${month}-${day}`;
            },
            getConsecutivo(){
                axios.get('/consecutivo-pedidos-calox')
                    .then(res => {
                        // console.log(res.data)
                        
                        document.getElementById('num_pedido').value = res.data[0].consecutivo + 1;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },            
            getLaboratorios(){
                axios.get('/laboratorios')
                    .then(res => {
                        res.data.map((el) => {                            
                            this.laboratorios.push({
                                text: el.Laboratorio,
                                value: el.id
                            });                            
                        })
                    })
            },  
            savePedido(pedido){

                let url = '';
                let method = '';

                Swal.showLoading();
                // console.log(pedido)
                if(this.entrada.esFacturaDirecto){

                    if(this.entrada.modificar){
                        url = `/pedidos-calox/${this.entrada.venta_id}`;
                        method = 'put';  
                        this.entrada.esFacturaDirecto = false;
                    }else{
                        url = (this.entrada.total_factura > 0) ? '/pedidos-calox' : `/pedidos-calox/${this.entrada.venta_id}`;
                        method = (this.entrada.total_factura > 0) ? 'post' : 'put';  
                    }

                }else{
                    url = '/pedidos-calox';
                    method = 'post';
                }
                this.entrada.valor = pedido.totalPedido;
                
                // this.entrada.esFacturaDirecto = pedido.esFacturaDirecto; 
                this.entrada.entradas = pedido.pedidos;
                // this.entrada.fecha = pedido.fecha;
                this.entrada.num_pedido = document.getElementById('num_pedido').value;
                this.entrada.cliente_id = pedido.cliente_id;
                // this.entrada.laboratorio_id = pedido.laboratorio_id;
                this.validar();
                if(this.return) return;
                console.log(this.entrada)
                axios({
                    method,
                    url,
                    data: this.entrada
                })
                    .then(res => {
                        
                        if(res.data === 'ok'){                           
                            Swal.fire({
                                icon: 'success',
                                title: 'Pedido agregado con exito!',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }else{
                            this.errores = res.data;
                        }
                    })
            },
            updatePedido(){
                Swal.showLoading()
                this.entrada.entradas = this.entradas;
                this.entrada.valor = this.totalFactura;
                
                if (this.entrada.num_pedido === '' || this.entrada.fecha === '' || this.entrada.entradas.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hay campos vacios (Numero de factura) / (Fecha) / (Productos)',
                    })
                    return;
                }

                axios.put(`/pedidos-calox/${this.entrada.id}`, this.entrada)
                    .then(res => {
                        if(res.data === 'ok'){
                           Swal.fire({
                                icon: 'success',
                                title: 'Modificacion exitosa!',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }else{
                            this.mensajeError = true;
                            this.errorEntrada = res.data;
                        }
                    })
            },
            validar(){

                this.return = false;

                if (this.entrada.entradas.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debe agregar productos',
                    })
                    this.return = true;
                }

                if(this.entrada.laboratorio_id === ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debe elegir un laboratorio',
                    })
                    this.return = true;
                }

                if(this.entrada.cliente_id === ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debe elegir un cliente',
                    })
                    this.return = true;
                }

                if(this.entrada.esFacturaDirecto){
                    if(this.entrada.num_factura === null || this.entrada.num_factura === undefined || this.entrada.num_factura === ''){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Numero de factura no valido',
                        })
                        this.return = true;
                    }
                }
            },
        },        
        components: {
            BasicSelect,
            ModelSelect
        }
    }
</script>
<style scoped>
    .fondo{
        background-color: #C3C3C3;
    }
</style>