<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    public function clientes(){
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function cobros(){
        return $this->hasMany(Abonopedido::class, 'venta_id');
    }

    public function entradas(){
        return $this->hasMany(Fechaentrada::class, 'venta_id');
    }

    public function laboratorio(){
        return $this->belongsTo(Laboratorio::class, 'laboratorio_id');
    }

    public function municipios(){
        return $this->hasOneThrough(
            Municipio::class,
            Cliente::class,
            'id', // Foreign key on the cars table...
            'id', // Foreign key on the owners table...
            'cliente_id', // Local key on the mechanics table...
            'municipio_id' // Local key on the cars table...
        );
    }

    public function notas(){
        return $this->hasMany(Nota::class, 'documento_id');
    }

}
