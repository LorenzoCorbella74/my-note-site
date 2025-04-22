
# NOTES: 

- ` mesh.isVisible = false` per non renderizzare elementi
- `mesh.freezeWorldMatrix()`
    Every mesh has a world matrix to specify its position / rotation / scaling. 
    This matrix is evaluated on every frame. You can improve performances by freezing  this matrix. 
-  uso di `mesh.createInstance("nome-mesh")` per creare delle istanze (saranno automaticamente aggiunte alla scena della mesh clonata di partenza...)
- `material.freeze()` si avverte babylon che è un materiale statico

# GUI
Uso di elementi di GUI trattati al pari di mesh
```javascript

 const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");

 // e poi 
const text2 = new BABYLON.GUI.TextBlock();
text2.text = "Game Over";
text2.color = "White";
text2.fontSize = 64;
text2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
text2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
text2.isVisible = false;
advancedTexture.addControl(text2);

```

L'arma è un figlio della camera;
```javascript
const gun = new BABYLON.TransformNode();
gun.parent = camera;
```

l'update della creatura (senza collisioni) e relative animazioni:
```javascript
 let targetVec;
	    let targetVecNorm;
	    let initVec;
	    let distVec;
	    let safeDist = 100;
	    let minDist = 9;
	    let lookAtVec

		function creatureUpdate() {
			targetVec = camera.position.clone();
			lookAtVec = targetVec;
			lookAtVec.y = 0;
			
			initVec = creature.position.clone();
			distVec = BABYLON.Vector3.Distance(targetVec, initVec); // distanza

			targetVec = targetVec.subtract(initVec);
			targetVecNorm = BABYLON.Vector3.Normalize(targetVec);

			if (distVec > minDist && !creatureDead && distVec < safeDist){
	    		distVec -= 0.3;
	    		creature.translate(targetVecNorm,0.3,BABYLON.Space.WORLD);
	    		creature.lookAt(lookAtVec);
	    		if(creatureRoar.isPlaying == false) {
	    			creatureRoar.play();
	        	}
	        	if(!scene.getAnimationGroupByName("Run").isPlaying) {
	        		scene.stopAllAnimations();
		    		scene.getAnimationGroupByName("Run").play(true);
		    	}
	    	}
	    	if(distVec < 12 && !creatureDead) {
	    		playerHealth -= 0.05;
	    	}
	    	if(distVec > safeDist) {
	    		if(scene.getAnimationGroupByName("Run").isPlaying) {
	    			scene.stopAllAnimations();
	    			scene.getAnimationGroupByName("idle").play(true);
	    			// scene.animationGroups[4].play(true);
	    		}
	    	}
		};
```


# Collisioni
Si applicano i seguenti:
```Javascript
// si imposta l'ellissoide del player
camera.ellipsoid = new BABYLON.Vector3(2, 4, 2);
camera.ellipsoidOffset = new BABYLON.Vector3(0, 4, 0);
camera.speed = 0.8;


// si imposta la gravità per le entità interessate
scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
camera.applyGravity = true;
creature.applyGravity = true;

// applicano le Collisions alla scena, camera e entità interessate
scene.collisionsEnabled = true;
camera.checkCollisions = true;
forestGround1.checkCollisions = true;

barrel2.visibility = 0.9;       // imposta la trasparenza della mesh
barrel2.showBoundingBox = true; // per impostare il boung box
```


