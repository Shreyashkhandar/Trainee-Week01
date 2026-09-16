# Take numbers from the user
numbers = []

n = int(input("Enter how many numbers: "))

for i in range(n):
    number = int(input("Enter number: "))
    numbers.append(number)

# Find the largest number
largest = numbers[0]

for number in numbers:
    if number > largest:
        largest = number

# Find the second largest number
second_largest = None

for number in numbers:
    if number != largest:
        if second_largest is None or number > second_largest:
            second_largest = number

# Print the result
if second_largest is None:
    print("Second largest number does not exist.")
else:
    print("Second largest number:", second_largest)
    