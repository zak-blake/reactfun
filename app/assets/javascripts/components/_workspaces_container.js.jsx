var WorkspacesContainer = React.createClass({
  getInitialState() {
    return {
      workspaces: [],
      activeWorkspaceId: null,
      editActiveWorkspaceTitle: false
    };
  },
  componentDidMount() {
    this.fetchWorkspaces();
  },

  path() { return "users/" + this.props.userId + "/workspaces"; },

  activeWorkspacePath() {
    return this.path() + "/" + this.state.activeWorkspaceId;
  },

  changeActiveWorkspace(id) {
    this.setState({activeWorkspaceId: id, editActiveWorkspaceTitle: false});
  },

  fetchWorkspaces() {
    $.getJSON(
      this.path(),
      (data) => this.setState({
        workspaces: data,
        activeWorkspaceId: data.length > 0 ? data[0].id : null,
        loading: false
      })
    );
  },

  replaceWorkspace(newWorkspace) {
    var newWorkspaceList = this.state.workspaces.map((workspace) => {
      return (workspace.id == newWorkspace.id) ? newWorkspace : workspace;
    });

    this.setState({workspaces: newWorkspaceList});
  },

  deleteWorkspace: function(id) {
    $.ajax({
      url: this.path() + "/" + id,
      dataType: 'json',
      type: 'DELETE',
      context: this,
      success(response) {

        this.setState(state => {
          var newWorkspaces = this.state.workspaces.filter((workspace) => {
            return workspace.id != id;
          });

          return {
            workspaces: newWorkspaces,
            activeWorkspaceId: newWorkspaces.length > 0 ?
              newWorkspaces[0].id : null
          };
        });
      }
    });
  },

  handleClickNewWorkspace: function() {
    $.ajax({
      url: this.path(),
      data: { workspace: { name: ""} },
      dataType: "json",
      type: "POST",
      context: this,
      success(newWorkspace) {
        this.setState({
          workspaces: this.state.workspaces.concat(newWorkspace),
          activeWorkspaceId: newWorkspace.id,
          editActiveWorkspaceTitle: true
        });
      }
    });
  },

  render() {
    var workspaceList = this.state.workspaces.map((workspace) => {
      return (
        <a key={workspace.id}
          onClick={() => this.changeActiveWorkspace(workspace.id)}>

            <div className={this.state.activeWorkspaceId == workspace.id ? "current" : ""}>
              {workspace.name}
            </div>
        </a>
      );
    });

    activeWorkspace = (this.state.activeWorkspaceId != null) ?
      <Workspace
        path={this.activeWorkspacePath()}
        editTitle={this.state.editActiveWorkspaceTitle}
        replaceWorkspace={this.replaceWorkspace}
        deleteWorkspace={this.deleteWorkspace} /> : null;

    newWorkspaceLink = (
      <a onClick={() => this.handleClickNewWorkspace()} id={"new-workspace"}>
        <span className="glyphicon glyphicon-plus"></span>
      </a>
      );

    noWorkspaces = this.state.workspaces.length <= 0 ?
      <p id="no-workspaces">No Workspaces Found.</p> : null;

    return (
      <div>
        <div id="workspace-list">
          {workspaceList}

          {newWorkspaceLink}
          {noWorkspaces}
        </div>
        {activeWorkspace}
      </div>
    );
  }
});
