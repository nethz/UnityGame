#pragma strict

class EZIDHurtTask extends Task{
	
	private var hurtType_:EZHud.EffectType = EZHud.EffectType.Attack;
	private var attackSeat_:EZSoul.Seat = EZSoul.Seat.WeBattle;
	
	private var id_:int;
	
	private var over_:boolean;
	public function EZIDHurtTask(){
		this.isOver = function(){
			return over_;
		};
	}
	
	public function get attackSeat():EZSoul.Seat{
		return attackSeat_;
	}
	public function set attackSeat(value:EZSoul.Seat){
		this.attackSeat_ = value;
	}
	
	
	public function get hurtType():EZHud.EffectType{
		return hurtType_;
	}
	public function set hurtType(value:EZHud.EffectType){
		this.hurtType_ = value;
	}
	public function get over():boolean{
		return over_;
	}
	public function set over(value:boolean){
		this.over_ = value;
	}
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		this.id_ = value;
	}
}