#pragma strict

class EZHeroAIWalk extends StateWithEventMap{

	private var context_:EZHeroAI.Context = null;
	private var isOver_:boolean = false;
	public function EZHeroAIWalk(context:EZHeroAI.Context){
		context_ = context;
	}
	
	private function moveTask():Task{
		var task:Task = new Task();
		var tw:UITweener = null;
		task.init = function(){
			var position:Vector3 = this.context_.hero.gameObject.transform.localPosition;	
			var abs:float = Mathf.Abs(position.x - context_.target.x);
			tw = TweenPosition.Begin(this.context_.hero.gameObject, abs/1000.0f, context_.target);
			//tw.method = UITweener.Method.EaseInOut;
		};
		task.isOver = function():boolean{
			if(tw && tw.enabled){
				return false;
			}
			return true;
		};
		
		return task;
	}
	public function start(){
		
		TweenAlpha.Begin(context_.name.gameObject, 0.3f, 0.0f);
		context_.state = EZHeroAI.State.Walk;
		context_.hero.post("walk");
		isOver_ = false;
		var task:Task = this.moveTask();
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
		TaskManager.Run(task);
	}
	public function update(d:float){
		
		if(isOver_){
			return "thinking";
		}
		return "";
	}
	public function over(){
		TweenAlpha.Begin(context_.name.gameObject, 0.3f, 1.0f);
		
	}
}