#pragma strict


class EZFightRunStartState extends StateWithEventMap{

	private var context_:EZModelContext = null;
	//private var isOver_:boolean = false;
	function EZFightRunStartState(context:EZModelContext){
		this.context_ = context;
	}
	function start(){
		//isOver_ = false;
		var action:EZIDListAction = ActionManager.Create("model.calc.start") as EZIDListAction;
		this.context_.reset();
		ActionManager.Run(action);
		this.context_.count = action.list.Length;
	
		
		
	}
	function update(d:float){
		return "fight.run.attack";

	}
	

}
