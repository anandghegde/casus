package models;

import javax.persistence.*;

import play.db.ebean.*;
import play.db.ebean.Model.Finder;

import com.avaje.ebean.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import play.data.format.*;
import play.data.validation.*;

import java.util.*;

// An Action represents a unit of work spent by an assignee on a specific incident 
@Entity
public class Action extends Model {
	
	@Id
	public int id;
	public Date startdate;
	@ManyToOne
	public Assignee assignee;
	public String description;
	@ManyToOne
	@JsonBackReference
	public Incident incident;
	
	// constructor methods
	public Action(Date startdate, Assignee assignee, String description, Incident incident){
		this.startdate = startdate;
		this.assignee = assignee;
		this.description = description;
		this.incident = incident;
	}
	
	public static Action create(String assigneeUsername, String description, int incidentId){
		Date startdate = Calendar.getInstance().getTime();
		Action action = new Action(
				startdate,
				Assignee.find.ref(assigneeUsername), 
				description, 
				Incident.find.ref(incidentId));
		action.save();
		return action;
	}
	
	//create a find method for data queries
	public static Finder<Integer, Action> find = new Finder<Integer, Action>(
			Integer.class, Action.class
			);
	
}
