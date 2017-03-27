function responseCallback(ret,err, callback, callback2){
	api.hideProgress();
	if(ret){

		if(ret.resCode != "01"){
			toast(ret.resInfo);
			if(callback2 && typeof(callback2) == "function"){
				callback2();
			}
		}else{
			
			if(callback && typeof(callback) == "function"){
				callback();
			}
			
			// api.hideProgress();
			
			// if(callback && typeof(callback) == "function"){
			// 	callback();
			// }
		}
	}else{
		// api.hideProgress();
		if (!err.msg || !err ) {
			toast('出错啦')
		}else{
			toast(err.msg);
		}
		
	}
	
}
function showLoading(attr){
		api.showProgress({
		    style: 'default',
		    animationType: 'fade',
		    title: attr ? attr: "加载中...",
		    text: '',
		    modal: true
		});
}

function toast(attr, duration){
	api.toast({
		msg: attr,
		duration: duration? duration : 2000,
		location: 'middle'
	});
}

function openWindow(callback){
	var delay = 0;

	if("ios" != api.systemType){
		delay = 300;
	}
	callback(delay);
}
function confirmDialog(msg, callback){
	api.confirm({
            title: '提示',
            msg: msg,
            buttons:['确定', '取消']
        },function(ret,err){
            if(ret.buttonIndex == 1){
                if (callback) {
                	callback();
                };
            }
        });
}
//// 隐藏loading
//function hideLoading(){
//  $api.remove($api.dom('.aui-loading'));
//}
//
//// 显示loading
//function showLoading(){
//  var loading = $api.dom(".aui-loading");
//  if(!loading){
//      $api.append($api.dom('body'),'<div class="aui-loading"><div class="aui-loading-1"></div><div class="aui-loading-2"></div></div>');
//  }
//}
//下拉刷新
function pullRefresh(callback, moreFlag){
    api.setRefreshHeaderInfo({
	        visible: true,
	        loadingImg: 'widget://image/ptr_pull.png',
	        bgColor: '#efeff4',
	        textColor: '#f66',
	        textDown: '下拉可刷新',
	        textUp: '松开立即刷新',
	        showTime: true
		}, function(ret, err){
		    //从服务器加载数据，完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
		    page = 1;
		    callback(page);
		});
		
		// 首次加载时设置下拉刷新组件为刷新中状态
		api.refreshHeaderLoading();
		
		if (moreFlag) {
			// Window或者Frame页面滑动到底部事件,可用于实现滚动到底部，加载更多功能
			api.addEventListener({
			    name:'scrolltobottom',
			    extra:{
			        threshold:0            //设置距离底部多少距离时触发，默认值为0，数字类型
			    }
			},function(ret,err){
			    callback(page);
			});
		};
		
}


// 浏览图片
function imageBrowser(imageUrl ){
		if( !imageUrl){
			toast('imageUrl is null');
			return false;
		}
		

		// $api.next(el)
		// var obj = api.require('imageBrowser');
		// obj.openImages({
		//     imageUrls: [imageUrl],
		//     showList:false,
		//     tapClose:true,
		//     activeIndex:0
		// });
		// var e = window.event;
		// if (e) {
		// 	e.preventDefault(); 
		// };
		// var photoBrowser = api.require('photoBrowser');
		// photoBrowser.open({
		//     images: [imageUrl],
		//     activeIndex: 0,
		//     placeholderImg: 'widget://res/img/user_default.png',
		// }, function(ret){
		//     // alert(JSON.stringify(ret));
		// });
		openWindow(function(delay){

	        api.openWin({
	          name: 'image_browser_win',
	          url: 'image_browser_win.html',
	          pageParam:{
	            images: [imageUrl],
	            activeIndex: 0,
	          },
	          delay: delay
	        })     
        })
		var e = window.event;
		if (e) {
			e.preventDefault(); 
		};
		
}

// 浏览图片
    function multipleImageBrowser(index){
            if("undefined" == typeof index){
                index = 0;
            }
            if (!imagePathArray) {return;};
            // var obj = api.require('imageBrowser');
            // obj.openImages({
            //     imageUrls: imagePathArray,
            //     showList: false,
            //     tapClose: false,
            //     activeIndex: index
            // });
   //          var photoBrowser = api.require('photoBrowser');
			// photoBrowser.open({
			//     images: imagePathArray,
			//     activeIndex: index,
			//     placeholderImg: 'widget://res/img/user_default.png',
			// }, function(ret){
			//     // alert(JSON.stringify(ret));
			// });
			openWindow(function(delay){

		        api.openWin({
		          name: 'image_browser_win',
		          url: 'image_browser_win.html',
		          pageParam:{
		            images: imagePathArray,
		            activeIndex: index,
		          },
		          delay: delay
		        })     
	        })
    }

    function blank(){
      // window.location.href="tel://12345678901";

      var e = window.event;
      if (e) {
        e.stopPropagation(); 
      };
    }

    function shareText(cancelTitle){
    	api.actionSheet({
            title: '邀请好友使用来来订房',
            cancelTitle: cancelTitle,
            buttons: ['新浪微博','QQ空间','微信朋友圈']
        },function( ret, err ){
            if( ret ){
                var shareText = '我正在使用【来来订房】App，全新订房方式：你出价，我有房！帮你快速找到附近酒店空房、找到你所想要的酒店！通过 www.likelife.cc 即可马上体验。';
                switch(ret.buttonIndex){
                	case 1:
                		 var weibo = api.require('weibo');
	                    weibo.shareText({
	                        text: shareText,
	                    },function(ret,err){
	                        // if (ret.status) {
	                        //   alert('分享文本内容成功');
	                        // }
	                    });
	                    break;
	                case 2:
	                	var obj = api.require('qq');
	                    obj.shareText({
	                        text: shareText
	                    });
	                    break;
	                case 3:
	                	var wx = api.require('wx');
	                    wx.shareText({
	                        text: shareText
	                    }, function(ret, err){
	                        // if(ret.status){
	                        //     alert('分享成功');
	                        // }else{
	                        //     alert(err.code);
	                        // }
	                    });
	                    break;
	                case 4:
	                	if ('不再提示' == cancelTitle) {
	                		$api.setStorage('date', '不再提示');
	                	}
	                	
	                	break;
                }
               
            }else{
                 alert('分享失败');
            }
        });
    }

