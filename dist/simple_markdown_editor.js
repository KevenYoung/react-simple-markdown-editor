'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleMarkdownEditor = function (_React$Component) {
    _inherits(SimpleMarkdownEditor, _React$Component);

    function SimpleMarkdownEditor() {
        _classCallCheck(this, SimpleMarkdownEditor);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleMarkdownEditor).apply(this, arguments));
    }

    _createClass(SimpleMarkdownEditor, [{
        key: 'wrapText',
        value: function wrapText(symbol, endSymbol, insertAfter) {

            if (!endSymbol) {
                endSymbol = symbol;
            }

            var elem = document.getElementById(this.props.textAreaID),
                start = elem.selectionStart,
                end = elem.selectionEnd,
                text = elem.value;

            var afterText = insertAfter ? insertAfter : '';

            elem.value = text.substring(0, start) + symbol + text.substring(start, end) + endSymbol + afterText + text.substring(end, text.length);
            elem.focus();
            elem.setSelectionRange(start + symbol.length, end + endSymbol.length);
        }
    }, {
        key: 'insertBold',
        value: function insertBold() {
            this.wrapText('**');
        }
    }, {
        key: 'insertItalics',
        value: function insertItalics() {
            this.wrapText('_');
        }
    }, {
        key: 'insertStrike',
        value: function insertStrike() {
            this.wrapText('~~');
        }
    }, {
        key: 'insertCode',
        value: function insertCode() {
            this.wrapText('`');
        }
    }, {
        key: 'insertAtBeginningOfLine',
        value: function insertAtBeginningOfLine(symbol) {
            var elem = document.getElementById(this.props.textAreaID),
                start = elem.selectionStart,
                end = elem.selectionEnd,
                text = elem.value;

            var newLineIndex = text.lastIndexOf('\n', start - 1);
            if (newLineIndex === -1) {
                elem.value = symbol + text;
            } else {
                elem.value = text.substring(0, newLineIndex + 1) + symbol + text.substring(newLineIndex + 1, text.length);
            }
            elem.focus();
            elem.setSelectionRange(start + symbol.length, end + symbol.length);
        }
    }, {
        key: 'insertH1',
        value: function insertH1() {
            this.insertAtBeginningOfLine('# ');
        }
    }, {
        key: 'insertH2',
        value: function insertH2() {
            this.insertAtBeginningOfLine('## ');
        }
    }, {
        key: 'insertH3',
        value: function insertH3() {
            this.insertAtBeginningOfLine('### ');
        }
    }, {
        key: 'insertQuote',
        value: function insertQuote() {
            this.insertAtBeginningOfLine('> ');
        }
    }, {
        key: 'insertBullet',
        value: function insertBullet() {
            this.insertAtBeginningOfLine('* ');
        }
    }, {
        key: 'insertLink',
        value: function insertLink(e, linkUrl) {
            var elem = document.getElementById(this.props.textAreaID),
                start = elem.selectionStart,
                end = elem.selectionEnd,
                text = elem.value,
                link = linkUrl ? '(' + linkUrl + ')' : "(http://www.mylink.com/)";

            if (start === end) {
                elem.value = text.substring(0, start) + "[Link Text]" + link + text.substring(start, text.length);
                elem.focus();
                elem.setSelectionRange(start, start);
            } else {
                this.wrapText('[', ']', link);
            }
        }
    }, {
        key: 'insertImage',
        value: function insertImage(e, imageUrl) {
            var elem = document.getElementById(this.props.textAreaID),
                start = elem.selectionStart,
                end = elem.selectionEnd,
                text = elem.value,
                link = imageUrl ? '(' + imageUrl + ')' : "(http://myhost.com/my_image.jpg)";

            if (start === end) {
                elem.value = text.substring(0, start) + "![Image Description]" + link + text.substring(start, text.length);
                elem.focus();
                elem.setSelectionRange(start, start);
            } else {
                this.wrapText('![', ']', link);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var styles = (0, _lodash.merge)({}, this.constructor.styles, this.props.styles),
                enabledButtons = (0, _lodash.merge)({}, this.constructor.enabledButtons, this.props.enabledButtons),
                buttonHtmlText = (0, _lodash.merge)({}, this.constructor.buttonHtmlText, this.props.buttonHtmlText),
                additionalProps = (0, _lodash.merge)({}, this.constructor.additionalProps, this.props.additionalProps),
                additionalButtons = this.props.additionalButtons ? this.props.additionalButtons : [];
            return _react2.default.createElement(
                'div',
                { className: this.props.containerClass, style: styles.container },
                enabledButtons.bold && _react2.default.createElement('div', _extends({}, additionalProps.bold, { className: this.props.buttonClass, style: styles.button, onClick: this.insertBold.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.bold } })),
                enabledButtons.italic && _react2.default.createElement('div', _extends({}, additionalProps.italic, { className: this.props.buttonClass, style: styles.button, onClick: this.insertItalics.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.italic } })),
                enabledButtons.strike && _react2.default.createElement('div', _extends({}, additionalProps.strike, { className: this.props.buttonClass, style: styles.button, onClick: this.insertStrike.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.strike } })),
                enabledButtons.code && _react2.default.createElement('div', _extends({}, additionalProps.code, { className: this.props.buttonClass, style: styles.button, onClick: this.insertCode.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.code } })),
                enabledButtons.quote && _react2.default.createElement('div', _extends({}, additionalProps.quote, { className: this.props.buttonClass, style: styles.button, onClick: this.insertQuote.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.quote } })),
                enabledButtons.h1 && _react2.default.createElement('div', _extends({}, additionalProps.h1, { className: this.props.buttonClass, style: styles.button, onClick: this.insertH1.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.h1 } })),
                enabledButtons.h2 && _react2.default.createElement('div', _extends({}, additionalProps.h2, { className: this.props.buttonClass, style: styles.button, onClick: this.insertH2.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.h2 } })),
                enabledButtons.h3 && _react2.default.createElement('div', _extends({}, additionalProps.h3, { className: this.props.buttonClass, style: styles.button, onClick: this.insertH3.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.h3 } })),
                enabledButtons.bullet && _react2.default.createElement('div', _extends({}, additionalProps.bullet, { className: this.props.buttonClass, style: styles.button, onClick: this.insertBullet.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.bullet } })),
                enabledButtons.link && _react2.default.createElement('div', _extends({}, additionalProps.link, { className: this.props.buttonClass, style: styles.button, onClick: this.insertLink.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.link } })),
                enabledButtons.image && _react2.default.createElement('div', _extends({}, additionalProps.image, { className: this.props.buttonClass, style: styles.button, onClick: this.insertImage.bind(this),
                    dangerouslySetInnerHTML: { __html: buttonHtmlText.image } })),
                additionalButtons.map(function (button, index) {
                    return _react2.default.createElement(
                        'div',
                        _extends({ key: index }, additionalProps.image, { className: _this2.props.buttonClass, style: styles.button, onClick: button.onClick }),
                        button.component
                    );
                })
            );
        }
    }]);

    return SimpleMarkdownEditor;
}(_react2.default.Component);

