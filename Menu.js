var Menu = {
	preload: function() {

		game.load.image('Menu', 'assets/Menu.png');
		game.load.image('stage1', 'assets/Stage1.png');

		game.load.audio('mm', 'audio/Menu.mp3');
	},

	create: function() {
		
		mm = game.add.audio('mm');
		mm.play();

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		gane.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		gane.physics.startSystem(Phaser.Physics.ARCADE);

		var menuPic = game.add.sprite(128, 60, 'Menu');

		var click1 = game.add.button(50, 50, 'stage1', function() {
			game.state.start('stage1');
			mm.stop();
		});
		click1.anchor.set(0.5, 0.5);
	}
}