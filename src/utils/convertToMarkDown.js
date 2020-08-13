import * as showdown from 'showdown';

const converter = new showdown.Converter({'strikethrough': true});

export function ConvertToMarkDown(data) {
    if (data.length) {
        for (let item of data) {
            dataConverter(item)
        }
    } else {
        dataConverter(data)
    }
    return data

}

function dataConverter(data) {
    let dataToConvert = data.content ? data.content : data;
    for (let x in dataToConvert) {
        let isNum = /^\d*\.?\d+$/.test(dataToConvert[x]);
        let isUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(dataToConvert[x]);
        let isImg = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(dataToConvert[x]);
        if (isNum) {
            dataToConvert[x] = parseFloat(dataToConvert[x])
        } else if (!isUrl && !isNum && !isImg) {
            dataToConvert[x] = converter.makeHtml(dataToConvert[x])
        }
    }
    if (data.content) {
        data.content = dataToConvert
    }
    return data
}