# Write some information to a file
file = open("employee.txt", "w")

file.write("Name: Shreyash\n")
file.write("Department: IT\n")
file.write("Salary: 30000\n")

file.close()

print("Data written to file.")

# Read the file
file = open("employee.txt", "r")

data = file.read()

print("\nFile contents:")
print(data)

file.close()
