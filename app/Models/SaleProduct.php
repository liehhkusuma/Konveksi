<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleProduct extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'sale_id' => 'integer',
            'product_id' => 'integer',
        ];
    }

    protected $fillable  = [
        'sale_id',
        'product_id',
        'product',
        'color',
        'quantity',
        'price',
        'total_price'
    ];
}
