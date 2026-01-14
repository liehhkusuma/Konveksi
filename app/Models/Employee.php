<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            // 'position_id' => 'integer',
            'cashbon' => 'double',
            'salary' => 'double',
        ];
    }

    protected $fillable  = [
        // 'position_id',
        'code',
        'name',
        'category',
        'type',
        'phone',
        'cashbon',
        'salary',
        'address',
        'is_active',
    ];

    // public function position()
    // {
    //     return $this->belongsTo(Position::class, 'position_id');
    // }

    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
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
