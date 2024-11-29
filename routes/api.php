<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('tasks', TaskController::class);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

require __DIR__.'/auth.php';