#pragma strict
class EZAffixAddFactory extends EZAffixFactory{

	private var affix_:EZAffixAdd = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixAdd();
	}
	public function get affix():EZAffix{return affix_;};
}
