#pragma strict
class WebData{
	private var uuid_:String = null;
	private var hash_:String = null;
	private var sugar_:String = null;
	private var server_:String = null;
	
	public function setup(uuid:String, hash:String, sugar:String, server:String){
		this.uuid_ = uuid;
		this.hash_ = hash;
		this.sugar_ = sugar;
		this.server_ = server;
	}
	public function get uuid():String{
		return uuid_;
	}

	
	
	public function get server():String{
	
		return server_;
	}

	
	
	public function get hash():String{
		return hash_;
	}
	
	
	public function get sugar():String{
		return sugar_;
	}
	
	public function print(){
		Debug.Log("uuid:" + uuid_);
		Debug.Log("hash_:" + hash_);
		Debug.Log("sugar_:" + sugar_);
		Debug.Log("server_:" + server_);
	}
	
};