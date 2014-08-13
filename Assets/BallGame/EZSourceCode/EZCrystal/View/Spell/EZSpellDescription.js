#pragma strict

class EZSpellDescription extends MonoBehaviour{
	class Mp{
	
		public var _begin:String = "";
		public var _end:String = "";
		public var _mp:float[] = null;
		public function getMp(n:int):String{
			if(_mp == null || n >= _mp.Length){
				return "";
			}
			return _mp[n].ToString();
		}
		
		public function getText(n:int):String{
			return _begin + getMp(n) + _end;
		}
		
	};
	class Description{
		public var _begin:String = "";
		public var _min:String = "";
		public var _end:String = "";
		public var _number:float[] = null;
		//public var _number2:float[] = null;
		public var _max:String = "max";
		public function getNumber(n:int):String{
			if(_number == null || n >= _number.Length){
				return "";
			}
			return _number[n].ToString();
		}
		
		
		/*
		public function getNumber2(n:int):String{
			if(_number2 == null || n >= _number2.Length){
				return "";
			}
			Debug.Log("n" + n);
			Debug.Log("_number2" + _number2.Length);
			return _number2[n].ToString();
		}
		*/
		public function getText(n:int):String{
			if(_number == null || n >= _number.Length){
				return _max;
			}
			return _begin + getNumber(n) + _min/* + getNumber2(n)*/ + _end;
		}
	}
	private var isOpen_:boolean = false;
	private var id_:int = -1;
	private var lv_:int = -1;
	public var _mp:Mp = null;
	public var _info:Description[];
	public var _nextInfo:Description[];
	public var _description:UILabel = null;
	public var _mpText:UILabel = null;
	public var _nextText:UILabel = null;
	private function refresh(){
		if(isOpen_){
			if(id_>=0 &&  id_ <_info.Length){
				var info:String = _info[id_].getText(lv_);
				_description.text = info; 
				_mpText.text = _mp.getText(id_);
				_nextText.text = _nextInfo[id_].getText(lv_);
			}
			_description.enabled = true;
			_mpText.enabled = true;
			_nextText.enabled = true;
		}else{
			_description.enabled = false;
			_mpText.enabled = false;
			_nextText.enabled = false;
		}
	}
	public function set id(value:int){
		this.id_ = value;
		this.refresh();
	}
	public function set lv(value:int){
		this.lv_ = value;
		this.refresh();
	}

	public function open(){
		isOpen_ = true;
		this.refresh();
		
		
	}
	public function close(){
		isOpen_ = false;
		this.refresh();
	}

}