// get the data for the contact view
ims.controller('getContact', function ($scope, $routeParams, $http, $location) {
	// get the contact information
    $http.get(remoteServer+'/contacts/' + $routeParams.contactId).
        success(function(data) {
            $scope.contact = data;
        });
    
    // get the current assignee info
    $http.get(remoteServer+'/assignee').
    success(function(data) {
    
    	$scope.currentAssignee = data;
    	$scope.selectedAssignee = data.username;
    });
    
    // get the list of assignees
	$http.get(remoteServer+'/assignees').
    success(function(data) {
        $scope.assignees = data;
         
    });
	
    // get the list of categories
	$http.get(remoteServer+'/categories').
    success(function(data) {
        $scope.categories = data;
         
    });
	
    // get all the incidents associated with the contact
    $http.get(remoteServer+'/contacts/' + $routeParams.contactId + '/incidents').
    success(function(data) {
        $scope.contactIncidents = data;
    });
    

   // remove the contact (de-activate)
    $scope.remove = function() {
    	console.log("remove contact");
    	
    	 // get all the open incidents associated with the contact
        $http.get(remoteServer+'/contacts/' + $routeParams.contactId + '/incidents?status=Open').
        success(function(data) {
            var openIncidents = data;
            
            // remove the contact if they are not associated with any open incidents
            if (openIncidents.length == 0) {
            
	            // post the json object to the restful api
	            
	        	$http.delete( remoteServer+'/contacts/' + $scope.contact.id)
	        		.success(function(data) {
	        			console.log(data);
	        			
	        			// show notification
	        			$(function(){
	        				new PNotify({
	        					title: 'Success',
	        					text: 'Contact successfully removed.',
	        					type: 'success',
	        					styling: 'bootstrap3',
	        					delay: 3000
	        				});
	        			});
	        			
	        			// go back to contacts listing
	        			$location.path('/contacts');
	        		}).
	        		error(function(data,status,headers,config) {
	        			console.log(status);
	        			$(function(){
	        				new PNotify({
	    					    title: 'Error',
	    					    text: 'Unable to remove contact.',
	    					    type: 'error',
	    					    styling: 'bootstrap3',
	    					    delay:3000
	    					});
	        			})
	        		});
	        		
        		
            } else {
            	// report that the contact is associated with open incidents
            	$(function(){
    				new PNotify({
					    title: 'Warning',
					    text: 'The contact is associated with open incidents and cannot be removed.',
					    type: 'error',
					    styling: 'bootstrap3',
					    delay:5000
					});
    			})
            };
            
        });
    	
    };
    
   // update the system using the contact form values
   $scope.update = function() {
    	
	   console.log("update contact");
	   
	    // create an object to hold the form values 
    	var dataObj = { "email" : $scope.contact.email,
    					"fullname" : $scope.contact.fullname,
    					"phone" : $scope.contact.phone };
    	
    	console.log(dataObj);
    	
    	// post the json object to the restful api
    	$http.post( remoteServer+'/contacts/' + $scope.contact.id, dataObj)
    		.success(function(data) {
    			console.log(data);
    			
    			// show notification
    			$(function(){
    				new PNotify({
    					title: 'Success',
    					text: 'Contact successfully updated.',
    					type: 'success',
    					styling: 'bootstrap3',
    					delay: 3000
    				});
    			});
    		}).
    		error(function(data,status,headers,config) {
    			console.log(status);
    			$(function(){
    				new PNotify({
					    title: 'Error',
					    text: 'Unable to update contact.',
					    type: 'error',
					    styling: 'bootstrap3',
					    delay:3000
					});
    			})
    		});
    
   };
   
   // create a new incident in the system
   $scope.create = function() {
    	
	   console.log("create incident");
	   var assignee = "";
	   
	   // check to see if the assignee was unassigned
	   assignee = ($scope.unassigned) ? "unassigned" : $scope.selectedAssignee;
	   
	    // create an object to hold the form values 
    	var dataObj = { "username" : assignee,
    					"categoryId" : $scope.newincident.categoryId,
    					"subject" : $scope.newincident.subject,
    					"description" : $scope.newincident.description,
    					"priority" : $scope.newincident.priority,
    					"contactId" : $scope.contact.id};
    	
    	console.log(dataObj);
    	
    	// post the json object to the restful api
    	$http.post( remoteServer+'/incidents', dataObj)
    		.success(function(data) {
    			console.log(data);
    			
    			// show notification
    			$(function(){
    				new PNotify({
    					title: 'Success',
    					text: 'Incident successfully updated.',
    					type: 'success',
    					styling: 'bootstrap3',
    					delay: 3000
    				});
    				
    				
    			    // repopulate all the incidents associated with the contact
    			    $http.get(remoteServer+'/contacts/' + $routeParams.contactId + '/incidents').
    			    success(function(data) {
    			        $scope.contactIncidents = data;
    			    });
			    
    				
    			    // clear the form elements
    			    $scope.newincident.subject = '';
    			    $scope.newincident.description = '';
    			    $scope.unassignedIncident= false;
    			    
    			});
    		}).
    		error(function(data,status,headers,config) {
    			console.log(status);
    			$(function(){
    				new PNotify({
					    title: 'Error',
					    text: 'Unable to create incident.',
					    type: 'error',
					    styling: 'bootstrap3',
					    delay:3000
					});
    			})
    		});
    
   };
   
	// create an object to hold new incident requests
	$scope.newincident = {};
	
	// set default priority level for new incidents
	$scope.newincident.priority = 2;
	$scope.newincident.categoryId = 1;
   
});
