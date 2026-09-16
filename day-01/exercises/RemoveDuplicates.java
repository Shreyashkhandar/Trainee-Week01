import java.util.Scanner;

public class RemoveDuplicates {

    public static void main(String[] args) {

        // Take input from user
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter how many numbers: ");
        int n = sc.nextInt();

        int[] numbers = new int[n];

        // Store numbers in the array
        for (int i = 0; i < n; i++) {
            System.out.print("Enter number " + (i + 1) + ": ");
            numbers[i] = sc.nextInt();
        }

        System.out.println("Array after removing duplicates:");

        // Check each number
        for (int i = 0; i < n; i++) {

            boolean duplicate = false;

            // Check if the number appeared before
            for (int j = 0; j < i; j++) {
                if (numbers[i] == numbers[j]) {
                    duplicate = true;
                    break;
                }
            }

            // Print only if it is not a duplicate
            if (!duplicate) {
                System.out.print(numbers[i] + " ");
            }
        }

        sc.close();
    }
}