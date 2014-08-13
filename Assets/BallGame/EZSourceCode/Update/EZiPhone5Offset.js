#pragma strict
class EZiPhone5Offset extends EZScreen{
	public var _offset:Vector3 = Vector3.zero;
	public var _scale:Vector3 = Vector3.one;
	private var offset_:Vector3 = Vector3.zero;
	private var scale_:Vector3 = Vector3.one;
	
	public function Awake(){
		super.Awake();
		if(this.iPhone5){
			this.gameObject.transform.localPosition += _offset;
			this.gameObject.transform.localScale = new Vector3(this.gameObject.transform.localScale.x * _scale.x,this.gameObject.transform.localScale.y * _scale.y,this.gameObject.transform.localScale.z * _scale.z);
			offset_ = _offset;
		}
	}
	
	public function get offset():Vector3{
		return offset_;
	}
}