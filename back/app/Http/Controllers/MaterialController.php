<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index()
    {
        return Material::all();
    }
    

        public function store(Request $request)
        {
            $material = new Material();
            $material->name = $request->name;
            $material->serial_number = $request->serial_number;
            $material->ip_url = $request->ip_url;
            $material->login = $request->login;
            $material->password = $request->password;
            $material->created_at = Carbon::now(); 
            $material->save();

            return response()->json(['message' => 'Material created successfully', 'material' => $material]);
        }
    
        public function update(Request $request, $id)
        {
            $material = Material::find($id);
            $material->name = $request->name;
            $material->serial_number = $request->serial_number;
            $material->ip_url = $request->ip_url;
            $material->login = $request->login;
            $material->password = $request->password;
            $material->updated_at = Carbon::now(); 
            $material->save();
    
            return response()->json(['message' => 'Material updated successfully', 'material' => $material]);
        }
    

        public function destroy($id)
        {
            $material = Material::find($id);
            if (!$material) {
                return response()->json(['message' => 'Material not found'], 404);
            }
            $material->delete();
        
            return response()->json(['message' => 'Material deleted successfully']);
        }
        
    public function show($id)
    {
        $material = Material::find($id);
        if (!$material) {
            return response()->json(['message' => 'Material not found'], 404);
        }
        return response()->json(['material' => $material]);
    }

}
