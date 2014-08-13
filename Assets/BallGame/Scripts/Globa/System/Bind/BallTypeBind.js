#pragma strict
class BallTypeBind extends MonoBehaviour{
	private var type_:Geek.MagicType = Geek.MagicType.None;
	public var _sprite:exSprite = null; 
	public var _burst:BallBurstBind = null; 
	public var _flash:BallFlashBind = null; 
	function Start () {
		this.refreshType();
	}
	
	
	public function crack(){
		if(this._sprite == null){
			return;
		}
		switch(this.type_)
		{
			case Geek.MagicType.Wood:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("wood_s"), true);
				break;
			case Geek.MagicType.Fire:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("fire_s"), true);
				break;
			case Geek.MagicType.Earth:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("earth_s"), true);
				break;
			case Geek.MagicType.Metal:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("metal_s"), true);
				break;
			case Geek.MagicType.Crystal:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("crystal_s"), true);
				break;
			case Geek.MagicType.Water:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("water_s"), true);
				break;
			case Geek.MagicType.None:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("none01"), true);
				break;
			default:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("none01"), true);
		}
		if(this._burst != null)
		{
			this._burst.setType(this.type_);
		}
		
		if(this._flash != null)
		{
			this._flash.setType(this.type_);
		}
		
	
	}
	
	private function refreshType()
	{
		if(this._sprite == null){
			return;
		}
		switch(this.type_)
		{	
		
			case Geek.MagicType.Wood:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("wood"), true);
				break;
			case Geek.MagicType.Fire:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("fire"), true);
				break;
			case Geek.MagicType.Earth:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("earth"), true);
				break;
			case Geek.MagicType.Metal:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("metal"), true);
				break;
			case Geek.MagicType.Crystal:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("crystal"), true);
				break;
			case Geek.MagicType.Water:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("water"), true);
				break;
			case Geek.MagicType.None:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("none"), true);
				break;
			default:
				this._sprite.SetSprite(this._sprite.atlas, this._sprite.atlas.GetIndexByName("none"), true);
		}
		if(this._burst != null)
		{
			this._burst.setType(this.type_);
		}
		
		if(this._flash != null)
		{
			this._flash.setType(this.type_);
		}
		
		
	}
	function setType(type:Geek.MagicType){
		this.type_ = type;
		this.refreshType();
	}
	
	function getType(){
		return this.type_;
	}

}
