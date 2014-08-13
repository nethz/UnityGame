#pragma strict
import  System;
import  System.Collections;
import  System.Collections.Generic;
import  System.ComponentModel;
import  System.Globalization;
import  System.IO;
import  System.Reflection;
import  System.Text;
class EventItemView extends MonoBehaviour{
	class TextPack{
		public var _begin:String;
		public var _end:String;
		public function text(str:String):String{
			return _begin + str + _end;
		}
	};
	
	public var _prototype:GameObject = null;
	
	private var _updateTime:float = 0;
	public var _autoItem:EZUIAutoItem;
	public var _placeholder:EZUIAutoItemUnitInterface;
	
	public var _key:UISprite = null;
	public var _reTime:UILabel = null;
	public var _bg:UISprite = null;
	public var _title:UILabel = null;
	public var _box:BoxCollider = null;
	private var isLock_:boolean = true;
	private var isOpen_:boolean = false;
	public var _table:UITable = null;
	public var _new:EZTeamSub = null;
	private var missions_:MissionEventSonView[] = null;
	private var data_:EZMissionEvtMenuData = null;
	public var _lockDay:TextPack;
	public var _lockH:TextPack;
	public var _lockM:TextPack; 
	public var _timeH:TextPack;
	public var _timeM:TextPack; 
	public var _reTimeString:TextPack;   
	public var _allOpen:String;   
	
	 
	public var _openColor:Color;
	public var _closeColor:Color;
	public function get data():EZMissionEvtMenuData{
		return data_;
	} 
	
	function unfold(){
	};
	
	function fold(){
	};
	public function Awake(){
		isLock_ = false;
		this.close();
		refresh();
		_autoItem.unfold = this.unfold;
		_autoItem.fold = this.fold;
	}
	public function setup(subscript:EZSubscript, data:EZMissionEvtMenuData){
		data_ = data; 
		_new.load(subscript, data.subList);
		setItems(subscript, data_.list);
		refresh();
	}

	
	public function Update(){
		if(isOpen_){
			 if(_updateTime<= 0){
			 	this.refresh();
			 	 _updateTime = UnityEngine.Random.Range(10, 15);
			 }else{
			 	 _updateTime -= Time.deltaTime;
			 }
		}
	
	}
	public function refreshKey(){
	
            
		if(data_){
			
	 		switch(data_.key){
	 		case 0:
				_key.enabled  = false;
	 			break;
	 		case 1:
	 			_key.spriteName = "CuKey";
				_key.enabled  = true;
	 			break;
	 		case 2:
	 			_key.spriteName = "AgKey";
				_key.enabled  = true;
	 			break;
	 		case 3:
	 			_key.spriteName = "GoldKey";
				_key.enabled  = true;
	 			break;
	 		}
			
			
		}else{
			_key.enabled  = false;
		}
		_key.MakePixelPerfect();
	}
	public function refreshText(){
		     
		if(data_){
			
	
			_title.text = data_.title;
			
			_title.enabled  = true;
		}else{
			_title.enabled  = false;
		}
	}
	
	public function hidden(){
		_reTime.enabled = false;
		_box.enabled = false;
		_key.enabled = false;
		_bg.enabled = false;
		_title.enabled = false;
	
	}
	public function lockDay(number:int, time:System.DateTime){
	
		
		_reTime.text = _lockDay.text(number.ToString()) + _timeH.text(time.Hour.ToString()) + _timeM.text(time.Minute.ToString()) ; 
		_reTime.color = _closeColor;
		 
		refreshText();
		refreshKey();
		 
		_reTime.enabled = true;
		_box.enabled = true;
		_key.enabled = true;
	//	_consume.enabled = false;
	//	_enemy.enabled = false;
	//	for(var j:int = 0; j< _cards.Length; ++j){
	//		_cards[j].close();
	//	}
		_bg.enabled = true;
		_title.enabled = true;
	} 
	
	public function lockTime(minutes:int){
	//	_unLockTime.enabled = true;
		_reTime.text = _lockH.text((minutes/60).ToString()) + _lockM.text((minutes%60).ToString()); 
		_reTime.color = _closeColor;
	//	_lockBg.enabled = true; 
		refreshText();
		refreshKey();
		_reTime.enabled = true;
		_box.enabled = true;
		_key.enabled = true;
	//	_consume.enabled = false;
	//	_enemy.enabled = false;
	//	for(var j:int = 0; j< _cards.Length; ++j){
	//		_cards[j].close();
	//	}
		_bg.enabled = true;
		_title.enabled = true;
	}
	public function unlock(m:int){
		refreshKey();
		refreshText();
//		refreshCard();
		_box.enabled = true;
		_bg.enabled = true;
		_reTime.enabled = true; 
		_reTime.text = _reTimeString.text(m.ToString()); 
		_reTime.color = _openColor;
		//_unLockTime.enabled = false;
	//	_lockBg.enabled = false;
	
	}  
	
