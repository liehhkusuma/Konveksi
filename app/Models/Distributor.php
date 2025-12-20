<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distributor extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_active' => 'integer',
        ];
    }

    protected $fillable  = [
        'code',
        'name',
        'store',
        'phone',
        'address',
        'is_active',
    ];

    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function generateCode()
    {
        $latest = Distributor::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'DIS' . $uniqueId;
        return $code;
    }
}
