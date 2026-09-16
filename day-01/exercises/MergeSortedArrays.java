import java.util.Scanner;

public class MergeSortedArrays {

    public static void main(String[] args) {

        // Take input from user
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter size of first array: ");
        int n1 = sc.nextInt();

        int[] first = new int[n1];

        // Take first sorted array
        System.out.println("Enter first sorted array:");
        for (int i = 0; i < n1; i++) {
            first[i] = sc.nextInt();
        }

        System.out.print("Enter size of second array: ");
        int n2 = sc.nextInt();

        int[] second = new int[n2];

        // Take second sorted array
        System.out.println("Enter second sorted array:");
        for (int i = 0; i < n2; i++) {
            second[i] = sc.nextInt();
        }

        int[] merged = new int[n1 + n2];

        int i = 0;
        int j = 0;
        int k = 0;

        // Compare both arrays and add smaller number
        while (i < n1 && j < n2) {

            if (first[i] < second[j]) {
                merged[k] = first[i];
                i++;
            } else {
                merged[k] = second[j];
                j++;
            }

            k++;
        }

        // Add remaining numbers from first array
        while (i < n1) {
            merged[k] = first[i];
            i++;
            k++;
        }

        // Add remaining numbers from second array
        while (j < n2) {
            merged[k] = second[j];
            j++;
            k++;
        }

        // Print merged array
        System.out.println("Merged array:");

        for (int number : merged) {
            System.out.print(number + " ");
        }

        sc.close();
    }
}