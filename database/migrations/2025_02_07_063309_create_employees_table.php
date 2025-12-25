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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('position_id');
            $table->string('code', 50);
            $table->string('name');
            $table->enum('category', ['daily', 'project'])->default('daily');
            $table->enum('type', ['exterior', 'interior', 'default'])->default('default');
            $table->string('phone', 20)->nullable();
            $table->mediumText('address')->nullable();
            $table->double('cashbon')->default(0);
            $table->double('salary')->default(0);
            $table->boolean('is_active')->default(true);

            // $table->foreign('position_id')
            //     ->references('id')
            //     ->on('positions')
            //     ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
