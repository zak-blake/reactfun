var List = React.createClass({
  handleClickDelete(event) {
    event.preventDefault();
    this.props.deleteList(this.props.list.id);
  },

  handleClickEdit(event) {
    event.preventDefault();
    this.props.setListEditable(this.props.list.id);
  },

  getListCompletionClass() {
    let total = this.props.list.list_items_count;
    let complete = this.props.list.list_items_complete_count;
    console.log(complete + "/" + total);
    let completion = (total == 0 || complete == 0) ? 0 : Math.round(complete/total*100);

    console.log(completion);

    return "completion compl-" + completion;
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
      <div className="list-container">
        <div className="list-content">
          <h4>
            {title}

            <small className="pull-right">
              <a onClick={this.handleClickEdit} className={editButtonClass}>
                edit
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

        <div className={this.getListCompletionClass()}></div>
      </div>
    );
  }
})
