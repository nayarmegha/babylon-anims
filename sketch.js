var canvas = document.getElementById("renderCanvas");
var meshlist = [];
var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    
    

    var newbox1 = createBox(0, 1, 0, 1.5, 2,2);
    newbox1.material = hexMat('#88898f');
     
    var newbox2 = createBox(0, 2, 0, 1, 1,1)
    newbox2.material = fileMat('deadface.png');

    var newbox3 = createBox(1, 1.5, -1, 0.5, 1,0.5)
    newbox3.material = hexMat('#88898f');
     
    var newbox4 = createBox(-1, 1.5, -1, 0.5, 1,0.5)
    newbox4.material = hexMat('#88898f');

    var newbox5 = createBox(0.5, 0, -1, 0.5, 0.5,1)
    newbox5.material = hexMat('#88898f');
    
    var newbox6 = createBox(-0.5, 0, -1, 0.5, 0.5,1)
    newbox6.material = hexMat('#88898f');

    var boxx = new meshModel('haunted_house.glb', 6, -5, 1, 0)
    var heart1 = new meshModel('emoji_heart.glb', 2, 2, 4, -4)
    var heart2 = new meshModel('emoji_heart.glb', 2, 3, 4, -4)
    var heart3 = new meshModel('emoji_heart.glb', 2, 4, 4, -4)
    var heart4 = new meshModel('emoji_heart.glb', 2, 2.5, 3.5, -4)
    var heart5 = new meshModel('emoji_heart.glb', 2, 3.5, 3.5, -4)
    var heart6 = new meshModel('emoji_heart.glb', 2, 3, 3, -4)
    var heart7 = new meshModel('emoji_heart.glb', 2, 2.5, 4.5, -4)
    var heart8 = new meshModel('emoji_heart.glb', 2, 3.5, 4.5, -4)


    var anim1 = {subj : newbox1.position, prop: 'y', val : 5};
    var anim2 = {subj : newbox1.material, prop: 'alpha', val : 0};

    var anim3 = {subj : newbox2.position, prop: 'y', val : 5};
    var anim4 = {subj : newbox2.material, prop: 'alpha', val : 0};


    var anim5 = {subj : newbox3.position, prop: 'y', val : 5};
    var anim6 = {subj : newbox3.material, prop: 'alpha', val : 0};

    var anim7 = {subj : newbox4.position, prop: 'y', val : 5};
    var anim8 = {subj : newbox4.material, prop: 'alpha', val : 0};

    var anim9 = {subj : newbox5.position, prop: 'y', val : 5};
    var anim10 = {subj : newbox5.material, prop: 'alpha', val : 0};

    var anim11 = {subj : newbox6.position, prop: 'y', val : 5};
    var anim12 = {subj : newbox6.material, prop: 'alpha', val : 0};

    var anim = [anim1, anim2, anim3, anim4, anim5, anim6, anim7, anim8, anim9, anim10, anim11, anim12]


    animate(anim, scene, 10);


    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 10}, scene);
    ground.material = hexMat('#6C6A61')

     return scene;
};
window.initFunction = async function () {
    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
};
initFunction().then(() => {
    sceneToRender = scene
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});


