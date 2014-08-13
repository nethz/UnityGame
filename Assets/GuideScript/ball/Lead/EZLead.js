#pragma strict
import System.Collections.Generic;

class EZLead extends MonoBehaviour{
	
	public var _showTime:float = 0.3f;
	public var _hideTime:float = 0.3f;
	var panels:EZLeadPanel[];
	
	private var n_:int = 0;
	private var back_:int[] = new int[30];
	public function get back():int[]{
		return back_;
	}
	public function ready(id:int){
		n_ = id;
	}
	public function show(time:float):Task{
		if(n_ >=0 && n_ < panels.Length){
			return panels[n_].show(time);
		}
		return new Task();//_close.show(time, 0.5);
	}
	public function updateArrow(d:float){
		if(n_ >=0 && n_ < panels.Length){
			panels[n_].updateArrow(d);
		}
	}
	public function hide(time:float):Task{
		if(n_ >=0 && n_ < panels.Length){
			return panels[n_].hide(time);
		
		}
		return new Task();//return _close.hide(time);
	}
	
	
	public function broadText():String{
		if(n_ >=0 && n_ < panels.Length){
			return panels[n_]._boardText;
		}
		return null;
	}
	
	public function print(){
		for(var i:int = 0; i< back_.Length; ++i){
			Debug.LogWarning("i:" + back[i]);
		}
	}
	public function get start():Vector2{
		if(n_ >=0 && n_ < panels.Length){
			return panels[n_].start;
		
		}
		return Vector2(0, 0);
	
	}
	public function get balls():Geek.MagicType[]{
		if(n_ >=0 && n_ < panels.Length){
			return panels[n_].balls;
		}
		return null;
	}
	
	
}