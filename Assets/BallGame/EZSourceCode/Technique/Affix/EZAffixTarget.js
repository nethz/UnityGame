#pragma strict

class EZAffixTarget{
	
	

	

	
	
	private static function getTargetSelf(from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{
		var ret:EZSoul.Seat[] = new EZSoul.Seat[1];
		ret[0] = from;
		return ret;
		
	}
	
	private static function getTargetRival(from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{
		var ret:EZSoul.Seat[] = new EZSoul.Seat[1];
		ret[0] = to;
		return ret;
	}
	
	
	
	
	private static function getTargetWe(from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{ 
	
		var ret:EZSoul.Seat[] = new EZSoul.Seat[3]; 
		switch(from){ 
		case EZSoul.Seat.WeBattle:
		case EZSoul.Seat.WeBag1:
		case EZSoul.Seat.WeBag2:  
			ret[0] = EZSoul.Seat.WeBattle;
			ret[1] = EZSoul.Seat.WeBag1;
			ret[2] = EZSoul.Seat.WeBag2;
		break;
		
		
		case EZSoul.Seat.FoeBattle:
		case EZSoul.Seat.FoeBag1:
		case EZSoul.Seat.FoeBag2:   
			ret[0] = EZSoul.Seat.FoeBattle;
			ret[1] = EZSoul.Seat.FoeBag1;
			ret[2] = EZSoul.Seat.FoeBag2;
		
		break;
		
	
		
		}
		return ret;
	}
	 
	private static function getTargetFoe(from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{ 
	
		var ret:EZSoul.Seat[] = new EZSoul.Seat[3]; 
		switch(to){ 
		case EZSoul.Seat.WeBattle:
		case EZSoul.Seat.WeBag1:
		case EZSoul.Seat.WeBag2:  
			ret[0] = EZSoul.Seat.WeBattle;
			ret[1] = EZSoul.Seat.WeBag1;
			ret[2] = EZSoul.Seat.WeBag2;
		break;
		
		
		case EZSoul.Seat.FoeBattle:
		case EZSoul.Seat.FoeBag1:
		case EZSoul.Seat.FoeBag2:   
			ret[0] = EZSoul.Seat.FoeBattle;
			ret[1] = EZSoul.Seat.FoeBag1;
			ret[2] = EZSoul.Seat.FoeBag2;
		
		break;
		
		}
		return ret;
	}
	
	 
	private static function getSelfBattle(from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{ 
	
		var ret:EZSoul.Seat[] = new EZSoul.Seat[1]; 
		switch(from){ 
		case EZSoul.Seat.WeBattle:
		case EZSoul.Seat.WeBag1:
		case EZSoul.Seat.WeBag2:  
			
			ret[0] = EZSoul.Seat.WeBattle;
		break;
		
		
		case EZSoul.Seat.FoeBattle:
		case EZSoul.Seat.FoeBag1:
		case EZSoul.Seat.FoeBag2:   
			ret[0] = EZSoul.Seat.FoeBattle;
		break;
		}
		return ret;
	}
	
	
	private static function getTargetAll(from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{ 
	
		var ret:EZSoul.Seat[] = new EZSoul.Seat[6]; 
		
		ret[0] = EZSoul.Seat.WeBattle;
		ret[1] = EZSoul.Seat.WeBag1;
		ret[2] = EZSoul.Seat.WeBag2;
	
		ret[0] = EZSoul.Seat.FoeBattle;
		ret[1] = EZSoul.Seat.FoeBag1;
		ret[2] = EZSoul.Seat.FoeBag2;
		
		
		return ret;
	}
	
	private static function getFrontRandom(from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{
		
		var ret:EZSoul.Seat[] = new EZSoul.Seat[1]; 
		var front:EZSoul.Seat[] = getFront(from, to); 
		ret[0] = front[Random.Range(0, front.length)];
		return ret;
	}
	
	
	public static function getFront(from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{
		 
	    var ret:EZSoul.Seat[] = null;
		switch(to){
		
			case EZSoul.Seat.WeBattle:
			case EZSoul.Seat.WeBag1:
			case EZSoul.Seat.WeBag2:   
			
				if(EZContainerManager.Alive(EZSoul.Seat.WeBag1) && EZContainerManager.Alive(EZSoul.Seat.WeBag2)){
					  ret = new EZSoul.Seat[2];  
					  ret[0] = EZSoul.Seat.WeBag1;
					  ret[1] = EZSoul.Seat.WeBag2;
				}else if(EZContainerManager.Alive(EZSoul.Seat.WeBag1)){
				  	 ret = new EZSoul.Seat[1];  
					 ret[0] = EZSoul.Seat.WeBag1;
				}else if(EZContainerManager.Alive(EZSoul.Seat.WeBag2)){
				  	 ret = new EZSoul.Seat[1];  
					 ret[0] = EZSoul.Seat.WeBag2;
				}else{
				 	ret = new EZSoul.Seat[1];  
					ret[0] = EZSoul.Seat.WeBattle;
				}
				
			
			
		break;
		
		
		case EZSoul.Seat.FoeBattle:
		case EZSoul.Seat.FoeBag1:
		case EZSoul.Seat.FoeBag2:   
			if(EZContainerManager.Alive(EZSoul.Seat.FoeBag1) && EZContainerManager.Alive(EZSoul.Seat.FoeBag2)){
				ret = new EZSoul.Seat[2];  
				ret[0] = EZSoul.Seat.FoeBag1;
				ret[1] = EZSoul.Seat.FoeBag2;
			}else if(EZContainerManager.Alive(EZSoul.Seat.FoeBag1)){
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.FoeBag1;
			}else if(EZContainerManager.Alive(EZSoul.Seat.FoeBag2)){
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.FoeBag2;
			}else{
			 	ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.FoeBattle;
			}
				
		break;
		}
		
		return ret;
	}
	
	public static function GetTargetSeat(target:EZTarget.Target , from:EZSoul.Seat, to:EZSoul.Seat):EZSoul.Seat[]{
	
		var ret:EZSoul.Seat[] = null;
		switch(target){
			case EZTarget.Target.Self:
				ret = getTargetSelf(from, to);
				break;
			case EZTarget.Target.Rival: 
				ret = getTargetRival(from, to);
				break;
			case EZTarget.Target.We: 
				ret = getTargetWe(from, to);
				break;
			case EZTarget.Target.Foe: 
				ret = getTargetFoe(from, to);
				break;
			case EZTarget.Target.All: 
				ret = getTargetAll(from, to);
				break;
			case EZTarget.Target.None: 
				ret = null;
				break;  
			case EZTarget.Target.WeBattle:
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.WeBattle;
				break;
			
			case EZTarget.Target.WeBag1:
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.WeBag1;
				break;
			case EZTarget.Target.WeBag2:
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.WeBag2;
				break;
				
			case EZTarget.Target.FoeBattle: 
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.FoeBattle;
				break;
				
				
				
			case EZTarget.Target.FoeBag1:
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.FoeBag1;
				break;
			case EZTarget.Target.FoeBag2:
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.FoeBag2;
				break;
				
			case EZTarget.Target.Front:
				ret = getFront(from, to);
				break;
			case EZTarget.Target.SelfBattle:
				ret= getSelfBattle(from, to);
				break;
			case EZTarget.Target.FrontRandom:
				ret = getFrontRandom(from, to);
				break;
		}
		return ret;
	}
	
	public static function GetTargetSeat(target:EZTarget.Target ,context:EZAffixContext):EZSoul.Seat[]{
		var from:EZSoul.Seat = context.from;
		var to:EZSoul.Seat = context.to;
		return GetTargetSeat(target, from, to);
		/*
		var ret:EZSoul.Seat[] = null;
		switch(target){
			case EZTarget.Target.Self:
				ret = getTargetSelf(from, to);
				break;
			case EZTarget.Target.Rival: 
				ret = getTargetRival(from, to);
				break;
			case EZTarget.Target.We: 
				ret = getTargetWe(from, to);
				break;
			case EZTarget.Target.Foe: 
				ret = getTargetFoe(from, to);
				break;
			case EZTarget.Target.All: 
				ret = getTargetAll(from, to);
				break;
			case EZTarget.Target.None: 
				ret = null;
				break;  
			case EZTarget.Target.WeBattle:
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.WeBattle;
				break;
			case EZTarget.Target.FoeBattle: 
				ret = new EZSoul.Seat[1];  
				ret[0] = EZSoul.Seat.FoeBattle;
				break;
		}
		return ret;
		*/
	}
};
