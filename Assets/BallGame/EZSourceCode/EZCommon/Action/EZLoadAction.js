#pragma strict

class EZLoadAction extends ActionObj{
	
	private var loadName_:String;
	public function get loadName():String{
		return loadName_;
	}
	public function load(name:String){
		this.loadName_ = name;
	}
	
	

	
}