<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable  = [
        'code',
        'type',
        'name',
        'phone',
        'email',
        'logo',
        'website',
        'address',
        'is_active',
    ];

    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function generateCode()
    {
        $latest = Customer::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'BP' . $uniqueId;
        return $code;
    }
}
