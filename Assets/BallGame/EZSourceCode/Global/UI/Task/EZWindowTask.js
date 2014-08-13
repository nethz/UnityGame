#pragma strict

class EZWindowTask extends Task{
	private var text_:String = "";
	private var message_:String = "";
	private var okOrCancel_:boolean = false;
	private var ok_:String = "";
	private var cancel_:String = "";
	public function get ok():String{
		return ok_;
	}
	public function set ok(value:String){
		ok_ = value;
	}
	
	public function get cancel():String{
		return cancel_;
	}
	public function set cancel(value:String){
		cancel_ = value;
	}
	
	public function get text():String{
		return text_;
	}
	public function set text(value:String){
		text_ = value;
	}
	
	
	
	public function get message():String{
		return message_;
	}
	public function set message(value:String){
		message_ = value;
	}
	public function set okOrCancel(value:boolean){
		okOrCancel_ = value;
	}
	public function get okOrCancel():boolean{
		return okOrCancel_;
	}
		
	
}