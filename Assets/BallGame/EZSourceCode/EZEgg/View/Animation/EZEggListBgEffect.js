#pragma strict

class EZEggListBgEffect extends MonoBehaviour{

	public var _panel:UIPanel = null;
	public var _listBg:UISprite = null;
	public var _outLine:BoxCollider = null;
	public var _top:GameObject = null;
	public var _topOffset:float = 0f;
	public var _bgOldHeight:float = 110f;
	public var _bgOffset:float = 100f;
	public var _oneCardH:float = 250f;
	public var _tenCardH:float = 820f;
	public var _oneTime:float = 0.3f;
	public var _tenTime:float = 0.3f;
	public var _out:EZSound = null;
	public function reSet(){
		setViewport(1f);
		setOutLine(1f);
		setBgHeight(0f);
	}

	public function listBgOneTask():Task{
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		var isOver:boolean = false;
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject,_oneTime,1f, _oneCardH, this.gameObject, "setListBg");
			isOver = true;
			_out.play();
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	}
	
	public function listBgTenTask():Task{
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		var isOver:boolean = false;
		task.init = function(){
			tv = GeekTweenValue.Begin(this.gameObject,_tenTime, _oneCardH, _tenCardH, this.gameObject, "setListBg");
			isOver = true;
			
			_out.play();
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	}
	
	public function setListBg(height:float){
		setViewport(height);
		setOutLine(height);
		setBgHeight(height + _bgOffset);
	}
	
	private function setViewport(height:float){
		if(height <= 0){
			Debug.LogWarning("Panel's clipRange can't smaller than 0");
		}else{
			var oldV4:Vector4 = _panel.clipRange;
			var newY:float = (height - oldV4.w)/2 + oldV4.y;
			var newV4 = new Vector4(oldV4.x,newY,oldV4.z,height);
			_panel.clipRange = newV4;
		}
		
	}
	
	private function setOutLine(height:float){
		if(height <= 0){
			Debug.LogWarning("Box's height can't smaller than 0");
		}else{
			var oldCenter:Vector3 = _outLine.center;
			var oldSize:Vector3 = _outLine.size;
			var newCenterY:float = (height - oldSize.y)/2 + oldCenter.y;
			var newCenter:Vector3 = new Vector3(oldCenter.x,newCenterY,oldCenter.z);
			var newSize:Vector3 = new Vector3(oldSize.x,height,oldSize.z);
			_outLine.center = newCenter;
			_outLine.size = newSize;
		}
	}

	private function setBgHeight(height:float){
		height += _bgOldHeight;
		_listBg.transform.localScale.y = height;
		_top.transform.localPosition.y = height + _topOffset;
	}
	
	public function get bgOldHeight():float{
		return _bgOldHeight;
	}
	
	
}