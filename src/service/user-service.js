/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-19 22:43:39
*/
var _mm = require('util/mm.js');
var _user = {
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