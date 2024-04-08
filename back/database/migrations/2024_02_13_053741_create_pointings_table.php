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
        Schema::create('pointings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->datetime('checkin_am');
            $table->datetime('checkout_am')->nullable();
            $table->datetime('checkin_pm')->nullable();
            $table->datetime('checkout_pm');
            $table->unsignedBigInteger('id_employees');
            $table->timestamps();

            $table->foreign('id_employees')->references('id')->on('employees');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pointings');
    }
};
