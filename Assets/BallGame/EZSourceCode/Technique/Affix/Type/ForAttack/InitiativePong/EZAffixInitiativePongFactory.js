#pragma strict
class EZAffixInitiativePongFactory extends EZAffixFactory{
	private var affix_:EZAffixInitiativePong = null; 
	public function Awake(){
		this.affix_ = new EZAffixInitiativePong();
	}
	public function get affix():EZAffix{
	
		return affix_;
		
	};
}
