#pragma strict

class EZIDListAction  extends ActionObj{
	private var list_:EZSoul.Seat[] = null;
	public function set list(value:EZSoul.Seat[]){
		list_ = value;
	}
	public function get list():EZSoul.Seat[]{
		return list_;
	}

}