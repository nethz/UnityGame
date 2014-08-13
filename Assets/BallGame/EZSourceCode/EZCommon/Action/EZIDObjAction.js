#pragma strict

class EZIDObjAction  extends ActionObj{
	private var id_:int;
	private var obj_:Object;
	
	public function get id():int{
		return this.id_;
	}
	public function set id(value:int){
		this.id_ = value;
	}
	
	public function get obj():Object{
		return this.obj_;
	}
	public function set obj(value:Object){
		this.obj_ = value as Object;
	} 


}