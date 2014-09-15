package models;

import javax.persistence.*;

import play.data.validation.Constraints;
import play.db.ebean.*;
import org.mindrot.jbcrypt.BCrypt;

import com.avaje.ebean.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

// An assignee represents the system user responsible for documenting and managing incident requests.
@Entity
public class Assignee extends Model {

	@Id
	@Constraints.Required
	public String username;
	@JsonIgnore
	public String password;
	public String fullname;
	public String email;
	public Boolean active;
	
	// constructor for new Assignee
	public Assignee(String username, String password, String fullname, String email) {
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.email = email;
		this.active = true;
	}
	
	//create a find method for data queries
	public static Finder<String, Assignee> find = new Finder<String, Assignee>(
			String.class, Assignee.class
			);
	
	public static Assignee authenticate(String username, String password) {
		Assignee assignee = find.where().eq("username", username).eq("active",  "true").findUnique();
		if (assignee != null && BCrypt.checkpw(password, assignee.password)){
			return assignee;
		} else {
			return null;
		}
	}
}
