function Square(edges) {
	// Call constructor from GeometricShape class
	GeometricShape.call(this, edges)
}

// Copy prototype of GeometricShape. All functions assigned to prototype of GeometricShape should be in the prototype of the square.
Square.prototype = Object.create(GeometricShape.prototype);

// Square should have its own constructor.
Square.prototype.constructor = Square;

Square.prototype.area = function () {
	// Calculate shape area
}