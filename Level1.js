var Level1 = {
		preload: function() {

			//  We need this because the assets are on github pages
			//  Remove the next 2 lines if running locally
			//this.load.baseURL = 'https://ioniodi.github.io/Super-Mario/';
			//this.load.crossOrigin = 'anonymous';

			this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin2.png', 16, 16);
			this.load.image('coincounter', 'assets/coincounter');
			this.load.image('lives', 'assets/lives.png');
			this.load.tilemap('level', 'assets/super_mario_map.json', null,
					Phaser.Tilemap.TILED_JSON);
			this.load.audio('music', 'audio/soundtrack.mp3');
			this.load.audio('CoinK', 'audio/coin.wav');
			this.load.audio('jump', 'audio/jump-super.wav');
			this.load.audio('stomp', 'audio/stomp.wav');
			this.load.audio('mariodie', 'audio/mario-die.wav');
			this.load.audio('1-up', 'audio/1-up.wav');

		}
		
		
		
		create: function() {
			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#5c94fc';
			

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.addTilesetImage('tiles2', 'tiles2')
			map.setCollisionBetween(3, 12, true, 'solid');

			map.createLayer('background');

			layer = map.createLayer('solid');
			layer.resizeWorld();


			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 1, 2, 1 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;

			

			game.camera.follow(player);

			cursors = game.input.keyboard.createCursorKeys();
			
			music = game.add.audio('music');
				music.loop = true;
				music.play();
				
			CoinK = game.add.audio('CoinK');
			jump = game.add.audio('jump');
			stomp = game.add.audio('stomp');
			mariodie = game.add.audio('mariodie');
			oneup = game.add.audio('1-up');

			CoincountText = game.add.text( 10, 16, 'x0', { fontSize: '10px', fill: '#fff'});
			CoincountText.fixedToCamera = true;
			coincounter = game.add.sprite( 0, 16, 'coincounter');
			coincounter.fixedToCamera = true;


			scoreText = game.add.text( 0, 6, 'Score: 0', { fontSize: '10px', fill: '#fff'});
			scoreText.fixedToCamera = true;
			
			livesheart = game.add.sprite( 110, 5, 'lives' );
			livesheart.fixedToCamera = true;
			livesText = game.add.text( 130, 8, "x3", { fontSize: '10px', fill: '#fff'});
			livesText.fixedToCamera = true;

			stageText = game.add.text( 200, 6, 'World: 1 - 1', { fontSize: '10px', fill: '#fff'});
			stageText.fixedToCamera = true;

		}

		update: function() {
			game.physics.arcade.checkCollision.up = false;
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);

			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
					jump.play();
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}
	}