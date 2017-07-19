var Lists = React.createClass({
  render() {
    console.log(this.props.lists);
    var lists = this.props.lists.map((list) => {
      return (
        <div key={list.id}>
          <p>{list.name}</p>
        </div>
      );
    });

    return <div>{lists}</div>;
  }
});
