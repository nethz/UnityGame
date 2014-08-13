#pragma strict

class DrawPetPar extends MonoBehaviour{
	
	public var _petIdelTime:float = 1f;
	public var _petAttackedTime:float = 0f;
	public var _sealBegin:Vector3 = Vector3.one;
	public var _sealEnd:Vector3 = Vector3.one;
	public var _sealTime:float = 0.1f;
	public var _sealedTime:float = 0.5f;
	public var _sealFromPos:Vector3 = Vector3.zero;
	public var _sealToPos:Vector3 = Vector3.zero;
	public var _sealUpTime:float = 0.3f;
	public var _sealUpMethod:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _shrinkFlyTime:float = 0.5f;
	public var _cardSize:Vector3 = Vector3.one;
	public var _flyPos:Vector3 = Vector3.one;
	public var _sealFlyMethod:GeekTweener.Method = GeekTweener.Method.Linear;
	
	public function get idelTime():float{
		return _petIdelTime;
	}
	
	public function get attackedTime():float{
		return _petAttackedTime;
	}
	
	public function get sealBegin():Vector3{
		return _sealBegin;
	}
	
	public function get sealEnd():Vector3{
		return _sealEnd;
	}
	
	public function get sealTime():float{
		return _sealTime;
	}
	
	public function get sealedTime():float{
		return _sealedTime;
	}
	
	public function get sealFromPos():Vector3{
		return _sealFromPos;
	}
	
	public function get sealToPos():Vector3{
		return _sealToPos;
	}
	
	public function get sealUpTime():float{
		return _sealUpTime;
	}
	
	public function get sealUpMethod():GeekTweener.Method{
		return _sealUpMethod;
	}
	
	public function get shrinkFlyTime():float{
		return _shrinkFlyTime;
	}
	
	public function get cardSize():Vector3{
		return _cardSize;
	}
	
	public function get flyPos():Vector3{
		return _flyPos;
	}
	
	public function get sealFlyMethod():GeekTweener.Method{
		return _sealFlyMethod;
	}

}