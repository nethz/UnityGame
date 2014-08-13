#pragma strict
class EZCardViewSeat extends MonoBehaviour{
	public var _card:EZCardViewSeatCard;
	public var _lab:EZCardViewSeatLab;
	public var _locked:UISprite = null; 
	public var _lockedLabel:UILabel = null;
	public var _lockedCover:UISprite = null;
	
	public var _empty:UISprite = null;
	private var data_:EZCard = null;
	private var selected_:boolean = false;

	public function setCard(data:EZCard){
		data_ = data;
	}
	public function set selected(value:boolean){
		selected_ = value;
	}
	public function get selected():boolean{
		return selected_;
	
	}
	public function isEmpty():boolean{
		if(data_ == null){
			return true;
		}
		return false;
	
	}
	public function refresh(){
		if(data_ == null){
			_empty.enabled = true;
			_locked.enabled = false;
			_lockedLabel.enabled = false;
			_lockedCover.enabled = false;
			_card.setCard(null);
			_lab.setCard(null);
		}else if(data_.locked){
			_empty.enabled = false;
			_locked.enabled = true;
			_lockedLabel.enabled = true;
			_lockedCover.enabled = true;
			_card.setCard(null);
			_lab.setCard(null);
		}else{
			_empty.enabled = false;
			_locked.enabled = false;
			_lockedLabel.enabled = false;
			_lockedCover.enabled = false;
			_card.setCard(data_);
			_lab.setCard(data_);
		
		}
		_card.selected = selected_;
		_card.refresh();
		_lab.refresh();
		
	}
}