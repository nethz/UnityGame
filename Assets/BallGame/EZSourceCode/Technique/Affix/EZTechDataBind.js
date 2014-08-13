#pragma strict


class EZTechDataBind extends EZTechData{
	
	

	public var binding:Function = null;
	/*
	public function EZTechDataValue(){
		super();
		getPhysics_ = function(seat:EZSoul.Seat):float{return 1.0f;};
		getMagic_ = function(seat:EZSoul.Seat):float{return 0.0f;};
		
		this.physics = function(seat:EZSoul.Seat):float{
			var p:float = this.getPhysics_(seat);
			if( p < 0){
				p = 0;
			}
			var e:float = this.elements(seat);
			return (p * this.original_ * e);
	
		};
		this.magic = function(seat:EZSoul.Seat):float{
			var m:float = this.getMagic_(seat);
			if( m < 0){
				m = 0;
			}
			return m; 
		};
		
		this.elements = function(seat:EZSoul.Seat):float{
			return 1.0f;
		};
	}

	public function get original():float{
		return original_;
	}
	public function set original(value:float){
		this.original_ = value;
	}
	
	public function get getPhysics():Function{
		return getPhysics_;
	}
	
	public function set getPhysics(value:Function){
		this.getPhysics_ = value;
	}
	
	public function get getMagic():Function{
		return getMagic_;
	}
	
	public function set getMagic(value:Function){
		this.getMagic_ = value;
	}
	
	
	public function get times():float{
		return times_;
	}
	
	public function set times(value:float){
		this.times_ = value;
	}
	*/
	
	
	
}