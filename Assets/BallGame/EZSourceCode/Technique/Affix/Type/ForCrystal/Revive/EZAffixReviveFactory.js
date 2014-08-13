#pragma strict
class EZAffixReviveFactory extends EZAffixFactory{
	private var affix_:EZAffixRevive = null; 
	public function Awake(){
		this.affix_ = new EZAffixRevive();
	
	}
	public function get affix():EZAffix{
		Debug.LogWarning("crystal_revive");
		return affix_;
	};
}
