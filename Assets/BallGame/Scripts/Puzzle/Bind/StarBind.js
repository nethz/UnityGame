#pragma strict

class StarBind extends MonoBehaviour{
	
	public var _metal:TrailRenderer = null;
	public var _wood:TrailRenderer = null;
	public var _water:TrailRenderer = null;
	public var _fire:TrailRenderer = null;
	public var _earth:TrailRenderer = null;
	public var _crystal:TrailRenderer = null;
	public var _magicColor:EZMagicTypeColor = null;
	public function Awake(){
		_metal.enabled = false;
		_wood.enabled = false;
		_water.enabled = false;
		_fire.enabled = false;
		_earth.enabled = false;
		_crystal.enabled = false;
	}
	
	function setType(type:Geek.MagicType){
		//var color:ColorBind = GetComponent("ColorBind") as ColorBind; 
		_magicColor.setType(type);
		
		switch(type)
		{
			case Geek.MagicType.Wood:
				_wood.enabled = true;
				break;
			case Geek.MagicType.Fire:
				_fire.enabled = true;
				break;
			case Geek.MagicType.Earth:
				_earth.enabled = true;
				break;
			case Geek.MagicType.Metal:
				_metal.enabled = true;
				break;
			case Geek.MagicType.Crystal:
				_crystal.enabled = true;
				break;
			case Geek.MagicType.Water:
				_water.enabled = true;
				break;
		}
	}
	
}

