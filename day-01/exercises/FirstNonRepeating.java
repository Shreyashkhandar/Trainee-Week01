import java.util.Scanner;

public class FirstNonRepeating {

    public static void main(String[] args) {

        // Take input from user
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String str = sc.nextLine();

        // Check each character
        for (int i = 0; i < str.length(); i++) {

            char current = str.charAt(i);
            int count = 0;

            // Count how many times the character appears
            for (int j = 0; j < str.length(); j++) {
                if (str.charAt(j) == current) {
                    count++;
                }
            }

            // If character appears only once, print it
            if (count == 1) {
                System.out.println("First non-repeating character: " + current);
                break;
            }

            // If no character appears only once
            if (i == str.length() - 1) {
                System.out.println("No non-repeating character found.");
            }
        }

        sc.close();
    }
}