SimpleMarkdownEditor.styles = {
    container: {},
    button: {
        fontFamily: 'Georgia, serif',
        backgroundColor: '#333536',
        color: 'white',
        marginRight: '5px',
        float: 'left',
        width: '25px',
        borderRadius: '4px',
        textAlign: 'center',
        cursor: 'pointer'
    }
};

SimpleMarkdownEditor.enabledButtons = {
    bold: true,
    italic: true,
    strike: true,
    code: true,
    quote: true,
    h1: true,
    h2: true,
    h3: true,
    bullet: true,
    link: true,
    image: true
};

SimpleMarkdownEditor.buttonHtmlText = {
    bold: 'B',
    italic: '<i>I</i>',
    strike: '<s>S</s>',
    code: '&lt; &gt;',
    quote: '&ldquo; &rdquo;',
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    bullet: '&#8226;',
    link: '#',
    image: '[i]'
};

SimpleMarkdownEditor.additionalProps = {
    bold: {},
    italic: {},
    strike: {},
    code: {},
    quote: {},
    h1: {},
    h2: {},
    h3: {},
    bullet: {},
    link: {},
    image: {}
};

SimpleMarkdownEditor.propTypes = {
    // Required props
    textAreaID: _react.PropTypes.string.isRequired,

    // Optional props
    styles: _react.PropTypes.object,
    containerClass: _react.PropTypes.string,
    buttonClass: _react.PropTypes.string,
    enabledButtons: _react.PropTypes.object,
    buttonHtmlText: _react.PropTypes.object,
    additionalProps: _react.PropTypes.object
};

exports.SimpleMarkdownEditor = SimpleMarkdownEditor;