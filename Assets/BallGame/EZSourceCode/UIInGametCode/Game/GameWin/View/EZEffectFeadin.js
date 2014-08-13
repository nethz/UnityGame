#pragma strict
class EZEffectFeadin extends GameWinEffect{
	public function effectTask():Task{
		
		var ta:TweenAlpha = null;
		var task:Task = new Task();
		task.init = function(){
			ta = TweenAlpha.Begin(this.gameObject, 0.3f * speed_, 1.0f);
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