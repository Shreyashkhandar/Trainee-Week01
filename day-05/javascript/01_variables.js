let studentName = "Aisha";
const courseName = "JavaScript Basics";

console.log("Student name:", studentName);
console.log("Course:", courseName);

studentName = "Aisha Khan";
console.log("Updated student name:", studentName);

try {
  courseName = "Advanced JavaScript";
} catch (error) {
  console.log("const cannot be reassigned:", error.message);
}
