using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;
[JsonOptIn]
public class JsonBoneData {
	[JsonMember]
	public string name;
	[JsonMember]
	public JsonSkeletalObj place;
}
[JsonOptIn]
public class JsonSkeletalSetup {

	[JsonMember]
	public string type;
	
	[JsonMember]
	public int[] bounds;
	
	public JsonBoneData[] parts;
	
	static public JsonSkeletalSetup Load(string json){
		JsonSkeletalSetup data = JsonDataHandler.reader<JsonSkeletalSetup>(json);
		return data;
	}
}
