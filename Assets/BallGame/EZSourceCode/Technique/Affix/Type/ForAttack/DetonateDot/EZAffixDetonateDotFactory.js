#pragma strict
class EZAffixDetonateDotFactory extends EZAffixFactory{
	private var affix_:EZAffixDetonateDot = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixDetonateDot();
	}  
	public function get affix():EZAffix{return affix_;};
}
