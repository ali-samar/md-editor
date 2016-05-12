var React = require('react');
var ReactDOM = require('react-dom');
var Codemirror = require('react-codemirror');
var marked = require('marked');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

var App = React.createClass({
    componentDidMount: function() {
        this.setState({
            code: localStorage.getItem('markedText')
        });
    },
    getInitialState: function() {
            return {
                code: ""
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