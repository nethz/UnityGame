#pragma strict

class EZWindowShow extends MonoBehaviour{
	public var _scaleNode:GameObject = null;
	public var _scaleTime:float = 0.15f;
	public var _scaleMethod:GeekTweener.Method = GeekTweener.Method.spring;
	
	public function shrink(){
		_scaleNode.transform.localScale = new Vector3(0.00000001,0.00000001,0.00000001);
	}
	
	public function show(){
		var ts = GeekTweenScale.Begin(_scaleNode,_scaleTime,Vector3.one);
		ts.method = _scaleMethod;
	}
	
}