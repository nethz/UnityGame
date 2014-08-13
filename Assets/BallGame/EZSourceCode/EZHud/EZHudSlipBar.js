#pragma strict

class EZHudSlipBar extends MonoBehaviour{

	//var _bar:UIScrollBar;
	var _theBar:UISprite = null;
	var _color:UISprite;
	var _small:float = 0.001f;
	public function setValue(val:float){
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		if(val <= 0){
			task.init = function(){
				tv = GeekTweenValue.Begin(this.gameObject, 0.3, _theBar.fillAmount, val, this.gameObject, "setValueNone");
				tv.method = GeekTweener.Method.easeOutExpo;
			};
		}else{
		
			task.init = function(){
				tv = GeekTweenValue.Begin(this.gameObject, 0.3, _theBar.fillAmount, val, this.gameObject, "setValueImpl");
				tv.method = GeekTweener.Method.easeOutExpo;
			};
		}
		
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		task.shutdown = function(){
			if(val <= 0){
				setValueNone(val);
			}else{
				setValueImpl(val);
			}
		};
		TaskManager.Run(task);
		
	}
	private function setValueImpl(val:float){
	
	
		_theBar.color.a = 1;
		if(val< _small){
			val = _small;
		}
		_theBar.fillAmount = val;
	}
	
	private function setValueNone(val:float){
	
		if(val <= 0.0f){
			_theBar.color.a = 0;
		}
		_theBar.fillAmount = val;
	}
	public function show(){
		_theBar.enabled = true;
		
		
	}
	public function hide(){
		_theBar.enabled = false;
	
	}
}