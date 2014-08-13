#pragma strict

class GameWinMoneyEXP extends MonoBehaviour{
	public var _moneyEXP:UISprite;
	public var _moneyNumber:UILabel;
	public var _expNumber:UILabel;
	public var _money:GameWinNumber;
	public var _exp:GameWinNumber;
	public var _effect:GameWinEffect;
	private var money_:float = 0;
	private var exp_:float = 0;
	public function setup(money:float, exp:float){
		money_ = money;
		exp_ = exp;
	}
	public function setMoneyTask():Task{
		_money.number = money_;
		return _money.effectTask();
	}
	
	
	public function setExpTask():Task{
		_exp.number = exp_;
		return _exp.effectTask();
	}
	

	public function fadeinTask():Task{
		var task:Task = _effect.effectTask();
		TaskManager.PushFront(
			task,
			function(){
				_moneyEXP.enabled = true;
				_expNumber.enabled = true;
				_moneyNumber.enabled = true;
			}
		);
		
		return task;
		
	}
}