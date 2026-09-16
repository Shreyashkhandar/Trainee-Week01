import java.util.Scanner;

public class StackExample {

    static int[] stack = new int[5];
    static int top = -1;

    // Add a number to the stack
    static void push(int number) {

        if (top == stack.length - 1) {
            System.out.println("Stack is full.");
        } else {
            top++;
            stack[top] = number;
            System.out.println("Number added: " + number);
        }
    }

    // Remove the top number
    static void pop() {

        if (top == -1) {
            System.out.println("Stack is empty.");
        } else {
            System.out.println("Number removed: " + stack[top]);
            top--;
        }
    }

    // Show the top number
    static void peek() {

        if (top == -1) {
            System.out.println("Stack is empty.");
        } else {
            System.out.println("Top number: " + stack[top]);
        }
    }

    // Show all numbers
    static void display() {

        if (top == -1) {
            System.out.println("Stack is empty.");
        } else {
            System.out.println("Stack:");

            for (int i = top; i >= 0; i--) {
                System.out.println(stack[i]);
            }
        }
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int choice;

        do {
            System.out.println("\n1. Push");
            System.out.println("2. Pop");
            System.out.println("3. Peek");
            System.out.println("4. Display");
            System.out.println("5. Exit");

            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {

                case 1:
                    System.out.print("Enter number: ");
                    int number = sc.nextInt();
                    push(number);
                    break;

                case 2:
                    pop();
                    break;

                case 3:
                    peek();
                    break;

                case 4:
                    display();
                    break;

                case 5:
                    System.out.println("Program ended.");
                    break;

                default:
                    System.out.println("Invalid choice.");
            }

        } while (choice != 5);

        sc.close();
    }
}