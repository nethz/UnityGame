#pragma strict
class EZAffixSwimFactory extends EZAffixFactory{
	private var affix_:EZAffixSwim = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixSwim();
	}
	public function get affix():EZAffix{return affix_;};
}
