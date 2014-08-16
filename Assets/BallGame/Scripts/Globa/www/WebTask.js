#pragma strict

class WebTask extends Task{

	
	protected var over_:boolean = false;
	public function get over():boolean{
		return over_;
	}
	public function set over(value:boolean){
		this.over_ = value;
	}
	public function callback(){
		Debug.Log("aaaaa");
		this.over_ = true;
	}
	private var error_: Geek.WebError = Geek.WebError.NoError;
	//protected var name_:String = "no.name";
	protected var server_:WebInfo.Server = WebInfo.Server.Slave;
	protected var url_;
	public function WebTask(url:String){
		//this.name_ = name;
		//this.server_ = server;
		url_ = url;
		this.init = function(){
			this.over = false;  
			WebTaskFactories.GetInstance().link(this);
		};
	
		this.isOver = function(){
			return over_;
		};
	}
	
	public function get error():Geek.WebError{
		return error_;
	}

	private var pack_: WebPack = new WebPack();
	public function get pack():WebPack{
		return pack_;
	}
	
	public function setError(err:Geek.WebError, msg:String){
		this.error_ = err;
	}
	public var reset:Function = function(){
		this.error_ = Geek.WebError.NoError;
	};
	
	public function get succeed():boolean{
		return (this.error_ == Geek.WebError.NoError);
	}

	public function www():WWW{
		var www = this.pack.www(url_) as WWW;
		return www;
	}
	public function handle(www:WWW){
	
//			Debug.Log("nononono");
		if(www.error != null) {
			//Debug.Log(name_ +":"+www.error);
			this.setError(Geek.WebError.LinkError, www.error);
			return;
		}
		var text = "";
		if(www.responseHeaders.ContainsKey("CONTENT-ENCODING") && www.responseHeaders["CONTENT-ENCODING"] == "gzip")
		{
			Debug.Log("a zip");
			Debug.Log(www.text);
#if UNITY_STANDALONE_WIN
			Debug.Log("not iphone");
			text = JsonData.GZip.DeCompress(cache.www.bytes);  
#else
			text = www.text;
#endif
		}else{
		
			Debug.Log("no zip");
			text = www.text;
		} 
		
		
		try{
			Debug.Log(url_); 
			/*if(cache.cache){ 
				if(text == '{"cache":true}'){ 
					handleImpl(cache.cache.cache);
				}else{ 
					handleImpl(text); 
					cache.cache.cache = text; 
					var dbCache:DBCache = DBManager.getInstance().getCache();
					dbCache.updateCache(cache.cache);
				}
			} else {*/
				handleImpl(text); 
			//}
			
		}catch(e:System.Exception)
		{ 
			this.setError(Geek.WebError.FormatError, e.ToString());
		}
		
		
	}
	
	
	
	protected function handleImpl(text:String){
		Debug.Log(text);
	}
	
}
