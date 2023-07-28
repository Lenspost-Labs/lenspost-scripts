let template = (image) => {
    return {
        "width": 1080,
        "height": 1080,
        "fonts": [],
        "pages": [
            {
                "id": "OYZxJS0CTK",
                "children": [
                    {
                        "id": "3ukAckKH9d",
                        "type": "image",
                        "name": "",
                        "opacity": 1,
                        "animations": [],
                        "visible": true,
                        "selectable": true,
                        "removable": true,
                        "alwaysOnTop": false,
                        "showInExport": true,
                        "x": 0,
                        "y": 0,
                        "width": 1080,
                        "height": 1080,
                        "rotation": 0,
                        "blurEnabled": false,
                        "blurRadius": 10,
                        "brightnessEnabled": false,
                        "brightness": 0,
                        "sepiaEnabled": false,
                        "grayscaleEnabled": false,
                        "shadowEnabled": false,
                        "shadowBlur": 5,
                        "shadowOffsetX": 0,
                        "shadowOffsetY": 0,
                        "shadowColor": "black",
                        "shadowOpacity": 1,
                        "draggable": true,
                        "resizable": true,
                        "contentEditable": true,
                        "styleEditable": true,
                        "src": `${image}`,
                        "cropX": 0,
                        "cropY": 0,
                        "cropWidth": 1,
                        "cropHeight": 1,
                        "cornerRadius": 0,
                        "flipX": false,
                        "flipY": false,
                        "clipSrc": "",
                        "borderColor": "black",
                        "borderSize": 0,
                        "keepRatio": false
                    }
                ],
                "width": "auto",
                "height": "auto",
                "background": "white",
                "bleed": 0
            }
        ],
        "unit": "px",
        "dpi": 72
    }
}

const fs = require('fs')

let data = fs.readFileSync('s3url.json', 'utf8')
data = JSON.parse(data)


console.log(data)
let temp = []

let templateData = data.map((item) => {
    temp.push({
        name : item.split("/")[4] + " - " + item.split("/")[5] + " - " + (item.split("/")[6] ? item.split("/")[6].split(".")[0] : ""),
        data : template(item),
        image : item
    })
}
)

console.log("------------------")
console.log(temp)
console.log("------------------")

fs.writeFile('template.json', JSON.stringify(temp), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
}
);