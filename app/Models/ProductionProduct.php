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
            'created_by' => 'integer',
            'updated_by' => 'integer',
        ];
    }

    protected $fillable  = [
        'production_id',
        'code',
        'notes',
        'status',
        'created_by',
        'updated_by',
    ];

    public function products()
    {
        return $this->hasMany(SaleProduct::class);
    }

    function productSync($products)
    {
        $this->products()->delete();

        foreach ($products as $product) {
            $this->products()->create([
                'product_id' => $product['product_id'],
                'product' => $product['product'],
                'color' => $product['color'],
                'quantity' => $product['quantity'],
                'complete_quantity' => $product['complete_quantity'],
                'complete_date' => $product['complete_date'],
            ]);
        }
    }

    public static function generateCode()
    {
        $latest = Product::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'PRDN' . $uniqueId;
        return $code;
    }
}
