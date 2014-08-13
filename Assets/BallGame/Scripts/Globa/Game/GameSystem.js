#pragma strict
/*
private static var instance_:GameSystem = null;
private static var web_:WebClient = null;

static function getInstance(){
	return instance_;
}

function web(){
	return this.web_;

}
function Start () { 
	this.web_ = GetComponent("WebClient") as WebClient;
	instance_ = this;
}

function Update () {
	
}

function registerTask(){
	var task:Task = new Task();
	var over:boolean = false;
	task.init = function(){
		over = false;
		this.web_.register(
			function(state:Geek.WebState){
				over = true;
			}
		);
	};
	
	task.isOver = function() : boolean{
		return over;
	};
	return task;
}



function checkTask(){
	var task:Task = new Task();
	var over:boolean = false;
	task.init = function(){
		over = false;
		this.web_.check(function(state:Geek.WebState){
			over = true;
		});
	};

	task.isOver = function(){
		return over;
	};
	return task;
}
function loginTask(){
	var task:LoginTask = new LoginTask();
	var _uuid:String = "";
	var _hash:String = "";
	var over = false;
	task.setUUID = function(uuid:String){
		_uuid = uuid;
	};
	task.setHash = function(hash:String){
		_hash = hash;
	};
	
	
	task.init = function(){
		over = false;
		this.web_.login(_uuid, _hash, function(state:Geek.WebState){
			over = true;
		});
		
	};

	task.isOver = function(){
		return over;
	};
	return task;
	
}



*/