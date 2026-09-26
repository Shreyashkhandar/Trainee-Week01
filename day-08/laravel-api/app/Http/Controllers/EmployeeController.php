<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Employee::query()->with('department');

        if ($request->filled('department')) {
            $query->whereHas('department', function ($departmentQuery) use ($request) {
                $departmentQuery->where('name', 'like', '%' . $request->department . '%');
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $employees = $query->orderBy('id')->get();

        return response()->json($employees, 200);
    }

    public function show(Employee $employee): JsonResponse
    {
        $employee->load('department');

        return response()->json($employee, 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:employees,email',
            'department_id' => 'required|exists:departments,id',
            'position' => 'required|string',
            'salary' => 'required|numeric|min:0',
            'location' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $employee = Employee::create($request->all());

        return response()->json($employee->load('department'), 201);
    }

    public function update(Request $request, Employee $employee): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:employees,email,' . $employee->id,
            'department_id' => 'sometimes|required|exists:departments,id',
            'position' => 'sometimes|required|string',
            'salary' => 'sometimes|required|numeric|min:0',
            'location' => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $employee->update($request->all());

        return response()->json($employee->load('department'), 200);
    }

    public function destroy(Employee $employee): JsonResponse
    {
        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully',
        ], 200);
    }
}
