#pragma strict

class QuestRewardCardView extends EZUIAutoItemUnitInterface{

	
	public var _name:UILabel;
	private  var text_:String = "";
	//public var _card:EZCardCoreView = null;
	//public var _mission:EZQuestMission = null;
	public var _adr:UILabel;
	public var _pass:UISprite;
	public var _comeIn:UISprite;

	public var _box:BoxCollider = null;
	private var data_:JsonData.QuestItem = null;
	private var isOpen_:boolean = false;
	private var isBox_:boolean = false;
	private var widget_:UIWidget[] = null; 
	private var alpha_:float = 0;
	public var _mission:EZQuestMissionItemView = null;
	public var _card:EZQuestCardItemView = null;
	public var _newPeople:EZQuestNewPeople = null;
	public var _pet:EZQuestPetItemView = null;
	function get mode(){
		return data_.mode;
	}
	function Awake(){
		
		open();
		widget_ = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(UIWidget), 
				function (component){component as UIWidget;}
			);
					
	
		
	}
	public function setAlpha(alpha:float){
		alpha_ = alpha;
		for(var i:int = 0; i<widget_.Length; ++i){
			widget_[i].color.a = alpha;
		}
	}
	public function setBox(enable:boolean){
		isBox_ = enable;
		refresh();
	}
	public function alphaTask(alpha:float, allTime:float):Task{
		if(alpha == 0){
			setBox(false);
		}else{
			setBox(true);
		} 
		
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject, allTime, this.alpha_, alpha, this.gameObject, "setAlpha");
		};
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		return task;
		
	}
	
	
	
	public function get data():JsonData.QuestItem{
		return data_;
	}
	public function setup(data:JsonData.QuestItem){
	  	data_ = data; 
	  
		refresh();
	}
	public function get title():String{
		return _name.text;
	}
	public function get message():String{
		return text_;
	}
	public function open(){
		isOpen_ = true;  
		refresh();
	}
	
	public function close(){
		
		isOpen_ = false;  
		refresh();
	} 
	public function OnPress(state:boolean){
		if(state){ 
			_comeIn.color.a = 0.5;
		}else{ 
			_comeIn.color.a = 1;
		}
	}
	private function refresh(){
		if(isOpen_ && data_ != null){ 
			if(data_.pass){
				_pass.enabled = true;
				_box.enabled = false;  
				_comeIn.enabled = false;
			}else{
				_pass.enabled = false;
				_box.enabled = true;  
				_comeIn.enabled = true;
			
			}
			
			if(data_.mode == "mission"){
				text_ = _mission.setup(data_);
			}else if(data_.mode == "card"){
				text_ = _card.setup(data_);
				Debug.Log(text_);
			}else if(data_.mode == "pet"){
				text_ = _pet.setup(data_);
			}else{
				text_ = _newPeople.setup(data_.mode);
			}
			
		
			
		}else{
			_card.close(); 
			_mission.close();
			_newPeople.close();
			_pet.close();
			_name.enabled = false;
			_adr.enabled = false;
			_pass.enabled = false;
			_box.enabled = false; 
		}
	}
	
		
}