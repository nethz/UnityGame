#pragma strict


class EZCardLoadTask extends Task{
	private var data_:JsonData.Soul = null;
	public function get data():JsonData.Soul{
		return this.data_;
	}
	public function set data(value:JsonData.Soul){
		data_ = value;
	}
};