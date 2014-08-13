#pragma strict

class ResTest extends MonoBehaviour{
	
	function Start(){ 
		Debug.Log("file://" + Application.dataPath + "/Resources/EZMedia/boy.unity3d");
		var www:WWW = WWW.LoadFromCacheOrDownload ("file:///Users/gdgeek/ez/Assets/Resources/EZMedia/boy.unity3d", 0);
		yield www; 
		//if (www.error != null)
		///		/throw new Exception("WWW download had an error:" + www.error);
		var bundle:AssetBundle = www.assetBundle;		
		var mat:Material = null; 
		mat = new Material(Shader.Find("EZ/Skew")); 
		
		//var texture:Texture2D =  Resources.Load("EZMedia/boy/binjiao", Texture2D) as Texture2D; 
		var request:AssetBundleRequest = bundle.LoadAsync("binjiao", typeof(Texture2D)); 
		
		yield request; 
		var texture:Texture2D = request.asset as Texture2D;
		if(!texture){
			Debug.LogError("type:boy bone:binjiao" );
		}
		mat.SetTexture("_MainTex", texture);
		
		this.gameObject.renderer.material = mat;
		bundle.Unload(false);
		
	}
	
	function Update(){
	
	}	
			
}