#pragma strict

class EZCardCompView extends MonoBehaviour{
	public var _topTitle:UISprite = null;
	public var _main:EZCardCompMainView;
	public var _material:EZCardCompMaterialView;
	public var _guide:EZCardCompGuide;
	public var _button:EZLockButton;
	public var _execute:UIImageButton;
	public var _green:UISlider;
	public var _red:UISlider;
	public var _expInfo:UILabel;
	public var _max:UISprite;
	public var _lvLimit:UILabel = null;
	public var _addGreenTiem:float = 2f;
	public var _fulledTime:float = 0.5f;
	public var _normalLvColor:Color = Color.white;
	public var _fullLvColor:Color = Color.yellow;
	public var _overflowLvColor:Color = Color.red;
	public var _upingSound:EZSound = null;
	public var _upSound:EZSound = null;
	
	private var lvLimit_:boolean = false;
	private var widgets_ :UIWidget[] = null;
	private var boxes_ :BoxCollider[] = null;
	public var _panel:UIPanel = null;
	
	public function initGuide(){
		_guide.init();
	}
	public function overGuide(){
		_guide.over();
	}
	public function Awake(){
		
		boxes_ = System.Array.ConvertAll(
			this.gameObject.GetComponentsInChildren(BoxCollider), 
			function (component){component as BoxCollider;}
			);
	}
	
	public function setEnabled(enabled:boolean){
		_panel.enabled = enabled;
		for(var j:int = 0; j<boxes_.length; ++j){
			boxes_[j].enabled = enabled;
		}
	}
	
	public function show(){
		_topTitle.spriteName = "fusionTop";
		setEnabled(true);
		_main.show();
		_main.clearMainPro();
	}
	public function hide(){
		_main.hide();
		setEnabled(false);
		_guide.post("enable");
	}
	public function get button():EZLockButton{
		return _button;
	}
	
	public function setGreen(val:float){
		_green.sliderValue = val;
	}
	
	private function greenBar(val:float){
		val = Mathf.Clamp01(val);
		if(val >  _green.sliderValue){
			var tv:GeekTweenValue = GeekTweenValue.Begin(_green.gameObject, 0.2, _green.sliderValue, val, this.gameObject, "setGreen");
			tv.method = GeekTweener.Method.easeOutExpo;
		}else{
			setGreen(val);
		}
	}
	
	private function setLvPercent(val:float){
		_expInfo.text = Mathf.FloorToInt(val *100) + "%";
	}
	
	public function setMainLvTask(lv:int,i:int):Task{
		var task:Task = new Task();
		task.init = function(){
			_main.setMainLv(lv + 1 + i,_normalLvColor);
		};
		task.isOver = function(){
			return true;
		};
		return task;
	}
	
	public function greeBarTask(from:float,to:float):Task{
		var task:Task = new Task();
		var tvExp:GeekTweenValue = null;
		var tvExpNum:GeekTweenValue = null;
		var timeScale:float = (to - from)/1f;
		timeScale = Mathf.Clamp01(timeScale);
		task.init =  function(){
			setRed(to);
			_upingSound.play();
			tvExp = GeekTweenValue.Begin(_green.gameObject,_addGreenTiem * timeScale,from, to, this.gameObject, "setGreen");
			tvExpNum = GeekTweenValue.Begin(_expInfo.gameObject,_addGreenTiem * timeScale,from, to, this.gameObject, "setLvPercent");
			tvExp.method = GeekTweener.Method.Linear;
		};
		task.isOver = function(){
			return tvExp && !tvExp.enabled;
		};
		task.shutdown = function(){
			_upingSound.stop();
		};
		return task;
	}
	
	public function playLvUpSound(){
		_upSound.play();
	}
	
