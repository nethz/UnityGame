#pragma strict



class EZBindValue extends EZBindString{
	enum Type{
		Percent,
		Value,
	}
	public var _min1:boolean = false;
	public var _type:Type = Type.Value;
	public var _decimalDigits:int = 0;
	public function text(data:EZBindData):String{
		var number:float = data.val;
		Debug.LogWarning(data.name);
		Debug.LogWarning(data.val);
		if(number < 0){
			number = -number;
		}
		if(_min1){
			if(number < 1.0f){
				number = 1.0f;
			}
		
		}
		if(_type == Type.Value){
			return number.ToString("f" + _decimalDigits);
		}else{
			number *= 100.0f;
			return number.ToString("f" + _decimalDigits) + "%";
		}
	}
}