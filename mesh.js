class Mesh
{
    constructor (gl)
    {
	this.vertices = new Array ();
	this.indices = new Array ();
    }

    setup (gl)
    {
	this.vao = gl.createVertexArray ();
	gl.bindVertexArray (this.vao);

	this.pbo = gl.createBuffer ();
	gl.bindBuffer (gl.ARRAY_BUFFER, this.pbo);
	gl.bufferData (gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
	
	this.ebo = gl.createBuffer ();
	gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.ebo);
	gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
	
	gl.enableVertexAttribArray (0);
	gl.bindBuffer (gl.ARRAY_BUFFER, this.pbo);
	gl.vertexAttribPointer (0, 1, gl.UNSIGNED_INT, false, 0, 0);
    }
    
    render (gl)
    {
	gl.bindVertexArray (this.vao);
	gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.ebo);

	gl.drawElements (gl.TRIANGLES, this.vertices.length, gl.UNSIGNED_INT, 0);
    }
}
