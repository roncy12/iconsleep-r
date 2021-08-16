(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./assets/js/theme/search.js":
/*!***********************************!*\
  !*** ./assets/js/theme/search.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.min.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jstree__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var leftArrowKey = 37;
var rightArrowKey = 39;

var Search = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Search, _CatalogPage);

  function Search() {
    return _CatalogPage.apply(this, arguments) || this;
  }

  var _proto = Search.prototype;

  _proto.formatCategoryTreeForJSTree = function formatCategoryTreeForJSTree(node) {
    var _this = this;

    var nodeData = {
      text: node.data,
      id: node.metadata.id,
      state: {
        selected: node.selected
      }
    };

    if (node.state) {
      nodeData.state.opened = node.state === 'open';
      nodeData.children = true;
    }

    if (node.children) {
      nodeData.children = [];
      node.children.forEach(function (childNode) {
        nodeData.children.push(_this.formatCategoryTreeForJSTree(childNode));
      });
    }

    return nodeData;
  };

  _proto.showProducts = function showProducts(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }

    this.$productListingContainer.removeClass('u-hidden');
    this.$facetedSearchContainer.removeClass('u-hidden');
    this.$contentResultsContainer.addClass('u-hidden');
    $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-content-results-toggle]').addClass('navBar-action');
    $('[data-product-results-toggle]').removeClass('navBar-action');
    $('[data-product-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-product-results-toggle]'));

    if (!navigate) {
      return;
    }

    var searchData = $('#search-results-product-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };

  _proto.showContent = function showContent(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }

    this.$contentResultsContainer.removeClass('u-hidden');
    this.$productListingContainer.addClass('u-hidden');
    this.$facetedSearchContainer.addClass('u-hidden');
    $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-product-results-toggle]').addClass('navBar-action');
    $('[data-content-results-toggle]').removeClass('navBar-action');
    $('[data-content-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-content-results-toggle]'));

    if (!navigate) {
      return;
    }

    var searchData = $('#search-results-content-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };

  _proto.activateTab = function activateTab($tabToActivate) {
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    $tabsCollection.each(function (idx, tab) {
      var $tab = $(tab);

      if ($tab.is($tabToActivate)) {
        $tab.removeAttr('tabindex');
        $tab.attr('aria-selected', true);
        return;
      }

      $tab.attr('tabindex', '-1');
      $tab.attr('aria-selected', false);
    });
  };

  _proto.onTabChangeWithArrows = function onTabChangeWithArrows(event) {
    var eventKey = event.which;
    var isLeftOrRightArrowKeydown = eventKey === leftArrowKey || eventKey === rightArrowKey;
    if (!isLeftOrRightArrowKeydown) return;
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    var isActiveElementNotTab = $tabsCollection.index($(document.activeElement)) === -1;
    if (isActiveElementNotTab) return;
    var $activeTab = $("#" + document.activeElement.id);
    var activeTabIdx = $tabsCollection.index($activeTab);
    var lastTabIdx = $tabsCollection.length - 1;
    var nextTabIdx;

    switch (eventKey) {
      case leftArrowKey:
        nextTabIdx = activeTabIdx === 0 ? lastTabIdx : activeTabIdx - 1;
        break;

      case rightArrowKey:
        nextTabIdx = activeTabIdx === lastTabIdx ? 0 : activeTabIdx + 1;
        break;

      default:
        break;
    }

    $($tabsCollection.get(nextTabIdx)).focus().trigger('click');
  };

  _proto.onReady = function onReady() {
    var _this2 = this;

    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context.urls);
    this.arrangeFocusOnSortBy();
    var $searchForm = $('[data-advanced-search-form]');
    var $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
    var url = url__WEBPACK_IMPORTED_MODULE_6___default.a.parse(window.location.href, true);
    var treeData = [];
    this.$productListingContainer = $('#product-listing-container');
    this.$facetedSearchContainer = $('#faceted-search-container');
    this.$contentResultsContainer = $('#search-results-content'); // Init faceted search

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    } // Init collapsibles


    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();
    $('[data-product-results-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.showProducts();
    });
    $('[data-content-results-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.showContent();
    });
    $('[data-search-page-tabs]').on('keyup', this.onTabChangeWithArrows);

    if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
      this.showContent(false);
    } else {
      this.showProducts(false);
    }

    var validator = this.initValidation($searchForm).bindValidation($searchForm.find('#search_query_adv'));
    this.context.categoryTree.forEach(function (node) {
      treeData.push(_this2.formatCategoryTreeForJSTree(node));
    });
    this.categoryTreeData = treeData;
    this.createCategoryTree($categoryTreeContainer);
    $searchForm.on('submit', function (event) {
      var selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();

      if (!validator.check()) {
        return event.preventDefault();
      }

      $searchForm.find('input[name="category\[\]"]').remove();

      for (var _iterator = _createForOfIteratorHelperLoose(selectedCategoryIds), _step; !(_step = _iterator()).done;) {
        var categoryId = _step.value;
        var input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId
        });
        $searchForm.append(input);
      }
    });
    setTimeout(function () {
      $('[data-search-aria-message]').removeClass('u-hidden');
    }, 100);
  };

  _proto.loadTreeNodes = function loadTreeNodes(node, cb) {
    var _this3 = this;

    $.ajax({
      url: '/remote/v1/category-tree',
      data: {
        selectedCategoryId: node.id,
        prefix: 'category'
      },
      headers: {
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : ''
      }
    }).done(function (data) {
      var formattedResults = [];
      data.forEach(function (dataNode) {
        formattedResults.push(_this3.formatCategoryTreeForJSTree(dataNode));
      });
      cb(formattedResults);
    });
  };

  _proto.createCategoryTree = function createCategoryTree($container) {
    var _this4 = this;

    var treeOptions = {
      core: {
        data: function data(node, cb) {
          // Root node
          if (node.id === '#') {
            cb(_this4.categoryTreeData);
          } else {
            // Lazy loaded children
            _this4.loadTreeNodes(node, cb);
          }
        },
        themes: {
          icons: true
        }
      },
      checkbox: {
        three_state: false
      },
      plugins: ['checkbox']
    };
    $container.jstree(treeOptions);
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this5 = this;

    // eslint-disable-next-line object-curly-newline
    var _this$context = this.context,
        onMinPriceError = _this$context.onMinPriceError,
        onMaxPriceError = _this$context.onMaxPriceError,
        minPriceNotEntered = _this$context.minPriceNotEntered,
        maxPriceNotEntered = _this$context.maxPriceNotEntered,
        onInvalidPrice = _this$context.onInvalidPrice;
    var $productListingContainer = $('#product-listing-container');
    var $contentListingContainer = $('#search-results-content');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $searchHeading = $('#search-results-heading');
    var $searchCount = $('#search-results-product-count');
    var $contentCount = $('#search-results-content-count');
    var productsPerPage = this.context.searchProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'search/product-listing',
        contentListing: 'search/content-listing',
        sidebar: 'search/sidebar',
        heading: 'search/heading',
        productCount: 'search/product-count',
        contentCount: 'search/content-count'
      },
      config: {
        product_results: {
          limit: productsPerPage
        }
      },
      showMore: 'search/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__["default"](requestOptions, function (content) {
      $searchHeading.html(content.heading);
      var url = url__WEBPACK_IMPORTED_MODULE_6___default.a.parse(window.location.href, true);

      if (url.query.section === 'content') {
        $contentListingContainer.html(content.contentListing);
        $contentCount.html(content.contentCount);

        _this5.showContent(false);
      } else {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);
        $searchCount.html(content.productCount);

        _this5.showProducts(false);
      }

      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  _proto.initValidation = function initValidation($form) {
    this.$form = $form;
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_9__["default"])({
      submit: $form,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    return this;
  };

  _proto.bindValidation = function bindValidation($element) {
    if (this.validator) {
      this.validator.add({
        selector: $element,
        validate: 'presence',
        errorMessage: $element.data('errorMessage')
      });
    }

    return this;
  };

  _proto.check = function check() {
    if (this.validator) {
      this.validator.performCheck();
      return this.validator.areAll('valid');
    }

    return false;
  };

  return Search;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvc2VhcmNoLmpzIl0sIm5hbWVzIjpbImxlZnRBcnJvd0tleSIsInJpZ2h0QXJyb3dLZXkiLCJTZWFyY2giLCJmb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUiLCJub2RlIiwibm9kZURhdGEiLCJ0ZXh0IiwiZGF0YSIsImlkIiwibWV0YWRhdGEiLCJzdGF0ZSIsInNlbGVjdGVkIiwib3BlbmVkIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGROb2RlIiwicHVzaCIsInNob3dQcm9kdWN0cyIsIm5hdmlnYXRlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsIiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciIsImFkZENsYXNzIiwiJCIsImFjdGl2YXRlVGFiIiwic2VhcmNoRGF0YSIsInVybCIsImNvdW50IiwidXJsVXRpbHMiLCJyZXBsYWNlUGFyYW1zIiwicGFnZSIsImdvVG9VcmwiLCJzaG93Q29udGVudCIsIiR0YWJUb0FjdGl2YXRlIiwiJHRhYnNDb2xsZWN0aW9uIiwiZmluZCIsImVhY2giLCJpZHgiLCJ0YWIiLCIkdGFiIiwiaXMiLCJyZW1vdmVBdHRyIiwiYXR0ciIsIm9uVGFiQ2hhbmdlV2l0aEFycm93cyIsImV2ZW50IiwiZXZlbnRLZXkiLCJ3aGljaCIsImlzTGVmdE9yUmlnaHRBcnJvd0tleWRvd24iLCJpc0FjdGl2ZUVsZW1lbnROb3RUYWIiLCJpbmRleCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIiRhY3RpdmVUYWIiLCJhY3RpdmVUYWJJZHgiLCJsYXN0VGFiSWR4IiwibGVuZ3RoIiwibmV4dFRhYklkeCIsImdldCIsImZvY3VzIiwidHJpZ2dlciIsIm9uUmVhZHkiLCJjb21wYXJlUHJvZHVjdHMiLCJjb250ZXh0IiwidXJscyIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiJHNlYXJjaEZvcm0iLCIkY2F0ZWdvcnlUcmVlQ29udGFpbmVyIiwiVXJsIiwicGFyc2UiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ0cmVlRGF0YSIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJvbiIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInByZXZlbnREZWZhdWx0IiwicXVlcnkiLCJzZWN0aW9uIiwidmFsaWRhdG9yIiwiaW5pdFZhbGlkYXRpb24iLCJiaW5kVmFsaWRhdGlvbiIsImNhdGVnb3J5VHJlZSIsImNhdGVnb3J5VHJlZURhdGEiLCJjcmVhdGVDYXRlZ29yeVRyZWUiLCJzZWxlY3RlZENhdGVnb3J5SWRzIiwianN0cmVlIiwiZ2V0X3NlbGVjdGVkIiwiY2hlY2siLCJyZW1vdmUiLCJjYXRlZ29yeUlkIiwiaW5wdXQiLCJ0eXBlIiwibmFtZSIsInZhbHVlIiwiYXBwZW5kIiwic2V0VGltZW91dCIsImxvYWRUcmVlTm9kZXMiLCJjYiIsImFqYXgiLCJzZWxlY3RlZENhdGVnb3J5SWQiLCJwcmVmaXgiLCJoZWFkZXJzIiwiQkNEYXRhIiwiY3NyZl90b2tlbiIsImRvbmUiLCJmb3JtYXR0ZWRSZXN1bHRzIiwiZGF0YU5vZGUiLCIkY29udGFpbmVyIiwidHJlZU9wdGlvbnMiLCJjb3JlIiwidGhlbWVzIiwiaWNvbnMiLCJjaGVja2JveCIsInRocmVlX3N0YXRlIiwicGx1Z2lucyIsIm9uTWluUHJpY2VFcnJvciIsIm9uTWF4UHJpY2VFcnJvciIsIm1pblByaWNlTm90RW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwiJGNvbnRlbnRMaXN0aW5nQ29udGFpbmVyIiwiJHNlYXJjaEhlYWRpbmciLCIkc2VhcmNoQ291bnQiLCIkY29udGVudENvdW50IiwicHJvZHVjdHNQZXJQYWdlIiwic2VhcmNoUHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiY29udGVudExpc3RpbmciLCJzaWRlYmFyIiwiaGVhZGluZyIsInByb2R1Y3RDb3VudCIsImNvbnRlbnRDb3VudCIsImNvbmZpZyIsInByb2R1Y3RfcmVzdWx0cyIsImxpbWl0Iiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCIkZm9ybSIsIm5vZCIsInN1Ym1pdCIsInRhcCIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCIkZWxlbWVudCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJlcnJvck1lc3NhZ2UiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJDYXRhbG9nUGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsWUFBWSxHQUFHLEVBQXJCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLEVBQXRCOztJQUVxQkMsTTs7Ozs7Ozs7O1NBQ2pCQywyQixHQUFBLHFDQUE0QkMsSUFBNUIsRUFBa0M7QUFBQTs7QUFDOUIsUUFBTUMsUUFBUSxHQUFHO0FBQ2JDLFVBQUksRUFBRUYsSUFBSSxDQUFDRyxJQURFO0FBRWJDLFFBQUUsRUFBRUosSUFBSSxDQUFDSyxRQUFMLENBQWNELEVBRkw7QUFHYkUsV0FBSyxFQUFFO0FBQ0hDLGdCQUFRLEVBQUVQLElBQUksQ0FBQ087QUFEWjtBQUhNLEtBQWpCOztBQVFBLFFBQUlQLElBQUksQ0FBQ00sS0FBVCxFQUFnQjtBQUNaTCxjQUFRLENBQUNLLEtBQVQsQ0FBZUUsTUFBZixHQUF3QlIsSUFBSSxDQUFDTSxLQUFMLEtBQWUsTUFBdkM7QUFDQUwsY0FBUSxDQUFDUSxRQUFULEdBQW9CLElBQXBCO0FBQ0g7O0FBRUQsUUFBSVQsSUFBSSxDQUFDUyxRQUFULEVB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QUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLcEUsU0FBTCxHQUFpQnFFLDJEQUFHLENBQUM7QUFDakJDLFlBQU0sRUFBRUYsS0FEUztBQUVqQkcsU0FBRyxFQUFFQyxrRkFBeUJBO0FBRmIsS0FBRCxDQUFwQjtBQUtBLFdBQU8sSUFBUDtBQUNILEc7O1NBRUR0RSxjLEdBQUEsd0JBQWV1RSxRQUFmLEVBQXlCO0FBQ3JCLFFBQUksS0FBS3pFLFNBQVQsRUFBb0I7QUFDaEIsV0FBS0EsU0FBTCxDQUFlMEUsR0FBZixDQUFtQjtBQUNmQyxnQkFBUSxFQUFFRixRQURLO0FBRWZHLGdCQUFRLEVBQUUsVUFGSztBQUdmQyxvQkFBWSxFQUFFSixRQUFRLENBQUNySixJQUFULENBQWMsY0FBZDtBQUhDLE9BQW5CO0FBS0g7O0FBRUQsV0FBTyxJQUFQO0FBQ0gsRzs7U0FFRHFGLEssR0FBQSxpQkFBUTtBQUNKLFFBQUksS0FBS1QsU0FBVCxFQUFvQjtBQUNoQixXQUFLQSxTQUFMLENBQWU4RSxZQUFmO0FBQ0EsYUFBTyxLQUFLOUUsU0FBTCxDQUFlK0UsTUFBZixDQUFzQixPQUF0QixDQUFQO0FBQ0g7O0FBRUQsV0FBTyxLQUFQO0FBQ0gsRzs7O0VBNVUrQkMsZ0QiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjE0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcbmltcG9ydCB7IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMvdXJsLXV0aWxzJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0ICdqc3RyZWUnO1xuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xuXG5jb25zdCBsZWZ0QXJyb3dLZXkgPSAzNztcbmNvbnN0IHJpZ2h0QXJyb3dLZXkgPSAzOTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShub2RlKSB7XG4gICAgICAgIGNvbnN0IG5vZGVEYXRhID0ge1xuICAgICAgICAgICAgdGV4dDogbm9kZS5kYXRhLFxuICAgICAgICAgICAgaWQ6IG5vZGUubWV0YWRhdGEuaWQsXG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBub2RlLnNlbGVjdGVkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobm9kZS5zdGF0ZSkge1xuICAgICAgICAgICAgbm9kZURhdGEuc3RhdGUub3BlbmVkID0gbm9kZS5zdGF0ZSA9PT0gJ29wZW4nO1xuICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5vZGVEYXRhLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGVEYXRhLmNoaWxkcmVuLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUoY2hpbGROb2RlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlRGF0YTtcbiAgICB9XG5cbiAgICBzaG93UHJvZHVjdHMobmF2aWdhdGUgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcblxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcbiAgICAgICAgJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKS5hZGRDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5hZGRDbGFzcygnbmF2QmFyLWFjdGlvbi1jb2xvci0tYWN0aXZlJyk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYigkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpKTtcblxuICAgICAgICBpZiAoIW5hdmlnYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hEYXRhID0gJCgnI3NlYXJjaC1yZXN1bHRzLXByb2R1Y3QtY291bnQgc3BhbicpLmRhdGEoKTtcbiAgICAgICAgY29uc3QgdXJsID0gKHNlYXJjaERhdGEuY291bnQgPiAwKSA/IHNlYXJjaERhdGEudXJsIDogdXJsVXRpbHMucmVwbGFjZVBhcmFtcyhzZWFyY2hEYXRhLnVybCwge1xuICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xuICAgIH1cblxuICAgIHNob3dDb250ZW50KG5hdmlnYXRlID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG5cbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbi1jb2xvci0tYWN0aXZlJyk7XG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcblxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uJyk7XG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVUYWIoJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKSk7XG5cbiAgICAgICAgaWYgKCFuYXZpZ2F0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoRGF0YSA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50LWNvdW50IHNwYW4nKS5kYXRhKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IChzZWFyY2hEYXRhLmNvdW50ID4gMCkgPyBzZWFyY2hEYXRhLnVybCA6IHVybFV0aWxzLnJlcGxhY2VQYXJhbXMoc2VhcmNoRGF0YS51cmwsIHtcbiAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZVRhYigkdGFiVG9BY3RpdmF0ZSkge1xuICAgICAgICBjb25zdCAkdGFic0NvbGxlY3Rpb24gPSAkKCdbZGF0YS1zZWFyY2gtcGFnZS10YWJzXScpLmZpbmQoJ1tyb2xlPVwidGFiXCJdJyk7XG5cbiAgICAgICAgJHRhYnNDb2xsZWN0aW9uLmVhY2goKGlkeCwgdGFiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFiID0gJCh0YWIpO1xuXG4gICAgICAgICAgICBpZiAoJHRhYi5pcygkdGFiVG9BY3RpdmF0ZSkpIHtcbiAgICAgICAgICAgICAgICAkdGFiLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgICAgICAgJHRhYi5hdHRyKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkdGFiLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICAkdGFiLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uVGFiQ2hhbmdlV2l0aEFycm93cyhldmVudCkge1xuICAgICAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LndoaWNoO1xuICAgICAgICBjb25zdCBpc0xlZnRPclJpZ2h0QXJyb3dLZXlkb3duID0gZXZlbnRLZXkgPT09IGxlZnRBcnJvd0tleVxuICAgICAgICAgICAgfHwgZXZlbnRLZXkgPT09IHJpZ2h0QXJyb3dLZXk7XG4gICAgICAgIGlmICghaXNMZWZ0T3JSaWdodEFycm93S2V5ZG93bikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0ICR0YWJzQ29sbGVjdGlvbiA9ICQoJ1tkYXRhLXNlYXJjaC1wYWdlLXRhYnNdJykuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKTtcblxuICAgICAgICBjb25zdCBpc0FjdGl2ZUVsZW1lbnROb3RUYWIgPSAkdGFic0NvbGxlY3Rpb24uaW5kZXgoJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkgPT09IC0xO1xuICAgICAgICBpZiAoaXNBY3RpdmVFbGVtZW50Tm90VGFiKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgJGFjdGl2ZVRhYiA9ICQoYCMke2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaWR9YCk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhYklkeCA9ICR0YWJzQ29sbGVjdGlvbi5pbmRleCgkYWN0aXZlVGFiKTtcbiAgICAgICAgY29uc3QgbGFzdFRhYklkeCA9ICR0YWJzQ29sbGVjdGlvbi5sZW5ndGggLSAxO1xuXG4gICAgICAgIGxldCBuZXh0VGFiSWR4O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XG4gICAgICAgIGNhc2UgbGVmdEFycm93S2V5OlxuICAgICAgICAgICAgbmV4dFRhYklkeCA9IGFjdGl2ZVRhYklkeCA9PT0gMCA/IGxhc3RUYWJJZHggOiBhY3RpdmVUYWJJZHggLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgcmlnaHRBcnJvd0tleTpcbiAgICAgICAgICAgIG5leHRUYWJJZHggPSBhY3RpdmVUYWJJZHggPT09IGxhc3RUYWJJZHggPyAwIDogYWN0aXZlVGFiSWR4ICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgICQoJHRhYnNDb2xsZWN0aW9uLmdldChuZXh0VGFiSWR4KSkuZm9jdXMoKS50cmlnZ2VyKCdjbGljaycpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XG4gICAgICAgIHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKTtcblxuICAgICAgICBjb25zdCAkc2VhcmNoRm9ybSA9ICQoJ1tkYXRhLWFkdmFuY2VkLXNlYXJjaC1mb3JtXScpO1xuICAgICAgICBjb25zdCAkY2F0ZWdvcnlUcmVlQ29udGFpbmVyID0gJHNlYXJjaEZvcm0uZmluZCgnW2RhdGEtc2VhcmNoLWNhdGVnb3J5LXRyZWVdJyk7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHRyZWVEYXRhID0gW107XG4gICAgICAgIHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy4kY29udGVudFJlc3VsdHNDb250YWluZXIgPSAkKCcjc2VhcmNoLXJlc3VsdHMtY29udGVudCcpO1xuXG4gICAgICAgIC8vIEluaXQgZmFjZXRlZCBzZWFyY2hcbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNob3dDb250ZW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLXNlYXJjaC1wYWdlLXRhYnNdJykub24oJ2tleXVwJywgdGhpcy5vblRhYkNoYW5nZVdpdGhBcnJvd3MpO1xuXG4gICAgICAgIGlmICh0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5maW5kKCdsaS5wcm9kdWN0JykubGVuZ3RoID09PSAwIHx8IHVybC5xdWVyeS5zZWN0aW9uID09PSAnY29udGVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHMoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gdGhpcy5pbml0VmFsaWRhdGlvbigkc2VhcmNoRm9ybSlcbiAgICAgICAgICAgIC5iaW5kVmFsaWRhdGlvbigkc2VhcmNoRm9ybS5maW5kKCcjc2VhcmNoX3F1ZXJ5X2FkdicpKTtcblxuICAgICAgICB0aGlzLmNvbnRleHQuY2F0ZWdvcnlUcmVlLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIHRyZWVEYXRhLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUobm9kZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhdGVnb3J5VHJlZURhdGEgPSB0cmVlRGF0YTtcbiAgICAgICAgdGhpcy5jcmVhdGVDYXRlZ29yeVRyZWUoJGNhdGVnb3J5VHJlZUNvbnRhaW5lcik7XG5cbiAgICAgICAgJHNlYXJjaEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2F0ZWdvcnlJZHMgPSAkY2F0ZWdvcnlUcmVlQ29udGFpbmVyLmpzdHJlZSgpLmdldF9zZWxlY3RlZCgpO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRvci5jaGVjaygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzZWFyY2hGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjYXRlZ29yeVxcW1xcXVwiXScpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhdGVnb3J5SWQgb2Ygc2VsZWN0ZWRDYXRlZ29yeUlkcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjYXRlZ29yeVtdJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkc2VhcmNoRm9ybS5hcHBlbmQoaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICQoJ1tkYXRhLXNlYXJjaC1hcmlhLW1lc3NhZ2VdJykucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgbG9hZFRyZWVOb2Rlcyhub2RlLCBjYikge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL3JlbW90ZS92MS9jYXRlZ29yeS10cmVlJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhdGVnb3J5SWQ6IG5vZGUuaWQsXG4gICAgICAgICAgICAgICAgcHJlZml4OiAnY2F0ZWdvcnknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAneC14c3JmLXRva2VuJzogd2luZG93LkJDRGF0YSAmJiB3aW5kb3cuQkNEYXRhLmNzcmZfdG9rZW4gPyB3aW5kb3cuQkNEYXRhLmNzcmZfdG9rZW4gOiAnJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRSZXN1bHRzID0gW107XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoZGF0YU5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHRzLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUoZGF0YU5vZGUpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjYihmb3JtYXR0ZWRSZXN1bHRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlQ2F0ZWdvcnlUcmVlKCRjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgdHJlZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb3JlOiB7XG4gICAgICAgICAgICAgICAgZGF0YTogKG5vZGUsIGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJvb3Qgbm9kZVxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pZCA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYih0aGlzLmNhdGVnb3J5VHJlZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGF6eSBsb2FkZWQgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFRyZWVOb2Rlcyhub2RlLCBjYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoZW1lczoge1xuICAgICAgICAgICAgICAgICAgICBpY29uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoZWNrYm94OiB7XG4gICAgICAgICAgICAgICAgdGhyZWVfc3RhdGU6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICAnY2hlY2tib3gnLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfTtcblxuICAgICAgICAkY29udGFpbmVyLmpzdHJlZSh0cmVlT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYmplY3QtY3VybHktbmV3bGluZVxuICAgICAgICBjb25zdCB7IG9uTWluUHJpY2VFcnJvciwgb25NYXhQcmljZUVycm9yLCBtaW5QcmljZU5vdEVudGVyZWQsIG1heFByaWNlTm90RW50ZXJlZCwgb25JbnZhbGlkUHJpY2UgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJGNvbnRlbnRMaXN0aW5nQ29udGFpbmVyID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQnKTtcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0ICRzZWFyY2hIZWFkaW5nID0gJCgnI3NlYXJjaC1yZXN1bHRzLWhlYWRpbmcnKTtcbiAgICAgICAgY29uc3QgJHNlYXJjaENvdW50ID0gJCgnI3NlYXJjaC1yZXN1bHRzLXByb2R1Y3QtY291bnQnKTtcbiAgICAgICAgY29uc3QgJGNvbnRlbnRDb3VudCA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50LWNvdW50Jyk7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5zZWFyY2hQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ3NlYXJjaC9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRMaXN0aW5nOiAnc2VhcmNoL2NvbnRlbnQtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ3NlYXJjaC9zaWRlYmFyJyxcbiAgICAgICAgICAgICAgICBoZWFkaW5nOiAnc2VhcmNoL2hlYWRpbmcnLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RDb3VudDogJ3NlYXJjaC9wcm9kdWN0LWNvdW50JyxcbiAgICAgICAgICAgICAgICBjb250ZW50Q291bnQ6ICdzZWFyY2gvY29udGVudC1jb3VudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdF9yZXN1bHRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93TW9yZTogJ3NlYXJjaC9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHNlYXJjaEhlYWRpbmcuaHRtbChjb250ZW50LmhlYWRpbmcpO1xuXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHVybC5xdWVyeS5zZWN0aW9uID09PSAnY29udGVudCcpIHtcbiAgICAgICAgICAgICAgICAkY29udGVudExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LmNvbnRlbnRMaXN0aW5nKTtcbiAgICAgICAgICAgICAgICAkY29udGVudENvdW50Lmh0bWwoY29udGVudC5jb250ZW50Q291bnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG4gICAgICAgICAgICAgICAgJHNlYXJjaENvdW50Lmh0bWwoY29udGVudC5wcm9kdWN0Q291bnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdFZhbGlkYXRpb24oJGZvcm0pIHtcbiAgICAgICAgdGhpcy4kZm9ybSA9ICRmb3JtO1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICRmb3JtLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBiaW5kVmFsaWRhdGlvbigkZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICRlbGVtZW50LFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJGVsZW1lbnQuZGF0YSgnZXJyb3JNZXNzYWdlJyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9