<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    public function departamentos(){
        return $this->belongsTo(Departamento::class, 'departamento_id');
    }
}
