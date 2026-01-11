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
            'external_production_price' => 'double',
            'internal_production_price' => 'double',
            'price' => 'double',
            'is_active' => 'integer',
            'colors' => 'array',
        ];
    }

    protected $fillable  = [
        'code',
        'name',
        'img',
        'colors',
        'purchase_price',
        'packing_price',
        'other_price',
        'base_production_price',
        'external_production_price',
        'internal_production_price',
        'price',
        'is_active',
        'desc',
    ];

    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function materials()
    {
        return $this->hasMany(ProductMaterial::class);
    }

    function materialSync($materials)
    {
        $this->materials()->delete();

        foreach ($materials as $material) {
            $this->materials()->create([
                'material_id' => $material['material_id'],
                'measurement_id' => $material['measurement_id'],
                'quantity' => $material['quantity'],
                'price' => $material['price'],
                'total_price' => $material['price'] * $material['quantity'],
                'notes' => $material['notes'],
            ]);
        }
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
