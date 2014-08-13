#pragma strict
class EZLeadBackTouch extends MonoBehaviour{
	public var _info:EZLeadInfo = null;
	public function OnClick(){
		_info.touch("Back");
		var action:EZPostEventAction = ActionManager.Create("controller.postEvent") as EZPostEventAction;
		if(action){
			action.msg = "back";
			ActionManager.Run(action);
		}
	}
	
}
