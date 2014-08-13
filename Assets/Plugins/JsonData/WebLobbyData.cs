using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;

[JsonOptIn]
public class WebLobbyData{
	[JsonMember]
	public int money;
	[JsonMember]
	public int diamond;
	[JsonMember]
	public int exp;
	[JsonMember]
	public int maxExp;
	[JsonMember]
	public int energy;
	[JsonMember]
	public int maxEnergy;
	[JsonMember]
	public string id;
	[JsonMember]
	public string name;
	[JsonMember]
	public int level;
	[JsonMember]
	public bool succeed = false;
	
	static public WebLobbyData load(string json){
		WebLobbyData data = JsonDataHandler.reader<WebLobbyData>(json);
		return data;
	}
	
}
