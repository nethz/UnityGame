
#import "GdWx.h"
#import "WXApi.h"
#define BUFFER_SIZE 1024 * 100
@implementation GdWx



NSString* GDCreateNSString (const char* string)
{
	if (string)
		return [NSString stringWithUTF8String: string];
	else
		return [NSString stringWithUTF8String: ""];
}


char* GDMakeStringCopy (const char* string)
{
	if (string == NULL)
		return NULL;
	
	char* res = (char*)malloc(strlen(string) + 1);
	strcpy(res, string);
    
    return res;
}
- (void)print {
    NSLog(@"!!function _ print");
}
- (BOOL)registerApp {
    NSLog(@"!!function _ registerApp");
    return [WXApi registerApp:@"wxb4fc024236518c12"];
}
- (BOOL)hasWeixin {
    
    return ([WXApi isWXAppInstalled]&&[WXApi isWXAppSupportApi]);
}

- (BOOL)handleOpenURL:(NSURL *)url
{
   
    if(!url){
        [[NSUserDefaults standardUserDefaults] setObject:@"" forKey:@"ios_url"];
        [[NSUserDefaults standardUserDefaults] synchronize];
        return NO;
    }
    if([[url scheme] isEqual: @"gdgeek"]){
        
        NSString *urlString = [url absoluteString];
                
        [[NSUserDefaults standardUserDefaults] setObject:urlString forKey:@"ios_url"];
        [[NSUserDefaults standardUserDefaults] synchronize];

        UnitySendMessage("Debug", "Log", "handleOpenURL");
        UnitySendMessage("iOS", "handleOpenURL", "");
    }
  
   
   return  [WXApi handleOpenURL:url delegate:self];
}


