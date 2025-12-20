<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Position::query()->delete();

        $positions = [
            ['id' => 1, 'name' => 'Jahit Dalam'],
            ['id' => 2, 'name' => 'Jahit Luar'],
        ];

        // generate
        foreach ($positions as $position) {
            $exist = Position::find($position['id']);
            if ($exist) {
                $exist->update($position);
            } else {
                Position::create($position);
            }
        }
    }
}
