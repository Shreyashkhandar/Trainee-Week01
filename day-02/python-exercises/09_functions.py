# Function to add two numbers
def add_numbers(a, b):
    return a + b


# Function to find the larger number
def find_larger(a, b):
    if a > b:
        return a
    else:
        return b


# Take input from the user
num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

# Call the functions
sum_result = add_numbers(num1, num2)
larger_number = find_larger(num1, num2)

# Print the results
print("Sum:", sum_result)
print("Larger number:", larger_number)