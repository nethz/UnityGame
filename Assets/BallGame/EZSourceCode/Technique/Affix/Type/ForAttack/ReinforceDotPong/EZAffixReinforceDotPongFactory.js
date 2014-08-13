#pragma strict

class EZAffixReinforceDotPongFactory extends EZAffixFactory{
	private var affix_:EZAffixReinforceDotPong = null; 
	public function Awake(){
		this.affix_ = new EZAffixReinforceDotPong();
	}
	public function get affix():EZAffix{
		return affix_;
	}
}