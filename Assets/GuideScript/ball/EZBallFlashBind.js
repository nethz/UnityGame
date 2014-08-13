#pragma strict
class EZBallFlashBind extends MonoBehaviour{


	public var debug_:boolean = false;
	private var type_:Geek.MagicType = Geek.MagicType.Earth;
	private var alpha_:float = 0;
	//public var _sprite:exSprite = null; 
	private var flash_:boolean = false;
	private var time_:float = 0;
	function Start () {
		this.refreshType();
		this.refreshAlpha();
	}
	function setAlpha(alpha:float){
		this.alpha_ = alpha;
		this.refreshAlpha();
		
	}
	function Update () {
		if(this.flash_)
		{
			this.time_ += Time.deltaTime;
			var alpha:float = Mathf.Sin(this.time_ * 15)/2+0.5;
			this.setAlpha(alpha);
		}
	}
	function setFlash(flash:boolean){
		flash_ = flash;
		if(flash_)
		{
			time_ = 0;
		}else{
			this.setAlpha(0);
		
		}
	
	}
	private function refreshAlpha(){
	//	if(this._sprite == null){
	//		return;
	//	}
	//	this._sprite.color.a = this.alpha_;
	
	}
	private function refreshType()
	{/*
		if(this._sprite == null){
			return;
		}
		switch(this.type_)
		{
			case Geek.MagicType.Wood:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("wood_f"), true);
				break;
			case Geek.MagicType.Fire:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("fire_f"), true);
				break;
			case Geek.MagicType.Earth:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("earth_f"), true);
				break;
			case Geek.MagicType.Metal:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("metal_f"), true);
				break;
			case Geek.MagicType.Crystal:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("crystal_f"), true);
				break;
			case Geek.MagicType.Water:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("water_f"), true);
				break;
			case Geek.MagicType.None:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("none"), true);
				break;
			default:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("none"), true);
		}
		
		*/
	}
	
	function setType(type:Geek.MagicType){
		this.type_ = type;
		this.refreshType();
	}
	
	function getType(){
		return this.type_;
	}
}
