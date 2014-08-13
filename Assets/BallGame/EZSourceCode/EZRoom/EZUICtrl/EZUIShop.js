#pragma strict

class EZUIShop extends EZUIBase{
	public var _shop:EZShopCtrl = null;
	public var _logic:EZShopLogic = null;
	public var _panels:EZUIPanels = null;
	public function updateTag(name:String){
		if(name == this.name){
			_shop.tag = "Ctrl";
		}else{
			_shop.tag = "Untagged";
		}
	}
	
	public function show():Task{
		var task:Task = _panels.show();
		TaskManager.PushFront(task, function(){
			this.gameObject.SetActive(true);
			_shop.tag = "Ctrl";
		});
		TaskManager.PushBack(task, function(){
			Debug.Log("on shop force");
			_logic.onForce();
		});
		return task;
	
	}
	public function hide():Task{
	
		var task:Task = _panels.hide();
		
		TaskManager.PushFront(task, function(){
			_logic.outForce();
		});
		TaskManager.PushBack(task, function(){
			_shop.tag = "Untagged";
			this.gameObject.SetActive(false);
		});
		return task;
	}
}