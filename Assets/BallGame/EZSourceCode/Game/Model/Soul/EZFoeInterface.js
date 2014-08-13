#pragma strict

class EZFoeInterface extends MonoBehaviour{
	public function thinking(){}
	public function getTime():int{
		return 9;
	}
	public function getMagic():float{
		return 2;
	}
	public function getAllMagic():float{
		return 3;
	}
	
	public function getState():EZHudState.State{
		return EZHudState.State.FoeSkill;
	}
}