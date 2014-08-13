#pragma strict

class PSortWindow extends MonoBehaviour{
	/*public var _lv:UICheckbox = null;
	public var _qua:UICheckbox = null;
	public var _pro:UICheckbox = null;
	public var _attack:UICheckbox = null;
	public var _speed:UICheckbox = null;
	public var _hp:UICheckbox = null;
	public var _boxs:BoxCollider[] = null;
	public var _widgets:UIWidget[] = null;
	
	private var isShow_ = false;
	private var type_:EZCardSort.Type = EZCardSort.Type.Lv;
	private var btn_:UICheckbox = null;
	
	public function Awake(){
		//isShow_ = false;
		//refresh();
	}

	public function OnClick(){
		show = false;
	}
	
	public function disClickedBtn(){
		if(PlayerPrefs.HasKey("card_sort")){
			type_ = (EZCardSort.Type)(PlayerPrefs.GetInt("card_sort"));
		}
		switch(type_){
			case EZCardSort.Type.Lv:
				btn_ = _lv;
				break;
			case EZCardSort.Type.Quality:
				btn_ = _qua;
				break;
			case EZCardSort.Type.MagicType:
				btn_ = _pro;
				break;
			case EZCardSort.Type.Attack:
				btn_ = _attack;
				break;
			case EZCardSort.Type.Speed:
				btn_ = _speed;
				break;
			case EZCardSort.Type.MaxHealth:
				btn_ = _hp;
				break;
		}
		btn_.isChecked = true;
	}

	public function set show(value:boolean){
		isShow_ = value;
		refresh();
	}
	
	public function refresh(){
		disClickedBtn();
		for(var i:int = 0;i<_boxs.length;++i){
			_boxs[i].enabled = isShow_;
		}
		for(var j:int = 0;j<_widgets.length;++j){
			_widgets[j].enabled = isShow_;
		}
	}*/
}