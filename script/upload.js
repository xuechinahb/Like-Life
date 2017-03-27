var imagePathArray = new Array();
var listHeight;
 // 选择照片
     function selectImage(max){
     	listHeight = api.winWidth/3;
     	if (!max) {
     		max = 5;
     	};
        api.actionSheet({
            title: '请选择图片',
            cancelTitle: '取消',
            buttons: ['拍照','从相册选取']
        },function(ret,err){


            if(ret.buttonIndex==1){
                cameraImage(max)
            }else if(ret.buttonIndex==2){
                albumImage(max);
            }else{
                return false;
            }
            
            
        });
    }
    function cameraImage(max){
    	
        api.getPicture({
                sourceType: 'camera',
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: 'url',
                allowEdit: false,
                quality: 90,
                saveToPhotoAlbum: false
            }, function(ret, err){ 
                if (ret.data) {
                    // alert('ret.data=' + ret.data);return;
                    imagePathArray.push(ret.data);
                   if (max == imagePathArray.length) {
                    	$api.byId('addImgBtn').style.display = 'none';
                    };

                    $api.before($api.byId("addImgBtn"), '<li class="aui-list-view-cell aui-img aui-col-xs-4" style="height:'+listHeight+'px;"><img class="aui-img-object" src="'+ret.data+'" tapmode onclick="multipleImageBrowser(\''+(imagePathArray.length-1)+'\')"/><span class="aui-iconfont aui-icon-roundclosefill" onclick="delImage(this)"></span></li>');
                    
                    api.parseTapmode();
                }
            });
    }
    function albumImage(max){
    	
        var obj = api.require('UIMediaScanner');
        obj.open({
            type:'picture',
            column: 4,
            classify: true,
            max: max - imagePathArray.length,
            sort: {
                key: 'time',
                order: 'desc'
            },
            texts: {
                stateText: '请选择照片',
                cancelText: '取消',
                finishText: '完成'
            },
            styles: {
                bg: '#fff',
                mark: {
                    icon: '',
                    position: 'top_right',
                    size: 20
                },
                nav: {
                    bg: '#f66',
                    stateColor: '#fff',
                    stateSize: 18,
                    cancelBg: 'rgba(0,0,0,0)',
                    cancelColor: '#fff',
                    cancelSize: 18,
                    finishBg: 'rgba(0,0,0,0)',
                    finishColor: '#fff',
                    finishSize: 18
                }
            }
        }, function(reta){
            if(reta){
                var array = reta.list;
                
                for (i in array) {

                    

                    obj.transPath({
                     path: array[i].path
                    }, function( retb, err ){
                        if( retb ){

                            var localPath = retb.path;
                                                 
                            imagePathArray.push(localPath);
                            if (max == imagePathArray.length) {
                                $api.byId('addImgBtn').style.display = 'none';
                            };
                            $api.before($api.byId("addImgBtn"), '<li class="aui-list-view-cell aui-img aui-col-xs-4" style="height:'+listHeight+'px;"><img class="aui-img-object" src="'+localPath+'" tapmode onclick="multipleImageBrowser(\''+(imagePathArray.length-1)+'\')"/><span class="aui-iconfont aui-icon-roundclosefill" onclick="delImage(this)"></span></li>');
                        }
                    });
                }
                api.parseTapmode();
            }else{
                alert( JSON.stringify( err ) );
            }
        });
    }
    // 删除照片
    function delImage(arg){
       // toast('delImage');
        var index = 0;
        var el = arg.parentNode;
        while(el = el.previousSibling ){
            index++;
        }
        imagePathArray.splice(index,1);
        $api.remove(arg.parentNode);
        $api.byId('addImgBtn').style.display = 'inline';
       
    }
    function upload(pathArr, callback){
        

        var fs = api.require('fs');
        var imageUrlArray = new Array();
        uploadImage(pathArr.length);

        function uploadImage(length) {
            if ( length == 0) {
                callback(imageUrlArray);
                return;
            }
            showLoading('上传图片: ' + (pathArr.length - length + 1) + '/' + pathArr.length);
            //压缩图片
            var imgPath = pathArr[length - 1];
            var img_Name = new Date().getTime() + "_" + length;
            var imageCachePath = api.cacheDir;

            fs.getAttribute({
                path: imgPath
            },function( ret, err ){     
                var quality = 1, scale = 1;
                if( ret.status ){
                   
                    var size = ret.attribute.size;
                    
                    if(size < 307200){//300kb
                        quality = 1;
                        scale = 1;
                    }else if(size < 716800){//700kb
                        quality = 1;
                        scale = 0.9;
                    }else if(size < 1048576){//1M
                        quality = 1;
                        scale = 0.8;
                    }else if(size < 1572864){//1.5M
                        quality = 1;
                        scale = 0.7;
                    }else if(size < 2097152){//2M
                        quality = 1;
                        scale = 0.5
                    }else if(size < 3145728){//3M
                        quality = 1;
                        scale = 0.3;
                    }else{
                        quality = 0.9;
                        scale = 0.15;
                    }

                   
                }

                var imageFilter = api.require("imageFilter");
                imageFilter.compress({
                    img : imgPath,
                    quality : quality,
                    scale : scale,
                    save : {
                        album : false,
                        imgPath : imageCachePath,
                        imgName : img_Name + '.jpg'
                    }
                }, function(reta, err) {
                    if (reta.status) {
                        var compressedImgPath = imageCachePath + '/' + img_Name + '.jpg';
                            //上传图片
                            var model = api.require('model');
                            model.config({
                                appId : '',//ApiCloud的appId
                                appKey : ''//ApiCloud的appKey
                            });
                            model.uploadFile({
                                report : true,
                                data : {
                                    file : {
                                        name : img_Name,
                                        url : compressedImgPath
                                    },
                                }
                            }, function(retb, err) {
                                if (retb) {
                                    var state = retb.state;
                                    if (state == 1) {
                                        var body = retb.body;
                                        if (body) {
                                            imageUrlArray.unshift(body.url);
                                        }
                                        uploadImage(length-1);
                                    }
                                } else {
                                    api.hideProgress();
                                    if (err && err.msg) {
                                        api.alert({
                                            title: '提示', 
                                            msg: err.msg
                                        });
                                    }else{
                                        api.alert({
                                            title: '提示', 
                                            msg: '上传图片失败'
                                        });
                                    }
                                    // alert(JSON.stringify(err));
                                }
                            });
                        }
                    });
            });
            
    }
}


