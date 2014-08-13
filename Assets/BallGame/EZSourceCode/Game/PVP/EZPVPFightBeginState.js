#pragma strict
class EZPVPFightBeginState extends State{
	private var isOver_:boolean;
	
	private var context_:EZModelContext;
	
	public function  EZPVPFightBeginState(context:EZModelContext){
		context_ = context;
	}
	public function set isOver(value:boolean){
		this.isOver_ = value;
	}
	
	public function get isOver():boolean{
		return this.isOver_;
	}
	
	
	
	public function start(){
	}
	
	public function update(d:float){ 
		var ret = "";
		
		if(this.isOver_){
			switch(context_.action){
			case "attack":
				ret = "fight.run.chat";
				break;
			case "swap.bag1":
			case "swap.bag2":
				ret = "fight.swap";
				break;
			case "action.bag1":
			case "action.bag2":
				ret = "fight.magic";
				break;
			case "crystal":
				Debug.Log("crystal");
				ret = "fight.crystal";
				break;
			}
		}
		return ret;
	}
}