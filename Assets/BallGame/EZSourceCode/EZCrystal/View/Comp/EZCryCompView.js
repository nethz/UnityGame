#pragma strict
class EZCryCompView extends MonoBehaviour{
	public var _background:UISprite;
	public var _top:GameObject = null;
	public var _cry:EZCryCompElementView[];
	public var _ball:EZCryCompCenterView;
	public var _box:BoxCollider = null;
	public var _cryTime:float = 0.3;
	public var _ballTimeA:float = 0.3;
	public var _ballTimeB:float = 0.3;
	public var _runSound:EZSound = null;
	public function Awake(){
		
		this.close();
	}
	public function get ball():EZCryCompCenterView{
		return _ball;
	}
	public function runTask():Task{
		var tl:TaskList = new TaskList();
		TaskManager.PushFront(tl, function(){
			_ball.shade.color.a = 1;
			_runSound.play();
		});
		for(var i:int = 0; i<_cry.Length; ++i){
			var task:Task = _cry[i].outTask(_cryTime);
			tl.push(task);
		}
		tl.push(_ball.ballOpen(_ballTimeA));
		var mt:MultiTask = new MultiTask();
		mt.push(ballAlpha());
		mt.push(_ball.ballClose(_ballTimeB));
		
		
		var tl2:TaskList = new TaskList();
		for(var j:int = 0; j<_cry.Length; ++j){
			var task2:Task = _cry[j].inTask(_ballTimeB/_cry.Length);
			tl2.push(task2);
		}
		mt.push(tl2);
		tl.push(mt);
		
		return tl;
	}
	public function open(){
		_background.enabled  = true;
		_top.SetActive(true);
		for(var i:int = 0; i< _cry.Length; ++i){
			_cry[i].open();
		}
		_ball.open();
		_box.enabled = true;
	}
	public function close(){
		_background.enabled  = false;
		_top.SetActive(false);
		for(var i:int = 0; i< _cry.Length; ++i){
			_cry[i].close();
		}
		_ball.close();
		_box.enabled = false;
		
	}
	
	public function ballAlpha():Task{
		var task:Task = new Task();
		var ta:TweenAlpha = null;
		task.init = function(){
			ta = TweenAlpha.Begin(_ball.shade.gameObject, _ballTimeB, 0);
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	public function setup(magicBall:JsonData.MagicBall, crystal:JsonData.Crystal){
		_ball.setGroup(crystal.ball.group);
		_ball.lv = magicBall.setup.getLv(crystal.ball.exp);
		_ball.max = magicBall.setup.getMax(crystal.ball.exp);
		_ball.exp = magicBall.setup.getExp(crystal.ball.exp);
		for(var i:int = 0; i< magicBall.fragsLength(); ++i){
			if(i<_cry.length){
				_cry[i].setup(magicBall.cryFragCount(i));
			}
		}
		
		
	}
	

}