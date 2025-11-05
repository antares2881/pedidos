<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transferencia extends Model
{
    public function clientes(){
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function estados(){
        return $this->belongsTo(Estado::class, 'estado_id');
    }

    public function factura(){
        return $this->hasOne(Factura::class, 'numero_transferencia', 'numero');
    }

    public function mayoristas(){
        return $this->belongsTo(Mayorista::class, 'mayorista_id');
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

    public function productos(){
        return $this->hasMany(Productotransferencia::class, 'transferencia_id');
    }
}
