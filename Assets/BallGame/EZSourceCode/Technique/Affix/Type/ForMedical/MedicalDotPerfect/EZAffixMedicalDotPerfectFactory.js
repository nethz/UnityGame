#pragma strict
class EZAffixMedicalDotPerfectFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalDotPerfect = null; 
	public function Awake(){
		this.affix_ = new EZAffixMedicalDotPerfect();
	}
	public function get affix():EZAffix{return affix_;};
}
