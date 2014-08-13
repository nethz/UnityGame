#pragma strict

class EZQuestMissionItemView extends MonoBehaviour{
	
	
	public var _name:UILabel;
	public var _mission:EZQuestMission = null;
	public var _adr:UILabel;
	//通过关卡「测试文字」	
	class Text{
		public var _begin:String = "";
		public var _end:String = "";
		
		function setup(text:String):String{
			return _begin + text + _end;
		}
	}
	
	class MissionText{
		public var begin:String;
		public var end:String;
		public var apBegin:String;
		public var apEnd:String;
		public var text:String;
		public var evt:String;
	};
	public var _text:Text = null;	
	public var _missionText:MissionText = null;
	private var data_:JsonData.QuestItem = null;
	public function setup(data:JsonData.QuestItem):String{
		data_ = data;
		_mission.setScene(data_.mission.scene);
		if(data_.mission.mode == "pve"){
			_name.text = _missionText.text;
		}else{
			_name.text = _missionText.evt;
			
		} 
		
		var text:String = _missionText.begin + data_.mission.name + _missionText.end + _missionText.apBegin + Mathf.FloorToInt(data_.mission.ap).ToString() + _missionText.apEnd;
		_adr.text = _text.setup(data_.mission.name);//Geek.Limit(text, 30, true); 
		_name.enabled = true;
		_adr.enabled = true;
		_mission.open();
		return text;
	}
	public function close(){
		_mission.close();
	
	}
	
}