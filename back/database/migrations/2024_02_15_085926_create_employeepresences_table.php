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
        Schema::create('employeepresences', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_employees');
            $table->date('date_now')->default(now());
            $table->date('date_presence')->default(null);
            $table->boolean('delay')->default(false);
            $table->boolean('absent')->default(false);
            $table->boolean('present')->default(false);
            $table->datetime('checkin_am');
            $table->datetime('checkout_am')->default(null);
            $table->datetime('checkin_pm')->default(null);
            $table->datetime('checkout_pm');
            $table->timestamps();
            
            $table->foreign('id_employees')->references('id')->on('employees');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employeepresences');
    }
};
