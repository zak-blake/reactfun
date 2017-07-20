var Lists = React.createClass({
  render() {
    var lists = this.props.lists.map((list) => {
      return (
        <List key={list.id} list={list} />
      );
    });

    return (
      <div>
        {lists}
      </div>
    );
  }
});
