<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_employee_list_returns_paginated_or_array_of_employees_with_department(): void
    {
        $department = Department::create(['name' => 'Engineering']);
        Employee::create([
            'name' => 'Rahul Sharma',
            'email' => 'rahul@example.com',
            'department_id' => $department->id,
            'position' => 'Software Engineer',
            'salary' => 55000,
            'location' => 'Nagpur',
        ]);

        $response = $this->getJson('/api/employees');

        $response->assertOk()
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'name',
                    'department' => ['id', 'name'],
                ],
            ]);
    }

    public function test_employee_detail_returns_requested_employee(): void
    {
        $department = Department::create(['name' => 'Engineering']);
        $employee = Employee::create([
            'name' => 'Ananya Verma',
            'email' => 'ananya@example.com',
            'department_id' => $department->id,
            'position' => 'QA Engineer',
            'salary' => 60000,
            'location' => 'Bhopal',
        ]);

        $response = $this->getJson('/api/employees/' . $employee->id);

        $response->assertOk()
            ->assertJsonPath('name', 'Ananya Verma');
    }

    public function test_employee_not_found_returns_404(): void
    {
        $response = $this->getJson('/api/employees/9999');

        $response->assertNotFound();
    }

    public function test_employee_can_be_created_with_valid_data(): void
    {
        $department = Department::create(['name' => 'Engineering']);

        $payload = [
            'name' => 'Rahul Sharma',
            'email' => 'rahul@example.com',
            'department_id' => $department->id,
            'position' => 'Software Engineer',
            'salary' => 55000,
            'location' => 'Nagpur',
        ];

        $response = $this->postJson('/api/employees', $payload, ['X-API-Key' => 'day8-demo-key']);

        $response->assertStatus(201)
            ->assertJsonPath('name', 'Rahul Sharma');
    }

    public function test_invalid_employee_creation_returns_validation_errors(): void
    {
        $response = $this->postJson('/api/employees', [
            'name' => '',
            'email' => 'not-an-email',
            'department_id' => 999,
            'position' => '',
            'salary' => -1,
            'location' => '',
        ], ['X-API-Key' => 'day8-demo-key']);

        $response->assertStatus(422);
    }

    public function test_employee_can_be_updated(): void
    {
        $department = Department::create(['name' => 'Engineering']);
        $employee = Employee::create([
            'name' => 'Old Name',
            'email' => 'old@example.com',
            'department_id' => $department->id,
            'position' => 'Junior Developer',
            'salary' => 40000,
            'location' => 'Indore',
        ]);

        $response = $this->putJson('/api/employees/' . $employee->id, [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'department_id' => $department->id,
            'position' => 'Senior Developer',
            'salary' => 50000,
            'location' => 'Indore',
        ], ['X-API-Key' => 'day8-demo-key']);

        $response->assertOk();
        $this->assertDatabaseHas('employees', ['name' => 'Updated Name']);
    }

    public function test_employee_can_be_deleted(): void
    {
        $department = Department::create(['name' => 'Engineering']);
        $employee = Employee::create([
            'name' => 'Delete Me',
            'email' => 'delete@example.com',
            'department_id' => $department->id,
            'position' => 'Developer',
            'salary' => 45000,
            'location' => 'Pune',
        ]);

        $response = $this->deleteJson('/api/employees/' . $employee->id, [], ['X-API-Key' => 'day8-demo-key']);

        $response->assertOk();
        $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
    }

    public function test_employee_search_filters_by_name_or_email(): void
    {
        $department = Department::create(['name' => 'Engineering']);
        Employee::create([
            'name' => 'Rahul Sharma',
            'email' => 'rahul@example.com',
            'department_id' => $department->id,
            'position' => 'Software Engineer',
            'salary' => 55000,
            'location' => 'Nagpur',
        ]);

        Employee::create([
            'name' => 'Aditi Rao',
            'email' => 'aditi@example.com',
            'department_id' => $department->id,
            'position' => 'Engineer',
            'salary' => 60000,
            'location' => 'Cochin',
        ]);

        $response = $this->getJson('/api/employees?search=Rahul');

        $response->assertOk();
        $response->assertJsonFragment(['name' => 'Rahul Sharma']);
    }

    public function test_employee_department_relationship_is_included_in_response(): void
    {
        $department = Department::create(['name' => 'Engineering']);
        Employee::create([
            'name' => 'Amit Singh',
            'email' => 'amit@example.com',
            'department_id' => $department->id,
            'position' => 'Engineer',
            'salary' => 62000,
            'location' => 'Lucknow',
        ]);

        $response = $this->getJson('/api/employees?department=Engineering');

        $response->assertOk();
        $response->assertJsonFragment(['name' => 'Engineering']);
    }

    public function test_api_key_middleware_rejects_unauthorized_requests(): void
    {
        Department::create(['name' => 'Engineering']);

        $response = $this->postJson('/api/employees', [
            'name' => 'Rahul Sharma',
            'email' => 'rahul@example.com',
            'department_id' => 1,
            'position' => 'Software Engineer',
            'salary' => 55000,
            'location' => 'Nagpur',
        ]);

        $response->assertStatus(403);
    }
}
