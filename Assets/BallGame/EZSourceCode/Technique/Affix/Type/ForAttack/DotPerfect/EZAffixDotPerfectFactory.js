#pragma strict
class EZAffixDotPerfectFactory extends EZAffixFactory{
	private var affix_:EZAffixDotPerfect = null; 
	public function Awake(){
		this.affix_ = new EZAffixDotPerfect();
	}
	public function get affix():EZAffix{return affix_;};
}
