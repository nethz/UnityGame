#pragma strict


class EZHeroAI extends MonoBehaviour{
	public enum State{
		Walk,
		Idle,
		Turn,
		None,
	};
	public var _points:Vector3[] = null;
	public class Context{
		public var hero:EZHero = null;
		public var state:EZHeroAI.State = EZHeroAI.State.None;
		public var allTime:float = 0;
		public var gameObject:GameObject = null;
		public var camera:Camera = null;
		public var target:Vector3;
		public var name:EZLobbyName = null;
		public var points:Vector3[] = null;
	};
	private var name_:EZLobbyName = null;
	private var fsm_:FSM = null;
	private var context_:EZHeroAI.Context = null;
	public function setup(name_:EZLobbyName, hero:EZHero, camera:Camera){
		this.context_ = new EZHeroAI.Context();
		this.context_.hero = hero;
		this.context_.gameObject = this.gameObject;
		this.context_.camera = camera;
		this.context_.name = name_;
		this.context_.points = _points;
		
		
		fsm_.addState("idle", new EZHeroAIIdle(context_), "");
		fsm_.addState("walk", new EZHeroAIWalk(context_), "");
		fsm_.addState("thinking", new EZHeroAIThinking(context_), "");
		
		 
		fsm_.init("thinking");
		
		
	}
	public function Awake(){
		fsm_ = new FSM();
	}
	public function Update(){
		fsm_.update(Time.deltaTime);
	}
	public function Start(){
		
		
		
	}
}