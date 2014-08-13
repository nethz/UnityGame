#pragma strict

class EZDoLoadTask  extends Task{
	private var task_:Task = null;
	private var text_:String = "loading";
	public function set text(value:String){
		text_ = value;
	}
	public function get text():String{
		return text_;
	}
	public function set task(value:Task){
		this.task_ = value;
	}
	public function get task():Task{
		return  task_;
	}
}