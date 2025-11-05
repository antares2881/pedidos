<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePromocionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('promocions')) {
            Schema::create('promocions', function (Blueprint $table) {
                $table->id();
                $table->string('nombre_archivo');
                $table->string('archivo'); // Ruta del archivo almacenado
                $table->timestamps();
            });
        } else {
            Schema::table('promocions', function (Blueprint $table) {
                if (!Schema::hasColumn('promocions', 'nombre_archivo')) {
                    $table->string('nombre_archivo');
                }
                if (!Schema::hasColumn('promocions', 'archivo')) {
                    $table->string('archivo');
                }
                if (!Schema::hasColumn('promocions', 'created_at')) {
                    $table->timestamps();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promocions');
    }
}