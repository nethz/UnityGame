#pragma strict
class EZPVPFightReadyState extends State{
	private var nextState_:String = "";
	public function EZPVPFightReadyState(nextState:String){
		nextState_ = nextState;
	}
	public function start(){
		Debug.Log("EZPVPFightReadyState");
		var sort:EZIDListAction = ActionManager.Create("model.calc.sort");
		ActionManager.Run(sort);
		EZCtrl.SpeedBar(sort.list);
		
		for(var i:int = 0; i<sort.list.Length; ++i){
			EZCtrl.ViewFoeBar(sort.list[i], 1);
		}
		
		
	}
	public function update(d:float){
		return nextState_;
	}
}
