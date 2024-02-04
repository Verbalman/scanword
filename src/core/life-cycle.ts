
export const lifeCycleObserving = (domNode: HTMLElement, config: any, callback?: () => any): void => {
  if (!domNode) {
    return;
  }

  const observer = new MutationObserver(mutations => {
    console.log('mutations =>', mutations);
    // mutations.forEach(function (mutation) {
    //   console.log(Array.from(mutation.addedNodes));
    //
    //   const elementRemoved = Array.from(
    //     mutation.removedNodes,
    //   ).some(element => {
    //     if (element.classList) {
    //       return element.classList.contains(classToLookFor);
    //     } else {
    //       return false;
    //     }
    //   });
    //
    //   if (elementRemoved) {
    //     console.log('The element was removed from the DOM');
    //   }
    // });
  });

  observer.observe(domNode, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  });
}
