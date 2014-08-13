#pragma strict

class EZUIAutoItemUnit extends EZUIAutoItemUnitInterface{
	private var widget_:UIWidget[] = null; 
	private var boxes_:BoxCollider[];
	private var alpha_:float = 0;
	function Awake(){
		widget_ = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(UIWidget), 
				function (component){component as UIWidget;}
			);
					
		boxes_ = System.Array.ConvertAll(
			this.gameObject.GetComponentsInChildren(BoxCollider), 
			function (component){component as BoxCollider;}
			);
		
	}
	public function setAlpha(alpha:float){
		alpha_ = alpha;
		for(var i:int = 0; i<widget_.Length; ++i){
			widget_[i].color.a = alpha;
		}
	}
	public function setBox(enable:boolean){
		for(var i:int = 0; i<boxes_.Length; ++i){
			boxes_[i].enabled = enable;
		}
	}
	public function alphaTask(alpha:float, allTime:float):Task{
		if(alpha == 0){
			setBox(false);
		}else{
			setBox(true);
		}
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject, allTime, this.alpha_, alpha, this.gameObject, "setAlpha");
		};
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		return task;
		
	}

}