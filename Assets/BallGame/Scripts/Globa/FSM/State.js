#pragma strict
class State
{
	private var name_ = "";
	protected var fatherName_ = "";
	public function get name():String{
		return name_;
	}
	public function set name(value:String){
		name_ = value;
	}
	
	public function get father_name():String{
		return fatherName_;
	}
	public function set father_name(value:String){
		fatherName_ = value;
	}
	var getCurrState:Function = function(name:String){return null;};
	function State(){
		
	}
	
	function constructed()
	{
	
	}
	function update(d:float):String
	{
		return "";
	}
	function start()
	{
		
	}
	function over()
	{
		
	}
	function postEvent(evt:FSMEvent):String
	{
		return "";
	}

};