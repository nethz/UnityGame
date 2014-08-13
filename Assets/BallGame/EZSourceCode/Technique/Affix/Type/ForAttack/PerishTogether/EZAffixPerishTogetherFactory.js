#pragma strict
class EZAffixPerishTogetherFactory extends EZAffixFactory{
	private var affix_:EZAffixPerishTogether = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixPerishTogether();
	}
	public function get affix():EZAffix{return affix_;};
}
