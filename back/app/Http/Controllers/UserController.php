<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'required',
            'id_employees' => 'required',
            'id_societies' => 'required',
            'id_departments' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = bcrypt($request->input('password'));
            $user->role = $request->input('role');
            $user->id_employees = $request->input('id_employees');
            $user->id_societies = $request->input('id_societies');
            $user->id_departments = $request->input('id_departments');
            $user->save();

            return response()->json(['message' => 'User created successfully'], 201);
        } catch (\Exception $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
       
                return response()->json(['message' => 'User with this email already exists'], 400);
            } elseif ($errorCode == 1452) {
      
                return response()->json(['message' => 'Invalid employee, society, or department ID'], 400);
            } else {
   
                return response()->json(['message' => 'Failed to create user. Error: ' . $e->getMessage()], 500);
            }
        }
    }    

    public function show($id)
    {
        return User::find($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        $user->id_employees = $request->input('id_employees');
        $user->id_societies = $request->input('id_societies');
        $user->id_departments = $request->input('id_departments');
        $user->save();

        return response()->json(['message' => 'User updated successfully'], 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json(['message' => 'Authentication successful'], 200);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }
}
