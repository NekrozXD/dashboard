<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with('workhour', 'society', 'department')->get();
        return response()->json(['employees' => $employees]);        
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'firstname' => 'required',
            // 'image'=>'required|image',
            'id_departments' => 'required',
            'id_societies' => 'required',
            'id_work_hours' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
        //     $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
        // Storage::disk('public')->putFileAs('employee/image', $request->image,$imageName);

            $employee = new Employee();
            $employee->name = $request->input('name');
            $employee->firstname = $request->input('firstname');
            // $employee->image = $imageName;
            $employee->id_departments = $request->input('id_departments');
            $employee->id_societies = $request->input('id_societies');
            $employee->id_work_hours = $request->input('id_work_hours');
            $employee->save();

            return response()->json(['message' => 'Employee created successfully'], 201);
        } catch (\Exception $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1452) {
      
                return response()->json(['message' => 'Invalid workhour, society, or department ID'], 400);
            } else {
   
                return response()->json(['message' => 'Failed to create employee. Error: ' . $e->getMessage()], 500);
            }
        }
    
}


    public function show($id)
    {
        return Employee::find($id);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        $employee->name = $request->input('name');
        $employee->firstname = $request->input('firstname');
        // if ($request->hasFile('image')) {
        //     // Remove old image if it exists
        //     if ($employee->image) {
        //         Storage::disk('public')->delete("employee/image/{$employee->image}");
        //     }

        //     // Save new image
        //     $logoName = Str::random() . '.' . $request->image->getClientOriginalExtension();
        //     $request->image->storeAs('employee/image', $logoName, 'public');
        //     $employee->image = $logoName;
        // }
        $employee->id_departments = $request->input('id_departments');
        $employee->id_societies = $request->input('id_societies');
        $employee->id_work_hours = $request->input('id_work_hours');
        $employee->save();

        return response()->json(['message' => 'Employee updated successfully'], 200);
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}