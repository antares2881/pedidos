<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use App\User;

class UserController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function index(Request $request){
        if($request->ajax()){
            $users = DB::table('users AS u')
            ->leftJoin('clientes AS c', 'u.cliente_id', '=', 'c.id')
            ->select('u.id', 'u.name', 'u.email', 'u.role_id', 'c.id AS cliente_id')
            ->get();
            // $users = User::all();
            return $users;
        }else{
            return view('admin.usuarios.index');
        }
    }

    public function getUser(){
        $user = User::find(Auth::user()->id);
        return $user;
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'role_id' => 'required',
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {    
            return response()->json($validator->messages(), 200);
        }

        $user = new User();
        $user->role_id = $request->role_id;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        return 'ok';
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'role_id' => 'required',
            'cliente_id' => 'required',
            'name' => 'required',
            'email' => 'required'
        ]);

        if ($validator->fails()) {    
            return response()->json($validator->messages(), 200);
        }

        $user = User::find($id);
        $user->role_id = $request->role_id;
        $user->cliente_id = $request->cliente_id;
        $user->name = $request->name;
        $user->email = $request->email;

        $user->save();

        return 'ok';
    }

    public function update_password(){
        return view('auth.passwords.reset');
    }

    public function reset_password(Request $request){

        $validator = \Validator::make($request->all(), [
            'password' => 'required|string|min:8|confirmed'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $user = User::where('email', Auth::user()->email)->first();
        $user->password = Hash::make($request->password);

        $user->save();

        return redirect()->route('updatePassword');
    }
}
