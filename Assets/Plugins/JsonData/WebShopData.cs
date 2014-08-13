using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;


using System.Collections.Generic;


namespace JsonData
{

	/*
	[JsonOptIn]
	public class SellBag{
		public int diamond = -1;
		public int money = -1;
	}
	[JsonOptIn]
	public class Shop{
		
		[JsonMember]
		public int version = -1;
		[JsonMember]
		public SellBag sell_bag;
		[JsonMember]
		public string[] diamonds;
		
		
		static public JsonData.Shop Load(string json){
			JsonData.Shop data = JsonDataHandler.reader<JsonData.Shop>(json);
			return data;
		}
		
		static public string Save( JsonData.Shop shop){
			string data = JsonDataHandler.write<JsonData.Shop>(shop);
			return data;
		}
	}
	*/
	[JsonOptIn]
	public class ProductData
	{
		
		[JsonMember]
		public string id;
		[JsonMember]
		public string title;
		[JsonMember]
		public string description;
		[JsonMember]
		public double price;
		[JsonMember]
		public string currency;
		
		public void setup(Product product){
			id = product.ID;
			title = product.Title;
			description = product.Description;
			price = product.Price;
			currency = product.Currency;
		}
		
		
	
	}
	[JsonOptIn]
	public class ProductList
	{
		[JsonMember]
		public JsonData.ProductData[] list;
		[JsonMember]
		public int ver = -1;
			
		static public JsonData.ProductList Load(string json){
			JsonData.ProductList data = JsonDataHandler.reader<JsonData.ProductList>(json);
			return data;
		}
		
		static public string Save(JsonData.ProductList data){
			string json = JsonDataHandler.write<JsonData.ProductList>(data);
			return json;
		}
	
	}
	/*
	[JsonOptIn]
	public class ShopInfo:DataInfo{
		
		[JsonMember]
		public Shop shop;
		
		static public JsonData.ShopInfo Load(string json){
			JsonData.ShopInfo data = JsonDataHandler.reader<JsonData.ShopInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.ShopInfo shop){
			string data = JsonDataHandler.write<JsonData.ShopInfo>(shop);
			return data;
		}
		
		
	}*/
	
	
	//public class ShopInfoLoader:DataLoader{
	//	override public DataInfo load(string json){
	//		ShopInfo data = ShopInfo.Load(json);
	//		return data;
	//	}
	//
	//}
}


