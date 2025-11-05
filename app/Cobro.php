<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cobro extends Model
{
    public function cliente(){
        return $this->hasOneThrough(
            Cliente::class,
            Factura::class,
            'id', 
            'id', 
            'factura_id', 
            'cliente_id'
        );
    }
    public function factura(){
        return $this->belongsTo(Factura::class, 'factura_id');
    }
}
