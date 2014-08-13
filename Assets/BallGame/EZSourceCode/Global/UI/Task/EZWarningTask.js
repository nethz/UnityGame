#pragma strict

class EZWarningTask extends Task{
	class Item{
		var title:String = null;
		var message:String = null;
	
	}
	private var texts_:List.<Item> = new List.<Item>();
	private var isWarning_:boolean = true;

	public function addText(text:String){
		var item:Item = new Item();
		item.title = text;
		item.message = "";
		texts_.Add(item);
	}
	public function addMessage(title:String, message:String){
		var item:Item = new Item();
		item.title = title;
		item.message = message;
		texts_.Add(item);
	}
	public function get messages():List.<Item>{
		return texts_;
	}
	
	public function set warningSound(value:boolean){
		isWarning_ = value;
	}
	
	public function get warningSound():boolean{
		return isWarning_;
	}
	

	
}