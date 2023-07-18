const video = document.getElementById('videoCam');
const a = document.getElementById("ii");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
let gradient = "@%#+=*-:._____".replaceAll('_', '\u00A0')
let rain = false
let mode = "black"
// For the reverse mode
//const gradient = "@%#+=*-:._____".split("").reverse().join("").replaceAll('_', '\u00A0')

const w = 80
const h = w*.67
const m = 100

let counter = 0

navigator.mediaDevices.getUserMedia({
   video: true
})
.then((vidStream) => {
    video.srcObject = vidStream;
    teste = vidStream
    video.play();
})

function get(scale){
    return gradient[Math.floor(scale / 255 * (gradient.length - 1))]
}

function draw() {
    const temp = setInterval((e) => {
        ctx.drawImage(video,0,0,w,h)
        const frame = ctx.getImageData(0, 0, w, h);
        const data = frame.data;
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        for (let i = 0; i < frame.width; i++ ){
            for(let j = 0; j <frame.height; j++){
                const pi = (i + j* frame.width) *4
                const r = data[pi + 0]
                const g = data[pi + 1]
                const b = data[pi + 2]
                const avg = (r+g+b)/3
                if(rain){
                    ctx2.fillStyle = "hsl("+Math.floor(((i / w) * 360)+counter)+", 100%, 50%)";
                }
                else{
                    ctx2.fillStyle = mode;
                }
                ctx2.font = "110px Comic Sans MS";
                ctx2.fillText(get(avg), i*m, j*m);
            }
        }
        counter++
        if(counter  > 360) counter = 0
    }, 10);
}

window.onkeydown = e => {
    if(e.key == 'p'){
        var img = canvas2.toDataURL("image/png");
        a.style.display = "block"
        a.src = img
    }
}

var bright_switch = document.getElementById('bright');
var r_switch = document.getElementById('rainbow');

bright_switch.addEventListener('change',(e) => {
    if(e.target.checked == true){
        gradient = "@%#+=*-:._____".split("").reverse().join("").replaceAll('_', '\u00A0')
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        mode = "white"
    }else{
        gradient = "@%#+=*-:._____".replaceAll('_', '\u00A0')
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        mode = "black"
    }
})

r_switch.addEventListener('change',(e) => {
    if(e.target.checked == true){
        rain = true
    }else{
        rain = false
    }
})


canvas2.height = m*h
canvas2.width = m*w

draw()