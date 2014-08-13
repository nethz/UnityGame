#pragma strict
class EZAffixMedicalBattleFactory extends EZAffixFactory{
	private var affix_:EZAffixMedicalBattle = null; 
	public function Awake(){
		this.affix_ = new EZAffixMedicalBattle();
	}
	public function get affix():EZAffix{return affix_;};
}