	private function setRed(val:float){
		_red.sliderValue = val;
	}
	private function redBar(from:float, to:float){
		from = Mathf.Clamp01(from);
		to = Mathf.Clamp01(to);
		setRed(from);
		var tv:GeekTweenValue = GeekTweenValue.Begin(_red.gameObject, 0.2, _red.sliderValue, to, this.gameObject, "setRed");
		tv.method = GeekTweener.Method.easeOutExpo;
		
	}
	
	
	public function setMain(data:EZCard, die:boolean){
		Debug.Log(data);
		_main.setCard(data, die);
	}
	public function refreshGuide(){
	
		if(_main.empty()){
			_guide.post("main");
		}else if(!_material.enough()){
		
			_guide.post("no_money");
		
		}else if(_material.empty()){
		
			_guide.post("material");
		}else{
			_guide.post("ok");
		}
			
	}
	public function refresh(){
		_main.refresh();
		_material.refresh();
		_max.enabled = false;
		_expInfo.enabled = false;
		_lvLimit.enabled = true;
		if(_main.empty() || _material.empty() ||!_material.enough()){
			_execute.isEnabled = false;
		}else{
			_execute.isEnabled = true;
		}
		if(!_material.enough()){
			_material.setNeedColor(new Color(255,0,0,255));
		}else{
			_material.setNeedColor(new Color(255,255,255,255));
		}
		if(!_main.empty()){
			_green.enabled = true;
			var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
			var player:JsonData.Player = EZPlayerTable.GetInstance().data;
			var playerLv:int = setup.player.getLv(player.exp);
			var red:float = _material.exp + _main.exp;
			
			var flv = setup.soul.getLv(_main.exp);
			var tlv = setup.soul.getLv(red);
			var addLv:int = tlv - flv;
			if(tlv <= flv) addLv = 0;
			if(setup.soul.isMax(_main.exp)){
				_max.enabled = true;
				_expInfo.enabled = false;
				_lvLimit.enabled = false;
			}else{
				if(_main.lv >= playerLv){
					_lvLimit.enabled = true;
					lvLimit_ = true;
					_red.gameObject.GetComponentInChildren(UISprite).enabled = false;
				}else{
					_lvLimit.enabled = false;
					lvLimit_ = false;
					_max.enabled = false;
					_expInfo.enabled = true;
					_expInfo.text = Mathf.FloorToInt(setup.soul.getExpBar(_main.exp) *100) + "%";
					Debug.Log("<---------------_main.exp-------------------->" + _main.exp);
					_red.gameObject.GetComponentInChildren(UISprite).enabled = true;
					if(_material.exp > 0){
						_expInfo.text = Mathf.FloorToInt(setup.soul.getExpBar(_main.exp) *100) + "%" + "(" + (Mathf.FloorToInt(setup.soul.getExpBar(red) *100) + addLv*100) + "%)";
						Debug.Log("<---------------red-------------------->" + red);
					}
				}
			}
			greenBar(setup.soul.getExpBar(_main.exp));
			var lv = setup.soul.getLv(red);
			if(lv > _main.lv){
				if(lv >= playerLv){
					_main.setMainLv(lv + 1,_overflowLvColor);
				}else{
					_main.setMainLv(lv + 1,_fullLvColor);
				}
				redBar(_green.sliderValue, 1);	
			}else{
				_main.setMainLv(_main.lv + 1,_normalLvColor);
				redBar(_green.sliderValue, setup.soul.getExpBar(red));	
			}
			
			if(_main.lv >= playerLv){
				_main.setMainLv(lv + 1,_overflowLvColor);
			}

		}else{
			setGreen(0);
			setRed(0);
			_expInfo.enabled = false;
			_lvLimit.enabled = false;
			_max.enabled = false;
		}
		refreshGuide();
	}

	
	public function get lvLimit():boolean{
		return lvLimit_;
	}
	
	public function setMaterials(datas:EZCard[]){
	
		_material.setCards(datas);
		
	}
	public function setMoney(money:int){
		_material.setMoney(money);
	}
	public function setMaterialMoney(materialMoney:int){
		_material.setMaterialMoney(materialMoney);
	}
	public function mainClear():Task{
		return _main.clearTask();
	}
	/*
	public function openWindow(){
		_window.open();
	}
	
	public function closeWindow(){
		_window.close();
	}
	*/

	
	
	
}