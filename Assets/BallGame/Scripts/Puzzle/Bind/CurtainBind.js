#pragma strict

class CurtainBind extends MonoBehaviour
{

	private var time_:float = 0;
	private var ex_:exSprite = null;
	private var state_:int = 0;
	public var _alpha:float = 0.8f;
	public function Awake(){
		ActionManager.registerFunction("puzzle.curtain.show", this.show);
		ActionManager.registerFunction("puzzle.curtain.hide", this.hide);
	}
	public function OnDestroy(){
		ActionManager.unregisterFunction("puzzle.curtain.show");
		ActionManager.unregisterFunction("puzzle.curtain.hide");
	}
	function Start () {
			
		this.ex_ = GetComponent("exSprite") as exSprite;
		var sizeSP:Vector2 = Geek.Screen2Space(AutoSize.getInstance().getInSize(), PuzzleCamera.instance().orthographicSize);
		this.ex_.color.a = _alpha;
	}
	
	function show(){
		this.state_ = 1;
	}
	function hide(){
		this.state_ = 2;
	}
	function Update () {
		var d:float = Time.deltaTime;
		var r:float = 0;
		if(this.state_ == 1 && this.ex_.color.a<_alpha){
			
			r = GameSetup.getInstance().closeTime/0.5;
			if(r != 0)
			{
				this.ex_.color.a += d/ r;
				if(this.ex_.color.a > _alpha){
					this.state_ = 0;
					this.ex_.color.a = _alpha;
				}
			}else
			{
				this.state_ = 0;
				this.ex_.color.a = _alpha;
			}
			
		
		}else if(this.state_ == 2 && this.ex_.color.a > 0){
		
			r = GameSetup.getInstance().openTime/0.5;
			if(r != 0)
			{
				this.ex_.color.a -= d/ r;
				if(this.ex_.color.a < 0){
					this.state_ = 0;
					this.ex_.color.a = 0;
			
			}
			}else
			{
				
				this.state_ = 0;
				this.ex_.color.a = 0;
			}
	
		
		}
		
	}
}