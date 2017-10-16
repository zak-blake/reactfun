var List = React.createClass({
  handleClickDelete(event) {
    event.preventDefault();
    this.props.deleteList(this.props.list.id);
  },

  handleClickEdit(event) {
    event.preventDefault();
    this.props.setListEditable(this.props.list.id);
  },

  render() {
    let title = null;

    if(this.props.editableTitle) {
      title = <NewListTitleForm
        list={this.props.list}
        path={this.props.path}
        replaceAllInstancesOfList={this.props.replaceAllInstancesOfList}
      />;
      listActions = null;

    } else {

      title = this.props.list.name;
      listActions = (
        <div className="btn-group pull-right">
          <button className="btn btn-xs btn-tran dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="glyphicon glyphicon-triangle-bottom"></span>
          </button>
          <div className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={this.handleClickEdit}>Rename</a></li>
            <li><a className="dropdown-item" href="#" onClick={this.handleClickDelete}>Delete</a></li>
          </div>
        </div>
      );
    }

    editButtonClass = this.props.editableTitle ? "hidden" : "" ;

    return (
      <div className="list-wrapper col-lg-3">
        <div className="list">
          <h4>
            {title}
            {listActions}
          </h4>

          <ListItemsContainer
            listId={this.props.list.id}
            path={this.props.path + "/list_items"}
            itemAddable={this.props.itemAddable}
            setListItemAddable={this.props.setListItemAddable} />
        </div>
      </div>
    );
  }
})
