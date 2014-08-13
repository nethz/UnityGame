#pragma strict

class EZChange extends MonoBehaviour{

	
	public function showWeather(id:int){
			/*
		if(_uiTexture){
			
			_uiTexture.material.SetTexture("_MainTex", _textures[id]);
			_uiTexture.material.SetFloat("_change",0.0f);
		}else{
		
			this.gameObject.renderer.sharedMaterial.SetTexture("_MainTex", _textures[id]);
			this.gameObject.renderer.sharedMaterial.SetFloat("_change",0.0f);
		}
		*/
			
	}
	public function change(allTime:float, id:int):Task{
	/*
		var task:Task = new Task();
		var time:float = 0.0f;
		task.init = function(){
			if(_uiTexture){
				_uiTexture.material.SetTexture("_ChangeTex", _textures[id]);
			}else{
				this.gameObject.renderer.sharedMaterial.SetTexture("_ChangeTex", _textures[id]);
			}
			time = 0.0f;
		};
		
		task.update = function(d:float){
			time += d;
			
			if(_uiTexture){
				_uiTexture.material.SetFloat("_change", time/allTime);
			}else{
				
				this.gameObject.renderer.sharedMaterial.SetFloat("_change",time/allTime);
			}
			
			
		
		}; 
		task.isOver = function():boolean{
			if(time >= allTime){
				return true;
			}
			return false;
		};
		task.shutdown = function(){
		
			if(_uiTexture){
				_uiTexture.material.SetFloat("_change",0.0f);
				_uiTexture.material.SetTexture("_MainTex", _textures[id]);
			}else{
				this.gameObject.renderer.sharedMaterial.SetFloat("_change",0.0f);
				this.gameObject.renderer.sharedMaterial.SetTexture("_MainTex", _textures[id]);
			}
			
			
		};
		
		return task;*/
		return null;
		
	}
	

	
	
	//public function 

}