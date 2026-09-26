# Laravel setup blocked

This Laravel application was not scaffolded because the current machine does not have PHP or Composer available, and no MySQL installation was found in the checked Windows locations.

Required before continuing:

1. Install PHP 8.2 or newer and add `php.exe` to PATH.
2. Install Composer and add `composer` to PATH.
3. Install MySQL Server and the MySQL client, then add `mysql.exe` to PATH.
4. Configure a dedicated `employee_management` database and credentials.
5. Run `composer create-project laravel/laravel .` from this directory.

After that, add migrations for `departments` and `employees`, Eloquent models, seeders, an `EmployeeController`, API routes, validation, and middleware. The root Day 8 README contains the intended database design and exact next commands.
