class Mesh
{
    constructor (gl)
    {
	this.vertices = new Array ();
	this.indices = new Array ();

	this.vao = gl.createVertexArray ();
	gl.bindVertexArray (this.vao);

	this.pbo = gl.createBuffer ();
	gl.bindBuffer (gl.ARRAY_BUFFER, this.pbo);

	this.ebo = gl.createBuffer ();
	gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.ebo);

	gl.bindBuffer (gl.ARRAY_BUFFER, this.pbo);
	gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
    }

    setup (gl)
    {
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (this.vertices), gl.STATIC_DRAW);
	gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Uint32Array (this.indices), gl.STATIC_DRAW);
    }
    
    render (gl)
    {
	gl.enableVertexAttribArray (0);
	gl.bindVertexArray (this.vao);

	// gl.drawElements (gl.POINTS, this.indices.length, gl.UNSIGNED_INT, 0);
	gl.drawArrays (gl.POINTS, 0, 3);
    }
}
