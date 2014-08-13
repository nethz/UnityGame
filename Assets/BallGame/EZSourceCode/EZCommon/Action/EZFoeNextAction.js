#pragma strict

class EZFoeNextAction extends ActionObj{
	
	private var data_:EZStronghold = null;
	public function get data():EZStronghold{
		return data_;
	}
	
	public function setData(data:EZStronghold){
		this.data_ = data;
	}
}