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
            ['id' => 1, 'code' => 'PRD1' . time(), 'name' => 'Pintu', 'price' => 0],
            ['id' => 2, 'code' => 'PRD2' . time(), 'name' => 'Jendela', 'price' => 0],
            ['id' => 3, 'code' => 'PRD3' . time(), 'name' => 'Fasad', 'price' => 0],
        ];

        // generate
        foreach ($products as $product) {
            $exist = Product::find($product['id']);
            if ($exist) {
                $exist->update($product);
            } else {
                Product::create($product);
            }
        }
    }
}
