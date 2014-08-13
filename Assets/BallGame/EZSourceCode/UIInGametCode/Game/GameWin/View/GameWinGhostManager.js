#pragma strict

class GameWinGhostManager extends MonoBehaviour{
	public var _ghost:GameObject;
	public var _ghosts:GameGhostView[];
	public var _table:GeekTable;
	public var _effect:GameWinSeal;
	private var souls_:JsonData.Soul[];
	public function setup(souls:JsonData.Soul[]){
		souls_ = souls;
	}
	public function get souls():JsonData.Soul[]{
		return souls_;
	}
	

	
	public function get ghosts():GameGhostView[]{
		return _ghosts;
	}
	
	public function create(){
		destoryGhosts(); 
		_ghosts = new GameGhostView[souls_.length];
		for(var i:int = 0; i < souls_.length; ++i){
			_ghosts[i] = createGhost();
			_ghosts[i].gameObject.name = "Ghost"+i;
			_ghosts[i].loadGhost(souls_[i]);
		}
		_table.repositionNow = true;
	}
	
	
	private function createGhost():GameGhostView{
		if(_ghost){
			var obj:GameObject = GameObject.Instantiate(_ghost);
			var ghost:GameGhostView = obj.GetComponent(GameGhostView) as GameGhostView;
			obj.transform.parent = _table.transform;
			obj.transform.localScale = _ghost.transform.localScale;
			obj.transform.localPosition = _ghost.transform.localPosition;
			obj.SetActive(true);
			return ghost;
		}
		
	}
	public function destoryGhosts(){
		if(_ghosts){
			for(var i:int = 0; i< _ghosts.length; ++i){ 
				GameObject.DestroyObject(_ghosts[i].gameObject);
			} 
		}
		_ghosts = null;
	}
	
	public function fadeinTask():Task{
		var task:Task = _effect.effectTask();
		TaskManager.PushFront(
			task,
			function(){
				for(var i:int = 0 ;i < _ghosts.Length; ++ i){
					_ghosts[i].open();
				}
			}
		);
		return task;
	}
	
	
}

