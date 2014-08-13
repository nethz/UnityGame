#pragma strict

class EZIDFlickerAction extends ActionObj{
	
	class Data{
		var blood:boolean = false;
		var speed:boolean = false;
		var chant:boolean = false;
		var bindType:EZBindData.BindType = EZBindData.BindType.None;
		var magicType:Geek.MagicType = Geek.MagicType.None;
	};
	private var data_:Data = null;
	private var id_:int;
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		id_ = value;
	}
	public function get data():Data{
		return data_;
	}
	
	public function set data(value:Data){
		data_ = value;
	}
	
}