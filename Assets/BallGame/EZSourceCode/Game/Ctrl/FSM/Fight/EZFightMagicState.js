#pragma strict
class EZFightMagicState extends StateWithEventMap{
	private var isOver_:boolean;
	private var context_:EZModelContext;
	
	public function  EZFightMagicState(context:EZModelContext){
		context_ = context;
	}
	
	
	public function start(){
		
		
		ActionManager.Run("puzzle.ignore");
		if(context_.action == "action.bag1"){
			ActionManager.Run("model.hero.bag1");
		}else{
			ActionManager.Run("model.hero.bag2");
		}
		
		
	}
	public function update(d:float){
		return "fight.run.start";
	}
}
