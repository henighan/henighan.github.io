var app = angular.module('demoApp', []);

app.controller('myController', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

app.controller('nameController', function($scope) {
    $scope.name = 'Jake'
});

app.controller('canvasController', function($scope) {

    $scope.init = function () {
        $scope.canvas = {
            'width': 200,
            'height': 200,
            style: "border:1px solid #000000; border-radius:5px;"
        }
        $scope.moveToList = [];
        $scope.lineToList = [];
    };

    $scope.clear = function () {
        var drawCanvas = document.getElementById('drawCanvas');
        var drawContext = drawCanvas.getContext('2d');
        drawContext.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
        $scope.moveToList = [];
        $scope.lineToList = [];
    };

    $scope.mouseup = function () {
        console.log('mouse up')
        var drawCanvas = document.getElementById('drawCanvas');
        var drawContext = drawCanvas.getContext('2d');
        var showCanvas = document.getElementById('showCanvas');
        var showContext = showCanvas.getContext('2d');
    }

});

app.directive("drawing", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');

            var drawing = false;

            var lastX;
            var lastY;

            element.bind('mousedown', function (event) {
                if (event.offsetX !== undefined) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else {
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }

                ctx.beginPath();

                drawing = true;
            });
            element.bind('mousemove', function (event) {
                if (drawing) {

                    if (event.offsetX !== undefined) {
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                    } else {
                        currentX = event.layerX - event.currentTarget.offsetLeft;
                        currentY = event.layerY - event.currentTarget.offsetTop;
                    }

                    draw(lastX, lastY, currentX, currentY);

                    lastX = currentX;
                    lastY = currentY;
                }

            });
            element.bind('mouseup', function (event) {
                drawing = false;
            });

            function draw(lX, lY, cX, cY) {

                ctx.moveTo(lX, lY);

                ctx.lineTo(cX, cY);

                ctx.strokeStyle = "#4kf";
                ctx.lineWidth = 4;

                ctx.stroke();

                var objMoveTo;
                var objLineTo;

                objMoveTo = { "lx": lX, "ly": lY };
                objLineTo = { "cx": cX, "cy": cY };

                scope.moveToList.push(objMoveTo);
                scope.lineToList.push(objLineTo);
            }



        }
    };
});


