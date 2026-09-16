import java.util.Scanner;

public class FindDuplicate {

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

        System.out.println("Duplicate numbers:");

        // Check each number
        for (int i = 0; i < n; i++) {

            for (int j = i + 1; j < n; j++) {

                if (numbers[i] == numbers[j]) {
                    System.out.println(numbers[i]);
                    break;
                }
            }
        }

        sc.close();
    }
}