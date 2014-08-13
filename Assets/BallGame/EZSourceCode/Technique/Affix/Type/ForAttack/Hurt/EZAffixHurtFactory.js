#pragma strict
class EZAffixHurtFactory extends EZAffixFactory{
	private var affix_:EZAffixHurt = null; 
	public function Awake(){
		this.affix_ = new EZAffixHurt();
	}
	public function get affix():EZAffix{return affix_;};
}
