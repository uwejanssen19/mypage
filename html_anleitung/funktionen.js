/* globale Parameter */
var MetaInformationen = { // Metainfos und deren Beschriftung [Objekt, {} fuer keine Anzeige]
	'author':"Autor",
	'version':"Version",
	'date':"Erstellung",
	'revised':"Update"
}
/* allgemeine Funktionen */
/* Cookies */
function createCookie(name, wert) { // schreibt ein Cookie
	if (navigator.cookieEnabled) {
		var tage = 7; // Tage, nach denen die Cookies verfallen [Ganzzahl, <1 fuer keine Cookies]
		var value = ""; // gespeicherte Zeichenkette
		var expires = ""; // Verfallsdatum
		if (wert) {
			var value = encodeURIComponent(wert);
			var datum = new Date();
			datum.setTime(datum.getTime() + (tage*24*60*60*1000));
			var expires = "; expires=" + datum.toGMTString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	}
}
function readCookie(name) { // liest ein Cookie
	if (navigator.cookieEnabled) { if (document.cookie) {
		var nameEQ = name + "=";
		var cookies = document.cookie.split(';');
		for (var i = 0, c; c = cookies[i]; ++i) {
			while (c.charAt(0) == ' ') c = c.substring (1);
			if (c.indexOf(nameEQ) == 0) {
				c = c.substring(nameEQ.length,c.length);
				return decodeURIComponent(c);
			}
		}
	} }
	return "";
}
function eraseCookie(name) { // loescht ein Cookie
	createCookie(name, "");
}
/* Arrays */
Array.prototype.getindex = function(element)
{ // gibt die Position eines Elementes in einem Array (oder -1) zurueck
	for (var p = this.length-1, e; e = this[p]; --p)
		if (e == element) break;
	return p;
}
Array.prototype.contain = function(element)
{ // gibt zurueck, ob ein Element in einem Array ist
   for (var i in this) if (this[i] == element) return true;
    return false;
}
Object.prototype.contain = function(element)
{ // gibt zurueck, ob ein Element in einem assoziativen Array ist
   for (var i in this) if (this[i] == element) return true;
    return false;
}
Object.prototype.length = function() {
    var size = 0, key;
    for (key in this) {
        if (this.hasOwnProperty(key)) size++;
    }
    return size;
};

function isArray(o) { // testet, ob o ein Array ist
	return (o.constructor.toString().indexOf("Array") != -1);
}
/* Knoten */
function create (tagname, idname, klasse, titel, textinhalt)
{ // erzeugt ein Knotenelement und gibt es zurueck
	var n = document.createElement(tagname);
	if (idname) n.id = idname;
	if (klasse) n.className = klasse;
	if (titel) n.title = titel;
	if (textinhalt) {
		var newTXT = document.createTextNode(textinhalt);
		n.appendChild(newTXT);
	}
return n; }
/* Umgebungsvariablen */
function getInfo()
{ // gibt die Browserinformationen als HTML-String zurueck
	function versionOf (teilstring)
	{ // extrahiert die einem String folgende Nummer aus dem userAgent
		var t = navigator.userAgent.lastIndexOf(teilstring);
		var ver = navigator.userAgent.substr(t+teilstring.length+1);
		t = ver.indexOf(' '); if (t > -1) ver = ver.substr(0,t);
		if (ver[ver.length-1] == ';') ver = ver.substr(0,ver.length-1);
		return ver;
	}
	// default: Name/Version als letztes Wertepaar des userAgents
		var trenner = navigator.userAgent.lastIndexOf(' ');
		var BrowserVersion = navigator.userAgent.substr(trenner+1);
		trenner = BrowserVersion.indexOf('/');
		var BrowserName = (trenner < 0) ? BrowserVersion : BrowserVersion.substr(0,trenner);
		BrowserVersion = BrowserVersion.substr(trenner+1);
		if (BrowserVersion == BrowserName) BrowserVersion = "";
	// spezielle Browser
		trenner = navigator.userAgent.indexOf('MSIE');
		if (trenner > -1) {
			BrowserName = 'Internet Explorer';
			BrowserVersion = versionOf('MSIE');
		} else { trenner = navigator.userAgent.indexOf('Opera');
		if (trenner > -1) {
			BrowserName = 'Opera';
		} else { trenner = navigator.userAgent.indexOf('Firefox');
		if (trenner > -1) {
			BrowserName = 'Mozilla Firefox';
			BrowserVersion = versionOf('Firefox');
		} else { trenner = navigator.userAgent.indexOf('Chrome');
		if (trenner > -1) {
			BrowserName = 'Google Chrome';
			BrowserVersion = versionOf('Chrome');
		} else { trenner = navigator.userAgent.indexOf('Safari');
		if (trenner > -1) {
			BrowserName = 'Safari';
			BrowserVersion = versionOf('Version');
		} else { trenner = navigator.userAgent.indexOf('Konqueror');
		if (trenner > -1) {
			BrowserName = 'Konqueror';
			BrowserVersion = versionOf('Konqueror');
		} } } } } }
	var browserinfo = "Platform: " + navigator.platform;
	browserinfo += "<br>JavaScript: enabled";
	browserinfo += "<br>Cookies: ";
	browserinfo += (navigator.cookieEnabled) ? "enabled" : "disabled";
	browserinfo += "<br>Browser: " + BrowserName + " " + BrowserVersion;
return browserinfo; }
function getMeta()
{ // gibt die Metainformationen als HTML-String zurueck
	var info = "";
	if (document.getElementsByTagName("meta")) {
		for (var i = 0, m; m = document.getElementsByTagName("meta")[i]; ++i) {
			if (m.name in MetaInformationen)
				info += "<br>" + MetaInformationen[m.name] + ": " + m.content;
		}
		info = info.substr(4);
	}
return info; }
/* Demo Funktionen */
		function turnblack() { // Kommentardeaktivierung
			if (document.getElementById('todark').innerHTML == "/") { 
				document.getElementById('darken').style.color = "gray";
				document.getElementById('vanish').style.display = "inline";
				document.getElementById('todark').innerHTML = "&nbsp;";
			} else {
				document.getElementById('darken').style.color = "black";
				document.getElementById('vanish').style.display = "none";
				document.getElementById('todark').innerHTML = "/";
			}
		}
		function showMath() { 
		var s = "Math.E:  \t\t\t" + Math.E;
		s += "\nMath.PI:  \t\t\t" + Math.PI;
		s += "\nMath.LN2:  \t\t" + Math.LN2;
		s += "\nMath.LN10:  \t\t" + Math.LN10;
		s += "\nMath.LOG2E:\t\t" + Math.LOG2E;
		s += "\nMath.LOG10E:\t\t" + Math.LOG10E;
		s += "\nMath.SQRT2: \t\t" + Math.SQRT2;
		s += "\nMath.SQRT1_2:\t" + Math.SQRT1_2;
		alert(s); }
		function showDate() { 
		var datum = new Date();
		var s = "Datum:  " + datum;
		s += "\n\n.toLocaleString:  " + datum.toLocaleString();
		s += "\n\n.toGMTString:  " + datum.toGMTString();
		s += "\n\n.getFullYear:\t\t\t" + datum.getFullYear();
		s += "\n.getMonth:\t\t\t" + datum.getMonth();
		s += "\n.getDate:  \t\t\t" + datum.getDate();
		s += "\n.getDay:   \t\t\t" + datum.getDay();
		s += "\n.getTimezoneOffset:\t" + datum.getTimezoneOffset();
		s += "\n.getHours: \t\t\t" + datum.getHours();
		s += "\n.getMinutes:\t\t\t" + datum.getMinutes();
		s += "\n.getSeconds:\t\t\t" + datum.getSeconds();
		s += "\n.getTime:  \t\t\t" + datum.getTime();
		alert(s); }
		function showScreen() { 
		var s = "screen.width:\t\t\t" + screen.width;
		s += "\nscreen.height:\t\t\t" + screen.height;
		s += "\nscreen.pixelDepth:\t\t" + screen.pixelDepth;
		s += "\nscreen.colorDepth:\t\t" + screen.colorDepth;
		s += "\nscreen.availWidth:\t\t" + screen.availWidth;
		s += "\nscreen.availDepth:\t\t" + screen.availDepth;
		s += "\nscreen.availTop:\t\t" + screen.availTop;
		s += "\nscreen.availLeft:\t\t" + screen.availLeft;
		alert(s); }
		function showNavigator() { 
		var s = "navigator.javaEnabled():  \t" + navigator.javaEnabled();
		s += "\nnavigator.cookieEnabled:\t" + navigator.cookieEnabled;
		s += "\nnavigator.userAgent:\t\t" + navigator.UserAgent;
		s += "\nnavigator.appCodeName:\t" + navigator.appCodeName;
		s += "\nnavigator.appName:\t\t" + navigator.appName;
		s += "\nnavigator.appVersion:\t\t" + navigator.appVersion;
		s += "\nnavigator.language:\t\t\t" + navigator.language;
		s += "\nnavigator.platform:\t\t\t" + navigator.platform;
		alert(s); }
		function showWindow() { 
		var s = "outerWidth:\t\t" + outerWidth;
		s += "\nouterHeight:\t\t" + outerHeight;
		s += "\ninnerWidth:\t\t" + innerWidth;
		s += "\ninnerHeight:\t\t" + innerHeight;
		s += "\npageXOffset:\t\t" + pageXOffset;
		s += "\npageYOffset:\t\t" + pageYOffset;
		s += "\nstatus:\t\t\t" + status;
		s += "\ndefaultStatus:\t\t" + defaultStatus;
		s += "\n\nlocationbar.visible:\t" + locationbar.visible;
		s += "\nmenubar.visible:\t" + menubar.visible;
		s += "\npersonalbar.visible:\t" + personalbar.visible;
		s += "\nstatusbar.visible:\t" + statusbar.visible;
		s += "\ntoolbar.visible:   \t" + toolbar.visible;
		s += "\nscrollbars.visible:\t" + scrollbars.visible;
		alert(s); }
		function showLocation() { 
		var s = "location.href:\t" + location.href;
		s += "\nlocation.pathname:\t" + location.pathname;
		s += "\nlocation.protocol:\t" + location.protocol;
		s += "\nlocation.host:\t" + location.host;
		s += "\nlocation.hostname:\t" + location.hostname;
		s += "\nlocation.port:\t" + location.port;
		s += "\nlocation.search:\t" + location.search;
		s += "\nlocation.hash:\t" + location.hash;
		alert(s); }
/* spezifische Funktionen */

function showMenu() { // zeigt das Menu an
	if (document.getElementById('menuopener'))
		document.getElementById('menuopener').style.display = "none";
	if (document.getElementById('funcline'))
		document.getElementById('funcline').style.display = "block";
	if (document.getElementById('nav'))
		document.getElementById('nav').style.display = "block";
	if (document.getElementById('footer'))
		document.getElementById('footer').style.display = "block";
	if (document.getElementById('content'))
		document.getElementById('content').style.marginLeft = "53mm";
	eraseCookie("hiddenmenu");
}
function hideMenu() { // versteckt das Menu
	if (document.getElementById('menuopener'))
		document.getElementById('menuopener').style.display = "block";
	if (document.getElementById('funcline'))
		document.getElementById('funcline').style.display = "none";
	if (document.getElementById('nav'))
		document.getElementById('nav').style.display = "none";
	if (document.getElementById('footer'))
		document.getElementById('footer').style.display = "none";
	if (document.getElementById('content'))
		document.getElementById('content').style.marginLeft = "7mm";
	createCookie("hiddenmenu",'1');
}
function saveNotes() { // speichert die Kommentare
	if (document.notebox) if (document.notebox.notes) comments = document.notebox.notes.value;
	createCookie("comments",comments);
}
function clearNotes() { // loescht die Kommentare
	comments = "";
	if (document.notebox) if (document.notebox.notes) document.notebox.notes.value = "";
	eraseCookie("comments");
}
function showNotes() { // zeigt die Kommentare an
	if (document.notebox) if (document.notebox.notes) document.notebox.notes.value = comments;
}
/* bookmarks */
function showBookmark() { // zeigt das Bookmark an
	if (document.getElementById('B' + bookmark))
		document.getElementById('B' + bookmark).firstChild.className = "bookmark";
	if (document.getElementById('M' + bookmark))
		document.getElementById('M' + bookmark).className = "marked";
	if (bookmark.length > 2) if (document.getElementById('M' + bookmark.substr(0,2)))
		document.getElementById('M' + bookmark.substr(0,2)).className = "green";
	if (bookmark.length > 4) if (document.getElementById('M' + bookmark.substr(0,4)))
		document.getElementById( 'M' + bookmark.substr(0,4)).className = "green";
	if (document.getElementById('tomark'))
		document.getElementById('tomark').style.display = "inline-block";
}
function hideBookmark() { // loescht die Anzeige des Bookmarks
	if (document.getElementById('B' + bookmark))
		document.getElementById('B' + bookmark).firstChild.className = "graymark";
	if (document.getElementById('M' + bookmark))
		document.getElementById('M' + bookmark).className = "";
	if (bookmark.length > 2) if (document.getElementById('M' + bookmark.substr(0,2)))
		document.getElementById('M' + bookmark.substr(0,2)).className = "";
	if (bookmark.length > 4) if (document.getElementById('M' + bookmark.substr(0,4)))
		document.getElementById( 'M' + bookmark.substr(0,4)).className = "";
	if (document.getElementById('tomark'))
		document.getElementById('tomark').style.display = "none";
}
function setmark(place) { // setzt ein Bookmark und speichert es
	if (document.getElementById('B' + place)) {
		var e = document.getElementById('B' + place);
		if (e.firstChild) if (e.firstChild.className == "graymark") {
			if (bookmark) hideBookmark(); // vorhandenes bookmark ausgrauen
			bookmark = place;
			showBookmark(); // neues bookmark anzeigen
			createCookie("bookmark",bookmark);
		} else {
			if (bookmark) hideBookmark(); // vorhandenes bookmark ausgrauen
			bookmark = "";
			eraseCookie("bookmark");
		}
	}
}
/* klappen */
function openChapter(nr) { // oeffnet ein Kapitel
	if (document.getElementById('A' + nr)) {
		var e = document.getElementById('A' + nr);
		if (e.firstChild) e.firstChild.innerHTML = "&minus;";
	}
	if (document.getElementById('C' + nr))
		document.getElementById('C' + nr).style.display = "block";
}
function closeChapter(nr) { // schliesst ein Kapitel
	if (document.getElementById('A' + nr)) {
		var e = document.getElementById('A' + nr);
		if (e.firstChild) e.firstChild.innerHTML = "+";
	}
	if (document.getElementById('C' + nr))
		document.getElementById('C' + nr).style.display = "none";
}
function swap(area) { // klappt einen Bereich auf und zu
	if (document.getElementById('C' + area)) {
		if (document.getElementById('C' + area).style.display == "none") {
			openChapter(area);
		} else {
			closeChapter(area);
		}
	}
}
function showAll() { // oeffnet alle Kapitel
	if (!document.getElementById("nav")) return;
	var nav = document.getElementById("nav");
	if (nav.getElementsByTagName("a")) {
	  for (var i = 0, a; a = nav.getElementsByTagName("a")[i]; ++i) {
		var mNummer = a.id;
		var area = mNummer.substr(1);
		openChapter(area);		
	  }
	}
}
function hideAll() { // schliesst alle Kapitel
	if (!document.getElementById("nav")) return;
	var nav = document.getElementById("nav");
	if (nav.getElementsByTagName("a")) {
	  for (var i = 0, a; a = nav.getElementsByTagName("a")[i]; ++i) {
		var mNummer = a.id;
		var area = mNummer.substr(1);
		closeChapter(area);		
	  }
	}
}
/* sprungfunktionen */
function unseal(area) {
	for (var n = area, L; L = n.length; n = n.substr(0, L-2)) {
		openChapter(n)
	}
}
function aimto(nr) { // klappt die notwendigen Bereiche auf und springt dann zum Kapitel
	unseal(nr);
	window.setTimeout("window.location.href = '#A"+nr+"'",100);
}
function jumpto(quelle,quellarea,ziel,zielarea)
{ // speichert lastjump, klappt die notwendigen Bereiche auf und springt dann zum Kapitel, zeigt Ruecksprunglink
	lastjump = quelle; lastarea = quellarea;
	unseal(zielarea);
	window.setTimeout("window.location.href = '#"+ziel+"'",100);
	if (document.getElementById('tolast'))
		document.getElementById('tolast').style.display = (lastjump) ? "inline-block" : "none";
}
/* Startfunktionen */
function InfofelderAnzeigen () { // fuellt die Infofelder aus
	var txt = getMeta();
	if (document.getElementById('prtmeta'))
		document.getElementById('prtmeta').innerHTML = txt;
	if (document.getElementById('dspmeta'))
		document.getElementById('dspmeta').innerHTML = txt;
	txt = getInfo();
	if (document.getElementById('dspinfo'))
		document.getElementById('dspinfo').innerHTML = txt;
}
function VariablenLaden () { // laedt die gespeicherten Einstellungen
		lastjump = "";
		lastarea = "";
		bookmark = readCookie("bookmark");
		if (bookmark) if (document.getElementById('B' + bookmark)) {
			showBookmark();
		} else {
			bookmark = ""; erase("bookmark");
		}
		hiddenmenu = readCookie("hiddenmenu"); if (hiddenmenu) hideMenu();
		comments = readCookie("comments"); if (comments) showNotes();
}
/* Event-Auswertung */
function doMenuJump(e) { // Auswertung des OnClick-Events im Menu
	var e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.nodeName == "A") {
		if (target.id == "") return;
		var idn = target.id;
		var L = idn.length;
		aimto (idn.substr(1,L-1));
	}
return false; }
function doSideJump(e) { // Auswertung des OnClick-Events im Sider
	var e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.nodeName == "A") {
		if (target.hash == "") return;
		var idn = target.hash;
		var L = idn.length;
		aimto (idn.substr(2,L-1));
	}
