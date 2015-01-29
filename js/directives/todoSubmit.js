/*global todomvc */
'use strict';

/**
 * Directive that executes an expression when the element it is applied to loses focus
 */
todomvc.directive('todoSubmit', function () {
    var ENTER_KEY = 13;
    return function (scope, elem, attrs) {
        elem.bind('keydown', function (event) {
            if (event.keyCode === ENTER_KEY) {
                scope.$apply(attrs.todoSubmit);
                event.target.blur();
            }
        });
    };
});
