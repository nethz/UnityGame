#pragma strict
class EZAffixAttackFactory extends EZAffixFactory{
	private var affix_:EZAffixAttack = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixAttack();
	}
	public function get affix():EZAffix{return affix_;}
}
