#pragma strict

class EZMagicTypeColor  extends MonoBehaviour{
	private var type_:Geek.MagicType = Geek.MagicType.None;
	public var _sprite:exSprite = null;
	public var _metal:Color;
	public var _wood:Color;
	public var _water:Color;
	public var _fire:Color;
	public var _earth:Color;
	public var _crystal:Color;
	private var alpha_:float = 1.0f;
	function Start () {
		this.refreshType();
	}
	function set alpha(value:float){
		alpha_ = value;
		this.refreshType();
	}
	
	function setType(type:Geek.MagicType){
		this.type_ = type;
		this.refreshType();
	}
	
	
	function refreshType(){
		if(_sprite == null)
			return;
			
			
		var color:Color = Color.white;
		switch(type_)
		{
			case Geek.MagicType.Wood:
				color = _wood;
				break;
			case Geek.MagicType.Fire:
				color = _fire;
				break;
			case Geek.MagicType.Earth:
				color = _earth;
				break;
			case Geek.MagicType.Metal:
				color = _metal;
				break;
			case Geek.MagicType.Crystal:
				color = _crystal;
				break;
			case Geek.MagicType.Water:
				color = _water;
				break;
		}
		_sprite.color = new Color(color.r, color.g, color.b, color.a * alpha_);//Color.black * (1 -alpha_) +  color*alpha_ ;
	}
	
		
	public function hide(){
		_sprite.enabled = false;
		this.refreshType();
	}
	public function show(){
		
		_sprite.enabled = true;
		//alpha_ = 1.0;
		this.refreshType();
	}
	
}