#pragma strict

class EZLobbyView extends MonoBehaviour{
	public var _lv:UILabel;
	public var _ap:UISlider;
	public var _exp:UISlider;
	public var _apText:UILabel;
	public var _expText:UILabel;
	public var _money:UILabel;
	public var _bag:UILabel;
	public var _diamond:UILabel;
	public var _news:UIImageButton;
	public var _newsNum:UILabel;
	public var _quest:UIImageButton;
	public var _questNum:UILabel;
	public var _weather:EZWeather;
	public var _hero:EZLobbyHero;
	public var _crystal:EZLobbyCrystal;
	public var _questButton:UIImageButton;
	public var _shopButton:UIImageButton;
	public var _eggButton:UIImageButton;
	public var _settingButton:UIImageButton;
	public var _out:EZLobbyOut = null;
	public var _panels:UIPanel[] = null;
	
	public function Awake(){
		
		
	}
	public function closeUI(){
		for(var i:int = 0; i<_panels.Length; ++i){
			_panels[i].enabled = false;
		}
		
		_out.isEnabled = false;
	}
	public function openUITask(allTime:float):Task{
		var task:Task = new Task();
		var time:float= 0;
		var isOver:boolean = false;
		task.init = function(){
			time = 0;
			isOver = false;
			_hero.setAlpha(0);
			for(var i:int = 0; i<_panels.Length; ++i){
				 
				_panels[i].alpha = 0;
				_panels[i].enabled = true;
			}
		};
		task.update = function(d:float){
			time += d;
			
			var r:float = time/allTime;
			if(r >= 1){
				isOver = true;
				return;
			}else{
				var alpha:float = r;
				for(var i:int = 0; i<_panels.Length; ++i){
					_panels[i].alpha = alpha;
				}
				
				_hero.setAlpha(r);
			}
		
		};
		task.isOver = function():boolean{
			return isOver;
		};
		task.shutdown = function(){
			for(var i:int = 0; i<_panels.Length; ++i){
				_panels[i].alpha = 1;
			}
			_out.isEnabled = true;
			_hero.setAlpha(1);
		
		};
		return task;
	}
	public function openUI(){
		
		for(var i:int = 0; i<_panels.Length; ++i){
			_panels[i].enabled = true;
		}
	}
	
	public function get questButton():UIImageButton{
		return _questButton;
	}
	public function get shopButton():UIImageButton{
		return _shopButton;
	}
	public function get settingButton():UIImageButton{
		return _settingButton;
	}
	public function get eggButton():UIImageButton{
		return _eggButton;
	}
	public function get crystal():EZLobbyCrystal{
		return _crystal;
	}
	public function get hero():EZLobbyHero{
		return _hero;
	}
	
	public function get weather():EZWeather{
		return _weather;
	}
	public function set diamond(value:String){
		this._diamond.text = value;
	}
	public function set bag(value:String){
		this._bag.text = value;
	}
	public function set money(value:String){
		this._money.text = value;
	}
	public function set lv(value:String){
		_lv.text = value;
	}
	public function set apText(value:String){
		_apText.text = value;
	}
	public function set expText(value:String){
		_expText.text = value;
	}
	public function setAp(ap:float){
		_ap.sliderValue = ap;
	}
	public function set ap(value:float){
		var to:float = value;
		var from:float = _ap.sliderValue;
		if( to > from){
			GeekTweenValue.Begin(_ap.gameObject, 0.2, from, to, this.gameObject, "setAp");
		}else{
			setAp(to);
		}
	}
	
	public function set exp(value:float){
		_exp.sliderValue = value;
	}
	public function set news(value:int){
		var n:int = value;
		if(n <= 0){
			_news.normalSprite ="News2";
			_news.hoverSprite ="News2";
			_news.pressedSprite ="News2";
			_newsNum.enabled = false;
			
		}else {
		
			_news.normalSprite ="News";
			_news.hoverSprite ="News";
			_news.pressedSprite ="News";
			_newsNum.enabled = true;
			if(n <=9 ){
				_newsNum.text = n +"";
			}else{
				_newsNum.text = "+";
			}
		
		}
		
		_news.SendMessage("OnHover", false, SendMessageOptions.DontRequireReceiver);
	}
	public function set quest(value:int){
		var n:int = value;
		if(n <= 0){
			_quest.normalSprite ="Quest2";
			_quest.hoverSprite ="Quest2";
			_quest.pressedSprite ="Quest2";
			_questNum.enabled = false;
		}else {
			_quest.normalSprite ="Quest";
			_quest.hoverSprite ="Quest";
			_quest.pressedSprite ="Quest";
			_questNum.enabled = true;
			if(n <=9 ){
				_questNum.text = n +"";
			}else{
				_questNum.text = "+";
			}
		}
		_quest.SendMessage("OnHover", false, SendMessageOptions.DontRequireReceiver);
	}
	
	
}