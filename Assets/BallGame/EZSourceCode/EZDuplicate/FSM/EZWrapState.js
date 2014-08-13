#pragma strict
class EZWrapState extends StateWithEventMap{
	
	private var start_:Function;
	private var over_:Function;
	public function EZWrapState(start:Function, over:Function){
		start_ = start;
		over_ = over;
		
	}
	public function start(){
		if(start_){
			start_();
		}
	}
	public function over(){
		if(over_){
			over_();
		}
	}
}