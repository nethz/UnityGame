#pragma strict

class EZEggCtrl extends MonoBehaviour{
		
	public var _main:EZEggMainCtrl = null;
	public var _animation:EZEggAnimationCtrl = null;
	public var _window:EggWindow = null;
	public var _ap:EZApCtrl = null;
	
	private var drawMode_:EggWindow.Mode = EggWindow.Mode.Money;
	private var cards_:List.<EZCard> = null;
	private var drawCount_:int = 0;
	public var _ok:String = "ok";
	public var _cancel:String = "_cancel";
	public var _goShop:String = "_goShop";
	public var _goShopEnd:String = "_goShop";
	
	class BagOverflow{
		var title:String = "";
		var text:String = "";
		var cancel:String = "";
		var comp:String = "";
		var shop:String = "";
	}
	
	public var _overflow:BagOverflow = null;
	
	//public var _noBagWindow:EZMissionNoBagWindow = null;
	
	//public function get noBagWindow():EZMissionNoBagWindow{
	//	return _noBagWindow;
	//}
	public function overflowTaskWithShop():EZThiWindowTask{
	
	
		var window:EZThiWindowTask = TaskManager.Create("global.ui.thiWindow") as EZThiWindowTask;
	
		window.title = _overflow.title;
		window.message = _overflow.text;	
		window.right = _overflow.shop;
		window.mid = _overflow.comp;
		window.left = _overflow.cancel;
		return window;
				/*
				TaskManager.PushBack(window, function(){
					if(window.result == EZThiWindowTask.Result.Right){
						var shop:Task = gotoLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Shop));
						TaskManager.PushBack(shop, function(){
							isOver = true;
						});
						TaskManager.Run(shop);
					}else if(window.result == EZThiWindowTask.Result.Mid){
						var pet:Task = gotoLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet));
						TaskManager.PushBack(pet, function(){
							isOver = true;
						});
						TaskManager.Run(pet);
					}else{
						isOver = true;
					}
				});
				(/
				TaskManager.Run(window);
			};
			task.isOver = function():boolean{
				return isOver;
			};
			return task;*/
	}
	
	
	
	//public var _json:String = '{"epoch":"1382679175","card":{"type":"ex_P726","natureProp":{"style":"tinman","type":"Earth","group":"1","name":"123"},"baseProp":{"quality":"0","exp":"0","lv":"0","attack":"7","speed":"9","maxHealth":"160"},"id":"14","ver":"15000"}}';
	public function Awake(){
	//	var loader:JsonData.CardInfoLoader = new JsonData.CardInfoLoader();
	//	var info:JsonData.DataInfo = loader.load(_json);
	//	Debug.LogWarning("info:" + info);
	
	}
	public function goShopTask():EZWindowTask{
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		window.text = _goShop + player.diamond + _goShopEnd;
		window.ok = _ok;
		window.cancel = _cancel;
		return window;
	
	}
	public function get cards():List.<EZCard>{
		return cards_;
	}
	
	public function set cards(value:List.<EZCard>){
		cards_ = value;
	}
	
	public function Start(){
		var soul:JsonData.Soul = JsonData.Soul.Load('{"type":"aaaccc","natureProp":{"style":"cat","type":"Fire","group":0,"name":"fuck"},"baseProp":{"quality":3,"exp":543000,"lv":49,"attack":520,"speed":650,"maxHealth":4000},"skillProp":{"tech":{"type":"3","affixes":[{"type":"attack","mark":"attack","name":"none","info":"none","level":[1,1,1,1,1],"lv":2,"coefficient":0.05},{"type":"combo","mark":"combo","name":"aaabc","info":"none","level":[-0.5,-0.45556,-0.41111,-0.36667,-0.36667],"lv":2,"coefficient":1,"times":3},{"type":"perish_together","mark":"pt","name":"none","info":"none","level":[0.5,0.5,0.5,0.5,0.5],"lv":2,"self":[0.3,0.23333,0.16667,0.1,0.1]}]}},"magicProp":{"maxPower":12,"tech":{"type":"4","affixes":[{"type":"attacked","mark":"attacked","name":"none","info":"none","level":[1,1,1,1,1],"lv":3,"step_6":6.7,"step_12":4.7,"step_18":4.1,"coefficient":0.02},{"type":"combo","mark":"comboed","name":"","info":"none","level":[-0.5,-0.48148,-0.46296,-0.44444,-0.42592],"lv":3,"coefficient":1,"times":3},{"type":"perish_together","mark":"pted","name":"none","info":"none","level":[0.5,0.5,0.5,0.5,0.5],"lv":3,"self":[0.3,0.26667,0.23333,0.2,0.16667]},{"type":"initiative_add","mark":"first_added","name":"none","info":"none","level":[1,1.25,1.5,1.75,2],"lv":0}]}},"id":-1,"ver":-1}');
		cards_ = new List.<EZCard>();
		for(var i:int = 0; i<5; ++i ){
			var card:EZCard = new EZCard();
			card.load(soul);
			cards_.Add(card);
		}
		
	}
	
	public function drawEgg(){
		_animation.drawEgg(cards_);
	}
	
	public function get drawMode():EggWindow.Mode{
		return drawMode_;
	}
	
	public function set drawMode(value:EggWindow.Mode){
		drawMode_ = value;
	}

	public function get drawCount():int{
		return drawCount_;
	}
	
	public function set drawCount(value:int){
		drawCount_ = value;
	}

	public function get main():EZEggMainCtrl{
		return _main;
	}
	
	public function openThiWindowTask(mode:EggWindow.Mode, n:int):EZThiWindowTask{
	//	_window.setMode();
		return _window.openThiTask(mode, n);
		
	}
	
	public function openWindowTask():EZWindowTask{
		//_window.setMode();
		return _window.openTask();
		
	}
		

	
	public function get anima():EZEggAnimationCtrl{
		return _animation;
	}
	
	public function load(){
		_ap.refresh();
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		var bag:JsonData.Bag = EZBagTable.GetInstance().bag; 
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data; 
		
		
		_main.setup(player, bag, setup);
		_main.open();
		
	}

}