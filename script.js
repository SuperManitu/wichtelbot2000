var users = [];
var presents = [];

var removeButton = '<button type="button" onclick="deleteLastUser()">x</button>';

function mkPreview(name) {
    return '<div class="preview-line">'
            + '<span class="name">' + name + '</span>'
            + removeButton
        + '</div>';
}

function addUser()
{
    var name = document.getElementById('name').value;
    var present = document.getElementById('geschenknummer').value;
    users.push(name);
    presents.push(present);
    document.getElementById('name').value = '';
    document.getElementById('geschenknummer').value = '';

    var preview = document.getElementById('preview');
    if(preview.firstChild) {
        preview.firstChild.removeChild(preview.firstChild.lastChild);
    }
    preview.insertAdjacentHTML('afterbegin', mkPreview(name));
}

function deleteLastUser() {
    users.pop()
    presents.pop();

    var preview = document.getElementById('preview');
    preview.removeChild(preview.firstChild);
    if(preview.firstChild) {
        preview.firstChild.insertAdjacentHTML('beforeend', removeButton);
    }
}

function generateResult()
{
    if(users.length !== new Set(users).size) {
        alert('Jemand hat verkackt und ne falsche nummer eingeben, lade neu');
        window.location.reload();
    }
    var userCopy = users.slice(0);
    var mapping = users.map(function(u) {
        var randomNumber = Math.floor(Math.random() * userCopy.length);
        var newUser = userCopy[randomNumber];
        userCopy.splice(randomNumber, 1);
        return newUser;
    });

    var reorderedPresents = mapping.map(function(u) {
        return presents[users.indexOf(u)];
    });

    var assignedPresents = reorderedPresents.map(function(_, i) {
        return reorderedPresents[(i + 1) % reorderedPresents.length];
    });

    var dict = mapping.map(function(u, i) {
        return { [u]: assignedPresents[i] };
    }).reduce(function(acc, curr) {
        var tmp = {};
        for (var attrname in acc) { tmp[attrname] = acc[attrname]; }
        for (var attrname in curr) { tmp[attrname] = curr[attrname]; }
        return tmp;
    });

    displayResult(dict);
}

function displayResult(dict)
{
    while(document.body.firstChild)  document.body.removeChild(document.body.firstChild);

    var htmlString = "<div><table>"
        + "<tr>"
            + "<th>Name</th>"
            + "<th>Bekommt</th>"
        + "</tr>";

    for(var name in dict)
    {
        htmlString +=
            "<tr>"
                + "<td>" + name + "</td>"
                + "<td>" + dict[name] + "</td>"
            + "</tr>";
    }

    htmlString += "</table></div><div class='action'><button type='button' onclick='location.reload()'>Nochmal</button></div>";
    document.body.insertAdjacentHTML("beforeend", htmlString);
}
