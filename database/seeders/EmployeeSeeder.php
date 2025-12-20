<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'username' => 'hitogami',
                'name' => 'Hitogami',
                'email' => 'hitogami@gmail.com',
                'password' => Hash::make('admin'),
            ],
            [
                'username' => 'rifana',
                'name' => 'Rifana',
                'email' => 'rifana@gmail.com',
                'password' => Hash::make('admin'),
            ],
            [
                'username' => 'ace',
                'name' => 'Ace',
                'email' => 'ace@gmail.com',
                'password' => Hash::make('admin'),
            ],
        ];

        // generate
        foreach ($users as $user) {
            $exist = User::create($user);
            $exist->roles()->sync([1]);
        }
    }
}
