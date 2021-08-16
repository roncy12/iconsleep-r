(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogPage; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);

  function CatalogPage(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }

  var _proto = CatalogPage.prototype;

  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');

    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.focus();
      window.localStorage.removeItem('sortByStatus');
    }
  };

  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2___default.a.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };

  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");











var defaultOptions = {
  accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
  blockerSelector: '#facetedSearch .blocker',
  clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
  componentSelector: '#facetedSearch-navList',
  facetNavListSelector: '#facetedSearch .navList',
  priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
  priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
  priceRangeFormSelector: '#facet-range-form',
  priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
  priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
  showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
  facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
  modal: Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["default"])('#modal')[0],
  modalOpen: false
};
/**
 * Faceted search view component
 */

var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;

    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_3___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = [];

    if (this.options.modal) {
      this.options.modal.$modal.on(_global_modal__WEBPACK_IMPORTED_MODULE_7__["ModalEvents"].opened, function (event) {
        var $filterItems = $(event.target).find('#facetedSearch-filterItems');

        if ($filterItems.length) {
          _this.options.modal.setupFocusTrap();
        }
      });
    } // Init collapsibles


    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])(); // Init price validator

    this.initPriceValidator(); // Show limited items by default

    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    }); // Mark initially collapsed accordions

    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');

      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    }); // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped

    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    }); // Observe user events

    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  } // Public methods


  var _proto = FacetedSearch.prototype;

  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    } // Init collapsibles


    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])(); // Init price validator

    this.initPriceValidator(); // Restore view state

    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems(); // Bind events

    this.bindEvents();
  };

  _proto.updateView = function updateView() {
    var _this2 = this;

    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();

      if (err) {
        throw new Error(err);
      } // Refresh view with new content


      _this2.refreshView(content);
    });
  };

  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id'); // Remove

    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
  };

  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');

    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
    }
  };

  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id'); // Toggle depending on `collapsed` flag

    if (lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, id)) {
      this.getMoreFacetResults($navList);
      return true;
    }

    this.collapseFacetItems($navList);
    return false;
  };

  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;

    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl();

    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }

        _this3.options.modal.open();

        _this3.options.modalOpen = true;

        _this3.options.modal.updateContent(response);
      });
    }

    this.collapseFacetItems($navList);
    return false;
  };

  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();

      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };

  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };

  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };

  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);

      _this4.collapseFacet($accordionToggle);
    });
  };

  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);

      _this5.expandFacet($accordionToggle);
    });
  } // Private methods
  ;

  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }

    var validator = Object(_nod__WEBPACK_IMPORTED_MODULE_10__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__["Validators"].setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };

  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;

    var $navLists = $(this.options.facetNavListSelector); // Restore collapsed state for each facet

    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');

      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this6.collapsedFacetItems, id);

      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };

  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;

      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this7.collapsedFacets, id);

      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };

  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents(); // DOM events

    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet); // Hooks

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
  };

  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet); // Hooks

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('sortBy-submitted', this.onSortBySubmit);
  };

  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation(); // Update URL

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
  };

  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href')); // Prevent default

    event.preventDefault(); // Toggle visible items

    this.toggleFacetItems($navList);
  };

  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected'); // Update URL

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);

    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };

  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page; // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead

    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };

  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();

    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].constants.VALID)) {
      return;
    }

    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split('&');
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].parseQueryParams(queryParams);

    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    } // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead


    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };

  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };

  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;

    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacets, id);
    }
  };

  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl); // If searchParams does not contain a page value then modify url query string to have page=1

    if (!searchParams.has('page')) {
      var linkUrl = $('.pagination-link').attr('href');
      var re = /page=[0-9]+/i;
      var updatedLinkUrl = linkUrl.replace(re, 'page=1');
      window.history.replaceState({}, document.title, updatedLinkUrl);
    }

    $(window).trigger('statechange');
  };

  return FacetedSearch;
}();

