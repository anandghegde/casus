// get a list of all the contacts in the system
ims.controller('getContacts', function ($scope, $http) {
	
    $http.get(remoteServer+'/contacts').
        success(function(data) {
            $scope.contacts = data;
        });
    
	  
	// create a new contact in the system
    $scope.create = function() {
     	
 	   console.log("create contact");
 	   
 	    // create an object to hold the form values 
     	var dataObj = { "fullname" : $scope.newcontact.fullname,
     					"email" : $scope.newcontact.email,
     					"phone" : $scope.newcontact.phone
     					};
     	
     	console.log(dataObj);
     	
     
    };
});
