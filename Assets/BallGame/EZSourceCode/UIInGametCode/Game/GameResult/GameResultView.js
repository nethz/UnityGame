#pragma strict

//public var _effect:GameWinSeal;
class GameResultView extends GameBaseView{
	public var _gameResult:UISprite = null;
	public var _scaleTime:float = 0.3f;
	public var _scaleSize:float = 0.9f;
	public var _scaleMethod:GeekTweener.Method;	
	
	private var ts_:GeekTweenScale = null; 
	
	private var GOScal_:Vector3;

	public function Awake(){
		this.close();
	}
	public function seal(){
		if(_gameResult){
			GOScal_ = _gameResult.gameObject.transform.localScale;
			ts_ = GeekTweenScale.Begin(_gameResult.gameObject, _scaleTime, GOScal_*_scaleSize);
			ts_.method = _scaleMethod;
		}
	}
	public function sealTask():Task{
		var task:Task = new Task();
		task.init = function(){
			this.seal();
		};
		
		task.isOver = function():boolean{
			if(ts_){
				if(!ts_.enabled){
					return true;
				}
				return false;
			}
			return true;
		};
		
		return task;
	}
}