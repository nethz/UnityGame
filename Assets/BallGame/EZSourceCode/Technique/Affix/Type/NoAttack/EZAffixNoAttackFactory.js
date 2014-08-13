#pragma strict
class EZAffixNoAttackFactory extends EZAffixFactory{
	private var affix_:EZAffixNoAttack = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixNoAttack();
	}  
	public function get affix():EZAffix{return affix_;};
}
