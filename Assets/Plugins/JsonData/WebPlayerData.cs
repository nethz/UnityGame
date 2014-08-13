using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;


using System.Collections.Generic;


namespace JsonData
{
	
	[JsonOptIn]
	public class Player{
		[JsonMember]
		public string avatar;
		[JsonMember]
		public float exp;
		[JsonMember]
		public int lv;
		[JsonMember]
		public float maxAp;
		[JsonMember]
		public float ap;
		[JsonMember]
		public double apTime;
		[JsonMember]
		public float apPerTime;
		[JsonMember]
		public int diamond;
		[JsonMember]
		public string name = "boy";
		[JsonMember]
		public int invitation = 0;

		
		static public JsonData.Player Load(string json){
			
			JsonData.Player data = JsonDataHandler.reader<JsonData.Player>(json);
			return data;
		}
		
		static public string Save( JsonData.Player player){
			string data = JsonDataHandler.write<JsonData.Player>(player);
			return data;
		}
		
	}
	
	[JsonOptIn]
	public class PlayerInfo:DataInfo{
		
		[JsonMember]
		public Player player;
		
		//[JsonMember]
	//	public QuickQuestBag quickQuestBag = null;
		static public JsonData.PlayerInfo Load(string json){
			JsonData.PlayerInfo data = JsonDataHandler.reader<JsonData.PlayerInfo>(json);
			return data;
		}
		
		static public string Save( JsonData.PlayerInfo playerInfo){
			string data = JsonDataHandler.write<JsonData.PlayerInfo>(playerInfo);
			return data;
		}
	}
	
	
	[JsonOptIn]
	public class Ap{
		
		[JsonMember]
		public bool succeed = false;
		[JsonMember]
		public string message = "";
		
		[JsonMember]
		public Player player;
		
		static public JsonData.Ap Load(string json){
			JsonData.Ap data = JsonDataHandler.reader<JsonData.Ap>(json);
			return data;
		}
	}
	
	
	public class PlayerInfoLoader:DataLoader{
		override public DataInfo load(string json){
			PlayerInfo data = PlayerInfo.Load(json);
			return data;
		}
	
	}
		
	
}

