class VertexMesh
{
    constructor (gl)
    {
	this.vertices = new Array ();

	this.vao = gl.createVertexArray ();
	gl.bindVertexArray (this.vao);

	this.vbo = gl.createBuffer ();
	gl.bindBuffer (gl.ARRAY_BUFFER, this.vbo);

	gl.enableVertexAttribArray (0);
	gl.vertexAttribPointer (0, 3, gl.FLOAT, false, 0, 0);
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

class CubeMesh extends IndexMesh
{
    constructor (gl)
    {
	super (gl);

	this.vertices = [
	    -1, -1, -1,
	    +1, -1, -1,
	    +1, +1, -1,
	    -1, +1, -1,
  	    -1, -1, +1,
	    +1, -1, +1,
	    +1, +1, +1,
	    -1, +1, +1
	];

	this.indices = [
	    0, 1, 3, 3, 1, 2,
	    1, 5, 2, 2, 5, 6,
	    5, 4, 6, 6, 4, 7,
	    4, 0, 7, 7, 0, 3,
	    3, 2, 7, 7, 2, 6,
	    4, 5, 0, 0, 5, 1
	];

	this.setup (gl);
    }
}


class ChunkMesh extends VertexMesh
{
    constructor (gl)
    {
	super (gl);

	this.colors = new Array ();

	// this.cbo = gl.createBuffer ();
	// gl.bindBuffer (gl.ARRAY_BUFFER, this.cbo);

	// gl.enableVertexAttribArray (1);
	// gl.vertexAttribPointer (1, 3, gl.FLOAT, false, 0, 0);
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
		    
		    this.vertices.push (x, y, z);
		    this.colors.push (block.color.x, block.color.y, block.color.z);
		}
	    }
	}

	this.setup (gl);
    }

    setup (gl)
    {
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (this.vertices), gl.STATIC_DRAW);
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array (this.colors), gl.STATIC_DRAW);
    }
    
    render (gl)
    {
	gl.bindVertexArray (this.vao);
	gl.drawArrays (gl.POINTS, 0, this.vertices.length / 3);
    }    
}
