#pragma strict

class EZHeroAIIdle extends StateWithEventMap{

	private var context_:EZHeroAI.Context = null;
	private var time_:float = 0;
	public function EZHeroAIIdle(context:EZHeroAI.Context){
		context_ = context;
	}
		
	
	public function start(){
		context_.state = EZHeroAI.State.Idle;
		time_= 0;
		context_.hero.post("idle");
	}
	
	public function update(d:float){
		time_ += d;
		if(time_ > context_.allTime){
			return "thinking";
		}
		return "";
	}
	public function over(){
	}
}