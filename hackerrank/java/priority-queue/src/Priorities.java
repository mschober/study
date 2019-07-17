import java.util.ArrayList;
import java.util.List;

public class Priorities {

    private ArrayList<Student> studentList;
    private PQ priorityQueue;

    public Priorities() {
        this.priorityQueue = new PQ();
        this.studentList = new ArrayList<Student>();
    }

    void processEvent(String ev) {
        Event event = this.parseEvent(ev);
        System.out.println("event is " + event);
        if (event.getQueueAction().equals("ENTER")) {
            Student student = new Student(
                    event.getID(),
                    event.getStudentName(),
                    event.getCgpa()
            );
            System.out.println("enqueueing a new student " + student);
            this.enqueue(student);
        }
        else {
            Student student = this.dequeue();
            System.out.println("dequeing student " + student);
            this.studentList.add(student);
        }
    }

    private Student dequeue() {
        return this.priorityQueue.dequeue();
    }

    private void enqueue(Student student) {
        this.priorityQueue.enqueue(student);
    }

    Event parseEvent(String event) {
        return new Event(event);
    }

    List<Student> getStudents(List<String> events) {
        int i = 0;
        while(i < events.size()) {
            processEvent(events.get(i));
            i++;
        }
        return this.studentList;
    }

}

class Node {
    Node next;
    Student student;

    public Node(Student student) {
        this.next = null;
        this.student = student;
    }

    @Override
    public String toString() {
        return "Node{" +
                "next=" + next +
                ", student=" + student +
                '}';
    }
}

class PQ {

    private Node root;
    private ArrayList<Student> students;

    public PQ() {
        this.root = null;
    }

    void enqueue(Student student) {
        if (this.root != null) {
            System.out.println("going to insert student " + student);
            this.insert(student);
        }
        else {
            System.out.println("initializing pq " + student);
            this.root = new Node(student);
        }
        System.out.println("pq after enqueue " + this);
    }

    void insert(Student student) {
        Node curr = this.root;
        boolean inserted = false;
        while(!inserted) {
            int comparison = curr.student.compareTo(student);
            System.out.println("comparison of students " + comparison);
            if (comparison < 0) {
                System.out.println("going to next");
                curr = curr.next;
            }
            else {
                System.out.println("going to insert " + student);
                curr.next = new Node(student);
                inserted = true;
            }
            if (curr == null) {
                break;
            }
        }
    }

    Student dequeue() {
        Student popped = this.pop();
        System.out.println("pq after dequeue " + this);
        return popped;
    }

    private Student pop() {
        Node temp;
        Student popped;
        if (this.root.next != null) {
            temp = this.root.next;
        }
        else {
            temp = null;
        }
        popped = this.root.student;
        this.root = temp;
        return popped;
    }

    @Override
    public String toString() {
        String toPrint = "";
        Node curr = this.root;
        toPrint += curr.toString();
        System.out.println("root is " + root);
        while(curr.next != null) {
            curr = curr.next;
            toPrint += curr.toString();
            System.out.println("toPrint is " + toPrint);
        }
        return toPrint;
    }
}