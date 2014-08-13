#pragma strict

class EZPet extends MonoBehaviour{
	
	public var _hudAndSpecially:EZHudAndSpecially = null;
	public function setAlpha(alpha:float){
		
	}
	public function setBindData(data:EZBindData){
	
	}
	
	
	public function flicker(enable:boolean, layer:int){}
	
	public function attackType():PetSoundEffect.AttackType{
		return PetSoundEffect.AttackType.Nomal;
	}
	public function defenseType():PetSoundEffect.DefenseType{
		return PetSoundEffect.DefenseType.Nomal;
	}
	public function selected(enable:boolean){
		
	}
	public function get weakup():boolean{
		return true;
	}
	public function get mouseHandler():EZMouseHandler{
		return null;
	}
	
	public function get body():EZSkeletal{
		return null;
	}
	public function get hud():EZHud{
		return null;
	}
		
	public function get ghost():EZGhost{
		return null;
	}
	
	public function get specially():EZSpecially{
		return null;
	}

	public function layoutingTask(layout:EZLayout, vFlip:boolean, layer:int):Task{
		
	}
	public function show(){
		
		
	}
	public function hide(){
		
	}
	
	public function winTask():Task{
		return null;
	}
	
	public function attackTask():Task{
		return null;
	}
	public function attackDBTask():Task{
		return null;
	}
	public function dieTask():Task{
		return null;
	}
	
	public function hurtDieTask():Task{
		return null; 
	}
	public function freeingTask(quality:int, type:Geek.MagicType):Task{
		return null;
	}
	public function magicTask():Task{
		return null;
	}
	public function collectTask(point:Vector3):Task{
		return null;
	
	}
	
			
	public function provokeTask():Task{
		
		return null; 
	}
	public function medicalTask():Task{
		return new Task();
		
	}
	public function hurtTask(attack:PetSoundEffect.AttackType, defense:PetSoundEffect.DefenseType, hurt:EZHud.EffectType):Task{
		return null;
		
	}
	public function hurtingTask(attack:PetSoundEffect.AttackType, defense:PetSoundEffect.DefenseType, hurt:EZHud.EffectType):Task{
		return null;
		
	}
	
	
	
	public function reviveTask():Task{
		return null;
	}
	public function post(msg:String){
	}
	 
	public function set magicType(value:Geek.MagicType){
	
	}

}