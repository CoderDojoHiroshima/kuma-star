enchant();

window.onload=function(){

	var game = new Core(320, 320),
	GAME_WIDTH = 320,
	GAME_GROUND = 150,
	STAR_NUM = 100;

	game.fps = 15;
	game.preload('avatarBg1.png', 'avatarBg2.png', 'avatarBg3.png', "space3.png", "icon0.png");
	game.onload = function(){

			// 背景
			game.rootScene.backgroundColor="#000000";
			bg =new AvatarBG(1);
			bg.y=50;
			game.rootScene.addChild(bg);

			// くま
			var bear = new Sprite(32, 32);
			bear.image = game.assets["space3.png"];
			bear.x = 40;
			bear.y = GAME_GROUND;
			bear.frame = 5;
			game.rootScene.addChild(bear);

			// 星
			var star = [];
			for ( var i = -1;  ++i < STAR_NUM; ) {
				star[i] = new Sprite(16, 16);
				star[i].image = game.assets["icon0.png"];
				star[i].x = GAME_WIDTH + GAME_WIDTH * Math.random();
				star[i].y = GAME_GROUND * Math.random();
				star[i].frame = 30;
				game.rootScene.addChild(star[i]);
			}


			bear.addEventListener("enterframe", function(){

				// 背景スクロール
				bg.scroll(game.frame*2);

				// 星
				for ( var i = -1;  ++i < STAR_NUM; ) {
					star[i].x -= 3;
					if(this.intersect(star[i]) || star[i].x < 0){
						star[i].x = GAME_WIDTH + i;
						star[i].y = GAME_GROUND * Math.random();
					}
				}

				// コマンド受け付け
        if (game.input.left) {
            this.x -=5;
        }
        if (game.input.right) {
            this.x +=5;
        }
        if (game.input.up) {
						if (this.a < 5) {
								this.y -=30;
						}
        }
        if ( this.x > GAME_WIDTH-33 ) {
            this.x = GAME_WIDTH-33;
        } else if ( this.x < -8 ) {
            this.x = -8;
        }

				// 飛んでいる時の処理
				if (this.y < GAME_GROUND) {

						// くまの見た目
						this.frame = 6;

						// 落下速度
						this.a += 1;
						this.y += this.a;

						// 地面にめり込んだら戻す
						if(this.y > GAME_GROUND){
								this.y = GAME_GROUND;
						}
				} else {

						// くまの見た目（走る）
						this.frame = this.age % 2 + 6;

						// 落下速度リセット
						this.a = 0;
				}

			});

	};
	game.start();
}
