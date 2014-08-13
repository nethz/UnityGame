#pragma strict
class EZAffixBuffFactory extends EZAffixFactory{
	private var affix_:EZAffixBuff = null; 
	public var _target:EZTarget.Target = EZTarget.Target.Rival;
	public function Awake(){
		this.affix_ = new EZAffixBuff();
		this.affix_.target = this._target;
	}
	public function get affix():EZAffix{
		return affix_;
	};
}
