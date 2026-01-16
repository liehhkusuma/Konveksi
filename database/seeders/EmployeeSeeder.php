<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'name' => 'Hitogami',
                'category' => 'daily',
                'type' => 'internal',
                'phone' => '081237127321',
                'salary' => 50000,
            ],
            [
                'name' => 'Perugius',
                'category' => 'daily',
                'type' => 'external',
                'phone' => '081237127123',
                'salary' => 100000,
            ],
            [
                'name' => 'Rudeus',
                'category' => 'project',
                'type' => 'default',
                'phone' => '081237127345',
                'salary' => 25000,
            ],
        ];

        // generate
        foreach ($employees as $employee) {
            $exist = Employee::where('name', $employee['name'])->first();
            if (!$exist) {
                $employee['code'] = Employee::generateCode();
                $exist = Employee::create($employee);
            }
        }
    }
}
