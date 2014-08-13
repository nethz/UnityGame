#pragma strict
class EZIDBindAction extends ActionObj{

	private var id_:int = 0;
	private var data_:EZBindData;
	private var action_:EZBindData.Action = EZBindData.Action.Create;
	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	public function set data(value:EZBindData){
		this.data_ = value;
	}
	public function get data():EZBindData{
		return this.data_;
	}
	public function set action(value:EZBindData.Action){
		this.action_ = value;
	}
	public function get action():EZBindData.Action{
		return this.action_;
	}
	//public function get action():
	

}