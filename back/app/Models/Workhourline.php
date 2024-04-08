<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workhourline extends Model
{
    use HasFactory;

    protected $fillable = ['jour','checkin_am','checkout_am','checkin_pm','checkout_pm','id_work_hours'];
}
