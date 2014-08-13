#pragma strict

class EZContainerManager{

	private static var map_:Hashtable = new Hashtable();
	public static var crystal_:EZModelCrystal = null;
	public enum Type{
		Pet,
		Boss,
		Monster,
	};
	public static function SetCrystal(crystal:EZModelCrystal){
		crystal_ = crystal;
	}
	public static function GetCrystal():EZModelCrystal{
		return crystal_;
	}
	public static function FoeWin():boolean{
		if(!EZContainerManager.Alive(EZSoul.Seat.WeBattle)
		&& !EZContainerManager.Alive(EZSoul.Seat.WeBag1)
		&& !EZContainerManager.Alive(EZSoul.Seat.WeBag2)
		){
			return true;
		}	
		return false;
	}
	
	public static function WeWin(){
		if(!EZContainerManager.Alive(EZSoul.Seat.FoeBattle)
		&& !EZContainerManager.Alive(EZSoul.Seat.FoeBag1)
		&& !EZContainerManager.Alive(EZSoul.Seat.FoeBag2)
		){
			return true;
		}	
		return false;
	}
	
	public static function FightOver(){
		if(FoeWin()){
			return true;
		}
		if(WeWin()){
			return true;
		} 
		return false;
	}
	
	

	public static function GetContainer(seat:EZSoul.Seat):EZContainer{
		return map_[seat] as EZContainer;
	}
	
	public static function Alive(seat:EZSoul.Seat):boolean{
		
		var container:EZContainer = GetContainer(seat);
		if(container && container.soul && container.soul.alive){
			
			return true;
		}
		return false;
	}	
	public static function WeDie():int{
		var n:int = 0;
		if(!Alive(EZSoul.Seat.WeBattle)){
			n+=1;
		} 
		if(!Alive(EZSoul.Seat.WeBag1)){
			n+=1;
		} 
		if(!Alive(EZSoul.Seat.WeBag2)){
			n+=1;
		} 
		
		return n;
	}
	public static function WhoAreYou(seat:EZSoul.Seat):EZContainerManager.Type{
	
		
		var soul:EZSoul = GetSoul(seat);
		if(soul){
			var monster:EZBossSoul = soul.gameObject.GetComponent(EZBossSoul);
			if(monster && monster.boss){
				return EZContainerManager.Type.Boss;
			}
			return EZContainerManager.Type.Monster;
		}
		return EZContainerManager.Type.Pet;
	}
	
	
	
	
	public static function CanMagic(seat:EZSoul.Seat):boolean{
		
		var container:EZContainer = GetContainer(seat);
		return container.canMagic();
	}
	
	public static function GetSoul(seat:EZSoul.Seat):EZSoul{
		var container:EZContainer = map_[seat] as EZContainer;
		if(container){
			return container.soul;
		}
		return null;
	}
	
	public static function AddContainer(container:EZContainer){
	
		map_[container.seat] = container;
	}
	
	public static function RemoveContainer(seat:EZSoul.Seat){
		map_.Remove(seat);
	}
	
	
	
}