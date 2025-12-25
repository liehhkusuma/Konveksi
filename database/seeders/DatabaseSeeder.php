<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            PositionSeeder::class,
            PermissionSeeder::class,
            CustomerSeeder::class,
            MeasurementSeeder::class,
            RoleSeeder::class,
            EmployeeSeeder::class,
            ConfigurationSeeder::class,
            DistributorSeeder::class,
            MaterialSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
