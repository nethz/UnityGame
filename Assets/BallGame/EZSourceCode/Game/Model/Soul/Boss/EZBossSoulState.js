#pragma strict

class EZBossSoulState{

	private var effect_:String = "";
	private var name_:String = "";
	private var baseProp_:EZBaseProperty = new EZBaseProperty();
	private var tech_:EZMonsterTech = new EZMonsterTech();
	private var shifts_:EZShift[] = null;


	public function hasMagic():boolean{
		return tech_.hasMagic();
	
	}
	public function hasSkill():boolean{
		return tech_.hasSkill();
	
	}
	

	
	public function get baseProperty():EZBaseProperty{
		return this.baseProp_;
	} 
	
	public function get active():boolean{
		return tech_.active;
	}
	public function get type():EZCalculatorAction.Type{
		return tech_.type;
	}
	public function get tech():EZMonsterTech{
		return tech_;
	}
	
	
	public function get name():String{
		return name_;
	}
	
	public function load(obj:GameObject, data:JsonData.State){
		baseProp_.load(data.baseProp);
		tech_.load(data.tech);
		name_ = data.name;
		shifts_ = EZShiftManager.GetInstance().create(obj, data.shifts);
		
	}
	public function close(){
		if(shifts_){
			for(var i:int = 0; i < shifts_.length; ++i){
				shifts_[i].close();
			}
		}
	}
	public function get val():float{
		if(shifts_ && shifts_.Length >0){
			return shifts_[0].val;
		}
		return 0.0f;
	
	}
	
	public function get number():int{
		if(shifts_ && shifts_.Length >0){
			return shifts_[0].number;
		}
		return 0;
	}

	public function open(){
		tech_.reset();
		if(shifts_){
			for(var i:int = 0; i < shifts_.length; ++i){
				shifts_[i].open();
			}
		}
	}
	
}