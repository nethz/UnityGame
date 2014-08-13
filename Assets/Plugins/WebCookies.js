#pragma strict
import System.Text.RegularExpressions;
class Cookie{
	

};
class WebCookies{
	private var handlers_:Boo.Lang.Hash = new Boo.Lang.Hash();
	private var sessId_:String = "";
	function WebCookies(){
	    handlers_["PHPSESSID"] =  this.setSessId;
	}
	function header(www:WWW){
		for(var field in www.responseHeaders)
	    {
	        var key:String = field.Key.ToUpper();
	    
			//DebugStreamer.Log("Key:"+key+" Val: "+field.Value );
	      	if(key == "SET-COOKIE"){
	      		setCookie(field.Value);
	      	}
	    }
	}
	public function setSessId(val:String){
		this.sessId_ = val;
	}
	public function getSessId(){
		return this.sessId_;
	}
	function setCookie(cookie:String){
		
		var str:String = cookie;
		var element:String[] = Regex.Split(str, "(;)");
	
		for(var i=0; i< element.length; i+=2)
		{
			if(i >= element.length){
				break;
			}
		//	DebugStreamer.Log("element:"+element[i] );
			var kv:String[] = Regex.Split(element[i], "(=)");
			if(kv.Length == 3){
				this.keyValue(kv[0], kv[2]);
			
			}
		}
	}
	function defaultHandler(key:String, val:String){
	
	
	}
	function keyValue(key:String, val:String){
			var func:Function = handlers_[key] as Function;
			
			if(func != null){
				
				func(val);
			}else{
				this.defaultHandler(key, val);
			}
	}

};