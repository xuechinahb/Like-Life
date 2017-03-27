
// var API_HOST = 'http://likelife.cn-hangzhou.aliapp.com/';
var API_HOST = 'http://114.215.183.173:8080/FHMYSQL/';
//var API_HOST = 'http://tjp0515.xicp.net/FHMYSQL/';



var UrlProvider={
	login : API_HOST + '',//登录
	complaint: API_HOST + 'iappcomplain/submit.do',//投诉
	verify: API_HOST + 'iappidcard/submit.do',//身份认证
	newroom: API_HOST + 'iapphouse/submit.do',//发布新房源
	paymethod: API_HOST + 'iappuser/submitPayWay.do',//收款方式
	submit_order: API_HOST + 'iapporder/submit.do',//提交订单
	submit_specific_order: API_HOST + 'iapporder/zdsubmit.do',//提交指定订单
	room_list: API_HOST + 'iappgrabhouse/houseList.do',//房源列表
	specific_room_ret: API_HOST + 'iapporder/lookZdOrder.do',//通过优质房源下单后的结果
	room_detail: API_HOST + 'iapphouse/look.do',//房源详情
	room_comment: API_HOST + 'iapphouse/allReview.do',//房源评论列表
	cancel_order: API_HOST + 'iapporder/cancelOrder.do',//取消订单
	cancel_specific_order: API_HOST + 'iapporder/cancleZdOrder.do',//取消指定订单
	checkin: API_HOST + 'iappgrabhouse/check.do',//入住
	checkout: API_HOST + 'iappreception/leave.do"',//离店
	user_order_list : API_HOST + 'iapporder/look.do',//用户订单列表
	newcomment: API_HOST + 'iappreview/submit.do',//发布新评论
	landlord_order_list: API_HOST + 'iapporder/lookGrad.do',//抢单列表
	landlord_reception_list: API_HOST + 'iapporder/getFDOrderList.do',//接待列表
	landlord_reception_detail: API_HOST + 'iapporder/getFDOrderInfo.do',//接待列表中订单详情
	strive_order: API_HOST + 'iappreception/grab.do',//抢单
	excellent_room_list: API_HOST + 'iapphouse/googHouse.do',//优质房源列表
	landlord_room_list: API_HOST + 'iappgrabhouse/getHouseList.do',//房东发布的房源列表
	delete_room: API_HOST + 'iapphouse/delete.do',//删除房源
	order_pay: API_HOST + 'iapporder/payOrder.do',//付款
	specific_order_pay: API_HOST + 'iapporder/payZdOrder.do',//指定订单付款
	free_benefit: API_HOST + 'iappuser/getFreeMsg.do',//免费福利
	message_list: API_HOST + 'iappmsgcenter/list.do',//消息列表
	message_state: API_HOST + 'iappmsgcenter/haveRead.do',//更新消息状态
	delete_message: API_HOST + 'iappmsgcenter/delete.do',//删除消息
	landlord_specific_order_list: API_HOST + 'iapporder/fdLookZdOrder.do',//房东获取指定订单列表
	landlord_specific_order_receive: API_HOST + 'iapporder/ready.do',//房东接受指定订单
	check_order_state: API_HOST + 'iapporder/checkOrder.do',//检查普通订单的状态，是否可以支付
	check_specific_order_state: API_HOST + 'iapporder/checkZdOrder',//检查指定订单的状态，是否可以支付
	get_push_msg: API_HOST + 'iappuser/getPushMsg.do',//首次注册登录，推送消息
};