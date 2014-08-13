#pragma strict

class EZStateTask extends Task{

	protected var enable_:boolean = false; 
	public function set enable(value:boolean){
		enable_ = value;
	}
	
	public function start(){
		
		enable_ = true;
	}
	 
	public function over(){
		enable_ = false;
	}
	
	
}