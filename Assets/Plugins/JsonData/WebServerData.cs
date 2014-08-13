using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;


public class ServerData {
	[JsonMember]
	public int id;
	[JsonMember]
	public string url;
	[JsonMember]
	public bool register;
	
}
public class WebServerData {

	[JsonMember]
	public ServerData[] data;
	public string getUrl(int id){
		ArrayList list = new ArrayList();
		for(int i = 0; i< data.Length; ++i){
			if(data[i].id == id){
				return data[i].url;
			}
			if(data[i].register){
				list.Add(data[i]);
			}
		}
		
		if(list.Count != 0){
			object o = list[Random.Range (0, list.Count)];
			return ((ServerData)(o)).url;
		}
		return "";
		/*
		for(int i = 0; i< data.Length; ++i){
			if(data[i].r == id){
				return data[i].url;
			}
		}*/
	}
	static public WebServerData load(string json){
		//= JsonDataHandler.reader<WebServerData>(json);
		WebServerData data = JsonDataHandler.reader<WebServerData>(json);
		return data;
	}
}
