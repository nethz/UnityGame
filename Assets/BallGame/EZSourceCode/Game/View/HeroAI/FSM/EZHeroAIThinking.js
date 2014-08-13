#pragma strict

class EZHeroAIThinking extends StateWithEventMap{

	private var context_:EZHeroAI.Context = null;
	private var flipHorizintal_:boolean = false;
	public function EZHeroAIThinking(context:EZHeroAI.Context){
		context_ = context;
	}
	private function getTarget(){
		if(context_.points != null){
			for(var i =0; i< context_.points.Length; ++i){
				if(checkInCamera(context_.points[i]))
					return context_.points[i];
			}
		}else{
			if(checkInCamera(Vector3(964, 0, 0)))
				return Vector3(964, 0, 0);
			if(checkInCamera(Vector3(1390, 0, 0)))
				return Vector3(1390, 0, 0);
			if(checkInCamera(Vector3(400, 0, 0)))
				return Vector3(400, 0, 0);
		}	
		return Vector3(0, 0, 0);
	}
	private function checkInCamera(position:Vector3):boolean{
		var v:float = position.x;
		var s:Vector3 = Geek.GetWorldScale(this.context_.hero.body.boxCollider.transform);
		var l:float = v - (this.context_.hero.body.boxCollider.size.x*s.x)/2;
		var r:float = v + (this.context_.hero.body.boxCollider.size.x*s.x)/2;
		var cl:float = this.context_.camera.ScreenToWorldPoint(Vector3(0, 0, 0)).x;
		var cr:float = this.context_.camera.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)).x;
		
		
		if(l < cl || r > cr){
			return false;
		}
		return true;
	}
	
	private function checkTrun(position:Vector3):boolean{
		var v:float = position.x;
		var s:Vector3 = Geek.GetWorldScale(this.context_.hero.body.boxCollider.transform);
		var l:float = v - (this.context_.hero.body.boxCollider.size.x*s.x)/4;
		var r:float = v + (this.context_.hero.body.boxCollider.size.x*s.x)/4;
		var c:float = this.context_.camera.ScreenToWorldPoint(Vector3(Screen.width/2, Screen.height/2, 0)).x;
		if(r < c && flipHorizintal_){
			return true;
		}else if(l > c && !flipHorizintal_){
			return true;
		}
		return false;
	}
	public function start(){
		flipHorizintal_ = this.context_.hero.body.getFlipHorizintal();
	
	}
	public function update(d:float){
		
		//flipHorizintal_
		if(checkTrun(this.context_.hero.gameObject.transform.position)){
			flipHorizintal_ = !flipHorizintal_;
			this.context_.hero.body.flipHorizintal(flipHorizintal_);
		}
		if(context_.state == EZHeroAI.State.Walk || context_.state == EZHeroAI.State.Idle){
		
			if(!checkInCamera(this.context_.hero.gameObject.transform.position)){
			
				context_.target = this.getTarget();
				return "walk"; 
			}else{
				if( context_.state == EZHeroAI.State.Walk){
					context_.allTime = 0;
					return "idle";
				}
			}
		}else if(context_.state == EZHeroAI.State.None){
			context_.allTime = 0;
			return "idle";
		}
		return "";
	}
	
}