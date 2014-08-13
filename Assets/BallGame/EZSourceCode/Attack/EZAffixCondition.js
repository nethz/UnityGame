#pragma strict
class EZAffixCondition{ 
	public function isTrue(context:EZAffixContext):boolean{return true;};
	public function clone():EZAffixCondition{return new EZAffixCondition();};
};