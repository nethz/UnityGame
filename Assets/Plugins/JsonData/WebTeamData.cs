using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;

[JsonOptIn]
public class WebTeamData{

	[JsonMember]
	public bool succeed = false;
	
	static public WebTeamData load(string json){
		WebTeamData data = JsonDataHandler.reader<WebTeamData>(json);
		return data;
	}
	
}
