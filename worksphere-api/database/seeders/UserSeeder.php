<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'role' => 'Super Admin',
                'name' => 'Super Admin',
                'email' => 'superadmin@worksphere.com',
                'phone' => '9000000001',
            ],
            [
                'role' => 'Admin',
                'name' => 'Admin User',
                'email' => 'admin@worksphere.com',
                'phone' => '9000000002',
            ],
            [
                'role' => 'HR',
                'name' => 'HR User',
                'email' => 'hr@worksphere.com',
                'phone' => '9000000003',
            ],
            [
                'role' => 'Manager',
                'name' => 'Manager User',
                'email' => 'manager@worksphere.com',
                'phone' => '9000000004',
            ],
            [
                'role' => 'Team Lead',
                'name' => 'Team Lead User',
                'email' => 'teamlead@worksphere.com',
                'phone' => '9000000005',
            ],
        ];

        foreach ($users as $user) {

            $role = Role::where('name', $user['role'])->first();

            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    'role_id'    => $role->id,
                    'name'       => $user['name'],
                    'phone'      => $user['phone'],
                    'password'   => Hash::make('password'),
                    'status'     => true,
                    'last_login' => null,
                ]
            );
        }
    }
}
