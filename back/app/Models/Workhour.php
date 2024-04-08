<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workhour extends Model
{
    protected $fillable = ['nom', 'total_hour', 'delay_tolerance'];

    public function workhourlines()
    {
        return $this->hasMany(Workhourline::class, 'id_work_hours');
    }
}
