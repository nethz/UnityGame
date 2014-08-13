#pragma strict
class EZAffixMedicalFactory extends EZAffixFactory{
	private var affix_:EZAffixMedical = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixMedical();
	}
	public function get affix():EZAffix{return affix_;};
}
