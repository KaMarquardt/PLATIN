/*
* MapGui.js
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
 * @class MapGui
 * Map GUI Implementation
 * @author Stefan Jänicke (stjaenicke@informatik.uni-leipzig.de)
 * @release 1.0
 * @release date: 2012-07-27
 * @version date: 2012-07-27
 *
 * @param {MapWidget} parent map widget object
 * @param {HTML object} div parent div to append the map gui
 * @param {JSON} options map configuration
 */
function MapGui(map, div, options, iid) {

	var gui = this;
	this.map = map;

	this.container = div;
	if (options.mapWidth) {
		this.container.style.width = options.mapWidth;
	}
	if (options.mapHeight) {
		this.container.style.height = options.mapHeight;
	}
	this.container.style.position = 'relative';

	this.mapWindow = document.createElement("div");
	this.mapWindow.setAttribute('class', 'mapWindow');
	this.mapWindow.id = "mapWindow"+iid;
	this.mapWindow.style.background = options.mapBackground;
	this.container.appendChild(this.mapWindow);

	this.mapContainer = document.createElement("div");
	this.mapContainer.setAttribute('class', 'mapContainer');
	this.mapContainer.id = "mapContainer"+iid;
	this.mapContainer.style.position = "absolute";
	this.mapContainer.style.zIndex = 0;
	this.mapWindow.appendChild(this.mapContainer);

	var toolbarTable = document.createElement("table");
	toolbarTable.setAttribute('class', 'absoluteToolbar ddbToolbar');
	this.container.appendChild(toolbarTable);
	this.mapToolbar = toolbarTable;

	/*
		for special use cases: take toolbar out of map - toolbar haven't overlap map
	 */
	if (exhibition){
		this.mapToolbar.style.position.value = 'relative';
		this.mapToolbar.style.top = '-43px';
	}
	if (forEmbeddedUse){
		this.mapToolbar.style.position.value = 'relative';
		this.mapToolbar.style.top = '-47px';
	}

	var titles = document.createElement("tr");
	toolbarTable.appendChild(titles);
	var tools = document.createElement("tr");
	toolbarTable.appendChild(tools);

	if (options.mapSelection) {
		this.mapTypeTitle = document.createElement("td");
		titles.appendChild(this.mapTypeTitle);
		this.mapTypeTitle.innerHTML = GeoTemConfig.getString('mapType');
		this.mapTypeSelector = document.createElement("td");
		tools.appendChild(this.mapTypeSelector);
	}

	if (options.mapSelectionTools) {
		this.mapSelectorTitle = document.createElement("td");
		titles.appendChild(this.mapSelectorTitle);
		this.mapSelectorTitle.innerHTML = GeoTemConfig.getString('mapSelectorTools');
		this.mapSelectorTitle.classList.add('mapShapeSelection');
		var mapSelectorTools = document.createElement("td");
		mapSelectorTools.classList.add('mapShapeSelection');
		var selectorTools = this.map.initSelectorTools();
		for (var i in selectorTools ) {
			mapSelectorTools.appendChild(selectorTools[i].button);
		}
		tools.appendChild(mapSelectorTools);
	}

	if (options.binningSelection) {
		this.binningTitle = document.createElement("td");
		titles.appendChild(this.binningTitle);
		this.binningTitle.innerHTML = GeoTemConfig.getString('binningType');
		this.binningSelector = document.createElement("td");
		tools.appendChild(this.binningSelector);
	}

	if (GeoTemConfig.allowFilter) {
		this.filterTitle = document.createElement("td");
		titles.appendChild(this.filterTitle);
		this.filterTitle.innerHTML = GeoTemConfig.getString('filter');
		this.filterTitle.classList.add('mapFilterBar');
		this.filterOptions = document.createElement("td");
		this.filterOptions.classList.add('mapFilterBar');
		tools.appendChild(this.filterOptions);
	}

	if (options.dataInformation) {
		this.infoTitle = document.createElement("td");
		this.infoTitle.innerHTML = options.mapTitle;
		titles.appendChild(this.infoTitle);
		var mapSum = document.createElement("td");
		this.mapElements = document.createElement("div");
		this.mapElements.setAttribute('class', 'ddbElementsCount');
		mapSum.appendChild(this.mapElements);
		tools.appendChild(mapSum);
	}

	/*
		look and fullscreen aren't necessary for exhibition mode
		forEmbeddedUse - JourFix 2022-04-25
	 */
	if (!(exhibition || forEmbeddedUse)) {
		this.lockTitle = document.createElement("td");
		titles.appendChild(this.lockTitle);
		this.lockTitle.innerHTML = '&nbsp;';
		this.lockIcon = document.createElement("td");
		this.lockIcon.style.width = '37px';
		var lockButton = document.createElement("div");
		if (forEmbeddedUse) {
			$(lockButton).addClass('fasBtn fasBtnFirst');
		} else {
			$(lockButton).addClass('mapControl');
		}
		$(lockButton).attr('title', 'Lock map state');
		var activateLock = function () {
			map.navigation.deactivate();
		}
		var deactivateLock = function () {
			map.navigation.activate();
		}
		var lockMapControl = new MapControl(this.map, lockButton, 'lock', activateLock, deactivateLock);
		this.lockIcon.appendChild(lockMapControl.button);
		tools.appendChild(this.lockIcon);
	}
	if (!(exhibition)) {
		this.fullscreenTitle = document.createElement("td");
		titles.appendChild(this.fullscreenTitle);
		this.fullscreenTitle.innerHTML = '&nbsp;';
		this.fullscreenIcon = document.createElement("td");
		this.fullscreenIcon.style.width = '32px';
		var fullscreenButton = document.createElement("div");
		if (forEmbeddedUse) {
			$(fullscreenButton).addClass('fasBtn');
		} else {
			$(fullscreenButton).addClass('mapControl');
		}
		$(fullscreenButton).attr('title', 'Fullscreen');
		var prevWidth;
		var prevHeight;
		var prevParent;
		var activateFullscreen = function () {
			$div = $(div);
			$window = $(window);

			prevWidth = $div.width();
			prevHeight = $div.height();
			prevParent = $div.parent();

			$div.appendTo("body");
			$div.css("position","absolute");
			$div.css("top","0");
			$div.css("left","0");
			$div.css("z-Index","10000");
			$div.width($window.width());
			$div.height($window.height());

			gui.resize();
		}
		var deactivateFullscreen = function() {
			$div=$(div);

	//		$div.appendTo(prevParent);
			prevParent.prepend($div);
			$div.css("position","relative");
			$div.width(prevWidth);
			$div.height(prevHeight);

				gui.resize();
			}
			var fullscreenMapControl = new MapControl(this.map, fullscreenButton, 'fullscreen', activateFullscreen, deactivateFullscreen);
			this.fullscreenIcon.appendChild(fullscreenMapControl.button);
			tools.appendChild(this.fullscreenIcon);
		}

		/*
		 *	At first: only reload map container
		 *  2022-04-08 reload page - language fix - filter clear
		 */
		if (exhibition || forEmbeddedUse)
			{
			this.reloadTitle = document.createElement("td");
			titles.appendChild(this.reloadTitle);
			this.reloadTitle.innerHTML = '&nbsp;';
			this.reloadIcon = document.createElement("td");
			this.reloadIcon.style.width = '37px';
			this.reloadDiv =  document.createElement("div");
			this.reloadDiv.title = GeoTemConfig.getString('reload');
			$(this.reloadDiv).addClass('fasBtn fasBtnLast')
			//this.reloadDiv.style.width = '25px';
			this.reloadDiv.innerHTML = '<a href="javascript:location.reload()"><span class="fasButton">' +
				'<i class="fas fa-redo fa-fw" aria-hidden="true""></i>' +
				'</span></a>';
			this.reloadIcon.appendChild(this.reloadDiv);
			tools.appendChild(this.reloadIcon);

		}

		if (navigator.geolocation && options.geoLocation && !(exhibition || forEmbeddedUse)) {
			this.geoActive = false;
			this.geoLocation = document.createElement("div");
			this.geoLocation.setAttribute('class', 'geoLocationOff');
			this.geoLocation.title = GeoTemConfig.getString('activateGeoLocation');
			this.container.appendChild(this.geoLocation);
			this.geoLocation.style.left = "20px";
			this.geoLocation.onclick = function() {
				var changeStyle = function() {
					if (gui.geoActive) {
						gui.geoLocation.setAttribute('class', 'geoLocationOn');
						gui.geoLocation.title = GeoTemConfig.getString('deactivateGeoLocation');
					} else {
						gui.geoLocation.setAttribute('class', 'geoLocationOff');
						gui.geoLocation.title = GeoTemConfig.getString('activateGeoLocation');
					}
				}
				if (!gui.geoActive) {
					if ( typeof gui.longitude == 'undefined') {
						navigator.geolocation.getCurrentPosition(function(position) {
							gui.longitude = position.coords.longitude;
							gui.latitude = position.coords.latitude;
							gui.map.setMarker(gui.longitude, gui.latitude);
							gui.geoActive = true;
							changeStyle();
						}, function(msg) {
							console.log( typeof msg == 'string' ? msg : "error");
						});
					} else {
						gui.map.setMarker(gui.longitude, gui.latitude);
						gui.geoActive = true;
						changeStyle();
					}
				} else {
					gui.map.removeMarker();
					gui.geoActive = false;
					changeStyle();
				}
			}
		}

		if (!options.olNavigation) {
			this.map.zoomSlider = new MapZoomSlider(this.map, "vertical");
			this.container.appendChild(this.map.zoomSlider.div);
			this.map.zoomSlider.div.style.left = "20px";
		}

		if (options.resetMap) {
			this.homeButton = document.createElement("div");
			this.homeButton.setAttribute('class', 'mapHome');
			this.homeButton.title = GeoTemConfig.getString('home');
			this.container.appendChild(this.homeButton);
			this.homeButton.style.left = "20px";
			this.homeButton.onclick = function() {
				if (map.mds.getAllObjects() == null){
					map.openlayersMap.setCenter(new OpenLayers.LonLat(0, 0));
					map.openlayersMap.zoomTo(0);
				}
				gui.map.drawObjectLayer(true);
			}
		}

		if (options.legend) {
			this.legendDiv = document.createElement("div");
			this.legendDiv.setAttribute('class', 'mapLegend');
			this.mapWindow.appendChild(this.legendDiv);
		}

		this.osmLink = document.createElement("div");
		this.osmLink.setAttribute('class', 'osmLink');
		this.mapWindow.appendChild(this.osmLink);

		this.osmMapQuestLink = document.createElement("div");
		this.osmMapQuestLink.setAttribute('class', 'osmLink');
		this.mapWindow.appendChild(this.osmMapQuestLink);

	//		var tooltip = document.createElement("div");
	//		tooltip.setAttribute('class','ddbTooltip');
	//		toolbarTable.appendChild(tooltip);

	//		var tooltip = document.createElement("div");
	//		tooltip.setAttribute('class','ddbTooltip');
	//		toolbarTable.appendChild(tooltip);
	//
	//		tooltip.onmouseover = function(){
	//			/*
	//		    Publisher.Publish('TooltipContent', {
	//						content: GeoTemConfig.getString(GeoTemConfig.language,'timeHelp'),
	//						target: $(tooltip)
	//					    });
	//			*/
	//		}
	//		tooltip.onmouseout = function(){
	//		 //   Publisher.Publish('TooltipContent');
	//		}
	//		//vhz tooltip on click should open a help file if defined in GeoTemConfig
	//		if(GeoTemConfig.helpURL) {
	//			tooltip.onclick = function () {
	//
	//			}
	//		}

	//		}
	//		tooltip.onmouseout = function(){
	//   			Publisher.Publish('TooltipContent');
	//		}

	this.resize = function() {
		var w = this.container.offsetWidth;
		var h = this.container.offsetHeight;
//		this.mapWindow.style.width = w + "px";
		this.mapWindow.style.height = h + "px";
//		this.mapContainer.style.width = w + "px";
		this.mapContainer.style.height = h + "px";
		var top = toolbarTable.offsetHeight + 20;
		if (options.olLayerSwitcher) {
			var switcherDiv = $('.olControlLayerSwitcher')[0];
			$(switcherDiv).css('top', top + "px");
		}
		if ( typeof this.geoLocation != "undefined") {
			this.geoLocation.style.top = top + "px";
			top += this.geoLocation.offsetHeight + 4;
		}
		if (options.olNavigation) {
			var panZoomBar = $('.olControlPanZoom')[0];
			$(panZoomBar).css('top', top + 'px');
			$(panZoomBar).css('left', '12px');
			var zoomOut = document.getElementById('OpenLayers.Control.PanZoom_23_zoomout');
			top += $(zoomOut).height() + $(zoomOut).position().top + 4;
		} else {
			this.map.zoomSlider.div.style.top = top + "px";
			top += this.map.zoomSlider.div.offsetHeight + 2;
		}
		if (options.resetMap) {
			this.homeButton.style.top = top + "px";
		}
		this.headerHeight = toolbarTable.offsetHeight;
		this.headerWidth = toolbarTable.offsetWidth;
		this.map.openlayersMap.updateSize();
		this.map.drawObjectLayer(true);
	};

	this.updateLegend = function(datasets){
		$(this.legendDiv).empty();
		var table = $('<table style="margin:10px"/>').appendTo(this.legendDiv);
		for( var i=0; i<datasets.length; i++ ){
			var row = $('<tr/>').appendTo(table);
			if( options.useGraphics ){
				var graphic = map.config.getGraphic(i);
				var fill = 'rgb(' + graphic.color.r0 + ',' + graphic.color.g0 + ',' + graphic.color.b0 + ')';
				var stroke = 'rgb(' + graphic.color.r1 + ',' + graphic.color.g1 + ',' + graphic.color.b1 + ')';
				var rot = graphic.rotation;
				var svg;
				if( graphic.shape == 'circle' ){
					svg = '<svg style="width:20px;height:20px;"><circle cx="10" cy="10" r="7" stroke="'+stroke+'" stroke-width="2" fill="'+fill+'"/></svg>';
				}
				else if( graphic.shape == 'square' ){
					svg = '<svg style="width:20px;height:20px;"><polygon points="4,4 16,4 16,16 4,16" style="fill:'+fill+';stroke:'+stroke+';stroke-width:2" transform="rotate('+rot+' 10,10)"/></svg>';
				}
				else if( graphic.shape == 'triangle' ){
					svg = '<svg style="width:20px;height:20px;"><polygon points="3,17 17,17 10,5" style="fill:'+fill+';stroke:'+stroke+';stroke-width:2" transform="rotate('+rot+' 10,10)"/></svg>';
				}
				$('<td>'+svg+'</td>').appendTo(row);
			}
			else {
				var c = GeoTemConfig.getColor(i);
				var fill = 'rgb(' + c.r0 + ',' + c.g0 + ',' + c.b0 + ')';
				var stroke = 'rgb(' + c.r1 + ',' + c.g1 + ',' + c.b1 + ')';
				var svg = '<svg style="width:20px;height:20px;"><circle cx="10" cy="10" r="7" stroke="'+stroke+'" stroke-width="2" fill="'+fill+'"/></svg>';
				$('<td>'+svg+'</td>').appendTo(row);
			}
			$('<td>'+datasets[i].label+'</td>').appendTo(row);
		}
	};

	this.updateSpaceQuantity = function(count) {
		if (!options.dataInformation) {
			return;
		}
		this.mapCount = count;
		if (count != 1) {
			this.mapElements.innerHTML = this.beautifyCount(count) + " " + GeoTemConfig.getString('results');
		} else {
			this.mapElements.innerHTML = this.beautifyCount(count) + " " + GeoTemConfig.getString('result');
		}
	}

	this.setMapsDropdown = function() {
		if (!options.mapSelection) {
			return;
		}
		$(this.mapTypeSelector).empty();
		var maps = [];
		var gui = this;
		var addMap = function(name, index) {
			var setMap = function() {
				gui.map.setMap(index);
			}
			maps.push({
				name : name,
				onclick : setMap
			});
		}
		for (var i = 0; i < this.map.baseLayers.length; i++) {
			var basemap = this.map.baseLayers[i];
			var name = basemap.name;
			if (basemap.title) name = basemap.title;

			// For use case "exhibition" - display without browser controls - Popup window
			var mapCopyright = basemap.attribution;
			if (mapCopyright != null) {
				var copyDummy = document.createElement('span');
				copyDummy.innerHTML = mapCopyright;
				// all link elements
				var targetEles = copyDummy.getElementsByTagName('a');
				var anzEles = targetEles.length;
				for (var j = 0; j < anzEles; j++) {
					if (!exhibition) {
						targetEles[j].target = '_blank';
					} else {
						var strHref = targetEles[j].href;
						// reproduce a-href -> span-onclick
						var att = document.createAttribute("onclick");
						att.value = "window.open('" + strHref + "', 'licenseDisplay', 'width=800,height=600'); return false";
						targetEles[j].setAttributeNode(att);
						targetEles[j].removeAttribute('href');
						// show as link
						att = document.createAttribute("class");
						att.value = "mapLizenz";
						targetEles[j].setAttributeNode(att);
					}
					var strHtml = copyDummy.innerHTML;
					// change element a to span
					strHtml = strHtml.replaceAll("<a", "<span");
					strHtml = strHtml.replaceAll("</a", "</span");
					basemap.attribution = strHtml;
				}
			}

			addMap(name, i);
		}
		this.mapTypeDropdown = new Dropdown(this.mapTypeSelector, maps, GeoTemConfig.getString('selectMapType'));
	}

	this.setMap = function() {
		if (options.mapSelection) {
			this.mapTypeDropdown.setEntry(this.map.baselayerIndex);
		}
	}

	this.setBinningDropdown = function() {
		if (!options.binningSelection) {
			return;
		}
		$(this.binningSelector).empty();
		var binnings = [];
		var gui = this;
		var index = 0;
		var entry;
		var addBinning = function(name, id) {
			if (options.binning == id) {
				entry = index;
			} else {
				index++;
			}
			var setBinning = function() {
				options.binning = id;
				gui.map.initWidget(gui.map.datasets, false);
				gui.map.riseLayer();
			}
			binnings.push({
				name : name,
				onclick : setBinning
			});
		}
		addBinning(GeoTemConfig.getString('genericBinning'), 'generic');
		addBinning(GeoTemConfig.getString('squareBinning'), 'square');
		addBinning(GeoTemConfig.getString('hexagonalBinning'), 'hexagonal');
		addBinning(GeoTemConfig.getString('triangularBinning'), 'triangular');
		addBinning(GeoTemConfig.getString('noBinning'), false);
		var binningDropdown = new Dropdown(this.binningSelector, binnings, GeoTemConfig.getString('binningTooltip'));
		binningDropdown.setEntry(entry);
	}
	this.setBinningDropdown();

	this.beautifyCount = function(count) {
		var c = count + '';
		var p = 0;
		var l = c.length;
		while (l - p > 3) {
			p += 3;
			c = c.substring(0, l - p) + "." + c.substring(l - p);
			p++;
			l++;
		}
		return c;
	}

};
