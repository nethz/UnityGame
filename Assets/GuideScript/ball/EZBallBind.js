#pragma strict
class EZBallBind  extends MonoBehaviour{
	private var type_:Geek.MagicType = Geek.MagicType.None;
	private var size:Vector2 = Vector2(0,0);
	private var layer:int = 0;
	private var position:Vector2 = Vector2(0, 0);
	private var ball2:EZBall = null;
	//public var _sprite:exSprite = null; 
	private var rotate_:float = 0;
	public var _spallPrototype:GameObject = null;
	
	public class Sound{
		public var diffuse:EZSound;
		public var splint:EZSound;
		
		//public var loaded:EZSound;
		//public var ignore:EZSound;
	
	};
	public var _sound:EZBallBind.Sound = null;
	function Start () {
		this.transform.rotation =  Quaternion.FromToRotation (new Vector3 (0, 0, 1), Vector3.forward);  
		this.transform.Rotate(Vector3(0,0,this.rotate_));
		this.refreshSize();
		this.refreshPosition();
		var scale:Vector3 = Geek.GetWorldScale(this.transform.parent);
	//	this.transform.localScale = Vector3(1/scale.x * this.transform.localScale.x, 1/scale.y * this.transform.localScale.y, 1/scale.z);
		
	}
	function setRotate(rotate:float){
		this.rotate_ = rotate;
		this.transform.rotation =  Quaternion.FromToRotation (new Vector3 (0, 0, 1), Vector3.forward); 
		this.transform.Rotate(Vector3(0,0,this.rotate_));
	}
	function getRotate(){
		return this.rotate_;
	}
	private function refreshSize(){
		//if(this._sprite == null){
	//		return;
	//	}
	//	this.transform.localScale = new Vector3(this.size.x/this._sprite.width, this.size.y/this._sprite.height, 1);
	}
	function refreshPosition(){
		this.transform.localPosition.x = this.position.x;
		this.transform.localPosition.y = this.position.y;
		this.transform.localPosition.z = -50*(this.layer+1);
		
	}
	
	function getPosition(){
		return this.transform.position;
	}
	
	function setType(type:Geek.MagicType){
		var btb:EZBallTypeBind = this.GetComponent.<EZBallTypeBind>() as EZBallTypeBind;
		btb.setType(type);
	}
	function setSize(size:Vector2){
		this.size = size;
		this.refreshSize();
	
	}  
	function setLayer(layer:int){
		this.layer = layer;
		this.refreshPosition();
	}
	function setViewPosition(position:Vector2){
		this.position = position;
		this.refreshPosition();
	}
	
	
	function setLocking(locking:boolean){
		if(locking){
			this.setAlpha(GameSetup.getInstance().lockingAlpha);
		}else{
			this.setAlpha(1);
		}
	
	}
	
	function setLocked(locking:boolean){
		
		if(locking){
			this.setAlpha(GameSetup.getInstance().lockedAlpha);
		}else{
			this.setAlpha(1);
		}
	
	}
	function setVisible(visible:boolean){
		if(visible){
			this.setAlpha(1);
		}else{
			this.setAlpha(0);
		}
	}
	function setAlpha(alpha:float){	
		var ab:EZAlphaBind = this.GetComponent.<EZAlphaBind>() as EZAlphaBind;
		ab.setAlpha(alpha);
	}
	
	function spallTask(type:Geek.MagicType){
		var spall:EZSpallTask = new EZSpallTask(this._spallPrototype);
		TaskManager.PushFront(spall, function(){
			
			_sound.diffuse.play();
		});
		var begin:Vector3 = this.getPosition();
		begin.z = 200;
		spall.setBegin(begin);
		spall.setType(type);
		
		var angle:float = Mathf.PI *2 * Random.value;
		var r:float = 10 + Random.value*10;
		var a:float = Mathf.Sin(angle) * r;
		var b:float = Mathf.Cos(angle) * r;
		spall.setEnd(begin + Vector3(a, b, 0));
		if(GameSetup.getInstance().spallSpeed != 0)
			spall.setAllTime(0.4/GameSetup.getInstance().spallSpeed);
		else
			spall.setAllTime(0.4);
		return spall;
	}
				
	function spall()
	{
		var bbb:EZBallBurstBind = this.GetComponentInChildren.<EZBallBurstBind>();
		bbb.burst();
		this.setVisible(false);
	}
	
	function crack(){
		
		_sound.splint.play();
		var btb:EZBallTypeBind = this.GetComponent.<EZBallTypeBind>() as EZBallTypeBind;
		btb.crack();
	}
	
	function removeTask()
	{
		var self = this;
		var alphaTime:float = 0;
		var task:Task = new Task();
		
		var allTime:float = GameSetup.getInstance().removeTime + GameSetup.getInstance().spallTime;
		task.isOver = function(){
			return (alphaTime >= allTime);
		};
		task.init = function(){
			alphaTime = 0;
		};
		task.shutdown = function(){
		};
		task.update = function(d:float){
			alphaTime += d;
		};
		
		return task;
	
	}
	
	function setFlash(flash:boolean){
		
		var bfb:EZBallFlashBind = this.GetComponentInChildren.<EZBallFlashBind>();
		bfb.setFlash(flash);
	}
	
}
