var WorkspacesContainer = React.createClass({
  getInitialState() {
    return { workspaces: [], activeWorkspaceId: null };
  },
  componentDidMount() {
    this.fetchWorkspaces();
  },

  path() { return "users/" + this.props.userId + "/workspaces"; },
  activeWorkspacePath() {
    return this.path() + "/" + this.state.activeWorkspaceId;
  },

  changeActiveWorkspace(id) {
    this.setState({activeWorkspaceId: id});
  },

  fetchWorkspaces() {
    $.getJSON(
      this.path(),
      (data) => this.setState({
        workspaces: data,
        activeWorkspaceId: data.length > 0 ? data[0].id : null
      })
    );
  },

  handleClickNewWorkspace: function() {
    console.log("new Workspace");
    $.ajax({
      url: this.path(),
      data: { workspace: { name: ""} },
      dataType: "json",
      type: "POST",
      context: this,
      success(newWorkspace) {
        this.setState({
          workspaces: this.state.workspaces.concat(newWorkspace),
          activeWorkspaceId: newWorkspace.id
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
      <Workspace path={this.activeWorkspacePath()} /> : null;

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
