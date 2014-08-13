#pragma strict

class EZCryCompElementView extends MonoBehaviour{
	var _element:UISprite = null;
	var _number:UILabel = null;
	var _deno:UILabel = null;
	var _label:UILabel = null;
	var _color1:Color;
	var _color2:Color;
	private var need_:int = 1;
	private var has_:int = 0;
	public function setup(has:int){
		Debug.Log("has" + has);
		this.has_ = has;
		refresh();
	}
	public function get element():UISprite{
		return _element;
	}
	public function refresh(){
		if(has_ >= need_){
		
			_deno.color = _color1;
			_number.color = _color1;
		}else{
		
			_deno.color = _color2;
			_number.color = _color2;
		}
		_deno.text = "/" + has_.ToString();
		_number.text = need_.ToString();
	}
	public function open(){
		_element.enabled = true;
		_number.enabled = true;
		_deno.enabled = true;
		_label.enabled = true;
		refresh();
	}
	public function close(){
		_element.enabled = false;
		_number.enabled = false;
		_deno.enabled = false;
		_label.enabled = false;
	
	}
	
	
	
	public function outTask(time:float):Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			ta = TweenAlpha.Begin(_element.gameObject, time, 0);
		};
		task.shutdown = function(){
			has_ -= need_;
			need_ = 0;
			refresh();
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	public function inTask(time:float):Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			ta = TweenAlpha.Begin(_element.gameObject, time, 1);
		};
		task.shutdown = function(){
			need_ = 1;
			refresh();
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	
	
}