#pragma strict

class EffectTransform extends MonoBehaviour{
	public var _fromPosition:Vector3 = Vector3.zero;
	public var _toPosition:Vector3 = Vector3.zero;
	public var _positionNum:int = 1;
	public var _positionTime1:float = 0.2f;
	public var _positionMethod1:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _positionTime2:float = 0.2f;
	public var _positionMethod2:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _intervalTime:float = 1f;
	
	private var tp_:GeekTweenPosition = null;
	private var positionNum_:int = 0;
	
	function Awake(){
		this.gameObject.transform.localPosition = _fromPosition;
	}
	
	function Start(){
		InvokeRepeating("startPosition", 1, _intervalTime);
	}
	
	function Update(){
		
	}
	
	private function startPosition(){
		positionNum_ = 0;
		effectPosition1();
	}
	
	private function effectPosition1(){
		if(positionNum_ < _positionNum){
			//if(!tp_ || !tp_.enabled ){
				tp_ = GeekTweenPosition.Begin(this.gameObject,_positionTime1,_toPosition);
				tp_.method = _positionMethod1;
				tp_.eventReceiver = this.gameObject;
				tp_.callWhenFinished = "effectPosition2";
			//}
		}

	}
	
	private function effectPosition2(){
		tp_ = GeekTweenPosition.Begin(this.gameObject,_positionTime2,_fromPosition);
		tp_.method = _positionMethod2;
		tp_.eventReceiver = this.gameObject;
		tp_.callWhenFinished = "effectPosition1";
		positionNum_++;
	}
	
}