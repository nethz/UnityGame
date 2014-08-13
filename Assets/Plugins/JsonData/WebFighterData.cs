using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;

public class WebFighterData  {
	
	[JsonMember]
	public bool succeed = false;
	[JsonMember]
	public JsonFighterData PVE;
	[JsonMember]
	public JsonFighterData PVP;
	[JsonMember]
	public JsonFighterData Temp;
	
	public void print(){
		PVE.print();
		PVP.print();
		Temp.print();
	}
	static public WebFighterData load(string json){
		WebFighterData data = JsonDataHandler.reader<WebFighterData>(json);
		return data;
	}
}
