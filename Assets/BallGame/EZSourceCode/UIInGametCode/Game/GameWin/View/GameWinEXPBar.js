#pragma strict

class GameWinEXPBar extends MonoBehaviour{
	public var _bg:UISprite;
	public var _levelUp:UISprite;
	public var _levelUpSound:EZSound = null;
	public var _bar:UISprite;
	public var _effect:GameWinEffect;
	public var _rock:GameWinRock;
	public var _up:GameWinEffect;
	public var begin_exp_:float = 0.0f;
	public var exp_:float = 0.0f;
	public function setup(begin_exp:float, exp:float){
		begin_exp_ = begin_exp;
		exp_ = exp;
	}
	public function fadeinTask():Task{
		var task:Task = _effect.effectTask();
		TaskManager.PushFront(task, function(){
			_bg.enabled = true;
			_bar.enabled = true;
			_bar.color.a = 1;
		});
		return task;
	} 
	public function setRockValue(begin:float, end:float){
		
		_bar.fillAmount = begin;
		_rock.begin = begin;
		_rock.end = end;
	}
	public function rockTask():Task{
		
		var task:Task = _rock.effectTask();
		TaskManager.PushFront(task, function(){
			_bar.color.a = 1;
		});
		return task;
	} 
	public function levelUpTask():Task{
		var task:Task = _up.effectTask(); 
		TaskManager.PushFront(task, function(){
			_levelUp.enabled = true;
			_levelUpSound.play();
		});
		return task;
	}
	public function showLevelUp(enable:boolean){
		_levelUp.enabled = enable;
	}
	
	public function set bar(value:float){
	//	_bar.sliderValue = value;
	}
}

