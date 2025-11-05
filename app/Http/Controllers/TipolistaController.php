<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tipolista;

class TipolistaController extends Controller
{
    public function index(){
        $tipolistas = Tipolista::all();
        return $tipolistas;
    }
}
