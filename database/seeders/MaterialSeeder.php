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
            [
                'id' => 1,
                'code' => 'MTL0001',
                'distributor_id' => 1,
                'measurement_id' => 1,
                'category' => 'default',
                'name' => 'Katun',
                'price' => 0
            ],
            [
                'id' => 2,
                'code' => 'MTL0002',
                'distributor_id' => 1,
                'measurement_id' => 1,
                'category' => 'default',
                'name' => 'Kain',
                'price' => 0
            ],
            [
                'id' => 3,
                'code' => 'MTL0003',
                'distributor_id' => 1,
                'measurement_id' => 1,
                'category' => 'accessory',
                'name' => 'Pita Bross',
                'price' => 0
            ],
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
