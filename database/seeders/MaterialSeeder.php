<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Material::query()->delete();

        $materials = [
            ['id' => 1, 'code' => 'MTL1' . time(), 'measurement_id' => 1, 'type' => 'item', 'name' => 'Kaca', 'price' => 0],
            ['id' => 2, 'code' => 'MTL2' . time(), 'measurement_id' => 1, 'type' => 'item', 'name' => 'Alumunium', 'price' => 0],
            ['id' => 3, 'code' => 'MTL3' . time(), 'measurement_id' => 1, 'type' => 'service', 'name' => 'Fix Kaca', 'price' => 0],
        ];

        // generate
        foreach ($materials as $material) {
            $exist = Material::find($material['id']);
            if ($exist) {
                $exist->update($material);
            } else {
                Material::create($material);
            }
        }
    }
}
