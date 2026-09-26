<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $engineering = Department::where('name', 'Engineering')->firstOrFail();
        $hr = Department::where('name', 'HR')->firstOrFail();
        $finance = Department::where('name', 'Finance')->firstOrFail();
        $marketing = Department::where('name', 'Marketing')->firstOrFail();
        $operations = Department::where('name', 'Operations')->firstOrFail();

        Employee::create([
            'name' => 'Rahul Sharma',
            'email' => 'rahul.sharma@example.com',
            'department_id' => $engineering->id,
            'position' => 'Software Engineer',
            'salary' => 55000,
            'location' => 'Nagpur',
        ]);

        Employee::create([
            'name' => 'Priya Patil',
            'email' => 'priya.patil@example.com',
            'department_id' => $hr->id,
            'position' => 'HR Executive',
            'salary' => 45000,
            'location' => 'Pune',
        ]);

        Employee::create([
            'name' => 'Amit Verma',
            'email' => 'amit.verma@example.com',
            'department_id' => $finance->id,
            'position' => 'Financial Analyst',
            'salary' => 60000,
            'location' => 'Mumbai',
        ]);

        Employee::create([
            'name' => 'Sneha Joshi',
            'email' => 'sneha.joshi@example.com',
            'department_id' => $marketing->id,
            'position' => 'Marketing Executive',
            'salary' => 48000,
            'location' => 'Nagpur',
        ]);

        Employee::create([
            'name' => 'Vikram Singh',
            'email' => 'vikram.singh@example.com',
            'department_id' => $operations->id,
            'position' => 'Operations Manager',
            'salary' => 70000,
            'location' => 'Pune',
        ]);
    }
}