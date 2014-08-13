#pragma strict

class EZNumberPercent extends EZNumber{
	private var value_:float = 0; 
	public function EZNumberPercent(info:JsonData.JsonPack){
		 this.value_ = info.toFloat("value");
	
	}
	public function getValue(context:EZAffixContext):float{ 
		var soul:EZSoul = EZContainerManager.GetSoul(context.to) as EZSoul;
		return this.value_ * soul.health;
	};
}  
 