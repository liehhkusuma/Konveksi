<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseMaterial extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'purchase_id' => 'integer',
            'material_id' => 'integer',
            'measurement_id' => 'integer',
        ];
    }

    protected $fillable  = [
        'product_id',
        'material_id',
        'measurement_id',
        'material',
        'measurement',
        'quantity',
        'price',
        'total_price'
    ];
}
