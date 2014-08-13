#pragma strict
class EZAffixMedicalStrengthenDotFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalStrengthenDot = null; 
	public function Awake(){
		this.affix_ = new EZAffixMedicalStrengthenDot();
	}
	public function get affix():EZAffix{return affix_;};
}
