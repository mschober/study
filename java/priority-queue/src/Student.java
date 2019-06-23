import java.util.Objects;

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

    /**
     *
     * The student having the highest Cumulative Grade Point Average (CGPA) is served first.
     * Any students having the same CGPA will be served by name in ascending case-sensitive alphabetical order.
     * Any students having the same CGPA and name will be served in ascending order of the id.
     */
    public int compareTo(Student that) {
        if (this.cgpa > that.cgpa) {
            return -1;
        }
        else if (this.cgpa < that.cgpa) {
            return 1;
        }
        if (this.name.compareTo(that.name) > 0) {
            return -1;
        }
        else if (this.name.compareTo(that.name) < 0) {
            return 1;
        }
        if (this.id > that.id) {
            return -1;
        }
        else {
            return 1;
        }
    }
}
