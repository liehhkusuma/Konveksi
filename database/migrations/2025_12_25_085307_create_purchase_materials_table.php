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
        Schema::create('purchase_materials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('purchase_id')->nullable();
            $table->unsignedBigInteger('material_id')->nullable();
            $table->unsignedBigInteger('measurement_id')->nullable();
            $table->string('material', 150)->nullable();
            $table->string('measurement', 150)->nullable();
            $table->double('quantity')->default(0);
            $table->double('price')->default(0);
            $table->double('total_price')->default(0);

            $table->foreign('purchase_id')
                ->references('id')
                ->on('purchases')
                ->onDelete('cascade');

            $table->foreign('material_id')
                ->references('id')
                ->on('materials')
                ->onDelete('cascade');

            $table->foreign('measurement_id')
                ->references('id')
                ->on('measurements')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_materials');
    }
};
