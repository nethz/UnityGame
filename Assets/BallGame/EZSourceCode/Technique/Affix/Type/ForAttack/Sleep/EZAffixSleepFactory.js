#pragma strict
class EZAffixSleepFactory extends EZAffixFactory{
	private var affix_:EZAffixSleep = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixSleep();
	}
	public function get affix():EZAffix{return affix_;};
}
