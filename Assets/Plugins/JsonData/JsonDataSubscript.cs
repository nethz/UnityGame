using UnityEngine;
using System.Collections;
using System.Collections.Generic;

using Pathfinding.Serialization.JsonFx;


namespace JsonData
{ 	

[JsonOptIn]
public class Subscript{
	[JsonMember]
	public Dictionary<string,bool> map = null;
	
	public void init(){
		if(map == null){
			map = new Dictionary<string,bool>();
		}	
	}
	public int getNumber(List<string> list){
		init();
		int number = 0;
		for(int i = 0; i<list.Count; ++i){
			if(map.ContainsKey(list[i])){
				if(!map[list[i]]){
					
					++number;	
				}
			}
		}
		/*
		foreach (KeyValuePair<string, bool> sub in map){
			Debug.LogWarning(sub.Key+"." + sub.Value);
			if(!sub.Value){
				++number;	
			}
		}	*/
		return number;	
	}
	public bool has(string key){
		init();
		return map.ContainsKey(key);
	}
	public void update(string key){
		if(!has(key)){
			map[key] = false;
		}
	}
	public bool isNew(string key){
		init();
		update(key);
		return !map[key];
	}
	public void touch(string key){
		init();
		map[key] = true;
	}
	static public JsonData.Subscript Load(string json){
		JsonData.Subscript data = JsonDataHandler.reader<JsonData.Subscript>(json);
		return data;
	}
	
	static public string Save(JsonData.Subscript data){
		string json = JsonDataHandler.write<JsonData.Subscript>(data);
		return json;
	}
}
	
}