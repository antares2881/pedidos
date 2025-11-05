<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Baseretencione;

class BaseretencioneController extends Controller
{
    public function show($anio){
        $retencion = Baseretencione::where('anio', $anio)->first();
        return $retencion;
    }
}
