<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Detalleproducto extends Model
{
    public function productos(){
        return $this->belongsTo(Producto::class, 'producto_id');
    }

    public function presentaciones(){
        return $this->belongsTo(Presentacione::class, 'presentacione_id');
    }

    public function categorias(){
        return $this->hasOneThrough(
            Categoria::class,
            Producto::class,
            'id', 
            'id', 
            'producto_id', 
            'categoria_id' 
        );
        
    }

    public function fechaentrada(){
        return $this->hasMany(Fechaentrada::class, 'detalleproducto_id');
    }

    public function lista(){
        return $this->hasOne(Listaprecio::class, 'codigo', 'codigo');
    }

    public function pviejos(){
        return $this->hasOne(Pviejo::class, 'codigo', 'codigo');
    }

    public function psupermascotas(){
        return $this->hasOne(Psupermascota::class, 'codigo', 'codigo');
    }

    public function promocionesindirectos(){
        return $this->hasOne(Promocionesindirecto::class, 'codigo', 'codigo');
    }

}
