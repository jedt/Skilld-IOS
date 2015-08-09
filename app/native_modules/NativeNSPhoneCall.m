#import "NativeNSPhoneCall.h"
#import "RCTLog.h"
#import "RCTBridge.h"

@implementation NativeNSPhoneCall
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(phoneCall:(NSString *)tel)
{
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[NSString stringWithFormat:@"tel:%@", tel]]];
}

@end
