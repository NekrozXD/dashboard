<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index () {
        $employees= Employee::all();
        $attendanceInfo = [];
        
        foreach ($employees as $employee) {
            $data1= $this->get()->take($employee->id_employees);
            
                if (count($data1) == 0) {
                    $presence = false; //absent
                    $absence = true; //absent
                    $retard= false; 
                    $value_retard= 'NULL';
                } else {
                    $presence = true; //présent
                    $absence = false; //présent
                    
                    foreach ($data1 as $pointing) {
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
                    } else {
                        $retard=false;
                        $value_retard='NULL';
                    }
               }
            }
            $attendanceInfo[] = [
                'employee' => $employee->name,
                'presence' => $presence,
                'absence' =>$absence,
                'retard' =>$retard,
                'value_retard' =>$value_retard,
            ];
        
        }
            dump($attendanceInfo);

    }
}
