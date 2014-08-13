#pragma strict
class EZLobbyHero extends MonoBehaviour {
	public var _ai:EZHeroAI = null;
	public var _layout:EZTableLayout;
	public var _name:EZLobbyName = null;
	public var _hero:EZHero = null;
	public var _camera:Camera = null;
	public function rename(name:String){
		_name.setup(name);
	}
	public function setAlpha(alpha:float){
		_hero.body.alpha = alpha;
	}
	public function loadTask(style:String, name:String):Task{
		if(_hero != null){
			return new Task();	
		}
		_hero = EZHeroFactories.GetInstance().create(style, this.transform, "hero");
		var layouting:Task = _hero.layoutingTask(_layout, false, this.gameObject.layer);
		TaskManager.PushBack(
			layouting,
			function(){ 
				_name.setup(name);
				_name.gameObject.transform.parent = _hero.gameObject.transform;
				_name.gameObject.SetActive(true);
				_hero.body.alpha = 0;
				_ai.setup(_name, _hero, _camera);
			}
		);
		return layouting;
		
	}
	
	
	
	
}