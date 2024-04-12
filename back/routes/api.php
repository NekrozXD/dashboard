<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SocietyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\WorkhourController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\WorkhourlineController;

Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'store']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);
Route::get('departments',[DepartmentController::class,'index']);
Route::get('departments/{id}',[DepartmentController::class,'show']);
Route::post('departments',[DepartmentController::class,'store']);
Route::put('departments/{id}',[DepartmentController::class,'update']);
Route::delete('departments/{id}', [DepartmentController::class, 'destroy']);
Route::get('workhours-with-lines', [WorkhourController::class, 'getWorkhoursWithLines']);
Route::get('workhourlines/{workhourId}', [WorkhourlineController::class, 'getWorkhourLinesByWorkhourId']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Workhour Routes
Route::get('workhours', [WorkhourController::class, 'index']);
Route::post('workhours', [WorkhourController::class, 'store']);
Route::get('workhours/{workhour}', [WorkhourController::class, 'show']);
Route::put('workhours/{workhour}', [WorkhourController::class, 'update']);
Route::delete('workhours/{workhour}', [WorkhourController::class, 'destroy']);

// Workhourline Routes
Route::get('workhourlines', [WorkhourlineController::class, 'index']);
Route::post('workhourlines', [WorkhourlineController::class, 'store']);
Route::get('workhourlines/{workhourline}', [WorkhourlineController::class, 'show']);
Route::put('workhourlines/{workhourline}', [WorkhourlineController::class, 'update']);
Route::delete('workhourlines/{workhourline}', [WorkhourlineController::class, 'destroy']);

Route::resource('societies',SocietyController::class);

Route::get('/society',[DepartmentController::class,'society']);

Route::resource('departments',DepartmentController::class);

//employees
Route::get('employees', [EmployeeController::class, 'index']);
Route::post('employees', [EmployeeController::class, 'store']);
Route::get('employees/{id}', [EmployeeController::class, 'show']);
Route::put('employees/{id}', [EmployeeController::class, 'update']);
Route::delete('employees/{id}', [EmployeeController::class, 'destroy']);

//materials
Route::get('materials', [MaterialController::class, 'index']);
Route::post('materials', [MaterialController::class, 'store']);
Route::get('materials/{id}', [MaterialController::class, 'show']);
Route::patch('materials/{id}', [MaterialController::class, 'update']);
Route::delete('materials/{id}', [MaterialController::class, 'destroy']);

//dashboard
Route::get('liste', [DashboardController::class, 'index']);

