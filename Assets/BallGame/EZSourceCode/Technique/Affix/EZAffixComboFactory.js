#pragma strict
class EZAffixComboFactory extends EZAffixFactory{
	private var affix_:EZAffixCombo = null;
	public function Awake(){
		this.affix_ = new EZAffixCombo();
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
