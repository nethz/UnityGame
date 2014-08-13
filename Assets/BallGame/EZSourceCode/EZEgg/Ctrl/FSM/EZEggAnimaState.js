#pragma strict

class EZEggAnimaState extends StateWithEventMap{
	private var ctrl_:EZEggCtrl = null;
	
	public function EZEggAnimaState(ctrl:EZEggCtrl){
		ctrl_ = ctrl;
		addEvent("ok", "egg.main.input");
		addEvent("pet", "go.petInfo");
	}
	
	public function start(){
		Debug.Log("EZEggAnimaState start!!!!!");
		ctrl_.anima.show(true);
		ctrl_.drawEgg();
		EZBroadcast.GetInstance().close();
	}
	
	public function over(){
		ctrl_.anima.show(false);
		EZBroadcast.GetInstance().open(EZDictionaryScene.SceneName.Egg);
	}
	
}