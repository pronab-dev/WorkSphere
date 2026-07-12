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
        Schema::create('menus', function (Blueprint $table) {
            $table->id();

            // Parent Menu (NULL = Main Menu)
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('menus')
                ->nullOnDelete()
                ->cascadeOnUpdate();

            // Menu Details
            $table->string('title', 100);
            $table->string('route', 255)->nullable();
            $table->string('icon', 100)->nullable();

            // Permission Key
            $table->string('permission_key', 100)->nullable();

            // Display Order
            $table->unsignedInteger('sort_order')->default(0);

            // Active / Inactive
            $table->boolean('status')->default(true);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
