#pragma strict
class EZScene extends MonoBehaviour{
	public var _shadowMode:float = 1.25f;
	public function get shadowMode():float{
		return _shadowMode;
	}
	public function OnClick(){
	
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		if(action){
			action.msg = "back";
			ActionManager.Run(action);
		}
	}
}