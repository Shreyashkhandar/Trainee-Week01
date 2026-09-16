import java.util.Scanner;

public class CommonElements {

    public static void main(String[] args) {

        // Take input from user
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter size of first array: ");
        int n1 = sc.nextInt();

        int[] first = new int[n1];

        // Take first array
        System.out.println("Enter first array:");
        for (int i = 0; i < n1; i++) {
            first[i] = sc.nextInt();
        }

        System.out.print("Enter size of second array: ");
        int n2 = sc.nextInt();

        int[] second = new int[n2];

        // Take second array
        System.out.println("Enter second array:");
        for (int i = 0; i < n2; i++) {
            second[i] = sc.nextInt();
        }

        System.out.println("Common elements:");

        // Compare both arrays
        for (int i = 0; i < n1; i++) {

            boolean found = false;

            for (int j = 0; j < n2; j++) {
                if (first[i] == second[j]) {
                    found = true;
                    break;
                }
            }

            // Print the number if it is present in both arrays
            if (found) {
                System.out.print(first[i] + " ");
            }
        }

        sc.close();
    }
}
