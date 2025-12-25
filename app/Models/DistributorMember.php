<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistributorMember extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'distributor_id' => 'integer',
        ];
    }

    protected $fillable  = [
        'distributor_id',
        'name',
        'phone',
    ];
}