/* harmony default export */ __webpack_exports__["default"] = (FacetedSearch);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");


function decrementCounter(counter, item) {
  var index = counter.indexOf(item);

  if (index > -1) {
    counter.splice(index, 1);
  }
}

function incrementCounter(counter, item) {
  counter.push(item);
}

function updateCounterNav(counter, $link, urlContext) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }

    $link.attr('href', urlContext.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (urlContext) {
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urlContext);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');

    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }

    updateCounterNav(compareCounter, $clickedCompareLink, urlContext);
  });
  $('body').on('submit', '[data-product-compare]', function (event) {
    var $this = $(event.currentTarget);
    var productsToCompare = $this.find('input[name="products\[\]"]:checked');

    if (productsToCompare.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])('You must select at least two products to compare');
      event.preventDefault();
    }
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');

    if ($clickedCheckedInput.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])('You must select at least two products to compare');
      return false;
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cy5qcyJdLCJuYW1lcyI6WyJDYXRhbG9nUGFnZSIsImNvbnRleHQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiaWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCIkc29ydEJ5U2VsZWN0b3IiLCIkIiwiZ2V0SXRlbSIsImZvY3VzIiwicmVtb3ZlSXRlbSIsIm9uU29ydEJ5U3VibWl0IiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwidXJsIiwiVXJsIiwicGFyc2UiLCJsb2NhdGlvbiIsImhyZWYiLCJxdWVyeVBhcmFtcyIsInNlcmlhbGl6ZSIsInNwbGl0IiwicXVlcnkiLCJwYWdlIiwicHJldmVudERlZmF1bHQiLCJmb3JtYXQiLCJwYXRobmFtZSIsInNlYXJjaCIsInVybFV0aWxzIiwiYnVpbGRRdWVyeVN0cmluZyIsIlBhZ2VNYW5hZ2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJhY2NvcmRpb25Ub2dnbGVTZWxlY3RvciIsImJsb2NrZXJTZWxlY3RvciIsImNsZWFyRmFjZXRTZWxlY3RvciIsImNvbXBvbmVudFNlbGVjdG9yIiwiZmFjZXROYXZMaXN0U2VsZWN0b3IiLCJwcmljZVJhbmdlRXJyb3JTZWxlY3RvciIsInByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yIiwicHJpY2VSYW5nZUZvcm1TZWxlY3RvciIsInByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yIiwicHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IiLCJzaG93TW9yZVRvZ2dsZVNlbGVjdG9yIiwiZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zIiwibW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJtb2RhbE9wZW4iLCJGYWNldGVkU2VhcmNoIiwicmVxdWVzdE9wdGlvbnMiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJjb2xsYXBzZWRGYWNldHMiLCJjb2xsYXBzZWRGYWNldEl0ZW1zIiwiJG1vZGFsIiwib24iLCJNb2RhbEV2ZW50cyIsIm9wZW5lZCIsIiRmaWx0ZXJJdGVtcyIsInRhcmdldCIsImZpbmQiLCJsZW5ndGgiLCJzZXR1cEZvY3VzVHJhcCIsImNvbGxhcHNpYmxlRmFjdG9yeSIsImluaXRQcmljZVZhbGlkYXRvciIsImVhY2giLCJpbmRleCIsIm5hdkxpc3QiLCJjb2xsYXBzZUZhY2V0SXRlbXMiLCJhY2NvcmRpb25Ub2dnbGUiLCIkYWNjb3JkaW9uVG9nZ2xlIiwiY29sbGFwc2libGUiLCJkYXRhIiwiaXNDb2xsYXBzZWQiLCJwdXNoIiwidGFyZ2V0SWQiLCJzZXRUaW1lb3V0IiwiaXMiLCJjb2xsYXBzZUFsbEZhY2V0cyIsIm9uU3RhdGVDaGFuZ2UiLCJiaW5kIiwib25Ub2dnbGVDbGljayIsIm9uQWNjb3JkaW9uVG9nZ2xlIiwib25DbGVhckZhY2V0Iiwib25GYWNldENsaWNrIiwib25SYW5nZVN1Ym1pdCIsImZpbHRlckZhY2V0SXRlbXMiLCJiaW5kRXZlbnRzIiwicmVmcmVzaFZpZXciLCJjb250ZW50IiwicmVzdG9yZUNvbGxhcHNlZEZhY2V0cyIsInJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zIiwidXBkYXRlVmlldyIsInNob3ciLCJhcGkiLCJnZXRQYWdlIiwiZ2V0VXJsIiwiZXJyIiwiaGlkZSIsIkVycm9yIiwiZXhwYW5kRmFjZXRJdGVtcyIsIiRuYXZMaXN0IiwiYXR0ciIsImhhc01vcmVSZXN1bHRzIiwidG9nZ2xlRmFjZXRJdGVtcyIsImdldE1vcmVGYWNldFJlc3VsdHMiLCJmYWNldCIsImZhY2V0VXJsIiwic2hvd01vcmUiLCJ0ZW1wbGF0ZSIsInBhcmFtcyIsImxpc3RfYWxsIiwicmVzcG9uc2UiLCJvcGVuIiwidXBkYXRlQ29udGVudCIsIiRpdGVtcyIsInZhbCIsInRvTG93ZXJDYXNlIiwiZWxlbWVudCIsInRleHQiLCJpbmRleE9mIiwiZXhwYW5kRmFjZXQiLCJjb2xsYXBzZUZhY2V0IiwiY2xvc2UiLCIkYWNjb3JkaW9uVG9nZ2xlcyIsImV4cGFuZEFsbEZhY2V0cyIsInZhbGlkYXRvciIsIm5vZCIsInNlbGVjdG9ycyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJWYWxpZGF0b3JzIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJwcmljZVJhbmdlVmFsaWRhdG9yIiwiJG5hdkxpc3RzIiwic2hvdWxkQ29sbGFwc2UiLCJ1bmJpbmRFdmVudHMiLCJvblBvcFN0YXRlIiwiaG9va3MiLCJvZmYiLCIkbGluayIsInN0b3BQcm9wYWdhdGlvbiIsImdvVG9VcmwiLCIkdG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJ1cmxRdWVyeVBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImFyZUFsbCIsImNvbnN0YW50cyIsIlZBTElEIiwiZGVjb2RlVVJJIiwicGFyc2VRdWVyeVBhcmFtcyIsImtleSIsImhhc093blByb3BlcnR5IiwiY3VycmVudFVybCIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImhhcyIsImxpbmtVcmwiLCJyZSIsInVwZGF0ZWRMaW5rVXJsIiwicmVwbGFjZSIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInRyaWdnZXIiLCJkZWNyZW1lbnRDb3VudGVyIiwiY291bnRlciIsIml0ZW0iLCJzcGxpY2UiLCJpbmNyZW1lbnRDb3VudGVyIiwidXBkYXRlQ291bnRlck5hdiIsInVybENvbnRleHQiLCJhZGRDbGFzcyIsImNvbXBhcmUiLCJqb2luIiwiaHRtbCIsInJlbW92ZUNsYXNzIiwiY29tcGFyZUNvdW50ZXIiLCIkY29tcGFyZUxpbmsiLCIkY2hlY2tlZCIsIm1hcCIsInZhbHVlIiwiZ2V0IiwidHJpZ2dlckhhbmRsZXIiLCJwcm9kdWN0IiwiJGNsaWNrZWRDb21wYXJlTGluayIsImNoZWNrZWQiLCIkdGhpcyIsInByb2R1Y3RzVG9Db21wYXJlIiwic2hvd0FsZXJ0TW9kYWwiLCIkY2xpY2tlZENoZWNrZWRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0lBRXFCQSxXOzs7QUFDakIsdUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsb0NBQU1BLE9BQU47QUFFQUMsVUFBTSxDQUFDQyxnQkFBUCxDQUF3QixjQUF4QixFQUF3QyxZQUFNO0FBQzFDLFVBQUlDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QkMsRUFBdkIsS0FBOEIsTUFBbEMsRUFBMEM7QUFDdENKLGNBQU0sQ0FBQ0ssWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsY0FBNUIsRUFBNEMsVUFBNUM7QUFDSDtBQUNKLEtBSkQ7QUFIaUI7QUFRcEI7Ozs7U0FFREMsb0IsR0FBQSxnQ0FBdUI7QUFDbkIsUUFBTUMsZUFBZSxHQUFHQyxDQUFDLENBQUMsZ0NBQUQsQ0FBekI7O0FBRUEsUUFBSVQsTUFBTSxDQUFDSyxZQUFQLENBQW9CSyxPQUFwQixDQUE0QixjQUE1QixDQUFKLEVBQWlEO0FBQzdDRixxQkFBZSxDQUFDRyxLQUFoQjtBQUNBWCxZQUFNLENBQUNLLFlBQVAsQ0FBb0JPLFVBQXBCLENBQStCLGNBQS9CO0FBQ0g7QUFDSixHOztTQUVEQyxjLEdBQUEsd0JBQWVDLEtBQWYsRUFBc0JDLGFBQXRCLEVBQXFDO0FBQ2pDLFFBQU1DLEdBQUcsR0FBR0MsMENBQUcsQ0FBQ0MsS0FBSixDQUFVbEIsTUFBTSxDQUFDbUIsUUFBUCxDQUFnQkMsSUFBMUIsRUFBZ0MsSUFBaEMsQ0FBWjtBQUNBLFFBQU1DLFdBQVcsR0FBR1osQ0FBQyxDQUFDTSxhQUFELENBQUQsQ0FBaUJPLFNBQWpCLEdBQTZCQyxLQUE3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QUMsa0RBQUQsQ0FBZDtBQUNBdEwsV0FBSyxDQUFDWSxjQUFOO0FBQ0g7QUFDSixHQVJEO0FBVUFqQixHQUFDLENBQUMsTUFBRCxDQUFELENBQVUrQyxFQUFWLENBQWEsT0FBYixFQUFzQixxQkFBdEIsRUFBNkMsWUFBTTtBQUMvQyxRQUFNNkksb0JBQW9CLEdBQUc1TCxDQUFDLENBQUMsTUFBRCxDQUFELENBQVVvRCxJQUFWLENBQWUsb0NBQWYsQ0FBN0I7O0FBRUEsUUFBSXdJLG9CQUFvQixDQUFDdkksTUFBckIsSUFBK0IsQ0FBbkMsRUFBc0M7QUFDbENzSSxtRUFBYyxDQUFDLGtEQUFELENBQWQ7QUFDQSxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBUEQ7QUFRSCxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nUGFnZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZCA9PT0gJ3NvcnQnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0QnlTdGF0dXMnLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYW5nZUZvY3VzT25Tb3J0QnkoKSB7XG4gICAgICAgIGNvbnN0ICRzb3J0QnlTZWxlY3RvciA9ICQoJ1tkYXRhLXNvcnQtYnk9XCJwcm9kdWN0XCJdICNzb3J0Jyk7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29ydEJ5U3RhdHVzJykpIHtcbiAgICAgICAgICAgICRzb3J0QnlTZWxlY3Rvci5mb2N1cygpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzb3J0QnlTdGF0dXMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xuXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KSB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBob29rcywgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL3V0aWxzL3VybC11dGlscyc7XG5pbXBvcnQgbW9kYWxGYWN0b3J5LCB7IE1vZGFsRXZlbnRzIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnLi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBub2QgZnJvbSAnLi9ub2QnO1xuXG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGFjY29yZGlvblRvZ2dsZVNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmFjY29yZGlvbi1uYXZpZ2F0aW9uLCAjZmFjZXRlZFNlYXJjaCAuZmFjZXRlZFNlYXJjaC10b2dnbGUnLFxuICAgIGJsb2NrZXJTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5ibG9ja2VyJyxcbiAgICBjbGVhckZhY2V0U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuZmFjZXRlZFNlYXJjaC1jbGVhckxpbmsnLFxuICAgIGNvbXBvbmVudFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2gtbmF2TGlzdCcsXG4gICAgZmFjZXROYXZMaXN0U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAubmF2TGlzdCcsXG4gICAgcHJpY2VSYW5nZUVycm9yU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1pbmxpbmVNZXNzYWdlJyxcbiAgICBwcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIC5mb3JtLWZpZWxkc2V0JyxcbiAgICBwcmljZVJhbmdlRm9ybVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0nLFxuICAgIHByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWF4X3ByaWNlXScsXG4gICAgcHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1taW5fcHJpY2VdJyxcbiAgICBzaG93TW9yZVRvZ2dsZVNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmFjY29yZGlvbi1jb250ZW50IC50b2dnbGVMaW5rJyxcbiAgICBmYWNldGVkU2VhcmNoRmlsdGVySXRlbXM6ICcjZmFjZXRlZFNlYXJjaC1maWx0ZXJJdGVtcyAuZm9ybS1pbnB1dCcsXG4gICAgbW9kYWw6IG1vZGFsRmFjdG9yeSgnI21vZGFsJylbMF0sXG4gICAgbW9kYWxPcGVuOiBmYWxzZSxcbn07XG5cbi8qKlxuICogRmFjZXRlZCBzZWFyY2ggdmlldyBjb21wb25lbnRcbiAqL1xuY2xhc3MgRmFjZXRlZFNlYXJjaCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zIC0gT2JqZWN0IHdpdGggb3B0aW9ucyBmb3IgdGhlIGFqYXggcmVxdWVzdHNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgYWZ0ZXIgZmV0Y2hpbmcgdGVtcGxhdGVzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBDb25maWd1cmFibGUgb3B0aW9uc1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBsZXQgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICogICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgKiAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICogICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInXG4gICAgICogICAgIH1cbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogbGV0IHRlbXBsYXRlc0RpZExvYWQgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICogICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAqICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIGxldCBmYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIHRlbXBsYXRlc0RpZExvYWQpO1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3RPcHRpb25zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICAvLyBQcml2YXRlIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5yZXF1ZXN0T3B0aW9ucyA9IHJlcXVlc3RPcHRpb25zO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF8uZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gW107XG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC4kbW9kYWwub24oTW9kYWxFdmVudHMub3BlbmVkLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgJGZpbHRlckl0ZW1zID0gJChldmVudC50YXJnZXQpLmZpbmQoJyNmYWNldGVkU2VhcmNoLWZpbHRlckl0ZW1zJyk7XG4gICAgICAgICAgICAgICAgaWYgKCRmaWx0ZXJJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1vZGFsLnNldHVwRm9jdXNUcmFwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxuICAgICAgICB0aGlzLmluaXRQcmljZVZhbGlkYXRvcigpO1xuXG4gICAgICAgIC8vIFNob3cgbGltaXRlZCBpdGVtcyBieSBkZWZhdWx0XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKS5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJChuYXZMaXN0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1hcmsgaW5pdGlhbGx5IGNvbGxhcHNlZCBhY2NvcmRpb25zXG4gICAgICAgICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKS5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMucHVzaChjb2xsYXBzaWJsZS50YXJnZXRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbGxhcHNlIGFsbCBmYWNldHMgaWYgaW5pdGlhbGx5IGhpZGRlblxuICAgICAgICAvLyBOT1RFOiBOZWVkIHRvIGV4ZWN1dGUgYWZ0ZXIgQ29sbGFwc2libGUgZ2V0cyBib290c3RyYXBwZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29tcG9uZW50U2VsZWN0b3IpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlQWxsRmFjZXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9ic2VydmUgdXNlciBldmVudHNcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Ub2dnbGVDbGljayA9IHRoaXMub25Ub2dnbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlID0gdGhpcy5vbkFjY29yZGlvblRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2xlYXJGYWNldCA9IHRoaXMub25DbGVhckZhY2V0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25GYWNldENsaWNrID0gdGhpcy5vbkZhY2V0Q2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJhbmdlU3VibWl0ID0gdGhpcy5vblJhbmdlU3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyA9IHRoaXMuZmlsdGVyRmFjZXRJdGVtcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcmVmcmVzaFZpZXcoY29udGVudCkge1xuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSB2aWV3IHN0YXRlXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpO1xuICAgICAgICB0aGlzLnJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCk7XG5cbiAgICAgICAgLy8gQmluZCBldmVudHNcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5zaG93KCk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2UodXJsVXRpbHMuZ2V0VXJsKCksIHRoaXMucmVxdWVzdE9wdGlvbnMsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3RvcikuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdmlldyB3aXRoIG5ldyBjb250ZW50XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KGNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcblxuICAgICAgICAvLyBSZW1vdmVcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG4gICAgICAgIGNvbnN0IGhhc01vcmVSZXN1bHRzID0gJG5hdkxpc3QuZGF0YSgnaGFzTW9yZVJlc3VsdHMnKTtcblxuICAgICAgICBpZiAoaGFzTW9yZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBbaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBkZXBlbmRpbmcgb24gYGNvbGxhcHNlZGAgZmxhZ1xuICAgICAgICBpZiAoXy5pbmNsdWRlcyh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgZmFjZXQgPSAkbmF2TGlzdC5kYXRhKCdmYWNldCcpO1xuICAgICAgICBjb25zdCBmYWNldFVybCA9IHVybFV0aWxzLmdldFVybCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlKSB7XG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShmYWNldFVybCwge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBsaXN0X2FsbDogZmFjZXQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbE9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmaWx0ZXJGYWNldEl0ZW1zKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRpdGVtcyA9ICQoJy5uYXZMaXN0LWl0ZW0nKTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgJGl0ZW1zLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gJChlbGVtZW50KS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YocXVlcnkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSkge1xuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuXG4gICAgICAgIGNvbGxhcHNpYmxlLm9wZW4oKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICBjb2xsYXBzaWJsZS5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlQWxsRmFjZXRzKCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEFsbEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgaW5pdFByaWNlVmFsaWRhdG9yKCkge1xuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSBub2QoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0ge1xuICAgICAgICAgICAgZXJyb3JTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VFcnJvclNlbGVjdG9yLFxuICAgICAgICAgICAgZmllbGRzZXRTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIG1heFByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgfTtcblxuICAgICAgICBWYWxpZGF0b3JzLnNldE1pbk1heFByaWNlVmFsaWRhdGlvbih2YWxpZGF0b3IsIHNlbGVjdG9ycywgdGhpcy5vcHRpb25zLnZhbGlkYXRpb25FcnJvck1lc3NhZ2VzKTtcblxuICAgICAgICB0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IgPSB2YWxpZGF0b3I7XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKSB7XG4gICAgICAgIGNvbnN0ICRuYXZMaXN0cyA9ICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKTtcblxuICAgICAgICAvLyBSZXN0b3JlIGNvbGxhcHNlZCBzdGF0ZSBmb3IgZWFjaCBmYWNldFxuICAgICAgICAkbmF2TGlzdHMuZWFjaCgoaW5kZXgsIG5hdkxpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRuYXZMaXN0ID0gJChuYXZMaXN0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZENvbGxhcHNlID0gXy5pbmNsdWRlcyh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gY29sbGFwc2libGUudGFyZ2V0SWQ7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IF8uaW5jbHVkZXModGhpcy5jb2xsYXBzZWRGYWNldHMsIGlkKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICAvLyBDbGVhbi11cFxuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIC8vIERPTSBldmVudHNcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzdGF0ZWNoYW5nZScsIHRoaXMub25TdGF0ZUNoYW5nZSk7XG4gICAgICAgICQod2luZG93KS5vbigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm9wdGlvbnMuc2hvd01vcmVUb2dnbGVTZWxlY3RvciwgdGhpcy5vblRvZ2dsZUNsaWNrKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3RvZ2dsZS5jb2xsYXBzaWJsZScsIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvciwgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub24oJ2NsaWNrJywgdGhpcy5vbkNsZWFyRmFjZXQpO1xuXG4gICAgICAgIC8vIEhvb2tzXG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICAvLyBET00gZXZlbnRzXG4gICAgICAgICQod2luZG93KS5vZmYoJ3N0YXRlY2hhbmdlJywgdGhpcy5vblN0YXRlQ2hhbmdlKTtcbiAgICAgICAgJCh3aW5kb3cpLm9mZigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigndG9nZ2xlLmNvbGxhcHNpYmxlJywgdGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXl1cCcsIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub2ZmKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcblxuICAgICAgICAvLyBIb29rc1xuICAgICAgICBob29rcy5vZmYoJ2ZhY2V0ZWRTZWFyY2gtZmFjZXQtY2xpY2tlZCcsIHRoaXMub25GYWNldENsaWNrKTtcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgICAgIGhvb2tzLm9mZignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgIG9uQ2xlYXJGYWNldChldmVudCkge1xuICAgICAgICBjb25zdCAkbGluayA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBVcGRhdGUgVVJMXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICR0b2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQoJHRvZ2dsZS5hdHRyKCdocmVmJykpO1xuXG4gICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIGl0ZW1zXG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG4gICAgfVxuXG4gICAgb25GYWNldENsaWNrKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0ICRsaW5rID0gJChjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgdXJsID0gJGxpbmsuYXR0cignaHJlZicpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJGxpbmsudG9nZ2xlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIFVSTFxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tb2RhbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgdXJsLnF1ZXJ5W3F1ZXJ5UGFyYW1zWzBdXSA9IHF1ZXJ5UGFyYW1zWzFdO1xuICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XG5cbiAgICAgICAgLy8gVXJsIG9iamVjdCBgcXVlcnlgIGlzIG5vdCBhIHRyYWRpdGlvbmFsIEphdmFTY3JpcHQgT2JqZWN0IG9uIGFsbCBzeXN0ZW1zLCBjbG9uZSBpdCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpIH0pKTtcbiAgICB9XG5cbiAgICBvblJhbmdlU3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IuYXJlQWxsKG5vZC5jb25zdGFudHMuVkFMSUQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBkZWNvZGVVUkkoJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKSkuc3BsaXQoJyYnKTtcbiAgICAgICAgcXVlcnlQYXJhbXMgPSB1cmxVdGlscy5wYXJzZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5UGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB1cmwucXVlcnlba2V5XSA9IHF1ZXJ5UGFyYW1zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcmwgb2JqZWN0IGBxdWVyeWAgaXMgbm90IGEgdHJhZGl0aW9uYWwgSmF2YVNjcmlwdCBPYmplY3Qgb24gYWxsIHN5c3RlbXMsIGNsb25lIGl0IGluc3RlYWRcbiAgICAgICAgY29uc3QgdXJsUXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih1cmxRdWVyeVBhcmFtcywgdXJsLnF1ZXJ5KTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpIH0pKTtcbiAgICB9XG5cbiAgICBvblN0YXRlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBvbkFjY29yZGlvblRvZ2dsZShldmVudCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcbiAgICAgICAgY29uc3QgaWQgPSBjb2xsYXBzaWJsZS50YXJnZXRJZDtcblxuICAgICAgICBpZiAoY29sbGFwc2libGUuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gXy51bmlvbih0aGlzLmNvbGxhcHNlZEZhY2V0cywgW2lkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0cywgaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Qb3BTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGN1cnJlbnRVcmwpO1xuICAgICAgICAvLyBJZiBzZWFyY2hQYXJhbXMgZG9lcyBub3QgY29udGFpbiBhIHBhZ2UgdmFsdWUgdGhlbiBtb2RpZnkgdXJsIHF1ZXJ5IHN0cmluZyB0byBoYXZlIHBhZ2U9MVxuICAgICAgICBpZiAoIXNlYXJjaFBhcmFtcy5oYXMoJ3BhZ2UnKSkge1xuICAgICAgICAgICAgY29uc3QgbGlua1VybCA9ICQoJy5wYWdpbmF0aW9uLWxpbmsnKS5hdHRyKCdocmVmJyk7XG4gICAgICAgICAgICBjb25zdCByZSA9IC9wYWdlPVswLTldKy9pO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZExpbmtVcmwgPSBsaW5rVXJsLnJlcGxhY2UocmUsICdwYWdlPTEnKTtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHVwZGF0ZWRMaW5rVXJsKTtcbiAgICAgICAgfVxuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZhY2V0ZWRTZWFyY2g7XG4iLCJpbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xuXG5mdW5jdGlvbiBkZWNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IGNvdW50ZXIuaW5kZXhPZihpdGVtKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xuICAgIGNvdW50ZXIucHVzaChpdGVtKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ291bnRlck5hdihjb3VudGVyLCAkbGluaywgdXJsQ29udGV4dCkge1xuICAgIGlmIChjb3VudGVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpZiAoISRsaW5rLmlzKCd2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICRsaW5rLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsIGAke3VybENvbnRleHQuY29tcGFyZX0vJHtjb3VudGVyLmpvaW4oJy8nKX1gKTtcbiAgICAgICAgJGxpbmsuZmluZCgnc3Bhbi5jb3VudFBpbGwnKS5odG1sKGNvdW50ZXIubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbGluay5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHVybENvbnRleHQpIHtcbiAgICBsZXQgY29tcGFyZUNvdW50ZXIgPSBbXTtcblxuICAgIGNvbnN0ICRjb21wYXJlTGluayA9ICQoJ2FbZGF0YS1jb21wYXJlLW5hdl0nKTtcblxuICAgICQoJ2JvZHknKS5vbignY29tcGFyZVJlc2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCAkY2hlY2tlZCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xuXG4gICAgICAgIGNvbXBhcmVDb3VudGVyID0gJGNoZWNrZWQubGVuZ3RoID8gJGNoZWNrZWQubWFwKChpbmRleCwgZWxlbWVudCkgPT4gZWxlbWVudC52YWx1ZSkuZ2V0KCkgOiBbXTtcbiAgICAgICAgdXBkYXRlQ291bnRlck5hdihjb21wYXJlQ291bnRlciwgJGNvbXBhcmVMaW5rLCB1cmxDb250ZXh0KTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLWNvbXBhcmUtaWRdJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZTtcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDb21wYXJlTGluayA9ICQoJ2FbZGF0YS1jb21wYXJlLW5hdl0nKTtcblxuICAgICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICBpbmNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlY3JlbWVudENvdW50ZXIoY29tcGFyZUNvdW50ZXIsIHByb2R1Y3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlQ291bnRlck5hdihjb21wYXJlQ291bnRlciwgJGNsaWNrZWRDb21wYXJlTGluaywgdXJsQ29udGV4dCk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ3N1Ym1pdCcsICdbZGF0YS1wcm9kdWN0LWNvbXBhcmVdJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCAkdGhpcyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzVG9Db21wYXJlID0gJHRoaXMuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBpZiAocHJvZHVjdHNUb0NvbXBhcmUubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKCdZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3QgdHdvIHByb2R1Y3RzIHRvIGNvbXBhcmUnKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnYVtkYXRhLWNvbXBhcmUtbmF2XScsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDaGVja2VkSW5wdXQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBpZiAoJGNsaWNrZWRDaGVja2VkSW5wdXQubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKCdZb3UgbXVzdCBzZWxlY3QgYXQgbGVhc3QgdHdvIHByb2R1Y3RzIHRvIGNvbXBhcmUnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==