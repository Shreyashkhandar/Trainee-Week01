# Take two numbers from the user
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

# Perform basic operations
addition = num1 + num2
subtraction = num1 - num2
multiplication = num1 * num2

# Avoid division by zero
if num2 != 0:
    division = num1 / num2
else:
    division = "Cannot divide by zero"

# Print the results
print("Addition:", addition)
print("Subtraction:", subtraction)
print("Multiplication:", multiplication)
print("Division:", division)