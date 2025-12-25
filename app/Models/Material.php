<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            // 'material_category_id' => 'integer',
            'distributor_id' => 'integer',
            'measurement_id' => 'integer',
            'price' => 'double',
            'is_active' => 'integer',
        ];
    }

    protected $fillable  = [
        // 'material_category_id',
        'distributor_id',
        'measurement_id',
        'code',
        'category',
        'name',
        'type',
        'price',
        'is_active',
    ];


    // public function category()
    // {
    //     return $this->belongsTo(MaterialCategory::class, 'material_category_id');
    // }

    public function distributor()
    {
        return $this->belongsTo(Distributor::class, 'distributor_id');
    }

    public function measurement()
    {
        return $this->belongsTo(Measurement::class, 'measurement_id');
    }

    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function generateCode()
    {
        $latest = Material::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'MAT' . $uniqueId;
        return $code;
    }
}
