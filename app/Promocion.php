<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promocion extends Model
{
    protected $table = 'promocions';
    
    protected $fillable = [
        'nombre_archivo',
        'archivo'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];
}