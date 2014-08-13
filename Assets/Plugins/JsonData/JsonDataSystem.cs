using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;
using System.Collections.Generic;



namespace JsonData
{
	
	[JsonOptIn]
	public class SoundSetup{
		[JsonMember]
		public bool sound = true;
		[JsonMember]
		public bool music = true;
		
		
		
		static public JsonData.SoundSetup Load(string json){
			JsonData.SoundSetup data = JsonDataHandler.reader<JsonData.SoundSetup>(json);
			return data;
		}
		
		
		static public string Save(JsonData.SoundSetup sound){
			string data = JsonDataHandler.write<JsonData.SoundSetup>(sound);
			return data;
		}
	}
	
	
	
}