#pragma strict
class EZBallViewDiamond extends EZBallViewInterface{

	
	function refresh(data:EZBallViewData){
		
	 	data._shell.enabled = false; 
	 	data._shell.alpha = 0; 
	 	data._broken.enabled = false;  
	 	data._broken.alpha = 0; 
	 	
	 	data._rock.enabled = true;  
	 	data._rock.alpha = data.alpha;
		data._rock.spriteName = data._names[data.magicType].rock;  
		
		
	 	if(data.flash){
			data._rockLight.spriteName = data._names[data.magicType].rockLight; 
	 		data._rockLight.enabled = true;
	 		data._rockLight.alpha = data.alpha;
	 	}else{
	 		data._rockLight.enabled = false;
	 		data._rockLight.alpha = 0; 
	 	} 
	 	
	 	
	 	
	 	data._rockBroken.enabled = false;
	 	data._rockBroken.alpha = 0; 
	 	data._shellLight.enabled = false; 
	 	data._shellLight.alpha = 0; 
	 
	 	data._brokenLight.enabled = false; 
	 	data._brokenLight.alpha = 0;
	}
	function nextTask(data:EZBallViewData):Task{
		return new Task();
		
	}
	function removeTask(data:EZBallViewData){
		
		var task:Task = new Task();    
		var tr:GeekTweenRotation = null;
		var tl:TaskList = new TaskList();
		task.init = function(){
			data._rockBroken.alpha = 1;
			data._rockBroken.enabled = true;
			data._rockBroken.spriteName = data._names[data.magicType].rockBroken;  
			tr = GeekTweenRotation.Begin(this.gameObject, data._atime, Quaternion.AngleAxis(UnityEngine.Random.Range(-7, 7), Vector3.forward)); 
			tr.method = GeekTweener.Method.easeInOutElastic;  
		};
		task.isOver = function():boolean{
			if(tr && tr.enabled){
				return false;
			} 
			return true;
		};
		task.shutdown = function(){
			data.alpha = 0; 
			
			var count = Random.Range(2, 4);
			for(var i =0; i<count; ++i){
				TaskManager.Run(data.spallTask(data._patchSmall.gameObject, data.magicType, this.gameObject.transform.position, 30));
			}
		};
		tl.push(task);
		return tl;
	
	}
	
	public function update(data:EZBallViewData, time:float){
		var alpha:float = Mathf.Sin(time * 15)/2+0.5;
		data._rockLight.alpha = alpha;
	} 
}
