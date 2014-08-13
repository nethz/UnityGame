using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;

public class GeekWeixin{

	/* Interface to native implementation */
	
	
		
	[DllImport ("__Internal")]
	private static extern int _MyTest ();
	
	
	
	[DllImport ("__Internal")]
	private static extern bool _Send2Weixin(string title, string description, string info, string url, string image, bool show);

	
	[DllImport ("__Internal")]
	private static extern bool _GoUrl(string url);

	
	[DllImport ("__Internal")]
	private static extern bool _HasWeixin();

	public static int MyTest()
	{
		// Call plugin only when running on real device
		if (Application.platform != RuntimePlatform.OSXEditor)
			return _MyTest();
		return 432;
	}


	public static bool HasWeixin(){
		if (Application.platform == RuntimePlatform.IPhonePlayer)
			return _HasWeixin();
		return true;
	}

	public static bool Send2Weixin(string title, string description, string info, string url, string image, bool show){
		Debug.Log ("cool" + title);
		if (Application.platform == RuntimePlatform.IPhonePlayer) {
				
			return _Send2Weixin (title, description, info, url, image, show);
			
				
		}
		return true;
		
	} 
	public static bool GoUrl(string url){
		
		Debug.Log ("url" + url);


		if (Application.platform == RuntimePlatform.IPhonePlayer)
			return _GoUrl(url);
		return true;
	}
	
	
	/*
	
	
	public static bool RegisterApp(string appid){
		return _GDWXregisterApp(appid);
	}
	
	public static bool HandleOpenURL(string path){
		return _GDWXhandleOpenURL(path);
	}
	
	
	public static bool IsWXAppInstalled(){
		return _GDWXisWXAppSupportApi();
	}
	
	public static bool IsWXAppSupportApi(){
		return _GDWXisWXAppSupportApi();
	}
	
	public static string GetWXAppSupportMaxApiVersion(){
		return _GDWXgetWXAppSupportMaxApiVersion();
	}
	
	public static string GetApiVersion(){
		return _GDWXgetApiVersion();
	}
	
	public static string GetWXAppInstallUrl(){
		return _GDWXgetWXAppInstallUrl();
	}
	
	public static bool OpenWXApp(){
		return _GDWXopenWXApp();
	}
	
*/

	/*
    
 
   
    
   
    
    const char* _GDWXgetApiVersion(){
        return GDMakeStringCopy([[WXApi getApiVersion] UTF8String]);
    }
    
    const char* _GDWXgetWXAppInstallUrl(){
        return GDMakeStringCopy([[WXApi getWXAppInstallUrl] UTF8String]);
    }
    BOOL _GDWXopenWXApp(){
        return [WXApi openWXApp] ;
    }

	*/
	
}
