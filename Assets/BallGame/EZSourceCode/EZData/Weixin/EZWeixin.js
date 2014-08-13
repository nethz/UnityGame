#pragma strict
class EZWeixin extends MonoBehaviour{
	enum Result{
		Ok,
		LongTime,
		NoInstall,
		Fail,
	};
	public var _noWeixin:String = "";
	public class SendTask extends Task{
	
		private var title_:String = "";
		private var description_:String = "";
		private var info_:String = "";
		private var url_:String = "";
		private var image_:String = "";
		private var receive_:String = "";
		private var show_:boolean = false;
		public function get result():EZWeixin.Result{
		#if UNITY_IPHONE && !UNITY_EDITOR
			if(this.receive_ == "0"){
				return EZWeixin.Result.Ok;
			}
			if(this.receive_ == ""){
				return EZWeixin.Result.LongTime;
			}
		#endif
			return EZWeixin.Result.Fail;
		}
		public function send(title:String, description:String, info:String, url:String, image:String, show:boolean){
			title_ = title;
			description_ = description;
			info_ = info;
			url_ = url;
			image_ = image;
			show_ = show;
		}
		public function get title():String{
			return this.title_;
		} 
		public function get description():String{
			return this.description_;
		} 
		public function get info():String{
			return this.info_;
		} 
		public function get url():String{
			return this.url_;
		} 
		
		public function get image():String{
			return this.image_;
		} 
		public function get show():boolean{
			return show_;
		}
		public function set receive(value:String){
			this.receive_ = value;
		} 
		public function get receive():String{
			return this.receive_;
		}
	} 
	private var task_:SendTask = null;
	private var curr_:SendTask = null;
	private var locked_:boolean = false;
	static private var instance_:EZWeixin = null;
	
	function Awake(){
		instance_ = this; 
		task_ = new SendTask(); 
		var time:float = 0;
		task_.init = function(){
			curr_ = null;
			locked_ = true;
			send2Weixin(task_.title, task_.description, task_.info, task_.url, task_.image, task_.show);
			time = 0;
		};
		task_.update = function(d:float){
			time += d;
			if(time >= 3){
				locked_ = false;
			}
		};
		task_.isOver = function():boolean{
			if (Application.platform == RuntimePlatform.OSXEditor){
				return true;
			}
			if(locked_){
				return false;
			}
			return true;
		};
		task_.shutdown = function(){
			Debug.Log(task_.receive);
			curr_ = task_;
		};
		
	} 
	public function _oc_callback(message:String){
		task_.receive = message;
		locked_ = false;
		Debug.Log("message" + locked_);
	}
	public function _oc_receive(message:String){
		Debug.Log("message:" + message);
	}
	public function get has():boolean{
		return GeekWeixin.HasWeixin();
	}
	private function send2Weixin(title:String, description:String, info:String, url:String, image:String, show:boolean){
		if(GeekWeixin.HasWeixin()){
			GeekWeixin.Send2Weixin(title, description, info, url, image, show);
		}else{
			TaskManager.Run(noWeixin());
		}
	}
	static public function GetInstance():EZWeixin{
		return instance_;
	}
	
	public function noWeixin():Task{
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(_noWeixin);	
		return warning;
		
	}
	public function sendTask():SendTask{
		return task_;
	}
	function sendMessage(msg:String){
		Debug.Log(msg + GeekWeixin.MyTest());
	}
	


}
