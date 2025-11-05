<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Productoscombo extends Model
{

    public function combos(){
        return $this->belongsTo(Combo::class, 'id', 'productoscombo_id');
    }

    public function detallecombo(){
        return $this->hasOneThrough(
            Detalleproducto::class,
            Combo::class,
            'productoscombo_id', 
            'id', 
            'id', 
            'detalleproducto_id' 
        );
    }

    public function detalleproductos(){
        return $this->hasOne(Detalleproducto::class, 'id', 'detalleproducto_id');
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
