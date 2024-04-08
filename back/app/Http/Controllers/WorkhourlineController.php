<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Workhourline;

class WorkhourlineController extends Controller
{
    public function index()
    {
        $workhourlines = Workhourline::all();
        return response()->json(['workhourlines' => $workhourlines]);
    }
    public function getWorkhourLinesByWorkhourId($workhourId)
    {
        $workhourlines = Workhourline::where('id_work_hours', $workhourId)->get();
        return response()->json(['workhourlines' => $workhourlines]);
    }
    

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'jour' => 'required|string',
            'checkin_am' => 'required|string',
            'checkout_am' => 'required|string',
            'checkin_pm' => 'required|string',
            'checkout_pm' => 'required|string',
            'id_work_hours' => 'required|numeric',
        ]);

        $workhourline = new Workhourline();
        $workhourline->jour = $validatedData['jour'];
        $workhourline->checkin_am = $validatedData['checkin_am'];
        $workhourline->checkout_am = $validatedData['checkout_am'];
        $workhourline->checkin_pm = $validatedData['checkin_pm'];
        $workhourline->checkout_pm = $validatedData['checkout_pm'];
        $workhourline->id_work_hours = $validatedData['id_work_hours'];
        $workhourline->created_at = now();
        $workhourline->updated_at = now();
        $workhourline->save();

        return response()->json(['message' => 'Workhourline created successfully', 'workhourline' => $workhourline], 201);
    }

    public function show(Workhourline $workhourline)
    {
        return response()->json(['workhourline' => $workhourline]);
    }

    public function update(Request $request, Workhourline $workhourline)
    {
        $validatedData = $request->validate([
            'jour' => 'required|string',
            'checkin_am' => 'required|string',
            'checkout_am' => 'required|string',
            'checkin_pm' => 'required|string',
            'checkout_pm' => 'required|string',
            'id_work_hours' => 'required|numeric',
        ]);

        $workhourline->update($validatedData);

        return response()->json(['message' => 'Workhourline updated successfully', 'workhourline' => $workhourline]);
    }

    public function destroy(Workhourline $workhourline)
    {
        $workhourline->delete();

        return response()->json(['message' => 'Workhourline deleted successfully']);
    }
}
