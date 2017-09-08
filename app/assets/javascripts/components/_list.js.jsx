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

          <small className="pull-right">
            <a onClick={this.handleClickEdit} className={editButtonClass}>
              rename
            </a>
            &nbsp;
            <a onClick={this.handleClickDelete} >
              delete
            </a>
          </small>
        </h4>

        <ListItemsContainer
          listId={this.props.list.id}
          itemAddable={this.props.itemAddable}
          setListItemAddable={this.props.setListItemAddable} />
      </div>
    );
  }
})
