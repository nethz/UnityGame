#pragma strict
class EZAffixState extends EZAffix{
	
	

	public function clone():EZAffix{
		var affix:EZAffixState = new EZAffixState();
	
		return affix;
	}
	protected function execute(context:EZAffixContext){
	}
};