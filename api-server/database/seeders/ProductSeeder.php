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
        $movies = [];
        for($i = 1; $i < 10; $i++) {
            $movies = array_merge($movies, $this->getMovies($i));
        }
        DB::table('products')->insert($movies);

    }
//https://developers.themoviedb.org/3/movies/get-top-rated-movies
    public function getMovies($page = 1) {
        $url = sprintf("https://api.themoviedb.org/3/movie/top_rated?api_key=%s&page=%s", env('MOVIE_API_KEY'), $page);
        $data = json_decode(file_get_contents($url), true);

        echo gettype($data);

        $results = $data['results'];
        $movies = [];

        $posterBasePath = 'https://image.tmdb.org/t/p/original';
        foreach($results as $movie) {
            $movies[] = [
                'title' => $movie['title'] . ' DVD',
                'description' => $movie['overview'],
                'price' => rand(10, 500),
                'thumbnail' =>  $posterBasePath . $movie['backdrop_path']
            ];
        }

        return $movies;
    }
}
