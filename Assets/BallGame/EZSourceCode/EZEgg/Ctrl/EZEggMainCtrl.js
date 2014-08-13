#pragma strict

class EZEggMainCtrl extends MonoBehaviour{

	public var _view:EZEggMainView = null;
	
	public function setup(player:JsonData.Player, bag:JsonData.Bag, setup:JsonData.Setup){
		_view.setup(player, bag, setup);
	}
	
	public function open(){
		_view.open();
	}
	
	public function close(){
		_view.close();
	}
	
	

}