#pragma strict

class EZDuplicateViewBackground extends MonoBehaviour{
	public var _background:UISprite;
	public var _bar:UISprite;
	public function Awake(){
		hide();
	}
	public function hide(){
		TweenAlpha.Begin(_background.gameObject, 0.3f, 0f);
		TweenAlpha.Begin(_bar.gameObject, 0.3f, 0f);
	}
	public function show(){
		TweenAlpha.Begin(_background.gameObject, 0.3f, 1f);
		TweenAlpha.Begin(_bar.gameObject, 0.3f, 1f);
	}
};