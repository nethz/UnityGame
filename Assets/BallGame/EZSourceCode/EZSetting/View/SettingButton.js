#pragma strict

class SettingButton extends MonoBehaviour{
	public var _arrow:UISprite = null;
	private var alpha_:float = 1.0f;
	public function set alpha(value:float){
		this.alpha_ = value;
		_arrow.color.a = alpha_;
	}
	public function OnPress(state:boolean){
		if(state){
			_arrow.color.a = 0.5f;
		}else{
			_arrow.color.a = alpha_;
		}
	}
	
}