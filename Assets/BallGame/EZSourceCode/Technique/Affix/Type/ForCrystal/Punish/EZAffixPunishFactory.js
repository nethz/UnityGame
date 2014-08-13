#pragma strict
class EZAffixPunishFactory extends EZAffixFactory{
	private var affix_:EZAffixPunish = null; 
	public function Awake(){
		this.affix_ = new EZAffixPunish();
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
