#bridge文档

##1.方法调用(call)

+ 切换城市(changecity)  
	iwjw://callnatvie/callmethod?cityid=1111(cityid或者provinceId)
+ 新房回退前一个页面(newhousegoback)  
+ getmessagenumber
+ 去消息中心(gomessagecenter)
+ 分享(sharepage)  
	分享关闭: call('sharepage', {close: 1}) // 有'close'字段并且值为1时，关闭分享
+ 获取登录状态(getloginstate)  
	userid,name,phonenum,新增istestuser字段：0：非白名单，1：白名单
+ 获取信息(getinfo)  
	登陆状态:cityid:1xxxx,userid,name,phonenum  
	未登陆状态:cityid;1xxxxx  
	新增istestuser字段：0：非白名单，1：白名单  
+ 更新APP(updateapp)
+ tips是否可以显示(gettipsstate)
+ 关闭tips(closetips)
+ 去开户(openaccount)
+ 设置navigator的样式(setnavigation)
  call('setnavigation', {
  		showleft:"yes",
        showright:"yes",
        righttxt:"使用说明",
        righturl: url
       })
+ 获取APP校准时间(getcurrenttimeexact)
+ app下拉刷新(setrefreshhead)  
 	status: 0, 0:关闭下拉刷新,1:打开下拉刷新  
	jsRefresh:xxx (前端的刷新方法)
+ 转让纪录里的:取消转让(canceltransfer)
+ 房产宝详情购买(fcbdetailbuy)
+ 卡券选择(voucherselect)
+ vouchernodata
+ 调用输入交易密码(canceltransfer)
+ 协议升级弹窗(protcolupgradealert)
+ 系统升级弹窗(systemupgradealert)
+ 贷总管中登录(h5login)
+ H5新浪开户结果(openaccountfinish)  
+ 新增方法
	发起刷新其他Web页面的请求：iwjw://callnatvie/callmethod?page=couponlist
	其中page参数为需要通知的页面名（需要根据每个页面单独定义，卡券列表暂定为couponlist）

	调用流程如下：
	1）卡券列表页面（被通知页）初始化后通过已有的JSBridge方法setrefreshhead来告诉Native当前页面的刷新事件回调名。
	2）退款页面（通知页）通过新增的JSBridge方法refreshrequest来通知Native需要刷新指定页面。
	3）Native接到刷新请求之后，通过步骤一中获取的刷新事件回调名，调用JS方法进行刷新。   

##2.打开UI界面(jumpui)  

	iwjw://callnatvie/jumpui?page=xxx
+ page值为 0:新webview 1:二手房 2.新房 3.租房 4.爱理财 5.业主委托 6.购房百科 7.财产说 8.房贷计算器 9.卖房委托 10.出租委托 11.钱包页 12.资产页  
+ 跳转品牌公寓地图页：iwjw://callnatvie/jumpui?page=flatmap  
+ 跳转品牌公寓整租列表页：iwjw://callnatvie/jumpui?page=entireflatlist(已废弃)
+ 跳转品牌公寓合租列表页：iwjw://callnatvie/jumpui?page=shareflatlist(已废弃)
+ 跳转房源详情页：iwjw://callnatvie/jumpui?page=flatdetail&houseid=xxxx 
+ 跳转品牌公寓全部房源列表页：iwjw://callnatvie/jumpui?page=rentflatlist&type=x 其中type参数 0或不传 = 全部房源，1=合租列表，2=整租列表   
+ 租金返利券：
	由于卡券列表存在多种状态，所以补充各状态的jumpui方法，修改如下：

	卡券列表：
	1、返利券详情 （立即使用）：
	jumpui: {"page" : "rebatesdetail", status: status, "url" : "返利券详情页URL"}

	2、申请返利 (审核中, 审核失败)
	jumpui: {"page" : "applyrebates",  "voucherid" : "返利券ID"}

	3、退款页面 （已退款）
	jumpui: {"page" : "refund", "url" : "退款页URL"}

	4、返利成功 （已返利）
	jumpui: {"page" : "rebatesuccess", "voucherfee" : "金额"}


	2、申请返利
	jumpui: {"page" : "applyrebates", "voucherid" : "返利券ID"}
	3、立即购买(返利券，ordertype = 4)
	jumpui: {"page" : "pay", "ordertype" : "4", "billtitle" : "返利券标题", "billfee" : "返利券金额" }


##3.调用后台API(ajax)

	apiname=xxx&xx=xx
	
##4.弹出原生登录页面(login)

##5.日志收集(log)

##6.iwjw://callnatvie/back关闭当前

##7.APP回调H5
	1.H5注册回调函数，方法名相同时会覆盖前一个注册的回调
		bridge.onCall('method', function () {})
	2.APP可以主动多次调用H5
		window.callJs('method', { params1 })
		window.callJs('method', { params2 })
	3.H5可以解绑回调
		bridge.offCall('method')

##8.其他
	1.唤起App并进入【品牌公寓首页】：
		iwjw://www.iwjw.com/flathome