<?php

namespace Database\Seeders;

use App\Models\Measurement;
use Illuminate\Database\Seeder;

class MeasurementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Measurement::query()->delete();

        $measurements = [
            ['id' => 1, 'name' => 'Pices', 'abbreviation' => 'pcs'],
            ['id' => 2, 'name' => 'Lusin', 'abbreviation' => 'lusin'],
        ];

        // generate
        foreach ($measurements as $measurement) {
            $exist = Measurement::find($measurement['id']);
            if ($exist) {
                $exist->update($measurement);
            } else {
                Measurement::create($measurement);
            }
        }
    }
}
