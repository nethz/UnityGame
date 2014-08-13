#pragma strict
class EZGuideHero extends MonoBehaviour {
	//private var ai_:EZHeroAI = null;
	public var _layout:EZTableLayout;
	//public var _name:EZLobbyName = null;
	public function loadTask(style:String):Task{
		var hero:EZHero = EZHeroFactories.GetInstance().create(style, this.transform, "hero");
		var layouting:Task = hero.layoutingTask(_layout, false, this.gameObject.layer);
		
		return layouting;
		
	}
	
	
	
	
}