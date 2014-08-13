#pragma strict

class EZLobbyButton extends MonoBehaviour{
	public var _text:String = "";
	public function OnClick(){
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(_text);
		TaskManager.Run(warning);
	}
}