#pragma strict
class EZLeadInfoTouch extends MonoBehaviour{
	public var _input:EZInput = null;
	public var _id:String = "";
	public var _info:EZLeadInfo = null;
	private var _time:float = -1.0f;
	public var _longTime = 0.5f;
	public function OnPress(press:boolean){
		if(press){
			_time = 0;
		}else{
			if(_time != -1){
				_input.onShort(_id);
				_info.touch(_id);
				_time = -1;
			}
		}
	} 
	public function Update(){
		if(_time != -1){
			_time+= Time.deltaTime;
			if(_time >= 0.5f){
				_input.onLong(_id);
				_info.longTouch(_id);
				_time = -1;
			}
		}
	}
}
