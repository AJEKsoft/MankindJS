const CHUNK_DIM = 8;
const CHUNK_SIZE = CHUNK_DIM * CHUNK_DIM * CHUNK_DIM

class Voxel
{
    constructor (color)
    {
	this.color = color;	// 0-255
    }
}

class Chunk
{
    constructor ()
    {
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
	    this.blocks[i] = new Voxel(
		Math.random () * 255
	    );
	}
    }
}
