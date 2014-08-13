#pragma strict


class EZLobbyOut extends MonoBehaviour{
	
	public var _method:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _camera:Camera = null;
	public var _start:float = 0;
	public var _end:float = 0;
	public var _star:UISprite = null;
	public var _star2:UISprite = null;
	public var _sprite:UISprite = null;
	public var _box:BoxCollider = null;
	public var _door:EZLobbyDoor = null;
	public var _camreas:UICamera[];
	private var _x:float = -1;
	public var _out:Vector3 = Vector3.zero;
	private var task_:TaskList = null;
	private var isEnabled_:boolean = true;
	function set isEnabled(value:boolean){
		isEnabled_ = value;
		if(isEnabled_ == false && _box.enabled == true){
			_box.enabled = false;
		}
	}
	function Update(){
		if(isEnabled_){
			if(_x != _camera.gameObject.transform.localPosition.x ){
				_x = _camera.gameObject.transform.localPosition.x;
				if(_x < _start)
				{
					_sprite.color.a = 0;
					_star.color.a = 0;
					_star2.color.a = 0.5f;
					_box.enabled = false;
				}else{
					var alpha:float = Mathf.Clamp01((_x - _start)/(_end - _start));
					_sprite.color.a = alpha;
					_star.color.a = 1;
					_star2.color.a = 0;
					if(alpha > 0.1){
						_box.enabled = true;
					}else{
						_box.enabled = false;
					}
				}
			
			}
		}
	}
	
	function OnClick(){
		
		if(task_ == null){
			task_ = new TaskList();
			var task:Task = new Task();
			
			TaskManager.PushBack(task_, function(){
				for(var i:int = 0;i < _camreas.length;++i){
		 			_camreas[i].enabled = false;
		 		}
			});
			
			var tp:GeekTweenPosition = null;
			
			task.init = function(){
				tp = GeekTweenPosition.Begin(this._camera.gameObject, 0.5f, _out);
				tp.method = _method;
			};
			task.isOver = function():boolean{
				if(tp && tp.enabled){
					return false;
				}
				return true;
			};
			
			task_.push(task);
			TaskManager.PushBack(task_, function(){
				task_ = null;
			});
			task_.push(_door.openTask(true));
			TaskManager.Run(task_);
			
		}
		
		
		 
	}
}