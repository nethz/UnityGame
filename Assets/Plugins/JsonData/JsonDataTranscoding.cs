using UnityEngine;
using System.Collections;

using Pathfinding.Serialization.JsonFx;
using System.Collections.Generic;



namespace JsonData
{
	[JsonOptIn]
	public class Transcoding{
		
		[JsonMember]
		public string[] texts = null;

		
		static public JsonData.Transcoding Load(string json){
			JsonData.Transcoding data = JsonDataHandler.reader<JsonData.Transcoding>(json);
			return data;
		}
		
		static public string Save(JsonData.Transcoding data){
			string json = JsonDataHandler.write<JsonData.Transcoding>(data);
			return json;
		}
	}


	[JsonOptIn] 
	public class TranscodingInfo:DataInfo{
		[JsonMember]
		public Transcoding transcoding;
		
		
		
		static public JsonData.TranscodingInfo Load(string json){
			JsonData.TranscodingInfo data = JsonDataHandler.reader<JsonData.TranscodingInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.TranscodingInfo info){
			string data = JsonDataHandler.write<JsonData.TranscodingInfo>(info);
			return data;
		}
	} 
	

	
	public class TranscodingInfoLoader:DataLoader{
		override public DataInfo load(string json){
			TranscodingInfo data = TranscodingInfo.Load(json);
			return data;
			
		}
	}
}