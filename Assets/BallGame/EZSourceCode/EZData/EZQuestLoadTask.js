#pragma strict


class EZQuestLoadTask extends Task{
	private var data_:JsonData.Quest = null;
	public function get data():JsonData.Quest{
		return this.data_;
	}
	public function set data(value:JsonData.Quest){
		data_ = value;
	}
};