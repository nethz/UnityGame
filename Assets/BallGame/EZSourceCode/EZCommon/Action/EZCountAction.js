#pragma strict

class EZCountAction extends ActionObj{
	
	private var count_:int;
	public function get count():int{
		return count_;
	}
	public function set count(value:int){
		count_ = value;
	}
	
	private var list_:EZSoul.Seat[] = null;
	public function set list(value:EZSoul.Seat[]){
		list_ = value;
	}
	public function get list():EZSoul.Seat[]{
		return list_;
	}
	
}