#pragma strict

class WebLoaderTask extends WebTask{
	public enum Fault{
		Ignore,
		Retry,
		Warning,
		Restart,
		AutoRetry,
		WarningIgnore,
		Exit,
	};
	
	private var fault_:WebLoaderTask.Fault = WebLoaderTask.Fault.AutoRetry;
	private var data_:JsonData.DataInfo = null;
	private var loader_:JsonData.DataLoader = null;
	private var retryIgnore_:int = 0;
	private var time_:double = 0;
	
	public function WebLoaderTask(url:String, loader:JsonData.DataLoader){
	
		super(WebForGame.GetInstance().info.getUrl(url, WebInfo.Server.Slave));
		loader_ = loader;
		retryIgnore_ = 0;
		time_ = EZTimestamp.GetInstance().epoch;
	}
	
	
	public function WebLoaderTask(url:String, loader:JsonData.DataLoader, server:WebInfo.Server){
		super(WebForGame.GetInstance().info.getUrl(url, server));
		loader_ = loader;
		retryIgnore_ = 0;
		time_ = EZTimestamp.GetInstance().epoch;
	}
	
	public function WebLoaderTask(url:String, loader:JsonData.DataLoader, server:WebInfo.Server, fault:WebLoaderTask.Fault){
		super(WebForGame.GetInstance().info.getUrl(url, server));
		loader_ = loader;
		fault_ = fault;
		retryIgnore_ = 0;
		time_ = EZTimestamp.GetInstance().epoch;
	}
	
	public function WebLoaderTask(url:String, loader:JsonData.DataLoader, fault:WebLoaderTask.Fault){
		super(WebForGame.GetInstance().info.getUrl(url,  WebInfo.Server.Slave));
		loader_ = loader;
		fault_ = fault;
		retryIgnore_ = 0;
		time_ = EZTimestamp.GetInstance().epoch;
	}
	
	protected function warning(){
		Debug.LogError("warning");
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = EZDictionary.LookUp("!no_web"); 
		window.ok = EZDictionary.LookUp("!retry"); 
		window.cancel = EZDictionary.LookUp("!ignore"); 
		TaskManager.PushBack(window, function(){
			if(window.okOrCancel){
			}else{
				this.over_ = true;
			}
		});
		TaskManager.Run(window);
	}
	protected function 	error(message:String){
		if(fault_ == Fault.WarningIgnore){
		 	var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
			warning.addText(EZDictionary.LookUp(message));
			TaskManager.PushBack(warning, function(){
				this.over_ = true;
			});
			TaskManager.Run(warning);
		
		}else{
			var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
			window.text = EZDictionary.LookError(message); 
			window.ok = EZDictionary.LookUp("!retry"); 
			window.cancel = EZDictionary.LookUp("!reset"); 
			TaskManager.PushBack(window, function(){
			if(window.okOrCancel){
				WebTaskFactories.GetInstance().relink(this);
			}else{
				EZBroadcast.GetInstance().close();
				EZGlobal.GetInstance().LoadLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Switch));
			}
			
			});
			TaskManager.Run(window);
		
		}
		
			
	}
	protected function retry(){
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		warning.addText(EZDictionary.LookUp("!no_web"));
		TaskManager.PushBack(warning, function(){
			WebTaskFactories.GetInstance().relink(this);
		});
		TaskManager.Run(warning);
		
		
	}
	protected function handleImpl(json:String){
		
		Debug.Log(json);
		data_ = loader_.load(json);
	}
	
	public function callback(){
	
		if(data_ && data_.succeed){
			
			EZTimestamp.GetInstance().synchro(data_.epoch);
			this.over_ = true;
			return;
		} 
		
		if(fault_ == Fault.Ignore){
			this.over_ = true;
			return;
		}
		if(fault_ == Fault.AutoRetry){
			if(retryIgnore_ < 4 && EZTimestamp.GetInstance().epoch - time_ < 20){
				retryIgnore_ ++; 
				WebTaskFactories.GetInstance().relink(this);
			}else{
				retry();
				time_ = EZTimestamp.GetInstance().epoch;
				retryIgnore_ = 0;
			}
			return;
		
		}
		if(data_ == null){
			if(fault_ == Fault.Warning){
				warning();
			}else if(fault_ == Fault.Retry){
				retry();
			}else{
				this.over_ = true;
			}
			return;
		}
		
		if(!data_.succeed){
			error(data_.message);
			
		}
		
	}
	public function get data():JsonData.DataInfo{
		return data_;
	}
	function setup(data:WebData){
		pack.setSugar(data.sugar);
		pack.setUser(data.uuid, data.hash);
	}
	
};