#pragma strict

class EZAffixReinforceDotAddFactory extends EZAffixFactory{
	private var affix_:EZAffixReinforceDotAdd = null; 
	public function Awake(){
		this.affix_ = new EZAffixReinforceDotAdd();
	}
	public function get affix():EZAffix{return affix_;};
}