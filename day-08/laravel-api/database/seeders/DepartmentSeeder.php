<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            'Engineering',
            'HR',
            'Finance',
            'Marketing',
            'Operations',
        ];

        foreach ($departments as $departmentName) {
            Department::firstOrCreate(['name' => $departmentName]);
        }
    }
}
