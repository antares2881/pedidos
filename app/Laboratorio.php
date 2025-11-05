<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Laboratorio extends Model
{
    protected $table = 'laboratorios';
    
    protected $fillable = [
        'Laboratorio',
        'prefijo', 
        'logo'
    ];
    
    public $timestamps = true;
}
