export function arrayIsEmpty(array) {
    if (array !== undefined && array !== null && array.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  export function objectIsEmpty(Object) {
    if (Object !== undefined && Object !== null && Object !== '') {
      return true;
    } else {
      return false;
    }
  }
  
  export function generateArrayOfYears(numberOfYears) {
    var max = new Date().getFullYear()
    var min = max - numberOfYears
    var years = []
  
    for (var i = max; i >= min; i--) {
      years.push({value: i, label: i})
    }
    return years
  }