<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\ApiAuthController;

Route::post('/login',  [LoginController::class, 'login'])->name('login');
//Route::post('/register', RegisterController::class, 'logout');
//Route::post('/logout', LogoutController::class);
Route::group(['middleware' => 'auth'], function () {
    Route::resource('admin/users', 'App\Http\Controllers\UserController');
});

Route::resource('admin/posts', 'App\Http\Controllers\PostController');


Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
