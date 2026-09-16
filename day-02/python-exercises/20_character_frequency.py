# Take a string from the user
text = input("Enter a string: ")

# Store character counts
frequency = {}

# Count each character
for char in text:
    if char in frequency:
        frequency[char] = frequency[char] + 1
    else:
        frequency[char] = 1

# Print the result
print("Character frequency:")

for char, count in frequency.items():
    print(char, ":", count)