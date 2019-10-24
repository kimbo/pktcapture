document.addEventListener('DOMContentLoaded', function() {
    var appId = 'pktcapture';

    /* coordinate helper functions */
    var saveCoordinates = function(coords) {
        window.localStorage.setItem(appId + '-last-coordinates', JSON.stringify(coords))
    };
    var getLastCoordinates = function() {
        var val = window.localStorage.getItem(appId + '-last-coordinates');
        if (val) {
            return JSON.parse(val);
        }
        return null;
    };
    var random = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    var getRandomCoordinates = function(elemWidth, elemHeight) {
        var width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight;
        var x = random(0, width - elemWidth);
        var y = random(0, height - elemHeight);
        return {x: x, y: y}
    };
    var setPosition = function(elem, coords) {
        elem.style.top = coords.y + 'px';
        elem.style.left = coords.x + 'px';
    };
    /* end coordinate helpers */
    
    var pkt = document.getElementById('pkt');
    var coords = getLastCoordinates();
    if (coords) {
        setPosition(pkt, coords);
    }

    pkt.addEventListener('mouseover', function(e) {
        var coords = getRandomCoordinates(pkt.offsetWidth, pkt.offsetHeight);
        // var pointCoords = {x: coords.x + (pkt.offsetWidth / 2), y: coords.y + (pkt.offsetHeight / 2)};
        var pointCoords = {x: e.clientX, y: e.clientY};
        setPosition(pkt, coords);
        saveCoordinates(coords);
    });
});
