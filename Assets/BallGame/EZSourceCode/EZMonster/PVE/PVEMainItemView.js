#pragma strict

class PVEMainItemView extends MissionItemView{
	public var _info:UILabel = null;
	//public var _mark:UISprite = null;
	public var _progress:UILabel = null;
	public var _progressText:UILabel = null;
	public var _progressEmpty:Color;
	public var _progressFull:Color;
	
	public var _bg:UISprite = null;
	public var _title:UILabel = null;
	public var _collectText:String = "";
	
	public var _metalBgName = "";
	public var _woodBgName = "";
	public var _waterBgName = "";
	public var _fireBgName = "";
	public var _earthBgName = "";
	public var _box:BoxCollider;
	public var _new:EZTeamSub = null;
	
	private var isOpen_:boolean = false;
	
	private var data_:EZMissionMenuData = null;
	public function get data():EZMissionMenuData{
		return data_;
	
	}
	public function refresh(){
		if(isOpen_){
			if(data_){
				_title.text = Geek.Limit(data_.title, 6, false);
			
				_info.text = Geek.Limit('    '+data_.info, 30, true);
				
	
				if(data_.collect == 1){
					_progress.color = _progressFull;
				}else{
					_progress.color = _progressEmpty;
				}
				var progress:int = (data_.collect * 100.0f);
				_progress.text = _collectText + progress.ToString() + "%";
				switch(Geek.GetMagicType(data_.scene)){
					case Geek.MagicType.Metal:
						_bg.spriteName = _metalBgName;
						break;
					case Geek.MagicType.Wood:
						_bg.spriteName = _woodBgName;
						break;
					case Geek.MagicType.Water:
						_bg.spriteName = _waterBgName;
						break;
					case Geek.MagicType.Fire:
						_bg.spriteName = _fireBgName;
						break;
					case Geek.MagicType.Earth:
						_bg.spriteName = _earthBgName;
						break;
					
				}
				
				
			}
			
			_new.open();
			_info.enabled = true;
			_progress.enabled = true;
			_bg.enabled = true;
			_title.enabled = true;
			_box.enabled = true;
			_progressText.enabled = true;
			
		}else{
			_new.close();
			_info.enabled = false;
			_progress.enabled = false;
			_progressText.enabled = false;
			_bg.enabled = false;
			_title.enabled = false;
			_box.enabled = false;
		}
	}
	public function open(){
		isOpen_ = true;
		this.refresh();
	}
	
	public function close(){
		isOpen_ = false;
		this.refresh();
	}
	
	public function set info(value:String){
		_info.text = value;
	}
	
	public function set progress(value:String){
		_progress.text = value;
	}
	public function setup(subscript:EZSubscript, data:EZMissionMenuData){
		data_ = data;
		_new.load(subscript, data.list);
		this.refresh();
	}
	/*public function set mark(value:boolean){
		if(value){
			_mark.spriteName = "Clear";
		}else{
			_mark.spriteName = "New";
		}
	}*/
	
}