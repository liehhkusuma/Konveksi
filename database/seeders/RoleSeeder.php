<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::query()->delete();

        $roles = [
            ['id' => 1, 'title' => 'Employee'],
        ];

        // generate
        foreach ($roles as $role) {
            $exist = Role::find($role['id']);
            if ($exist) {
                $exist->update($role);
            } else {
                $exist = Role::create($role);
            }

            $exist->permissions()->sync([25, 26, 27, 28, 29, 30]);
        }
    }
}
