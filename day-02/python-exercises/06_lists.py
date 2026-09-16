# Create a list of numbers
numbers = [10, 20, 30, 40, 50]

# Print the complete list
print("Numbers:", numbers)

# Print each number
print("Each number:")

for number in numbers:
    print(number)

# Add a new number
numbers.append(60)

print("After adding 60:", numbers)

# Remove a number
numbers.remove(30)

print("After removing 30:", numbers)