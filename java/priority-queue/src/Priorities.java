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
    private Node next;
    private Student student;

    public Node(Student student) {
        this.next = null;
        this.student = student;
    }
}

class PQ {

    private ArrayList<Student> students;

    public PQ() {
        this.students = new ArrayList<Student>();
    }

    void enqueue(Student student) {
        this.students.add(student);
    }

    Student dequeue() {
        return this.students.remove(this.students.size() - 1);
    }
}