import java.util.Scanner;

public class CharacterFrequency {

    public static void main(String[] args) {

        // Take input from user
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String str = sc.nextLine();

        // Check each character
        for (int i = 0; i < str.length(); i++) {

            char current = str.charAt(i);
            int count = 0;

            // Check how many times this character appears
            for (int j = 0; j < str.length(); j++) {
                if (str.charAt(j) == current) {
                    count++;
                }
            }

            // Check if this character was already printed
            boolean alreadyPrinted = false;

            for (int j = 0; j < i; j++) {
                if (str.charAt(j) == current) {
                    alreadyPrinted = true;
                    break;
                }
            }

            // Print character and its frequency
            if (!alreadyPrinted) {
                System.out.println(current + " : " + count);
            }
        }

        sc.close();
    }
}