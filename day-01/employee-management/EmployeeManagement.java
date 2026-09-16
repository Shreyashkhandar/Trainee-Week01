import java.util.ArrayList;
import java.util.Scanner;

public class EmployeeManagement {

    static Scanner sc = new Scanner(System.in);

    static ArrayList<Employee> employees = new ArrayList<>();

    public static void main(String[] args) {

        while (true) {

            System.out.println("\nEmployee Management System");
            System.out.println("--------------------------");
            System.out.println("1. Add Employee");
            System.out.println("2. Update Employee");
            System.out.println("3. Delete Employee");
            System.out.println("4. Search Employee");
            System.out.println("5. List Employees");
            System.out.println("6. Highest Salary");
            System.out.println("7. Average Salary");
            System.out.println("8. Department Filter");
            System.out.println("9. Exit");

            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();

            switch (choice) {

                case 1:
                    addEmployee();
                    break;

                case 2:
                    updateEmployee();
                    break;

                case 3:
                    deleteEmployee();
                    break;

                case 4:
                    searchEmployee();
                    break;

                case 5:
                    listEmployees();
                    break;

                case 6:
                    highestSalary();
                    break;

                case 7:
                    averageSalary();
                    break;

                case 8:
                    departmentFilter();
                    break;

                case 9:
                    System.out.println("Program ended.");
                    sc.close();
                    return;

                default:
                    System.out.println("Invalid choice.");
            }
        }
    }

    static void addEmployee() {
        System.out.println("Add Employee");
    }

    static void updateEmployee() {
        System.out.println("Update Employee");
    }

    static void deleteEmployee() {
        System.out.println("Delete Employee");
    }

    static void searchEmployee() {
        System.out.println("Search Employee");
    }

    static void listEmployees() {
        System.out.println("List Employees");
    }

    static void highestSalary() {
        System.out.println("Highest Salary");
    }

    static void averageSalary() {
        System.out.println("Average Salary");
    }

    static void departmentFilter() {
        System.out.println("Department Filter");
    }
}

class Employee {

    int id;
    String name;
    String department;
    double salary;

    Employee(int id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
}