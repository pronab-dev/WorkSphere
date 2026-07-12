<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuController;

// Admin Login
Route::post('/login', [AuthController::class, 'login']);

// Admin Logout
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);

// Admin Menu Management
Route::get('/menus', [MenuController::class, 'index']);
Route::post('/menus', [MenuController::class, 'store']);
Route::put('/menus/{menu}', [MenuController::class, 'update']);
Route::delete('/menus/{menu}', [MenuController::class, 'destroy']);
Route::middleware('auth:api')->get('/sidebar', [MenuController::class, 'sidebar']);
