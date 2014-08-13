#pragma strict
class EZBallViewSplintering extends EZBallViewInterface{

	
	function refresh(data:EZBallViewData){
		
	 	data._shell.enabled = false; 
	 	data._shell.alpha = 0; 
	 	 
	 	data._broken.enabled = true; 
		data._broken.spriteName = data._names[data.magicType].broken; 
	 	data._broken.alpha = data.alpha;
	 	
	 	data._rock.enabled = true;  
	 	data._rock.alpha = data.alpha;
		data._rock.spriteName = data._names[data.magicType].rock; 
		
	 	data._rockLight.enabled = false;
	 	data._rockLight.alpha = 0;  
	 	
	 	data._rockBroken.enabled = false;  
	 	data._rockBroken.alpha = 0;  
	 	 
	 	data._shellLight.enabled = false; 
	 	data._shellLight.alpha = 0; 
	 	
	 	if(data.flash){ 
			data._brokenLight.spriteName = data._names[data.magicType].brokenLight; 
	 		data._brokenLight.enabled = true;
	 		data._brokenLight.alpha = data.alpha;
	 	}else{
	 		data._brokenLight.enabled = false;
	 		data._brokenLight.alpha = 0; 
	 		
	 		
	 	} 
	}
	function nextTask(data:EZBallViewData):Task{
		
		
		var task:Task = new Task();  
		var tr:GeekTweenRotation = null;
		task.init = function(){ 
			 data.state = EZBallViewData.State.Diamond;
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
		 	var count = Random.Range(1, 3);
			 for(var i =0; i<count; ++i){
				TaskManager.Run(data.spallTask(data._patchBig.gameObject, data.magicType, this.gameObject.transform.position, 30));
			 }	
		};
		return task;
		
	}
	function removeTask(data:EZBallViewData){
		
		var task:Task = new Task();   
		var tr:GeekTweenRotation = null; 
		var tl:TaskList = new TaskList();
		task.init = function(){
		
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
			data._broken.enabled = false;
			data._shell.enabled = false;
			data._rock.enabled = false;
			
			var count = Random.Range(1, 2);
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
