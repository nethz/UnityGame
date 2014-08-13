#pragma strict
class EZAffixDotFactory extends EZAffixFactory{
	private var affix_:EZAffixDot = null; 
	
	public var _target:EZTarget.Target = EZTarget.Target.Rival;
	public function Awake(){
		this.affix_ = new EZAffixDot();
		
		this.affix_.target = this._target;
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
