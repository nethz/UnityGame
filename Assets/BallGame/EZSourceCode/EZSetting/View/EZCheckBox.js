#pragma strict

 class EZCheckBox extends MonoBehaviour{ 
 	public var _target:GameObject = null;
 	public var _funName:String = "OnAction";
 	public var _flag:UISprite = null;
 	public var _on:UISprite = null;
  	public var _separate:UISprite = null;
 	public var _off:UISprite = null;
 	public var _initState:boolean = false;
	public var _method:GeekTweener.Method;
	public var _time:float = 0.08f;
 	
 	private var state_:boolean = false;
 	private function get target():GameObject{
		if(_target != null){
			return _target;
		}
		return GameObject.FindGameObjectWithTag("Ctrl");;
	}
 	public function OnAction(){
 		state = !state;
 	}
 	
 	public function Awake(){
 		state = _initState;
 		refresh();
 	} 
 	
 	public function open(){
 		 show = true;
 	}
 	
 	public function close(){
 		 show = false;
 	}
 	
 	public function set show(value:boolean){//interface
 		_flag.enabled = value;
 		_on.enabled = value;
 		_separate.enabled = value;
 		_off.enabled = value;
 		var onBox:Collider = _on.gameObject.GetComponent(Collider);
 		var offBox:Collider = _off.gameObject.GetComponent(Collider);
 		if(onBox){
 			onBox.enabled = value;
 		}
 		if(offBox){
 			offBox.enabled = value;
 		}
 	}
 	
 	public function set state(value:boolean){//interface
		state_ = value;
		refresh();
		
		target.SendMessage(_funName, this.state_, SendMessageOptions.DontRequireReceiver);
		
 	}
 	
 	public function get state():boolean{//interface
 		return state_;
 	}
 	
 	public function refresh(){
 		if(state_){
 			setOn();
 			_on.color = new Color(0f,0f,0f);
 			_off.color = new Color(1f,1f,1f);
 		}else{
 			setOff();
  			_on.color = new Color(1f,1f,1f);
 			_off.color = new Color(0f,0f,0f);
 		}
 	}
 	
 	private function setOn(){
 		var tp:GeekTweenPosition = null;
 		tp = GeekTweenPosition.Begin(_flag.gameObject, _time, _on.gameObject.transform.localPosition);
		tp.method = _method;
 	}
 	
 	private function setOff(){
 		var tp:GeekTweenPosition = null;
 		tp = GeekTweenPosition.Begin(_flag.gameObject, _time, _off.gameObject.transform.localPosition);
		tp.method = _method;
 	}
 	
 	
 }