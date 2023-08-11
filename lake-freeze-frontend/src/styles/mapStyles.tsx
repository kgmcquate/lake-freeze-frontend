
export function getHexColor(cssVariable: string, rootStyle = getComputedStyle(document.body)): string {
    function componentToHex(c: number) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    function rgbToHex(r: number, g: number, b: number) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function parseRgbString(str: string) {
        return str.replace("rgb(", "").replace(")", "").replace(" ", "").split(",").map((x: string) => {return Number(x)})
    }

    const cssVariableValue = rootStyle.getPropertyValue(cssVariable);

    if (cssVariableValue.startsWith("rgb(")) {
        return rgbToHex(
            parseRgbString(cssVariableValue)[0],
            parseRgbString(cssVariableValue)[1],
            parseRgbString(cssVariableValue)[2],
        )
    } else {
        return cssVariableValue
    }
}

// getHexColor("--primary-bg-color")
// getHexColor("--primary-border-color")
// getHexColor("--primary-text-color")
// getHexColor("--primary-highlight-color")
// getHexColor("--secondary-highlight-color")


export const clusterStyles = [1,2,3].map(x => {return {  
    height: x*32, 
    width: x*32,
    textColor: getHexColor("--primary-text-color"), 
    fontFamily: "Roboto",
    url: process.env.PUBLIC_URL + `/icons8-circle-96.png` //"/circle-solid.svg" // //
  }}
)

//Styling for the Google Map component.  new styles can be generated here: https://snazzymaps.com/
export const mapStyles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": getHexColor("--primary-border-color")
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": getHexColor("--primary-border-color")
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": getHexColor("--primary-border-color")
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": getHexColor("--primary-border-color")
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": getHexColor("--primary-border-color")
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": getHexColor("--primary-border-color")
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": getHexColor("--primary-border-color")
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": getHexColor("--primary-border-color")
            }
        ]
    }
  ]