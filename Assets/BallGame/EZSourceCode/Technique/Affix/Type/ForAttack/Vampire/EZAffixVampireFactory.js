#pragma strict
class EZAffixVampireFactory extends EZAffixFactory{
	private var affix_:EZAffixVampire = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixVampire();
	}
	public function get affix():EZAffix{return affix_;}
}
