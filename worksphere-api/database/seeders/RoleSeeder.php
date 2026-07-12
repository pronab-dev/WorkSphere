<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Super Admin',
                'description' => 'Has complete access to the system.',
            ],
            [
                'name' => 'Admin',
                'description' => 'Manages users and system settings.',
            ],
            [
                'name' => 'HR',
                'description' => 'Manages employees and HR operations.',
            ],
            [
                'name' => 'Manager',
                'description' => 'Manages teams and employee performance.',
            ],
            [
                'name' => 'Team Lead',
                'description' => 'Supervises team members.',
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name']],
                [
                    'description' => $role['description'],
                    'status' => true,
                ]
            );
        }
    }
}