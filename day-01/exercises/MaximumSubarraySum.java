import java.util.Scanner;

public class MaximumSubarraySum {

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

        // Start with the first number
        int currentSum = numbers[0];
        int maxSum = numbers[0];

        // Find maximum subarray sum
        for (int i = 1; i < n; i++) {

            currentSum = Math.max(numbers[i], currentSum + numbers[i]);

            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        }

        System.out.println("Maximum subarray sum: " + maxSum);

        sc.close();
    }
}