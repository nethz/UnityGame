using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;

[JsonOptIn]
public class WebRegisterData{
	[JsonMember]
	public string uuid;
	[JsonMember]
	public string hash;
	[JsonMember]
	public string sugar;
	
		
	static public WebRegisterData load(string json){
		WebRegisterData data = JsonDataHandler.reader<WebRegisterData>(json);
		return data;
	}
	
	
}
/*
public class WebRegisterDataHandle  {
	public WebRegisterData data = null;
	public void reader(string json){
		this.data = JsonDataHandler.reader<WebRegisterData>(json);
		
	}
}*/