#pragma strict
class EZAffixStateFactory extends EZAffixFactory{
	public var _affix:EZAffixState; 
	public function get affix():EZAffix{return _affix;};
}
