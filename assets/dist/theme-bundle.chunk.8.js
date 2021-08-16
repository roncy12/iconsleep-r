(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);

  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Cart.prototype;

  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components

    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.bindEvents();
  };

  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;

    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1; // Does not quality for min/max quantity

    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;

    if (preVal === void 0) {
      preVal = null;
    }

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry; // Does not quality for min/max quantity

    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: invalidEntry + " is not a valid entry",
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;

    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();

    if (this.$modal === null) {
      this.$modal = $('#modal');
    }

    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
      var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
      $productOptionsContainer.css('height', modalBodyReservedHeight);
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);

      _this4.bindGiftWrappingForm();

      modal.setupFocusTrap();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};

        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };

  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;

    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages'
      }
    };
    this.$overlay.show(); // Remove last item from cart? Reload

    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);

      _this5.$cartTotals.html(response.totals);

      _this5.$cartMessages.html(response.statusMessages);

      $cartPageTitle.replaceWith(response.pageTitle);

      _this5.bindEvents();

      _this5.$overlay.hide();

      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };

  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;

    var debounceTimeout = 400;

    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);

    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);

    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);

    var preVal; // cart update

    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdate($target);
    }); // cart qty manually updates

    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault(); // edit item in cart

      _this6.cartEditOptions(itemId, productId);
    });
  };

  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;

    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault(); // Empty code

      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            html: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;

    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();

      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: $certInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            html: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);

        _this9.bindGiftWrappingForm();
      });
    });
  };

  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');

      if (!id) {
        return;
      }

      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();

      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };

  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents(); // initiate shipping estimator module

    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_5__["default"]($('[data-shipping-estimator]'));
  };

  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");







var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }

  var _proto = ShippingEstimator.prototype;

  _proto.initFormValidation = function initFormValidation() {
    var _this = this;

    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }

      shippingEstimatorAlert.attr('role', 'alert'); // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity

      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }

      if (_this.shippingValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };

  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: 'The \'Country\' field cannot be blank.'
    }]);
  };

  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;

    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");

        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }

        cb(result);
      },
      errorMessage: 'The \'State/Province\' field cannot be blank.'
    }]);
  }
  /**
   * Toggle between default shipping and ups shipping rates
   */
  ;

  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };

  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;

    var $last; // Requests the states for a country with AJAX

    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }

      var $field = $(field);

      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }

      if ($last) {
        _this3.shippingValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;

        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      } // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us


      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };

  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };

    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }

    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };

  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;

    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content); // bind the select button

        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();

      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };

  return ShippingEstimator;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartItemDetails; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");


function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);

  function CartItemDetails($scope, context, productAttributesData) {
    var _this;

    if (productAttributesData === void 0) {
      productAttributesData = {};
    }

    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__["optionChangeDecorator"].call(_assertThisInitialized(_this), hasDefaultOptions); // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view

    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }

    return _this;
  }

  var _proto = CartItemDetails.prototype;

  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');

      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });

        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;

        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');

        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["convertIntoArray"])(value.children);

            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };

            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };

          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;

            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }

          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];

            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }

          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }

          return;
        }

        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');

    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;

      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }
  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */
  ;

  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);

    this.$scope.find('.modal-content').removeClass('hide-content');
  };

  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string') {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
});

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");






/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */

function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });

  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');

  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }

  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }

  return $newElement;
}
/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */


function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });

  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');

  if ($newElement.length !== 0) {
    Object(_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__["insertStateHiddenField"])($newElement);
    $newElement.prev().find('small').hide();
  }

  return $newElement;
}
/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */


function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");

  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()($selectElement)) {
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(statesArray.states, function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + stateObj.name + "</option>");
      }
    });

    $selectElement.html(container.join(' '));
  }
}
/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */


