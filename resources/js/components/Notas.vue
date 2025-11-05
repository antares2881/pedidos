<template>
    <v-dialog
        v-model="dialogNotas"
        width="900"
        persistent
    >
        <v-card>
            <v-card-title class="justify-content-between">
                <div>
                    <h3>{{(editarNota)?'Editar':'Agregar'}} Nota</h3>
                </div>
                <div v-if="editarNota">
                    <v-btn
                        outlined
                        color="primary"
                        small
                    >
                        <a :href=" '/imprimir-notas/' +nota.id + '/' + nota.tipocliente " target="_blank" style="text-decoration:none;" title="Imprimir nota">
                            <v-icon>
                                mdi-printer
                            </v-icon>
                        </a>
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <div class="row">
                    <div class="col-md-6 cuadro">
                        <div>
                            <label for="numero">Numero nota</label>
                            <input type="number" class="form-control" id="numero"  v-model.number="nota.numero" />
                        </div>
                        <div>
                            <label for="fecha">Fecha nota</label>
                            <input type="date" id="fecha" class="form-control" v-model="nota.fecha">
                        </div>
                    </div>
                    <div class="col-md-6 cuadro">
                        <div class="d-flex justify-content-between">
                            <div>
                                Producto: {{nota.producto}}
                            </div>
                            <div>
                                <button class="btn btn-success" @click="agregar">Agregar</button>
                            </div>
                        </div>
                        <div>
                            <label for="cantidad">Cantidad</label>
                            <input type="number" class="form-control" v-model.number="nota.cantidad" id="cantidad">
                        </div>
                        <div>
                            <label for="precio">Precio</label>
                            <input type="number" class="form-control" id="precio" v-model.number="nota.precio">
                        </div>
                    </div>
                </div>
                <div class="row cuadro">
                    <div class="col-md-12">
                        <table class="table_nota">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>

                            <tbody v-if="editarNota">
                                <tr v-for="(item, index) in productos" :key="index">
                                    <td>{{item.productos.producto}} {{item.presentaciones.presentacion}}</td>
                                    <td>{{item.cantidad}}</td>
                                    <td>{{ item.precio_factura | currency }}</td>
                                    <td>{{ item.cantidad * item.precio_factura | currency }}</td>
                                    <td>
                                        <button class="btn btn-warning" @click="modificar(item, index)"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-danger" @click="quitar(index)"><i class="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr v-for="(item, index) in productos" :key="index">
                                    <td>{{item.productos.producto}} {{item.presentaciones.presentacion}}</td>
                                    <td>{{item.cantidad}}</td>
                                    <td>{{ (nota.tipocliente===1)?item.precio_factura:item.precio_entrada | currency }}</td>
                                    <td>{{ (nota.tipocliente===1)? Math.round(item.cantidad * item.precio_factura):Math.round(item.cantidad * item.precio_entrada) | currency }}</td>
                                    <td>
                                        <button class="btn btn-warning" @click="modificar(item, index)"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-danger" @click="quitar(index)"><i class="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row cuadro">
                    <div class="form-group col-md-6">
                        <label for="tiponota">Tipo de nota</label>
                        <select id="tiponota" v-model="nota.tipo" class="form-control">
                            <option value="NC">Nota Credito</option>
                            <option value="ND">Nota debito</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="concepto">Concepto: </label>
                        <input type="text" id="concepto" class="form-control" v-model="nota.concepto">
                    </div>
                    <div class="col-md-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="nota.inventario" id="inventario">
                            <label class="form-check-label" for="defaultCheck1">
                                Afectar inventario
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 cuadro">
                        <h5 v-if="nota.tipocliente === 2">{{nota.datos.lab}}</h5>
                        <p><strong>{{nota.datos.cliente}}</strong> <br>No. fact: {{nota.datos.num_fact}} <br>Fecha: {{nota.datos.fecha}}</p>
                    </div>
                    <div class="col-md-6 cuadro">
                        <p><strong>Saldo factura:</strong> {{nota.saldofactura | currency}} </p>
                        <p :class="{'text-danger': nota.saldofactura < nota.totalNota}"><strong>Total nota:</strong> {{nota.totalNota | currency}} </p>
                    </div>
                </div>
            </v-card-text>

            <v-card-actions class="justify-end">

                <v-btn
                    color="warning"
                    dark
                    @click="updateNota"
                    v-if="editarNota"
                >Actualizar</v-btn>
                <v-btn
                    color="primary"
                    dark
                    @click="saveNota"
                    v-else
                >Agregar</v-btn>
                <v-btn
                    color="secondary"
                    dark
                    @click="dialogNotas = false"
                >Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        data() {
            return {
                dialogNotas: false,
                editarNota: false,
                items: ['NC', 'ND'],
                nota: {tipo: null, concepto: null, documento_id: null, totalNota: 0, detalleproducto_id: null, inventario: false, datos: {lab: null, cliente: null, num_fact: null, fecha: null}},
                productos: [],

            }
        },
        methods: {
            add(item, tipocliente){
                // console.log(item)
                this.numeroNota()
                this.productos = []
                this.editarNota = false
                this.nota = {tipo: null, concepto: null, documento_id: null, detalleproducto_id: null, inventario: false, datos: {lab: null, cliente: null, num_fact: null, fecha: null, productos: []}}
                this.nota.tipocliente = tipocliente
                this.nota.saldofactura = item.saldo

                if(item.notas.length > 0){
                    this.editarNota = true
                    this.getProductos(item.notas[0].id)
                    this.nota.id = item.notas[0].id
                    this.nota.tipo = item.notas[0].tipo
                    this.nota.concepto = item.notas[0].concepto
                    this.nota.fecha = item.notas[0].fecha
                }else{
                    this.editarNota = false
                    this.getProductos(item.id)
                }

                this.dialogNotas = true
                this.nota.documento_id = item.id

                if(this.nota.tipocliente === 2){
                    this.nota.datos = {
                        cliente: item.cliente,
                        num_fact: item.numero_factura,
                        lab: item.laboratorio,
                        fecha: item.fecha_factura
                    }
                }else{
                    this.nota.datos = {
                        cliente: item.cliente,
                        num_fact: item.num_factura,
                        fecha: item.fecha
                    }
                }

            },
            agregar(){
                if(this.nota.detalleproducto_id === null){
                    Swal.fire({
                        icon: 'error',
                        title: 'No puedes agregar'
                    })
                    return
                }
                this.productos.push({
                    productos: {producto: this.nota.nombreproducto},
                    presentaciones: {presentacion: this.nota.presentacion},
                    detalleproducto_id: this.nota.detalleproducto_id,
                    cantidad: this.nota.cantidad,
                    precio_factura: this.nota.precio,
                    precio_entrada: this.nota.precio
                })

                this.calcularTotalNota()

                this.nota.detalleproducto_id = null
                this.nota.producto = null
                this.nota.cantidad = null
                this.nota.precio = null
            },
            calcularTotalNota(){

                let total = 0
                for (let i = 0; i < this.productos.length; i++) {
                    if(this.editarNota){
                        total += (this.productos[i].cantidad * this.productos[i].precio_factura)
                    }else{

                        if(this.nota.tipocliente === 1){
                            total += (this.productos[i].cantidad * this.productos[i].precio_factura)
                        }else{
                            total += (this.productos[i].cantidad * this.productos[i].precio_entrada)
                        }
                    }

                }

                this.nota.totalNota = total
            },
            getProductos(id){
                // console.log(id)
                let url = '';
                if(this.editarNota){
                    url = '/productos-nota'
                }else{

                    if(this.nota.tipocliente === 1){
                        url = '/productos-factura'
                    }else{
                        url = '/productos-ventas'
                    }

                }

                axios.get(`${url}/${id}`)
                    .then(res => {
                        // console.log(res.data)
                        this.productos = res.data
                        this.calcularTotalNota()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            isObjEmpty(obj) { //Comprueba si un objeto esta vacio
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) return false;
                }

                return true;
            },
            modificar(item, index){
                this.nota.nombreproducto = item.productos.producto
                this.nota.presentacion = item.presentaciones.presentacion
                this.nota.detalleproducto_id = item.detalleproducto_id
                this.nota.producto = item.productos.producto + ' ' + item.presentaciones.presentacion
                this.nota.cantidad = item.cantidad
                if(this.editarNota){
                    this.nota.precio = item.precio_factura
                }else{
                    this.nota.precio = (this.nota.tipocliente === 1)?item.precio_factura:item.precio_entrada
                }
                this.quitar(index)
            },
            numeroNota(){
                axios.get('/numero-nota')
                    .then(res => {
                        // console.log(res.data)
                        this.nota.numero = parseInt(res.data[0].numero) + 1
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            quitar(index){
                this.productos.splice(index, 1)
                this.calcularTotalNota()
            },
            saveNota(){
                // console.log(this.nota)
                if(this.nota.tipo === null || this.nota.totalNota === 0 || this.nota.concepto === null){
                    Swal.fire({
                        icon: "error",
                        title: "No puedes agregar notas con campos vacios."
                    })
                    return
                }
                if(this.productos.length === 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'No hay productos en la nota'
                    })
                    return
                }
                if(this.nota.totalNota > this.nota.saldofactura){
                    Swal.fire({
                        icon: 'error',
                        text: 'El valor de la nota no puede exceder el saldo de la factura.'
                    })
                    return
                }

                //Se hace para poder guardar cualquier nota con precio_factura.
                const productos = []
                for (let i = 0; i < this.productos.length; i++) {
                    let precio = 0
                    if(this.productos[i].precio_entrada){
                        precio = this.productos[i].precio_entrada
                    }else{
                        precio = this.productos[i].precio_factura
                    }
                    productos.push({
                        detalleproducto_id: this.productos[i].detalleproducto_id,
                        cantidad: this.productos[i].cantidad,
                        precio_factura: precio
                    })
                }
                this.nota.productos = productos

                axios.post('/notas', this.nota)
                    .then(res => {
                        // console.log(res.data)
                        if(res.data.status === 'success'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Nota creada con exito',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            updateNota(){
                if(this.productos.length > 0){
                    this.nota.productos = this.productos
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'No hay productos',
                        text: 'No puedes agregar una nota sin productos'
                    })
                    return
                }
                axios.put(`/notas/${this.nota.id}`, this.nota)
                    .then(res => {
                        if(res.data.status === 'success'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Nota actualizada con exito',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                // console.log(this.nota)

            }
        },
        computed: {
        },
    }
</script>
<style scoped>
    .cuadro{
        border: 1px solid #000;
    }
    .table_nota{
        width: 100%;
    }
    .table_nota tr{
        border: 1px solid #cecece;
    }
    .table_nota th, td{
        padding: 5px;
    }
</style>
