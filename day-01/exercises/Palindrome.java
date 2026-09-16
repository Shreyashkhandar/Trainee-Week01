import java.util.Scanner;

public class Palindrome {

    public static void main(String[] args) {

        // Scanner is used to take input from the user
        Scanner sc = new Scanner(System.in);

        // Ask the user to enter a string
        System.out.print("Enter a string: ");
        String str = sc.nextLine();

        // This variable will store the reversed string
        String reversed = "";

        // Start from the last character and move towards the first character
        for (int i = str.length() - 1; i >= 0; i--) {

            // Add each character to the reversed string
            reversed = reversed + str.charAt(i);
        }

        // Check if the original and reversed strings are same
        if (str.equals(reversed)) {
            System.out.println("The string is a palindrome.");
        } else {
            System.out.println("The string is not a palindrome.");
        }

        // Close the Scanner
        sc.close();
    }
}