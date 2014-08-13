#pragma strict

class EZLobbyBall extends MonoBehaviour{
	class HSV{
		public var h:float = 0;
		public var s:float = 1;
		public var v:float = 1;
	};
	public var _ball:UITexture = null; 
	public var _light:UITexture = null; 
	private var isOpen_:boolean = false;
	private var data_:JsonData.Crystal = null;
	
	public var _magicTexture:Texture[] = null;
	public var _hsv:HSV[] = null;
	public function Awake(){
		this.close();
	}
	public function setup(data:JsonData.Crystal){
		this.data_ = data;
		if(this.data_){
			open();
		}else{
			close();
		}
	}
	public function open(){
		this.isOpen_ = true;
		refresh();
	}
	public function close(){
		this.isOpen_ = false;
		refresh();
	}
	
	public function refresh(){
		if(isOpen_ && data_ !=null && data_.has()){
			_ball.enabled = true;
			_light.enabled = true;
			
			//_ball.shader = Shader.Find("Custom/HSVShader");
			if(data_.cry.id >= 0 && data_.cry.id <_magicTexture.Length){
				_ball.material.SetTexture("_MainTex", _magicTexture[data_.cry.id]);
			}
			if(data_.ball.group >= 0 && data_.ball.group <_hsv.Length){
				_ball.material.SetFloat("_HueShift", _hsv[data_.ball.group].h);
				_ball.material.SetFloat("_Sat", _hsv[data_.ball.group].s);
				_ball.material.SetFloat("_Val", _hsv[data_.ball.group].v);
			}
			
		}
		else{
			_ball.enabled = false;
			_light.enabled = false;
		}
	}
	

}