using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;




namespace JsonData
{
	[JsonOptIn]
	public class Sky{
		[JsonMember]
		public double time = 0;
		[JsonMember]
		public string weather = "none";
	}
	
	
	
	[JsonOptIn]
	public class Weather{
		
		[JsonMember]
		public Sky[] sky;
		
		[JsonMember]
		public double timestamp;
		
		static public JsonData.Weather Load(string json){
			JsonData.Weather data = JsonDataHandler.reader<JsonData.Weather>(json);
			return data;
		}
		
		static public string Save(JsonData.Weather weather){
			string data = JsonDataHandler.write<JsonData.Weather>(weather);
			return data;
		}
	}
	
	[JsonOptIn]
	public class WeatherInfo:DataInfo{
		
		[JsonMember]
		public Weather weather;
	
		
		static public JsonData.WeatherInfo Load(string json){
			JsonData.WeatherInfo data = JsonDataHandler.reader<JsonData.WeatherInfo>(json);
			return data;
		}
	}
	
	public class WeatherInfoLoader:DataLoader{
		override public DataInfo load(string json){
			WeatherInfo data = WeatherInfo.Load(json);
			return data;
			
		}
	}

	
	
}


