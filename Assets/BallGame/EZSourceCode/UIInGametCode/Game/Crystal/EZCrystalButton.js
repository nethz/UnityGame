#pragma strict
class EZCrystalButton extends MonoBehaviour{
	public var _target:GameObject = null;
	
	public function OnPress(state:boolean){
		if(state){
			_target.SendMessage("down", SendMessageOptions.DontRequireReceiver);
		}else{
			_target.SendMessage("up", SendMessageOptions.DontRequireReceiver);
		}
	}

	public function OnClick(){
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		if(action){
			action.msg = "action.crystal";
			ActionManager.Run(action);
		}
			
	
	}
}
