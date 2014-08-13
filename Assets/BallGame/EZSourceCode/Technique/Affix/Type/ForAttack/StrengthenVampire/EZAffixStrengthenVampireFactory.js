#pragma strict
class EZAffixStrengthenVampireFactory extends EZAffixFactory{
	private var affix_:EZAffixStrengthenVampire = null; 
	public function Awake(){
		this.affix_ = new EZAffixStrengthenVampire();
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
