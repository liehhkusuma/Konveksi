<?php

namespace Database\Seeders;

use App\Models\Configuration;
use Illuminate\Database\Seeder;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configurations = [
            ['id' => 1, 'slug' => 'website_name', 'name' => 'Website Name', 'data' => 'Convection'],
            ['id' => 2, 'slug' => 'email_host', 'name' => 'Email Host', 'data' => 'admin@gmail.com'],
            ['id' => 3, 'slug' => 'pagination', 'name' => 'Pagination', 'data' => '10'],
            ['id' => 4, 'slug' => 'ppn', 'name' => 'PPN', 'data' => '10'],
            ['id' => 5, 'slug' => 'pph', 'name' => 'PPH', 'data' => '11'],
        ];

        // generate
        foreach ($configurations as $configuration) {
            $exist = Configuration::where('slug', $configuration['slug'])->first();
            if (!$exist) {
                Configuration::create($configuration);
            }
        }
    }
}
