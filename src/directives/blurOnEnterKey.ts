const blurOnEnterKey = {
  bind(el: HTMLElement) {
    // el might not be present for server-side rendering.
    if (el) {
      // just remove the focus from the element
      el.onkeypress = (ev: KeyboardEvent) => {
        if (ev.which === 13) {
          el.blur();
        }
      };
    }
  }
};

export default blurOnEnterKey;
