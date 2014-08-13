#pragma strict

class EZTechDataValue extends EZTechData{
	
	public var physics:Function;
	public var magic:Function;
	private var blockPhysics_:boolean = false;
	
	private var puncture_:boolean = false;
		
	public function get  puncture():boolean{
		return puncture_;
	}
	public function set puncture(value:boolean){
		this.puncture_ = value;
	}
	
	public function get blockPhysics():boolean{
		return blockPhysics_;
	}
	
	public function set blockPhysics(value:boolean){
		this.blockPhysics_ = value;
	}
	
	
	
	public function EZTechDataValue(){
		super();
		puncture_ = false;
		
	}
	
	
	
	
	
}