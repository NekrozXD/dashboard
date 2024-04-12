<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\ModelPrincipal;

class DashboardController extends Controller
{
    public function get(){
        $data=new ModelPrincipal();
        return $data;
    }

    public function liste() {
        $liste = $this->get()->getAll();
        return response()->json(['liste' => $liste]);
    }

    public function index () {
        $employees= Employee::all();
        $attendanceInfo = [];
        $employee_total = $this->get()->count_employee();
        $employee_present = 0;
        $employee_non_retard = 0;
        $employee_retard = 0;
        foreach ($employees as $employee) {
            $data1= $this->get()->take($employee->id);
            
                if (count($data1) == 0) {
                    $presence = false; //absent
                    $absence = true; //absent
                    $retard= false; 
                    $value_retard= 'NULL';
                } else {
                    $presence = true; //présent
                    $absence = false; //présent
                    
                    
                    foreach ($data1 as $pointing) {

                    $employee_present = $employee_present + 1;

                    $checkin = $pointing->checkin_am_pointings;
                    $tolerance=$pointing->delay_tolerance;
                    $workHourLine=$pointing->checkin_am_workhourlines;
        
                    $heure = Carbon::parse($checkin)->format('H:i:s'); // Parse la date et obtient uniquement l'heure
        
                    $heure1 = Carbon::createFromFormat('H:i:s',$workHourLine);
                    $heure2 = Carbon::createFromFormat('H:i:s', $heure);

                    $total_minutes1 = $heure1->hour * 60 + $heure1->minute;
                    $total_minutes2 = $heure2->hour * 60 + $heure2->minute;

                    $diff_minutes = $total_minutes1 - $total_minutes2;
                    $valiny= $diff_minutes + $tolerance;
                    if ($valiny<0) {
                        $retard=true;
                        $value_retard= -$valiny; 
                        $employee_retard = $employee_retard + 1;
                    } else {
                        $retard=false;
                        $value_retard='NULL';
                        $employee_non_retard= $employee_non_retard + 1;
                    }
               }
            }
            $employee_absent= $employee_total - $employee_present;
            $attendanceInfo[] = [
                'id_employe'=>$employee->id,
                'employee' => $employee->name,
                'presence' => $presence,
                'absence' =>$absence,
                'retard' =>$retard,
                'value_retard' =>$value_retard,
            ];
        }
        return response()->json(['attendance'=>$attendanceInfo , 'employee_total'=>$employee_total, 'employee_present'=>$employee_present, 'employee_absent'=>$employee_absent, 'employee_non_retard'=>$employee_non_retard,
        'employee_retard'=>$employee_retard]);
    }
}
