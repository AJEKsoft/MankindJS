const CHUNK_DIM = 32;
const CHUNK_SIZE = CHUNK_DIM * CHUNK_DIM * CHUNK_DIM

// Voxels store color as one byte per vertex, so 3 bits for r, 3 bits
// for g, and 2 bits for b.
function color8 (r, g, b)
{
    return ((r & 0x7) << 0) | ((g & 0x7) << 3) | ((b & 0x3) << 6);
}

class Voxel
{
    constructor (color)
    {
	this.color = color;	// 0–255
    }
}

class Chunk
{
    constructor (gl, position)
    {
	this.position = position;
	this.mesh = new ChunkMesh (gl, this);
	this.blocks = new Array (CHUNK_SIZE);
    }

    getBlock (x, y, z)
    {
	return this.blocks [x + CHUNK_DIM * (y + CHUNK_DIM * z)]
    }

    random ()
    {
	for (let i = 0; i < CHUNK_SIZE; ++i)
	{
	    this.blocks[i] = new Voxel (color8 (
		Math.floor (Math.random () * 8),
		Math.floor (Math.random () * 8),
		Math.floor (Math.random () * 4)
	    ));
	}
    }
}
