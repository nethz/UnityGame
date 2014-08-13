#pragma strict

class BallBurstBind  extends MonoBehaviour{
	public var _animation:exSpriteAnimation = null;
	public var _sprite:exSprite = null;
	private var type_:Geek.MagicType = Geek.MagicType.None;
	function Start () {
		//_animation = GetComponent(exSpriteAnimation) as exSpriteAnimation;
		//_sprite = GetComponent(exSprite) as exSprite;
		this._sprite.enabled = false;
		this.refreshType();
	}
	function burst(){
		_animation.Play("BallBurst");
		this._sprite.enabled = true;
	}
	
	function setColor(r:float, g:float, b:float){
		_sprite.color = Color(r/256 * 1.5, g/256 * 1.5, b/256 * 1.5, 1);
	}
	function setType(type:Geek.MagicType){
		this.type_ = type;
		this.refreshType();
	
	}
	function animationOver(name:String)
	{
		this._sprite.enabled = false;
	}

	
	function refreshType(){
		if(_sprite == null)
			return;
			
		_sprite.color = Geek.GetColor(this.type_, 1, 1.5);
		
	}

}