<?php

namespace Database\Seeders;

use App\Models\Seller;
use Illuminate\Database\Seeder;

class SellerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Seller::query()->delete();

        $sellers = [
            [
                'id' => 1,
                'code' => 'DIS0001',
                'name' => 'Teh Debi',
                'store' => 'Queen Bags',
                'phone' => '08812387128',
                'balance' => 0,
                'address' => 'Jl. Merdeka No. 123, Jakarta',
                'is_active' => true
            ],
        ];

        // generate
        foreach ($sellers as $seller) {
            $exist = Seller::find($seller['id']);
            if ($exist) {
                $exist->update($seller);
            } else {
                Seller::create($seller);
            }
        }
    }
}
