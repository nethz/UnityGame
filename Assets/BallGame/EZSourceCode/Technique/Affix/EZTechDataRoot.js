#pragma strict

class EZTechDataRoot extends EZTechDataValue{
	
	
	public var toPrepare:Function = null;
	public var elements:Function;
	
	private var original_:float = 0;
	private var getPhysics_:Function = null;
	private var getMagic_:Function = null;
	private var block_:EZBind = null;
	private var pretreatment_:Function = null;
	private var strongVampire_:boolean = false;
	private var strongDot_:float = 1.0f;
	private var suckBlood_:boolean = false;
	
	
	private var doChant_:boolean = false;
	private var medicalFeedback_:boolean = false;
	private var medicalFeedbackBlood_:float = 1.0f;
	private var doubleDot_:float = 1.0f;
	
	


	
	
	public function get  doChant():boolean{
		return doChant_;
	}
	public function set doChant(value:boolean){
		this.doChant_ = value;
	}
	
	
	public function get  medicalFeedback():boolean{
		return medicalFeedback_;
	}
	public function set medicalFeedback(value:boolean){
		this.medicalFeedback_ = value;
	}
	
	public function get medicalFeedbackBlood():float{
		return medicalFeedbackBlood_;
	}
	public function set medicalFeedbackBlood(value:float){
		this.medicalFeedbackBlood_ = value;
	}
	
	public function get strongDot():float{
		return strongDot_;
	}
	public function set strongDot(value:float){
		this.strongDot_ = value;
	}
	public function get doubleDot():float{
		return doubleDot_;
	}
	
	
	public function set doubleDot(value:float){
		this.doubleDot_ = value;
	}

	public function get suckBlood():boolean{
		return suckBlood_;
	}
	
	public function set suckBlood(value:boolean){
		this.suckBlood_ = value;
	}
	
	
	public function get strongVampire():boolean{
		return strongVampire_;
	}
	
	public function set strongVampire(value:boolean){
		this.strongVampire_ = value;
	}
	
	
	public function get block():EZBind{
		return block_;
	}
	private function physics_(seat:EZSoul.Seat):float{
		var p:float = this.getPhysics_(seat);
		if( p < 0){
			p = 0;
		}
		var e:float = this.elements(seat);
		return (p * this.original_ * e);

	};
	
	
	private function magic_(seat:EZSoul.Seat):float{
		var m:float = this.getMagic_(seat);
		if( m < 0){
			m = 0;
		}
		return m; 
	};
	
	
	
	public function set block(value:EZBind){
		this.block_ = value;
	}
	public function EZTechDataRoot(){
		super();
		
		block_ = null;
		strongVampire_ = false;
		blockPhysics = false;
		suckBlood_ = false;
		strongDot_ = 1.0f;
		doubleDot_ = 1.0f;
		medicalFeedback_ = false;
		medicalFeedbackBlood_ = 1.0f;
		doChant_ = false;
		
	
		getPhysics_ = function(seat:EZSoul.Seat):float{return 1.0f;};
		getMagic_ = function(seat:EZSoul.Seat):float{return 0.0f;};
		toPrepare = function(data:EZTechData){};
		this.physics = this.physics_;
		this.magic = this.magic_;
		
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
	
	public function get pretreatment():Function{
		return pretreatment_;
	}
	
	public function set pretreatment(value:Function){
		this.pretreatment_ = value;
	}
	
	public function prepare(){
		
		if(pretreatment_){
			pretreatment_();
		}
		
		
		
		
		toPrepare(this);
	
		var b:EZTechData = this.besides;
		while(b != null){
			toPrepare(b);
			b = b.besides;
		}
	
		var p:EZTechData = this.previous;
		while(p != null){
			toPrepare(p);
			p = p.previous;
		}
		
		var n:EZTechData = this.next;
		while(n != null){
			toPrepare(n);
			n = n.next;
		}
		
		
	}
	
}