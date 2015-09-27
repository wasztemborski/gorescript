GS.MapScripts.floor6 = function(gridObjectLibrary) {
	GS.MapScript.apply(this, arguments);

	this.mapName = "floor6";
	this.maxSecrets = 1;
	this.musicTrack = "angry_robot_3";
};

GS.MapScripts.floor6.prototype = GS.inherit(GS.MapScript, {
	constructor: GS.MapScripts.floor6,

	init: function() {
	
    this.switch1 = this.lib.switches[775];
    this.elevator1 = this.lib.elevators[1345];
    this.elevator2 = this.lib.elevators[1347];
    this.elevator3 = this.lib.elevators[1348]; //A
    this.elevator4 = this.lib.elevators[1346];
    
    this.exitDoor = this.lib.doors[1807];
    this.toiletDoor = this.lib.doors[1841];
    this.corridorDoor1 = this.lib.doors[1681];
    this.corridorDoor2 = this.lib.doors[1683];
    this.corridorDoor3 = this.lib.doors[1375];
    this.corridorDoor4 = this.lib.doors[1373];    
    this.secretDoor = this.lib.doors[1837];    
    
    
    this.techDoor1 = this.lib.doors[1561];
    this.techDoor2 = this.lib.doors[1558];
    	
	this.elevator1Door = this.lib.doors[1806];
    this.elevator2Door = this.lib.doors[1808];
    this.elevator3Door = this.lib.doors[1363];
    this.elevator4Door = this.lib.doors[1372];
    
    this.fedsDoor = this.lib.doors[1684];
    
	
    this.elevator1.automatic = false;
    this.elevator1.speed = 1;
    this.elevator2.automatic = false;
    this.elevator2.speed = 1;
    this.elevator3.automatic = false;
    this.elevator3.speed = 1;
    this.elevator4.automatic = false;
    this.elevator4.speed = 1;
  
    this.exitDoor.automatic = false;
    this.techDoor1.automatic = false;
    this.techDoor2.automatic = false;
    
    this.secretDoorIsOpen = false;
	
	},

	onZoneEnter: function(zone) {
	
    if (zone.name == "corridor") {
	
			this.corridorDoor1.open();
			this.corridorDoor2.open();
			this.corridorDoor3.open();
			this.corridorDoor4.open();			
		}
		else if (zone.name == "entry") {
	
      this.toiletDoor.open();
      this.elevator1.goUp();
			this.elevator2.goUp();
			this.elevator3.goUp();
			this.elevator4.goUp();
						
			this.elevator1Door.openSilent();
			this.elevator2Door.openSilent();
			this.elevator3Door.openSilent();
			this.elevator4Door.openSilent();

		}	
		else if (zone.name == "exit") {
	
      this.mapWon = true
		}		
	},

	onZoneLeave: function(zone) {
	},

	onItemPickup: function(item) {
		/*
		if (item === this.shotgun) {
			this.crossElevator.goUp();
		}
		*/
	},

	onPlayerOpenDoor: function(door) {
    
    if (door  === this.fedsDoor)
    {
      this.techDoor1.openSilent();
			this.techDoor2.openSilent();
    }
    if (door  === this.secretDoor && !this.secretDoorIsOpen)
    {
        this.foundSecret();
        this.secretDoorIsOpen = true;
    }
	},

	onSwitchStateChange: function(switchObj) {		
	
    if (switchObj === this.switch1) 
    {
      this.exitDoor.openSilent();      
    }
	},
});