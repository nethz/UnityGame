#pragma strict

class EZAttackEffectAction extends ActionObj{
	private var type_:EZHud.EffectType = EZHud.EffectType.None;
	private var id_:int = 0;
	
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	
	public function get type():EZHud.EffectType{
		return type_;
	}
	
	public function set type(value:EZHud.EffectType){
		type_ = value;
	}
	
}