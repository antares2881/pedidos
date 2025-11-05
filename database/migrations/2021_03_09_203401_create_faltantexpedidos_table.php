<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFaltantexpedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faltantexpedidos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('detalleproducto_id');
            $table->foreign('detalleproducto_id')->references('id')->on('detalleproductos');
            $table->unsignedBigInteger('transferencia_id');
            $table->foreign('transferencia_id')->references('id')->on('transferencias');
            $table->integer('cantidad');
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
        Schema::dropIfExists('faltantexpedidos');
    }
}
