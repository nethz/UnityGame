#pragma strict
import System.Collections.Generic;
class EZUIGhost extends MonoBehaviour{
	public var _time:float = 0.3;
	public var _prototype:GameObject = null;
	private var ghostQueue_ : Queue.<String> = new Queue.<String>();
	public var _nsmes:MagicTypeName[] = null;
	private static var instance_:EZUIGhost = null;
	private var ghosts_:Array = new Array();
	private var waiting_:boolean = false;
	public var _method:GeekTweener.Method = GeekTweener.Method.EaseOut;
	class MagicTypeName{
		public var _metal:String;
		public var _wood:String;
		public var _water:String;
		public var _fire:String;
		public var _earth:String;
	
		public function getName(type:Geek.MagicType):String{
			var name:String = "";
			switch(type){
				case Geek.MagicType.Metal:
					name = _metal;
					break;
				case Geek.MagicType.Wood:
					name = _wood;
					break;
				case Geek.MagicType.Water:
					name = _water;
					break;
				case Geek.MagicType.Fire:
					name = _fire;
					break;
				case Geek.MagicType.Earth:
					name = _earth;
					break;
			}
			return name;
		}
	};
	
	
	
	
	public function addSoul(quality:int, type:Geek.MagicType){
		if(quality <0 ){
			return;
		}
		var name:String = getSoulName(quality, type);
		
		ghostQueue_.Enqueue(name);
		
		///this.waiting_ = true;
		
		//var obj:GameObject = GameObject.Instantiate(_prototype);
		//ghosts_.push(obj);
		
		
	}
	private function getSoulName(quality:int, type:Geek.MagicType):String{
		
		if(quality >= _nsmes.Length){
			return "";
		}
		return _nsmes[quality].getName(type);
	}
	
	public function Awake(){ 
		this.instance_ = this;
		
	}
	
	public function Start(){
		this.waiting_ = true;
		//this.addSoul(0, Geek.MagicType.Wood);
		//this.addSoul(1, Geek.MagicType.Wood);
		//this.addSoul(2, Geek.MagicType.Wood);
		//this.addSoul(3, Geek.MagicType.Wood);
		//this.addSoul(0, Geek.MagicType.Wood);
	
	}
	private function addTask(name:String):Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition[] = null;
		task.init = function(){
			var obj:GameObject = GameObject.Instantiate(_prototype);
			obj.SetActive(true);
			obj.transform.parent = this.transform;
			obj.transform.localScale = _prototype.transform.localScale;
			obj.transform.localPosition = _prototype.transform.localPosition;
			obj.name = name;
			var sprite:UISprite = obj.GetComponent(UISprite) as UISprite;
			sprite.spriteName = name;
			var a:int = 8;
			var n:int = ghosts_.length/a;
			ghosts_.push(obj);
			var begin:int = n*(a);
			tp = new GeekTweenPosition[ghosts_.length-begin];
			obj.transform.localPosition -= Vector3(0,  obj.transform.localScale.y *n, 0);
			
			for(var i = begin; i < ghosts_.length; ++i){
				var go:GameObject = ghosts_[i] as GameObject;
				tp[i-begin] = GeekTweenPosition.Begin(go, _time, go.transform.localPosition - Vector3(go.transform.localScale.x, 0, 0));
				tp[i-begin].method = _method;
			}
			
		
		};
		task.isOver = function(){
			if(tp == null){
				return true;
			}
			var ret = true;
			for(var e:int = 0; e<tp.length; ++e){
				ret = ret && (!tp[e] || !tp[e].enabled);
			}
			return ret; 
		};
		return task;
	
	}
	public function Update(){
		if(waiting_ && ghostQueue_.Count != 0){
		
			waiting_ = false;
			var name:String = ghostQueue_.Dequeue();
			var task:Task = addTask(name);
			
			TaskManager.PushBack(task, function(){
				waiting_ = true;
			});
			TaskManager.Run(task);
				
		}
	}

	public static function GetInstance():EZUIGhost{
		//var myQueue = new Queue.<int>();
		
		return this.instance_;
	}

}