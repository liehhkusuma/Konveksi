<?php

namespace Database\Seeders;

use App\Models\Distributor;
use Illuminate\Database\Seeder;

class DistributorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Distributor::query()->delete();

        $distributors = [
            [
                'id' => 1,
                'code' => 'DIS0001',
                'name' => 'Rudeus',
                'store' => 'Favorit',
                'phone' => '08812387128',
                'address' => 'Jl. Merdeka No. 123, Jakarta',
                'is_active' => true
            ],
        ];

        // generate
        foreach ($distributors as $distributor) {
            $exist = Distributor::find($distributor['id']);
            if ($exist) {
                $exist->update($distributor);
            } else {
                Distributor::create($distributor);
            }
        }
    }
}
