#pragma strict

class PCardView extends MonoBehaviour{
	public var _card:EZCardCoreView = null;
	public var _markUser:UISprite = null;
	public var _markTeam:UISprite = null;
	public var _markSelect:UISprite = null;
	public var _lv:UILabel = null;
	
	public enum Select{
		main,
		material,
		no,
	}
	
	private var data_:EZCard = null;
	private var select_:Select = Select.no;
	
	public function load(data:EZCard){
		this.data_ = data;
		refresh();
	}
	
	public function refresh(){
		if(data_){
			_card.setup(data_);
			setMarkUser(data_);
			setMarkTeam(data_);
			_lv.text = data_.lv + "";
			_lv.color = Geek.GetQualityColor(data_.quality, 1, 1);
		}
	}
	
	public function get select():PCardView.Select{
		return this.select_;
	}
	
	public function set select(value:PCardView.Select){
		this.select_ = value;
		if(select_ == Select.no){
			_markSelect.enabled = false;
			_card.selected(false);
		}else{
			switch(select_){
				case Select.main:
					_markSelect.spriteName = "SelectMain";
					_card.selected(true);
					break;
				case Select.material:
					_markSelect.spriteName = "SelectDeputy";
					_card.selected(true);
					break;
			}
		}
	}
	
	private function setMarkUser(data:EZCard){
		if(data.mark == EZCard.Mark.No){
			_markUser.enabled = false;
		}else{
			_markUser.enabled = true;
			switch(data.mark){
				case EZCard.Mark.Circle:
					_markUser.spriteName = "MarkRound";
					break;
				case EZCard.Mark.Diamond:
					_markUser.spriteName = "MarkDiamond";
					break;
				case EZCard.Mark.X:
					_markUser.spriteName = "MarkX";
					break;
				case EZCard.Mark.Triangle:
					_markUser.spriteName = "MarkTriangle";
					break;
				case EZCard.Mark.Star:
					_markUser.spriteName = "MarkStar";
					break;
			}
		}
	}
	
	private function setMarkTeam(data:EZCard){
		switch(data.seat){
		case EZSoul.Seat.WeBattle:
			_markTeam.enabled = true;
			_markTeam.spriteName = "MarkLeader";
			break;
		case EZSoul.Seat.WeBag1:
			_markTeam.enabled = true;
			_markTeam.spriteName = "MarkMember";
			break;
		case EZSoul.Seat.WeBag2:
			_markTeam.enabled = true;
			_markTeam.spriteName = "MarkMember";
			break;
		default:
			_markTeam.enabled = false;
			break;
		}
	}
	
}