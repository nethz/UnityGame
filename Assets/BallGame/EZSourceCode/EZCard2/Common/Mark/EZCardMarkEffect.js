#pragma strict

class EZCardMarkEffect extends MonoBehaviour{
	public var _no:UICheckbox;
	public var _circle:UICheckbox;
	public var _diamond:UICheckbox;
	public var _x:UICheckbox;
	public var _triangle:UICheckbox;
	public var _star:UICheckbox;
	
	public var _model:EZPetInfoModel;

	private var marker_:EZCard.Mark  = EZCard.Mark.No;
	private var btn_:UICheckbox= _no;
	
	
	public function disClickedBtn(){
		marker_ = _model.getCard().mark;
		switch(marker_){
			case EZCard.Mark.No:
				btn_ = _no;
				break;
			case EZCard.Mark.Circle:
				btn_ = _circle;
				break;
			case EZCard.Mark.Diamond:
				btn_ = _diamond;
				break;
			case EZCard.Mark.X:
				btn_ = _x;
				break;
			case EZCard.Mark.Triangle:
				btn_ = _triangle;
				break;
			case EZCard.Mark.Star:
				btn_ = _star;
				break;
		}
		btn_.isChecked = true;
	}
}