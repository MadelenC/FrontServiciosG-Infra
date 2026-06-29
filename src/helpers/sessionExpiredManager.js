let pendingSessionAction = null;

export const requestSessionAction = () => {
  if (pendingSessionAction) {
    return pendingSessionAction;
  }

  pendingSessionAction = new Promise((resolve) => {
    window.dispatchEvent(
      new CustomEvent("session-expired", {
        detail: {
          resolve: (action) => {
            pendingSessionAction = null;
            resolve(action);
          },
        },
      })
    );
  });

  return pendingSessionAction;
};
