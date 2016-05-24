var canvas = document.getElementById("canvas");
		if (canvas.getContext) {
		    var ctx = canvas.getContext('2d');
		}
		
	/*对象处理*/
		var player = new function(){
			this.pos_x = 20;//x位置
			this.pos_y = 220;//y位置
			this.frame = 0;//帧数
			this.live = 1;//生命数
			this.flash = 1;
			this.height = 11;
			this.image = "bird0_0.png";
			this.imagenum = 0;
		}
		//玩家对象

		var enemyPipe1 = new function(){
			this.speed = 1;//管子移动速度
			this.width = 40;//管子固定宽度 。用于碰撞检测
			this.height = 50;//管子高度 。 用于碰撞检测
			this.pos_x = 288;//管子移动位置x 288
			this.pos_y = -200;//管子移动位置y
		}
		var enemyPipe2 = new function(){
			this.speed = 1;//管子移动速度
			this.width = 40;//管子固定宽度 。用于碰撞检测
			this.height = 50;//管子高度 。 用于碰撞检测
			this.pos_x = 288;//管子移动位置x 288
			this.pos_y = 200;//管子移动位置y
		}
		var enemyPipe3 = new function(){
			this.speed = 1;//管子移动速度
			this.width = 40;//管子固定宽度 。用于碰撞检测
			this.height = 50;//管子高度 。 用于碰撞检测
			this.pos_x = -52;//管子移动位置x
			this.pos_y = -150;//管子移动位置y
		}
		var enemyPipe4 = new function(){
			this.speed = 1;//管子移动速度
			this.width = 40;//管子固定宽度 。用于碰撞检测
			this.height = 50;//管子高度 。 用于碰撞检测
			this.pos_x = -52;//管子移动位置x
			this.pos_y = 250;//管子移动位置y
		}

		//pipe对象
		var bottomBoard = new function(){
			this.landSpeed = 1;
			//地板移动速度
			this.pos_x = 0;
			this.pos_y = 50;
			
			//白天黑夜时间开关
		}
		//背景对象

	var jumpT;
	/*游戏控制器*/
	function flash(){
		jumpT  = setTimeout("flash()",10);
		console.log(1);
		player.height-=player.flash;
		if(player.height<0){
			clearTimeout(jumpT);
			player.height = 11;
			console.log(2);
		}
		player.pos_y-=player.height;
						
	}
		var Game_control = new function(){
			this.key = {};
			
			this.quater = true;//间隔
			this.game_start =false;
			this.loopBoard = function(){
				this.loop = setTimeout("Game_control.loopBoard()",30);
				if(bottomBoard.pos_x<-22){bottomBoard.pos_x=0;}
				bottomBoard.pos_x-=2;
				if(this.game_start){
					//管子这里移动了
					enemyPipe1.pos_x-=2;
					enemyPipe2.pos_x-=2;
					enemyPipe3.pos_x-=2;
					enemyPipe4.pos_x-=2;
					if(enemyPipe1.pos_x==0){
						enemyPipe3.pos_x = 288;
						enemyPipe4.pos_x = 288;
					}
					if(enemyPipe3.pos_x==0){
						enemyPipe1.pos_x = 288;
						enemyPipe2.pos_x = 288;
					}

					player.pos_y+=4;
					switch(player.imagenum){
						case 0:player.image = "bird0_0.png";break;
						case 1:player.image = "bird0_1.png";break;
						case 2:player.image = "bird0_2.png";break;
					}
					if(player.imagenum<3){
						player.imagenum++;
					}
					else player.imagenum = 0;
				}
				if(this.key[32]&&this.quater){

					this.quater = false;
					player.pos_y-=16;
					flash();
					console.log(3)
					
				}
				drawBoard();
				//调用board绘图函数
				drawPlayer();
				//调用player绘图函数
				drawPipe();
				//调用pipe绘图函数
				dearBottom();
				collision();
				//调用碰撞检测函数
				ctx.clearRect(0,0,288,512);
				//setTimeout util die
			}
			//loopBoard是整个游戏的控制器(包括所有精灵的所有移动)
			this.createPipe = function(){
				//创建pipe对象
				//给予属性
			}
			this.count = function(){

			}
			this.loopBoard();//用于循环绘制地图
			this.createPipe();//用于创造敌人
			this.count(); //用于记录玩家次数
		}


		
		var touchListener = new function(){
			//屏幕触控事件
		}

		var mouseListener = new function(){
			//鼠标点击事件
			var KEY_CODES = {
				32:'jump'
			};
			
			window.addEventListener('keydown',function(e){
				Game_control.game_start = true;
				if(KEY_CODES[event.keyCode]){
					clearTimeout(jumpT);
					Game_control.key[e.keyCode] = true;
					e.preventDefault();
				}

			})
			window.addEventListener('keyup',function(e){
				if(KEY_CODES[event.keyCode]){
					Game_control.key[e.keyCode] = false;
					Game_control.quater = true;
					e.preventDefault();
				}
			
			})
			
			
		}
		function drawPlayer(){
			var image = new Image(); 
			image.onload = function() { 
		    	ctx.drawImage(image, player.pos_x, player.pos_y);
			} 
			image.src = player.image;
		}
		function drawBoard(){
			var image = new Image(); 
			image.onload = function() { 
		   		ctx.drawImage(image, 0, 0);
			} 
			image.src = "bg_day.png";
		}
		function dearBottom(){
			var image = new Image(); 
			image.onload = function() { 
		   		ctx.drawImage(image, bottomBoard.pos_x, 400);
			} 
			image.src = "land.png";
		}
		function drawPipe(){
			var image1 = new Image(); 
			image1.onload = function() { 
		   		ctx.drawImage(image1, enemyPipe1.pos_x, enemyPipe1.pos_y);
			} 
			image1.src = "pipe_down.png";

			var image2 = new Image(); 
			image2.onload = function() { 
		   		ctx.drawImage(image2, enemyPipe2.pos_x, enemyPipe2.pos_y);
			} 
			image2.src = "pipe_up.png";

			var image3 = new Image(); 
			image3.onload = function() { 
		   		ctx.drawImage(image3, enemyPipe3.pos_x, enemyPipe3.pos_y);
			} 
			image3.src = "pipe_down.png";

			var image4 = new Image(); 
			image4.onload = function() { 
		   		ctx.drawImage(image4, enemyPipe4.pos_x, enemyPipe4.pos_y);
			} 
			image4.src = "pipe_up.png";

		}
		function collision(){
			//碰撞检测
			if(player.pos_y>365){
				//die
				player.pos_y = 220;
				Game_control.game_start = false;
				alert("die")
			}
			if(player.pos_x+48>enemyPipe1.pos_x&&player.pos_x+48<enemyPipe1.pos_x+52){
				if(player.pos_y<enemyPipe1.pos_y+320){
					alert("die");
					player.pos_y = 220;
					Game_control.game_start = false;
					enemyPipe1.pos_x=288;
					enemyPipe2.pos_x=288;
					enemyPipe3.pos_x=-52;
					enemyPipe4.pos_x=-52;
				}
				if(player.pos_y+48>enemyPipe2.pos_y){
					alert("die");
					player.pos_y = 220;
					Game_control.game_start = false;
					enemyPipe1.pos_x=288;
					enemyPipe2.pos_x=288;
					enemyPipe3.pos_x=-52;
					enemyPipe4.pos_x=-52;
				}
			}
			if(player.pos_x+48>enemyPipe3.pos_x&&player.pos_x+48<enemyPipe3.pos_x+52){
				if(player.pos_y<enemyPipe3.pos_y+320){
					alert("die");
					player.pos_y = 220;
					Game_control.game_start = false;
					enemyPipe1.pos_x=288;
					enemyPipe2.pos_x=288;
					enemyPipe3.pos_x=-52;
					enemyPipe4.pos_x=-52;
				}
				if(player.pos_y+48>enemyPipe4.pos_y){
					alert("die");
					player.pos_y = 220;
					Game_control.game_start = false;
					enemyPipe1.pos_x=288;
					enemyPipe2.pos_x=288;
					enemyPipe3.pos_x=-52;
					enemyPipe4.pos_x=-52;
				}
			}


		}