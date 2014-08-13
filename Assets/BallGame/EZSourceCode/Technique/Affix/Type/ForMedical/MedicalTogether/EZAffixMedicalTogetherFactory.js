#pragma strict
class EZAffixMedicalTogetherFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalTogether = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixMedicalTogether();
	}
	public function get affix():EZAffix{return affix_;};
}
