<template>
    <v-app>       
        <div class="container-fluid mt-5">
            <div class="row" v-if="errores">
                <div class="col-12">
                    <b-alert show variant="danger">{{ errores }}</b-alert>
                </div>
            </div>
            <items-component tipo_cliente="1" @guardar="savePedido" v-if="showComponent" ref="itemComponent" >
                <template #title>Nueva transferencia</template>
            </items-component>            
        </div>
    </v-app>
</template>
<script>    
    export default {
        props: ["num"],
        data() {
            return {       
                editar: false,
                errores: null,
                showComponent: false,         
                pedido: {id: '', cliente_id: '', numero: '', fecha: '', pedidos: [], total: 0, tipolista_id: 1},
                productos: []
            }
        },
        mounted() {
            // this.getProductos();
            this.getConsecutivoTransferencia();
            if(this.num > 0){
                this.pedido.numero = this.num;
                this.findTransferencia();
                this.editar = true;
            }
            this.showComponent = true;
        },
        methods: {           
            
            facturar(){
                this.pedido.pedidos = this.pedidos;
                this.pedido.total = this.totalPedido;                
                this.$refs.facturar.confirmFactura(this.pedido);
            },
            findTransferencia(){
                this.item = {
                    value: '',
                    text: ''
                };
                this.producto = {id: '', producto: '', precio: 0, total: 0, cantidad: 0, stock: 0, entregar: 0, bonifica: 0, observacion: ''};
                this.msgProductoCombo = false;
                this.productosDeCombo = [];
                this.pedidos = [];
                this.totalPedido = 0;
                this.precioEditable = false;
                axios.get(`/numero-transferencia/${this.pedido.numero}`)
                    .then(res => {

                        if(res.data.length > 0){
                            // console.log(res.data)
                            if(res.data[0].estado_id === 2){
                                Swal.fire({
                                    icon: 'info',
                                    title: 'El pedido ya esta facturado'
                                });
                                this.getConsecutivoTransferencia()
                                return;
                            }else if(res.data[0].estado_id === 1){
                                this.pedido = {};
                                this.pedido = Object.assign({}, res.data[0]);
                                this.pedido.formapago_id = '';
                                this.pedido.mediopago_id = '';
                                this.pedido.numero_factura = '';
                                this.pedido.fecha_vencimiento = '';
                                this.pedido.fecha_factura = '';
                                this.pedido.hora_factura = '';
                                
                                this.itemCliente = {
                                    text: this.pedido.clientes.razon_social,
                                    value: this.pedido.cliente_id
                                }
                                axios.get(`/producto-transferencias/${res.data[0].id}`)
                                    .then(res => {

                                        this.transferencia = res.data;
                                        this.precioEditable = true;
                                        this.opcionFacturar = true;
                                        for (let i = 0; i < res.data.length; i++) {

                                            let vUnit =  res.data[i].precio;
                                            let vTotal = res.data[i].cantidad * vUnit;

                                            this.pedidos.push({
                                                id: res.data[i].detalleproducto_id,
                                                cantidad: res.data[i].cantidad,
                                                codigo: res.data[i].detalleproductos.codigo,
                                                precio: vUnit,
                                                entregar: res.data[i].entregados,
                                                bonificacion: res.data[i].bonificacion,
                                                producto: res.data[i].productos.producto+' - '+res.data[i].presentaciones.presentacion,
                                                total: vTotal,
                                            });
                                        }
                                        // this.calculaTotalPedido();
                                        console.log(this.pedidos)
                                        this.$refs.itemComponent.setTransferencia(this.pedidos, this.itemCliente);
                                        this.btnEdit = true;

                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }


                        }else{
                            this.btnEdit = false;
                            this.getConsecutivoTransferencia()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            },
            capitalizeFirstLetter(str) {
                return str[0].toUpperCase() + str.slice(1);
            },
            formatingDate(dateToFormat) {
                const d = new Date(dateToFormat);
                const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
                const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const year = d.getFullYear();
                return `${year}-${month}-${day}`;
            },
            getConsecutivoTransferencia(){
                axios.get('/consecutivo-transferencias')
                    .then(res => {
                        this.pedido.fecha = this.formatingDate(new Date());
                        this.pedido.numero = res.data[0].consecutivo + 1;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },            
            savePedido(pedido){
                // console.log(pedido)
                
                this.pedido.pedidos = pedido.pedidos;
                this.pedido.cliente_id = pedido.cliente_id;
                this.pedido.total = pedido.totalPedido;
                this.validar();
                if(this.return) return;

                // Si está editando, usar PUT para actualizar
                if(this.editar) {
                    axios.put(`/transferencias/${this.pedido.id}`, this.pedido)
                        .then(res => {
                            // console.log(res.data)
                            
                            if(res.data === 'ok'){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Transferencia actualizada con éxito',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    confirmButtonText: 'Aceptar'
                                }).then((result) => {
                                    if(result.value){
                                        window.location.href = '/gestionar-indirectos';
                                    }
                                })
                            }else{
                                this.errores = res.data;
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    // Si es nuevo, usar POST para crear
                    axios.post('/transferencias', this.pedido)
                        .then(res => {
                            // console.log(res.data)
                            
                            if(res.data === 'ok'){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Pedido guardado con exito',
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
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            
            validar(){

                this.return = false;

                if(this.pedido.cliente_id === ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debes agregar un cliente para realizar el pedido'
                    });
                    this.return = true;
                }
                if(this.pedido.numero === ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Numero de transferencia vacio'
                    });
                    this.return = true;
                }
                if(this.pedido.fecha === ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debes agregar una fecha de pedido'
                    });
                    this.return = true;
                }
                if(this.pedido.cliente_id === ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debes agregar un cliente para realizar el pedido'
                    });
                    this.return = true;
                }
                if(this.pedido.pedidos.length === 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Debes agregar productos al pedido'
                    });
                    this.return = true;
                }
            },
        }
    }
</script>
<style scoped>
    .v-progress-circular {
    margin: 1rem;
    }
</style>
