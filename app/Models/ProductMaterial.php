<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductMaterial extends Model
{
    use HasFactory;

    protected $table = 'product_material';

    protected function casts(): array
    {
        return [
            'product_id' => 'integer',
            'material_id' => 'integer',
            'measurement_id' => 'integer',
        ];
    }

    protected $fillable  = [
        'product_id',
        'material_id',
        'measurement_id',
        'quantity',
        'price',
        'total_price',
        'notes',
    ];
}
