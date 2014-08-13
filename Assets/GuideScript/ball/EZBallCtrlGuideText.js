#pragma strict
class EZBallCtrlGuideText extends MonoBehaviour{

	
	public var _begin:String = "";
	public var _fail:String;
	public var _first:String;
	public var _second:String;
	public var _metal:String;
	public var _wood:String;
	public var _water:String;
	public var _fire:String;
	public var _earth:String;
	public var _crystal:String;
	
	public var _over:String;
	
	public var _typer:EZTyper;
	private var next_:boolean = true;
	public function Awake(){
		next_ = true;
	}
	public function set next(value:boolean){
		next_ = value;
	}
	public function get next():boolean{
		return next_;
	}
	
}
