$(function(){
	$.extend({
		util : function(){
			var returnType = {};
			var navigatorAgent = navigator.userAgent.toLowerCase();
			if(navigatorAgent.indexOf("iphone") > 0 || navigatorAgent.indexOf("ipod") > 0){returnType.platform = 'ios';}
			else if(navigatorAgent.indexOf("android ") > 0){returnType.platform = 'and';}
			else{returnType.platform = 'des';}
			if(returnType.platform == 'des'){
				if(navigatorAgent.indexOf('chrome') != -1){ returnType.browser = 'chrome';}
				else if(navigatorAgent.indexOf('net') != -1){ returnType.browser = 'ie';}
				else{ returnType.browser = 'safari';}
			}else{
				if(navigatorAgent.indexOf('kakao') != -1){ returnType.browser = 'kakao';}
				else if(navigatorAgent.indexOf('fb') != -1){ returnType.browser = 'face';}
				else if(navigatorAgent.indexOf('naver') != -1){ returnType.browser = 'naver';}
				else if(navigatorAgent.indexOf('daum') != -1){ returnType.browser = 'daum';}
				else{ returnType.browser = 'safari';}
			}
			try{
				if(window.opener === null || window.opener == 'null') returnType.newOpen = false;
			}catch(e){
				returnType.newOpen = true;
			}
			return returnType;
		},
		platform : function(){
			return $.util().platform;
		},
		borwser : function(){
			return $.util().browser;
		},
		newOpen : function(){
			return $.util().newOpen;
		},
		createInput : function(form, name, value){
			var input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", name);
			input.setAttribute("value", value);
			form.appendChild(input);
		},
		createForm : function(method,name){
			var form = document.createElement("form");
			if(name === undefined){
				form.setAttribute("name", 'utilTempForm');
			}else{
				form.setAttribute("name", name);
			}
			form.setAttribute("method", method);
			document.body.appendChild(form);
			$(form).hide();
			if(method.toLowerCase() == 'put' || method.toLowerCase() == 'delete'){
				jQuery.createInput(form, "_method", method);
			}
			return form;
		},
		ajaxFnImage : function(url,form,method,requestFunction,async){
			var formData = new FormData(form);
			$.ajax({
				type:method,
				url:url,
				data:formData,
				processData:false,
				contentType:false,
				dataType:"json",
				async:async,
				success:function(data){
					requestFunction(data);
				},error:function(jqXHR,textStatus,errorThrown){
					jQuery.ajaxError(jqXHR,textStatus,errorThrown);
				}
			});
		},
		ajaxFn : function(url,form,method,requestFunction,async,tempData){
			$.ajax({
				type:method,
				url:url,
				async:async,
				data:$(form).serialize(),
				success:function(data){
					requestFunction(data,tempData);
				},error:function(jqXHR,textStatus,errorThrown){
					jQuery.ajaxError(jqXHR,textStatus,errorThrown);
				}
			});
		},
		ajaxError : function(jqXHR,textStatus,errorThrown){
			var errorMsg = '';
			errorMsg += '-jqXHR.status:'+jqXHR.status+'\n';
			errorMsg += '-jqXHR.statusText:'+jqXHR.statusText+'\n';
			errorMsg += '-jqXHR.responseText:'+jqXHR.responseText+'\n';
			errorMsg += '-jqXHR.readyState:'+jqXHR.readyState+'\n';
			errorMsg += '-textStatus:'+textStatus+'\n';
			errorMsg += '-errorThrown:'+errorThrown+'\n';
			console.log(errorMsg);
		},
		backPage : function(pageName){
			(function(window, location) {
				history.replaceState(null, document.title, location.pathname+"#!/history");
				history.pushState(null, document.title, location.pathname);
				window.addEventListener("popstate", function() {
					if(location.hash === "#!/history") {
						history.replaceState(null, document.title, location.pathname);
						setTimeout(function(){location.replace(pageName);},1);
					}
				}, false);
			}(window, location));
		},
		backPageSearch : function(pageName){
			(function(window, location) {
				history.replaceState(null, document.title, location.pathname+location.search+"#!/history");
				history.pushState(null, document.title, location.pathname+location.search);
				window.addEventListener("popstate", function() {
					if(location.hash === "#!/history") {
						history.replaceState(null, document.title, location.pathname+location.search);
						setTimeout(function(){location.replace(pageName);},1);
					}
				}, false);
			}(window, location));
		},
		getOffset : function(el) {
			el = el.getBoundingClientRect();
			return {
				left: el.left + window.scrollX,
				top: el.top + window.scrollY
			};
		},
		screenWidth : function(){
			var platform = $.util().platform;
			if(platform == 'and'){
				return screen.width;
			}else if(platform == 'ios'){
				return screen.availWidth;
			}else{
				return $(window).width();
			}
		},
		screenHeight : function(){
			var platform = $.util().platform;
			if(platform == 'and'){
				return screen.height;
			}else if(platform == 'ios'){
				return screen.availHeight;
			}else{
				return $(window).height();
			}
		},
		isValue : function(value, replace){
			if(value === null || value === undefined || value === 'null' || value === 'undefined'){
				value = replace;
			}
			return value;
		},
		closeConfirm : function(isStart){
			if(isStart){
				window.onbeforeunload = function (e) {
					e = e || window.event;
					if (e) { e.returnValue = 'Sure?';}
					return 'Sure?';
				};
			}else{
				window.onbeforeunload = function (e) {
					return;
				};
			}
		}
	});

	$.fn.extend({
		scrollEvent : function(callback){
			$(this).scroll(function(){
				var self = $(this);
				var scrollHeight = self.prop("scrollHeight"), listHeight = self.height(), scrollTop = self.scrollTop(), scrollBottom = scrollHeight - scrollTop - listHeight;
				if(scrollBottom < 100){
					callback($(this));
				}
			});
		}
	});

	Array.prototype.remove = function(idx){
		var temp = [];
		var i = this.length;
		while(i > idx){
			var kk = this.pop();
			temp.push(kk);
			i--;
		}
		for(var j=temp.length - 2; j>=0; j--){
			this.push(temp[j]);
		}
	};
	String.prototype.replaceAll = function(find,replace){
		if(this === null || this === '') return '';
		return this.replace( new RegExp( find, 'g' ), replace );
	};
	String.prototype.setPriceComma = function() {
		var n = this;
		n += '';
		var reg = /(^[+-]?\d+)(\d{3})/;
		while (reg.test(n)){n = n.replace(reg, '$1' + ',' + '$2');}
		return n;
	};
});
