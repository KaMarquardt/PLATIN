/*
* Table.js
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
 * @class Table
 * Implementation for a single table
 * @author Stefan Jänicke (stjaenicke@informatik.uni-leipzig.de)
 * @release 1.0
 * @release date: 2012-07-27
 * @version date: 2012-07-27
 *
 * @param {Array} elements list of data items
 * @param {HTML object} parent div to append the table
 * @param {int} id dataset index
 */
function Table(elements, parent, id) {

	this.elements = elements;
	this.showElementsLength = elements.length;
	this.parent = parent;
	this.id = id;
	this.options = parent.options;

	this.validResultsPerPage = [10, 20, 50, 100];
	this.keyHeaderList = [];
	this.initialize();

}

Table.prototype = {

	initToolbar : function() {

		var table = this;
		this.toolbar = document.createElement("table");
		this.toolbar.setAttribute('class', 'ddbToolbar');
		this.toolbar.style.overflow = 'auto';
		this.tableDiv.appendChild(this.toolbar);

		var navigation = document.createElement("tr");
		this.toolbar.appendChild(navigation);

		var selectors = document.createElement("td");
		navigation.appendChild(selectors);

		// 1 table -> All items select/deselect
		if (table.options.tableSelectPage) {
			var selectPageItems = true;
			this.selectPage = document.createElement('div');
			$(this.selectPage).css("float","left");
//			this.selectPage.setAttribute('class', 'smallButton selectPage');
			this.selectPage.setAttribute('class', 'smallButton');
			this.selectPage.style.paddingLeft = '10px';
			this.selectPage.innerHTML = '<span class="ctrlActive"><i class="far fa-check-square fa-fw" aria-hidden="true"></i></span>';
			this.selectPage.title = GeoTemConfig.getString('selectTablePageItemsHelp');
			selectors.appendChild(this.selectPage);
			this.selectPage.onclick = function() {
				selectPageItems = !selectPageItems;
				if (selectPageItems) {
					var items = 0;
					for (var i = table.first; i < table.elements.length; i++) {
						table.elements[i].selected = false;
						items++;
						if (items == table.resultsPerPage) {
							break;
						}
					}
					//table.selectPage.setAttribute('class', 'smallButton selectPage');
					table.selectPage.innerHTML = '<span class="ctrlActive"><i class="far fa-check-square fa-fw" aria-hidden="true"></i></span>';
					table.selectPage.title = GeoTemConfig.getString('selectTablePageItemsHelp');
				} else {
					var items = 0;
					for (var i = table.first; i < table.elements.length; i++) {
						table.elements[i].selected = true;
						items++;
						if (items == table.resultsPerPage) {
							break;
						}
					}
					//table.selectPage.setAttribute('class', 'smallButton deselectPage');
					table.selectPage.innerHTML = '<span class="ctrlActive"><i class="far fa-square fa-fw" aria-hidden="true"></i></span>';
					table.selectPage.title = GeoTemConfig.getString('deselectTablePageItemsHelp');
				}
				table.update();
				table.parent.tableSelection();
			}
		}

		if (table.options.tableSelectAll) {
			var selectAllItems = true;
			this.selectAll = document.createElement('div');
			this.selectAll.setAttribute('class', 'smallButton');
			this.selectAll.style.paddingLeft = '5px';
			this.selectAll.innerHTML = '<span class="ctrlActive"><span class="fa-layers fa-fw">' +
				'<i class="far fa-clone fa-fw" aria-hidden="true" ></i>' +
				'<i class="fas fa-check fa-fw" aria-hidden="true" data-fa-transform="shrink-8 up-2 right-2"></i>' +
				'</span></span>';
			$(this.selectAll).css("float","left");
			table.selectAll.title = GeoTemConfig.getString('selectAllTableItemsHelp');
			selectors.appendChild(this.selectAll);
			this.selectAll.onclick = function() {
				selectAllItems = !selectAllItems;
				if (selectAllItems) {
					for (var i = 0; i < table.elements.length; i++) {
						table.elements[i].selected = false;
					}
					table.selectAll.innerHTML = '<span class="ctrlActive"><span class="fa-layers fa-fw">' +
						'<i class="far fa-clone fa-fw" aria-hidden="true" ></i>' +
						'<i class="fas fa-check fa-fw" aria-hidden="true" data-fa-transform="shrink-8 up-2 right-2"></i>' +
						'</span></span>';
					table.selectAll.title = GeoTemConfig.getString('selectAllTableItemsHelp');
				} else {
					for (var i = 0; i < table.elements.length; i++) {
						table.elements[i].selected = true;
					}
					table.selectAll.innerHTML = '<span class="ctrlActive"><i class="far fa-clone fa-fw" aria-hidden="true" ></i></span>';
					table.selectAll.title = GeoTemConfig.getString('deselectAllTableItemsHelp');
				}
				table.update();
				table.parent.tableSelection();
			}
		}

		if (table.options.tableInvertSelection) {
			this.invertSelection = document.createElement('div');
			//this.invertSelection.setAttribute('class', 'smallButton invertSelection');
			this.invertSelection.setAttribute('class', 'smallButton');
			this.invertSelection.style.paddingLeft = '5px';
			this.invertSelection.innerHTML = '<span class="ctrlActive"><i class="fas fa-exchange-alt fa-fw" aria-hidden="true"></i></span>';
			$(this.invertSelection).css("float","left");
			table.invertSelection.title = GeoTemConfig.getString('invertSelectionHelp');
			selectors.appendChild(this.invertSelection);
			this.invertSelection.onclick = function() {
				for (var i = 0; i < table.elements.length; i++) {
					if (table.elements[i].selected === true)
						table.elements[i].selected = false;
					else
						table.elements[i].selected = true;
				}
				table.update();
				table.parent.tableSelection();
			}
		}

		this.showSelectedItems = false;
		if (table.options.tableShowSelected) {
			this.showSelected = document.createElement('div');
			//this.showSelected.setAttribute('class', 'smallButton showSelected');
			this.showSelected.setAttribute('class', 'smallButton');
			this.showSelected.style.paddingLeft = '5px';
			this.showSelected.innerHTML = '<span class="ctrlInactive"><i class="fas fa-tasks fa-fw" aria-hidden="true"></i></span>';
			$(this.showSelected).css("float","left");
			table.showSelected.title = GeoTemConfig.getString('showSelectedHelp');
			selectors.appendChild(this.showSelected);
			this.showSelected.onclick = function() {
				if (table.showSelected.firstElementChild.classList.contains('ctrlInactive'))
				{
					return;
				}
				table.showSelectedItems = !table.showSelectedItems;
				if (table.showSelectedItems) {
					table.showElementsLength = 0;
					for (var i = 0; i < table.elements.length; i++) {
						if (table.elements[i].selected) {
							table.showElementsLength++;
						}
					}
					//table.showSelected.setAttribute('class', 'smallButton showAll');
					table.showSelected.innerHTML = '<span class="ctrlActive"><i class="fas fa-list-ul fa-fw" aria-hidden="true"></i></span>';
					table.showSelected.title = GeoTemConfig.getString('showAllElementsHelp');
				} else {
					table.showElementsLength = table.elements.length;
					//table.showSelected.setAttribute('class', 'smallButton showSelected');
					table.showSelected.innerHTML = '<span class="ctrlActive"><i class="fas fa-tasks fa-fw" aria-hidden="true"></i></span>';
					table.showSelected.title = GeoTemConfig.getString('showSelectedHelp');
				}
				table.updateIndices(table.resultsPerPage);
				table.update();
			}
		}

		if (table.options.tableSelectByText) {
			this.selectByTextDiv = document.createElement('div');
/*			$(this.selectByTextDiv).css("float","left");
			$(this.selectByTextDiv).css("vertical-align", "top");
			$(this.selectByTextDiv).css("margin-top", "2px");
			$(this.selectByTextDiv).css("display", "inline-block");
			$(this.selectByTextDiv).css("margin-left", "10px");*/
			$(this.selectByTextDiv).addClass('searchDiv');
			/* style="float: left; vertical-align: top; margin-top: 2px; display: inline-block; margin-left: 10px;" */
			//create and append the input field
			this.selectByTextInput = document.createElement('input');
			$(this.selectByTextInput).attr("type","text");
			// style="padding: 2px 4px; border: none; border-radius: 0px; width: 220px;"
			$(this.selectByTextInput).addClass('searchSlot');
			$(this.selectByTextDiv).append(this.selectByTextInput);
			//create and append the button
			this.selectByTextButton = document.createElement('button');
			$(this.selectByTextButton).attr("type","button");
			//$(this.selectByTextButton).css("margin-left", "5px");
			//$(this.selectByTextButton).css("vertical-align", "top");
			$(this.selectByTextButton).val("Search");
			$(this.selectByTextButton).addClass('searchButton');
			// style="margin-left: 5px; vertical-align: top; border-radius: 0px; font-size: 13px; line-hight: 14px; height: auto; font-weight: 600;"
			this.selectByTextButton.textContent = GeoTemConfig.getString('selectByTextBtn');
			$(this.selectByTextDiv).append(this.selectByTextButton);

			table.selectByTextDiv.title = GeoTemConfig.getString('selectByTextHelp');
			selectors.appendChild(this.selectByTextDiv);
			$(this.selectByTextButton).click($.proxy(function() {
				this.selectByText($(this.selectByTextInput).val());
			},this));
		}

		if (table.options.tableCreateNewFromSelected) {
			this.createNewFromSelected = document.createElement('div');
			//this.createNewFromSelected.setAttribute('class', 'smallButton createNewRefined');
			this.createNewFromSelected.setAttribute('class', 'smallButton');
			this.createNewFromSelected.style.paddingLeft = '10px';
			this.createNewFromSelected.innerHTML = '<span class="ctrlInactive"><i class="fas fa-share-square fa-fw" aria-hidden="true"></i></span>';
			$(this.createNewFromSelected).css("float","left");
			this.createNewFromSelected.title = GeoTemConfig.getString('createNewFromSelectedHelp');
			selectors.appendChild(this.createNewFromSelected);
			this.createNewFromSelected.onclick = function() {
				if (table.createNewFromSelected.firstElementChild.classList.contains('ctrlInactive')) {
					return;
				}
				var copyID = table.id;
				var tableWidget = table.parent;

				var newObjects = [];
				$(table.elements).each(function () {
					if (this.selected)
						newObjects.push(this.object);
				});

				var newLabel = tableWidget.datasets[copyID].label + " refined";
				var newDataset = new Dataset(newObjects, newLabel, '', 'csv');

				GeoTemConfig.addDataset(newDataset);
			};
		}

		this.selectors = selectors;

		//		selectors.style.width = (this.filter.offsetWidth + this.selectAll.offsetWidth + this.selectPage.offsetWidth)+"px";

		var results = document.createElement("td");
		navigation.appendChild(results);

		var pagination = document.createElement("td");
		$(pagination).css('float', 'right');
		navigation.appendChild(pagination);

		this.resultsInfo = document.createElement('div');
		this.resultsInfo.setAttribute('class', 'resultsInfo');
		results.appendChild(this.resultsInfo);

		this.resultsDropdown = document.createElement('div');
		this.resultsDropdown.setAttribute('class', 'resultsDropdown');
		pagination.appendChild(this.resultsDropdown);
		var itemNumbers = [];
		var addItemNumber = function(count, index) {
			var setItemNumber = function() {
				table.updateIndices(count);
				table.update();
			}
			itemNumbers.push({
				name : count,
				onclick : setItemNumber
			});
		}
		for (var i = 0; i < table.options.validResultsPerPage.length; i++) {
			addItemNumber(table.options.validResultsPerPage[i], i);
		}
		var dropdown = new Dropdown(this.resultsDropdown, itemNumbers, GeoTemConfig.getString('paginationDropdownHelp'));
		for (var i = 0; i < table.options.validResultsPerPage.length; i++) {
			if (table.options.initialResultsPerPage == table.options.validResultsPerPage[i]) {
				dropdown.setEntry(i);
				break;
			}
		}
		dropdown.div.title = GeoTemConfig.getString('paginationDropdownHelp');

		this.firstPage = document.createElement('div');
		this.firstPage.setAttribute('class', 'paginationButton');
		this.firstPage.style.paddingRight = '5px';
		this.firstPage.style.paddingLeft = '10px';
		this.firstPage.innerHTML = '<span class="ctrlInactive"><i class="fas fa-fast-backward fa-fw" aria-hidden="true"></i></span>';
		this.firstPage.title = GeoTemConfig.getString('paginationFirsPageHelp');

		pagination.appendChild(this.firstPage);
		this.firstPage.onclick = function() {
			if (table.page != 0) {
				table.page = 0;
				table.update();
			}
		}

		this.previousPage = document.createElement('div');
		this.previousPage.setAttribute('class', 'paginationButton');
		this.previousPage.style.paddingRight = '10px';
		this.previousPage.innerHTML = '<span class="ctrlInactive"><i class="fas fa-step-backward fa-fw" aria-hidden="true"></i></span>';
		this.previousPage.title = GeoTemConfig.getString('paginationPreviousPageHelp');
		pagination.appendChild(this.previousPage);
		this.previousPage.onclick = function() {
			if (table.page > 0) {
				table.page--;
				table.update();
			}
		}

		this.pageInfo = document.createElement('div');
		this.pageInfo.setAttribute('class', 'pageInfo');
		pagination.appendChild(this.pageInfo);

		this.nextPage = document.createElement('div');
		this.nextPage.setAttribute('class', 'paginationButton');
		this.nextPage.style.paddingLeft = '10px';
		this.nextPage.style.paddingRight = '5px';
		this.nextPage.innerHTML = '<span class="ctrlActive"><i class="fas fa-step-forward fa-fw" aria-hidden="true"></i></span>';
		this.nextPage.title = GeoTemConfig.getString('paginationNextPageHelp');
		pagination.appendChild(this.nextPage);
		this.nextPage.onclick = function() {
			if (table.page < table.pages - 1) {
				table.page++;
				table.update();
			}
		}

		this.lastPage = document.createElement('div');
		this.lastPage.setAttribute('class', 'paginationButton');
		this.lastPage.style.paddingRight = '10px';
		this.lastPage.innerHTML = '<span class="ctrlActive"><i class="fas fa-fast-forward fa-fw" aria-hidden="true"></i></span>';
		this.lastPage.title = GeoTemConfig.getString('paginationLastPageHelp');
		pagination.appendChild(this.lastPage);
		this.lastPage.onclick = function() {
			if (table.page != table.pages - 1) {
				table.page = table.pages - 1;
				table.update();
			}
		}

		this.input = document.createElement("div");
		this.input.style.overflow = 'auto';
		this.tableDiv.appendChild(this.input);

		this.elementList = document.createElement("table");
		this.elementList.setAttribute('class', 'resultList');
		this.input.appendChild(this.elementList);
		var height = this.parent.getHeight();
		if (height) {
			this.input.style.height = (height - pagination.offsetHeight) + 'px';
			this.input.style.overflowY = 'auto';
		}

		this.elementListHeader = document.createElement("tr");
		this.elementList.appendChild(this.elementListHeader);

		if (GeoTemConfig.allowFilter) {
			var cell = document.createElement('th');
			this.elementListHeader.appendChild(cell);
		}

		//Bottom pagination elements
		this.bottomToolbar = document.createElement("table");
		this.bottomToolbar.setAttribute('class', 'ddbToolbar');
		this.bottomToolbar.style.overflow = 'auto';
		this.tableDiv.appendChild(this.bottomToolbar);

		var bottomNavigation = document.createElement("tr");
		this.bottomToolbar.appendChild(bottomNavigation);

		var bottomPagination = document.createElement("td");
		bottomNavigation.appendChild(bottomPagination);

		this.bottomLastPage = document.createElement('div');
		this.bottomLastPage.setAttribute('class', 'paginationButton');
		this.bottomLastPage.style.marginRight = '10px';
		this.bottomLastPage.innerHTML = '<span class="ctrlActive"><i class="fas fa-fast-forward fa-fw" aria-hidden="true"></i></span>';
		this.bottomLastPage.title = GeoTemConfig.getString('paginationLastPageHelp');
		$(this.bottomLastPage).css('float', 'right');
		bottomPagination.appendChild(this.bottomLastPage);
		this.bottomLastPage.onclick = function() {
			if (table.page != table.pages - 1) {
				table.page = table.pages - 1;
				table.update();
			}
		}

		this.bottomNextPage = document.createElement('div');
		this.bottomNextPage.setAttribute('class', 'paginationButton');
		this.bottomNextPage.style.marginRight = '5px';
		this.bottomNextPage.style.marginLeft = '10px';
		this.bottomNextPage.innerHTML = '<span class="ctrlActive"><i class="fas fa-step-forward fa-fw" aria-hidden="true"></i></span>';
		this.bottomNextPage.title = GeoTemConfig.getString('paginationNextPageHelp');
		$(this.bottomNextPage).css('float', 'right');
		bottomPagination.appendChild(this.bottomNextPage);
		this.bottomNextPage.onclick = function() {
			if (table.page < table.pages - 1) {
				table.page++;
				table.update();
			}
		}

		this.bottomPageInfo = document.createElement('div');
		this.bottomPageInfo.setAttribute('class', 'pageInfo');
		this.bottomPageInfo.style.marginTop = '8px';
		$(this.bottomPageInfo).css('float', 'right');
		bottomPagination.appendChild(this.bottomPageInfo);

		this.bottomPreviousPage = document.createElement('div');
		this.bottomPreviousPage.setAttribute('class', 'paginationButton');
		this.bottomPreviousPage.style.marginLeft = '5px';
		this.bottomPreviousPage.style.marginRight = '10px';
		this.bottomPreviousPage.innerHTML = '<span class="ctrlInactive"><i class="fas fa-step-backward fa-fw" aria-hidden="true"></i></span>';
		this.bottomPreviousPage.title = GeoTemConfig.getString('paginationPreviousPageHelp');
		$(this.bottomPreviousPage).css('float', 'right');
		bottomPagination.appendChild(this.bottomPreviousPage);
		this.bottomPreviousPage.onclick = function() {
			if (table.page > 0) {
				table.page--;
				table.update();
			}
		}

		this.bottomFirstPage = document.createElement('div');
		this.bottomFirstPage.setAttribute('class', 'paginationButton');
		this.bottomFirstPage.innerHTML = '<span class="ctrlInactive"><i class="fas fa-fast-backward fa-fw" aria-hidden="true"></i></span>';
		this.bottomFirstPage.title = GeoTemConfig.getString('paginationFirsPageHelp');
		$(this.bottomFirstPage).css('float', 'right');
		bottomPagination.appendChild(this.bottomFirstPage);
		this.bottomFirstPage.onclick = function() {
			if (table.page != 0) {
				table.page = 0;
				table.update();
			}
		}

		if ( typeof (this.elements[0]) == 'undefined') {
			return;
		}

		var ascButtons = [];
		var descButtons = [];
		var clearButtons = function() {
			for (var i in ascButtons ) {
				ascButtons[i].setAttribute('class', 'sort sortAscDeactive');
			}
			for (var i in descButtons ) {
				descButtons[i].setAttribute('class', 'sort sortDescDeactive');
			}
		}
		var addSortButton = function(key) {
			table.keyHeaderList.push(key);
			var cell = document.createElement('th');
			table.elementListHeader.appendChild(cell);
			var sortAsc = document.createElement('div');
			var sortDesc = document.createElement('div');
			var span = document.createElement('div');
			span.setAttribute('class', 'headerLabel');
			span.innerHTML = key.toUpperCase();
			cell.appendChild(sortDesc);
			cell.appendChild(span);
			cell.appendChild(sortAsc);
			sortAsc.setAttribute('class', 'sort sortAscDeactive');
			sortAsc.title = GeoTemConfig.getString('sortAZHelp');
			sortDesc.setAttribute('class', 'sort sortDescDeactive');
			sortDesc.title = GeoTemConfig.getString('sortZAHelp');
			ascButtons.push(sortAsc);
			descButtons.push(sortDesc);
			sortAsc.onclick = function() {
				clearButtons();
				sortAsc.setAttribute('class', 'sort sortAscActive');
				table.sortAscending(key);
				table.update();
			}
			sortDesc.onclick = function() {
				clearButtons();
				sortDesc.setAttribute('class', 'sort sortDescActive');
				table.sortDescending(key);
				table.update();
			}
		}

		if (!isBibliographie) {
			for (var key in this.elements[0].object.tableContent) {

//            console.log("key: " + key + " - tableContent: " + this.elements[0].object.tableContent);
				addSortButton(key);
			}
		}
		else
		{
			for (var key in this.elements[0].object.shortTableContent) {

            	//console.log("key: " + key + " - shortTableContent: " + this.elements[0].object.shortTableContent);
				addSortButton(key);
			}
		}
	},

	sortAscending : function(key) {
		var sortFunction = function(e1, e2) {
			if (e1.object.tableContent[key] < e2.object.tableContent[key]) {
				return -1;
			}
			return 1;
		}
		this.elements.sort(sortFunction);
	},

	sortDescending : function(key) {
		var sortFunction = function(e1, e2) {
			if (e1.object.tableContent[key] > e2.object.tableContent[key]) {
				return -1;
			}
			return 1;
		}
		this.elements.sort(sortFunction);
	},

	selectByText : function(text) {
		//deselect all elements
		$(this.elements).each(function(){
			this.selected = false;
		});

		var selectedCount = 0;
		$(this.elements).filter(function(index){
			return this.object.contains(text);
		}).each(function(){
			this.selected = true;
			selectedCount++;
		});

		//only show selected elements
		this.showSelectedItems = true;
		this.showElementsLength = selectedCount;
		this.showSelected.innerHTML = '<span class="ctrlActive"><i class="fas fa-list-ul fa-fw" aria-hidden="true"></i></span>';
		this.showSelected.title = GeoTemConfig.getString('showAllElementsHelp');

		//this.showSelected.setAttribute('class', 'smallButton showAll');

		this.update();
		this.parent.tableSelection();
	},

	setPagesText : function() {
		var infoText = GeoTemConfig.getString('pageInfo');
		infoText = infoText.replace('PAGES_ID', this.pages);
		infoText = infoText.replace('PAGE_ID', this.page + 1);
		this.pageInfo.innerHTML = infoText;
		this.bottomPageInfo.innerHTML = infoText;
	},

	setResultsText : function() {
		if (this.elements.length == 0) {
			this.resultsInfo.innerHTML = '0 results';
		} else {
			var infoText = GeoTemConfig.getString('resultsInfo');
			var first = this.page * this.resultsPerPage + 1;
			var last = (this.page + 1 == this.pages ) ? this.showElementsLength : first + this.resultsPerPage - 1;
			infoText = infoText.replace('RESULTS_FROM_ID', first);
			infoText = infoText.replace('RESULTS_TO_ID', last);
			infoText = infoText.replace('RESULTS_ID', this.showElementsLength);
			this.resultsInfo.innerHTML = infoText;
		}
	},

	updateIndices : function(rpp) {
		if ( typeof this.resultsPerPage == 'undefined') {
			this.page = 0;
			this.resultsPerPage = 0;
		}
		var index = this.page * this.resultsPerPage;
		this.resultsPerPage = rpp;
		if (this.showSelectedItems) {
			index = 0;
		}
		this.pages = Math.floor(this.showElementsLength / this.resultsPerPage);
		if (this.showElementsLength % this.resultsPerPage != 0) {
			this.pages++;
		}
		this.page = Math.floor(index / this.resultsPerPage);
	},

	update : function() {
		var table = this;

		$(this.elementList).find("tr:gt(0)").remove();
		if (this.page == 0) {
/*			this.previousPage.setAttribute('class', 'paginationButton previousPageDisabled');
			this.firstPage.setAttribute('class', 'paginationButton firstPageDisabled');
			this.bottomPreviousPage.setAttribute('class', 'paginationButton previousPageDisabled');
			this.bottomFirstPage.setAttribute('class', 'paginationButton firstPageDisabled');*/
			$(this.previousPage.firstElementChild).removeClass('ctrlActive').addClass('ctrlInactive');
			$(this.firstPage.firstElementChild).removeClass('ctrlActive').addClass('ctrlInactive');
			$(this.bottomPreviousPage.firstElementChild).removeClass('ctrlActive').addClass('ctrlInactive');
			$(this.bottomFirstPage.firstElementChild).removeClass('ctrlActive').addClass('ctrlInactive');
		} else {
			/*			this.previousPage.setAttribute('class', 'paginationButton previousPageEnabled');
                        this.firstPage.setAttribute('class', 'paginationButton firstPageEnabled');
                        this.bottomPreviousPage.setAttribute('class', 'paginationButton previousPageEnabled');
                        this.bottomFirstPage.setAttribute('class', 'paginationButton firstPageEnabled');*/
			$(this.previousPage.firstElementChild).removeClass('ctrlInactive').addClass('ctrlActive');
			$(this.firstPage.firstElementChild).removeClass('ctrlInactive').addClass('ctrlActive');
			$(this.bottomPreviousPage.firstElementChild).removeClass('ctrlInactive').addClass('ctrlActive');
			$(this.bottomFirstPage.firstElementChild).removeClass('ctrlInactive').addClass('ctrlActive');
		}
		if (this.page == this.pages - 1) {
			/*			this.nextPage.setAttribute('class', 'paginationButton nextPageDisabled');
                        this.lastPage.setAttribute('class', 'paginationButton lastPageDisabled');
                        this.bottomNextPage.setAttribute('class', 'paginationButton nextPageDisabled');
                        this.bottomLastPage.setAttribute('class', 'paginationButton lastPageDisabled');*/
			$(this.nextPage.firstElementChild).removeClass('ctrlActive').addClass('ctrlInactive');
			$(this.lastPage.firstElementChild).removeClass('ctrlActive').addClass('ctrlInactive');
			$(this.bottomNextPage.firstElementChild).removeClass('ctrlActive').addClass('ctrlInactive');
			$(this.bottomLastPage.firstElementChild).removeClass('ctrlActive').addClass('ctrlInactive');
		} else {
			/*			this.nextPage.setAttribute('class', 'paginationButton nextPageEnabled');
                        this.lastPage.setAttribute('class', 'paginationButton lastPageEnabled');
                        this.bottomNextPage.setAttribute('class', 'paginationButton nextPageEnabled');
                        this.bottomLastPage.setAttribute('class', 'paginationButton lastPageEnabled');*/
			$(this.nextPage.firstElementChild).removeClass('ctrlInactive').addClass('ctrlActive');
			$(this.lastPage.firstElementChild).removeClass('ctrlInactive').addClass('ctrlActive');
			$(this.bottomNextPage.firstElementChild).removeClass('ctrlInactive').addClass('ctrlActive');
			$(this.bottomLastPage.firstElementChild).removeClass('ctrlInactive').addClass('ctrlActive');
		}

		this.setPagesText();
		this.setResultsText();
		if (this.showSelectedItems) {
			var start = this.page * this.resultsPerPage;
			var items = 0;
			for (var i = 0; i < this.elements.length; i++) {
				if (items == start) {
					this.first = i;
					break;
				}
				if (this.elements[i].selected) {
					items++;
				}
			}
		} else {
			this.first = this.page * this.resultsPerPage;
		}
		//this.last = ( this.page + 1 == this.pages ) ? this.elements.length : this.first + this.resultsPerPage;
		var c = GeoTemConfig.getColor(this.id);
		var itemSet = [];
		var clearDivs = function() {
			for (var i = 0; i < itemSet.length; i++) {
				if (!itemSet[i].e.selected) {
					itemSet[i].e.highlighted = false;
					$(itemSet[i].div).css('background-color', table.options.unselectedCellColor);
				}
			}
		}
		var setHighlight = function(item, div) {
			var enter = function() {
				clearDivs();
				if (!item.selected) {
					item.highlighted = true;
					$(div).css('background-color', 'rgb(' + c.r0 + ',' + c.g0 + ',' + c.b0 + ')');
					table.parent.triggerHighlight(item.object);
				}
			}
			var leave = function() {
				clearDivs();
				if (!item.selected) {
					table.parent.triggerHighlight();
				}
			}
			$(div).hover(enter, leave);
			$(div).mousemove(function() {
				if (!item.selected && !item.highlighted) {
					item.highlighted = true;
					$(div).css('background-color', 'rgb(' + c.r0 + ',' + c.g0 + ',' + c.b0 + ')');
					table.parent.triggerHighlight(item.object);
				}
			});
		}
		var setSelection = function(item, div, checkbox) {
			var click = function(e) {
				var checked = $(checkbox).is(':checked');
				if (checked) {
					item.selected = true;
					item.highlighted = false;
				} else {
					item.selected = false;
					item.highlighted = true;
				}
				//if( e.target == div ){
				//	$(checkbox).attr('checked', !checked);
				//}
				table.parent.tableSelection();
			}
			//$(div).click(click);
			$(checkbox).click(click);
		}
		this.checkboxes = [];

		var items = 0;
		for (var i = this.first; i < this.elements.length; i++) {
			var e = this.elements[i];
			//vhz because of an error
			if ( typeof (e) == "undefined") {
				continue;
			}
			if (this.showSelectedItems && !e.selected) {
				continue;
			}
			var itemRow = $("<tr/>").appendTo(this.elementList);
			if (GeoTemConfig.allowFilter) {
				var checkColumn = $("<td/>").appendTo(itemRow);
				var checkbox = $("<input type='checkbox'/>").appendTo(checkColumn);
				$(checkbox).attr('checked', e.selected);
			}
			var makeSubtext = function(cell, text) {
				var subtext = text.substring(0, table.options.tableContentOffset);
				subtext = subtext.substring(0, subtext.lastIndexOf(' '));
				subtext += ' ... ';
				var textDiv = $("<div style='display:inline-block;'/>").appendTo(cell);
				$(textDiv).html(subtext);
				var show = false;
				var fullDiv = $("<div style='display:inline-block;'><a href='javascript:void(0)'>\>\></a></div>").appendTo(cell);
				$(fullDiv).click(function() {
					show = !show;
					if (show) {
						$(textDiv).html(text);
						$(fullDiv).html('<a href="javascript:void(0)">\<\<</a>');
					} else {
						$(textDiv).html(subtext);
						$(fullDiv).html('<a href="javascript:void(0)">\>\></a>');
					}
				});
			}
			for (var k = 0; k < table.keyHeaderList.length; k++) {
				var key = table.keyHeaderList[k];
				//vhz
				var text = e.object.tableContent[key];

//                console.log(k + ". key: " + key + " - text: " + text);
				if (columnsToMap.includes(key))
				{
					text = GeoTemConfig.mappingForTable[key][text];
				}

				if (typeof text === "undefined")
					text = "";

				/*
					For data garbage collection e. g. worldcat file
				 */
				if (text.indexOf('null') != -1 || text.indexOf('empty') != -1)
				{
					text = "";
				}

				var cell = $("<td></td>").appendTo(itemRow);

				//align the elements (if unset: "center")
				if (typeof table.options.verticalAlign !== "undefined"){
					if (table.options.verticalAlign === "top")
						$(cell).attr("valign","top");
					else if (table.options.verticalAlign === "center")
						$(cell).attr("valign","center");
					else if (table.options.verticalAlign === "bottom")
						$(cell).attr("valign","bottom");
				}

				if (table.options.tableContentOffset && text.length < table.options.tableContentOffset) {
					$(cell).html(text);
				} else {
					makeSubtext(cell, text);
				}
			}
			if (e.selected || e.highlighted) {
				$(itemRow).css('background-color', 'rgb(' + c.r0 + ',' + c.g0 + ',' + c.b0 + ')');
			} else {
				$(itemRow).css('background-color', table.options.unselectedCellColor);
			}
			itemSet.push({
				e : e,
				div : itemRow
			});
			setHighlight(e, itemRow);
			if (GeoTemConfig.allowFilter) {
				setSelection(e, itemRow, checkbox);
				this.checkboxes.push(checkbox);
				$(checkColumn).css('text-align', 'center');
			}
			items++;
			if (items == this.resultsPerPage) {
				break;
			}
		}
	},

	show : function() {
		if (GeoTemConfig.allowFilter && !forEmbeddedUse) {
			this.parent.filterBar.appendTo(this.selectors);
		}
		this.tableDiv.style.display = "block";
	},

	hide : function() {
		this.tableDiv.style.display = "none";
	},

	resetElements : function() {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].selected = false;
			this.elements[i].highlighted = false;
		}
	},

	reset : function() {
		if (!this.options.tableKeepShowSelected){
			this.showSelectedItems = false;
			this.showElementsLength = this.elements.length;
			//this.showSelected.setAttribute('class', 'smallButton showSelected');
			this.showSelected.innerHTML = '<span class="ctrlInactive"><i class="fas fa-tasks fa-fw" aria-hidden="true"></i></span>';
			table.showSelected.title = GeoTemConfig.getString('showSelectedHelp');
		}
		this.updateIndices(this.resultsPerPage);
	},

	initialize : function() {

		this.tableDiv = document.createElement("div");
		this.tableDiv.setAttribute('class', 'singleTable');
		this.parent.gui.input.appendChild(this.tableDiv);

		this.initToolbar();

		this.tableDiv.style.display = 'none';
		this.updateIndices(this.options.initialResultsPerPage);

		this.update();

	}
}

function TableElement(object) {

	this.object = object;
	this.selected = false;
	this.highlighted = false;

}
