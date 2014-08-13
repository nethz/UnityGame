#pragma strict

class EZSetStringAction extends ActionObj{
	
	private var text_:String;
	public function get text():String{
		return text_;
	}
	
	public function setValue(text:String){
		text_ = text;
	}
	
	
	
	
}