<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => 'Movie ' . $this->faker->sentence(3),
            'description' => $this->faker->text(200),
            'price' => $this->faker->numberBetween(10, 1000),
            //used this faker library for random images: https://github.com/morawskim/faker-images.
            'thumbnail' =>  $this->faker->picsumStaticRandomUrl(640 ,360),
        ];
    }

}
