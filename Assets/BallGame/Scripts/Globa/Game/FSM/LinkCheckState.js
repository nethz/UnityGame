#pragma strict
/*
class LinkCheckState extends State{
	private var isOver_:boolean = false;
	//private var webTasks_:WebTaskFactories = null;
	private var error_:Geek.WebError;
	private var succeed_:boolean = false;
	function LinkCheckState(){
		//this.webTasks_ = webTasks;
		
	}
	
	
	function start(){
		
		Debug.Log("link check...");
		var self = this;
		this.isOver_ = false;
		var task:WebCheckTask = WebTaskFactories.GetInstance().createTask(new WebCheckTask()) as WebCheckTask;
		WebForGame.GetInstance().data.print();
		task.setup(WebForGame.GetInstance().data);
		var oShutdown = task.shutdown;
		task.shutdown = function(){
			self.error_ = task.error;
			oShutdown();
			self.succeed_ = task.isSucceed();
			DebugStreamer.Log("succeed_:"+self.succeed_);
			self.isOver_ = true;
		};
		TaskManager.Run(task);
	}
	
	
	function over(){
		
	}
	
	function update(d:float){ 
		var self = this;
		if(self.isOver_){
			if(this.error_ != Geek.WebError.NoError){ 
				return "link.fail";
			}else if(this.succeed_ == true){
			
				var webData:WebData = WebForGame.GetInstance().data;
				var login:EZLoginTable = EZLoginTable.GetInstance(); 
				login.fill(webData.server, webData.uuid, webData.hash);
				
				return "lobby.home";
			}else{   
				return "link.fail";
			}
			
		
		}
		
		
		return "";
	}
	
};

*/