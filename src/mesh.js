class VertexMesh
{
    constructor (gl)
    {
	this.vertices = new Array ();

	this.vao = gl.createVertexArray ();
	gl.bindVertexArray (this.vao);

	this.vbo = gl.createBuffer ();
	gl.bindBuffer (gl.ARRAY_BUFFER, this.vbo);

	gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray (0);
    }

    setup (gl)
    {
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (this.vertices), gl.STATIC_DRAW);
    }

    render (gl)
    {
	gl.bindVertexArray (this.vao);
	gl.drawArrays (gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}

class IndexMesh extends VertexMesh
{
    constructor (gl)
    {
	super (gl);

	this.indices = new Array ();

	this.ebo = gl.createBuffer ();
	gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    }

    setup (gl)
    {
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (this.vertices), gl.STATIC_DRAW);
	gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Uint32Array (this.indices), gl.STATIC_DRAW);
    }

    render (gl)
    {
	gl.bindVertexArray (this.vao);
	gl.drawElements (gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0);	
    }
}

class ChunkMesh extends VertexMesh
{
    constructor (gl)
    {
	super (gl);
	
	gl.bindBuffer (gl.ARRAY_BUFFER, this.vbo);
	gl.enableVertexAttribArray (0);
	gl.vertexAttribIPointer (0, 3, gl.INT, false, 0, 0);
	gl.vertexAttribDivisor (0, 0);

	this.colors = new Array ();
	
	this.cbo = gl.createBuffer ();
	gl.bindBuffer (gl.ARRAY_BUFFER, this.cbo);
	gl.enableVertexAttribArray (1);
	gl.vertexAttribIPointer (1, 1, gl.UNSIGNED_BYTE, false, 0, 0);
	gl.vertexAttribDivisor (1, 1);
    }

    generate (gl, chunk)
    {
	for (let x = 0; x < CHUNK_DIM; ++x)
	{
	    for (let y = 0; y < CHUNK_DIM; ++y)
	    {
		for (let z = 0; z < CHUNK_DIM; ++z)
		{
		    let block = chunk.getBlock (x, y, z);
		    this.colors.push (block.color);
		}
	    }
	}

	this.setup (gl);
    }

    setup (gl)
    {
	gl.bindBuffer (gl.ARRAY_BUFFER, this.vbo);
	gl.bufferData (gl.ARRAY_BUFFER, new Vec3 (0, 0, 0), gl.STATIC_DRAW);
	gl.bindBuffer (gl.ARRAY_BUFFER, this.cbo);
	gl.bufferData (gl.ARRAY_BUFFER, new Uint8Array (this.colors), gl.STATIC_DRAW);
    }
    
    render (gl)
    {
	gl.bindVertexArray (this.vao);
	gl.drawArraysInstanced (gl.POINTS, 0, 1, CHUNK_SIZE);
    }    
}
