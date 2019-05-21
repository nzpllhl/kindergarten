$(function () {
	//
	$('#account').focus(function () {
		checkFocus('account');
	}).blur(function () {
		var acctVal = $(this).val().replace(/\s+/g, '');
		$(this).val(acctVal);
		checkFocus('account');
	}).keydown(function (event) {
		var acctVal = $(this).val().replace(/\s+/g, '');
		$(this).val(acctVal);
		checkFocus('account');
	}).keyup(function () {
		checkFocus('account');
	})
	//
	$('#password').focus(function () {
		checkFocus('password');
	}).blur(function () {
		checkFocus('password');
	}).keydown(function (event) {
		checkFocus('password');
	}).keyup(function () {
		checkFocus('password');
	})
	//
	$('#log-yzm').focus(function () {
		checkFocus('log-yzm');
	}).blur(function () {
		checkFocus('log-yzm');
	}).keydown(function (event) {
		checkFocus('log-yzm');
	}).keyup(function () {
		checkFocus('log-yzm');
	})



	//自动获取焦点
	function autoFocus() {
		$('#account, #password').filter(':visible').each(function () {
			var $this = $(this);
			if ($this.val() == '') {
				$this.focus();
				checkFocus($this.attr('id'));
				return false;
			}
		});
	}
	autoFocus();

	function checkFocus(id) {
		var input = $('#' + id),
			val = input.val();
		if (id != "password") {
			val = $.trim(val);
		}
		// $('#login-form').find('input.log-input').removeClass('input');
		var txt = input.parent().children('.login-txt');
		$('.login-txt').removeClass("login-txt-active");
		txt.addClass('login-txt-active');
		$('.input-group').removeClass("input-group-active");
		input.parent().addClass("input-group-active");
		if (val == '') {
			txt.show();
		} else {
			txt.hide();
		}
	}

	//错误信息提示DIV
	function showMsg(msg) {
		$('#error').text(msg).show();
		if ($.trim(msg) == '' || msg == null) {
			$('#error').hide();
		}
	}

	// 登录验证
	function login() {
		showMsg('');
		var me = $('#login-button');
		if (me.hasClass('disabled')) {
			return;
		}
		var account = $('#account').val(),
			passWord = $('#password').val(),
			valid = $('#log-yzm').val();
		if (!account) {
			showMsg('请输入帐号');
			$('#account').focus();
			return;
		}
		if (!passWord) {
			showMsg('请输入密码');
			$('#password').focus();
			return;
		}
		if ($('#log-yzm').is(':visible') && !valid) {
			showMsg('请输入验证码');
			$('#log-yzm').focus();
			return;
		}
		//以上ajax提交前判断，自动跳回到错误地方获取焦点，以下写ajax提交


		$.ajax({
				method: 'POST',
				url: '/login',
				data: {
					username: $('#account').val(),
					password: $('#password').val()
				},
				success: function(){
						let login_error = $.cookie('login_error');
						if(login_error === undefined || login_error<1){
							me.addClass('disabled').html('正在登录...');
							location = '/home';
						}else{
							showMsg('账号或密码错误');
						}
				},
				error: function(){
					console.log('请求出错' );
				}
			})
			

	}

	$('#login-button').click(function () {
		login();
	});




	/**
	 * 验证码
	 * @param {Object} o 验证码长度
	 */
	$.fn.code_Obj = function (e) {
		var options = {
			code_l: e.codeLength, //验证码长度
			codeChars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
				'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
				'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			],
			codeColors: ['#f44336', '#009688', '#cddc39', '#03a9f4', '#9c27b0', '#5e4444', '#9ebf9f', '#ffc8c4', '#2b4754', '#b4ced9', '#835f53', '#aa677e'],
			code_Init: function () {
				var code = "";
				var codeColor = "";
				var checkCode = $("#data_code");
				for (var i = 0; i < this.code_l; i++) {
					var charNum = Math.floor(Math.random() * 52);
					code += this.codeChars[charNum];
				}
				for (var i = 0; i < this.codeColors.length; i++) {
					var charNum = Math.floor(Math.random() * 12);
					codeColor = this.codeColors[charNum];
				}
				if (checkCode) {
					checkCode.css('color', codeColor);
					checkCode.className = "code";
					checkCode.text(code);
					checkCode.attr('data-value', code);
				}
			}
		};

		options.code_Init(); //初始化验证码
		$("#data_code").bind('click', function () {
			options.code_Init();
		});
	};

	/**
	 * 验证码
	 * codeLength:验证码长度
	 */
	$('#data_code').code_Obj({
		codeLength: 5
	});


})