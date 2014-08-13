#pragma strict

class ColorBind  extends MonoBehaviour{
	private var type_:Geek.MagicType = Geek.MagicType.None;
	public var _sprite:exSprite = null;

	
	function Start () {
		_sprite = this.GetComponent(exSprite) as exSprite;
		this.refreshType();
	}
	
	
	function setType(type:Geek.MagicType){
		this.type_ = type;
		this.refreshType();
	}
	
	
	function refreshType(){
		if(_sprite == null)
			return;
			
			
		var rand:float = (1.2+Random.value*0.7);
		_sprite.color = Geek.GetColor(this.type_, 1, rand);
		
	}

}