#pragma strict

class EZPetNone extends EZPet{
	public function layoutingTask(layout:EZLayout, vFlip:boolean, layer:int):Task{
		return new Task();
	}
	public function layouting(layout:EZLayout, vFlip:boolean, layer:int, onEnd:Function){
		onEnd();
	}
	
	
	
	
	public function winTask():Task{
		return Task();
	}
	
	public function attackTask():Task{
	
		return new Task(); 
	}
	
	public function dieTask():Task{
		
		return new Task(); 
	}
	
	public function hurtDieTask():Task{
		
		return new Task(); 
	}
	
	public function collectTask(point:Vector3):Task{
		
		
		var task:Task = new Task();
		return task;
	}
	
	

	
	public function freeingTask(quality:int, type:Geek.MagicType):Task{
		return new Task();
	
	}
	public function magicTask():Task{
		
		return new Task(); 
	}
	
			
	
	public function provokeTask():Task{
		
		return new Task(); 
	}
	
	public function hurtingTask(attack:PetSoundEffect.AttackType, defense:PetSoundEffect.DefenseType, hurt:EZHud.EffectType):Task{
		return new Task(); 
		
	}
	public function hurtTask(attack:PetSoundEffect.AttackType, defense:PetSoundEffect.DefenseType, hurt:EZHud.EffectType):Task{
		
		return new Task(); 
		
	}
	
	public function reviveTask():Task{
		return new Task(); 
	}
	
	public function get weakup():boolean{
		return false;
	}
}