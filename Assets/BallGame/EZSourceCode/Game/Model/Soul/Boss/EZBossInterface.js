#pragma strict


class EZBossInterface extends EZFoeInterface{
	
	public var _soul:EZBossSoul = null;
	public function thinking(){
		_soul.thinking();
	}
	public function getTime():int{
		return _soul.state.tech.time;
	}
	public function getMagic():float{
		if(!_soul.hasMagic()){
			return 0;
		}else{
			return _soul.state.tech.power;
		}
	}
	public function getAllMagic():float{
	
		
		if(!_soul.hasMagic()){
			return 1;
		}else{
			return _soul.state.tech.allPower;
		}
	}
	
	public function getState():EZHudState.State{
		if(!_soul.hasMagic()){
			return EZHudState.State.FoeSkill;
		}else{
			return EZHudState.State.FoeMagic;
		}
	}
}