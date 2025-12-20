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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->enum('type', ['item', 'service'])->default('item');
            $table->string('name', 200);
            $table->string('img')->nullable();
            $table->double('purchase_price')->default(0);
            $table->double('exterior_production_price')->default(0);
            $table->double('interior_production_price')->default(0);
            $table->double('price')->default(0);
            $table->boolean('is_active')->default(true);
            $table->mediumText('desc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
