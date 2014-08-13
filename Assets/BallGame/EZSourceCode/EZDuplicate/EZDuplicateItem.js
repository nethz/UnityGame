#pragma strict


class EZDuplicateItem  extends MonoBehaviour{
	public var _name:UILabel;
	public var _info:UILabel;
	public var _collection:UILabel;
	private var data_:EZDuplicateListModel = null;

	public function get data():EZDuplicateListModel{
		return data_;
	}
	public function load(data:EZDuplicateListModel){
		data_ = data;
		_name.text = data._name;
		_info.text = data._info;
		_collection.text =  "副本收集度"+ (data._collection *100) + "%";
	}
}