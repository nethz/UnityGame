#pragma strict

class EZCursor extends MonoBehaviour{
	public var _widget:UIWidget = null;
	private var scale_:Vector3 = Vector3.one;
	public function Awake(){
		scale_ = transform.localScale;
		_widget.alpha = 0;
	}
		
	public function touch(){
		transform.localScale = scale_;
		_widget.alpha = 1;
		TweenAlpha.Begin(this.gameObject, 0.3, 0);
		TweenScale.Begin(this.gameObject, 0.3, scale_ *2);
	}

}