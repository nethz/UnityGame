#pragma strict


class EZMessageLoadTask extends Task{
	private var data_:JsonData.Message = null;
	public function get data():JsonData.Message{
		return this.data_;
	}
	public function set data(value:JsonData.Message){
		data_ = value;
	}
}