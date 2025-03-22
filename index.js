const getSliderValue = () => {
    const R = parseInt(document.getElementById('slider-r').value)
    const G = parseInt(document.getElementById('slider-g').value)
    const B = parseInt(document.getElementById('slider-b').value)
    return [R, G, B]
}

const setSliderValue = (values) => {
    const [R, G, B] = values
    document.getElementById('slider-r').value = R
    document.getElementById('slider-g').value = G
    document.getElementById('slider-b').value = B
}

const showSliderValue = (values) => {
    const [R, G, B] = values
    document.getElementById('red-number').innerText = R
    document.getElementById('green-number').innerText = G
    document.getElementById('blue-number').innerText = B
}

const convertColor = (values) =>{
    const [R,G,B] = values
    const colorRGB = `rgb(${R},${G},${B})`
    const colorHex = `${R.toString(16)}${G.toString(16)}${B.toString(16)}`.toUpperCase()

    return [colorRGB, colorHex]
}

const handleSliderValue = () => {
    // get slider values 
    const values = getSliderValue()
    const [R, G, B] = values

    // display picked slider value 
    showSliderValue(values)

    // convert values
    const colors = convertColor(values)
    const [colorRGB, colorHex] = colors

    // display color 
    const display = document.getElementById('display')
    display.style.backgroundColor = colorRGB

    // display color code in RGB
    const rgbInput = document.getElementById('rgb-input')
    rgbInput.value = colorRGB

    // display color code in HEX
    const hexInput = document.getElementById('hex-input')
    hexInput.value = colorHex

    // store last colors 
    storeLastValue(values)
}

const randomColor = () => {
    const R = Math.round(Math.random() * 255);
    const G = Math.round(Math.random() * 255);
    const B = Math.round(Math.random() * 255);
    setSliderValue([R,G,B])
    handleSliderValue()
}

const copy = () =>{
    // show copied text
    const copiedText = document.getElementById('copied-text')
    copiedText.classList.remove('hidden')
    setTimeout(() => {
        copiedText.classList.add('hidden')
    }, 2000);

    // get values 
    const values = getSliderValue()
    const colors = convertColor(values)
    const [colorRGB, colorHex] = colors

    // check radio and copy 
    const radioRGB = document.getElementById('radio-rgb').checked
    const copyColor = radioRGB ?colorRGB :colorHex
    navigator.clipboard.writeText(copyColor)
}

const storeLastValue = (values) =>{
    const data = JSON.stringify(values)
    localStorage.setItem("values", data)
}

const getLastValue = () =>{
    let values = localStorage.getItem("values")
    if(values) setSliderValue(JSON.parse(values))
    handleSliderValue()
}

// start by getting last color values 
getLastValue()