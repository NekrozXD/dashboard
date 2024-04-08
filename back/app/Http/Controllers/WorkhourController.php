<?php

namespace App\Http\Controllers;

use App\Models\Workhour;
use App\Models\Workhourline;

use Illuminate\Http\Request;

class WorkhourController extends Controller
{
    public function index()
    {
        return Workhour::all();
    }
    public function getWorkhoursWithLines()
    {
        $workhours = Workhour::all();
        $workhourlines = Workhourline::all();
        return response()->json(['workhours' => $workhours, 'workhourlines' => $workhourlines]);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string',
            'total_hour' => 'required|numeric',
            'delay_tolerance' => 'required|numeric',
        ]);

        return Workhour::create($validatedData);
    }

    public function show(Workhour $workhour)
    {
        return $workhour;
    }

    public function update(Request $request, Workhour $workhour)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string',
            'total_hour' => 'required|numeric',
            'delay_tolerance' => 'required|numeric',
        ]);

        $workhour->update($validatedData);

        return $workhour;
    }

    public function destroy(Workhour $workhour)
    {
        $workhour->delete();

        return response()->json(['message' => 'Workhour deleted successfully']);
    }
}
