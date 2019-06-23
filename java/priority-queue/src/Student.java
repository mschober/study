public class Student  {
    private int id;
    private String name;
    private double cgpa;

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cgpa=" + cgpa +
                '}';
    }

    public Student(int id, String name, double cgpa) {
        this.id = id;
        this.name = name;
        this.cgpa = cgpa;
    }

    int getID() {
        return this.id;
    }

    String getName() {
        return this.name;
    }

    double getCGPA() {
        return this.cgpa;
    }

}
