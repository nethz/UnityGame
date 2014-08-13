#pragma strict

class EZNoneSoul extends EZSoul{
	
	public static function Create():EZNoneSoul{
		var obj:GameObject = EZSoul.CreateGameObject();
		var soul:EZNoneSoul = obj.AddComponent("EZNoneSoul") as EZNoneSoul;
		obj.name = "NoneSoul";
		return soul;
	}
	public function appear(i:int):boolean{
		return false;
	}
	public function get alive():boolean{
		return false;
	}
}