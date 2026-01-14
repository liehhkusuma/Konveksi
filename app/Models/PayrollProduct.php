<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PayrollProduct extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'quantity' => 'double',
            'price' => 'double',
            'total_price' => 'double',
            'payroll_id' => 'integer',
            'production_id' => 'integer',
            'product_id' => 'integer',
        ];
    }

    protected $fillable  = [
        'payroll_id',
        'production_id',
        'product_id',
        'product',
        'color',
        'quantity',
        'price',
        'total_price',
    ];
}
