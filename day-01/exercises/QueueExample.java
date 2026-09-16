import java.util.Scanner;

public class QueueExample {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int[] queue = new int[5];
        int front = 0;
        int rear = 0;

        System.out.print("Enter how many numbers: ");
        int n = sc.nextInt();

        // Add numbers to queue
        for (int i = 0; i < n; i++) {
            System.out.print("Enter number: ");
            queue[rear] = sc.nextInt();
            rear++;
        }

        // Show queue
        System.out.println("Queue:");

        for (int i = front; i < rear; i++) {
            System.out.print(queue[i] + " ");
        }

        // Remove first number
        if (front < rear) {
            System.out.println("\nRemoved: " + queue[front]);
            front++;
        }

        // Show queue after removing
        System.out.println("Queue after removing:");

        for (int i = front; i < rear; i++) {
            System.out.print(queue[i] + " ");
        }

        sc.close();
    }
}