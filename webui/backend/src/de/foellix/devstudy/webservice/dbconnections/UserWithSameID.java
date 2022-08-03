package de.foellix.devstudy.webservice.dbconnections;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;


@Entity
@Table(name = "UserWithSameID", schema = "test")
public class UserWithSameID {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;


    @Column(name = "firstid")
    int firstid;
    @Column(name = "secondid")
    int secondid;
    public UserWithSameID() {
    }

    public UserWithSameID(int firstid, int secondid) {
        this.firstid = firstid;
        this.secondid = secondid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFirstid() {
        return firstid;
    }

    public void setFirstid(int firstid) {
        this.firstid = firstid;
    }

    public int getSecondid() {
        return secondid;
    }

    public void setSecondid(int secondid) {
        this.secondid = secondid;
    }

    @Override
    public String toString() {
        return "UserWithSameID{" +
                "id=" + id +
                ", firstid=" + firstid +
                ", secondid=" + secondid +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserWithSameID that = (UserWithSameID) o;
        return id == that.id && firstid == that.firstid && secondid == that.secondid;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstid, secondid);
    }
}