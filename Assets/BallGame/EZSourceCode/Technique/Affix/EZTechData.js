#pragma strict

class EZTechData{
	private var type_:String = "";

	
	public var times:Function;
	private var power_:int;
	private var target_:EZTarget.Target = EZTarget.Target.Rival;
	
	private var next_:EZTechData = null;
	private var previous_:EZTechData = null;
	private var besides_:EZTechData = null;
	public var actioned:Function = null;
	public var actioning:Function = null;
	public function get target():EZTarget.Target{
		return target_;
	}
	public function set target(value:EZTarget.Target){
		this.target_ = value;
	}
	public function addNext(next:EZTechData){
		if(next_){
			next_.addNext(next);
		}else{
			next_ = next;
		}
	}
	
	public function addBesides(besides:EZTechData){
	 	if(besides_){
			besides_.addBesides(besides);
		}else{
			besides_ = besides;
		}
	} 
	
	public function addPrevious(previous:EZTechData){
		if(previous_){
			previous_.addPrevious(previous);
		}else{
			previous_ = previous;
		}
	}
	 
	public function get besides():EZTechData{
		return besides_;
	}
	public function get previous():EZTechData{
		return previous_;
	}
	
	public function get next():EZTechData{
		return next_;
	}
	
	public function EZTechData(){
		times = function():int{
			return 1;
		};
		
	}
	public function get type():String{
		return type_;
	}
	public function set type(value:String){
		this.type_ = value;
	}
	public function get power():int{
		return power_;
	
	}
	public function set power(value:int){
		power_ = value;
	}
	public function doActioning(seat:EZSoul.Seat){
		if(actioning){
			actioning(seat);
		}
	}
	public function doActioned(seat:EZSoul.Seat){
		if(actioned){
			actioned(seat);
		}
	}
	////////////////////////
	
	private var flicker_: EZIDFlickerAction.Data[] = new  EZIDFlickerAction.Data[6];
	public function clearFlicker(i:int){
		flicker_[i] = null;
	}
	public function get flicker(): EZIDFlickerAction.Data[]{	
		
		return flicker_;
	}
	
	public function flickerMagicType(seat:EZSoul.Seat, magicType:Geek.MagicType){
		if(flicker_[seat] == null){
			flicker_[seat] = new EZIDFlickerAction.Data();
		}
		flicker_[seat].magicType = magicType;
	
	}
	
	
	public function flickerBindType(seat:EZSoul.Seat, bindType:EZBindData.BindType){
		if(flicker_[seat] == null){
			flicker_[seat] = new EZIDFlickerAction.Data();
		}
		flicker_[seat].bindType = bindType;
	
	}
	public function setFlickerBlood(seat:EZSoul.Seat){
		if(flicker_[seat] == null){
			flicker_[seat] = new EZIDFlickerAction.Data();
		}
		flicker_[seat].blood = true;
	}
	public function setFlickerSpeed(seat:EZSoul.Seat){
		if(flicker_[seat] == null){
			flicker_[seat] = new EZIDFlickerAction.Data();
		}
		
		flicker_[seat].speed = true;
	}
	
	
	
}