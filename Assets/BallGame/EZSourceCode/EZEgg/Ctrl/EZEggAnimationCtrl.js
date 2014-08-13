#pragma strict

class EZEggAnimationCtrl extends MonoBehaviour{
	public var _view:EZEggAnimationView = null;
	
	public function show(isShow:boolean){
		_view.show(isShow);
	}
	
	public function drawEgg(cards:List.<EZCard>){
		_view.drawEgg(cards);
	}
	
	public function changeUI(change:boolean){
		_view.changeUI(change);
	}
	
}