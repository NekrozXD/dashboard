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
            // Pour chaque ligne, appelez la méthode convertir() avec la valeur de checkin_am_pointings
            $jour = $this->convertir($row->checkin_am_pointings);
            // Vérifiez si le jour de la semaine correspond à celui dans wl.jour
            if ($row->jour === $jour) {
                // Si le jour correspond, ajoutez la ligne à $filteredData
                $filteredData[] = $row;
            }
        }
    
        return $filteredData;
    }
    

    


    public function take($id) {
        $sql="SELECT wh.id AS id_work_hours, 
                wh.nom AS work_hours_nom,wh.total_hour,
                wh.delay_tolerance,
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
        $data=DB::select($sql);
        return $data;
    }
}
