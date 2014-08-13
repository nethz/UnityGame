#pragma strict
class EZAffixAttackedFactory extends EZAffixFactory{
	private var affix_:EZAffixAttacked = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixAttacked();
	}
	public function get affix():EZAffix{
	return affix_;};
}
