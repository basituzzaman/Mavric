<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\BrandController as AdminBrandController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\Admin\SliderController as AdminSliderController;
use App\Http\Controllers\Api\Admin\UploadController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SliderController;
use Illuminate\Support\Facades\Route;

Route::get('/products.php', [ProductController::class, 'index']);
Route::get('/brands.php', [BrandController::class, 'index']);
Route::get('/sliders.php', [SliderController::class, 'index']);
Route::post('/orders.php', [OrderController::class, 'store']);

Route::prefix('admin')->group(function (): void {
    Route::post('/login.php', [AuthController::class, 'login']);

    Route::middleware('admin.jwt')->group(function (): void {
        Route::get('/products.php', [AdminProductController::class, 'index']);
        Route::post('/products.php', [AdminProductController::class, 'store']);
        Route::put('/products.php', [AdminProductController::class, 'update']);
        Route::delete('/products.php', [AdminProductController::class, 'destroy']);

        Route::get('/orders.php', [AdminOrderController::class, 'index']);
        Route::put('/orders.php', [AdminOrderController::class, 'update']);
        Route::delete('/orders.php', [AdminOrderController::class, 'destroy']);

        Route::get('/brands.php', [AdminBrandController::class, 'index']);
        Route::post('/brands.php', [AdminBrandController::class, 'store']);
        Route::put('/brands.php', [AdminBrandController::class, 'update']);
        Route::delete('/brands.php', [AdminBrandController::class, 'destroy']);

        Route::get('/sliders.php', [AdminSliderController::class, 'index']);
        Route::post('/sliders.php', [AdminSliderController::class, 'store']);
        Route::put('/sliders.php', [AdminSliderController::class, 'update']);
        Route::delete('/sliders.php', [AdminSliderController::class, 'destroy']);

        Route::get('/dashboard.php', [DashboardController::class, 'index']);
        Route::post('/upload.php', [UploadController::class, 'store']);
    });
});
