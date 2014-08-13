#pragma strict
class EZContainer extends MonoBehaviour{
	
	protected var soul_:EZSoul = null;
	public var _seat:EZSoul.Seat = EZSoul.Seat.None;
	function get seat():EZSoul.Seat{return _seat;}
	private var initiative_:boolean = false;
	public function set initiative(value:boolean){
		initiative_ = value;
	}
	public function get initiative():boolean{
		return initiative_;
	}
	public function addAttackPower(type:Geek.MagicType, power:float){
	
		if(soul_ == null)
			return;
			
		var handler:EZBuffHandler = soul_.getBuffHandler();
		handler.refresh();
		if(handler.ignore()|| handler.deposit()){
		
			return;
		}
		
		
		if(type == this.soul_.type){
			this.soul.addSkillPower(power);
		}
		this.soul.addAttackPower(power);
	
	}
	
	function addMagicPower(type:Geek.MagicType, power:float){
	
		var handler:EZBuffHandler = soul_.getBuffHandler();
		handler.refresh();
		if(handler.ignore()){
			return;
		}
		
		
		if(type == this.soul.type){
			this.soul.addMagicPower(power);
		}
	}
	function swap(container:EZContainer){
		var handlerA:EZBuffHandler = container.soul.getBuffHandler();
		handlerA.refresh();
		EZCtrl.BuffFlicker(handlerA.doSwap());
		EZCtrl.BuffClose(handlerA.doClose());
		
		var handlerB:EZBuffHandler = soul.getBuffHandler();
		handlerB.refresh();
		EZCtrl.BuffFlicker(handlerB.doSwap());
		EZCtrl.BuffClose(handlerB.doClose());
		var soul:EZSoul = container.soul;
		container.soul = this.soul;
		this.soul = soul;
		
		//container.soul = this.soul;
		//this.setSoul(soul);
	}

	
	
	function Awake(){
		EZContainerManager.AddContainer(this);
		if(this.soul_ != null)
		{
			this.soul_.seat = this.seat;
		}
	}
	function OnDestroy(){
		EZContainerManager.RemoveContainer(this.seat);
	}
	function hasSoul():boolean{
		return this.soul_ != null;
	}
	function isDie():boolean{
		
		if(this.soul_ == null)
			return true;
		if(this.soul_.health <= 0){
			return true;
		}
		return false;
	
	}
	
	function get soul():EZSoul{
		return this.soul_;
	}
	
	private function set soul(value:EZSoul){
		this.soul_ = value;
		this.soul_.seat = this.seat;
		this.soul_.transform.parent = this.transform;
	}
	public function setSoul(soul:EZSoul){
		if(this.soul_)
		{
			this.soul_.reset();
			this.soul_ = null;
		}
		this.soul = soul;
	}
	/*
	function set soul(value:EZSoul){
		if(this.soul_){
			this.soul_.reset();
		}
		this.soul_ = value;
		this.soul_.seat = this.seat;
		this.soul_.transform.parent = this.transform;
	}
	*/
	


	
	public function get type(){
		if(this.soul_ == null)
			return Geek.MagicType.None;
		return this.soul_.type;
	}
	
	public function canMagic():boolean{
		return false;
	}


}