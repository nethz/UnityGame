#pragma strict

class EZMouseHandler extends MonoBehaviour{
	private var _press:Function = null;

	public function set press(value:Function){
		_press = value;
	}
	

	
	
	public function OnPress(state:boolean){
		if(_press){
			_press(state);
		}
	}
	

	
}