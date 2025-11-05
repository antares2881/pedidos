<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    public function categorias(){
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    public function detalle(){
        return $this->hasMany(Detalleproducto::class, 'producto_id');
    }

    public function presentaciones(){
        return $this->hasManyThrough(
            Presentacione::class,
            Detalleproducto::class,
            'producto_id', 
            'id', 
            'id', 
            'presentacione_id' 
        );
    }
}
