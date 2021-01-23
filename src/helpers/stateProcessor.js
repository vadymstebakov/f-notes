export const stateProcessor = client => {
  return {
    save: data => {
      return client.save(data);
    },
    get: () => {
      return client.get();
    }
  };
};
