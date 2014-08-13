#pragma strict
class EZAffixDotPathFactory extends EZAffixFactory{
	private var affix_:EZAffixDotPath = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixDotPath();
	}
	public function get affix():EZAffix{return affix_;};
}
