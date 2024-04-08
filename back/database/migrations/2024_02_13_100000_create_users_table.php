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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->string('role');
            $table->unsignedBigInteger('id_employees');
            $table->unsignedBigInteger('id_departments');
            $table->unsignedBigInteger('id_societies');
            $table->timestamps();

            $table->foreign('id_employees')->references('id')->on('employees');
            $table->foreign('id_departments')->references('id')->on('departments');
            $table->foreign('id_societies')->references('id')->on('societies');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
