// ============================================================================
// ShaderMaterial によるカスタムシェーダの利用
// ----------------------------------------------------------------------------

(function(){
    'use strict';

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 2;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.ShaderMaterial({
        uniforms: {
            // 経過時間のパラメータを float 型で渡すという宣言
            time: { type: 'f', value: 0.0 },
        },
        vertexShader: WE.vs,// 頂点シェーダを文字列で指定
        fragmentShader: WE.fs,// フラグメントシェーダを文字列で指定
    });
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );



    var ambientLight = new THREE.AmbientLight( 0x999999 );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 1, 2, 1 );
    scene.add( directionalLight );

    var render = function (timestamp) {
        requestAnimationFrame( render );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        material.uniforms.time.value = timestamp * 0.001;

        renderer.render( scene, camera );
    };

    render();
})();
