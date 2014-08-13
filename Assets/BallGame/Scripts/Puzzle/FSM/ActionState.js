#pragma strict

class ActionState extends State{
	private var info_:RemoveInfo = null;
	public function ActionState(info:RemoveInfo){
		this.info_ = info;
	
	}
	function constructed(){
	}
	function start(){
	
		ActionManager.Run("view.input.disable");
		info_.clear();
	}
	
	function update(d:float){
		
	}
	function over(){
		
		//ActionManager.Run("view.input.enable");
		info_.print();
	
	}
	
};

