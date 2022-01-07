function $ (id)
{
    return document.getElementById (id);
}

class Game
{
    constructor ()
    {
	this.canvas = $ ("canvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;

	// GL crap.
	
	this.gl = canvas.getContext ("webgl2");

	if (this.gl == null)
	{
	    console.log ("Unable to initialize WebGL.");
	}

	this.gl.enable (this.gl.DEPTH_TEST)
	this.gl.clearColor (0.2, 0.4, 0.6, 1.0);

	this.camera = new Camera ();
	this.camera.position = new Vec3(
	    0.0, 0.0, -5.0
	);

	// The programs, shaders, etc, probably don't even have to be
	// functions---maybe except for Program.
	
	this.program = new Program (this.gl);
	this.program.add (this.gl, new Shader (
	    this.gl, this.gl.VERTEX_SHADER, $ ("default.vs").text.trim ()
	));

	this.program.add (this.gl, new Shader (
	    this.gl, this.gl.FRAGMENT_SHADER, $ ("default.fs").text.trim ()
	));

	this.program.link (this.gl);
	this.program.use (this.gl);
	
	this.program.setMat4 (
	    this.gl, "projection", this.camera.projection (this.gl)
	);

	this.program.setMat4 (
	    this.gl, "model", new Mat4 ()
	);

	let chunk = new Chunk ();
	chunk.random ();
	
	this.chunkmesh = new ChunkMesh (this.gl);
	this.chunkmesh.generate (this.gl, chunk);

	// Done with GL crap.

	this.canvas.addEventListener ("click", this.onclick.bind (this), true);
	this.canvas.addEventListener ("mousemove", this.onmousemove.bind (this), true);

	// This oughta be done differently...
	window.addEventListener ("keyup", this.onkeyup.bind (this), true);
	window.addEventListener ("keydown", this.onkeydown.bind (this), true);

	this.wpressed = false;
	this.spressed = false;
	this.apressed = false;
	this.dpressed = false; 	// :-(
	
	this.lastTime = 0;
	this.deltaTime = 0;
	
	this.request = requestAnimationFrame (this.loop.bind (this));
    }

    loop (timestamp)
    {
	this.update (timestamp);
	this.render ();
	this.request = requestAnimationFrame (this.loop.bind (this));
    }

    update (timestamp)
    {
	this.deltaTime = (timestamp - this.lastTime);
	this.lastTime = timestamp;

	if (this.wpressed) {
	    this.camera.position = this.camera.position.add (
		this.camera.direction.multiply (new Vec3 (this.deltaTime / 100))
	    );
	} else if (this.spressed) {
	    this.camera.position = this.camera.position.subtract (
		this.camera.direction.multiply (new Vec3 (this.deltaTime / 100))
	    );	    
	}

	if (this.dpressed) {
	    this.camera.position = this.camera.position.add (
		this.camera.right.multiply (new Vec3 (this.deltaTime / 100))
	    );	    
	} else if (this.apressed) {
	    this.camera.position = this.camera.position.subtract (
		this.camera.right.multiply (new Vec3 (this.deltaTime / 100))
	    );	    	    
	}
    }
    
    render ()
    {
	this.gl.clear (this.gl.COLOR_BUFFER_BIT);

	this.program.setMat4 (
	    this.gl, "view", this.camera.view
	);

	this.program.setVec3 (
	    this.gl, "eye", this.camera.position
	);
	
	this.chunkmesh.render (this.gl);
    }

    onclick (event)
    {
	this.canvas.requestPointerLock ();
    }

    onmousemove (event)
    {
	let x = event.movementX;
	let y = event.movementY;

	this.camera.rotation.x -= x * (this.deltaTime / 10000);
	this.camera.rotation.y -= y * (this.deltaTime / 10000);
    }

    onkeyup (event)
    {
	switch (event.keyCode)
	{
	    case 87:
	    this.wpressed = false;
	    break;
	    case 83:
	    this.spressed = false;
	    break;
	    case 65:
	    this.apressed = false;
	    break;
	    case 68:
	    this.dpressed = false;
	    break;
	}
    }

    onkeydown (event)
    {
	switch (event.keyCode)
	{
	    case 87:
	    this.wpressed = true;
	    break;
	    case 83:
	    this.spressed = true;
	    break;
	    case 65:
	    this.apressed = true;
	    break;
	    case 68:
	    this.dpressed = true;
	    break;
	}
    }
}

let game;

window.onload = function ()
{
    game = new Game ();
};
