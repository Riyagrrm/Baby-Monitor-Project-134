status1 = ""
song = "";
object = []

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded() {
    console.log("modelLoaded")
    status1 = true;
}

function draw() {
    image(video, 0, 0, 380, 380)
    if (status1 != "") {
        r = random(0, 255)
        g = random(0, 255)
        b = random(0, 255)
        objectDetector.detect(video, gotResult)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected"
            document.getElementById("status1").innerHTML = "objects_detected: " + object.length
            fill(r, g, b)
            percent = Math.floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15)
            noFill()
            stroke(r, g, b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
        }
        if (objects[i].label == "person") {
            document.getElementById("status").innerHTML = "Baby Found";
            console.log("stop")
            song.stop()
        } else {
            document.getElementById("status1").innerHTML = "Baby Not Found";
            console.log("play")
            song.play()
        }
    }
    if (objects.length == 0) {
        document.getElementById("status1").innerHTML = "Baby Not Found";
        console.log("play")
        song.play()
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    object = results
}