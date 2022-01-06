class Shader
{
    constructor (gl, type, source)
    {
	this.id = gl.createShader (type);
	this.source = source;
	
	gl.shaderSource (this.id, source);
	gl.compileShader (this.id);

	if (!gl.getShaderParameter (this.id, gl.COMPILE_STATUS))
	{
	    console.log (gl.getShaderInfoLog (this.id));
	    gl.deleteShader (this.id);
	}
    }
}

class Program
{
    constructor (gl)
    {
	this.id = gl.createProgram ();
    }

    add (gl, shader)
    {
	gl.attachShader (this.id, shader.id);
    }

    link (gl)
    {
	gl.linkProgram (this.id);

	if (!gl.getProgramParameter (this.id, gl.LINK_STATUS))
	{
	    console.log (gl.getProgramInfoLog (this.id));
	}
    }

    setVec3 (gl, name, vec)
    {
	gl.uniform3fv (gl.getUniformLocation (this.id, name), vec.raw)
    }
    
    setMatrix4 (gl, name, matrix)
    {
	gl.uniformMatrix4fv (gl.getUniformLocation (this.id, name), false, matrix.raw);
    }
    
    use (gl)
    {
	gl.useProgram (this.id);
    }
}
