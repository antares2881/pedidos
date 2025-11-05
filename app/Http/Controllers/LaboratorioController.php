<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Laboratorio;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class LaboratorioController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
    public function index(Request $request){
        $laboratorios = Laboratorio::orderBy('Laboratorio', 'asc')->get();
        if(!$request->ajax()) return view('admin.laboratorios.index', compact('laboratorios'));
        return $laboratorios;
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Laboratorio' => 'required|string|max:255|unique:laboratorios,Laboratorio',
            'prefijo' => 'required|string|size:3|unique:laboratorios,prefijo',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ], [
            'Laboratorio.required' => 'El nombre del laboratorio es requerido',
            'Laboratorio.unique' => 'Ya existe un laboratorio con este nombre',
            'prefijo.required' => 'El prefijo es requerido',
            'prefijo.size' => 'El prefijo debe tener exactamente 3 caracteres',
            'prefijo.unique' => 'Ya existe un laboratorio con este prefijo',
            'logo.image' => 'El archivo debe ser una imagen',
            'logo.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg, gif',
            'logo.max' => 'La imagen no puede ser mayor a 2MB'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->toArray()
            ], 422);
        }

        $data = [
            'Laboratorio' => $request->Laboratorio,
            'prefijo' => strtoupper($request->prefijo),
            'logo' => '/images/default-lab.png' // Imagen por defecto
        ];

        // Procesar imagen si se envió
        if ($request->hasFile('logo')) {
            $image = $request->file('logo');
            $imageName = time() . '_' . $request->prefijo . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('laboratorios', $imageName, 'public');
            $data['logo'] = '/laboratorio-image/' . $imageName;
        }

        $laboratorio = Laboratorio::create($data);

        return response()->json($laboratorio, 201);
    }
    
    public function update(Request $request, $id)
    {
        $laboratorio = Laboratorio::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'Laboratorio' => 'required|string|max:255|unique:laboratorios,Laboratorio,' . $id,
            'prefijo' => 'required|string|size:3|unique:laboratorios,prefijo,' . $id,
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ], [
            'Laboratorio.required' => 'El nombre del laboratorio es requerido',
            'Laboratorio.unique' => 'Ya existe un laboratorio con este nombre',
            'prefijo.required' => 'El prefijo es requerido',
            'prefijo.size' => 'El prefijo debe tener exactamente 3 caracteres',
            'prefijo.unique' => 'Ya existe un laboratorio con este prefijo',
            'logo.image' => 'El archivo debe ser una imagen',
            'logo.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg, gif',
            'logo.max' => 'La imagen no puede ser mayor a 2MB'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->toArray()
            ], 422);
        }

        $data = [
            'Laboratorio' => $request->Laboratorio,
            'prefijo' => strtoupper($request->prefijo)
        ];

        // Procesar imagen si se envió
        if ($request->hasFile('logo')) {
            // Eliminar imagen anterior si no es la por defecto
            if ($laboratorio->logo && $laboratorio->logo !== '/images/default-lab.png' && !str_contains($laboratorio->logo, '/images/')) {
                // Extraer el nombre del archivo de la URL
                $oldFilename = basename($laboratorio->logo);
                if (Storage::disk('public')->exists('laboratorios/' . $oldFilename)) {
                    Storage::disk('public')->delete('laboratorios/' . $oldFilename);
                }
            }
            
            $image = $request->file('logo');
            $imageName = time() . '_' . $request->prefijo . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('laboratorios', $imageName, 'public');
            $data['logo'] = '/laboratorio-image/' . $imageName;
        } elseif (!$laboratorio->logo) {
            // Si no tiene logo y no se envió uno, usar el por defecto
            $data['logo'] = '/images/default-lab.png';
        }

        $laboratorio->update($data);

        return response()->json(['status' => 'ok', 'laboratorio' => $laboratorio]);
    }
    
    public function getImage($filename)
    {
        $path = storage_path('app/public/laboratorios/' . $filename);
        
        if (!file_exists($path)) {
            // Si no existe la imagen, devolver la imagen por defecto
            $defaultPath = public_path('images/default-lab.png');
            if (file_exists($defaultPath)) {
                return response()->file($defaultPath);
            }
            abort(404);
        }
        
        return response()->file($path);
    }
    
    public function fixImagePaths()
    {
        $laboratorios = Laboratorio::where('logo', 'like', '/storage/laboratorios/%')->get();
        
        foreach ($laboratorios as $laboratorio) {
            $filename = basename($laboratorio->logo);
            $laboratorio->logo = '/laboratorio-image/' . $filename;
            $laboratorio->save();
        }
        
        return response()->json(['message' => 'Rutas de imágenes actualizadas', 'updated' => $laboratorios->count()]);
    }
}
