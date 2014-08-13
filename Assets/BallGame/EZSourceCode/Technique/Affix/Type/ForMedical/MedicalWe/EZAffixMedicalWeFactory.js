#pragma strict
class EZAffixMedicalWeFactory extends EZAffixFactory{
	private var affix_: EZAffixMedicalWe = null; 
	public function Awake(){
		this.affix_ = new  EZAffixMedicalWe();
	}
	public function get affix():EZAffix{return affix_;};
}
