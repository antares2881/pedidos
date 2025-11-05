<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Faltantexcliente extends Model
{
    public function detalleproducto(){
        return $this->belongsTo(Detalleproducto::class, 'detalleproducto_id');
    }
    public function presentacion(){
        return $this->hasOneThrough(
            Presentacione::class,
            Detalleproducto::class,
            'id', 
            'id', 
            'detalleproducto_id', 
            'presentacione_id' 
        );
    }
    public function producto(){
        return $this->hasOneThrough(
            Producto::class,
            Detalleproducto::class,
            'id', 
            'id', 
            'detalleproducto_id', 
            'producto_id' 
        );
    }
}
