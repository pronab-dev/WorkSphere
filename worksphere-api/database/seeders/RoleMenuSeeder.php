<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('role_menu')->insert([
            [
                'role_id'    => 1,
                'menu_id'    => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_id'    => 1,
                'menu_id'    => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_id'    => 1,
                'menu_id'    => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_id'    => 1,
                'menu_id'    => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_id'    => 1,
                'menu_id'    => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_id'    => 1,
                'menu_id'    => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
