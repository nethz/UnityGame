using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;

[JsonOptIn]
public class WebSellData{

	
	[JsonMember]
	public bool succeed = false;
	
	[JsonMember]
	public JsonData.Bag bag;
	
	static public WebSellData Load(string json){
		WebSellData data = JsonDataHandler.reader<WebSellData>(json);
		return data;
	}
	
}
