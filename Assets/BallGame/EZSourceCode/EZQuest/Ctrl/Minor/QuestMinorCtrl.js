#pragma strict

class QuestMinorCtrl extends MonoBehaviour{
	public var _view:QuestMinorView = null;
	
	public function open(){
		_view.open();
	}
	
	public function closeTask():Task{
		return _view.closeTask();
	}
	
	public function openTask():Task{
		return _view.openTask();
	}
	
	public function foldTask():Task{
		return _view.foldTask();
	}
	
	public function setup(data:EZQuestMinorSetup){
		var itemDatas:List.<JsonData.Quest> = data.list;
		_view.title = data.title;
		_view.progress = data.progress;
		_view.manager.setItems(data.subscript, itemDatas);
	}
	
}