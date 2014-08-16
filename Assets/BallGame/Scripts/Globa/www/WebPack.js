#pragma strict
class WebPack{	
	private var form_:WWWForm = new WWWForm(); 
	private var allString_:String = "";
	private var sugar_:String = "";
	private var uuid_:String = "";
	function WebPack(){
	
	}
	function addBinaryData(key:String, val:byte[]){
		if(val){
		var abc:String = System.Text.Encoding.Default.GetString(val);
			form_.AddBinaryData(key, val);
		}else{
			Debug.LogWarning("no value!");
		}
	}
	function addField(key, list:Array){
		for(var i:int =0; i<list.Count; ++i){
			form_.AddField(key+"[]", list[i].ToString());
		}
	}
	function addField(key:String, val:String){
	
		
		if(!String.IsNullOrEmpty(val)){
			allString_ += val;
			form_.AddField(key, val);
		}else{
			Debug.LogWarning("no value!");
		}
	}	
	
	function setSugar(sugar:String)
	{
		this.sugar_ = sugar;
	}

	function setUser(uuid:String, hash:String){
		this.addField("uuid", uuid);
		uuid_ = uuid;
		this.addField("hash", hash);
	}
	
	function www(url:String):WWW{
		var headers:Hashtable = this.form_.headers;
	//	headers["Accept-Encoding"] = "gzip";
		
		
		headers["Accept-Encoding"] = "gzip";
		

		form_.AddField("md5", Geek.Md5Sum(this.allString_ + this.sugar_));
//		Debug.LogWarning("allString"+ allString_);
		var uuid:String = "";
		if(!String.IsNullOrEmpty(uuid_)){
			uuid = "&uuid=" + uuid_;
		
		}
		var debug:String = "";
		if(Debug.isDebugBuild){
			debug = "&debug=2";
		}
		var tUrl:String =  url + uuid + debug + "&version="+EZUpdateTable.GetInstance().version;
		
		Debug.LogWarning("url !" +tUrl);
		return WWW(tUrl, this.form_.data, headers);
	}

};


