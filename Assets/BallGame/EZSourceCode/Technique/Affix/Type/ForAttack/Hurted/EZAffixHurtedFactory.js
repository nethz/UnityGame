#pragma strict
class EZAffixHurtedFactory extends EZAffixFactory{
	private var affix_:EZAffixHurted = null; 
	public function Awake(){
		this.affix_ = new EZAffixHurted();
	}
	public function get affix():EZAffix{return affix_;};
}
