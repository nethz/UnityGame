#pragma strict

class EZIDSetBindDataAction extends ActionObj{
	
	private var data_:EZBindData;
	private var id_:int;
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		id_ = value;
	}
	public function get data():EZBindData{
		return data_;
	}
	
	public function set data(value:EZBindData){
		data_ = value;
	}
}