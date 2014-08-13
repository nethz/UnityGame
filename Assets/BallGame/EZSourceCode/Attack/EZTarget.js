#pragma strict

class EZTarget{
	public enum Target{
		Self,
		Rival,
		We,
		Foe,
		All,
		None,
		WeBattle,
		WeBag1,
		WeBag2,
		FoeBattle,
		FoeBag1,
		FoeBag2,
		Front,
		SelfBattle,
		FrontRandom,
	};
	public static function IsFoe(seat:EZSoul.Seat){
		if(seat == EZSoul.Seat.FoeBattle || seat == EZSoul.Seat.FoeBag1 || seat == EZSoul.Seat.FoeBag2 || seat == EZSoul.Seat.Rival){
			return true;
			
		}
		return false;
	
	
	}
	public static function IsWe(seat:EZSoul.Seat){
		if(seat == EZSoul.Seat.WeBattle || seat == EZSoul.Seat.WeBag1 || seat == EZSoul.Seat.WeBag2 || seat == EZSoul.Seat.Hero){
			return true;
			
		}
		return false;
	
	
	
	}
	public static function FromSeat(seat:EZSoul.Seat):EZTarget.Target{
		
	 	var target:EZTarget.Target = EZTarget.Target.None;    
		switch(seat){
	 	case EZSoul.Seat.WeBattle:
	 		target = Target.WeBattle;
	 		break;
	 	case EZSoul.Seat.WeBag1:
	 		target = Target.WeBag1;
	 		break;
	 	case EZSoul.Seat.WeBag2:
	 		target = Target.WeBag2;
	 		break;
	 	case EZSoul.Seat.FoeBattle:
	 		target = Target.FoeBattle;
	 		break;
	 	case EZSoul.Seat.FoeBag1:
	 		target = Target.FoeBag1;
	 		break;
	 	case EZSoul.Seat.FoeBag2:
	 		target = Target.FoeBag2;
	 		break;
	 	}
	 	return target;
	
	}
	public static function GetTarget(type:String):EZTarget.Target{
	 	var target:EZTarget.Target = EZTarget.Target.None;    
	 	switch(type){
	 	case "Self":
	 		target = Target.Self;
	 		break;
	 	case "Rival":
	 		target = Target.Rival;
	 		break;
	 	case "We":
	 		target = Target.We;
	 		break;
	 	case "Foe":
	 		target = Target.Foe;
	 		break;
	 	case "All":
	 		target = Target.All;
	 		break;
	 	case "None":
	 		target = Target.None;
	 		break;
	 	case "WeBattle":
	 		target = Target.WeBattle;
	 		break;
	 	case "FoeBattle":
	 		target = Target.FoeBattle;
	 		break;
	 	case "Front":
	 		target = Target.Front;
	 		break;
	 	case "SelfBattle":
	 		target = Target.SelfBattle;
	 		break;
	 	case "FrontRandom":
	 		target = Target.FrontRandom;
	 		break;
	 		
	 	}
	 	return target;
	
	}
};