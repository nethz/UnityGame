#pragma strict
class EZWeixinCtrl  extends MonoBehaviour{ 
	public var _error:String = "error";
	//public var _ok:String = "ok";
	//public var _cancel:String = "cancel";
	//public var _bind:String = "bind";
	//public var _change:String = "change";
	public function errorTask():EZWarningTask{
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(_error);
		return warning;
	}/*
	public function bindTask():EZWindowTask{
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _bind;
		window.ok = _ok;
		window.cancel = _cancel;
		return window;
	}
	public function changeTask():EZWindowTask{
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _change;
		window.ok = _ok;
		window.cancel = _cancel;
		
		
		return window;
	}*/
}