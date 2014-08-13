#pragma strict
class EZLogoCtrl extends MonoBehaviour{
	public var _touch:EZWindowButton = null;
	public var noLoginText:String ="";
	public function Awake(){
		_touch.close();
	}
	public function noLoginTask():Task{
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(noLoginText);
		return warning;
	}
	public function showTouch(){
		_touch.open(true);
	}
}