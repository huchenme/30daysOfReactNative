//
//  JTSImagePreview.m
//  AwesomeProject
//
//  Created by Hu Chen on 15/7/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "JTSImagePreview.h"
#import "RCTLog.h"
#import <JTSImageViewController.h>
#import "AppDelegate.h"

@implementation JTSImagePreview

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(showImage:(NSString *)url)
{
  // Here's our method's code
  RCTLogInfo(@"showImage with url %@", url);

  // Initialize imageInfo
  JTSImageInfo *imageInfo = [[JTSImageInfo alloc] init];

  // Set the URL
  imageInfo.imageURL = [NSURL URLWithString:url];

  JTSImageViewController *imageViewer = [[JTSImageViewController alloc] initWithImageInfo:imageInfo
                                                                                     mode:JTSImageViewControllerMode_Image
                                                                          backgroundStyle:JTSImageViewControllerBackgroundOption_None];

  // Get root to show from
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  UIViewController* showingController = (UIViewController*)delegate.window.rootViewController;

  dispatch_async(dispatch_get_main_queue(), ^{
    [imageViewer showFromViewController:showingController transition:JTSImageViewControllerTransition_FromOffscreen];
  });
}

@end
