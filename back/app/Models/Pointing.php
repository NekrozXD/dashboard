<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pointing extends Model
{
    protected $fillable = ['checkin_am', 'checkout_am','checkin_pm','checkout_pm','id_employees'];
}
