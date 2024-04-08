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
        Schema::create('workhours', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom');
            $table->decimal('total_hour', 8, 2)->nullable();
            $table->integer('delay_tolerance');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workhours');
    }
};
