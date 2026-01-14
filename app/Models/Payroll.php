<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Payroll extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'minus' => 'double',
            'cashbon' => 'double',
            'tip' => 'double',
            'sub_price' => 'double',
            'total_price' => 'double',
            'employee_id' => 'integer',
            'created_by' => 'integer',
            'updated_by' => 'integer',
        ];
    }

    protected $fillable  = [
        'employee_id',
        'code',
        'payroll_date',
        'sub_price',
        'minus',
        'cashbon',
        'tip',
        'total_price',
        'remains',
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
        $latest = Payroll::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'PAY' . $uniqueId;
        return $code;
    }
}
