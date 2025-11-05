<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Porcentaje;
class PorcentajeController extends Controller
{
    public function index(){
        $porcentaje = Porcentaje::first();
        return $porcentaje;
    }


}
