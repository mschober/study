public class Event {
    private String queueAction;
    private String studentName;
    private double cgpa;
    private int id;

    public Event(String event) {
        String[] eventItems = event.split(" ");
        this.queueAction = eventItems[0];
        if (this.queueAction.equals("ENTER")) {
            this.studentName = eventItems[1];
            this.cgpa = Double.parseDouble(eventItems[2]);
            this.id = Integer.parseInt(eventItems[3]);
        }
    }

    String getQueueAction() {
        return this.queueAction;
    }

    String getStudentName() {
        return this.studentName;
    }

    double getCgpa() {
        return this.cgpa;
    }

    int getID() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Event{" +
                "queueAction='" + queueAction + '\'' +
                ", studentName='" + studentName + '\'' +
                ", cgpa=" + cgpa +
                ", id=" + id +
                '}';
    }
}
