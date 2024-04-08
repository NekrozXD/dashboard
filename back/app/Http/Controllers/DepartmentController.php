<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use Carbon\Carbon;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::with('society')->get();
        return response()->json(['departments' => $departments]);
    }
    

        public function store(Request $request)
        {
            $department = new Department();
            $department->coded = $request->coded;
            $department->description = $request->description;
            $department->id_societies = $request->id_societies;
            $department->created_at = Carbon::now(); 
            $department->save();
    
            return response()->json(['message' => 'Department created successfully', 'department' => $department]);
        }
    
        public function update(Request $request, $id)
        {
            $department = Department::find($id);
            $department->coded = $request->coded;
            $department->description = $request->description;
            $department->id_societies = $request->id_societies;
            $department->updated_at = Carbon::now(); 
            $department->save();
    
            return response()->json(['message' => 'Department updated successfully', 'department' => $department]);
        }
    

        public function destroy($id)
        {
            $department = Department::find($id);
            if (!$department) {
                return response()->json(['message' => 'Department not found'], 404);
            }
            $department->delete();
        
            return response()->json(['message' => 'Department deleted successfully']);
        }
        
    public function show($id)
    {
        $department = Department::find($id);
        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }
        return response()->json(['department' => $department]);
    }

}
