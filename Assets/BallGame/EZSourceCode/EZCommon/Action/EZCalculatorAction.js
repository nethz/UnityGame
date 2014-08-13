#pragma strict

class EZCalculatorAction extends ActionObj{
	
	public enum Type{
		Crystal,
		Magic,
		Skill,
		Attack,
		None
	};

	static function StringToType(type:String):EZCalculatorAction.Type{
		var ret:EZCalculatorAction.Type = EZCalculatorAction.Type.None;
		switch(type){
			case "crystal":
				ret = EZCalculatorAction.Type.Crystal;
			break;
		
			case "magic":
				ret = EZCalculatorAction.Type.Magic;
			break;
		
			case "skill":
				ret = EZCalculatorAction.Type.Skill;
			break;
		
			case "attack":
				ret = EZCalculatorAction.Type.Attack;
			break;
		
		}
		return ret;
	
	}
	private var type_:Type = Type.None;
	
	public function get type():EZCalculatorAction.Type{
		return type_;
	}
	public function set type(value:EZCalculatorAction.Type){
		type_ = value;
	}
	private var id_:int = 0;
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		id_ = value;
	}
	private var seat_:EZSoul.Seat = EZSoul.Seat.None;
	
	public function get seat():EZSoul.Seat{
		return seat_; 
	}
	public function set seat(value:Seat){
		seat_ = value; 
	}
	private var technique_:EZTechniqueData;
	public function get technique():EZTechniqueData{
		return technique_;
	}
	public function set technique(value:EZTechniqueData){
		this.technique_ = value;
	}
	
}