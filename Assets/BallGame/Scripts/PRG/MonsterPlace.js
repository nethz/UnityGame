#pragma strict

class MonsterPlace extends MonoBehaviour {

//	public var _foePower:UILabel = null;
	function Awake(){
		//TaskManager.registerTask("foe.power", this.foePowerTask);
	}
	/*
	function foePowerTask(){
		var task:SetTextTask = new SetTextTask();
		var _text:String = "e";
		task.setText = function(text:String){
			_text = text;
		};
		task.init = function(){
			if(_foePower!= null)
				_foePower.text = _text;
		};
		return task;
	}*/
};