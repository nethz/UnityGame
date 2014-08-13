#pragma strict
class EZAffixExtendDotFactory extends EZAffixFactory{
	private var affix_:EZAffixExtendDot = null; 
	public function Awake(){
		this.affix_ = new EZAffixExtendDot();
	}
	public function get affix():EZAffix{return affix_;};
}
