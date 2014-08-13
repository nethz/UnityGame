#pragma strict

class EZNumberXPower extends EZNumber{
	private var value_:float = 0; 

	public function EZNumberXPower(info:JsonData.JsonPack){
		 this.value_ = info.toFloat("value");
	
	}
	public function getValue(context:EZAffixContext):float{ 
		return (this.value_ * context.power);
	
	};
}
