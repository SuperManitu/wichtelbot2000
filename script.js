var users = [];
var presents = [];

function addUser() {
    var name = document.getElementById('name').value;
    var present = document.getElementById('geschenknummer').value;
    users.push(name);
    presents.push(present);
    document.getElementById('name').value = '';
    document.getElementById('geschenknummer').value = '';
    console.log(users, presents);
}

function generateResult() {
    var userCopy = users.map(function(u){ return u; })
    var mapping = users.map(function(u){
        var randomNumber = Math.floor(Math.random()*userCopy.length);
        var newUser = userCopy[randomNumber];
        userCopy.splice(randomNumber, 1);
        return newUser;
    });

    var reorderedPresents = mapping.map(function(u){
        return presents[users.indexOf(u)];
    });

    var assignedPresents = reorderedPresents.map(function(_, i){
        return reorderedPresents[(i + 1) % reorderedPresents.length];
    });

    var dict = mapping.map(function(u, i){
        return { [u]: assignedPresents[i] };
    }).reduce(function(acc, curr){
        var tmp = {};
        for (var attrname in acc) { tmp[attrname] = acc[attrname]; }
        for (var attrname in curr) { tmp[attrname] = curr[attrname]; }
        return tmp;
    });
    
    displayResult(dict);
}

function displayResult(dict) {
    while(document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }

    var htmlString = "<table>"
        + "<tr>"
            + "<th>Name</th>"
            + "<th>Geschenknummer</th>"
        + "</tr>";

    for(var name in dict) {
        htmlString +=
            "<tr>"
                + "<td>" + name + "</td>"
                + "<td>" + dict[name] + "</td>"
            + "</tr>";
    }

    htmlString += "</table>";

    document.body.insertAdjacentHTML("beforeend", htmlString);
}
