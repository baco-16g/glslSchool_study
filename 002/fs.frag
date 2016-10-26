uniform float time;

varying vec2 vUv;
varying float noise;

// ----------------------------------------------------------------------------
// サブ関数の宣言
// ----------------------------------------------------------------------------
float random( vec3 scale, float seed ){
    return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
}


// ----------------------------------------------------------------------------
// メイン関数の実行
// ----------------------------------------------------------------------------
void main() {

    // compose the colour using the UV coordinate
    // and modulate it with the noise like ambient occlusion
    vec3 color = vec3( 0.0, vUv * ( 1. - 2. * noise ) );
    gl_FragColor = vec4( color.rgb, 1.0 );

}
