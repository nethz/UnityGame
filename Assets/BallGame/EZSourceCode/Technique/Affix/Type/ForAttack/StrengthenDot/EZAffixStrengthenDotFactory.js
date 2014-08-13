#pragma strict
class EZAffixStrengthenDotFactory extends EZAffixFactory{
	private var affix_:EZAffixStrengthenDot = null; 
	public function Awake(){
		this.affix_ = new EZAffixStrengthenDot();
	}
	public function get affix():EZAffix{return affix_;};
}
