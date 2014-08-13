#pragma strict

class EZUICtrl extends MonoBehaviour{
	public var _home:EZUIHome = null;
	public var _shop:EZUIShop = null;
	public var _setting:EZUISetting = null;

	
	private enum States{
		Home,
		Shop,
		Setting,
	}
	private var states_:States = States.Home;
		
	
	public function Awake(){
		_home.open();
		states_ = EZUICtrl.States.Home;
		//enableCtrl("UIHome");
	}
	
	//public function enableCtrl(name:String){
		
	//}
	//public function showShop():Task{
	//	var task:Task = _shop.show();
	//	return task;
	//}
	
	public function shopIn():Task{
		
		var mt:MultiTask = new MultiTask();
		mt.push(EZPopInstance.GetInstance().hideTask());
		
		var tl:TaskList = new TaskList();
		tl.push(_home.doDisabled());
		tl.push(_shop.show());
		tl.push(_home.doClose());
		mt.push(tl);
		
	
		TaskManager.PushBack(mt, function(){
			
			states_ = EZUICtrl.States.Shop;
			EZBroadcast.GetInstance().close();
			ActionManager.Run("global.ui.reset");
		});
		return mt;
	}
	public function settingIn():Task{
		var mt:MultiTask = new MultiTask();
		mt.push(EZPopInstance.GetInstance().hideTask());
		
		var tl:TaskList = new TaskList();
		tl.push(_home.doDisabled());
		tl.push(_setting.show());
		tl.push(_home.doClose());
		mt.push(tl);
		
	
		TaskManager.PushBack(mt, function(){
			EZBroadcast.GetInstance().close();
			ActionManager.Run("global.ui.reset");
			
			states_ = EZUICtrl.States.Setting;
		});
		return mt;
	
	}
	
	private function settingOut():Task{
	
		var mt:MultiTask = new MultiTask();
		mt.push(EZPopInstance.GetInstance().hideTask());
		var tl:TaskList = new TaskList();
		tl.push(_home.doOpen());
		tl.push(_setting.hide());
		tl.push(_home.doEnabled());
		TaskManager.PushBack(mt, function(){
			EZBroadcast.GetInstance().close();
			ActionManager.Run("global.ui.reset");
			
			states_ = EZUICtrl.States.Home;
		});
		mt.push(tl);
		return mt;
	}
	
	public function backToHome():Task{
		if(states_ == States.Shop){
			
			return shopOut();
		}else if(states_ == States.Setting){
			return settingOut();
		}
		return Task();
	
	}
	
	private function shopOut():Task{
	
		var mt:MultiTask = new MultiTask();
		mt.push(EZPopInstance.GetInstance().hideTask());
		var tl:TaskList = new TaskList();
		tl.push(_home.doOpen());
		tl.push(_shop.hide());
		tl.push(_home.doEnabled());
		TaskManager.PushBack(mt, function(){
			EZBroadcast.GetInstance().close();
			ActionManager.Run("global.ui.reset");
			states_ = EZUICtrl.States.Home;
		});
		mt.push(tl);
		return mt;
	}
	
	
	
	
}
