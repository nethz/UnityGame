#pragma strict
class EZLeadPanel extends MonoBehaviour{
	public var balls:Geek.MagicType[] = null;
	public var start:Vector2;
	public var _alpha:float = 0.5f;
	public var _arrow:UISprite[] = null;
	public var _panel:UISprite[] = null;
	public var _popSeat:EZSoul.Seat = EZSoul.Seat.None;
	public var _popText:String = null;
	public var _boardText:String = null;
	
	
	private var arrowTime_:float = 0.0f;
	public function updateArrow(d:float){
		arrowTime_ += d;
		var alpha:float = Mathf.Sin(this.arrowTime_ * 15)/2+0.5;
		setArrowAlpha(alpha);
		
	}
	public function setArrowAlpha(alpha:float){
		for(var i:int = 0; i<_arrow.Length; ++i){
			_arrow[i].color.a  = alpha;
		}
	}
	public function show(time:float):Task{
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
			this.gameObject.SetActive(true);
			Debug.LogWarning("Seat" + _popSeat);
			if(_popSeat != EZSoul.Seat.None){
				Debug.LogWarning("Seat" + _popSeat+ _popText);
				EZPopCtrl.GetInstance().openLead(_popSeat, _popText, -1);
			}
			setAlpha(0.0f);
			tv = GeekTweenValue.Begin(this.gameObject, time, 0.0f, 1.0f, this.gameObject, "setAlpha");
		};
		task.shutdown = function(){
			setAlpha(1.0f);
			
			arrowTime_ = 0.0f;
		};
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false; 
			}
			return true;
		};		
		
		return task;
	}
	public function setAlpha(alpha:float){
		
		setArrowAlpha(alpha);
		for(var j:int = 0; j<_panel.Length; ++j){
			_panel[j].color.a  = alpha * _alpha;
		}
	}
	public function hide(time:float):Task{
		var task:Task = new Task();
		var tv:GeekTweenValue = null;
		task.init = function(){
			setAlpha(1.0f);
			tv = GeekTweenValue.Begin(this.gameObject, time, 1.0f, 0.0f, this.gameObject, "setAlpha");
		};
		
		task.isOver = function():boolean{
			if(tv && tv.enabled){
				return false; 
			}
			return true;
		};		
		
		return task;
	}
	
	public function flash():Task{
		var task:Task = new Task();
		
		return task;
	}
}
