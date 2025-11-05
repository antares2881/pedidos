<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Categoria;

class CategoriaController extends Controller
{
    public function index(){
        $categorias = Categoria::orderBy('categoria', 'asc')->get();
        return $categorias;
    }
}
