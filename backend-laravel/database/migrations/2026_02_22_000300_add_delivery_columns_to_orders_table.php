<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'delivery_zone')) {
                $table->string('delivery_zone')->default('inside')->after('delivery_address');
            }
            if (!Schema::hasColumn('orders', 'delivery_charge')) {
                $table->decimal('delivery_charge', 10, 2)->default(70)->after('delivery_zone');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'delivery_zone')) {
                $table->dropColumn('delivery_zone');
            }
            if (Schema::hasColumn('orders', 'delivery_charge')) {
                $table->dropColumn('delivery_charge');
            }
        });
    }
};
