<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_active' => 'integer',
        ];
    }

    protected $fillable  = [
        'name',
        'abbreviation',
        'is_active',
    ];

    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
