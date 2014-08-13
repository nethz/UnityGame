#pragma strict

class AlphaBind  extends MonoBehaviour{
	
	private var alpha_:float = 1;
	
	public var _sprite:exSprite = null; 
	function Start () {
		this.refreshAlpha();
	}
	
	
	private function refreshAlpha(){
		if(this._sprite == null){
			return;
		}
		if(this.alpha_ == 0){
			this.renderer.enabled = false;
		}
		else{
			this.renderer.enabled = true;
		}
		this._sprite.color.a = this.alpha_;
	}
	function setAlpha(alpha:float){
		this.alpha_ = alpha;
		
		this.refreshAlpha();
	}
	
	function changeAlpha(alphaIn:float, alphaOut:float, allTime:float){
		var self =this;
		var task:Task = new Task();
		var time:float = 0;
		task.init = function(){
			self.setAlpha(alphaIn);
		};
		
		task.update = function(d:float){
			time += d;
			var s:float = time/allTime;
			self.setAlpha( alphaIn*(1-s) + alphaOut *s);	
		};
		task.isOver = function(){
			return (time >= allTime);
		
		};
		task.shutdown = function(){
			self.setAlpha(alphaOut);
		};
		return task;
	
	}
	function getAlpha(){
		return this.alpha_;
	}
}