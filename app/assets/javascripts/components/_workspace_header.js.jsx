var WorkspaceHeader = React.createClass({
  getInitialState: function() {
    return {initialName: this.props.initialName, name: '', editable: this.props.editTitle};
  },

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  },
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  },
  escFunction(event){
    if(event.keyCode === 27) {
      this.setState({editable: false});
    }
  },

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.setState({initialName: newProps.initialName, editable: newProps.editTitle });
  },

  handleNameChange: function(event) {
    event.preventDefault();
    this.setState({ name: event.target.value, initialName: null });
  },

  handleCancelUpdate: function(event) {
    event.preventDefault();
    this.setState({editable: false});
  },

  handleClickRename: function(event) {
    event.preventDefault();
    this.setState({ editable: true });
  },

  handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      url: this.props.path,
      dataType: 'json',
      type: 'PUT',
      data: {workspace: {name: this.state.name}},
      context: this,
      success: function(workspace) {
        this.props.replaceWorkspace(workspace);
        this.setState({editable: false});
      }
    });
  },

  handleClickDelete: function(event) {
    event.preventDefault();
    this.props.deleteWorkspace();
  },

  render() {
    if (this.state.editable) {
      var name = null;

      if(this.state.initialName == null) {
        name = this.state.name;
      } else {
        name = this.props.initialName;
      }

      var header = (
        <form onSubmit={this.handleSubmit} id="workspace-title-form"  >

          <div className="input-group">
            <input type="text"
              autoFocus value="true"
              placeholder="Workspace name"
              value={ name }
              onChange={ this.handleNameChange }
              id="new-workspace-name"
              className="form-control" />

            <span className="input-group-btn">

              <button type="submit" value="update" className="btn btn-success">
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              </button>

              <button onClick={this.handleCancelUpdate} className="btn btn-default btn-slate">
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        </form>
      );
    } else {
      var header = (
        <h2>
          {this.props.initialName}
          &nbsp;
          <div className="btn-group">
            <button className="btn btn-xs btn-tran dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="glyphicon glyphicon-triangle-bottom"></span>
            </button>
            <div className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={this.handleClickRename}>Rename</a></li>
              <li><a className="dropdown-item" href="#" onClick={this.handleClickDelete}>Delete</a></li>
            </div>
          </div>
        </h2>
      );
    }

    return (
      <div id="workspace-header">{header}</div>
    );
  }
});
