<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'content' => $this->faker->text(4000),
            //used this faker library for random images: https://github.com/morawskim/faker-images.
            'featured_image' =>  $this->faker->picsumStaticRandomUrl(1920,1080),
            'thumbnail' =>  $this->faker->picsumStaticRandomUrl(640 ,360),
            'description' => $this->faker->sentence(),
            'author_id' => 1
        ];
    }

}
