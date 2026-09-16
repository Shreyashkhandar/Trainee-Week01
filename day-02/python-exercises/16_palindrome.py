# Take a string from the user
text = input("Enter a string: ")

# Store the reversed string
reversed_text = ""

# Reverse the string
for i in range(len(text) - 1, -1, -1):
    reversed_text = reversed_text + text[i]

# Check if both strings are same
if text == reversed_text:
    print("The string is a palindrome.")
else:
    print("The string is not a palindrome.")
    