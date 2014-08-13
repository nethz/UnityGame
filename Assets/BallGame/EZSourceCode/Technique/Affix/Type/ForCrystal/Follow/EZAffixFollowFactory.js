#pragma strict
class EZAffixFollowFactory extends EZAffixFactory{
	private var affix_:EZAffixFollow = null; 
	public function Awake(){
		this.affix_ = new EZAffixFollow();
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
