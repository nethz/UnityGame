#pragma strict

class EZPetInfoModel extends MonoBehaviour{

	private var card_:EZCard = null;
	public function setCard(data:EZCard){
		card_ = data;
	}
	
	public function getCard():EZCard{
		return card_;
	}
	public static function Name2Mark(name:String):EZCard.Mark{
		var ret:EZCard.Mark = EZCard.Mark.No;
		switch(name){
			case "mark_circle":
				ret = EZCard.Mark.Circle;
				break;
			case "mark_diamond":
				ret = EZCard.Mark.Diamond;
				break;
			case "mark_x":
				ret = EZCard.Mark.X;
				break;
			case "mark_triangle":
				ret = EZCard.Mark.Triangle;
				break;
			case "mark_star":
				ret = EZCard.Mark.Star;
				break;
		}
		return ret;
	
	}
	public function mark(name:String){
		var mark:EZCard.Mark = Name2Mark(name);
		card_.mark = mark;
	}
	
	public function get userLocked():EZCard.UserLocked{
		return card_.userLocked;
	}
	
	public function set userLocked(value:EZCard.UserLocked){
		card_.userLocked = value;
	}
}