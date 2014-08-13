using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;
public class JsonRoomData{
	[JsonMember]
	public string name;
	
	[JsonMember]
	public string level;
	
	public void print(){
		Debug.Log ("room name:" + name + ";" + "level:" + level);
	}
	
}
public class JsonVillageData{
	
	[JsonMember]
	public string name;
	[JsonMember]
	public JsonRoomData[] rooms;

	public void print(){
		Debug.Log ("village name:" + name);
		for(int i=0; i<rooms.Length; ++i){
			rooms[i].print();
		}
	}
}
public class JsonFighterData{
	
	[JsonMember]
	public JsonVillageData[] villages;
	
	public void print(){
		Debug.Log ("fighter:");
		for(int i=0; i<villages.Length; ++i){
			villages[i].print();
		}
	}
}
