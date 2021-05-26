const GROUPS = 7;

const PSL = [
    null,
    "(2, 2)",
    "(\u03c0, 1)",
    "(\u221a2, 6)",
    "(1, 0.5)",
    "(0, -e)",
    "(0, \u03c0/2)",
    "(5, 100)"
];

$(document).ready(() => {
    // Load the bank with possible elements
    let bankelems = [];
    for (let i = 1; i <= GROUPS; i++) {
	bankelems.push("<div class='tile t" + i +
		       "'><div class='tc'><img src='q/" + i +
		       "/de.png'></div><div>Differential equation</div></div>");
	bankelems.push("<div class='tile t" + i +
		       "'><div class='tc'><img src='q/" + i +
		       "/gs.png'></div><div>General solution</div></div>");
	bankelems.push("<div class='tile t" + i +
		       "'><div class='tc'><img src='q/" + i +
		       "/ps.png'></div><div>Particular solution through " +
		       PSL[i] + "</div></div>");
	bankelems.push("<div class='tile t" + i +
		       "'><div class='tc'><img src='q/" + i +
		       "/sf.png'></div><div>Slope field</div></div>");
    }

    // Shuffle elements randomly
    let ci = bankelems.length;
    while (ci) {
	let ri = Math.floor(Math.random() * ci);
	ci--;
	let temp = bankelems[ci];
	bankelems[ci] = bankelems[ri];
	bankelems[ri] = temp;
    }

    let bankhtml = "";
    bankelems.forEach(e => bankhtml += e);
    $("#bank").html(bankhtml).sortable({
	connectWith: ".cg",
	scroll: true
    }).disableSelection();
    $(".tg").sortable({
	connectWith: ".cg",
	scroll: true,
	receive: function(event, ui) {
	    if ($(this).children().length > 4)
		$(ui.sender).sortable("cancel");
	}
    }).disableSelection();
});

function checkResponses() {
    let html = "";
    for (let i = 1; i <= GROUPS; i++) {
	let e = $("#tg" + i);
	let good = true;
	let cls = null;
	let elems = e.children();
	if (elems.length != 4) {
	    html += "<p style='color: red;'>Group " + i +
		" does not have 4 tiles</p>";
	    continue;
	}
	for (let j = 0; j < elems.length; j++) {
	    if (!cls) {
		for (const c of elems[j].classList) {
		    var match = /t(\d+)/g.exec(c);
		    if (match)
			cls = match[0];
		}
	    }
	    else if (!$(elems[j]).hasClass(cls)) {
		good = false;
		break;
	    }
	}
	if (!good) {
	    html += "<p style='color: red;'>Group " + i +
		" has one or more incorrect tiles</p>";
	}
    }
    if (!html)
	$("#res").html("<p style='color: green;'>Correct!</p>");
    else
	$("#res").html(html);
}

function toggleGroup(el, id) {
  if (el.innerHTML == "Show") {
    el.innerHTML = "Hide";
    $("#tg" + id).css({ display: "block" });
  } else {
    el.innerHTML = "Show";
    $("#tg" + id).css({ display: "none" });
  }
}
