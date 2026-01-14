<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProductionProduct extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'production_id' => 'integer',
            'product_id' => 'integer',
            'total_price' => 'double',
        ];
    }

    protected $fillable  = [
        'production_id',
        'product_id',
        'product',
        'color',
        'quantity',
        'complete_quantity',
        'complete_date',
    ];
}