return false; }
function printout() { // Druckfunktion
	var e = document.getElementById('content');
	var rand = e.style.marginLeft;
	e.style.marginLeft = "0";
	window.print();
	e.style.marginLeft = rand;
}
//*
window.onload = function() {
	InfofelderAnzeigen();	
	VariablenLaden();
	if (document.getElementById('nav'))
		document.getElementById('nav').onclick = doMenuJump;
	if (document.getElementById('sider'))
		document.getElementById('sider').onclick = doSideJump;
	if (document.getElementById('notes')) {
		document.getElementById('notes').ondblclick = clearNotes;
		document.getElementById('notes').onchange = saveNotes;
	}
	if (document.getElementById('todark'))
		document.getElementById('todark').onclick = turnblack;
	if (document.getElementById('alertMath'))
		document.getElementById('alertMath').onclick = showMath;
	if (document.getElementById('alertDate'))
		document.getElementById('alertDate').onclick = showDate;
	if (document.getElementById('alertScreen'))
		document.getElementById('alertScreen').onclick = showScreen;
	if (document.getElementById('alertNavi'))
		document.getElementById('alertNavi').onclick = showNavigator;
	if (document.getElementById('alertWind'))
		document.getElementById('alertWind').onclick = showWindow;
	if (document.getElementById('alertLoc'))
		document.getElementById('alertLoc').onclick = showLocation;
}
//*/