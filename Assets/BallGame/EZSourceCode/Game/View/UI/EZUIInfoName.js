#pragma strict

class EZUIInfoName extends MonoBehaviour{
	var _name:UILabel;
	var _lv:UILabel;
	var _group:UILabel;
	var _magicType:UISprite;
	public var _group0:String = "";
	public var _group1:String = "";
	public var _group2:String = "";
	public var _group3:String = "";
	public var _group4:String = "";
	public var _group5:String = "";
	
	
	public var _size:float = 60.0f;
	public var _out:float = 60.0f;
	public var _metal:String = "metal";
	public var _wood:String = "wood";
	public var _water:String = "water";
	public var _fire:String = "fire";
	public var _earth:String = "earth";
	
	private function getSpriteName(magicType:Geek.MagicType):String{
		var ret:String = "";
		switch(magicType){
		case Geek.MagicType.Metal:
			ret = _metal;
			break;
		case Geek.MagicType.Wood:
			ret = _wood;
			break;
		case Geek.MagicType.Water:
			ret = _water;
			break;
		case Geek.MagicType.Fire:
			ret = _fire;
			break;
		case Geek.MagicType.Earth:
			ret = _earth;
			break;
		
		}
		return ret;
	}
	
	public function setup(soul:EZSoul){
		_name.text = soul.title;
		if(soul.seat == EZSoul.Seat.WeBattle || soul.seat == EZSoul.Seat.WeBag1 || soul.seat == EZSoul.Seat.WeBag2){
			_lv.text = "Lv" + (parseInt(soul.baseLv)+ 1) + "";
		}else{
			_lv.text = "";
		}
		_group.text = getGroup(soul.group);
		var size:Vector2 = _name.relativeSize;
		Debug.Log(size);
		_lv.gameObject.transform.localPosition = _name.gameObject.transform.localPosition + new Vector3(_size * size.x + _out, 0f,0f);
		_magicType.spriteName = getSpriteName(soul.type);
	}
	
	private function getGroup(group:int):String{
		switch(group){
			case 0:
				return _group0;
			break;
			case 1:
				return _group1;
			break;
			case 2:
				return _group2;
			break;
			case 3:
				return _group3;
			break;
			case 4:
				return _group4;
			break;
			case 5:
				return _group5;
			break;
			default:
				return "none";
			break;
		}
	}
}