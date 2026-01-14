<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Purchase extends Model
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
            'distributor_id' => 'integer',
            'created_by' => 'integer',
            'updated_by' => 'integer',
        ];
    }

    protected $fillable  = [
        'distributor_id',
        'code',
        'purchase_date',
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

    public function materials()
    {
        return $this->hasMany(PurchaseMaterial::class);
    }

    function materialSync($materials)
    {
        $this->materials()->delete();

        foreach ($materials as $material) {
            $this->materials()->create([
                'material_id' => $material['material_id'],
                'measurement_id' => $material['measurement_id'],
                'material' => $material['material'],
                'measurement' => $material['measurement'],
                'quantity' => $material['quantity'],
                'price' => $material['price'],
                'total_price' => $material['price'] * $material['quantity'],
            ]);
        }
    }

    public static function generateCode()
    {
        $latest = Purchase::latest()->first();
        $count = $latest->id ?? 0;
        $uniqueId = str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $code = 'PRC' . $uniqueId;
        return $code;
    }
}
