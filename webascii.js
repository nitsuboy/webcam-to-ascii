var video = document.getElementById('videoCam');
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const gradient = "@%#+=*-:._____".replaceAll('_', '\u00A0')
// For the reverse mode
//const gradient = "@%#+=*-:._____".split("").reverse().join("").replaceAll('_', '\u00A0')

const w = 80
const h = w*.67
const m = 100

var counter = 0

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
                // For the rainbow mode
                //ctx2.fillStyle = "hsl("+Math.floor(((i / w) * 360)+counter)+", 100%, 50%)";
                ctx2.font = "110px Comic Sans MS";
                ctx2.fillText(get(avg), i*m, j*m);
            }
        }
        counter++
        if(counter  > 360) counter = 0
    }, 10);
}

canvas2.height = m*h
canvas2.width = m*w

draw()