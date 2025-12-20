<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'balance' => 'double',
        ];
    }

    protected $fillable  = [
        'code',
        'name',
        'store',
        'phone',
        'balance',
        'address',
        'is_active',
    ];

    public static function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public static function generateCode()
    {
        $latest = Employee::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'EMP' . $uniqueId;
        return $code;
    }
}
