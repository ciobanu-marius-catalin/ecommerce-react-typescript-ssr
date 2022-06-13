<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert($this->getDummyProducts());

    }

    public function getDummyProducts() {
        $url = "https://fakestoreapi.com/products";
        $products = json_decode(file_get_contents($url), true);

        $result = [];


        foreach($products as $product) {
            $result[] = [
                'title' => $product['title'],
                'description' => $product['description'],
                'price' => $product['price'],
                'thumbnail' => $product['image'],
                'category' => $product['category']
            ];
        }

        return $result;
    }
}
