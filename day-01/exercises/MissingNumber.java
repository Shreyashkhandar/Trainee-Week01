import java.util.Scanner;

public class MissingNumber {

    public static void main(String[] args) {

        // Take input from user
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter how many numbers: ");
        int n = sc.nextInt();

        int[] numbers = new int[n - 1];

        // Store the numbers
        for (int i = 0; i < n - 1; i++) {
            System.out.print("Enter number " + (i + 1) + ": ");
            numbers[i] = sc.nextInt();
        }

        // Find the sum of numbers from 1 to n
        int total = n * (n + 1) / 2;

        // Subtract the numbers we have
        for (int i = 0; i < n - 1; i++) {
            total = total - numbers[i];
        }

        // Print the missing number
        System.out.println("Missing number: " + total);

        sc.close();
    }
}
