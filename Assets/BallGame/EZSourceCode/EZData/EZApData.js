#pragma strict

class EZApData{
	static function GetAp(apOld:float, apTime:double, apMax:float, apPerTime:float):float{
		var epoch:double = EZTimestamp.GetInstance().epoch;
		var ap:float = apOld + (epoch - apTime) * apPerTime;
		if(ap > apMax){
			ap = apMax;
		}
		return Mathf.Floor(ap);
	}
	
}