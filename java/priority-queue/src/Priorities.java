import java.util.ArrayList;
import java.util.List;

public class Priorities {

    private ArrayList<Student> priorityQueue;

    public Priorities() {
        this.priorityQueue = new ArrayList<Student>();
    }

    void processEvent(String ev) {
        Event event = this.parseEvent(ev);
        System.out.println("event is " + event);
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
        return this.priorityQueue;
    }

}