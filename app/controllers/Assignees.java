package controllers;

import play.*;
import play.mvc.*;
import play.mvc.Http.Context;
import play.data.*;
import static play.data.Form.*;

import java.util.*;

import models.*;
import views.html.*;
import play.libs.Json;

@Security.Authenticated(Authenticated.class)
public class Assignees extends Controller {

	// get info on the currently logged in assignee
	public static Result current() {
		return ok(Json.toJson(Assignee.find.byId(Context.current().request().username())));
	}
	
	// get info for a specific assignee
	public static Result get(String username) {
		return ok(Json.toJson(Assignee.find.byId(username)));
	}

	// get incidents associated with a specific assignee
	public static Result getIncidents(String username) {
		return ok(Json.toJson(Incident.find.where().eq("owner_username", username).findList()));
	}
	
	// get a list of all active assignees
	public static Result list() {
		return ok(Json.toJson(Assignee.find.where().eq("active", true).findList()));
	}
	
}
