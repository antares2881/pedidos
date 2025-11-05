<template>
    <v-dialog
        v-model="dialogPrecio"
        width="900"
    >
        <v-card>
            <v-card-title>
                <h3>Precios de entrada</h3>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-card-text>
                <h3>{{producto}}</h3>
                <v-data-table
                    :headers="headers"
                    :items="precios"
                    :search="search"
                >
                    <template v-slot:[`item.precio_entrada`]="{item}">
                        {{ item.precio_entrada | currency }}
                    </template>
                </v-data-table>
                <v-card-actions>
                    <v-btn color="dark" dark @click="dialogPrecio=false">cerrar</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return{
            dialogPrecio: false,
            headers: [
                {text: 'Factura', value: 'numero_factura'},
                {text: 'Fecha entrada', value: 'fecha_factura'},
                {text: 'Cantidad', value: 'cantidad'},
                {text: 'Adicionales', value: 'adicionales'},
                {text: 'Precio', value: 'precio_entrada'},
            ],
            precios: [],
            producto: null,
            search: ""
        }
    },
    methods:{
        formatoFecha(dateToFormat){
            const d = new Date(dateToFormat);
            const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
            const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
            const year = d.getFullYear();
            return `${year}-${month}-${day}`;
        },
        show(id, producto){
            axios.get(`/fechaentradas/${id}`)
                .then(res => {
                    console.log(res.data)
                    this.precios = res.data
                    this.producto = producto.producto
                    this.dialogPrecio = true
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>