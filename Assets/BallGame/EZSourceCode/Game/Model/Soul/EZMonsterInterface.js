#pragma strict

class EZMonsterInterface extends EZFoeInterface{
	public var _soul:EZMonsterSoul = null;
	public function thinking(){
		_soul.thinking();
	}
}