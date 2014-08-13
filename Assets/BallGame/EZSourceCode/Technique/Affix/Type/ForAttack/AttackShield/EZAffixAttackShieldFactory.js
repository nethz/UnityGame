#pragma strict
class EZAffixAttackShieldFactory extends EZAffixFactory{
	private var affix_:EZAffixAttackShield = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixAttackShield();
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
