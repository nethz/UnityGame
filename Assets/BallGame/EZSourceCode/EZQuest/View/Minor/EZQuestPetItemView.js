#pragma strict

class EZQuestPetItemView extends MonoBehaviour{
	
	
	public var _name:UILabel;
	public var _adr:UILabel;
	public var _metal:UISprite;
	public var _wood:UISprite;
	public var _water:UISprite;
	public var _fire:UISprite;
	public var _earth:UISprite;
	public var _lv:UILabel;
	public var _begin:String;
	public var _mid:String;
	public var _end:String;
	public var _title:String;
	public var _magicTypes:String[];
	
	class Text{
		public var _begin:String;
		public var _mid:String;
		public var _end:String;
		public var _magicTypes:String[];
		public function setup(lv:int, magicType:Geek.MagicType):String{
			return _begin + (lv+1).ToString() + _mid+ _magicTypes[magicType]+ _end;
		}
		
	}
	var _text:Text = null;
	public function setup(data:JsonData.QuestItem):String{
	
		_lv.enabled = true;
		_lv.text = (data.card.lv+1).ToString();
		Debug.Log(JsonData.QuestItem.Save(data));
		var magicType:Geek.MagicType = Geek.GetMagicType(data.card.magicType);
		switch(magicType){
		case Geek.MagicType.Metal:
			_metal.enabled = true;
			break;
		case Geek.MagicType.Wood:
			_wood.enabled = true;
			break;
		case Geek.MagicType.Water:
			_water.enabled = true;
			break;
		case Geek.MagicType.Fire:
			_fire.enabled = true;
			break;
		case Geek.MagicType.Earth:
			_earth.enabled = true;
			break;
		}
		_name.text = _title;
		var text:String = _begin + (data.card.lv+1).ToString() + _mid+ _magicTypes[magicType]+ _end;
		
		_adr.text = _text.setup(data.card.lv, magicType);//Geek.Limit(text, 42, true);
		_name.enabled = true;
		_adr.enabled = true;
		return text;
	}
	
	public function close(){
		_metal.enabled = false;
		_wood.enabled = false;
		_fire.enabled = false;
		_earth.enabled = false;
		_fire.enabled = false;
		_lv.enabled = false;
	
	
	}
	
	
}