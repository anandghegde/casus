import play.*;
import play.libs.*;

import com.avaje.ebean.Ebean;

import models.*;

import java.util.*;

public class Global extends GlobalSettings {
    @Override
    public void onStart(Application app) {
        // Check if the database is empty
        if (Assignee.find.findRowCount() == 0) {
        	
        	// load the data from a yaml file
        	Map<String,List<Object>> all = (Map<String,List<Object>>)Yaml.load("testdata.yml");
        	
        	// Insert assignees first
        	Ebean.save(all.get("assignees"));
        	
        	
        	// Insert contacts 
        	Ebean.save(all.get("contacts"));
        	
        	// Insert categories 
        	Ebean.save(all.get("categories"));
        	
        	// Insert incidents 
        	Ebean.save(all.get("incidents"));

        	// Insert incidents 
        	Ebean.save(all.get("actions"));
        }
    } 
}
