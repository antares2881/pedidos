<template>
    <v-app>
        <div class="container-fluid p-3" >   
            <!-- <b-breadcrumb :items="items"></b-breadcrumb>      -->
            <items-component tipo_cliente="1" :esFactura="true" :datosFactura="factura" @guardar="facturar" v-if="showComponent" ref="itemComponent">
                <template #title>Realizar factura</template>
            </items-component>   
        </div>
    </v-app>
</template>
<script>
    export default{
        props: ['factura'],
        data() {
            return {      
                items: [
                    {text: 'Regresar', href: '/informacion-pendientes'},
                    {text: 'Facturar', active: true},
                ],
                loader: true,                
                showComponent: false,
                
            }
        },
        mounted() {
            // console.log(this.pedido);
            this.showComponent = true;
        },
        methods: {
            facturar(){

            }
        },
    }
</script>
<style scoped>
    .info_fact{
        background: #fff !important;
        border-radius: 5px;
        margin: 10px;
        padding: 5px;
    }
</style>