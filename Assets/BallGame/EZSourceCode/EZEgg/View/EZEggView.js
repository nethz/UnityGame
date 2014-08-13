#pragma strict

class EZEggView extends MonoBehaviour{
	public var _main:EZEggMainView = null;
	public var _anima:EZEggAnimationView = null;
	
	public function get main():EZEggMainView{
		return _main;
	}
	
	public function get anima():EZEggAnimationView{
		return _anima;
	}
}