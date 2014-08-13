#pragma strict


class EZMissionLoadTask extends Task{
	private var data_:JsonData.Mission = null;
	public function get data():JsonData.Mission{
		return this.data_;
	}
	public function set data(value:JsonData.Mission){
		data_ = value;
	}
};