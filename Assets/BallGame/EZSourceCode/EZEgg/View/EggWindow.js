#pragma strict

class EggWindow extends MonoBehaviour{
	enum Mode{
		Money,
		Diamond,
	};
	
	
	public var _moneyTitle:String = "money";
	public var _moneyBegin:String = "money begin";
	public var _moneyEnd:String = "money end";
	public var _diamondTitle:String = "diamond";
	public var _diamondBegin:String = "diamond begin";
	public var _diamondEnd:String = "diamond end"; 
	public var _ok:String = "ok";
	public var _cancel:String = "cancel";
	
	public var _tenText:String = "call";

	
	public function openTask():EZWindowTask{
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;

		window.text = _moneyTitle;
		window.message = _moneyBegin +  setup.game.draw_money.ToString() + _moneyEnd;
		window.cancel = _cancel;//n_.ToString() + _tenText
		window.ok = _ok;
	
	
		return window;
	}
	
	
	
	public function openThiTask(mode:EggWindow.Mode, n:int):EZThiWindowTask{
		var window:EZThiWindowTask = TaskManager.Create("global.ui.thiWindow") as EZThiWindowTask;
		
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		
		window.left = _cancel;
		window.right = _ok;
	
		switch(mode){
			case Mode.Money:
					window.text = _moneyTitle;
					window.message = _moneyBegin +  setup.game.draw_money.ToString() + _moneyEnd;
					
					window.mid = n.ToString() + _tenText;
				
				break;
				case Mode.Diamond:
					window.text = _diamondTitle;
					window.message =_diamondBegin + setup.game.draw_diamond.ToString() + _diamondEnd ;
					
					window.mid = "10" + _tenText;
					if(n >= 10){
						window.midEnable = true;
					}else{
						window.midEnable = false;
					}
				break;
		
		}
		return window;
	}
	


	
}