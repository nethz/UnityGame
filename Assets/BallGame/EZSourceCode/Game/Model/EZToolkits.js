#pragma strict

class EZToolkits{
	static function ModelSeatToViewID(id:EZSoul.Seat):EZView.Seat{
	
		var ret:EZView.Seat = EZView.Seat.None;
		switch(id){
			case EZSoul.Seat.WeBattle:
				ret = EZView.Seat.WeBattle;
			break;
			case EZSoul.Seat.WeBag1: 
				ret = EZView.Seat.WeBag1;
			break;
			case EZSoul.Seat.WeBag2: 
				ret = EZView.Seat.WeBag2;
			break;
			case EZSoul.Seat.FoeBattle: 
				ret = EZView.Seat.FoeBattle;
			break;
			case EZSoul.Seat.FoeBag1:
				ret = EZView.Seat.FoeBag1;
			break;
			case EZSoul.Seat.FoeBag2: 
				ret = EZView.Seat.FoeBag2;
			break;
		
		
		}
		return ret;
		
	}
	/*
	public static function DotSeatToSoulID(seat:EZDot.Seat):EZSoul.Seat{
		var ret:EZSoul.Seat = EZSoul.Seat.None;
		switch(seat){
			case EZDot.Seat.WeBattle:
				ret = EZSoul.Seat.WeBattle;
			break;
			case EZDot.Seat.WeBag1: 
				ret = EZSoul.Seat.WeBag1;
			break;
			case EZDot.Seat.WeBag2: 
				ret = EZSoul.Seat.WeBag2;
			break;
			case EZDot.Seat.FoeBattle: 
				ret = EZSoul.Seat.FoeBattle;
			break;
			case EZDot.Seat.FoeBag1:
				ret = EZSoul.Seat.FoeBag1;
			break;
			case EZDot.Seat.FoeBag2: 
				ret = EZSoul.Seat.FoeBag2;
			break;
		
		
		}
		return ret;
	}
	
	public static function DotSeatToViewID(seat:EZDot.Seat):EZView.Seat{
		var ret:EZView.Seat = EZView.Seat.None;
		switch(seat){
			case EZDot.Seat.WeBattle:
				ret = EZView.Seat.WeBattle;
			break;
			case EZDot.Seat.WeBag1: 
				ret = EZView.Seat.WeBag1;
			break;
			case EZDot.Seat.WeBag2: 
				ret = EZView.Seat.WeBag2;
			break;
			case EZDot.Seat.FoeBattle: 
				ret = EZView.Seat.FoeBattle;
			break;
			case EZDot.Seat.FoeBag1:
				ret = EZView.Seat.FoeBag1;
			break;
			case EZDot.Seat.FoeBag2: 
				ret = EZView.Seat.FoeBag2;
			break;
			case EZDot.Seat.We: 
				ret = EZView.Seat.Hero;
			break;
			case EZDot.Seat.Foe: 
				ret = EZView.Seat.Rival;
			break;
			case EZDot.Seat.All: 
				ret = EZView.Seat.All;
			break;
		
		
		}
		return ret;
	}*/

}