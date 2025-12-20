<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
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
        'description',
        'is_active',
    ];

    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
