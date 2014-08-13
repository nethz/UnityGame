using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;

[JsonOptIn]
public class WebLoginData{
	[JsonMember]
	public string uuid;
	[JsonMember]
	public string hash;
	[JsonMember]
	public string sugar;
	[JsonMember]
	public bool succeed = false;
	
	static public WebLoginData load(string json){
		WebLoginData data = JsonDataHandler.reader<WebLoginData>(json);
		return data;
	}
	
}
/*
public class WebLoginDataHandle {
	public WebLoginData data = null;
	public void reader(string json){
		this.data = JsonDataHandler.reader<WebLoginData>(json);
	}

}*/
