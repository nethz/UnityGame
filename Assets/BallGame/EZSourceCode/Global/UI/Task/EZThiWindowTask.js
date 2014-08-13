#pragma strict

class EZThiWindowTask extends Task{
	enum Result{
		Left,
		Mid,
		Right,
		None,
	}
	private var text_:String = "";
	private var message_:String = "";
	private var result_:EZThiWindowTask.Result = EZThiWindowTask.Result.None;
	private var left_:String = "";
	private var mid_:String = "";
	private var right_:String = "";
	
	
	private var leftEnable_:boolean = true;
	private var midEnable_:boolean = true;
	private var rightEnable_:boolean = true;
	
	public function get leftEnable():boolean{
		return leftEnable_;
	}
	
	public function set leftEnable(value:boolean){
		leftEnable_ = value;
	}
	
	public function get midEnable():boolean{
		Debug.Log("AAAAAAAAA" + midEnable_);
		return midEnable_;
	}
	public function set midEnable(value:boolean){
		midEnable_ = value;
	}
	
	public function get  rightEnable():boolean{
		return  rightEnable_;
	}
	public function set  rightEnable(value:boolean){
		 rightEnable_ = value;
	}
	
	
	
	
	public function get left():String{
		return left_;
	}
	public function set left(value:String){
		left_ = value;
	}
	
	public function get mid():String{
		return mid_;
	}
	public function set mid(value:String){
		mid_ = value;
	}
	
	public function get  right():String{
		return  right_;
	}
	public function set  right(value:String){
		 right_ = value;
	}
	
	
	
	public function get text():String{
		return text_;
	}
	public function set text(value:String){
		text_ = value;
	}
	
	public function get title():String{
		return text_;
	}
	public function set title(value:String){
		text_ = value;
	}
	
	
	
	public function get message():String{
		return message_;
	}
	public function set message(value:String){
		message_ = value;
	}
	
	
	
	public function set result(value:EZThiWindowTask.Result){
		result_ = value;
	}
	public function get result():EZThiWindowTask.Result{
		return result_;
	}
		
	
}