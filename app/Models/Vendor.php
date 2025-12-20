<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable  = [
        'name',
        'email',
        'phone',
        'description',
        'status',
        'join_date',
    ];

    protected $statuses = [
        'active',
        'inactive',
        'banned',
        'assesement'
    ];

    public static function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
