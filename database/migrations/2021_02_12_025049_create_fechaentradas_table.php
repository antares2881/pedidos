<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFechaentradasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fechaentradas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('detalleproducto_id');
            $table->foreign('detalleproducto_id')->references('id')->on('detalleproductos');
            $table->integer('cantidad');
            $table->integer('adicionales');
            $table->double('precio_entrada', 14,2);
            $table->date('fecha');
            $table->string('numero_factura');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fechaentradas');
    }
}
