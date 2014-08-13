#import <Foundation/Foundation.h>
#import "WXApi.h"

@interface GdWx : NSObject<WXApiDelegate>
{
    
}

+ (GdWx *)instance;
- (void) print;
- (BOOL) registerApp;
- (BOOL) hasWeixin;
- (BOOL) handleOpenURL:(NSURL *) url;
- (void) onReq:(BaseReq*)req;
- (void) onResp:(BaseResp*)resp;
- (void) sendAppContent:(const char*) title description:(const char*)description info:(const char*) info url:(const char*) url image: (const char*) image show: (bool) show;
@end

/*

@interface GeekWeixin : NSObject
{
    // Keeps track of available services
   // NSMutableArray *services;
	
	// Keeps track of search status
//	NSString* status;
 //   BOOL searching;
}



// NSNetServiceBrowser delegate methods for service browsing


- (void)netServiceBrowserWillSearch:(NSNetServiceBrowser *)browser;
- (void)netServiceBrowserDidStopSearch:(NSNetServiceBrowser *)browser;
- (void)netServiceBrowser:(NSNetServiceBrowser *)browser
			 didNotSearch:(NSDictionary *)errorDict;
- (void)netServiceBrowser:(NSNetServiceBrowser *)browser
		   didFindService:(NSNetService *)aNetService
			   moreComing:(BOOL)moreComing;
- (void)netServiceBrowser:(NSNetServiceBrowser *)browser
		 didRemoveService:(NSNetService *)aNetService
			   moreComing:(BOOL)moreComing;

// Other methods

- (int)getCount;
- (NSNetService *)getService:(int)serviceNo;
- (NSString *)getStatus;

@end
*/
