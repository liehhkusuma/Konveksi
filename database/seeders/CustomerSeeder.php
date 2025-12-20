<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customer::query()->delete();

        $customers = [
            ['id' => 1, 'code' => 'CUS1' . time(), 'name' => 'Google', 'phone' => '012317212', 'email' => 'google@gmail.com'],
            ['id' => 2, 'code' => 'CUS2' . time(), 'name' => 'Microsoft', 'phone' => '048528347', 'email' => 'microsoft@gmail.com'],
        ];

        // generate
        foreach ($customers as $customer) {
            $exist = Customer::find($customer['id']);
            if ($exist) {
                $exist->update($customer);
            } else {
                Customer::create($customer);
            }
        }
    }
}
