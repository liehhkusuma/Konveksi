<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::query()->delete();

        $products = [
            [
                'id' => 1,
                'code' => 'PRD1' . time(),
                'name' => 'Tas Polos',
                'purchase_price' => 15000,
                'price' => 20000,
            ],
        ];

        // generate
        foreach ($products as $product) {
            $exist = Product::find($product['id']);
            if ($exist) {
                $exist->update($product);
            } else {
                $product = Product::create($product);
                $product->materialSync([
                    [
                        'material_id' => 1,
                        'measurement_id' => 1,
                        'quantity' => 2,
                        'price' => 15000,
                        'notes' => 'Done Payment',
                    ],
                ]);
            }
        }
    }
}
