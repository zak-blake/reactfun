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
    } else {
      title = this.props.list.name;
    }

    editButtonClass = this.props.editableTitle ? "hidden" : "" ;

    return (
      <div className="list-wrapper">
        <h4>
          {title}

          <div className="btn-group pull-right">
            <button className="btn btn-xs btn-tran dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="glyphicon glyphicon-triangle-bottom"></span>
            </button>
            <div className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={this.handleClickEdit}>Rename</a></li>
              <li><a className="dropdown-item" href="#" onClick={this.handleClickDelete}>Delete</a></li>
            </div>
          </div>
        </h4>

        <ListItemsContainer
          listId={this.props.list.id}
          path={this.props.path + "/list_items"}
          itemAddable={this.props.itemAddable}
          setListItemAddable={this.props.setListItemAddable} />
      </div>
    );
  }
})
