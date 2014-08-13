#pragma strict
class EZAffixMedicalSelfFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalSelf = null; 
	public function Awake(){
		this.affix_ = new EZAffixMedicalSelf();
	}
	public function get affix():EZAffix{return affix_;};
}
