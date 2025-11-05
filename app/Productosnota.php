<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Productosnota extends Model
{
    public function detalleProducto(){
        return $this->belongsTo(Detalleproducto::class, 'detalleproducto_id');
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
}
