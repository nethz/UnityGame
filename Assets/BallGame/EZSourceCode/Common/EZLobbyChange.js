#pragma strict

class EZLobbyChange extends EZChange{

	public var _textures:String[]; 
	public var _uiMain:UISprite = null;
	public var _uiChange:UISprite = null;
	public function Awake(){
		showWeather(0);
	}
	public function showWeather(id:int){
		_uiMain.spriteName = _textures[id];
		_uiChange.color.a = 0.0f;
		
			
	}
	public function change(allTime:float, id:int):Task{
	
		var task:Task = new Task();
		var time:float = 0.0f;
		task.init = function(){ 
		
			_uiChange.spriteName = _textures[id];
		
			time = 0.0f;
		};
		
		task.update = function(d:float){
			time += d;
			_uiChange.color.a = time/allTime;  

		}; 
		task.isOver = function():boolean{
			if(time >= allTime){
				return true;
			}
			return false;
		};
		task.shutdown = function(){
			
			_uiMain.spriteName = _textures[id];
			_uiChange.color.a = 0.0f;
			
			
		};
		
		return task;
		
	}
	/*	*/

}