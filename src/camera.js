class Camera
{
    constructor()
    {
	this.position = new Vec3 ();
	this.rotation = new Vec3 ();
    }

    get forward ()
    {
	return new Vec3 (
	    Math.sin (this.rotation.x), 0, Math.cos (this.rotation.x)
	);
    }

    get lookat ()
    {
	return new Vec3 (
	    Math.sin (this.rotation.x) * Math.cos (this.rotation.y),
	    Math.sin (this.rotation.y),
	    Math.cos (this.rotation.x) * Math.cos (this.rotation.y)
	).normalized;
    }

    get right ()
    {
	return this.lookat.cross (this.up).normalized;
    }

    get up ()
    {
	return new Vec3 (0.0, 1.0, 0.0);
    }
    
    get view ()
    {
	return Mat4LookAt (
	    this.position, this.position.add (this.lookat), this.up
	);
    }

    projection (gl)
    {	
	// Make this customizable later, i.e. the FOV and the near and
	// far planes.
	return Mat4Perspective (
	    90, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.01, 1000.0
	);
    }
}