- (void) viewContent:(WXMediaMessage *) msg
{
    
  
    NSLog(@"!!function _ viewContent");
    //显示微信传过来的内容
    WXAppExtendObject *obj = msg.mediaObject;
    
    [[NSUserDefaults standardUserDefaults] setObject:obj.extInfo forKey:@"ios_weixin"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    

    UnitySendMessage("iOS", "handleWeixin", "");
   

}


-(void) onShowMediaMessage:(WXMediaMessage *) message
{
    
    // 微信启动， 有消息内容。
    [self viewContent:message];
}

-(void) onRequestAppMessage
{
    WXMediaMessage *message = [WXMediaMessage message];
    message.title = @"这是App消息";
    message.description = @"你看不懂啊， 看不懂啊， 看不懂！";
    [message setThumbImage:[UIImage imageNamed:@"res2.jpg"]];
    
    WXAppExtendObject *ext = [WXAppExtendObject object];
    ext.extInfo = @"<xml>test</xml>";
    ext.url = @"http://www.qq.com";
    
    Byte* pBuffer = (Byte *)malloc(BUFFER_SIZE);
    memset(pBuffer, 0, BUFFER_SIZE);
    NSData* data = [NSData dataWithBytes:pBuffer length:BUFFER_SIZE];
    free(pBuffer);
    
    ext.fileData = data;
    
    message.mediaObject = ext;
    
    SendMessageToWXReq* req = [[[SendMessageToWXReq alloc] init]autorelease];
    req.bText = NO;
    req.message = message;
    req.scene = WXSceneSession;
    
    [WXApi sendReq:req];
    
}

- (void) onReq:(BaseReq*)req{
    

    if([req isKindOfClass:[GetMessageFromWXReq class]])
    {
        [self onRequestAppMessage];
    }
    else if([req isKindOfClass:[ShowMessageFromWXReq class]])
    {
        ShowMessageFromWXReq* temp = (ShowMessageFromWXReq*)req;
        [self onShowMediaMessage:temp.message];
        

    }
}

-(void) onResp:(BaseResp*)resp
{
    
    if([resp isKindOfClass:[SendMessageToWXResp class]])
    {
        //NSString *strTitle = [NSString stringWithFormat:@"发送结果"];
        NSString *strMsg = [NSString stringWithFormat:@"%d", resp.errCode];
        UnitySendMessage("iOS", "_oc_callback", [strMsg UTF8String]);
       // UIAlertView *alert = [[UIAlertView alloc] initWithTitle:strTitle message:strMsg delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
       // [alert show];
       // [alert release];
    }

}
- (void) sendAppContent:(const char*) title description:(const char*) description info:(const char*)info url:(const char*) url image:(const char*) image show:(bool) show
{
    // 发送内容给微信
    WXMediaMessage *message = [WXMediaMessage message];
    message.title = GDCreateNSString(title);
    message.description = GDCreateNSString(description);
    [message setThumbImage:[UIImage imageNamed:GDCreateNSString(image)]];
    
    WXAppExtendObject *ext = [WXAppExtendObject object];
    ext.extInfo = GDCreateNSString(info);
    ext.url = GDCreateNSString(url);
    
    Byte* pBuffer = (Byte *)malloc(BUFFER_SIZE);
    memset(pBuffer, 0, BUFFER_SIZE);
    NSData* data = [NSData dataWithBytes:pBuffer length:BUFFER_SIZE];
    free(pBuffer);
    
    ext.fileData = data;
    
    message.mediaObject = ext;
    
    SendMessageToWXReq* req = [[[SendMessageToWXReq alloc] init]autorelease];
    req.bText = NO;
    req.message = message;
    if(show){
        req.scene = WXSceneTimeline;
    }else{
        req.scene = WXSceneSession;
    }
    
    [WXApi sendReq:req];
}


+ (GdWx *)instance {
    static GdWx *instance;
    
    @synchronized(self){
        if(!instance){
            instance = [[GdWx alloc] init];
        }
    }
    return instance;

    
}
@end





// When native code plugin is implemented in .mm / .cpp file, then functions
// should be surrounded with extern "C" block to conform C function naming rules
extern "C" {
 
    int _MyTest ()
    {
        [[GdWx instance] sendAppContent:"title"  description:"description" info:"info" url:"url" image:"image" show:false];
        return 911;

    }
    BOOL _GoUrl(const char* url){
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString: GDCreateNSString(url)]];
        return true;
    }
    
  
    BOOL _HasWeixin(){
        return [[GdWx instance] hasWeixin];
    }
  
    
    BOOL _Send2Weixin(const char* title, const char* description, const char* info, const char* url, const char* image, bool show){
    
        [[GdWx instance] sendAppContent:title description:description info:info url:url image:image show:show];
        return true;
    }
    
     /*
    BOOL _GDWXregisterApp(const char* appid){
    
        return [WXApi registerApp:GDCreateNSString(appid)];
    }
    
    BOOL _GDWXhandleOpenURL(const char* path){
        NSURL* url =  [NSURL fileURLWithPath:GDCreateNSString(path)];
        url = url;
        //return handleOpenURL
        return YES;
    }
    BOOL _GDWXisWXAppInstalled(){
        return [WXApi isWXAppInstalled];
    }
    
    BOOL _GDWXisWXAppSupportApi(){
        return [WXApi isWXAppSupportApi];
    }
    
    const char* _GDWXgetWXAppSupportMaxApiVersion(){
       return GDMakeStringCopy([[WXApi getWXAppSupportMaxApiVersion] UTF8String]);
    }
    
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
    
    
/*
	void _StartLookup (const char* service, const char* domain)
	{
		if (delegateObject == nil)
			delegateObject = [[NetServiceBrowserDelegate alloc] init];
		
		
		if (serviceBrowser == nil)
			serviceBrowser = [[NSNetServiceBrowser alloc] init];
		
		[serviceBrowser setDelegate:delegateObject];
		
		// Call "searchForServicesOfType" and pass NSStrings as parameters. By default mono
		// marshals all .Net strings as UTF-8 C style strings.
		[serviceBrowser searchForServicesOfType: CreateNSString(service) inDomain: CreateNSString(domain)];
	}
	
	const char* _GetLookupStatus ()
	{
		// By default mono string marshaler creates .Net string for returned UTF-8 C string 
		// and calls free for returned value, thus returned strings should be allocated on heap
		return MakeStringCopy([[delegateObject getStatus] UTF8String]);
	}
	
	int _GetServiceCount ()
	{
		return [delegateObject getCount];
	}
	
	const char* _GetServiceName (int serviceNumber)
	{
		// By default mono string marshaler creates .Net string for returned UTF-8 C string 
		// and calls free for returned value, thus returned strings should be allocated on heap
		return MakeStringCopy([[[delegateObject getService:serviceNumber] name] UTF8String]);
	}
	
	void _Stop()
	{
		[serviceBrowser stop];
	}
	*/
}

