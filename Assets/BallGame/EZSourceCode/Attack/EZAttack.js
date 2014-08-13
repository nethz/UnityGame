#pragma strict

class EZAttack{
	protected var from_:EZSoul.Seat = EZSoul.Seat.None;
	protected var target_:EZSoul.Seat = EZSoul.Seat.None;
	public function EZAttack(from:EZSoul.Seat){
		this.from_ = from;
	}
	/*
	public function execute(target:EZSoul.Seat):Task{
		target_ = target;
		return null;
	}*/
	public function execute(target:EZSoul.Seat):EZAttackResult{
		return null;
	}
	public function clone(from:EZSoul.Seat):EZAttack{
		var attack:EZAttack = new EZAttack(from);
		return attack;
	}
	
};