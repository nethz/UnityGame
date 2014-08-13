using UnityEngine;
using System.Collections;
using System.Collections.Generic;

using Pathfinding.Serialization.JsonFx;


namespace JsonData
{ 	
	[JsonOptIn]
	public class UserData{
		
		[JsonMember]
		public string uuid = "";
		
		
		[JsonMember]
		public string hash = "";
		
		[JsonMember]
		public string sugar = "";

		[JsonMember]
		public string weixin = "";
		

		public void print(){
			Debug.Log("uuid;" + uuid);
			Debug.Log("hash;" + hash);
			Debug.Log("sugar;" + sugar);
			Debug.Log("weixin;" + weixin);
		}
		
		public bool check(){
			return !(string.IsNullOrEmpty(uuid) || string.IsNullOrEmpty(hash));
		}
		
		static public JsonData.UserData Load(string json){
//			Debug.LogWarning(json);
			JsonData.UserData data = JsonDataHandler.reader<JsonData.UserData>(json);
			return data;
		}
		static public string Save(JsonData.UserData data){
			string json = JsonDataHandler.write<JsonData.UserData>(data);
			return json;
		}
			
		
			
	}
	[JsonOptIn]
	public class UserDataInfo:DataInfo{
		[JsonMember]
		public UserData user;
		
		
		
		static public JsonData.UserDataInfo Load(string json){
			JsonData.UserDataInfo data = JsonDataHandler.reader<JsonData.UserDataInfo>(json);
			return data;
		}
		static public string Save(JsonData.UserDataInfo data){
			string json = JsonDataHandler.write<JsonData.UserDataInfo>(data);
			return json;
		}
		
	}
	[JsonOptIn]
	public class Check{
	}
	[JsonOptIn]
	public class CheckInfo:DataInfo{
		
		[JsonMember]
		public Check user;
		static public JsonData.CheckInfo Load(string json){
			JsonData.CheckInfo data = JsonDataHandler.reader<JsonData.CheckInfo>(json);
			return data;
		}
		static public string Save(JsonData.CheckInfo data){
			string json = JsonDataHandler.write<JsonData.CheckInfo>(data);
			return json;
		}
	}
	public class UserDataInfoLoader:DataLoader{
		override public DataInfo load(string json){
			UserDataInfo data = UserDataInfo.Load(json);
			return data;
			
		}
	}
	
	
	
	public class CheckInfoLoader:DataLoader{
		override public DataInfo load(string json){
			CheckInfo data = CheckInfo.Load(json);
			return data;
			
		}
	}
}