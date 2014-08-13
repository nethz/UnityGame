#pragma strict

class EZQuestCardItemView extends MonoBehaviour{
	
	
	public var _name:UILabel;
	public var _adr:UILabel;
	
	public var _card:EZCardCoreView = null;
	
	
	
	public var _adrBegin:String;
	public var _adrEnd:String;
	public var _nameBegin:String[];
	public var _nameEnd:String;
	public var _nameString:String;
	public var _evtNameString:String;
	
	class Text{
		
	
		public var _adrBegin:String;
		public var _adrEnd:String;
		public var _nameBegin:String[];
		public var _nameEnd:String;
		
		public function setup(mission:String, q:int, name:String):String{
			return  _adrBegin + mission + _adrEnd + _nameBegin[q] + name+ _nameEnd;
		}
	}
	public var _text:Text = null;
	private var data_:JsonData.QuestItem = null;
	public function setup(data:JsonData.QuestItem){
		data_ = data;
		var core:EZCardCoreData = new EZCardCoreData();
		Debug.LogWarning(JsonData.QuestItem.Save(data));
		Debug.Log(data_);
		Debug.Log(data_.card);
		
  		core.quality = Geek.GetQualityType(data_.card.quality);
		core.magicType = Geek.GetMagicType(data_.card.magicType);
		core.style = data_.card.style;
	 	_card.setupCore(core);
		
		if(data_.mission.mode == "pve"){
			_name.text = _nameString;
		}else{
			_name.text = _evtNameString;
		}
		var text:String = _adrBegin + data_.mission.name+ _adrEnd + _nameBegin[data_.card.quality] + data_.card.name+ _nameEnd;
		_adr.text = _text.setup(data_.mission.name, data_.card.quality, data_.card.name);//Geek.Limit(text, 30, true);
		_name.enabled = true;
		_adr.enabled = true;
		
		_card.open();
		return text;
	}
	
	public function close(){
		_card.close();
	
	}
	
	
}