using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;

namespace JsonData
{
	
	
	public abstract class DataInfo{
			
		[JsonMember]
		public bool succeed = false;
		
		[JsonMember]
		public string message = "";
		
		[JsonMember]
		public double epoch = 0;
			
	}
	
	public abstract class DataLoader{
		abstract public DataInfo load(string json);
	}
	
	

}

