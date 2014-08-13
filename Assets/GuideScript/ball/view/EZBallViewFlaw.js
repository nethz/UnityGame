#pragma strict

class EZBallViewFlaw extends EZBallViewInterface{

	
	function refresh(data:EZBallViewData){
		
	 	data._shell.spriteName = data._names[data.magicType].shell;   
	 	data._shell.enabled = true;  
	 	data._shell.alpha = data.alpha; 
	 	
		data._broken.spriteName = data._names[data.magicType].broken; 
 		data._broken.enabled = true; 
 		data._broken.alpha = data.alpha;
	 	 
	 	if(data.flash){ 
			data._brokenLight.spriteName = data._names[data.magicType].brokenLight; 
	 		data._brokenLight.enabled = true;
	 		data._brokenLight.alpha = data.alpha;
	 	}else{
	 		data._brokenLight.enabled = false;
	 		data._brokenLight.alpha = 0; 
	 	} 
	 	
	 	
	
 		data._rock.enabled = true;  
		data._rock.spriteName = data._names[data.magicType].rock;  
 		data._rock.alpha = 0.3f * data.alpha; 
 		 
 		 
 		
 		data._rockLight.enabled = false; 
 		data._rockLight.alpha = 0.0f; 
 		
 		data._rockBroken.enabled = false; 
 		data._rockBroken.alpha = 0.0f; 
	 	 
 		data._shellLight.enabled = false;
 		data._shellLight.alpha = 0;  
	}
	function nextTask(data:EZBallViewData):Task{
			
		var task:Task = new Task();
		var tr:GeekTweenRotation = null;
		task.init = function(){
			 data.state = EZBallViewData.State.Splintering;
			 data._broken.spriteName = data._names[data.magicType].broken; 
			 data._broken.enabled = true; 
			 data._rock.spriteName = data._names[data.magicType].rock; 
			 data._rock.enabled = true; 
			  
	 		 data._shell.enabled = false;
			 tr = GeekTweenRotation.Begin(this.gameObject, data._atime, Quaternion.AngleAxis(UnityEngine.Random.Range(-10, 10), Vector3.forward)); 
			 tr.method = data._method;   
			 
			var count = Random.Range(1, 3);
			for(var i =0; i<count; ++i){
				TaskManager.Run(data.spallTask(data._patchBig.gameObject, data.magicType, this.gameObject.transform.position, 30));
			}
		
		};
		task.isOver = function():boolean{
			if(tr && tr.enabled){
				return false;
			} 
			
			return true;
		
		};
	
		return task;
		
	}
	function removeTask(data:EZBallViewData){
	
		var task:Task = new Task();  
		
		var tl:TaskList = new TaskList();
		
		var tr:GeekTweenRotation = null; 
		task.init = function(){
			 tr = GeekTweenRotation.Begin(this.gameObject, data._atime, Quaternion.AngleAxis(UnityEngine.Random.Range(-5, 5), Vector3.forward)); 
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
			var count = Random.Range(1, 3);
			for(var i =0; i<count; ++i){
				TaskManager.Run(data.spallTask(data._patchBig.gameObject, data.magicType, this.gameObject.transform.position, 30));
			}
		};
		
		tl.push(task);
		return tl;
	}
	
	public function update(data:EZBallViewData, time:float){
	
	
	
		var alpha:float = Mathf.Sin(time * 15)/2+0.5;
		data._brokenLight.alpha = alpha;
	} 
}
