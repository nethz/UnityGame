#pragma strict


class EZDotHandler extends MonoBehaviour{
	private var dots_:EZDot[] = null;
	
	
	
	public function reset(){
		for(var i=0; i<dots_.length; ++i){
			if(dots_[i].enabled){
				dots_[i].enabled = false;
			}
		}
	}
	
	public function refresh(){
		dots_ = System.Array.ConvertAll(
			this.gameObject.GetComponentsInChildren(EZDot), 
			function (component){component as EZDot;}
			);

	}

	
	public function doClose():Array{
		var dots:Array = new Array();
		if(dots_){
			for(var i=0; i<dots_.length; ++i){
				if(dots_[i].enabled){
					dots_[i].doClose();
					if(!dots_[i].enabled){
						dots.push(dots_[i]);
					}
				}
			}
		}
		return dots;
	}
	public function medicalClear(){
		if(dots_){
			for(var i=0; i<dots_.length; ++i){
				if(dots_[i].enabled && dots_[i].origin =="medical"){
					dots_[i].close = true;
				}
			}
		}
	}
	
	public function attackClear(){
		if(dots_){
			for(var i=0; i<dots_.length; ++i){
				if(dots_[i].enabled && dots_[i].origin =="attack"){
					dots_[i].close = true;
				}
			}
		}
	}
	
	
	public function get attack():float{
		var attack:float = 0;
		if(dots_){
			for(var i=0; i<dots_.length; ++i){
				if(dots_[i].enabled){
					attack += dots_[i].attack;
				}
			}
		}
		return attack;
	}
	
	
	public function get medical():float{
		var medical:float = 0;
		if(dots_){
			for(var i=0; i<dots_.length; ++i){
				if(dots_[i].enabled){
					medical += dots_[i].medical;
				}
			}
		}
		return medical;
	}
	
	
	
	public function get dots():EZDot[]{
		return dots_;
	}
	
	public function isReinforce(type:Geek.MagicType):boolean{
		if(dots_){
			for(var i=0; i<dots_.length; ++i){
				if(dots_[i].enabled){
					
					if(Geek.Reinforce(dots_[i].magicType, type)){
						return true;
					}
				}
			}
		}
		return false;
	}
	public function flickerIt():Array{
		var dots:Array = new Array();
		 if(dots_){
			for(var i:int = 0; i<dots_.length; ++i){ 
				if(dots_[i].flicker && dots_[i].enabled){
					dots.push(dots_[i]);
					dots_[i].flicker = false;
				}
			}
	     }
		 return dots; 
	}
	
}