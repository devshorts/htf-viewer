function initFilters(app){
    app.filter('property', property);
    app.filter('search', search);
}

function property(){
    function parseString(input){
        return input.split(".");
    }

    function getValue(element, propertyArray){
        var value = element;

        _.forEach(propertyArray, function(property){
            value = value[property];
        });

        return value;
    }

    return function (array, propertyString, target){
        if(_.isUndefined(target)){
            return array;
        }

        var properties = parseString(propertyString);

        return _.filter(array, function(item){
            return getValue(item, properties) == target;
        });
    }
}


function search(){
    return function (array, target){
        if(_.isUndefined(target) || _.isEmpty(target)){
            return array;
        }

        return _.filter(array, function(item){
            return item.test.info.testName.indexOf(target) != -1;
        })
    }
}
