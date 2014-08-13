#pragma strict

class EZEffect extends MonoBehaviour{
	enum State{
		Flicker,
		Normal,
		White,
	};
	private var state_:EZEffect.State = EZEffect.State.Normal;
	public var _sprite:exSprite;
	public var _whiteFloat:float = 0.5f;
	private var time_:float = 0.0f;
	private var interpreter_:float = 0.0f;
	private var color_:Color = Color.white;
	private var layer_:int = -1;
	
	private function updateLayer(layer:int){
		if(layer_ == -1){
			layer_ = this.gameObject.layer;
		}
		
		if(layer != -1){
			gameObject.layer = layer;
		}else{
			gameObject.layer = layer_;
		}
	}
	public function set size(value:Vector2){
		var size:Vector2 = value;
		_sprite.width = size.x;
		_sprite.height = size.y;
	} 
	
	public function setInterpreter(interpreter:float){
		 interpreter_ = interpreter;
		 if(interpreter == 0 && this.gameObject.active){
		 	this.gameObject.SetActive(false);
		 }
		 this.gameObject.renderer.material.SetFloat("_interpreter", interpreter);
		 
	}	 
	public function flicker(layer:int){
		
		updateLayer(layer);
		gameObject.SetActive(true);
		state_ = this.State.Flicker;
		this._sprite.color.a = 100.0f/255.0f;
		GeekTweenValue.Begin(this.gameObject, 0.3f, interpreter_, 1.0f, this.gameObject, "setInterpreter");
		time_ = 0.0f;
	}
	public function normal(layer:int){
		Debug.LogWarning("normal");
		
		updateLayer(layer);
		gameObject.SetActive(true);
		state_ = this.State.Normal;
		this._sprite.color.a = 100.0f/255.0f;
		GeekTweenValue.Begin(this.gameObject, 0.3f, interpreter_, 0.0f, this.gameObject, "setInterpreter");
	}
	public function white(layer:int){
		Debug.LogWarning("white");
		
		updateLayer(layer);
		
		gameObject.SetActive(true);
		state_ = this.State.White;
		this._sprite.color.a = 100.0f/255.0f;
		GeekTweenValue.Begin(this.gameObject, 0.3f, interpreter_, 1.0f, this.gameObject, "setInterpreter");
	}
	public function feedback(color:Color, layer:int){
		updateLayer(layer);
		
		Debug.LogWarning("feedback");
		var tv:GeekTweenValue = null;
		var task:Task = new Task();
		task.init = function(){
			gameObject.SetActive(true);
			this._sprite.color = color;
			this._sprite.color.a = _whiteFloat;
			setInterpreter(1f);
			tv = GeekTweenValue.Begin(this.gameObject,0.5f, 1f, 0.0f, this.gameObject, "setInterpreter");
			tv.method = GeekTweener.Method.EaseOut;
		};
		task.isOver = function(){
			return tv && !tv.enabled;
		};
		TaskManager.PushBack(task,function(){
			this._sprite.color = color_;
			this._sprite.color.a = 100.0f/255.0f;
		});
		TaskManager.Run(task);
	}
	
	public function normal(allTime:float):Task{
		Debug.LogWarning("normal");
		var task:Task = new Task(); 
		var tv:GeekTweenValue = null;
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject, allTime, 1.0f, 0.0f, this.gameObject, "setInterpreter");
		};
		return task;
	}
	public function Update(){
		if(state_ == this.State.Flicker){
			time_ += Time.deltaTime *2;
			if(time_ > 2.0f){
				time_ = 0.0f;
			}
			if(time_ <= 1.0f){
				this._sprite.color.a = 100.0f/255.0f * time_;
			}else{
				
				this._sprite.color.a = 100.0f/255.0f * (2.0f - time_);
			}
		}
	}
	public function handler(shader:String, allTime:float):Task{ 
	
		var task:Task = new Task(); 
		var tv:GeekTweenValue = null;
		task.init = function(){
			this.gameObject.SetActive(true);
			_sprite.enabled = true;
			this.renderer.material.shader = Shader.Find(shader);
			tv = GeekTweenValue.Begin(this.gameObject, allTime, 0.0f, 1.0f, this.gameObject, "setInterpreter");
		};
		return task;
		
	}
	
}