Per lo shoot si usa il raycasting:
```Javascript
function shoot () {
    if (HASGUN) {
        const ray = camera.getForwardRay(80);
        const pickResult = scene.pickWithRay(ray);
        // console.log(pickResult.pickedMesh.name);
        gunshot.play();
        scene.beginAnimation(gun, 0, 6, true);
        if (pickResult.pickedMesh.name == "creature") {
            if (!creatureDead) {
                if (creatureHealth <= 0) {
                    creatureDead = true;
                    // scene.animationGroups[1].pause();
                    scene.stopAllAnimations();
                    scene.getAnimationGroupByName("death").play(false);
                } else {
                    creatureHealth -= 1;
                }
            }
        } else if (pickResult.pickedMesh.name == "ghost") {
            pickResult.pickedMesh.health -= 1;
            if (pickResult.pickedMesh.health <= 0) {
                pickResult.pickedMesh.isDead = true;
            }
        }
    }
}

// mentre per l'evento che lo scatena:
scene.onPointerDown = function (evt) {
    //true/false check if we're locked, faster than checking pointerlock on each single click.
    if (!isLocked) {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    }
    if (!PAUSE) {
        canvas.addEventListener("mousedown", shoot);
        canvas.addEventListener("keypress", Walk);
    }
    else if (PAUSE) {
        canvas.removeEventListener("mousedown", shoot);
        canvas.removeEventListener("keypress", Walk);
    }
};

// Event listener when the pointerlock is updated 
// (or removed by pressing ESC for example).
const pointerlockchange = function () {
    const controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;

    // If the user is already locked
    if (!controlEnabled) {
        // camera.detachControl(canvas);
        isLocked = false;
        canvas.removeEventListener("mousedown", shoot);
    } else {
        //camera.attachControl(canvas);
        isLocked = true;
    }
};

// Attach events to the document
document.addEventListener("pointerlockchange", pointerlockchange, false);
document.addEventListener("mspointerlockchange", pointerlockchange, false);
document.addEventListener("mozpointerlockchange", pointerlockchange, false);
document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

```

# UPDATE del gioco
L'aggiornamento delle varie entità è fatto all'interno del `.registerBeforeRender()` hook:
```JAvascript
scene.registerBeforeRender(function () {

    if (!GAMEOVER) {
        if (!dialogue.isPlaying) {
            PAUSE = false;
            openingText.isVisible = false;
            if (light1.intensity <= 0.7 && light2.intensity <= 0.9) {
                light1.intensity += 0.002;
                light2.intensity += 0.002;
            }
        }else {
            PAUSE = true;
            openingText.isVisible = true;
        }
    }

    if (!PAUSE) {
        canvas.addEventListener("keypress", Walk);
        camera.attachControl(canvas, true);
        scope2.isVisible = true;
        scope.isVisible = true;
        creatureUpdate();
        updateHealth();
        ghostUpdate();
        updateTime();
        doorCheck();
        updatePlayer();
    } else if (PAUSE) {
        camera.detachControl(canvas);
        canvas.removeEventListener("keypress", Walk);
        scope2.isVisible = false;
        scope.isVisible = false;
    }
    if (GAMEOVER) {
        if (toBeContinued) {
            text3.isVisible = true;
        }else {
            text2.isVisible = true;
        }
        if (light1.intensity >= 0 && light2.intensity >= 0) {   // si diminuiscono le luci della scena
            light1.intensity -= 0.008;
            light2.intensity -= 0.008;
        }
        sceneRemove += engine.getDeltaTime();   // si recupera lo step ms between two frames
        if (sceneRemove >= 5000) {              // dopo 5 secondi
            dispose = true;                     // indica la fine del gioco dispose= disfarsi
            console.log("End");
        }
    }
});

```
Da notare i 4 stati del gioco, se il giocatore sta giocando o è in pausa e se è gameover o no.
L'altro hook che provvede a startare il gameLoop è `.executeWhenReady()` legato al flag dispose:
```Javascript
scene.executeWhenReady(function () {
    engine.runRenderLoop(function () {
        if (dispose == false) {
            scene.render();
        } else {
            scene.dispose();                // uccide l'istanza della babylon scene
            window.location.reload(false);  // ricarica la pagina dalla cache
        }
    });
});
```

Da notare che c'è anche il metodo alla rimozione della scena:
```Javascript
scene.onDispose =()=> {
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointermove", onPointerMove);
    while (document.getElementById("myout")) {
        document.getElementById("myout").parentNode.removeChild(document.getElementById("myout"));
    }
}
```