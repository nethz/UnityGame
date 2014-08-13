
using System;
using System.IO;
using System.Reflection;
using System.Collections.Generic;
using UnityEngine;
public class iOS : MonoBehaviour {
	public class Url{
		public string action = "";
		public Dictionary<string, string> parameter = new Dictionary<string, string>();
		public void print(){
			Debug.Log ("action:" + action);
			
			foreach (KeyValuePair<string, string> item in parameter){
				Debug.Log (item.Key +"=" + item.Value);
			}
		}
	}
	void Awake (){
	}
	void Start () {
	}
	public void handleOpenURL(string no){
		string site = PlayerPrefs.GetString("ios_url");
		Debug.Log("PlayerPrefs > URL" + site);
		Url url = deal(site);
		Debug.Log (url.action);
		if(url.action == "bind"){
			this.gameObject.SendMessage("bind", url.parameter["id"], SendMessageOptions.DontRequireReceiver);
		}else if(url.action == "find"){
			this.gameObject.SendMessage("find", url.parameter["id"], SendMessageOptions.DontRequireReceiver);
		}else if(url.action == "day"){
			this.gameObject.SendMessage("day", SendMessageOptions.DontRequireReceiver);
		}
	}
	
	public void dealCrystal(JsonData.WeixinCrystal crystal){
		this.gameObject.SendMessage("receiveCrystal", crystal, SendMessageOptions.DontRequireReceiver);
	}

	public void receivedMemoryWarning(string message){
		
		Resources.UnloadUnusedAssets();
		System.GC.Collect();
	}

	public void becomeActive(string message){
		this.gameObject.SendMessage("becomeActive", SendMessageOptions.DontRequireReceiver);
	}

	/*
	public void _oc_callback(string message){
		if(message != "0"){
			this.gameObject.SendMessage("weixinFail", message, SendMessageOptions.DontRequireReceiver);
		}
	}*/
	public void dealInvitation(JsonData.Invitation invitation){
		this.gameObject.SendMessage("receiveInvitation", invitation, SendMessageOptions.DontRequireReceiver);
	}
	public void handleWeixin(string no){
		

		string json = PlayerPrefs.GetString("ios_weixin");
		JsonData.WeixinData data = JsonData.WeixinData.Load(json);
		if(data.crystal != null){
			dealCrystal(data.crystal);
		}else if(data.invitation != null){
			dealInvitation(data.invitation);
		}
		Debug.Log("PlayerPrefs > Weixin" + 123);
	}
	
	Url deal(string site){
		Url url = new Url();
		Uri siteUri = new Uri(site);
		url.action = siteUri.Host;
		
		var split = siteUri.Query.Split(new[] { '?', '&' }, StringSplitOptions.RemoveEmptyEntries);
		for(int i=0; i<split.Length; ++i){
			var split2 = split[i].Split(new[] { '=' }, StringSplitOptions.RemoveEmptyEntries);
			if(split2.Length == 2){
				url.parameter[split2[0]] = split2[1];
			}
		}
		url.print ();
		return url;
	}
	
	
}
