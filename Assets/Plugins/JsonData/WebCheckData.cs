using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;

[JsonOptIn]
public class WebCheckData{
	[JsonMember]
	public string uuid;
	[JsonMember]
	public string hash;
	[JsonMember]
	public bool succeed = false;
	
	static public WebCheckData load(string json){
		WebCheckData data = JsonDataHandler.reader<WebCheckData>(json);
		return data;
	}
	
}
