#pragma strict

class Timer extends MonoBehaviour{
	private var name_:String;
	private var time_:float = 0;
	private var now_:float = 0;
	private var action_:Function;
	private var setUp_:Function = null;
	private var tearDown_:Function = null;
	public function init(name:String, time:float, action:Function)
	{
		this.name_ = name;
		this.time_ = time;
		this.action_ = action;
	
	}
	public function setUp(setUp:Function){
		this.setUp_ = setUp;
	}
	public function tearDown(tearDown:Function){
	
		this.tearDown_ = tearDown;
	}
	function OnDestroy(){
		if(this.setUp_!= null)
			this.setUp_();
			
		this.action_();
		
		if(this.tearDown_!= null)
			this.tearDown_();
	}

	function Update(){
		now_ += Time.deltaTime;
		if(this.now_ >= time_)
		{
			GameObject.Destroy(this.gameObject);
		}
	
	}
}; 