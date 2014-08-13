#pragma strict
class EZAffixTherapyFactory extends EZAffixFactory{
	private var affix_:EZAffixTherapy = null; 
	public function Awake(){
		this.affix_ = new EZAffixTherapy();
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
