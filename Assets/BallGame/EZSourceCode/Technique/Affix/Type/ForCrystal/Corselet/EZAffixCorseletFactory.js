#pragma strict
class EZAffixCorseletFactory extends EZAffixFactory{
	private var affix_:EZAffixCorselet = null; 
	public function Awake(){
		this.affix_ = new EZAffixCorselet();
	}
	
	
	public function get affix():EZAffix{
		return affix_;
	};
}
