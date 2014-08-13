#pragma strict


class EZPVPFightRunStartState extends StateWithEventMap{

	private var context_:EZModelContext = null;
	function EZPVPFightRunStartState(context:EZModelContext){
		this.context_ = context;
	}
	function start(){
		
		Debug.Log("EZPVPFightRunStartState");
				Debug.LogWarning("attack2");
		var action:EZIDListAction = ActionManager.Create("model.calc.start") as EZIDListAction;
		this.context_.reset();
		ActionManager.Run(action);
		this.context_.count = action.list.Length;
	
		
		
	}
	function update(d:float){
		return "fight.run.attack";

	}
	

}
