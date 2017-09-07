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

  render() {
    return (
      <li id={this.itemIdString()} className={this.props.item.status}>
        {this.props.item.name}

        &nbsp;

        <a id={this.itemIdString() + "-reset"}
          className={this.props.item.status == "complete" ? "" : "hidden"}
          onClick={this.handleClickResetListItem}>

            <span className="glyphicon glyphicon-repeat"></span>
        </a>

        &nbsp;

        <a id={this.itemIdString() + "-complete"}
          className={this.props.item.status == "complete" ? "hidden" : ""}
          onClick={this.handleClickCompleteListItem}>

            <span className="glyphicon glyphicon-ok"></span>
        </a>

        &nbsp;

        <a onClick={this.handleClickDeleteListItem}>
          <span className="glyphicon glyphicon-remove-circle"></span>
        </a>
      </li>
    );
  }
});
