<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            if (!Schema::hasColumn('products', 'product_code')) {
                $table->string('product_code', 100)->nullable()->after('name');
            }

            if (!Schema::hasColumn('products', 'features')) {
                $table->json('features')->nullable()->after('additional_images');
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            if (Schema::hasColumn('products', 'features')) {
                $table->dropColumn('features');
            }

            if (Schema::hasColumn('products', 'product_code')) {
                $table->dropColumn('product_code');
            }
        });
    }
};
