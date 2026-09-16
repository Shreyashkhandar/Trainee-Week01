# Take a string from the user
text = input("Enter a string: ")

# Store the reversed string
reversed_text = ""

# Start from the last character
for i in range(len(text) - 1, -1, -1):
    reversed_text = reversed_text + text[i]

# Print the result
print("Original string:", text)
print("Reversed string:", reversed_text)
