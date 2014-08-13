using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;
using System.Collections.Generic;


namespace JsonData
{
	[JsonOptIn]
	public class Update{
		[JsonMember]
		public string title = "title";
		[JsonMember]
		public string button = "ok";
		[JsonMember]
		public bool enabled = true;
		[JsonMember]
		public string web = "";
		[JsonMember]
		public string message = "";
		[JsonMember]
		public string url = "";

	}


	[JsonOptIn]
	public class UpdateInfo:DataInfo{
		
		
		[JsonMember]
		public Update update = null;
		[JsonMember]
		public Setup setup = null;
	//	[JsonMember]
		//public Shop shop = null;
		
		static public JsonData.UpdateInfo Load(string json){
			JsonData.UpdateInfo data = JsonDataHandler.reader<JsonData.UpdateInfo>(json);
			return data;
		}
		
	}
	
	
	public class UpdateInfoLoader:DataLoader{
		override public DataInfo load(string json){
			UpdateInfo data = UpdateInfo.Load(json);
			return data;
		}
	}


}