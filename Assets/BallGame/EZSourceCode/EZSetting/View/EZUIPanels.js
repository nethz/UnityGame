#pragma strict


class EZUIPanels  extends MonoBehaviour{
	private var panels_:UIPanel[] = null;
	//private var deep_:int = 0;
	//private static var instance_:EZUIInputSwitch = null;
	//public static function GetInstance():EZUIInputSwitch{
	//	return this.instance_;
	//}
	public function Awake(){
		//instance_ = this;
		this.panels_ = System.Array.ConvertAll(
			this.GetComponentsInChildren(UIPanel), 
			function (component){component as UIPanel;}
			);
		
	}
	public function hide():Task{
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
		
			tv = GeekTweenValue.Begin(this.gameObject, 0.3f, 1f, 0f,this.gameObject,"setAlpha");
		};
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	public function show():Task{
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
		
			tv = GeekTweenValue.Begin(this.gameObject, 0.3f, 0f, 1f,this.gameObject,"setAlpha");
		};
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	public function setAlpha(alpha:float){
		Debug.LogWarning("EZUIPanels ..." + alpha);
		for(var i:int = 0; i<this.panels_.length; ++i){
			this.panels_[i].alpha = alpha;
		}
	}
	
}