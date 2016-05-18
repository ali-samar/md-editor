var React = require('react');
var ReactDOM = require('react-dom');
var Codemirror = require('react-codemirror');
var marked = require('marked');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

var Markdown = React.createClass({
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

var Menu = React.createClass({
    render: function() {
        return (
            <nav><button onClick={this.props.deltext}>Nouveau doc</button></nav>
        );
    }
});

var Wrapper = React.createClass({
    refresh: function() {
        alert('Voulez-vous sauvegarder les modifications?');
    },
    render: function() {
        return (
            <div>
            <Menu deltext={this.refresh} />
            <Markdown />
            </div>
        );
    }
});

ReactDOM.render(
    <Wrapper />, 
    document.getElementById('markdown')
);