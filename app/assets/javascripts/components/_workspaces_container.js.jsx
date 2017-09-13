var WorkspacesContainer = React.createClass({
  getInitialState() {
    return { workspaces: [], activeWorkspaceId: null };
  },
  componentDidMount() {
    this.fetchWorkspaces();
  },
  fetchWorkspaces() {
    $.getJSON(
      "/workspaces",
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
      <Workspace workspaceId={this.state.activeWorkspaceId} /> : null
      
    return (
      <div id="workspace-list">
        {workspaceList}
        {activeWorkspace}
      </div>
    );
  }
});
