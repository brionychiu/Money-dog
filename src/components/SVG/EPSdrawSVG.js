const createSvgElement = (tagName , attrs) => {
    let element = document.createElementNS('http://www.w3.org/2000/svg',tagName)
    for(let name in attrs){
        element.setAttribute(name,attrs[name])
    }
    return element;
}

export const EPSdrawSVG = () => {
    return(
        <svg
            width="912" height="465"
            viewBox="0 0 24 24"
            xmlns="<http://www.w3.org/2000/svg>"
        >
            <circle
                cx="12" cy="12" r="8"
                stroke-width="4" stroke="tomato"
                fill="none"
            />

        </svg>
    )
	
}