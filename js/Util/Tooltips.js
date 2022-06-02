/*
* Tooltips.js
*
* Copyright (c) 2012, Stefan Jänicke. All rights reserved.
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 3 of the License, or (at your option) any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
* Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public
* License along with this library; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
* MA 02110-1301  USA
*/

/**
 * Tooltips JSON
 * GeoTemCo tooltips definition file
 * @author Stefan Jänicke (stjaenicke@informatik.uni-leipzig.de)
 * @release 1.0
 * @release date: 2012-07-27
 * @version date: 2012-07-27
 */
var Tooltips = {
	"en" : {
		"locationType" : "Location type",
		"selectLocationType" : "Select location type",
		"mapType" : "Background map",
		"selectMapType" : "Select background map",
		"selectOverlay" : "Select layer for spatial filtering",
		"overlays" : "Select layer",
		"mapSelectorTools" : "Map selector tools",
		"overlaySelector" : "Selection layer",
		"square" : "Square selection: Mouse down for the center and mouse move to set square bounds",
		"circle" : "Circle selection: Mouse down for the center and mouse move to set circle radius",
		"polygon" : "Polygon selection: Click to add vertex and double click to complete the polygon",
		"country" : "Country selection: Click inside the political borders of a country",
		"singleEntry" : "Only 1 entry available",
		"resultsLocation" : "with location information",
		"home" : "Reset map to initial view",
		"zoomIn" : "Zoom in",
		"zoomOut" : "Zoom out",
		"zoomSlider" : "Zoom slider",
		"dragSelection" : "Drag&Drop shape",
		"zoomSelection" : "Zoom into selection",
		"clearSelection" : "Clear selection",
		"contemporaryMap" : "Contemporary Map",
		"activateGeoLocation" : "Show my location",
		"deactivateGeoLocation" : "Hide my location",
		"mapOf" : "Map of",
		"close" : "Close",
		"genericBinning" : "delaunay",
		"squareBinning" : "square",
		"hexagonalBinning" : "hexagonal",
		"triangularBinning" : "triangular",
		"noBinning" : "none",
		"selectBinningType" : "Select aggregation type",
		"binningType" : "Aggregation type",
		"binningTooltip" : "Select the aggregation type for the data sources",
		"results" : "results",
		"result" : "result",
		"timeType" : "Time type",
		"timeUnit" : "Time unit:",
		"selectTimeType" : "Select time type",
		"timeAnimation" : "Animation",
		"resultsTime" : "with time information",
		"animationDisabled" : "Animation control (disabled)",
		"animationPlay" : "Animate selected time range",
		"animationPause" : "Pause animation",
		"leftHandle" : "Drag&Drop left border",
		"rightHandle" : "Drag&Drop right border",
		"dragTimeRange" : "Drag&Drop time range",
		"connectionsOn" : "Switch on time-dependent connections between map circles",
		"connectionsOff" : "Switch off time-dependent connections",
		"timeFeather" : "Adjust time range feather to smoothen map animations",
		"allResults" : "all",
		"pageInfo" : "Page PAGE_ID of PAGES_ID",
		"resultsInfo" : "RESULTS_FROM_ID-RESULTS_TO_ID of RESULTS_ID results",
		"otherResults" : "others",
		"mapAggregation" : "Aggregation",
		"aggregation" : "Circle aggregation",
		"noAggregation" : "No circle aggregation",
		"showBoxTitle" : "Boundingbox",
		"showBbox" : "Shows given Boundingbox extension",
		"hideBbox" : "Hides given Boundingbox extension",
		"spaceHelp" : "A point on the map corresponds to one or more objects from the result list. ",
		"timeHelp" : "On the timeline are the search results sorted by year. You can choose different time-based categories as basis for the representation.",
		"selectTablePageItemsHelp" : "Click to select all rows of this page",
		"deselectTablePageItemsHelp" : "Click to deselect all rows of this page",
		"selectAllTableItemsHelp" : "Click to select all rows of the table",
		"deselectAllTableItemsHelp" : "Click to deselect all rows of the table",
		"filter" : "Filter",
		"filterSelectedItemsHelp" : "Filter the selected items",
		"inverseFilterSelectedItemsHelp" : "Apply an inverse filter on the selected items removing them from the views",
		"undoFilterSelection" : "Undo the last filter / inverse filter",
		"cancelSelection" : "Discard the current selection (all items appear as deselected)",
		"showSelectedHelp" : "Show only elements within the selection",
		"selectByTextHelp" : "Select elements that contain the given text",
		"showAllElementsHelp" : "Show all elements",
		"paginationFirsPageHelp" : "Show first page",
		"paginationPreviousPageHelp" : "Show previous page",
		"paginationNextPageHelp" : "Show next page",
		"paginationLastPageHelp" : "Show last page",
		"sortAZHelp" : "Sort table elements ascending according this column",
		"sortZAHelp" : "Sort table elements descending according this column",
		"paginationDropdownHelp" : "Select number of elements per page",
		"selectTimeUnit" : "Select Time Unit",
		"valueScale" : "Value Scale",
		"linearPlot" : "Linear/normal ",
		"logarithmicPlot" : "Logarithmic (Ln)",
		"playButton" : "Animate Selected Range",
		"pauseButton" : "Pause Animation",
		"createNewFromSelectedHelp" : "Create new dataset from selected values",
		"removeDatasetHelp" : "Remove this dataset",
		"exportDatasetHelp" : "Export this dataset to a KML file",
		"invertSelectionHelp" : "Invert the current selection",
		"colorShapeDatasetHelp" : "change color or shape of dataset",
		"lockMap" : "lock the map in this state",
		"mapTitle" : "Results",
		"StaticLoader" : "Static data",
		"load" : "Load",
		"KMLLoader" : "KML file URL",
		"loadKML" : "Load KML",
		"KMZLoader" : "KMZ file URL",
		"loadKMZ" : "Load KMZ",
		"CSVLoader" : "CSV file URL",
		"loadCSV" : "Load CSV",
		"localKMLLoader" : "Local KML file",
		"localCSVLoader" : "Local CSV file",
		"localStorageLoader" : "Geobrowser intern storage",
		"localXLSXLoader" : "Local XLS/XLSX file",
		"loadExcel" : "Load XLS/XLSX",
		"timeStart" : "Time start",
		"timeUnit" :"Time unit",
		"scaling" : "Scaling",
		"percentagePlot" : "Percentage (%)",
		"datedObjects" : "Dated objects",
		"primaryFilter" : "Primary filter",
		"selectByTextBtn" : "Search",
		"reload" : "Reload"
	},
	"de" : {
		"locationType" : "Ortsfacette",
		"selectLocationType" : "Wähle Ortsfacette",
		"mapType" : "Kartentyp",
		"selectMapType" : "Wähle Kartentyp",
		"selectOverlay" : "Kartenauswahl für räumliches filtern",
		"overlays" : "Wähle layer",
		"mapSelectorTools" : "Bereichsauswahl",
		"overlaySelector" : "Auswahlebene",
		"square" : "Quadratauswahl: Maus ziehen und loslassen um Mittelpunkt und Seitenlänge des Quadrats zu bestimmen",
		"circle" : "Kreisauswahl: Maus ziehen und loslassen um Mittelpunkt und Radius des Kreises zu bestimmen",
		"polygon" : "Polygonauswahl: Mausklick zum Hinzufügen eines Eckpunktes, Doppelklick zum Fertigstellen",
		"country" : "Landauswahl: Mausklick innerhalb politischer Grenze eines Landes",
		"singleEntry" : "Nur 1 Eintrag vorhanden",
		"resultsLocation" : "mit Geoinformation",
		"home" : "Zurücksetzen zur initialen Sicht",
		"zoomIn" : "Vergrößern",
		"zoomOut" : "Verkleinern",
		"zoomSlider" : "Zoomregler",
		"dragSelection" : "Verschiebe Auswahl",
		"zoomSelection" : "Vergrößere Auswahl",
		"clearSelection" : "Entferne Auswahlbereich",
		"contemporaryMap" : "Aktuelle Weltkarte",
		"activateGeoLocation" : "Meinen Standort anzeigen",
		"deactivateGeoLocation" : "Meinen Standort ausblenden",
		"mapOf" : "Karte von",
		"close" : "Schliessen",
		"genericBinning" : "Generisch",
		"squareBinning" : "Quadrate",
		"hexagonalBinning" : "Hexagone",
		"triangularBinning" : "Dreiecke",
		"noBinning" : "Keine Bins",
		"selectBinningType" : "Wähle Binningart",
		"binningTooltip" : "Wähle die Binningart für die Datenquellen",
		"binningType" : "Binningart",
		"results" : "Resultate",
		"result" : "Resultat",
		"timeType" : "Zeitfacette",
		"timeUnit" : "Zeiteinheit",
		"selectTimeType" : "Wähle Zeitfacette",
		"timeAnimation" : "Animation",
		"resultsTime" : "mit Zeitinformation",
		"animationDisabled" : "Animationswerkzeug (deaktiviert)",
		"animationPlay" : "Animiere ausgewählten Zeitbereich",
		"animationPause" : "Animation anhalten",
		"leftHandle" : "Verschiebe linke Grenze",
		"rightHandle" : "Verschiebe rechte Grenze",
		"dragTimeRange" : "Verschiebe Zeitbereich",
		"connectionsOn" : "Aktiviere zeitabhängige Verbindungen zwischen Kreisen auf der Karte",
		"connectionsOff" : "Deaktiviere zeitabhängige Verbindungen",
		"timeFeather" : "Verändere Zeitbereichsübergänge zum Glätten der Animation",
		"pageInfo" : "Seite PAGE_ID von PAGES_ID",
		"resultsInfo" : "RESULTS_FROM_ID-RESULTS_TO_ID von RESULTS_ID Ergebnissen",
		"allResults" : "alle",
		"otherResults" : "sonstige",
		"mapAggregation" : "Aggregation",
		"aggregation" : "Kreise aggregiert",
		"noAggregation" : "Kreise nicht aggregiert",
		"showBbox" : "Geografische Ausdehnung anzeigen",
		"hideBbox" : "Geografische Ausdehnung ausblenden",
		"spaceHelp" : "Jeder Punkt auf der Karte entspricht einem oder mehreren Objekten der Ergebnisliste. Sie können verschiedene ortsbezogene Kategorien als Grundlage für die Darstellung wählen (Auswahlfeld <strong>Ortsfacette</strong>) und verschiedene Kartentypen. <br> Da es Objekte geben kann, die keine Ortsangabe in ihrer Beschreibung enthalten, ist die Menge der in der Karte dargestellten Objekte in der Regel kleiner als in der Ergebnisliste (Anzahl darstellbarer Objekte siehe rechts oben über der Karte). <br> Mit der Karte können Sie die Suchergebnisse weiter eingrenzen, indem Sie auf einen der Punkte klicken. Wählen Sie einen Ort aus und klicken Sie auf die kleine Lupe, um die Ergebnisliste so einzuschränken, dass nur noch die diesem Ort zugeordneten Objekte als Suchergebnis erscheinen. Mehr zur Karte im Benutzerhandbuch ...",
		"timeHelp" : "In der Zeitleiste sind die Suchergebnisse nach Jahren geordnet. Sie können verschiedene zeitbezogene Kategorien als Grundlage für die Darstellung wählen (Auswahlfeld <strong>Zeitfacette</strong>). <br> Da es Objekte geben kann, die keine Zeitangabe in ihrer Beschreibung enthalten, ist die Zahl der in der Zeitleiste dargestellten Objekte in der Regel kleiner als in der Ergebnisliste. Die Angabe über darstellbare Objekte finden Sie rechts über der Zeitleiste. <br>Mit der Zeitleiste können Sie die Suchergebnisse weiter eingrenzen. Wählen Sie ein Jahr oder einen Zeitraum durch Klicken und Ziehen und klicken Sie auf die kleine Lupe. Die Ergebnisliste zeigt nur noch die Objekte in diesem Zeitraum. Mehr zur Zeitleiste im Benutzerhandbuch ...",
		"selectTablePageItemsHelp" : "Klicken Sie, um alle Zeilen dieser Seite auszuwählen",
		"deselectTablePageItemsHelp" : "Klicken Sie hier, um die Zeilenauswahl dieser Seite zu löschen",
		"selectAllTableItemsHelp" : "Klicken Sie, um alle Zeilen dieser Tabelle auszuwählen",
		"deselectAllTableItemsHelp" : "Klicken Sie, um die Zeilenauswahl dieser Tabelle zu löschen",
		"filter" : "Filter",
		"filterSelectedItemsHelp" : "Filtert die ausgewählten Elemente",
		"inverseFilterSelectedItemsHelp" : "Wendet einen umgekehrten Filter auf die ausgewählten Elemente an, um ihre Markierung zu entfernen",
		"undoFilterSelection" : "Macht die letzte Filteraktion rückgängig",
		"cancelSelection" : "Aktuelle Auswahl verwerfen (Alle Elemente werden unmarkiert angezeigt.)",
		"showSelectedHelp" : "Zeigt nur ausgewählte Elemente an",
		"selectByTextHelp" : "Zeigt nur Elemente an, die den eingegebenen Text enthalten",
		"showAllElementsHelp" : "Zeigt alle Elemente",
		"paginationFirsPageHelp" : "Zeigt die erste Seite",
		"paginationPreviousPageHelp" : "Zeigt die vorherige Seite",
		"paginationNextPageHelp" : "Zeigt die nächste Seite",
		"paginationLastPageHelp" : "Zeigt die letzte Seite",
		"sortAZHelp" : "Sortiert alle Tabellenelemente gemäß der Werte dieser Spalte aufsteigend",
		"sortZAHelp" : "Sortiert alle Tabellenelemente gemäß der Werte dieser Spalte absteigend",
		"paginationDropdownHelp" : "Wählen Sie die Anzahl der angezeigten Elemente je Seite",
		"selectTimeUnit" : "Wähle Zeitintervalle",
		"valueScale" : "Skalierung Wertebereich / y-Achse",
		"linearPlot" : "Linear",
		"logarithmicPlot" : "Logarithmisch (Ln)",
		"playButton" : "Animation des ausgewählten Bereiches starten",
		"pauseButton" : "Pause Animation",
		"createNewFromSelectedHelp" : "Erstelle neuen Datensatz aus den ausgewählten Einträgen",
		"removeDatasetHelp" : "Diesen Datensatz entfernen",
		"exportDatasetHelp" : "Diesen Datensatz in KML Datei exportieren",
		"invertSelectionHelp" : "Jetzige Auswahl umkehren",
		"colorShapeDatasetHelp" : "Farbe oder Form des Datensatzes ändern",
		"lockMap" : "Karte in diesem Zustand halten.",
		"mapTitle" : "Treffer",
		"StaticLoader" : "Beispiele Fixdaten",
		"load" : "Laden",
		"KMLLoader" : "URL der KML-Datei",
		"loadKML" : "KML-Datei laden",
		"KMZLoader" : "URL der KMZ-Datei",
		"loadKMZ" : "KMZ-Datei laden",
		"CSVLoader" : "URL der CSV-Datei",
		"loadCSV" : "CSV-Datei laden",
		"localKMLLoader" : "Lokale KML-Datei",
		"localCSVLoader" : "Lokale CSV-Datei",
		"localStorageLoader" : "Geobrowser interner Speicher",
		"localXLSXLoader" : "Lokale XLS/XLSX-Datei",
		"loadExcel" : "XLS/XLSX-Datei laden",
		"timeStart" : "Startzeitpunkt",
		"timeUnit" :"Zeitintervalle",
		"scaling" : "Skalierung",
		"percentagePlot" : "In Prozent (%)",
		"datedObjects" : "Datierte Treffer",
		"primaryFilter" : "Primärer Filter",
		"selectByTextBtn" : "Suche",
		"reload" : "Neu laden"
	}
}
