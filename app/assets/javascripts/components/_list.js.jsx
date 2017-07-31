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

    editButtonClass = this.props.editableTitle ? "btn disabled" : "btn" ;

    return (
      <div className="list">
        <h4>
          <span>{title}</span>

          <div role="group" className="btn-group pull-right">
            <button onClick={this.handleClickEdit} className={editButtonClass}>
              <span className="glyphicon glyphicon-edit"></span>
            </button>
            <button onClick={this.handleClickDelete} className="btn">
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </div>

        </h4>

        <ListItemsContainer  listId={this.props.list.id} />
      </div>
    );
  }
})
