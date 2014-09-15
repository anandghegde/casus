// get all the information associated with a specific incident
ims.controller('getIncident', function ($scope, $routeParams, $http, $location) {
    
	// get the incident information
	$http.get(remoteServer+'/incidents/'+ $routeParams.incidentId).
        success(function(data) {
            $scope.incident = data;
            
            	// get the list of assignees
            	$http.get(remoteServer+'/assignees').
                success(function(data) {
                    $scope.assignees = data;
                    
                    $scope.selectedAssignee = "";
                    
                    // need to figure out which assignee owns the incident to display a name in the form selector
                    // but don't try to figure it out if the incident has no owner (unassigned)
                    if ($scope.incident.owner.username != 'unassigned') {
	                    

	                	for (var i = 0; i < $scope.assignees.length; i++) {
	                		if ($scope.assignees[i].username == $scope.incident.owner.username) {
	                			$scope.selectedAssignee = $scope.assignees[i].username;
	                		}
	                	
	                	}
                    } else {
                    	// set an attribute if the incident does not have an assigned assignee
                    	$scope.unassigned = true;
                    }
                    
                });
            	
                // get the list of categories
            	$http.get(remoteServer+'/categories').
                success(function(data) {
                    $scope.categories = data;
                    
                    $scope.selectedCategory = $scope.incident.category.id;
                });
            	
            	
        });
	
		
	   // create a new action associated with the incident
	   $scope.create = function() {
	    	
		   console.log("create action");
		   
		    // create an object to hold the form values 
	    	var dataObj = { "description" : $scope.newaction.description }
	    	
	    	console.log(dataObj);
	    	
	    	// post the json object to the restful api
	    	$http.post( remoteServer+'/incidents/'+ $scope.incident.id + '/actions', dataObj)
	    		.success(function(data) {
	    			console.log(data);
	    			
	    			// show notification
	    			$(function(){
	    				new PNotify({
	    					title: 'Success',
	    					text: 'Action successfully added.',
	    					type: 'success',
	    					styling: 'bootstrap3',
	    					delay: 3000
	    				});
	    				
	    				// repopulate the data in the view
	    				$http.get(remoteServer+'/incidents/'+ $routeParams.incidentId).
	    		        success(function(data) {
	    		            $scope.incident = data;
	    			        });
	    			    
	    			    // clear the form elements
	    			 
	    			    $scope.newaction.description = '';
	    			    
	    			});
	    		}).
	    		error(function(data,status,headers,config) {
	    			console.log(status);
	    			$(function(){
	    				new PNotify({
						    title: 'Error',
						    text: 'Unable to add action.',
						    type: 'error',
						    styling: 'bootstrap3',
						    delay:3000
						});
	    			})
	    		});
	    
	   };
	   
	   // update the system using the incident form values
	   $scope.close = function() {
	    	
		   console.log("close incident");
		   
		// get the current assignee
       	$http.get(remoteServer+'/assignee').
           success(function(data) {
               var assignee = data;
               	
               	if (assignee.username == $scope.selectedAssignee) {
				    // create an object to hold the form values 
			    	var dataObj = { };
			    	
			    	console.log(dataObj);
			    	
			    	// post the json object to the restful api
			    	$http.post( remoteServer+'/incidents/' + $scope.incident.id + '/close', dataObj)
			    		.success(function(data) {
			    			console.log(data);
			    			
			    			// show notification
			    			$(function(){
			    				new PNotify({
			    					title: 'Success',
			    					text: 'Incident closed.',
			    					type: 'success',
			    					styling: 'bootstrap3',
			    					delay: 3000
			    				});
			    			});
			    			$location.path('/');
			    			
			    		}).
			    		error(function(data,status,headers,config) {
			    			console.log(status);
			    			$(function(){
			    				new PNotify({
								    title: 'Error',
								    text: 'Unable to close incident.',
								    type: 'error',
								    styling: 'bootstrap3',
								    delay:3000
								});
			    			})
			    		});
               	} else {
               		
               		// report that the current assignee does not own the incident
               		$(function(){
	    				new PNotify({
						    title: 'Warning',
						    text: 'Unable to close incident because the assignee is not the owner.',
						    type: 'error',
						    styling: 'bootstrap3',
						    delay:5000
						});
	    			})	
               	};
           });
	    
	   };
	   
	   // update the system using the incident form values
	   $scope.update = function() {
	    	
		   console.log("update incident");
		   
		    // create an object to hold the form values 
	    	var dataObj = { "username" : $scope.selectedAssignee,
	    					"categoryId" : $scope.selectedCategory,
	    					"subject" : $scope.incident.subject,
	    					"description" : $scope.incident.description,
	    					"priority" : $scope.incident.priority,
	    					"contactId" : $scope.incident.requester.id};
	    	
	    	console.log(dataObj);
	    	
	    	// post the json object to the restful api
	    	$http.post( remoteServer+'/incidents/' + $scope.incident.id, dataObj)
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
	    			});
	    			
	    			// repopulate the data in the view
    				$http.get(remoteServer+'/incidents/'+ $routeParams.incidentId).
    		        success(function(data) {
    		            $scope.incident = data;
    			        });
    				
	    		}).
	    		error(function(data,status,headers,config) {
	    			console.log(status);
	    			$(function(){
	    				new PNotify({
						    title: 'Error',
						    text: 'Unable to update incident.',
						    type: 'error',
						    styling: 'bootstrap3',
						    delay:3000
						});
	    			})
	    		});
	    
	   };
	   
});
