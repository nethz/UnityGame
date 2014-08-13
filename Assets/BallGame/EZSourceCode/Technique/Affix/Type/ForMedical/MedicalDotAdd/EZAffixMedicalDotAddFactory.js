#pragma strict
class EZAffixMedicalDotAddFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalDotAdd = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixMedicalDotAdd();
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
