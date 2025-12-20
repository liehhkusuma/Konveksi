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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('material_category_id')->nullable();
            $table->unsignedBigInteger('distributor_id')->nullable();
            $table->unsignedBigInteger('measurement_id')->nullable();
            $table->string('code', 50)->unique();
            $table->enum('type', ['item', 'service'])->default('item');
            $table->string('name', 150)->nullable();
            $table->double('price')->default(0);
            $table->boolean('is_active')->default(true);

            $table->foreign('material_category_id')
                ->references('id')
                ->on('material_categories')
                ->onDelete('cascade');

            $table->foreign('distributor_id')
                ->references('id')
                ->on('distributors')
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
        Schema::dropIfExists('materials');
    }
};
