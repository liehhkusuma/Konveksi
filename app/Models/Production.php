<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Production extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'employee_id' => 'integer',
            'created_by' => 'integer',
            'updated_by' => 'integer',
        ];
    }

    protected $fillable  = [
        'employee_id',
        'code',
        'production_date',
        'notes',
        'status',
        'created_by',
        'updated_by',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function products()
    {
        return $this->hasMany(ProductionProduct::class);
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
                'complete_date' => isset($product['complete_date']) ? date('Y-m-d H:i:s', strtotime($product['complete_date'])) : null,
            ]);
        }
    }

    public static function generateCode()
    {
        $latest = Production::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'PRDN' . $uniqueId;
        return $code;
    }
}
