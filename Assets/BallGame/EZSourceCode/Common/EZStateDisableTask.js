#pragma strict

class EZStateDisableTask extends EZStateTask{
	public function set enable(value:boolean){
		enable_ = value;
	}
	public function start(){
		
		enable_ = true;
	}
	function EZStateDisableTask(){ 
		this.isOver = function():boolean{ 
		
			return enable_;
			};
	}
}