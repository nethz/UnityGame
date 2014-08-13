#pragma strict


class EZFightCrystalStartState extends StateWithEventMap{

	private var context_:EZModelContext = null;
	function EZFightCrystalStartState(context:EZModelContext){
		this.context_ = context;
	}
	function start(){
		var action:EZIDListAction = ActionManager.Create("model.calc.start") as EZIDListAction;
		this.context_.reset();
		ActionManager.Run(action);
		this.context_.count = action.list.Length;
	}
	function update(d:float){
		return "fight.crystal.attack";
	}
	

}
