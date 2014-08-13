#pragma strict

class EZNatureProperty{
	public var _group:float = 1;
	public var _style:String = "";
	public var _type:Geek.MagicType = Geek.MagicType.None;
	public var _name:String = "Empty";

	public function load(data:JsonData.NatureProperty){
		this._type = Geek.GetMagicType(data.type);
		this._style = data.style;
		this._group = data.group;
		this._name = data.name;
	} 
	public function get group():int{
		return this._group;
	}
	public function get style():String{
		return this._style;
	}
	public function get type():Geek.MagicType{
		return this._type;
	}
	
	public function get title():String{
		return this._name;
	}
	
};