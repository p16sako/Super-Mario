var Menu = {
	function preload() {

		game.load.image('menu', 'assets/menu.png');
		game.load.image('Level1', 'assets/Level1.png');

		game.load.audio('menuaudio', 'audio/Menu.mp3');
	}

	function create() {
		menuaudio = game.add.audio('menuaudio');
		menuaudio.play();

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		gane.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		gane.physics.startSystem(Phaser.Physics.ARCADE);

		menupic = game.add.sprite(256, 240, 'menu');

		//click1 = game.add.button(80, 80, 'Level1.png', function() {
			//game.state.start('Level1');
		//});
	}
}