#pragma strict
class EZAffixSplittingFactory extends EZAffixFactory{
	private var affix_:EZAffixSplitting = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixSplitting();
	}
	public function get affix():EZAffix{return affix_;};
}
