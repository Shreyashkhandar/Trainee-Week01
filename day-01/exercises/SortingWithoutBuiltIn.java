import java.util.Scanner;

public class SortingWithoutBuiltIn {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter how many numbers: ");
        int n = sc.nextInt();

        int[] numbers = new int[n];

        // Take numbers from user
        for (int i = 0; i < n; i++) {
            System.out.print("Enter number " + (i + 1) + ": ");
            numbers[i] = sc.nextInt();
        }

        // Sort the array
        for (int i = 0; i < n - 1; i++) {

            for (int j = 0; j < n - i - 1; j++) {

                // Swap numbers if they are in the wrong order
                if (numbers[j] > numbers[j + 1]) {

                    int temp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = temp;
                }
            }
        }

        // Print sorted array
        System.out.println("Sorted array:");

        for (int number : numbers) {
            System.out.print(number + " ");
        }

        sc.close();
    }
}