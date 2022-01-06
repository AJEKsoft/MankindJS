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
	this.gl = canvas.getContext ("webgl2");

	if (this.gl == null)
	{
	    console.log ("Unable to initialize WebGL.");
	}

	this.gl.clearColor (0.2, 0.4, 0.6, 1.0);
	
	this.program = new Program (this.gl);
	this.program.add (this.gl, new Shader (
	    this.gl, this.gl.VERTEX_SHADER, $ ("default.vs").text.trim ()
	));

	this.program.add (this.gl, new Shader (
	    this.gl, this.gl.FRAGMENT_SHADER, $ ("default.fs").text.trim ()
	));

	this.program.link (this.gl);
	this.program.use (this.gl);
	
	this.mesh = new Mesh (this.gl);
	this.mesh.vertices.push (-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0, 0.0);
	this.mesh.indices.push (0, 1, 2);
	this.mesh.setup (this.gl);
	
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
    }
    
    render ()
    {
	this.gl.clear (this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.mesh.render (this.gl);
    }
}

let game;

window.onload = function ()
{
    game = new Game ();
};
