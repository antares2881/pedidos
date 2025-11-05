<template>
    <div>
        <div class="container-fluid  dashboard-content">
            <div class="row">
                <div class="col-md-6">
                    <label for="">Fecha vencimiento</label>
                    <input type="date" class="form-control" v-model="f_ven">
                </div>
                <div class="col-md-12">
                    <a :href="'/generar-excel-cartera/' + f_ven" class="btn btn-success mt-3" target="_blank"><i class="fas fa-file-excel mr-2"></i>Generar</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                f_ven: null
            }
        },
        mounted() {
            this.setFecha();
        },
        methods: {
            formatingDate(dateToFormat) {
                const d = new Date(dateToFormat);
                const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
                const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const year = d.getFullYear();
                return `${year}-${month}-${day}`;
            },
            setFecha(){
                this.f_ven = this.formatingDate(new Date());
            }
        },  
    }
</script>