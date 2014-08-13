#pragma strict


class EZNumberFixed extends EZNumber{
	private var value_:float = 0; 
	
	public function EZNumberFixed(info:JsonData.JsonPack){
		 this.value_ = info.toFloat("value");
	}
	public function getValue(context:EZAffixContext):float{ 
		return this.value_ ;
	};
} 