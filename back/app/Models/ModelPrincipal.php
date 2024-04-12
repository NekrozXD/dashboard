<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ModelPrincipal extends Model
{
    use HasFactory;

    public function convertir($date) {
        $carbonDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $date);
        $jour = $carbonDateTime->format('l');
        return $jour;
    }


    public function getAll() {
        $sql="SELECT wh.id AS id_work_hours, 
                wh.nom AS work_hours_nom,wh.total_hour,
                wh.delay_tolerance,
                wl.jour,
                wl.checkin_am AS checkin_am_workhourlines,
                wl.checkout_am AS checkout_am_workhourlines,
                wl.checkin_pm AS checkin_pm_workhourlines,
                wl.checkout_pm AS checkout_pm_workhourlines,
                e.id AS id_employees,
                e.name AS employee_name,
                e.firstname AS employee_firstname,
                p.checkin_am AS checkin_am_pointings,
                p.checkout_am AS checkout_am_pointings,
                p.checkin_pm AS checkin_pm_pointings,
                p.checkout_pm AS checkout_pm_pointings,
                p.id_employees AS id_emp
            FROM
                workhours wh
                INNER JOIN workhourlines wl ON wh.id = wl.id_work_hours
                INNER JOIN employees e ON wh.id = e.id_work_hours
                INNER JOIN pointings p ON e.id = p.id_employees";
        $data = DB::select($sql);
    
        $filteredData = [];
    
        foreach ($data as $row) {
            $jour = $this->convertir($row->checkin_am_pointings);
            if ($row->jour === $jour) {
                $filteredData[] = $row;
            }
        }
    
        return $filteredData;
    }
    

    


    public function take($id) {
        $sql="SELECT 
                wh.id AS id_work_hours, 
                wh.nom AS work_hours_nom,wh.total_hour,
                wh.delay_tolerance,
                wl.jour,
                wl.checkin_am AS checkin_am_workhourlines,
                wl.checkout_am AS checkout_am_workhourlines,
                wl.checkin_pm AS checkin_pm_workhourlines,
                wl.checkout_pm AS checkout_pm_workhourlines,
                e.id AS id_employees,
                e.name AS employee_name,
                e.firstname AS employee_firstname,
                p.checkin_am AS checkin_am_pointings,
                p.checkout_am AS checkout_am_pointings,
                p.checkin_pm AS checkin_pm_pointings,
                p.checkout_pm AS checkout_pm_pointings,
                p.id_employees AS id_emp
            FROM
                workhours wh
                INNER JOIN workhourlines wl ON wh.id = wl.id_work_hours
                INNER JOIN employees e ON wh.id = e.id_work_hours
                INNER JOIN pointings p ON e.id = p.id_employees
            where id_employees=$id and DATE(p.checkin_am) = CURRENT_DATE
            ";
        $data = DB::select($sql);
    
        $filteredData = [];
    
        foreach ($data as $row) {
            $jour = $this->convertir($row->checkin_am_pointings);
            if ($row->jour === $jour) {
                $filteredData[] = $row;
            }
        }
    
        return $filteredData;

    }

    public function retard() {
        $date = $this->getAll(); // Exemple d'une date donnée
        foreach ($date as $item) {
            $new = $item['checkin_am_pointings'];
            $hour= $item['checkin_am_workhourlines'];
        }

        $heure = Carbon::parse($new)->format('H:i:s'); // Parse la date et obtient uniquement l'heure
        
         // Heures à soustraire
        $heure1 = Carbon::createFromFormat('H:i:s',$hour);
        $heure2 = Carbon::createFromFormat('H:i:s', $heure);

        // Convertir les heures et les minutes en minutes
        $total_minutes1 = $heure1->hour * 60 + $heure1->minute;
        $total_minutes2 = $heure2->hour * 60 + $heure2->minute;

        // Soustraction des minutes
        $diff_minutes = $total_minutes1 - $total_minutes2;
        $tolerance= $this->take($id)->delay_tolerance;
        $valiny= $diff_minutes + $tolerance;
        // Affichage du résultat
        //echo "Différence : $diff_minutes minutes";
        return $valiny;
    }

    public function count_employee() {
        $count = DB::table('employees')->count();
        $count = intval($count);
        return $count;
    }
}
