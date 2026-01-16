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
        Schema::create('production_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('production_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->string('product', 150)->nullable();
            $table->string('color', 150)->nullable();
            $table->double('quantity')->default(0);
            $table->double('complete_quantity')->default(0);
            $table->double('price')->default(0);
            $table->double('total_price')->default(0);
            $table->date('complete_date')->nullable();

            $table->foreign('production_id')
                ->references('id')
                ->on('productions')
                ->onDelete('cascade');

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_products');
    }
};
