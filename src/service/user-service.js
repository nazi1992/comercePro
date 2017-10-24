/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-24 23:11:42
*/
var _mm = require('util/mm.js');
var _user = {
	login:function(userInfo,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/user/login.do'),
			method:'POST',
			data:userInfo,
			success:resolve,
			error:reject
		});
	},
	//检查用户名
	checkUsername:function(username,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/user/check_valid.do'),
			method:'POST',
			data:{
				type:'username',
				str:username
			},
			success:resolve,
			error:reject
		});
	},
	//用户注册
	register:function(userInfo,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/user/register.do'),
			method:'POST',
			data:userInfo,
			success:resolve,
			error:reject
		});
	},
	logout:function(resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/user/logout.do'),
			method:'POST',
			success:resolve,
			error:reject
		});
	},
	checkLogin:function(resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/user/get_user_info.do'),
			method:'POST',
			success:resolve,
			error:reject
		});
	}
}
module.exports = _user;