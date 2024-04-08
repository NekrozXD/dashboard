<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['coded', 'description', 'id_societies'];

    public function society()
    {
        return $this->belongsTo(Society::class, 'id_societies');
    }
}
