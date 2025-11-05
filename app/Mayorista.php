<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mayorista extends Model
{
    public function departamento()
    {
        return $this->hasOneThrough(
            Departamento::class,
            Municipio::class,
            'id', // Foreign key on the cars table...
            'id', // Foreign key on the owners table...
            'municipio_id', // Local key on the mechanics table...
            'departamento_id' // Local key on the cars table...
        );
    }

    public function municipio(){
        return $this->belongsTo(Municipio::class, 'municipio_id');
    }
}
