using UnityEngine;
using System.Collections;

using Pathfinding.Serialization.JsonFx;
using System.Collections.Generic;



namespace JsonData
{
	[JsonOptIn]
	public class Weixin{
		
		[JsonMember]
		public string id = "";
		
		[JsonMember]
		public string uuid = "";
		
		[JsonMember]
		public string hash = "";
		
		
		static public JsonData.Weixin Load(string json){
			JsonData.Weixin data = JsonDataHandler.reader<JsonData.Weixin>(json);
			return data;
		}
		
		static public string Save(JsonData.Weixin data){
			string json = JsonDataHandler.write<JsonData.Weixin>(data);
			return json;
		}
	}

	
	[JsonOptIn] 
	public class WeixinInfo:DataInfo{
		[JsonMember]
		public Weixin weixin;
	
		
		
		static public JsonData.WeixinInfo Load(string json){
			JsonData.WeixinInfo data = JsonDataHandler.reader<JsonData.WeixinInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.WeixinInfo info){
			string data = JsonDataHandler.write<JsonData.WeixinInfo>(info);
			return data;
		}
	} 
	
	
	public class WeixinInfoLoader:DataLoader{
		override public DataInfo load(string json){
			WeixinInfo data = WeixinInfo.Load(json);
			return data;
			
		}
	}
	
	
	[JsonOptIn] 
	public class BindInfo:DataInfo{
		[JsonMember]
		public Weixin weixin;
		[JsonMember]
		public UserData user;
		
		
		static public JsonData.BindInfo Load(string json){
			JsonData.BindInfo data = JsonDataHandler.reader<JsonData.BindInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.BindInfo info){
			string data = JsonDataHandler.write<JsonData.BindInfo>(info);
			return data;
		}
	} 
	
	
	public class BindInfoLoader:DataLoader{
		override public DataInfo load(string json){
			BindInfo data = BindInfo.Load(json);
			return data;
			
		}
	}
	[JsonOptIn]
	public class Invitation
	{	[JsonMember]
		public string code;
		[JsonMember]
		public string from;
	}
	
	
		
	[JsonOptIn] 
	public class InvitationInfo:DataInfo{
		[JsonMember]
		public Invitation invitation;
		[JsonMember]
		public Player player;
		
		
		static public JsonData.InvitationInfo Load(string json){
			JsonData.InvitationInfo data = JsonDataHandler.reader<JsonData.InvitationInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.InvitationInfo info){
			string data = JsonDataHandler.write<JsonData.InvitationInfo>(info);
			return data;
		}
	} 
	
	
	public class InvitationInfoLoader:DataLoader{
		override public DataInfo load(string json){
			InvitationInfo data = InvitationInfo.Load(json);
			return data;
		}
	}
	
	[JsonOptIn] 
	public class WeixinData{
		[JsonMember]
		public WeixinCrystal crystal = null;
		[JsonMember]
		public Invitation invitation = null;
		
		
		static public JsonData.WeixinData Load(string json){
			JsonData.WeixinData data = JsonDataHandler.reader<JsonData.WeixinData>(json);
			return data;
		}
		
		static public string Save(JsonData.WeixinData info){
			string data = JsonDataHandler.write<JsonData.WeixinData>(info);
			return data;
		}
		
		
	}
}