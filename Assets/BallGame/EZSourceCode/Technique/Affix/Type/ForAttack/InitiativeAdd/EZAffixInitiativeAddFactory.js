#pragma strict
class EZAffixInitiativeAddFactory extends EZAffixFactory{
	private var affix_:EZAffixInitiativeAdd = null; 
	public function Awake(){
		this.affix_ = new EZAffixInitiativeAdd();
	}
	public function get affix():EZAffix{return affix_;};
}
