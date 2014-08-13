#pragma strict
class EZBallViewPerfect extends EZBallViewInterface{

	
	function refresh(data:EZBallViewData){
		data._shell.spriteName = data._names[data.magicType].shell; 
	 	data._shell.enabled = true;   
		data._shell.alpha = data.alpha; 
		
		
	 	if(data.flash){
			data._shellLight.spriteName = data._names[data.magicType].shellLight; 
	 		data._shellLight.enabled = true;
	 		data._shellLight.alpha = data.alpha;
	 	}else{
	 		data._shellLight.enabled = false; 
	 		data._shellLight.alpha = 0;
	 	} 
	 	
	 	
	 	data._rock.enabled = true;  
	 	data._rock.alpha = 0.3f * data.alpha;
		data._rock.spriteName = data._names[data.magicType].rock;  
		
	 	data._broken.enabled = false; 
	 	data._broken.alpha = 0;
		
	 	data._rockLight.enabled = false; 
	 	data._rockLight.alpha = 0;
	 	data._rockBroken.enabled = false; 
	 	data._rockBroken.alpha = 0;
	 	data._brokenLight.enabled = false; 
	 	data._brokenLight.alpha = 0;
	}
	function nextTask(data:EZBallViewData):Task{
		var tl:TaskList =  new TaskList();
		var task:Task = new Task();
		var tr:GeekTweenRotation = null; 
		task.init = function(){
			 data.state = EZBallViewData.State.Splintering;
			 tr = GeekTweenRotation.Begin(this.gameObject, data._atime, Quaternion.AngleAxis(UnityEngine.Random.Range(-10, 10), Vector3.forward)); 
			 tr.method = data._method;
		};
		task.isOver = function():boolean{
			if(tr && tr.enabled){
				return false;
			} 
			return true;
		
		};
		task.shutdown = function(){
		
			 data._broken.spriteName = data._names[data.magicType].broken; 
			 data._broken.enabled = true; 
	 		 data._broken.alpha = 1.0f;
	 		 var count = Random.Range(1, 3);
			 for(var i =0; i<count; ++i){
				TaskManager.Run(data.spallTask(data._patchBig.gameObject, data.magicType, this.gameObject.transform.position, 30));
			 }	
			
		};
		
		
		tl.push(task);
		return tl;
		
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
			this.transform.localRotation = Quaternion.AngleAxis(0.0f, Vector3.forward);
			this.refresh(data);
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
		data._shellLight.alpha = alpha;
	} 
}
