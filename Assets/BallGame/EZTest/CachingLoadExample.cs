using System;
using UnityEngine;
using System.Collections;

public class CachingLoadExample : MonoBehaviour {
	public string BundleURL;
	public string AssetName;
	public int version;

	void Awake() {
		//BundleURL = Application.dataPath+"/BallGame/EZTest/AssetBundle/Cube.unity3d";
		StartCoroutine (DownloadAndCache());
	}

	IEnumerator DownloadAndCache (){
		// Wait for the Caching system to be ready
		while (!Caching.ready)
			yield return null;

		// Load the AssetBundle file from Cache if it exists with the same version or download and store it in the cache
		using(WWW www = WWW.LoadFromCacheOrDownload (BundleURL, version)){
			yield return www;
			if (www.error != null)
				throw new Exception("WWW download had an error:" + www.error);
			AssetBundle bundle = www.assetBundle;
			Texture texture = bundle.Load("binjiao", typeof(Texture)) as Texture;
			Debug.Log (texture);
        	// Unload the AssetBundles compressed contents to conserve memory
        	bundle.Unload(false);
		}
	}
}