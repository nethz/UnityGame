#pragma strict
class EZAffixChantFactory extends EZAffixFactory{
	private var affix_:EZAffixChant= null; 
	
	public function Awake(){
		this.affix_ = new EZAffixChant();
	}  
	public function get affix():EZAffix{return affix_;};
}
