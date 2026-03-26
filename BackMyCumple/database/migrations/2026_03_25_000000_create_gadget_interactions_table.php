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
        Schema::create('gadget_interactions', function (Blueprint $box) {
            $box->id();
            $box->string('user_name');
            $box->string('gadget_type'); // memory_bread, magic_pocket, anywhere_door
            $box->text('content');
            $box->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gadget_interactions');
    }
};
