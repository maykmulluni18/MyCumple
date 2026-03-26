<?php

use App\Http\Controllers\GadgetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/gadget-interactions', [GadgetController::class, 'index']);
Route::post('/gadget-interactions', [GadgetController::class, 'store']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
