#pragma strict


class EZLevelDocLoadTask extends Task{
	private var data_:JsonData.LevelDoc = null;
	public function get data():JsonData.LevelDoc{
		return this.data_;
	}
	public function set data(value:JsonData.LevelDoc){
		data_ = value;
	}
};