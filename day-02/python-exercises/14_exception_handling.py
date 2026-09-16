# Take two numbers from the user
try:
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))

    # Divide the numbers
    result = num1 / num2

    print("Result:", result)

except ValueError:
    print("Please enter numbers only.")

except ZeroDivisionError:
    print("Cannot divide by zero.")