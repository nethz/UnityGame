#pragma strict

class MissionEventSonView extends EZUIAutoItemUnitInterface{

	class TextPack{
		public var _begin:String;
		public var _end:String;
		public function text(str:String):String{
			return _begin + str + _end;
		}
	};
	
	public var _title:UILabel;
	public var _box:BoxCollider = null;
	public var _ap:UILabel;
	public var _team:UILabel;
	
	public var _new:EZSub = null;
	public var _teamText:TextPack;
	public var _apText:TextPack;
	private var data_:JsonData.EvtMission = null;
	private var widget_:UIWidget[] = null; 
	private var alpha_:float = 0;
	public function get data():JsonData.EvtMission{
		return data_;
	}
	public var _cards:EZCardCoreView[] = null;
	
	function Awake(){
		
		widget_ = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(UIWidget), 
				function (component){component as UIWidget;}
			);
					
	
		
	}
	public function setup(subscript:EZSubscript, data:JsonData.EvtMission){
		data_ = data;
		_new.load(subscript, "e"+ data_.id.ToString());
	}
	public function setBox(enabled:boolean){
		_box.enabled = enabled;
	}
	public function setAlpha(alpha:float){
		alpha_ = alpha; 
		if(alpha == 0){
			setBox(false);
		}else{
			setBox(true);
		} 
		for(var i:int = 0; i<widget_.Length; ++i){
			widget_[i].color.a = alpha;
		}
	}

	public function alphaTask(alpha:float, allTime:float):Task{
		
		
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){ 
			refresh();
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
	
	

	private function refresh(){
	
		if(data_ != null){ 
			_title.enabled = true;
			_box.enabled = true;
			_ap.enabled = true;
			_team.enabled = true;  
			_team.text =  _teamText.text(data_.team.ToString());
			_ap.text =  _apText.text(data_.ap.ToString());
			_title.text = data_.name; 
			
			for(var i:int = 0;i<_cards.length;++i){
				var cards:JsonData.MissionCard[] = data_.cards;
				if(i < cards.Length){
					var core:EZCardCoreData = new EZCardCoreData();
					core.quality = Geek.GetQualityType(cards[i].quality);
					core.magicType = Geek.GetMagicType(cards[i].magicType);
					if(cards[i].quality == -1){
						core.style = "none";
					}else{
						core.style = cards[i].style;
					}
					_cards[i].setupCore(core);
				}else{
					_cards[i].setupCore(null);
				};
				_cards[i].open();
			}
		
			_new.open();
		
		}else{
		 
			_new.close();
			_title.enabled = false;
			_box.enabled = false;
			_ap.enabled = false;
			_team.enabled = false; 
		}
	}
	
		
}