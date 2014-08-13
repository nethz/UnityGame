#pragma strict
import System.Collections.Generic;

class WebInfo{
	
	class Info{
		var name:String;
		var url: String;
	};
	
	enum Server{
		Master,
		Slave,
	}
	public var _url:Info[];
	private var urlMap_:Hashtable = null;
	
	private function init(){
		if(urlMap_ == null){
			urlMap_ = new Hashtable();
			for(var i:int = 0; i< _url.Length; ++i){
				urlMap_[_url[i].name] = _url[i].url;
			}
		}
		
	}
	/*
	public function WebInfo(){
		if(_url != null){
		
		}
		
	}
	*/
	public var _server:String = "http://b001.vipsinaapp.com/server/";
	private var release_:String = "http://ezgame.vipsinaapp.com/server/";
	private var debug_:String = "http://ezgame.vipsinaapp.com/server/";

	
	public function set releaseServer(value:String){
		Debug.LogWarning("release"+ value);
		release_ = value;
	}
	public function set debugServer(value:String){
		Debug.LogWarning("debug"+ value);
		debug_ = value;
	}
	function getUrl(taskName:String, server:WebInfo.Server){
		this.init();
		var page:String = "";
		if(urlMap_.ContainsKey(taskName)){
			page = urlMap_[taskName];
		}else{
			Debug.LogError("no url !" +taskName);
		}
		var url = "";
		switch(server){
		case WebInfo.Server.Master:
			url = _server + page;	
			break;
		
		case WebInfo.Server.Slave:
			
			if(Debug.isDebugBuild){
				url = debug_ + page;
			}else{
				url = release_ + page;
			}
		
		}
		
		return url;
	} 
	
};