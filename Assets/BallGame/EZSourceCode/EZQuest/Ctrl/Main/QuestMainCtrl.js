#pragma strict

class QuestMainCtrl extends MonoBehaviour{
	public var _view:QuestMainView = null;
	public function openTask():Task{
		return _view.openTask();;
	}
	public function closeTask():Task{
		return _view.closeTask();
	}
	public function open(){
		_view.open();
	}
	
	public function close(){
		_view.close();
	}
	
	public function setup(data:EZQuestMainSetup){
		var itemDatas:EZQuestMainSetup.Item[] = data.items;
		var passNum:int = 0;
		for(var i:int = 0;i<itemDatas.length;++i){
			if(itemDatas[i].isPass){
				passNum++;
			}
		}
		_view.progress = passNum.ToString() + "/" + (itemDatas.length).ToString();
		_view.manager.setItems(itemDatas);
	}
}