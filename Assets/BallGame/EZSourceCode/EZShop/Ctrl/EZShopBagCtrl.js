#pragma strict

class EZShopBagCtrl extends MonoBehaviour{

	public var _view:EZShopView;
	public var _ok:String = "";
	public var _cancel:String = "";
	public var _moneyBegin:String = "";
	public var _moneyEnd:String = "";
	public var _diamondBegin:String = "";
	public var _diamondEnd:String = "";
	function openTask():Task{
		return _view.bag.openTask();
	}
	
	
	function close(){
		_view.bag.close();
	}
	
	public function confirmMoneyTask(money:int):EZWindowTask{ 
		var task:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		task.text = _moneyBegin + money + _moneyEnd;
		task.ok = _ok;
		task.cancel = _cancel;
		return task;
	}
	
	public function confirmDiamondTask(diamond:int):EZWindowTask{ 
		var task:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		task.text = _diamondBegin + diamond + _diamondEnd;
		task.ok = _ok;
		task.cancel = _cancel;
		return task;
	}
}