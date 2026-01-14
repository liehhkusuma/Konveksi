<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sale extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'discount' => 'double',
            'discount_amount' => 'double',
            'ppn' => 'double',
            'pph' => 'double',
            'sub_price' => 'double',
            'total_price' => 'double',
            'seller_id' => 'integer',
            'created_by' => 'integer',
            'updated_by' => 'integer',
        ];
    }

    protected $fillable  = [
        'seller_id',
        'code',
        'sale_date',
        'discount',
        'discount_amount',
        'ppn',
        'pph',
        'sub_price',
        'total_price',
        'notes',
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
                'price' => $product['price'],
                'total_price' => $product['price'] * $product['quantity'],
            ]);
        }
    }

    public static function generateCode()
    {
        $latest = Sale::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'SL' . $uniqueId;
        return $code;
    }
}
