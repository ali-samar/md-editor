var React = require('react');
var ReactDOM = require('react-dom');
var Codemirror = require('react-codemirror');
var marked = require('marked');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

var App = React.createClass({
    getInitialState: function() {
        var stockText = localStorage.getItem('markedText');
        var mark = marked(stockText);
        $("#codeHTML").html(mark);
        return {
            code: stockText
        };
    },
    updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
        var mark = marked(newCode);
        $("#codeHTML").html(mark);
        localStorage.setItem('markedText', newCode);
    },
    render: function() {
        var options = {
            lineNumbers: true,
            mode: "markdown"
        };
        return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
    }
});

ReactDOM.render(<App />, document.getElementById('markdown'));