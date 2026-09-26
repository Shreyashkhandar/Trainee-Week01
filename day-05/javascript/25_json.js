const student = {
  name: "Anita",
  age: 22,
  department: "Data Science",
};

const jsonString = JSON.stringify(student);
console.log("JSON string:", jsonString);

const parsedStudent = JSON.parse(jsonString);
console.log("Parsed object:", parsedStudent);
