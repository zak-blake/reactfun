var WorkspaceSettings = React.createClass({
  getInitialState: function() {
    return {initialName: this.props.name, name: '', editable: false};
  },

  handleNameChange: function(event) {
    console.log("name change");
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
        name = this.state.initialName;
      }

      return (
        <form onSubmit={this.handleSubmit} id="workspace-title-form" className="pull-right">

          <div className="input-group">
            <input type="text"
              placeholder="Workspace name"
              value={ name }
              onChange={ this.handleNameChange }
              id="new-workspace-name"
              className="form-control" />

            <span className="input-group-btn">

              <button type="submit" value="update" className="btn btn-success">
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
              </button>

              <button onClick={this.handleCancelUpdate} className="btn btn-default">
                <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        </form>
      );
    } else {
      return (
        <div className="btn-group pull-right">
          <button className="btn btn-sm btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Settings&nbsp; <span className="glyphicon glyphicon-triangle-bottom"></span>
          </button>
          <div className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={this.handleClickRename}>Rename</a></li>
            <li><a className="dropdown-item" href="#" onClick={this.handleClickDelete}>Delete</a></li>
          </div>
        </div>
      );
    }
  }
});
