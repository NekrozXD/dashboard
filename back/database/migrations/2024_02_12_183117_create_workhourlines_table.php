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
        Schema::create('workhourlines', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('jour');
            $table->time('checkin_am');
            $table->time('checkout_am')->nullable();
            $table->time('checkin_pm')->nullable();
            $table->time('checkout_pm');
            $table->unsignedBigInteger('id_work_hours');
            $table->timestamps();

            $table->foreign('id_work_hours')->references('id')->on('workhours');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workhourlines');
    }
};
