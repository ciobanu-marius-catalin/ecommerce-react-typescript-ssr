<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Mmo\Faker\PicsumProvider;
use Faker\{Factory, Generator};


class FakerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {

            $this->app->singleton(Generator::class, function () {
                $faker = Factory::create();
                $faker->addProvider(new PicsumProvider($faker));
                return $faker;
            });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
