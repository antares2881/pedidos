<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCombosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productoscombos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('detalleproducto_id');
            $table->foreign('detalleproducto_id')->references('id')->on('detalleproductos');
            $table->timestamps();
        });
        Schema::create('combos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('detalleproducto_id');
            $table->foreign('detalleproducto_id')->references('id')->on('detalleproductos');
            $table->unsignedBigInteger('productoscombo_id');
            $table->foreign('productoscombo_id')->references('id')->on('productoscombos');
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
        Schema::dropIfExists('productoscombos');
        Schema::dropIfExists('combos');
    }
}
