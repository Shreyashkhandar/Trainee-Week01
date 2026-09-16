# Take numbers from the user
numbers = []

n = int(input("Enter how many numbers: "))

for i in range(n):
    number = int(input("Enter number: "))
    numbers.append(number)

# Store numbers without duplicates
unique_numbers = []

for number in numbers:
    if number not in unique_numbers:
        unique_numbers.append(number)

# Print the result
print("Original list:", numbers)
print("List without duplicates:", unique_numbers)