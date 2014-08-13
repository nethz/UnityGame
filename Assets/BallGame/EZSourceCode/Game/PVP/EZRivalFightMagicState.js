#pragma strict
class EZRivalFightMagicState extends StateWithEventMap{
	private var isOver_:boolean;
	private var context_:EZModelContext;
	
	public function  EZRivalFightMagicState(context:EZModelContext){
		context_ = context;
	}
	
	
	public function start(){
		
		
		if(context_.action == "action.bag1"){
			ActionManager.Run("model.rival.bag1");
		}else{
			ActionManager.Run("model.rival.bag2");
		}
		
		
	}
	public function update(d:float){
		return "fight.run.start";
	}
}
