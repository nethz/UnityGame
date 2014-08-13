#pragma strict
class EZAffixMedicalDetonateDotFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalDetonateDot = null; 
	public function Awake(){
		this.affix_ = new EZAffixMedicalDetonateDot();
	}
	public function get affix():EZAffix{return affix_;};
}
