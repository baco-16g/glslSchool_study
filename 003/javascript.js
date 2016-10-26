// ============================================================================
// ShaderMaterial によるカスタムシェーダの利用
// ============================================================================

(function(){
    'use strict';

    // ----------------------------------------------------------------------------
    // シーンとカメラの生成
    // ----------------------------------------------------------------------------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 50;

    // ----------------------------------------------------------------------------
    // レンダラーの設定
    // ----------------------------------------------------------------------------
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    // マウスで視点移動するためのカメラのコントローラの設定
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    // ----------------------------------------------------------------------------
    // フィールドの生成
    // ----------------------------------------------------------------------------
    var envGeometry = new THREE.SphereGeometry( 100, 100, 100 );
    var envMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
      specular: 0xffffff,
      shininess: 30,
      side: THREE.BackSide
    });
    var envMesh = new THREE.Mesh( envGeometry, envMaterial)
    scene.add( envMesh );

    // ----------------------------------------------------------------------------
    // オブジェクトの生成
    // ----------------------------------------------------------------------------
    var geometry = new THREE.SphereGeometry( 10, 100, 100 );
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


    // ----------------------------------------------------------------------------
    // ライティングの設定
    // ----------------------------------------------------------------------------
    var ambientLight = new THREE.AmbientLight( 0xdddddd );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
    directionalLight.position.set( 0, 100, 30 );
    scene.add( directionalLight );

    // var pointLight = new THREE.PointLight(0xeeee00, 50, 80);
    // pointLight.position.set( 0, -100, 0 );
    // scene.add( pointLight );

    // ----------------------------------------------------------------------------
    // ポストエフェクトの生成
    // ----------------------------------------------------------------------------
    // 1パス目で通常のシーンの描画を行う
    var composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) );

    // // 2パス目でドットのエフェクト
    // var dotScreenEffect = new THREE.ShaderPass( THREE.DotScreenShader );
    // dotScreenEffect.uniforms.scale.value = 10.0;
    // // dotScreenEffect.renderToScreen = true;// 最後のパスでは renderToScreen が必須！
    // composer.addPass( dotScreenEffect );

    // 3パス目でRGBごとにずらすエフェクト
    var rgbShiftEffect = new THREE.ShaderPass( THREE.RGBShiftShader );
    rgbShiftEffect.uniforms.amount.value = 0.01;
    rgbShiftEffect.renderToScreen = true;// 最後のパスでは renderToScreen が必須！
    composer.addPass( rgbShiftEffect );

    // ----------------------------------------------------------------------------
    // レンダー生成
    // ----------------------------------------------------------------------------
    var render = function (timestamp) {
        requestAnimationFrame( render );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        material.uniforms.time.value = timestamp * 0.001;

        controls.update();

        // ポストプロセスでは、renderer.render( scene, camera ) ではなく composer.render() を使う
        composer.render();
    };

    render();
})();
