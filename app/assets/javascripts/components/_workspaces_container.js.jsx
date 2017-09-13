var WorkspacesContainer = React.createClass({
  getInitialState() {
    return { workspaces: [], activeWorkspaceId: null };
  },
  componentDidMount() {
    this.fetchWorkspaces();
  },

  path() { return "users/" + this.props.userId + "/workspaces"; },

  fetchWorkspaces() {
    $.getJSON(
      this.path(),
      (data) => this.setState({
        workspaces: data,
        activeWorkspaceId: data[0].id
      })
    );
  },

  render() {
    var workspaceList = this.state.workspaces.map((workspace) => {
      return(<p key={workspace.id}>{workspace.name}</p>);
    });

    activeWorkspace = (this.state.activeWorkspaceId != null) ?
      <Workspace
        path={this.path() + "/" + this.state.activeWorkspaceId } /> : null

    return (
      <div id="workspace-list">
        {workspaceList}
        {activeWorkspace}
      </div>
    );
  }
});
