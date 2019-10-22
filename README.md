Requirements

1. The game must be designed for an HTML Canvas using Javascript

You are a face, and when you scream you move up (vertically) on the scream depending on the volume of your voice.  Horizontally, there are barriers that approach you, like in flappy bird, with a hole in them that can fit the face.  The aim of the game is to pass through as many barriers as possible, whilst screaming, before you inevitably collide into a wall, in which case I would like the face to drop to the floor in a bloodied state and die.  

2. The game must have levels, controls, and NOT be a copy of an easily Googleable game (by Mr. Theiss and Mr. Stout)

Each level will consist of the barriers moving faster towards the player.  

3. The game must have multiple objectives

The objective will be beating high scores on a leaderboard.  The score is kept at the top of the screen as the face surpasses the barriers.  

Objective 2:  Collecting a certain number of points to earn different skins.  Each skin is a new spritesheet that can only be earned by having a certain score stored in cookies. 

4. The game must be designed to support both single and multiplayer modes on the same laptop

The game is multiplayer by having characters switch off between barriers.  It becomes a collaborative game, where the face changes color after each barrier, where ideally two players have to collaborate to pass the barriers.   To change color, the spritesheet is replaced by sprites with the p2 suffix in the git repo.  

5. The game must have objects, characters, and/or sprites

The objects include: the main character and the barriers.  The main character has sprites for his different states.  

The Barriers:
The barriers will be two blocks with a gap between them, approximately 1.5x the size of the main character
The width of the blocks should increase after each stage, perhaps 2x the stage level.
The speed of the walls should also increase each stage, 1.25x the stage value.  
The barriers should be borderless rounded rectangles of this color: #ff9fe9

The Character:
The character should be running on the ground when volumes of zero are detected
When the transition of one’s voice is not smooth, e.g. they go from quiet to screaming in seconds, the face should still animate!  It should just quickly make an ascent.  
The character should be scaled up from his current state, taking up at least 75 pixels vertically.  
His states should be coded for in the skreem.js file, where upon collision with a barrier, his sprite should change to damaged, he should fall, and finally trigger the death animation sprite included.  
During two player mode, the skin of the sprite should change to the p2 sprites included.  

6. Must have an overlay or some way of viewing game states during play (having score on screen does not count)

Starting mechanic:
The game should have an overlay that says “Allow Microphone access?” before the game begins.
Once access is enabled, there should be a large button, whose image file is included “start”.  Below, there is the p2 mode button included as well.  If this button is pressed, than two player settings are enabled.  
There should also be the latest high score between these two buttons.  
See sketches for more info!

The number of meters ran as well as the decibel input will be displayed at the top right hand corner.

The stage level will be displayed at the top left of the screen.  Stages are batches of three barriers crossed.  

7. The game must have one experimental feature

The experimental feature, “Pitch Mode” involves using pitch instead of volume to
