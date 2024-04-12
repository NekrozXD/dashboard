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
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('firstname');
            $table->text('image')->nullable();
            $table->unsignedBigInteger('id_departments');
            $table->unsignedBigInteger('id_societies');
            $table->unsignedBigInteger('id_work_hours');
            $table->timestamps();
            $table->foreign('id_departments')->references('id')->on('departments');
            $table->foreign('id_societies')->references('id')->on('societies');
            $table->foreign('id_work_hours')->references('id')->on('workhours');
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
