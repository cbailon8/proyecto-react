export const eventReducer = (state, action) => {
  let {event, type, dragState, dragCounter, handleDrop} = action;

  function dragEvent(e) {
    console.log(e)
    e.preventDefault();
    e.stopPropagation();
  }

  function dragInEvent(e) {
    console.log(e)
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      dragState = { drag: true };
    }
  }

  function dragOutEvent(e) {
    console.log(e)
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) {
      dragState = { drag: false };
    }
  }

  function dropEvent(e) {
    console.log(e)
    e.preventDefault();
    e.stopPropagation();
    dragState = { drag: false };
    console.log(e);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log(e);
      handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
  }

  switch (type) {
    case "drag": {
      return dragEvent(event);
    }
    case "dragIn": {
      return dragInEvent(event);
    }
    case "dragOut": {
      return dragOutEvent(event);
    }
    case "drop": {
      return dropEvent(event);
    }
    default: {
      throw Error("Unknown error");
    }
  }
};
