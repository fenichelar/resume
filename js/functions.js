// Function for shortening dates (e.g. 2014 -> '14)
function shortenDate(input) {
  if (isNaN(input)) {
    return input.substr(0,3);
  }

  return "'" + input.toString().substr(2,2);
}

// Function for formatting GPA (e.g. 4 -> 4.00)
function formatGPA(input) {
  return input.toFixed(2);
}

// Function for formatting telephone number (e.g. +1 (123) 456-7890 -> 1-123-456-7890)
function formatPhone(input) {
  input = input.replace(/[+()]/g, "");
  input = input.replace(/\s/g, "-");

  return input;
}

function renderDetail(input) {
  if (typeof input === "object") {
    var details = input.summary;
    if (input.url) {
      details += " &#8209 <a href=\"" + input.url + "\" target=\"_blank\" class=\"link\">" + input.url + "</a>"
    }
    details += "<ul>";
    for (var i = 0; i < input.details.length; i ++) {
    details += "<li>" + input.details[i] + "</li>";
    }
    details += "</ul>";
    return details;
  } else {
    return input;
  }
}

// Function for comparing data in Handlebars
function handlebarsCompare(lvalue, operator, rvalue, options) {
  var operators, result;

  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }

  if (options === undefined) {
    options = rvalue;
    rvalue = operator;
    operator = "===";
  }

  operators = {
    '==': function (l, r) { return l == r; },
    '===': function (l, r) { return l === r; },
    '!=': function (l, r) { return l != r; },
    '!==': function (l, r) { return l !== r; },
    '<': function (l, r) { return l < r; },
    '>': function (l, r) { return l > r; },
    '<=': function (l, r) { return l <= r; },
    '>=': function (l, r) { return l >= r; },
    'typeof': function (l, r) { return typeof l == r; }
  };

  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }

  result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