	 public function allways(){
		refreshKey();
		refreshText();
		//refreshCard();
		_box.enabled = true;
		_bg.enabled = true;
		_reTime.enabled = true;  
		_reTime.color = _openColor;
		_reTime.text = _allOpen;
		//_reTime.text = _reTimeString.text(m.ToString());
		//_unLockTime.enabled = false;
	//	_lockBg.enabled = false;
	
	}   
	public function nextManyDays(time:System.DateTime){
	 	var day:int = time.DayOfWeek;
		for(var n:int = 1; n<8; ++n){
			if(data_.day[(day+n ) % 6]){
				return n;
			}
		}
		
		return -1;
	}
	
	public function howManyDays(time:System.DateTime){
		
		var day:int = time.DayOfWeek;
		
		for(var n:int = 0; n<7; ++n){
			if(data_.day[(day+n) % 6]){
				return n;
			}
		
		} 
		
		return -1;
	}
	public function OnPress(isPressed:boolean){
		if(isPressed){
			_new.close();
		}
	}
	public function refresh(){
		var hidden:boolean = false;
		if(this.data_ && isOpen_){ 
			Debug.Log("aaa");
			var time:System.DateTime = EZDateTime.GetDateTime(EZTimestamp.GetInstance().epoch); 
			var days:int = howManyDays(time);
			if(days == 0){ 
				var sTime:TimeSpan = EZDateTime.GetDateTime(this.data_.start).TimeOfDay; 
				var nTime:TimeSpan = time.TimeOfDay; 
				var eTime:TimeSpan =  EZDateTime.GetDateTime(this.data_.end).TimeOfDay;  
				var start:int =  sTime.Hours*60 + sTime.Minutes; 
				var now:int =  nTime.Hours*60 + nTime.Minutes;
				var end:int =  eTime.Hours*60 + eTime.Minutes; 
				if(start == end){
					 allways();
				}else if(now < start){
					 lockTime(start - now);
				}else if(now > end){
					 lockDay(nextManyDays(time), EZDateTime.GetDateTime(this.data_.start));
				}else{
					unlock(end - now);
				
				}
				
			}else{
				lockDay(days, EZDateTime.GetDateTime(this.data_.start));
			}
		
			_new.open();
		}else{
			Debug.Log("bbbb");
			this.hidden();
		
			_new.close();
		}
			
	}
	
	
	public function open(){
		isOpen_ = true;
		this.refresh();
	}
	
	public function close(){
		isOpen_ = false;
		this.refresh();
	} 
	private function destoryItems(){
		
	}
	private function create(num:int){
		_autoItem.clearObj();
		destoryItems();
		missions_ = new MissionEventSonView[num];
		for(var i:int = 0; i < num; ++i){
			missions_[i] = createSon();
			missions_[i].gameObject.name = "Card"+i.ToString("D3");
			var autoUnit:EZUIAutoItemUnitInterface = missions_[i].gameObject.GetComponent(EZUIAutoItemUnitInterface);
			_autoItem.addObj(autoUnit);
		}
		_placeholder.transform.parent = _table.gameObject.transform;
		_autoItem.addObj(_placeholder);
		_table.Reposition();
	}
	
	public function setItems(subscript:EZSubscript, list:List.<JsonData.EvtMission>){
		create(list.Count); 
		for(var i:int = 0;i<list.Count; ++i){
			missions_[i].setup(subscript, list[i]);
		}
	} 
	
	private function createSon():MissionEventSonView{
		var obj:GameObject = GameObject.Instantiate(_prototype.gameObject);
		var mission:MissionEventSonView = obj.GetComponent(MissionEventSonView) as MissionEventSonView;
		obj.transform.parent = _table.gameObject.transform;
		obj.transform.localPosition = _prototype.gameObject.transform.localPosition;
		obj.transform.localScale = Vector3.one;
		obj.SetActive(false);
		return mission;
	}


	//public function setCards(dates:EZCardCoreData[]){
	//	for(var i:int = 0;i<_cards.length;++i){
	//		_cards[i].setupCore(dates[i]);
	//	}
	//}
	
}