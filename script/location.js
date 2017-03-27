//定位
var longitude =0 ,latitude = 0;
var city='', district='', keyword='';
var bMap;
var selectCityFlag = false;//是否通过城市列表选择城市
function mapLocation(showLoadingFlag, callback){
    // if (city && district) {
    //     return;
    // };
    if ('publish_order_frm' == api.frameName) {
            $api.text($api.byId('location'), '正在定位...');
        };
    if (showLoadingFlag == true) {
        showLoading('正在定位...');
    };
        bMap = api.require('bMap');
        bMap.getLocation({
            accuracy: '100m',
            autoStop: true,
            filter: 1
        }, function(ret, err){
            if(ret.status){
                longitude = ret.lon;
                latitude = ret.lat;

                bMap.getNameFromCoords({
                    lon: longitude,
                    lat: latitude
                },function(ret,err){
                    if(ret.status){
                        // alert(JSON.stringify(ret));
                        api.hideProgress();
                        city = ret.city;
                        district = ret.district;
                        city = city.substring(0, city.length-1);
                        keyword = ret.streetName;
                        if (false == selectCityFlag) {
                            $api.text($api.byId('city'), city);
                        };
                        
                        var streetNumber = ret.streetNumber;
                        if (!streetNumber) {streetNumber='';};
                        $api.text($api.byId('location'), ret.streetName + streetNumber);
                        // bMap.stopLocation();
                        // if (callbackFalg == true) {
                        //     // alert('city=' + city + ',keyword=' + keyword);return;
                        //     callback();
                        // };
                        if (callback) {
                            callback();
                        };
                        
                    }else{
                        // alert('地图打开getNameFromCoords失败');
                    }
                });
                // bMap.stopLocation();
                // alert(JSON.stringify(ret));
            }else{
                // alert('地图打开getLocation失败');
            }
        });
}
//百度地图，搜索关键字
function mapSearch(fromWin, fromFrm){
    var keywordArg = keyword;
    var cityArg = $api.text($api.byId('city'));
    if (cityArg != city) {
        keywordArg = cityArg;
    }
	openWindow(function(delay){
		api.openWin({
			name: "userlocation_win",
			url: "userlocation_win.html",
			pageParam:{
				longitude: longitude,
				latitude: latitude,
				city: cityArg,
				keyword: keywordArg,
				fromWin: fromWin,
				fromFrm: fromFrm
			},
			delay: delay
		})     
	})
}

function openCityList(fromWin, fromFrm){        
        openWindow(function(delay){
            api.openWin({
                    name: "citylist_win",
                    url: "citylist_win.html",
                    pageParam:{
                        city: $api.text($api.byId('city')),
                        fromWin: fromWin,
                        fromFrm: fromFrm
                    },
                    delay: delay
                })     
        })
    }
function setCity(cityArg){
        selectCityFlag = true;
        $api.text($api.byId('city'), cityArg);
        if ('publish_order_frm' == api.frameName) {
            $api.text($api.byId('location'), cityArg);
            longitude =0 ;
            latitude = 0;
        }else if('new_room_frm' == api.frameName){
            
            if (cityArg != city) {
                $api.text($api.byId('location'), '');
            }
        }
    }

function updateLocation(address, lon, lat, cityArg, keywordArg, addressDetailArg){
    // bMap.stopLocation();
    // $api.text($api.byId('location'), address);
    $api.text($api.byId('location'), addressDetailArg);
    longitude =lon;
    latitude = lat;
    if (false == selectCityFlag) {
        city = cityArg;
        $api.text($api.byId('city'), cityArg);
    };
    
    keyword = keywordArg;
}