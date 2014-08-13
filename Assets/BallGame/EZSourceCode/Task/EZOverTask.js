#pragma strict

class EZOverTask extends Task{
	
	private var over_:boolean = false;
	function EZOverTask(){
		this.isOver = function(){
				return over_;
			};
	}
	public function get over():boolean{
		return over_;
	}
	public function set over(value:boolean){
		this.over_ = value;
	}
}