/* harmony default export */ __webpack_exports__["default"] = (function (stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }

  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }

  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();

    if (countryName === '') {
      return;
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_5__["showAlertModal"])(context.state_error);
        return callback(err);
      }

      var $currentInput = $('[data-field-type="State"]');

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyJdLCJuYW1lcyI6WyJDYXJ0Iiwib25SZWFkeSIsIiRtb2RhbCIsIiRjYXJ0Q29udGVudCIsIiQiLCIkY2FydE1lc3NhZ2VzIiwiJGNhcnRUb3RhbHMiLCIkb3ZlcmxheSIsImhpZGUiLCIkYWN0aXZlQ2FydEl0ZW1JZCIsIiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiIsImJpbmRFdmVudHMiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiY2FydFJlbW92ZUl0ZW0iLCJpdGVtUmVtb3ZlIiwiY2FydEVkaXRPcHRpb25zIiwicHJvZHVjdElkIiwiY29udGV4dCIsInByb2R1Y3RGb3JDaGFuZ2VJZCIsIm1vZGFsIiwiZGVmYXVsdE1vZGFsIiwib3B0aW9ucyIsInRlbXBsYXRlIiwib3BlbiIsImZpbmQiLCJhZGRDbGFzcyIsInByb2R1Y3RBdHRyaWJ1dGVzIiwiY29uZmlndXJlSW5DYXJ0IiwidXBkYXRlQ29udGVudCIsImNvbnRlbnQiLCIkcHJvZHVjdE9wdGlvbnNDb250YWluZXIiLCJtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCIsIm91dGVySGVpZ2h0IiwiY3NzIiwicHJvZHVjdERldGFpbHMiLCJDYXJ0SXRlbURldGFpbHMiLCJiaW5kR2lmdFdyYXBwaW5nRm9ybSIsInNldHVwRm9jdXNUcmFwIiwiaG9va3MiLCJvbiIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsIiRmb3JtIiwiJHN1Ym1pdCIsIiRtZXNzYWdlQm94Iiwib3B0aW9uQ2hhbmdlIiwic2VyaWFsaXplIiwicmVzdWx0IiwicHVyY2hhc2luZ19tZXNzYWdlIiwicHJvcCIsInB1cmNoYXNhYmxlIiwiaW5zdG9jayIsIiRjYXJ0SXRlbXNSb3dzIiwiJGNhcnRQYWdlVGl0bGUiLCJ0b3RhbHMiLCJwYWdlVGl0bGUiLCJzdGF0dXNNZXNzYWdlcyIsImxlbmd0aCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiZGVib3VuY2VUaW1lb3V0IiwicHJldmVudERlZmF1bHQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdHJpbmciLCJzaG93Q2FuY2VsQnV0dG9uIiwidGhlbiIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJnaWZ0Q2VydENoZWNrIiwiYXBwbHlHaWZ0Q2VydGlmaWNhdGUiLCJyZXNwIiwiYmluZEdpZnRXcmFwcGluZ0V2ZW50cyIsImdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zIiwiJHNlbGVjdCIsImlkIiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsInNoaXBwaW5nRXN0aW1hdG9yIiwiU2hpcHBpbmdFc3RpbWF0b3IiLCJQYWdlTWFuYWdlciIsIiRlbGVtZW50IiwiJHN0YXRlIiwiaXNFc3RpbWF0b3JGb3JtT3BlbmVkIiwiaW5pdEZvcm1WYWxpZGF0aW9uIiwiYmluZFN0YXRlQ291bnRyeUNoYW5nZSIsImJpbmRFc3RpbWF0b3JFdmVudHMiLCJzaGlwcGluZ0VzdGltYXRvckFsZXJ0Iiwic2hpcHBpbmdWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJ0YXAiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiYXR0ciIsInJlbW92ZUF0dHIiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJiaW5kVmFsaWRhdGlvbiIsImJpbmRTdGF0ZVZhbGlkYXRpb24iLCJiaW5kVVBTUmF0ZXMiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJjb3VudHJ5SWQiLCJpc05hTiIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwidXNlSWRGb3JTdGF0ZXMiLCJmaWVsZCIsIkVycm9yIiwiJGZpZWxkIiwiZ2V0U3RhdHVzIiwiaXMiLCJWYWxpZGF0b3JzIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsInJlbW92ZUNsYXNzIiwidG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlIiwidG9nZ2xlQnV0dG9uIiwiYnV0dG9uU2VsZWN0b3IiLCIkdG9nZ2xlQ29udGFpbmVyIiwiY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlIiwic2VsZWN0b3JUb0FjdGl2YXRlIiwiJGVzdGltYXRvckNvbnRhaW5lciIsIiRlc3RpbWF0b3JGb3JtIiwiY29sbGFwc2libGVGYWN0b3J5IiwicGFyYW1zIiwiY291bnRyeV9pZCIsInN0YXRlX2lkIiwiY2l0eSIsInppcF9jb2RlIiwiZ2V0U2hpcHBpbmdRdW90ZXMiLCJjbGlja0V2ZW50IiwicXVvdGVJZCIsInN1Ym1pdFNoaXBwaW5nUXVvdGUiLCIkc2NvcGUiLCJwcm9kdWN0QXR0cmlidXRlc0RhdGEiLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwiaGFzT3B0aW9ucyIsInRyaW0iLCJoYXNEZWZhdWx0T3B0aW9ucyIsInNldFByb2R1Y3RWYXJpYW50Iiwib3B0aW9uQ2hhbmdlQ2FsbGJhY2siLCJvcHRpb25DaGFuZ2VEZWNvcmF0b3IiLCJjYWxsIiwidXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMiLCJ1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzIiwiZWFjaCIsIm9wdGlvbkxhYmVsIiwiY2hpbGRyZW4iLCJpbm5lclRleHQiLCJvcHRpb25UaXRsZSIsInNwbGl0IiwicmVxdWlyZWQiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidHlwZSIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiaXNTYXRpc2ZpZWQiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJzZWxlY3QiLCJzZWxlY3RlZEluZGV4IiwiZGF0ZVN0cmluZyIsIm1hcCIsIngiLCJjaGVja2VkIiwiZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCIsInByb2R1Y3RWYXJpYW50c2xpc3QiLCJjb252ZXJ0SW50b0FycmF5IiwibWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCIsImlucHQiLCJkYXRhc2V0IiwicHJvZHVjdEF0dHJpYnV0ZVZhbHVlIiwibGFiZWwiLCJpc0Jyb3dzZXJJRSIsImxhYmVscyIsInRpdGxlIiwicHJvZHVjdFZhcmlhbnQiLCJzb3J0IiwidmlldyIsInByb2R1Y3ROYW1lIiwibWF0Y2giLCJjYXJkIiwiUHJvZHVjdERldGFpbHNCYXNlIiwiY2VydCIsIm1ha2VTdGF0ZVJlcXVpcmVkIiwic3RhdGVFbGVtZW50IiwiYXR0cnMiLCJpdGVtIiwicmV0IiwibmFtZSIsInJlcGxhY2VtZW50QXR0cmlidXRlcyIsIiRuZXdFbGVtZW50IiwiJGhpZGRlbklucHV0IiwicHJldiIsImFwcGVuZCIsIm1ha2VTdGF0ZU9wdGlvbmFsIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsImFkZE9wdGlvbnMiLCJzdGF0ZXNBcnJheSIsIiRzZWxlY3RFbGVtZW50IiwiY29udGFpbmVyIiwicHJlZml4Iiwic3RhdGVzIiwic3RhdGVPYmoiLCJjYWxsYmFjayIsImNvdW50cnlOYW1lIiwiY291bnRyeSIsImdldEJ5TmFtZSIsInNob3dBbGVydE1vZGFsIiwic3RhdGVfZXJyb3IiLCIkY3VycmVudElucHV0IiwibmV3RWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxJOzs7Ozs7Ozs7U0FDakJDLE8sR0FBQSxtQkFBVTtBQUNOLFNBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQkMsQ0FBQyxDQUFDLHFCQUFELENBQXJCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQkQsQ0FBQyxDQUFDLG9CQUFELENBQXRCO0FBQ0EsU0FBS0UsV0FBTCxHQUFtQkYsQ0FBQyxDQUFDLG9CQUFELENBQXBCO0FBQ0EsU0FBS0csUUFBTCxHQUFnQkgsQ0FBQyxDQUFDLDZCQUFELENBQUQsQ0FDWEksSUFEVyxFQUFoQixDQUxNLENBTU87O0FBQ2IsU0FBS0MsaUJBQUwsR0FBeUIsSUFBekI7QUFDQSxTQUFLQyx3QkFBTCxHQUFnQyxJQUFoQztBQUVBLFNBQUtDLFVBQUw7QUFDSCxHOztTQUVEQyxVLEdBQUEsb0JBQVdDLE9BQVgsRUFBb0I7QUFBQTs7QUFDaEIsUUFBTUMsTUFB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QVI7QUFDSDtBQUNKLEtBbkJEO0FBb0JILEdBM0JEO0FBNEJILEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHsgYmluZCwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGdpZnRDZXJ0Q2hlY2sgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBTaGlwcGluZ0VzdGltYXRvciBmcm9tICcuL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yJztcbmltcG9ydCB7IGRlZmF1bHRNb2RhbCB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBzd2FsIGZyb20gJy4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcbmltcG9ydCBDYXJ0SXRlbURldGFpbHMgZnJvbSAnLi9jb21tb24vY2FydC1pdGVtLWRldGFpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuJG1vZGFsID0gbnVsbDtcbiAgICAgICAgdGhpcy4kY2FydENvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0LWNvbnRlbnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcyA9ICQoJ1tkYXRhLWNhcnQtc3RhdHVzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0VG90YWxzID0gJCgnW2RhdGEtY2FydC10b3RhbHNdJyk7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxuICAgICAgICAgICAgLmhpZGUoKTsgLy8gVE9ETzogdGVtcG9yYXJ5IHVudGlsIHJvcGVyIHB1bGxzIGluIGhpcyBjYXJ0IGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gbnVsbDtcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBpdGVtSWQ7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xuICAgICAgICBjb25zdCBvbGRRdHkgPSBwYXJzZUludCgkZWwudmFsKCksIDEwKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJykgPT09ICdpbmMnID8gb2xkUXR5ICsgMSA6IG9sZFF0eSAtIDE7XG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcbiAgICAgICAgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWluRXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBvbGRRdHkgPSBwcmVWYWwgIT09IG51bGwgPyBwcmVWYWwgOiBtaW5RdHk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSBwYXJzZUludChOdW1iZXIoJGVsLnZhbCgpKSwgMTApO1xuICAgICAgICBsZXQgaW52YWxpZEVudHJ5O1xuXG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcbiAgICAgICAgaWYgKCFuZXdRdHkpIHtcbiAgICAgICAgICAgIGludmFsaWRFbnRyeSA9ICRlbC52YWwoKTtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IGAke2ludmFsaWRFbnRyeX0gaXMgbm90IGEgdmFsaWQgZW50cnlgLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1pbkVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWF4RXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVJlbW92ZShpdGVtSWQsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHsgcHJvZHVjdEZvckNoYW5nZUlkOiBwcm9kdWN0SWQsIC4uLnRoaXMuY29udGV4dCB9O1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgIGlmICh0aGlzLiRtb2RhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kbW9kYWwgPSAkKCcjbW9kYWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2NvbmZpZ3VyZS1wcm9kdWN0JyxcbiAgICAgICAgfTtcblxuICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgICAgIHRoaXMuJG1vZGFsLmZpbmQoJy5tb2RhbC1jb250ZW50JykuYWRkQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5jb25maWd1cmVJbkNhcnQoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsIHRoaXMuJG1vZGFsKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0ID0gJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIuY3NzKCdoZWlnaHQnLCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgQ2FydEl0ZW1EZXRhaWxzKHRoaXMuJG1vZGFsLCBjb250ZXh0KTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuXG4gICAgICAgICAgICBtb2RhbC5zZXR1cEZvY3VzVHJhcCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1dGlscy5ob29rcy5vbigncHJvZHVjdC1vcHRpb24tY2hhbmdlJywgKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICQoY3VycmVudFRhcmdldCkuZmluZCgnZm9ybScpO1xuICAgICAgICAgICAgY29uc3QgJHN1Ym1pdCA9ICQoJ2lucHV0LmJ1dHRvbicsICRmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLmFsZXJ0TWVzc2FnZUJveCcpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YSB8fCB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnY2FydC9jb250ZW50JyxcbiAgICAgICAgICAgICAgICB0b3RhbHM6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxuICAgICAgICBpZiAocmVtb3ZlICYmICRjYXJ0SXRlbXNSb3dzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0VG90YWxzLmh0bWwocmVzcG9uc2UudG90YWxzKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcy5odG1sKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2VzKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgcXVhbnRpdHkpO1xuXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihgW2RhdGEtYWN0aW9uPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9ufSddYClcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xuICAgICAgICAgICAgcHJlVmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSkuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LXJlbW92ZScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xuICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1FZGl0Jyk7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3Byb2R1Y3RJZCcpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIGVkaXQgaXRlbSBpbiBjYXJ0XG4gICAgICAgICAgICB0aGlzLmNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Db250YWluZXIgPSAkKCcuY291cG9uLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNvdXBvbkZvcm0gPSAkKCcuY291cG9uLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5zaG93KCk7XG4gICAgICAgICAgICAkY29kZUlucHV0LnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNlcnRDb250YWluZXIgPSAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY2VydEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIWdpZnRDZXJ0Q2hlY2soY29kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJGNlcnRJbnB1dC5kYXRhKCdlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHJlc3AuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuLi9jb21tb24vc3RhdGUtY291bnRyeSc7XG5pbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4uL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgc3dhbCBmcm9tICcuLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwcGluZ0VzdGltYXRvciB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJywgdGhpcy4kZWxlbWVudCk7XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5pdEZvcm1WYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpO1xuICAgICAgICB0aGlzLmJpbmRFc3RpbWF0b3JFdmVudHMoKTtcbiAgICB9XG5cbiAgICBpbml0Rm9ybVZhbGlkYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQgPSAkKCcuc2hpcHBpbmctcXVvdGVzJyk7XG5cbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9ICdmb3JtW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXSc7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSAuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0YCxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdCcsIHRoaXMuJGVsZW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIGVzdGltYXRvciBlcnJvciBtZXNzYWdlcyBhcmUgYmVpbmcgaW5qZWN0ZWQgaW4gaHRtbCBhcyBhIHJlc3VsdFxuICAgICAgICAgICAgLy8gb2YgdXNlciBzdWJtaXQ7IGNsZWFyaW5nIGFuZCBhZGRpbmcgcm9sZSBvbiBzdWJtaXQgcHJvdmlkZXNcbiAgICAgICAgICAgIC8vIHJlZ3VsYXIgYW5ub3VuY2VtZW50IG9mIHRoZXNlIGVycm9yIG1lc3NhZ2VzXG4gICAgICAgICAgICBpZiAoc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJykpIHtcbiAgICAgICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LnJlbW92ZUF0dHIoJ3JvbGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJywgJ2FsZXJ0Jyk7XG4gICAgICAgICAgICAvLyBXaGVuIHN3aXRjaGluZyBiZXR3ZWVuIGNvdW50cmllcywgdGhlIHN0YXRlL3JlZ2lvbiBpcyBkeW5hbWljXG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gYSBjaGVjayBmb3IgYWxsIGZpZWxkcyB3aGVuIGNvdW50cnkgaGFzIGEgdmFsdWVcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhcmVBbGwoJ3ZhbGlkJykgd2lsbCBjaGVjayBjb3VudHJ5IGZvciB2YWxpZGl0eVxuICAgICAgICAgICAgaWYgKCQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCkudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFVQU1JhdGVzKCk7XG4gICAgfVxuXG4gICAgYmluZFZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnRyeUlkID0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50cnlJZCAhPT0gMCAmJiAhTnVtYmVyLmlzTmFOKGNvdW50cnlJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1RoZSBcXCdDb3VudHJ5XFwnIGZpZWxkIGNhbm5vdCBiZSBibGFuay4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZSA9ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZWxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlVmFsID0gJGVsZS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZWxlVmFsICYmIGVsZVZhbC5sZW5ndGggJiYgZWxlVmFsICE9PSAnU3RhdGUvcHJvdmluY2UnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1RoZSBcXCdTdGF0ZS9Qcm92aW5jZVxcJyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xuICAgICAqL1xuICAgIGJpbmRVUFNSYXRlcygpIHtcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsIFVQU1JhdGVUb2dnbGUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1EZWZhdWx0ID0gJCgnLmVzdGltYXRvci1mb3JtLS1kZWZhdWx0Jyk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtVXBzLnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpIHtcbiAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgc3RhdGVDb3VudHJ5KHRoaXMuJHN0YXRlLCB0aGlzLmNvbnRleHQsIHsgdXNlSWRGb3JTdGF0ZXM6IHRydWUgfSwgKGVyciwgZmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmdldFN0YXR1cyh0aGlzLiRzdGF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ1N0YXRlL3Byb3ZpbmNlJyk7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVtb3ZlIHRoaXMgY2xhc3Mgd2hlbiB3ZSBzd2FwIHNpbmNlIG5vZCB2YWxpZGF0aW9uIGRvZXNuJ3QgY2xlYW51cCBmb3IgdXNcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUodG9nZ2xlQnV0dG9uLCBidXR0b25TZWxlY3RvciwgJHRvZ2dsZUNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUgPSAoc2VsZWN0b3JUb0FjdGl2YXRlKSA9PiB7XG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcbiAgICAgICAgICAgICQoYnV0dG9uU2VsZWN0b3IpLnRleHQoJChgIyR7c2VsZWN0b3JUb0FjdGl2YXRlfWApLnRleHQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItY2xvc2UnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1hZGQnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSAhdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQ7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICB6aXBfY29kZTogJCgnW25hbWU9XCJzaGlwcGluZy16aXBcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRTaGlwcGluZ1F1b3RlcyhwYXJhbXMsICdjYXJ0L3NoaXBwaW5nLXF1b3RlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNoaXBwaW5nLXF1b3RlcycpLmh0bWwocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRoZSBzZWxlY3QgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCgnLnNlbGVjdC1zaGlwcGluZy1xdW90ZScpLm9uKCdjbGljaycsIGNsaWNrRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuc3VibWl0U2hpcHBpbmdRdW90ZShxdW90ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcuc2hpcHBpbmctZXN0aW1hdGUtc2hvd19fYnRuLW5hbWUnLCAkZXN0aW1hdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGlzQnJvd3NlcklFLCBjb252ZXJ0SW50b0FycmF5IH0gZnJvbSAnLi91dGlscy9pZS1oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydEl0ZW1EZXRhaWxzIGV4dGVuZHMgUHJvZHVjdERldGFpbHNCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGNvbnRleHQsIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCcjQ2FydEVkaXRQcm9kdWN0RmllbGRzRm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcbiAgICAgICAgY29uc3QgaGFzT3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaHRtbCgpLnRyaW0oKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGhhc0RlZmF1bHRPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdbZGF0YS1kZWZhdWx0XScpLmxlbmd0aDtcblxuICAgICAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb2R1Y3RWYXJpYW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUNhbGxiYWNrID0gb3B0aW9uQ2hhbmdlRGVjb3JhdG9yLmNhbGwodGhpcywgaGFzRGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwcm9kdWN0IGF0dHJpYnV0ZXMuIEFsc28gdXBkYXRlIHRoZSBpbml0aWFsIHZpZXcgaW4gY2FzZSBpdGVtcyBhcmUgb29zXG4gICAgICAgIC8vIG9yIGhhdmUgZGVmYXVsdCB2YXJpYW50IHByb3BlcnRpZXMgdGhhdCBjaGFuZ2UgdGhlIHZpZXdcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHRoaXMuY29udGV4dC5wcm9kdWN0Rm9yQ2hhbmdlSWQ7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcbiAgICAgICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICAgICAgJC5lYWNoKCQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhbHVlLmNoaWxkcmVuWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdmFsdWUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZSA9PT0gJ2lucHV0LWZpbGUnIHx8IHR5cGUgPT09ICdpbnB1dC10ZXh0JyB8fCB0eXBlID09PSAnaW5wdXQtbnVtYmVyJykgJiYgdmFsdWUucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJyAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLmV2ZXJ5KChzZWxlY3QpID0+IHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkubWFwKCh4KSA9PiB4LnZhbHVlKS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7c2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0fWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHNsaXN0ID0gY29udmVydEludG9BcnJheSh2YWx1ZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0ID0gaW5wdCA9PiBpbnB0LmRhdGFzZXQucHJvZHVjdEF0dHJpYnV0ZVZhbHVlID09PSBjaGVja2VkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuY2hpbGRyZW5bMF0gOiBjaGVja2VkLmxhYmVsc1swXS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Olllc2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XG4gICAgICAgIGNvbnN0IHZpZXcgPSAkKCcubW9kYWwtaGVhZGVyLXRpdGxlJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XG4gICAgICAgICAgICBwcm9kdWN0VmFyaWFudCA9IHByb2R1Y3RWYXJpYW50ID09PSAndW5zYXRpc2ZpZWQnID8gJycgOiBwcm9kdWN0VmFyaWFudDtcbiAgICAgICAgICAgIGlmICh2aWV3LmF0dHIoJ2RhdGEtZXZlbnQtdHlwZScpKSB7XG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSB2aWV3Lmh0bWwoKS5tYXRjaCgvJyguKj8pJy8pWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcbiAgICAgICAgICAgICAgICBjYXJkLmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaGlkZS1jb250ZW50Jyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH0gZnJvbSAnLi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuLyoqXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cbiAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QnLFxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XG5cbiAgICBpZiAoJGhpZGRlbklucHV0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBTdHJpbmcgaXMgaW5qZWN0ZWQgZnJvbSBsb2NhbGl6ZXJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmFwcGVuZChgPHNtYWxsPiR7Y29udGV4dC5yZXF1aXJlZH08L3NtYWxsPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogSWYgYSBjb3VudHJ5IHdpdGggc3RhdGVzIGlzIHRoZSBkZWZhdWx0LCBhIHNlbGVjdCB3aWxsIGJlIHNlbnQsXG4gKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHN3aXRjaCB0byBhbiBpbnB1dCBmaWVsZCBhbmQgaGlkZSB0aGUgcmVxdWlyZWQgZmllbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlT3B0aW9uYWwoc3RhdGVFbGVtZW50KSB7XG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcbiAgICAgICAgcmV0W2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1pbnB1dCcsXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXG4gICAgICAgICdkYXRhLWZpZWxkLXR5cGUnOiBhdHRyc1snZGF0YS1maWVsZC10eXBlJ10sXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8aW5wdXQgLz4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGFycmF5IG9mIG9wdGlvbnMgZnJvbSB0aGUgcmVtb3RlIHJlcXVlc3QgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgc2VsZWN0IGJveC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxuICogQHBhcmFtIHtqUXVlcnl9ICRzZWxlY3RFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBhZGRPcHRpb25zKHN0YXRlc0FycmF5LCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IFtdO1xuXG4gICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCJcIj4ke3N0YXRlc0FycmF5LnByZWZpeH08L29wdGlvbj5gKTtcblxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xuICAgICAgICBfLmVhY2goc3RhdGVzQXJyYXkuc3RhdGVzLCAoc3RhdGVPYmopID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZUlkRm9yU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLm5hbWV9XCI+JHtzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2VsZWN0RWxlbWVudC5odG1sKGNvbnRhaW5lci5qb2luKCcgJykpO1xuICAgIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtqUXVlcnl9IHN0YXRlRWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGVFbGVtZW50LCBjb250ZXh0ID0ge30sIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgLyoqXG4gICAgICogQmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIHRocmVlIHBhcmFtZXRlcnMgaW5zdGVhZCBvZiBmb3VyXG4gICAgICpcbiAgICAgKiBBdmFpbGFibGUgb3B0aW9uczpcbiAgICAgKlxuICAgICAqIHVzZUlkRm9yU3RhdGVzIHtCb29sfSAtIEdlbmVyYXRlcyBzdGF0ZXMgZHJvcGRvd24gdXNpbmcgaWQgZm9yIHZhbHVlcyBpbnN0ZWFkIG9mIHN0cmluZ3NcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICB9XG5cbiAgICAkKCdzZWxlY3RbZGF0YS1maWVsZC10eXBlPVwiQ291bnRyeVwiXScpLm9uKCdjaGFuZ2UnLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50cnlOYW1lID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcblxuICAgICAgICBpZiAoY291bnRyeU5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY291bnRyeS5nZXRCeU5hbWUoY291bnRyeU5hbWUsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoY29udGV4dC5zdGF0ZV9lcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRjdXJyZW50SW5wdXQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcblxuICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkocmVzcG9uc2UuZGF0YS5zdGF0ZXMpKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGVsZW1lbnQgbWF5IGhhdmUgYmVlbiByZXBsYWNlZCB3aXRoIGEgc2VsZWN0LCByZXNlbGVjdCBpdFxuICAgICAgICAgICAgICAgIGNvbnN0ICRzZWxlY3RFbGVtZW50ID0gbWFrZVN0YXRlUmVxdWlyZWQoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBhZGRPcHRpb25zKHJlc3BvbnNlLmRhdGEsICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAkc2VsZWN0RWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVPcHRpb25hbCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG5ld0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=