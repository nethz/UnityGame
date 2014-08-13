#pragma strict

class EZCardView extends EZCardViewInfo{

	public var _core:EZCardCoreView = null;
	public var _cardCover:UISprite = null;
	public var _cancel:EZButtonCallback = null;
	public var _select:UISprite = null;
	public var _selectBox:BoxCollider = null;
	public var _mark:UISprite = null;
	public var _team:UISprite = null;
	public var _lv:UILabel = null;
	public var _new:EZSub = null;
	public var _pop:EZPopPosition = null;
	public var _userLocked:UISprite = null;
	
	private var data_:EZCard = null;
	private var enabler_:EZCardViewEnabler = null;
	public function set enabler(value:EZCardViewEnabler){
		this.enabler_ = value as EZCardViewEnabler;
	}
	public function cancel(mode:String){
		if(data_ != null){
			var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			target.SendMessage("removeCard", data_, SendMessageOptions.DontRequireReceiver);
		}
	}

	
	public function Awake(){
		_cancel.setup(cancel, "cancel");
	}
	public function load(subscript:EZSubscript, data:EZCard){
		data_ = data;
		if(subscript){
			_new.load(subscript, "p"+ data_.id.ToString());
		}
		if(data_){
			refresh();
		}else{
			clear();
		}
	}
	
	private function clear(){
		_select.enabled = false;
		_selectBox.enabled = false;
		_mark.enabled = false;
		_userLocked.enabled = false;
		_team.enabled = false;
		_lv.enabled = false;
		_cardCover.enabled = false;
		_core.close();	
		_new.close(); 
	}
	
	private function refreshData(){
		this.seat = data_.seat;
		this.magicType = data_.magicType;
		this.lv = data_.lv;
		this.quality = data_.quality;
		this.id = data_.id;
		this.attack = data_.attack;
		this.speed = data_.speed;
		this.maxHealth = data_.maxHealth;
		this.seat = data_.seat;
		this.mark = data_.mark;
		this.userLocked = data_.userLocked;
		
	}
	
	public function refresh(){
		this.refreshData();
		if(_team){
			switch(data_.seat){
			case EZSoul.Seat.WeBattle:
				_team.enabled = true;
				_team.spriteName = "MarkLeader";
				break;
			case EZSoul.Seat.WeBag1:
				_team.enabled = true;
				_team.spriteName = "MarkMember";
				break;
			case EZSoul.Seat.WeBag2:
				_team.enabled = true;
				_team.spriteName = "MarkMember";
				break;
			default:
				_team.enabled = false;
				break;
			}
		}
		_core.setup(data);
		_core.open();
		_new.open();
		if(_mark){
			if(data_.mark == EZCard.Mark.No){
				_mark.enabled = false;
			}else{
				_mark.enabled = true;
				switch(data_.mark){
					case EZCard.Mark.Circle:
						_mark.spriteName = "MarkRound";
						break;
					case EZCard.Mark.Diamond:
						_mark.spriteName = "MarkDiamond";
						break;
					case EZCard.Mark.X:
						_mark.spriteName = "MarkX";
						break;
					case EZCard.Mark.Triangle:
						_mark.spriteName = "MarkTriangle";
						break;
					case EZCard.Mark.Star:
						_mark.spriteName = "MarkStar";
						break;
				}
			}
		}
		if(_userLocked){
			if(data_.userLocked == EZCard.UserLocked.unlocked){
				_userLocked.enabled = false;
			}else{
				if(data_.seat != EZSoul.Seat.None){
					_userLocked.enabled = false;
				}else{
					_userLocked.enabled = true;
				}
			}
		}
		if(mainSelected){
			_select.enabled = true;
			_selectBox.enabled = true;
			_select.spriteName = "SelectMain";
		}else if(selected){
			_select.enabled = true;
			_selectBox.enabled = true;
			_select.spriteName = "SelelctDeputy";
		}else{
			_select.enabled = false;
			_selectBox.enabled = false;
		}
		
		if(_lv){
			_lv.text = (data_.lv + 1).ToString();
			_lv.color = Geek.GetQualityColor(data_.quality, 1, 1);
		}
		if(enabler_){
			var info:EZCheckerInfo = enabler_.getEnable(this, data_);
			if(info.result){
				_core.selected(false);
				_lv.color.a = 1f;
				_cardCover.enabled = false;
			}else{
				_core.selected(true);
				_pop.tipMessage = info.message;
				_lv.color.a = 0.5f;
				_cardCover.enabled = true;
			}
		}else{
			_core.selected(false);
			_lv.color.a = 1f;
			_cardCover.enabled = false;
		
		}
	}
	
	public function get data():EZCard{
		return this.data_;
	}
	
	
}