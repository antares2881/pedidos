<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Promocion;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;

class PromocionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $promociones = Promocion::orderBy('created_at', 'desc')->paginate(10);
        
        if ($request->ajax()) {
            return response()->json([
                'success' => true,
                'data' => $promociones->items(),
                'current_page' => $promociones->currentPage(),
                'last_page' => $promociones->lastPage(),
                'per_page' => $promociones->perPage(),
                'total' => $promociones->total()
            ]);
        }

        return view('promociones.index');
    }

    public function importarExcel(Request $request)
    {
        try {
            $request->validate([
                'archivo_excel' => 'required|file|mimes:xlsx,xls,csv|max:10240', // Max 10MB
                'nombre_archivo' => 'required|string|max:255'
            ]);

            $archivo = $request->file('archivo_excel');
            $nombreArchivo = $request->input('nombre_archivo');
            
            // Generar un nombre único para el archivo
            $nombreUnico = time() . '_' . $archivo->getClientOriginalName();
            
            // Guardar el archivo en storage/app/promociones
            $rutaArchivo = $archivo->storeAs('promociones', $nombreUnico);
            
            // Guardar en la base de datos
            $promocion = Promocion::create([
                'nombre_archivo' => $nombreArchivo,
                'archivo' => $rutaArchivo
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Archivo guardado correctamente',
                'data' => $promocion
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al guardar el archivo: ' . $e->getMessage()
            ], 500);
        }
    }

    public function descargarArchivo($id)
    {
        try {
            $promocion = Promocion::findOrFail($id);
            
            if (!Storage::exists($promocion->archivo)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo no encontrado'
                ], 404);
            }

            return Storage::download($promocion->archivo, $promocion->nombre_archivo);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al descargar el archivo: ' . $e->getMessage()
            ], 500);
        }
    }

    public function visualizarArchivo($id)
    {
        try {
            $promocion = Promocion::findOrFail($id);
            
            if (!Storage::exists($promocion->archivo)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo no encontrado en el servidor'
                ], 404);
            }

            $filePath = Storage::path($promocion->archivo);
            
            // Verificar que el archivo físico existe
            if (!file_exists($filePath)) {
                return response()->json([
                    'success' => false,
                    'message' => 'El archivo físico no existe'
                ], 404);
            }

            // Leer el archivo Excel y convertirlo a array
            $spreadsheet = IOFactory::load($filePath);
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray();

            // Limpiar datos nulos o vacíos
            $cleanRows = [];
            foreach ($rows as $row) {
                $cleanRow = [];
                foreach ($row as $cell) {
                    $cleanRow[] = $cell !== null ? (string)$cell : '';
                }
                $cleanRows[] = $cleanRow;
            }

            // Obtener información del archivo
            $fileInfo = [
                'nombre' => $promocion->nombre_archivo,
                'fecha_subida' => $promocion->created_at->format('d/m/Y H:i'),
                'filas' => count($cleanRows),
                'columnas' => !empty($cleanRows) ? count($cleanRows[0]) : 0
            ];

            return response()->json([
                'success' => true,
                'data' => $cleanRows,
                'info' => $fileInfo
            ]);

        } catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al leer el archivo Excel: ' . $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al visualizar el archivo: ' . $e->getMessage()
            ], 500);
        }
    }
}