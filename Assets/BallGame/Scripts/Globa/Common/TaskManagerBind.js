#pragma strict

private var filter_:Filter = null;

function Start(){
	this.filter_ = new Filter();
}


function Update() { 
	 var d:float = filter_.interval(Time.deltaTime);
	 TaskManager.instance().runner.update(d);
	
}
