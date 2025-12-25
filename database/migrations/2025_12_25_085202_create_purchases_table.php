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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('distributor_id')->nullable();
            $table->string('code', 50)->unique();
            $table->date('purchase_date')->nullable();
            $table->double('discount')->default(0);
            $table->double('discount_amount')->default(0);
            $table->double('ppn')->default(0);
            $table->double('pph')->default(0);
            $table->double('sub_price')->default(0);
            $table->double('total_price')->default(0);
            $table->mediumText('notes')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();

            $table->foreign('distributor_id')
                ->references('id')
                ->on('distributors')
                ->onDelete('cascade');

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('updated_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
