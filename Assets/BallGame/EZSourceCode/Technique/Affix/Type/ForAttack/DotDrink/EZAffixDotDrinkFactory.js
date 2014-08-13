#pragma strict
class EZAffixDotDrinkFactory extends EZAffixFactory{
	private var affix_:EZAffixDotDrink = null; 
	
	public function Awake(){
		this.affix_ = new EZAffixDotDrink();
	}
	public function get affix():EZAffix{return affix_;};
}
