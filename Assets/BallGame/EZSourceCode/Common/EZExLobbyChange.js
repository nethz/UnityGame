#pragma strict

class EZExLobbyChange extends EZChange{
	public var _textures:Texture2D[]; 
	public var _exMain:exSprite = null;
	public var _exChange:exSprite = null;
	
	public function showWeather(id:int){
		//_main.spriteName = _textures[0]; 
		_exMain.gameObject.renderer.sharedMaterial.SetTexture("_MainTex", _textures[id]);
		_exChange.color.a = 0.0f;
		
			
	}
	public function change(allTime:float, id:int):Task{
	
		var task:Task = new Task();
		var time:float = 0.0f;
		task.init = function(){ 
		
			_exChange.gameObject.renderer.sharedMaterial.SetTexture("_MainTex", _textures[id]);
		
			time = 0.0f;
		};
		
		task.update = function(d:float){
			time += d;
			_exChange.color.a = time/allTime;  
			/*
			if(_uiTexture){
				_uiTexture.material.SetFloat("_change", time/allTime);
			}else{
				
				this.gameObject.renderer.sharedMaterial.SetFloat("_change",time/allTime);
			}
			
			
		 */
		}; 
		task.isOver = function():boolean{
			if(time >= allTime){
				return true;
			}
			return false;
		};
		task.shutdown = function(){
			
			_exMain.gameObject.renderer.sharedMaterial.SetTexture("_MainTex", _textures[id]); 
			_exChange.color.a = 0.0f;
			/*
			if(_uiTexture){
				_uiTexture.material.SetFloat("_change",0.0f);
				_uiTexture.material.SetTexture("_MainTex", _textures[id]);
			}else{
				this.gameObject.renderer.sharedMaterial.SetFloat("_change",0.0f);
				this.gameObject.renderer.sharedMaterial.SetTexture("_MainTex", _textures[id]);
			}
			*/
			
		};
		
		return task;
		//return null;
		
	}
	

	
	
	//public function 

}