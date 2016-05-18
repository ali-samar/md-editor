'use strict'
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
        var myCodeMirror = {
            lineNumbers: true,
            mode: "markdown"
        };
        return <Codemirror /*ref={(ref)=>{this.editor=ref}}*/ value={this.state.code} onChange={this.updateCode} options={myCodeMirror} />
    }
});

var Nouveaudoc = React.createClass({
    render: function() {
        return (
            <div className="boutons">
                <a className="waves-effect waves-light btn grey" onClick={this.props.deltext}>
                <i className="material-icons right">mode_edit</i>Nouveau document</a>
            </div>
        );
    }
});

var Sauvegarder = React.createClass({
    render: function() {
        return (
            <div className="boutons">
                <a className="waves-effect waves-light btn grey">
                <i className="material-icons right">done</i>Sauvegarder</a>
            </div>
        );
    }
});

var Telecharger = React.createClass({
    render: function() {
        return (
            <div className="boutons">
                <a className="waves-effect waves-light btn grey">
                <i className="material-icons right">play_for_work</i>Télécharger</a>
            </div>
        );
    }
});

var Wrapper = React.createClass({
    getInitialState: function() {
        return {
            code: ""
        };
    },
    refresh: function() {
        //alert('Voulez-vous sauvegarder les modifications?');
        localStorage.clear();
    },
    render: function() {
        return (
            <div>
                <Markdown />
                <Nouveaudoc  deltext={this.refresh} />
                <Sauvegarder />
                <Telecharger />
            </div>
        );
    }
});

ReactDOM.render(
    <Wrapper />, 
    document.getElementById('markdown')
);