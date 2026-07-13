<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        DB::table('menus')->insert([
            [
                'parent_id'      => null,
                'title'          => 'Dashboard',
                'route'          => '/admin/dashboard',
                'icon'           => 'LayoutDashboard',
                'permission_key' => 'dashboard.view',
                'sort_order'     => 1,
                'status'         => 1,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'parent_id'      => null,
                'title'          => 'Employee',
                'route'          => null,
                'icon'           => 'Users',
                'permission_key' => 'employee.view',
                'sort_order'     => 2,
                'status'         => 1,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'parent_id'      => 2,
                'title'          => 'Employee List',
                'route'          => '/admin/employees',
                'icon'           => null,
                'permission_key' => 'employee.list',
                'sort_order'     => 1,
                'status'         => 1,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'parent_id'      => 2,
                'title'          => 'Inactive Employees',
                'route'          => '/admin/employees/inactive',
                'icon'           => null,
                'permission_key' => 'employee.inactive',
                'sort_order'     => 2,
                'status'         => 1,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'parent_id'      => null,
                'title'          => 'Role Management',
                'route'          => '/admin/role-management',
                'icon'           => 'ShieldCheck',
                'permission_key' => 'role.view',
                'sort_order'     => 99,
                'status'         => 1,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
            [
                'parent_id'      => null,
                'title'          => 'Menu Management',
                'route'          => '/admin/menu-management',
                'icon'           => 'Menu',
                'permission_key' => 'menu.view',
                'sort_order'     => 100,
                'status'         => 1,
                'created_at'     => $now,
                'updated_at'     => $now,
            ],
        ]);
    }
}
