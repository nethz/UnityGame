#pragma strict
class EZAffixMedicalExtendDotFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalExtendDot = null; 
	public function Awake(){
		this.affix_ = new EZAffixMedicalExtendDot();
	}
	public function get affix():EZAffix{return affix_;};
}
