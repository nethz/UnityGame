#pragma strict
class EZAffixMedicalSacrificeFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalSacrifice = null; 
	public function Awake(){
		this.affix_ = new EZAffixMedicalSacrifice();
	}
	public function get affix():EZAffix{return affix_;};
}
