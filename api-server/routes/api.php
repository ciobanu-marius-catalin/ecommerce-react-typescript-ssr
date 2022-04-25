<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;


Route::middleware(['auth:sanctum'])-> group(function () {

    Route::resource('admin/users', 'App\Http\Controllers\UserController');
    Route::resource('admin/posts', 'App\Http\Controllers\PostController');

});


Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
