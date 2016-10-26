uniform float time;

varying vec2 vUv;

void main( void ) {
    float a = max( sin( length(vUv - vec2(0.5, 0.5)) * 50.0 + 20.0 * time), 0.0 );
    vec3 color = vec3( a );
    gl_FragColor = vec4( color, 1.0 );
}
