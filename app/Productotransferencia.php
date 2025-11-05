<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Productotransferencia extends Model
{
    public function detalleproductos(){
        return $this->belongsTo(Detalleproducto::class, 'detalleproducto_id');
    }

    public function productos(){
        return $this->hasOneThrough(
            Producto::class,
            Detalleproducto::class,
            'id', 
            'id', 
            'detalleproducto_id', 
            'producto_id' 
        );
    }

    public function presentaciones(){
        return $this->hasOneThrough(
            Presentacione::class,
            Detalleproducto::class,
            'id', 
            'id', 
            'detalleproducto_id', 
            'presentacione_id' 
        );
    }
}
