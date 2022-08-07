export const convertDivsToSpans = (element) => {
    element.style.overflow = 'hidden'
    element.innerHTML = element.innerText.split('').map(char => {
        return `<span class="animatedChar">${char}</span>`
    }).join('')

    return element
}
