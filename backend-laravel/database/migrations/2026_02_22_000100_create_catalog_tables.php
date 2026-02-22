<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('brands', function (Blueprint $table): void {
            $table->id();
            $table->string('name', 100);
            $table->string('logo_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            $table->string('name', 200);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->integer('discount_percentage')->default(0);
            $table->string('image_url')->nullable();
            $table->string('image_url_1')->nullable();
            $table->string('image_url_2')->nullable();
            $table->string('image_url_3')->nullable();
            $table->string('image_url_4')->nullable();
            $table->string('image_url_5')->nullable();
            $table->json('additional_images')->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();
            $table->string('second_badge_text', 50)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('sliders', function (Blueprint $table): void {
            $table->id();
            $table->string('image_url');
            $table->string('title', 200)->nullable();
            $table->text('description')->nullable();
            $table->string('link')->nullable();
            $table->integer('order_position')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sliders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('brands');
    }
};
