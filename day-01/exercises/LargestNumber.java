import java.util.Scanner;

public class LargestNumber {

    public static void main(String[] args) {

        // Take input from user
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter how many numbers: ");
        int n = sc.nextInt();

        // Take the first number as the largest
        System.out.print("Enter number 1: ");
        int largest = sc.nextInt();

        // Check the remaining numbers
        for (int i = 2; i <= n; i++) {

            System.out.print("Enter number " + i + ": ");
            int num = sc.nextInt();

            // If current number is bigger, update largest
            if (num > largest) {
                largest = num;
            }
        }

        // Print the largest number
        System.out.println("Largest number: " + largest);

        sc.close();
    }
}
