using UnityEngine;
using System.Collections;


using Pathfinding.Serialization.JsonFx;
namespace JsonData
{ 	
	[JsonOptIn]
	public class Guide{
		
		//[JsonMember]
		//public bool notFirst = false;
		
		[JsonMember]
		public bool comp = false;
		
		[JsonMember]
		public bool magic = false;
		
		[JsonMember]
		public bool swap = false;
		
		[JsonMember]
		public bool quest = false;

		[JsonMember]
		public bool questMessage = false;
		
		[JsonMember]
		public bool canTeam = false;
		
		[JsonMember]
		public bool canSell = false;
		
		[JsonMember]
		public bool canEgg = false;
		
		[JsonMember]
		public bool canShop = false;
		
		[JsonMember]
		public bool twoTeam = false;
		
		[JsonMember]
		public bool thirdTeam = false;
		
		
		[JsonMember]
		public bool canCrystal = false;
		
		static public JsonData.Guide Load(string json){
			JsonData.Guide data = JsonDataHandler.reader<JsonData.Guide>(json);
			return data;
		}
				
		static public string Save(JsonData.Guide data){
			string json = JsonDataHandler.write<JsonData.Guide>(data);
			return json;
		}
	};
	/*
	[JsonOptIn]
	public class Guide{
		
		
		static public JsonData.Guide Load(string json){
			JsonData.Guide data = JsonDataHandler.reader<JsonData.Guide>(json);
			return data;
		}
		
		static public string Save(JsonData.Guide data){
			string json = JsonDataHandler.write<JsonData.Guide>(data);
			return json;
		}
	};
	
	[JsonOptIn]
	public class GuideInfo:DataInfo{
		
		
		[JsonMember]
		public Guide guide = null;
		
		static public JsonData.GuideInfo Load(string json){
			JsonData.GuideInfo data = JsonDataHandler.reader<JsonData.GuideInfo>(json);
			return data;
		}
			
				
		static public string Save(JsonData.GuideInfo data){
			string json = JsonDataHandler.write<JsonData.GuideInfo>(data);
			return json;
		}
		
	}
	
	
	public class GuideInfoLoader:DataLoader{
		override public DataInfo load(string json){
			GuideInfo data = GuideInfo.Load(json);
			return data;
		}
		
	}*/
}