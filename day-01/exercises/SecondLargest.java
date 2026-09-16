import java.util.Scanner;

public class SecondLargest {

    public static void main(String[] args) {

        // Take input from user
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter how many numbers: ");
        int n = sc.nextInt();

        System.out.print("Enter number 1: ");
        int first = sc.nextInt();

        System.out.print("Enter number 2: ");
        int second = sc.nextInt();

        // Keep the largest number in first
        // and second largest in second
        if (second > first) {
            int temp = first;
            first = second;
            second = temp;
        }

        // Check remaining numbers
        for (int i = 3; i <= n; i++) {

            System.out.print("Enter number " + i + ": ");
            int num = sc.nextInt();

            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                second = num;
            }
        }

        // Print second largest number
        System.out.println("Second largest number: " + second);

        sc.close();
    }
}
