<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'purchase_price' => 'double',
            'exterior_production_price' => 'double',
            'interior_production_price' => 'double',
            'price' => 'double',
            'is_active' => 'integer',
        ];
    }

    protected $fillable  = [
        'code',
        'name',
        'img',
        'purchase_price',
        'exterior_production_price',
        'interior_production_price',
        'price',
        'is_active',
        'desc',
    ];

    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function generateCode()
    {
        $latest = Product::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'PRD' . $uniqueId;
        return $code;
    }
}
