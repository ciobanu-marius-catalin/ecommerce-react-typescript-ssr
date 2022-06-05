<?php

use App\Http\Controllers\Auth\{LoginController, RegisterController, LogoutController};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/register', [RegisterController::class, 'register'])->name('register');
Route::post('/logout', [LogoutController::class, 'logout'])->name('logout');

Route::group(['middleware' => 'auth'], function () {
    Route::resource('admin/users', 'App\Http\Controllers\UserController');
    Route::resource('admin/products', 'App\Http\Controllers\ProductController');
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/movies', [ProductController::class, 'movies']);

//Route::get('/posts', [PostController::class, 'index']);
//Route::get('/posts/{post}', [PostController::class, 'show']);
