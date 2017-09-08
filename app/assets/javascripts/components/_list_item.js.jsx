var ListItem = React.createClass({

  itemIdString() {
    return "list-item-" + this.props.item.id;
  },

  handleClickResetListItem(event) {
    event.preventDefault();
    this.props.resetListItem(this.props.item);
  },

  handleClickCompleteListItem(event) {
    event.preventDefault();
    this.props.completeListItem(this.props.item);
  },

  handleClickDeleteListItem(event) {
    event.preventDefault();
    this.props.deleteListItem(this.props.item);
  },

  resetActionClassName() {
    return [
      this.props.item.status == "complete" ? "" : "hidden",
      "reset"
    ].join(" ");
  },
  completeActionClassName() {
    return [
      this.props.item.status == "complete" ? "hidden" : "",
      "complete"
    ].join(" ");
  },

  render() {
    return (
      <div id={this.itemIdString()} className={"list-item " + this.props.item.status}>

        {this.props.item.name}

        <div className="list-item-actions pull-right">
          <a href="#"
            id={this.itemIdString() + "-reset"}
            className={this.resetActionClassName()}
            onClick={this.handleClickResetListItem}>

              <div className="list-item-action">
                <span className="glyphicon glyphicon-ok" />
              </div>
          </a>

          <a href="#"
            id={this.itemIdString() + "-complete"}
            className={this.completeActionClassName()}
            onClick={this.handleClickCompleteListItem}>

            <div className="list-item-action">
              <span className="glyphicon glyphicon-ok" />
            </div>
          </a>

          <a href="#" onClick={this.handleClickDeleteListItem} className={"delete"}>

            <div className="list-item-action">
              <span className="glyphicon glyphicon-remove-circle" />
            </div>
          </a>
        </div>
      </div>
    );
  }
});
