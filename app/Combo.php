<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Combo extends Model
{    

    public function detalleproductos(){
        return $this->hasOneThrough(
            Detalleproducto::class,
            Productoscombo::class,
            'id', // Foreign key on the cars table...
            'id', // Foreign key on the owners table...
            'productoscombo_id', // Local key on the mechanics table...
            'detalleproducto_id' // Local key on the cars table...
        );
    }

    public function detalle(){
        return $this->belongsTo(Detalleproducto::class, 'detalleproducto_id');
    }
    
    public function productos(){
        return $this->hasOne(Productoscombo::class, 'id', 'productoscombo_id');
    }
}
