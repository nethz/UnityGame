#pragma strict

class EZBaseProperty{
	
	public var _maxHealth :float = 100;
	public var _speed:float = 100;
	public var _attack:float = 1;
	public var _lv:int = 1;
	public var _quality:Geek.Quality = Geek.Quality.Gold;
	
	

	public function get lv():int{
		return _lv;
	}
	public function get quality():int{
		return _quality;
	}
	public function load(data:JsonData.BaseProperty){
		this._maxHealth = data.maxHealth;
		this._speed = data.speed;
		this._attack = data.attack;
		this._lv = data.lv;
		//this._type = Geek.GetMagicType(data.type);
		//this._style = data.style;
		this._quality = data.quality;
	} 
	//public function get style():String{
	//	return this._style;
	//}
	//public function get type():Geek.MagicType{
	//	return this._type;
	//}
	
	public function get maxHealth():float{
		return this._maxHealth;
	}
	public function get attack():float{
		return this._attack;
	}
	public function get speed(){
		return _speed;
	}
	public function set speed(value:int){
		_speed = value;
	}
	
	
};