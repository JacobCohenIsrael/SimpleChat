'use_strict';

gameController('HomeController', [
'$scope',
function($scope)
{
		console.log('HomeController');
		$scope.msgs = [];
		$scope.socket = io.connect("http://jacob.chat.devx.rushcore.com:8080");
		
		$scope.socket.on("broadcast", function(data){
			$scope.$apply(function()
			{ 
				$scope.msgs.push(data) 
			});
		});
		$scope.socket.on("input", function(data){
			console.log(data);
		});
	
	
	$scope.send = function(msg)
	{
		$scope.socket.emit("input",msg);
		msg.msg = '';
	};
}]);